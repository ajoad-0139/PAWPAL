import dotenv from 'dotenv'
dotenv.config()

export default {
    PORT: process.env.PORT,
    dbUri: process.env.DB_URI,
    jwtSecret: process.env.JWT_SECRET,
    saltValue: process.env.SALT_VALUE,
    expiresIn: process.env.SALT_VALUE,
    dbUri2: process.env.DB_URI2,
    ip:process.env.IP,
    cloudinary_api_secret:process.env.CLOUDINARY_SECRET,
    cloudinary_api_key:process.env.CLOUDINARY_API_KEY,
    cloudinary_name:process.env.CLOUDINARY_NAME
}