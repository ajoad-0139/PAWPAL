import cloudinary from '../controller/config';
import streamifier from 'streamifier'


const uploadToCloudinary = (buffer:any, folder:any) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error:any, result:any) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export default uploadToCloudinary
