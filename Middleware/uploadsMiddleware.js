import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import {CloudinaryStorage} from 'multer-storage-cloudinary';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,  // Ваши настройки Cloudinary
  folder: 'uploads',       // Указываем папку в Cloudinary
  allowedFormats: ['jpeg', 'jpg', 'png'],  // Разрешенные форматы
  transformation: [{ quality: 'auto', fetch_format: 'auto' }],
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;
