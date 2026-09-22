import nodemailer from "nodemailer";
import Otp from "../models/Otp.js";
import fs from "fs/promises";
import path from "path";

import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs";
import User from "../models/user.js";

import Memory from "../models/Memory.js";
import Year from "../models/Year.js";

const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,                 // true on Vercel, false on localhost
  sameSite: isProduction ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,      // 7 days
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

//send otp
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // 1. Check email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // 2. Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 3. OTP expires after 5 minutes
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // 4. Delete old OTP for this email
    await Otp.deleteMany({ email });

    // 5. Save new OTP in MongoDB
    await Otp.create({
      email,
      otp,
      expiresAt,
      verified: false,
    });

  
    // 7. Send OTP email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Rewind Verification Code",
      text: `Your Rewind verification code is ${otp}. It will expire in 5 minutes.`,
    });

    // 8. Send response
    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {
    console.error("Send OTP Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
};


//verify
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // 1. Check email and OTP
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    // 2. Find OTP record
    const otpRecord = await Otp.findOne({
      email,
      otp,
    });

    // 3. OTP not found
    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // 4. Check whether OTP has expired
    if (otpRecord.expiresAt < new Date()) {
      await Otp.deleteOne({ _id: otpRecord._id });

      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    // 5. Check whether OTP was already verified
    if (otpRecord.verified) {
      return res.status(400).json({
        success: false,
        message: "OTP has already been verified",
      });
    }

    // 6. Mark OTP as verified
    otpRecord.verified = true;

    await otpRecord.save();

    // 7. Send success response
    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });

  } catch (error) {
    console.error("Verify OTP Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to verify OTP",
    });
  }
};

//register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    // 2. Check whether email was verified
    const verifiedOtp = await Otp.findOne({
      email,
      verified: true,
    });

    if (!verifiedOtp) {
      return res.status(400).json({
        success: false,
        message: "Please verify your email first",
      });
    }

    // 3. Check whether account already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 6. Delete OTP after successful registration
    await Otp.deleteMany({ email });

const token = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

res.cookie("token", token, cookieOptions);

return res.status(201).json({
  success: true,
  message: "Account created successfully",
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
  },
});

  } catch (error) {
    console.error("Register User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create account",
    });
  }
};


// login 
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2. Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 3. Compare entered password with hashed password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    console.log("2FA STATUS:", user.twoFactorEnabled);

    if (user.twoFactorEnabled) {
  return res.status(200).json({
    success: true,
    requiresTwoFactor: true,
    message: "Two-factor authentication required",
    userId: user._id,
  });
}

    // 4. Create JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 5. Store JWT in HTTP-only cookie
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: "lax",
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    // });
res.cookie("token", token, cookieOptions);
    // 6. Send success response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};


// for main page
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
  id: user._id,
  name: user.name,
  email: user.email,
  profileImage: user.profileImage || "",
  passwordChangedAt: user.passwordChangedAt,
  privateByDefault: user.privateByDefault,
},
    });

  } catch (error) {
    console.error("Get Current User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get current user",
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });

  } catch (error) {
    console.error("Logout Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to logout",
    });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

   const userMemories = await Memory.find({
  userId: userId,
});

for (const memory of userMemories) {
  for (const media of memory.media || []) {

    if (!media.url) {
      continue;
    }

    const filename = path.basename(media.url);
    const filePath = path.join("uploads", filename);

    try {
      await fs.unlink(filePath);
    } catch (error) {

      if (error.code !== "ENOENT") {
        console.error(
          "Failed to delete media file:",
          filePath,
          error
        );
      }

    }
  }
}

await Memory.deleteMany({
  userId: userId,
});

await Year.deleteMany({
  userId: userId,
});

    await User.deleteOne({
      _id: userId,
    });

    res.clearCookie("token", cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });

  } catch (error) {
    console.error("Delete Account Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete account",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, email } = req.body;
    const profileImage = req.file
  ? `/uploads/${req.file.filename}`
  : undefined;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
      _id: { $ne: userId },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already in use",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name = name.trim();
    user.email = email.toLowerCase().trim();

    if (profileImage !== undefined) {
  user.profileImage = profileImage;
}

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      },
    });

  } catch (error) {
    console.error("Update Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const userId = req.user.userId;

    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All password fields are required",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New passwords do not match",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isCurrentPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isCurrentPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const isSamePassword = await bcrypt.compare(
      newPassword,
      user.password
    );

    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from current password",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
user.passwordChangedAt = new Date();

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });

  } catch (error) {
    console.error("Change Password Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to change password",
    });
  }
};

export const toggleTwoFactor = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.twoFactorEnabled = !user.twoFactorEnabled;

    await user.save();

    return res.status(200).json({
      success: true,
      message: user.twoFactorEnabled
        ? "Two-factor authentication enabled"
        : "Two-factor authentication disabled",
      twoFactorEnabled: user.twoFactorEnabled,
    });
  } catch (error) {
    console.error("Toggle 2FA Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update two-factor authentication",
    });
  }
};

export const togglePrivateByDefault = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.privateByDefault = !user.privateByDefault;

    await user.save();

    return res.status(200).json({
      success: true,
      message: user.privateByDefault
        ? "Private by Default enabled"
        : "Private by Default disabled",
      privateByDefault: user.privateByDefault,
    });
  } catch (error) {
    console.error("Toggle Private by Default Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update Private by Default",
    });
  }
};

export const sendLoginOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.twoFactorEnabled) {
      return res.status(400).json({
        success: false,
        message: "Two-factor authentication is not enabled",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await Otp.deleteMany({
      email,
      purpose: "login",
    });

    await Otp.create({
      email,
      otp,
      expiresAt,
      verified: false,
      purpose: "login",
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Rewind Login OTP",
      text: `Your Rewind login OTP is ${otp}. It will expire in 5 minutes.`,
    });

    return res.status(200).json({
      success: true,
      message: "Login OTP sent successfully",
    });
  } catch (error) {
   console.error("Send Login OTP Error:", error);
console.error("Send Login OTP Error Message:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to send login OTP",
    });
  }
};

export const verifyLoginOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const otpRecord = await Otp.findOne({
      email,
      otp,
      purpose: "login",
    });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (otpRecord.expiresAt < new Date()) {
      await Otp.deleteOne({ _id: otpRecord._id });

      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

   res.cookie("token", token, cookieOptions);

    await Otp.deleteOne({ _id: otpRecord._id });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Verify Login OTP Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to verify login OTP",
    });
  }
};

export const verifyPassword = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Password verified",
    });
  } catch (error) {
    console.error("Verify Password Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to verify password",
    });
  }
};

export const sendForgotPasswordOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.create({
      email,
      otp,
      purpose: "forgot-password",
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Rewind Password Reset OTP",
      text: `Your Rewind password reset OTP is ${otp}. It expires in 10 minutes.`,
    });

    return res.status(200).json({
      success: true,
      message: "Password reset OTP sent successfully",
    });
  } catch (error) {
    console.error("Forgot Password OTP Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send password reset OTP",
    });
  }
};

export const verifyForgotPasswordOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const otpRecord = await Otp.findOne({
      email,
      otp,
      purpose: "forgot-password",
      verified: false,
    }).sort({ createdAt: -1 });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    otpRecord.verified = true;
    await otpRecord.save();

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("Verify Forgot Password OTP Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to verify OTP",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const verifiedOtp = await Otp.findOne({
  email,
  purpose: "forgot-password",
  verified: true,
}).sort({ createdAt: -1 });

if (!verifiedOtp) {
  return res.status(400).json({
    success: false,
    message: "Please verify the OTP first",
  });
}

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.passwordChangedAt = new Date();

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Reset Password Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to reset password",
    });
  }
};