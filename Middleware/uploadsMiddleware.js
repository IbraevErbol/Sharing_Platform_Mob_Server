import multer from 'multer';
import multerStorageCloudinary from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = multerStorageCloudinary({
  cloudinary: cloudinary,  // Используем настроенную библиотеку cloudinary
  params: {
    folder: 'your_folder_name',  // Укажите имя папки, куда будут загружаться изображения
    allowed_formats: ['jpeg', 'jpg', 'png'],  // Разрешенные форматы изображений
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;
