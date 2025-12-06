import { v2 as cloudinary } from 'cloudinary'
import log from './logger'
import config from 'config'
import fs from 'fs'

const apikey = config.get<string>('cloudinary_api_key')
const apiSecret = config.get<string>('cloudinary_api_secret')
const name = config.get<string>('cloudinary_name')
cloudinary.config({
    cloud_name: name,
    api_key: apikey,
    api_secret: apiSecret
})

const uploadToCloudinary=async(filePath:string)=>{
    try{
        if(!filePath){
           return 'error1'
        }
        const response=await cloudinary.uploader.upload(filePath,{
            folder:'pawpal',
            resource_type:'auto'
        })
        return response.url
    }catch(error){
        fs.unlinkSync(filePath) //removes locally saved file 
        log.error('error2!')
        return 
    }
}

export default uploadToCloudinary