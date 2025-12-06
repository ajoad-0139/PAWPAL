import express from 'express'
import multer from "multer"
import { authenticate, authorize } from '../middlewares/authentication/user.authentication';
const Router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './tmp')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
export const upload = multer({ 
    storage:storage
})

import {
    createBlog,
    updateBlog,
    getBlogs,
    deleteBlog,
    uploadImages,
    getBlogsOfTypes,
    toggleFeature,
    getFeaturedBlogs
} from '../controller/blogs.controller'

Router.route('/')
    .get(authenticate, getBlogs)
    .post(authenticate, createBlog)
    .delete(authenticate, deleteBlog)
    .patch(authenticate, updateBlog);

Router.route('/image').post(upload.array('images'), uploadImages)
Router.route('/type').get(authenticate, getBlogsOfTypes);
Router.route('/feature').patch(authenticate, toggleFeature).get(authenticate, getFeaturedBlogs)

export default Router