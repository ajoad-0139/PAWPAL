import { Request, Response } from "express";
import User from "../models/user.model";
import log from "../utils/logger";
import bcrypt from 'bcrypt'
import { passwordHashing } from "../utils/passwordHashing";
import generateToken from "../utils/tokenGenerator";
import cloudinary from "./config";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { sendVerificationEmail } from "../services/email.service";
import config from 'config'

const jwtSecret = config.get<string>('jwtSecret')

dotenv.config();
const BASE_URL = process.env.BASE_URL;

export const createUser = async (req: Request, res: Response): Promise<any> => {
    try {

        const user = new User(req.body)
        const ChkUser = await User.findOne({ email: req.body.email })
        if (ChkUser) {
            return res.status(400).json('user already exists')
        }

        user.password = await passwordHashing(user.password)
        log.info(req.body)
        user.isAdmin = false

        const newUser = await user.save()
        const token = generateToken(user.email)

        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        return res.status(201).json({
            userId: newUser._id,
            username: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
        });
    } catch (error) {
        log.error(error)
        return res.status(500).json({ message: "internal server error!", error: error })
    }
}

export const loginUser = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
    let userExist = await User.findOne({ email });
    if (userExist) {
        const isPasswordValid = await bcrypt.compare(
            password,
            userExist.password
        );
        if (isPasswordValid) {
            const token = generateToken(email);
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
            });
            userExist.password=""
            return res.status(201).json({
               userId:userExist._id,
               user:userExist
            });
        } else {
            return res.status(400).json("password mismatched");
        }
    } else {
        return res.status(404).json({ error: "user not found!" })
    }
};

export const logoutUser = async (req: Request, res: Response): Promise<any> => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    return res.status(200).json({ message: "logout successful" });
};


export const createTransporter = async (req: Request, res: Response): Promise<any> => {
    try {
        const email = req.body.email
        if (typeof email === "undefined") {
            return res.status(404).json({ message: 'email not found' })
        }
        const ChkUser = await User.findOne({ email: req.body.email })
        if (ChkUser) {
            const updateUser = await User.findOneAndUpdate(
                { email: email }, // Find by email
                { isTransporter: true, }, // Update field
                { new: true } // Return updated document
            );
            return res.status(200).json({ email: email, message: "transporter created" })
        }
        else {
            return res.status(404).json({ message: 'user not found' })
        }
    } catch (error) {
        return res.status(500).json({ message: "internal server error!", error })
    }
}


export const uploadProfilePicture = async (req: any, res: any) => {
    const { userId } = req.params
    // if(userId!=req.user.userId){
    //     return res.status(401).json({msg:"unauthorized"})
    // }
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ msg: 'No files uploaded' });
    }
    try {
        const url = await Promise.all(
            req.files.map(async (file: any) => {
                const base64 = `data:${file.mimetype};base64,${file.buffer.toString(
                    'base64'
                )}`;
                const result = await cloudinary.uploader.upload(base64, {
                    folder: 'profiles',
                });
                return {
                    url: result.secure_url,
                    public_id: result.public_id,
                };
            })
        );
        console.log(url)
        const updatedUser = await User.findByIdAndUpdate(userId, { profilePicture: url[0].url },
            { new: true, runValidators: true })
        return res.status(200).json({ updatedUser });
    }
    catch (error) {
        log.error(error)
        return res.status(401).json({ msg: 'server error' })
    }
};

export const resetPassword = async (req: any, res: any) => {
    const { userId } = req.params
    // if(userId!=req.user.userId){
    //     return res.status(401).json({msg:"unauthorized"})
    // }
    let password = req.body.password

    try {
        password = await passwordHashing(password)
        const updatedUser = await User.findByIdAndUpdate(userId, {
            password: password
        })
        res.status(200).json({ msg: "password updated" })
    } catch (error) {
        log.error(error)
        res.status(401).json({ msg: "errro updating password" })
    }
}

export const registerWithVerification = async (req: Request, res: Response): Promise<any> => {
    try {

        const user = new User(req.body)
        const ChkUser = await User.findOne({ email: req.body.email })
        if (ChkUser) {
            return res.status(400).json('user already exists')
        }

        user.password = await passwordHashing(user.password)
        log.info(req.body)
        user.isAdmin = false

        const newUser = await user.save()
        // const token = generateToken(user.email)
        const verificationToken = generateToken(user.email)
        const verificationLink = `${BASE_URL}/user/api/verify-email/${verificationToken}`
        // res.cookie("jwt", token, {
        //     httpOnly: true,
        //     maxAge: 24 * 60 * 60 * 1000,
        // });
        await sendVerificationEmail({
            to: user.email,
            username: user.name,
            verificationLink: verificationLink,
        });
        return res.status(201).json({
            message: "Registration successful! Please check your mail for verification link",
            userId: newUser._id,
            username: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
        });
    } catch (error) {
        log.error(error)
        return res.status(500).json({ message: "internal server error!", error: error })
    }
}

export const verifyMail = async (req: Request, res: Response): Promise<any> => {
    const { token } = req.params;

    try {
        const decoded: any = jwt.verify(token, jwtSecret);

        const user = await User.findOne({ email: decoded.email });

        if (!user) {
            return res.status(404).send('<p style="color: red; font-size: 1.5em; text-align: center;">Verification failed: User not found.</p>');
        }

        if (user.isVerified) {
            return res.status(200).send('<div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; background-color: #f9fafb;" >< div style = "padding: 20px; background: #fff; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); text-align: center; max-width: 400px;" ><p style="color: #16a34a; font-size: 1.5em; font-weight: 600; margin: 0;" >✅ Email verified successfully!</p>< p style = "margin-top: 10px; color: #4b5563; font-size: 1em;" >You can now log in to your account.</p></div></div>');
        }


user.isVerified = true;
await user.save();

res.status(200).send('<p style="color: green; font-size: 1.5em; text-align: center;">Email verified successfully! You can now log in.</p>');

    } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
        return res.status(400).send('<p style="color: red; font-size: 1.5em; text-align: center;">Verification link expired. Please request a new one.</p>');
    }
    if (error.name === 'JsonWebTokenError') {
        return res.status(400).send('<p style="color: red; font-size: 1.5em; text-align: center;">Verification failed: Invalid token.</p>');
    }
    console.error('Email verification error:', error);
    res.status(500).send('<p style="color: red; font-size: 1.5em; text-align: center;">Server error during email verification.</p>');
}
};

export const resendVerificationLink = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        if (user.isVerified) {
            return res.status(400).json({ message: 'Email is already verified.' });
        }

        // Re-generate token
        const verificationToken = generateToken(user.email)
        const verificationLink = `${BASE_URL}/adoption/api/verify-email/${verificationToken}`;

        await sendVerificationEmail({
            to: user.email,
            username: user.name,
            verificationLink: verificationLink,
        });

        res.status(200).json({ message: 'New verification email sent. Please check your inbox.' });

    } catch (error) {
        console.error('Resend verification email error:', error);
        res.status(500).json({ message: 'Server error during resending verification email.' });
    }
};
