import { Request, Response } from "express";
import Post from "../models/post.model";
import log from "../utils/logger";
import mongoose from "mongoose";
import uploadToCloudinary from "../utils/fileUpload";
import fs from 'fs'


export const createPost = async (req: Request, res: Response): Promise<any> => {
    try {
        const post = new Post(req.body)
        const newPost = await post.save()
        return res.status(200).json({ postId: newPost._id })
    } catch (error) {
        log.error('failed to create post')
        res.status(500).json({ error: error })
    }
}

export const getAllPost = async (req: Request, res: Response): Promise<any> => {
    try {
        const posts = await Post.find({})
        return res.status(200).json({ posts })
    } catch (error) {
        res.status(500).json({ error: 'server error' })
    }
}

export const getPostWithId = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params
        if (!id || mongoose.Types.ObjectId.isValid(JSON.stringify(id))) {
            return res.status(400).json({ error: 'invalid id' })
        }
        const post = await Post.findById(id)
        if (!post) {
            return res.status(404).json({ error: "post not found" })
        }
        return res.status(200).json({ post })
    } catch (error) {
        res.status(500).json({ error: 'server error' })
    }
}

export const deletePost = async (req: any, res: Response): Promise<any> => {

    try {
        const { id } = req.params
        if (!id || mongoose.Types.ObjectId.isValid(JSON.stringify(id))) {
            return res.status(400).json({ error: 'invalid id' })
        }
        // const post = await Post.findById(id)
        // if (post?.userId != req.user.userId) {
        //     if (req.user.isAdmin == false) {
        //         return res.status(401).json({ msg: "unauthorized" })

        //     }
        // }
        await Post.findByIdAndDelete(id)
        return res.status(200).json({ msg: `post with id: ${id} has been deleted` })
    } catch (error) {
        return res.status(400).json({ error: error })
    }
}

export const uploadImage = async (req: Request, res: Response): Promise<any> => {
    const file = req.file
    if (file) {
        const response = await uploadToCloudinary(file.path)
        log.info(response)
        fs.unlinkSync(file.path);
        return res.send({ url: response })
    }
    else {
        return res.send('error')
    }
}