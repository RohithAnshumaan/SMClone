import express from 'express';
import { getPosts, uploadPost } from '../controllers/postController.js'
import authMiddleware from '../middleware/authMiddleware.js';
const postRouter = express.Router();

postRouter.get('/', getPosts);
postRouter.post('/upload', authMiddleware, uploadPost);

export default postRouter;