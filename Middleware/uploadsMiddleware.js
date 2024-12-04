import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import multerStorageCloudinary from 'multer-storage-cloudinary';

const storage = multerStorageCloudinary({
  cloudinary: cloudinary,  // Используем настроенную библиотеку cloudinary
  params: {
    folder: 'your_folder_name',  // Укажите имя папки, куда будут загружаться изображения
    allowed_formats: ['jpeg', 'jpg', 'png'],  // Разрешенные форматы изображений
  },
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
