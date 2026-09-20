import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import {
  sendOtp,
  verifyOtp,
  sendLoginOtp,
  verifyLoginOtp,
  registerUser,
    loginUser,
     getCurrentUser,
     logoutUser,
     deleteAccount,
     updateProfile,
      changePassword,
       toggleTwoFactor,
       verifyPassword,
       togglePrivateByDefault,
       sendForgotPasswordOtp,
       verifyForgotPasswordOtp,
       resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post(
  "/send-login-otp",
  sendLoginOtp
);
router.post(
  "/verify-login-otp",
  verifyLoginOtp
);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.delete(
  "/delete-account",
  authMiddleware,
  deleteAccount
);
router.patch(
  "/change-password",
  authMiddleware,
  changePassword
);
router.get("/me", authMiddleware, getCurrentUser);
router.patch(
  "/profile",
  authMiddleware,
  upload.single("profileImage"),
  updateProfile
);
router.patch(
  "/toggle-2fa",
  authMiddleware,
  toggleTwoFactor
);
router.post(
  "/verify-password",
  authMiddleware,
  verifyPassword
);
router.patch(
  "/toggle-private-default",
  authMiddleware,
  togglePrivateByDefault
);
router.post("/send-forgot-password-otp", sendForgotPasswordOtp);
router.post(
  "/verify-forgot-password-otp",
  verifyForgotPasswordOtp
);
router.patch("/reset-password", resetPassword);

export default router;