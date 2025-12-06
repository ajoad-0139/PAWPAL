import { required } from 'joi'
import mongoose from 'mongoose'
import { deflate } from 'zlib'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    city: {
        type: String,
        required: false,
        default: null,
    },
    address: {
        type: String,
        required: false,
        default: null,
    },
    phone: {
        type: String,
        required: false,
        default: null
    },
    bio: {
        type: String,
        required: false,
        default: null,
    },
    facebook: {
        type: String,
        required: false,
        default: null
    },
    instagram: {
        type: String,
        required: false,
        default: null,
    },
    twitter: {
        type: String,
        required: false,
        default: null
    },
    profilePicture: {
        type: String,
        required: false,
        default: null,
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    }

},
    {
        timestamps: true,
    })

export default mongoose.model("User", userSchema)