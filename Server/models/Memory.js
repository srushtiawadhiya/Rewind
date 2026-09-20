import mongoose from "mongoose";

const memorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    yearId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Year",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    memoryDate: {
      type: Date,
      required: true,
    },

    location: {
      type: String,
      trim: true,
      default: "",
    },

    media: [
      {
        type: {
          type: String,
          enum: ["photo", "video"],
          required: true,
        },

        url: {
          type: String,
          required: true,
        },

        thumbnailUrl: {
          type: String,
          default: "",
        },

        duration: {
          type: Number,
          default: 0,
        },
      },
    ],

    isFavorite: {
      type: Boolean,
      default: false,
    },

    isShareable: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Memory = mongoose.model("Memory", memorySchema);

export default Memory;