import path from "path";
import Memory from "../models/Memory.js";
import Year from "../models/Year.js";
import User from '../models/user.js';

export const getMemoriesByYear = async (req, res) => {
  try {
    const { yearId } = req.params;

    const userId = req.user.userId;

    const user = await User.findById(userId);

if (!user) {
  return res.status(404).json({
    success: false,
    message: "User not found",
  });
}

    // Check whether this year belongs to the logged-in user
    const year = await Year.findOne({
      _id: yearId,
      userId: userId,
    });

    if (!year) {
      return res.status(404).json({
        success: false,
        message: "Year not found",
      });
    }

    const memories = await Memory.find({
      yearId: yearId,
      userId: userId,
    }).sort({
      memoryDate: -1,
    });

    return res.status(200).json({
      success: true,
      memories,
    });

  } catch (error) {
    console.error("Get Memories By Year Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch memories",
    });
  }
};

export const getMemoryById = async (req, res) => {
  try {
    const { memoryId } = req.params;

    const userId = req.user.userId;

    const memory = await Memory.findOne({
      _id: memoryId,
      userId: userId,
    });

    if (!memory) {
      return res.status(404).json({
        success: false,
        message: "Memory not found",
      });
    }

    return res.status(200).json({
      success: true,
      memory,
    });

  } catch (error) {
    console.error("Get Memory By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch memory",
    });
  }
};

export const createMemory = async (req, res) => {
  try {
    const {
      yearId,
      title,
      description,
      memoryDate,
      location,
      isFavorite,
      isShareable,
      media,
    } = req.body;

    const userId = req.user.userId;

    // Check required fields
    if (!yearId || !title || !memoryDate) {
      return res.status(400).json({
        success: false,
        message: "yearId, title and memoryDate are required",
      });
    }

    // Check whether the selected year belongs to the logged-in user
    const year = await Year.findOne({
      _id: yearId,
      userId: userId,
    });

    if (!year) {
      return res.status(404).json({
        success: false,
        message: "Year not found",
      });
    }

    // Media must be an array
    if (!Array.isArray(media)) {
      return res.status(400).json({
        success: false,
        message: "Media must be an array",
      });
    }

    // Create memory
    const memory = await Memory.create({
      userId: userId,
      yearId: yearId,
      title: title,
      description: description || "",
      memoryDate: memoryDate,
      location: location || "",
      isFavorite: isFavorite || false,
     isShareable: user.privateByDefault
  ? false
  : isShareable || false,
      media: media,
    });

    return res.status(201).json({
      success: true,
      message: "Memory created successfully",
      memory: memory,
    });

  } catch (error) {
    console.error("Create Memory Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create memory",
    });
  }
};

export const uploadMedia = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }

    const files = req.files.map((file) => {
  const extension = path.extname(file.originalname).toLowerCase();

  const imageExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".avif",
    ".heic",
    ".heif",
  ];

  const type = imageExtensions.includes(extension)
    ? "photo"
    : "video";

  return {
    type: type,
    url: `/uploads/${file.filename}`,
    thumbnailUrl: "",
    duration: 0,
  };
});

    return res.status(200).json({
      success: true,
      message: "Files uploaded successfully",
      files,
    });

  } catch (error) {
    console.error("Upload Media Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to upload files",
    });
  }
};

export const updateMemory = async (req, res) => {
  try {
    const { memoryId } = req.params;

    const userId = req.user.userId;

    const {
      title,
      description,
      memoryDate,
      location,
      isFavorite,
      isShareable,
    } = req.body;

    const memory = await Memory.findOne({
      _id: memoryId,
      userId: userId,
    });

    if (!memory) {
      return res.status(404).json({
        success: false,
        message: "Memory not found",
      });
    }

    if (title !== undefined) {
      memory.title = title;
    }

    if (description !== undefined) {
      memory.description = description;
    }

    if (memoryDate !== undefined) {
      memory.memoryDate = memoryDate;
    }

    if (location !== undefined) {
      memory.location = location;
    }

    if (isFavorite !== undefined) {
      memory.isFavorite = isFavorite;
    }

    if (isShareable !== undefined) {
      memory.isShareable = isShareable;
    }

    await memory.save();

    return res.status(200).json({
      success: true,
      message: "Memory updated successfully",
      memory,
    });

  } catch (error) {
    console.error("Update Memory Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update memory",
    });
  }
};

export const deleteMemory = async (req, res) => {
  try {
    const { memoryId } = req.params;

    const userId = req.user.userId;

    const memory = await Memory.findOne({
      _id: memoryId,
      userId: userId,
    });

    if (!memory) {
      return res.status(404).json({
        success: false,
        message: "Memory not found",
      });
    }

    await Memory.deleteOne({
      _id: memoryId,
      userId: userId,
    });

    return res.status(200).json({
      success: true,
      message: "Memory deleted successfully",
    });

  } catch (error) {
    console.error("Delete Memory Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete memory",
    });
  }
};

export const toggleFavorite = async (req, res) => {
  try {
    const { memoryId } = req.params;

    const userId = req.user.userId;

    const memory = await Memory.findOne({
      _id: memoryId,
      userId: userId,
    });

    if (!memory) {
      return res.status(404).json({
        success: false,
        message: "Memory not found",
      });
    }

    memory.isFavorite = !memory.isFavorite;

    await memory.save();

    return res.status(200).json({
      success: true,
      message: memory.isFavorite
        ? "Memory added to favorites"
        : "Memory removed from favorites",
      isFavorite: memory.isFavorite,
    });

  } catch (error) {
    console.error("Toggle Favorite Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update favorite",
    });
  }
};

export const toggleShareable = async (req, res) => {
  try {
    const { memoryId } = req.params;

    const userId = req.user.userId;

    const memory = await Memory.findOne({
      _id: memoryId,
      userId: userId,
    });

    if (!memory) {
      return res.status(404).json({
        success: false,
        message: "Memory not found",
      });
    }

    memory.isShareable = !memory.isShareable;

    await memory.save();

    return res.status(200).json({
      success: true,
      message: memory.isShareable
        ? "Memory is now shareable"
        : "Memory is no longer shareable",
      isShareable: memory.isShareable,
    });

  } catch (error) {
    console.error("Toggle Shareable Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update shareable status",
    });
  }
};

export const getFavoriteMemories = async (req, res) => {
  try {
    const userId = req.user.userId;

    const memories = await Memory.find({
      userId: userId,
      isFavorite: true,
    }).sort({
      memoryDate: -1,
    });

    return res.status(200).json({
      success: true,
      memories,
    });

  } catch (error) {
    console.error("Get Favorite Memories Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch favorite memories",
    });
  }
};

export const getTimelineMemories = async (req, res) => {
  try {
    const userId = req.user.userId;

    const memories = await Memory.find({
  userId: userId,
})
  .populate("yearId")
  .sort({
    memoryDate: -1,
  });

    return res.status(200).json({
      success: true,
      memories,
    });

  } catch (error) {
    console.error("Get Timeline Memories Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch timeline memories",
    });
  }
};

export const getStorageUsage = async (req, res) => {
  try {
    const memories = await Memory.find({
      userId: req.user.userId,
    });

    let photos = 0;
    let videos = 0;

    for (const memory of memories) {
      for (const media of memory.media) {
        if (!media.url) continue;

        const fileName = path.basename(media.url);

        const filePath = path.join(
          process.cwd(),
          "uploads",
          fileName
        );

        try {
          const stats = await fs.promises.stat(filePath);

          if (media.type === "photo") {
            photos += stats.size;
          }

          if (media.type === "video") {
            videos += stats.size;
          }
        } catch (error) {
          console.log(`File not found: ${fileName}`);
        }
      }
    }

    const total = photos + videos;

    return res.status(200).json({
      success: true,
      storage: {
        photos,
        videos,
        total,
      },
    });
  } catch (error) {
    console.error("Storage Usage Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to calculate storage usage",
    });
  }
};