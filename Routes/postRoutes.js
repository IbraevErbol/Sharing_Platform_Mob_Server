import express from 'express';
import upload from '../Middleware/uploadsMiddleware.js'; 
import { createPost, getAllPosts, getPostById, getUserPosts, deletePosts } from '../Controllers/postController.js'; 
import { verifyToken } from '../Middleware/authMiddleware.js';
const router = express.Router();

// Маршрут для создания поста
router.post('/posts',verifyToken, upload.single('image'), createPost);
router.get('/posts', getAllPosts);
router.get('/user/posts', verifyToken, getUserPosts);
router.get('/posts/:id', getPostById);
router.delete('/posts/:id', verifyToken, deletePosts);

export default router;
