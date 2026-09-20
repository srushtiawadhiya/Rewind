import multer from "multer";
import path from "path";
import crypto from "crypto";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      crypto.randomBytes(6).toString("hex") +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  console.log(
    "Uploaded file:",
    file.originalname,
    "| MIME type:",
    file.mimetype
  );

  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/avif",
    "image/heic",
    "image/heif",

    "video/mp4",
    "video/webm",
    "video/quicktime",
    "video/x-msvideo",
    "video/x-matroska",
  ];

  const allowedExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".avif",
    ".heic",
    ".heif",
    ".mp4",
    ".webm",
    ".mov",
    ".avi",
    ".mkv",
  ];

  const extension = path.extname(file.originalname).toLowerCase();

  // Accept if MIME type OR file extension is valid
  if (
    allowedMimeTypes.includes(file.mimetype) ||
    allowedExtensions.includes(extension)
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `File type not allowed: ${file.originalname} (${file.mimetype})`
      ),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
     fileSize: 500 * 1024 * 1024,
  },
});

export default upload;