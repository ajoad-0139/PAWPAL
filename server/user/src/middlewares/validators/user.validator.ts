import { NextFunction, Request, Response } from 'express'
import { loginSchema, userSchema } from '../../schema/user.schema'
import log from '../../utils/logger'

export const validateUser = (req: Request, res: Response, next: NextFunction): any => {
    log.info('userSchema validating')
    const { error } = userSchema.validate(req.body, { abortEarly: false });
    if (error) {
        log.error('User Schema validation failed')
        return res.status(400).json({
            status: "error",
            message: "user schema validation failed",
        });

    }
    next()
}

export const validateLogin = (req: Request, res: Response, next: NextFunction): any => {
    log.info('login validating')
    const { error } = loginSchema.validate(req.body, { abortEarly: false });
    if (error) {
        log.error('login schema validation failed')
        return res.status(400).json({
            status: "error",
            message: "login schema validation failed",
        });

    }
    next()

}