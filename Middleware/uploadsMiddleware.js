import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import multerStorageCloudinary from 'multer-storage-cloudinary';

const storage = multerStorageCloudinary({
  cloudinary: cloudinary,  // Ваши настройки Cloudinary
  folder: 'uploads',       // Указываем папку в Cloudinary
  allowedFormats: ['jpeg', 'jpg', 'png'],  // Разрешенные форматы
  transformation: [{ quality: 'auto', fetch_format: 'auto' }],
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Только изображения формата JPEG, PNG или JPG'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;
