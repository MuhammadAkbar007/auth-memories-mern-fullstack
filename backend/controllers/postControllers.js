import mongoose from 'mongoose'
import PostMessage from '../models/postMessage.js'

export const getPosts = async (req, res) => {
    try {
        const posts = await PostMessage.find()

        res.status(200).json(posts)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const addPost = async (req, res) => {
    try {
        const post = req.body
        const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

        await newPost.save()

        res.status(201).json(newPost)
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

export const updatePost = async (req, res) => {
    try {
        const { id: _id } = req.params
        const post = req.body

        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

        const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true })

        res.status(202).json(updatedPost)
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

export const deletePost = async (req, res) => {
    try {
        const { id: _id } = req.params

        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

        await PostMessage.findByIdAndRemove(_id)

        res.status(204).json({ message: 'Post deleted successfully' })
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

export const likePost = async (req, res) => {
    try {
        if (!req.userId) return res.status(401).json({ message: "Unauthenticated." })

        const { id: _id } = req.params

        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

        const post = await PostMessage.findById(_id)
        const index = post.likes.findIndex(id => id === String(req.userId))

        if (index === -1) {
            post.likes.push(req.userId)
        } else {
            post.likes = post.likes.filter(id => id !== String(req.userId))
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true })

        res.status(202).json(updatedPost)
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}