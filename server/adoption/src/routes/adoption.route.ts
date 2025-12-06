import express, { Request, Response } from 'express'
import { v2 as cloudinary } from 'cloudinary'
import { authenticate, authorize } from '../middlewares/authentication/user.authentication'
import { validatePost } from '../middlewares/validators/post.validator'
import { createPost, deletePost, getAllPost, getPostWithId, uploadImage } from '../controller/adoption.controller'
import { upload } from '../middlewares/multer.middleware'
import log from '../utils/logger'
import Post from '../models/post.model'

const router = express.Router()

/**
 * @swagger
 * /createPost:
 *   post:
 *     tags:
 *       - Posts
 *     summary: Create a new adoption post
 *     description: Authenticated users can create a pet adoption post. After uploading each image add the image url to the schema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - animalType
 *               - description
 *               - image
 *               - address
 *             properties:
 *               userId:
 *                 type: string
 *                 format: objectId
 *                 example: "661512355834293dc02a5abc"
 *               animalType:
 *                 type: string
 *                 example: "Dog"
 *               breed:
 *                 type: string
 *                 default: "Unknown"
 *               name:
 *                 type: string
 *                 default: "Pet"
 *               description:
 *                 type: string
 *                 example: "Friendly and playful dog, looking for a home"
 *               age:
 *                 type: number
 *                 nullable: true
 *                 example: 3
 *               sex:
 *                 type: string
 *                 default: "Unknown"
 *               vaccine:
 *                 oneOf:
 *                   - type: string
 *                     default: "Unknown"
 *                   - type: array
 *                     items:
 *                       type: string
 *                     example: ["Rabies", "Parvo"]
 *               image:
 *                 oneOf:
 *                   - type: string
 *                     example: "https://res.cloudinary.com/demo/image/upload/sample.jpg"
 *                   - type: array
 *                     items:
 *                       type: string
 *                       example: ["https://res.cloudinary.com/demo/image/upload/sample.jpg","https://test.faklsdjfia.jpg"]
 *               address:
 *                 type: object
 *                 required:
 *                   - name
 *                   - city
 *                   - phone
 *                   - email
 *                   - location
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *                   city:
 *                     type: string
 *                     example: "New York"
 *                   phone:
 *                     type: string
 *                     example: "+123456789"
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: "john@example.com"
 *                   location:
 *                     type: string
 *                     example: "123 4th Street, NY"
 *               isAdopted:
 *                 type: boolean
 *                 default: false
 *               adoptedBy:
 *                 type: string
 *                 default: "Unknown"
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 postId:
 *                   type: string
 *                   example: "67f661b11a83c05adc924881"
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.route('/createPost').post(authenticate, validatePost, createPost)
router.route('/getAllPosts').get(authenticate, getAllPost)
router.route('/getPostWithId/:id').get(authenticate, getPostWithId)
router.route('/deletePost/:id').delete(authenticate, deletePost)


/**
 * @swagger
 * /uploadImage:
 *   post:
 *     summary: Upload images to cloudinary
 *     description: This endpoint uploads the image to cloudinary and returns the url to that image. Send the image as form data and name it image.
 *     tags:
 *       - upload image
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data::
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                  type: form-data
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   example: "https://res.cloudinary.com/demo/image/upload/sample.jpg"
 */

router.route('/uploadImage').post(authenticate, upload.single('image'), uploadImage)
router.route('/deleteImage/:publicId').delete(authenticate, async (req: Request, res: Response): Promise<any> => {
    try {
        let { publicId } = req.params;
        publicId = "pawpal/" + publicId
        log.info(publicId)
        const result = await cloudinary.uploader.destroy(publicId);

        if (result.result === 'ok') {
            res.status(200).json({ message: 'Image deleted successfully' });
        } else {
            res.status(400).json({ message: 'Failed to delete image' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
})
router.route('/edit/:postId/:field').put(authenticate, async (req: any, res: any) => {
    const { postId, field } = req.params
    try {
        const post = await Post.findById(postId)
        // if (post?.userId == req.user.userId || req.user.isAdmin == true) {
        let data = req.body.data

        try {
            const updatedPost = await Post.findByIdAndUpdate(postId, {
                [field]: data
            })
            res.status(200).json({ msg: "post updated" })
        } catch (error) {
            log.error(error)
            res.status(401).json({ msg: "errro updating password" })
        }

        // } else {
        //     return res.status(401).json({ msg: "unauthorized" })
        // }
    } catch (error) {
        log.error(error)
        res.status(401).json({ msg: 'error' })
    }

})


export default router
