import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { register } from './controllers/authController.js';
import { createPost } from './controllers/postController.js';
import userRouter from './routers/userRouter.js';
import authRouter from './routers/authRouter.js';
import postRouter from './routers/postRouter.js';

// Configurations\
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30kb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30kb', extended: true }));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* Routing */
app.post('/api/v1/auth/register', upload.single('picturePath'), register);
app.post('/api/v1/posts/createPost', upload.single('picturePath'), createPost);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/posts', postRouter);

/* Mongoose SetUp */
const port = process.env.PORT || 8071;

const db = process.env.DATABASE_URI.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => console.log(`Server Start on Port ${port}`));
  })
  .catch((err) => console.log(`${err} did not connect`));
