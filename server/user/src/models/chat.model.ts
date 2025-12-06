import mongoose from 'mongoose'
import Transport from './transport.model'
const chatSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Transport,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    userName: {
        type: String,
        required: true,
    }
},
    { timestamps: true }
);

export default mongoose.model('Chat', chatSchema)
