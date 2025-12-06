import mongoose from 'mongoose'
import User from './user.model';
import Post from './post.model'
const commentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Post,
        required: true
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        required: false,
        default: null
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    text: {
        type: String,
        required: true
    },
},
    { timestamps: true }
);

export default mongoose.model('Comment', commentSchema)