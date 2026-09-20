import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    otp: {
      type: String,
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    purpose: {
  type: String,
  enum: ["registration", "login", "forgot-password"],
  default: "registration",
},

  },

  {
    timestamps: true,
  }
);

const Otp = mongoose.model("Otp", otpSchema);

export default Otp;