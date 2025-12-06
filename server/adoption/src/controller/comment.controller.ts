import Comment from '../models/comment.model'
import { Request, Response } from "express";
import log from "../utils/logger";
import mongoose from "mongoose";
import User from '../models/user.model'

export const loadComments = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        const comments = await Comment.find({ postId: id })
            .populate('userId', 'name')  // populate commenter info
            .sort({ createdAt: 1 });

        res.status(200).json(comments);
    } catch (error) {
        console.error('Error loading comments:', error);
        res.status(500).json({ error: 'Failed to load comments' });
    }
};

export const saveComment = async (req: Request, res: Response): Promise<any> => {
    try {
        const comment = new Comment(req.body)
        await comment.save()
        res.status(200).json({ msg: 'comment saved' })

    } catch (error) {
        log.error('failed to save comment')
        res.status(500).json({ error: error })
    }
}

export const deleteComment = async (req: any, res: Response): Promise<any> => {
    try {
        console.log('deletecomment')
        const { commentId } = req.params
        const comment = await Comment.findById(commentId)
        // if (comment?.userId != req.user.userId) {
        //     if (req.user.isAdmin == false) {
        //         return res.status(401).json({ msg: "untauthorized" })
        //     }
        // }
        const childComments = await Comment.find({ parentId: commentId });
        for (const child of childComments) {
            await Comment.findByIdAndDelete(child._id);
        }
        const deletedComment = await Comment.findByIdAndDelete(commentId);
        if (!deletedComment) {
            res.status(404).json({ error: 'comment not found' })
        }
        res.status(200).json({ msg: 'comment deleted' })
    } catch (error) {
        res.status(500).json({ errro: 'server error' })
    }
}