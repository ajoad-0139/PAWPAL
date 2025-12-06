import express, { Request, Response } from 'express'
import { authenticate, authorize } from '../middlewares/authentication/user.authentication'
import log from '../utils/logger'
import { deleteComment, loadComments, saveComment } from '../controller/comment.controller'
import Comment from '../models/comment.model'
const router = express.Router()

router.route('/saveComment').post(authenticate, saveComment)
router.route('/loadComments/:id').get(authenticate, loadComments)
router.route('/deleteComment/:commentId').delete(authenticate, deleteComment)
router.route('/edit/:commentId').put(authenticate, async (req: any, res: any) => {
    const { commentId } = req.params
    const {data}=req.body.data
    try {
        const comment = await Comment.findById(commentId)
        // if (comment?.userId != req.user.userId) {
        //     res.status(401).json({ msg: 'unauthorized!' })
        // }
        const updatedComment = await Comment.findByIdAndUpdate(commentId, {
            text: data
        })
        res.send(200).json({msg:"comment updated"})
    } catch (error) {
        log.error(error)
        res.status(401).json({ msg: 'error' })
    }

})
export default router
