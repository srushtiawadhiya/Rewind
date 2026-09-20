import Year from "../models/Year.js";
import Memory from "./../models/Memory.js";

export const createYear = async (req, res) => {
  try {
    const { year, coverImage } = req.body;

    if (!year) {
      return res.status(400).json({
        success: false,
        message: "Year is required",
      });
    }

    const existingYear = await Year.findOne({
      userId: req.user.userId,
      year,
    });

    if (existingYear) {
      return res.status(400).json({
        success: false,
        message: "This year already exists",
      });
    }

    const newYear = await Year.create({
      userId: req.user.userId,
      year,
      coverImage: coverImage || "",
    });

    return res.status(201).json({
      success: true,
      message: "Year created successfully",
      year: newYear,
    });

  } catch (error) {
    console.error("Create Year Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create year",
    });
  }
};

export const getYears = async (req, res) => {
  try {
    const years = await Year.find({
      userId: req.user.userId,
    }).sort({ year: -1 });

    return res.status(200).json({
      success: true,
      years,
    });

  } catch (error) {
    console.error("Get Years Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get years",
    });
  }
};

export const getYearById = async (req, res) => {
  try {
    const { yearId } = req.params;

    const year = await Year.findOne({
      _id: yearId,
      userId: req.user.userId,
    });

    if (!year) {
      return res.status(404).json({
        success: false,
        message: "Year not found",
      });
    }

    return res.status(200).json({
      success: true,
      year,
    });

  } catch (error) {
    console.error("Get Year Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get year",
    });
  }
};

export const updateYear = async (req, res) => {
  try {
    const { yearId } = req.params;
    const { coverImage } = req.body;

    const userId = req.user.userId;

    const yearData = await Year.findOne({
      _id: yearId,
      userId: userId,
    });

    if (!yearData) {
      return res.status(404).json({
        success: false,
        message: "Year not found",
      });
    }

    if (coverImage !== undefined) {
      yearData.coverImage = coverImage;
    }

    await yearData.save();

    return res.status(200).json({
      success: true,
      message: "Year updated successfully",
      year: yearData,
    });

  } catch (error) {
    console.error("Update Year Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update year",
    });
  }
};

export const deleteYear = async (req, res) => {
  try {
    const { yearId } = req.params;

    const userId = req.user.userId;

    // Check that this year belongs to the logged-in user
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

    // Delete all memories belonging to this year
    await Memory.deleteMany({
      yearId: yearId,
      userId: userId,
    });

    // Delete the year
    await Year.deleteOne({
      _id: yearId,
      userId: userId,
    });

    return res.status(200).json({
      success: true,
      message: "Year and its memories deleted successfully",
    });

  } catch (error) {
    console.error("Delete Year Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete year",
    });
  }
};