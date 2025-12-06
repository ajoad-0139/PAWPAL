import mongoose from "mongoose";
import log from "./logger";
const connectDB=async(url:string)=>{
    try{
        await mongoose.connect(url);
        log.info('Successfully connected to mongodb')
    }catch(error){
        console.log(`Error: ${error}`)
    }
}

export default connectDB