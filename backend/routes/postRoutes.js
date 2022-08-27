import { Router } from "express"
import { addPost, getPosts, updatePost, deletePost, likePost } from "../controllers/postControllers.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = Router()

router.get('/', getPosts)
router.post('/', authMiddleware, addPost)
router.patch('/:id', authMiddleware, updatePost)
router.delete('/:id', authMiddleware, deletePost)
router.patch('/:id/likePost', authMiddleware, likePost)

export default router