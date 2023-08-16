import express from 'express';
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from '../controllers/userController.js';
import { verifyAuth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/:id', verifyAuth, getUser);
router.get('/:id/friends', verifyAuth, getUserFriends);

router.patch('/:id/:friendId', verifyAuth, addRemoveFriend);

export default router;
