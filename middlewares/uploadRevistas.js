// middlewares/uploadRevistas.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    const isPDF = file.fieldname === "archivo";
    return {
      folder: isPDF ? "revistas/pdf" : "revistas/portadas",
      allowed_formats: isPDF ? ["pdf"] : ["jpg", "png", "jpeg", "webp"],
      resource_type: isPDF ? "raw" : "image",
      transformation: isPDF ? undefined : [{ quality: "auto:good" }],
    };
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "portada") {
    const validImageTypes = ["image/jpeg", "image/png", "image/webp"];
    if (validImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Solo se permiten imágenes (JPEG, PNG, WEBP) para la portada"
        ),
        false
      );
    }
  } else if (file.fieldname === "archivo") {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Solo se permiten archivos PDF"), false);
    }
  } else {
    cb(new Error("Campo de archivo no reconocido"), false);
  }
};

export const uploadRevista = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
}).fields([
  { name: "portada", maxCount: 1 },
  { name: "archivo", maxCount: 1 },
]);

export default uploadRevista;
