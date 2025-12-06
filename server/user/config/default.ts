import dotenv from 'dotenv'
dotenv.config()

export default {
    PORT: 3000,
    dbUri: process.env.DB_URI,
    jwtSecret: process.env.JWT_SECRET,
    saltValue: process.env.SALT_VALUE,
    expiresIn: process.env.SALT_VALUE,
    dbUri2: process.env.DB_URI2,
    ip:process.env.IP

}