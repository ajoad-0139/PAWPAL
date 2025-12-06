import Joi from 'joi'
import { emit } from 'process'

export interface userInput {
    name?: string,
    email?: string,
    password?: string,
    isAdmin?: boolean,
    isTransporter?: boolean,
}

export const userSchema = Joi.object<userInput>({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    isAdmin: Joi.boolean().default(false),
    isTransporter: Joi.boolean().default(false)
})

export const loginSchema = Joi.object<userInput>({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    isAdmin: Joi.boolean().default(false),
    isTransporter: Joi.boolean().default(false)
})
