import { NextFunction, Request, Response } from 'express'
import { postSchema} from '../../schema/post.schema'
import log from '../../utils/logger'

export const validatePost = (req: Request, res: Response, next: NextFunction): any => {
    log.info('postSchema validating')
    const { error } = postSchema.validate(req.body, { abortEarly: false });
    if (error) {
        log.error('post Schema validation failed')
        return res.status(400).json({
            status: "error",
            message: "post schema validation failed",
        });

    }
    next()
}
