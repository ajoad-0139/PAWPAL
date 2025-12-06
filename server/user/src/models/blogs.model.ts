import mongoose from "mongoose";
import User from "./user.model"
const blogSchema =new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:User,
        required: true
    },
    content: {
        type: Object,
        required: true,
    },
    isFeature: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        enum: ['adoption', 'training', 'breeds', 'health and wellness', 'others'],
        default: 'others',
    },
});

export default mongoose.model('Blog', blogSchema);