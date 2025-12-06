import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from 'config'
import User from "../../models/user.model"
import log from '../../utils/logger'


const jwtSecret = config.get<string>('jwtSecret')

const authenticate = async (req: any, res: any, next: any) => {
    next()
    // const token = req.cookies.jwt;
    // if (token) {
    //     try {
    //         const decoded: any = jwt.verify(token, jwtSecret);
    //         const email = decoded.email;
    //         req.user = await User.findOne({ email });
    //         next();
    //     } catch (error) {
    //         log.error('auth failed, no user found')
    //         return res.status(401).json({ error: "no user found!" })
    //     }
    // } else {
    //     log.error('auth failed, no token')
    //     return res.status(401).json({ error: "no token found" })
    // }
};

const authorize = async (req: any, res: any, next: any) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        return res.status(401).json({message:"not authorized"})
    }
};

export { authenticate, authorize };
