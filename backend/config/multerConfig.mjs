import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';

// define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const destPath = path.resolve(__dirname, '..', 'public', 'imgs');

export const multerConfig = {
  dest: destPath,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destPath);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + String(Math.floor(Math.random()*1000)) + path.extname(file.originalname));
    }

  }),
  limits: {
    fileSize: 10 * 1024 * 1024
  },

  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid image file type.'));
    }
  }
  
}