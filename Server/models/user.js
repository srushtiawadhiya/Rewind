import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

   password: { type: String, required: true },
passwordChangedAt: { type: Date, default: Date.now },
twoFactorEnabled: { type: Boolean, default: false },
privateByDefault: {
  type: Boolean,
  default: true,
},

    profileImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;