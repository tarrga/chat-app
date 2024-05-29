import express from 'express';
import { updateUser, loginUser, registerUser } from '../controllers/userController.js';
import multer from 'multer';

console.log('user update');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, './public/profile_pictures');
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/update', upload.single('file'), updateUser);

export default router;
