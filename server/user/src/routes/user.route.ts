import express, { Request, Response } from 'express'
import User from '../models/user.model'
import log from '../utils/logger'
import { validateLogin, validateUser } from '../middlewares/validators/user.validator'
import { createTransporter, createUser, loginUser, logoutUser, registerWithVerification, resetPassword, uploadProfilePicture, verifyMail } from '../controller/user.controller'
import { authenticate, authorize } from '../middlewares/authentication/user.authentication'
import multer from "multer"
const storage = multer.memoryStorage();
const upload = multer({ storage });


const router = express.Router()

/**
 * @swagger
 * /create:
 *   post:
 *     summary: Creates a new user
 *     description: This endpoint creates a new user in the system.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                  type: string
 *               email:
 *                  type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */

router.route('/create').post(validateUser, registerWithVerification)
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in 
 *     description: This endpoint log users into the system.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                  type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Log in successful
 *       400:
 *         description: Invalid input/ Password mismatched
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.route('/login').post(validateLogin, loginUser)
router.route('/logout').post(logoutUser)

/**
 * @swagger
 * /createTransporter:
 *   post:
 *     summary: Create Transporter  
 *     description: This endpoint converts a regular user email to a transporter. Only admin users can access this.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                  type: string
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Transporter Successfully created 
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.route('/createTransporter').post(authenticate, authorize, createTransporter)
router.route('/resetPassword/:userId').put(authenticate, resetPassword)
router.route('/profilePicture/:userId').post(upload.array('image'), authenticate, uploadProfilePicture).delete()
router.route('/registerWithVerification').post(registerWithVerification)
router.route('/verify-email/:token').get(verifyMail)
router.route('/edit/:userId/:field').put(authenticate, async (req: any, res: any) => {
    const { userId, field } = req.params
    // if(userId!=req.user.userId){
    //     return res.status(401).json({msg:"unauthorized"})
    // }
    const {data} = req.body
    console.log(field)
    console.log(data)
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, {
            [field]: data
        })
        res.status(200).json({user:updatedUser, msg: "user updated"})
    } catch (error) {
        log.error(error)
        res.status(401).json({ msg: `error updating ${field}` })
    }
})
router.route('/getUserInfo/:userId').get(authenticate, async (req: any, res: any) => {
    const { userId } = req.params
    try {
        let user = await User.findById(userId);
        if (user != null) {
            user.password = "";
            res.status(200).json({ userId:user._id, user: user })
        }else{
            res.status(404).json({msg:'user not found'})
        }

    } catch (error) {
        log.error(error)
        res.status(401).json({ msg: "errro updating password" })
    }
})
export default router
