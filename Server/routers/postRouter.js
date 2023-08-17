import express from 'express';
import {
  getFeedPosts,
  getUserPosts,
  likePost,
} from '../controllers/postController.js';
import { verifyAuth } from '../middlewares/auth.js';

const router = express.Router();

/* Get */
router.get('/', verifyAuth, getFeedPosts);
router.get('/:userId/posts', verifyAuth, getUserPosts);

/* Update */
router.patch('/:id/like', verifyAuth, likePost);

export default router;
