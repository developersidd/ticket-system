import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/temp");
  },

  filename: (req, file, cb) => {
    cb(null, `${file.originalname}-${Date.now()}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" || 
      file.mimetype === "image/webp" 
      
    ) {
      cb(null, true);
    } else {
      cb(new Error("File format not supported"));
    }
  },
});

export default upload;
