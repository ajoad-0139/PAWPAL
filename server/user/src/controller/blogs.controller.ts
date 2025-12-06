import cloudinary from './config';
import mongoose from 'mongoose'
import Blog from '../models/blogs.model'
import log from '../utils/logger'
import fs from 'fs'

const createBlog = async (req: any, res: any) => {
  const blog = await Blog.create(req.body);
  console.log(blog);
  res.status(200).json({ blog });
};

const updateBlog = async (req: any, res: any) => {
  const { blogId, content, removedImageIds } = req.body;

  if (removedImageIds && removedImageIds.length > 0) {
    await Promise.all(
      removedImageIds.map((public_id: any) => {
        return cloudinary.uploader.destroy(public_id);
      })
    );
  }
  const updatedBlog = await Blog.findByIdAndUpdate(
    blogId,
    { content },
    { new: true }
  );

  res.status(200).json({ blog: updatedBlog });
};

const getBlogs = async (req: any, res: any) => {
  const { userId } = req.query
  if (!userId) return res.status(400).json({ msg: 'userId is not provided' })
  const blogs = await Blog.find({ userId: new mongoose.Types.ObjectId(userId) });
  res.status(200).json({ blogs });
};

const deleteBlog = async (req: any, res: any) => {

  const { blogId } = req.query;
  console.log(`blog id ${blogId}`)
  const blog = await Blog.findOne({ _id: blogId });
  if (!blog) return res.status(404).json({ msg: 'Blog not found' });

  const publicIdsToDelete: any = [];
  const extractPublicIds = (node: any) => {
    if (node.type === 'image' && node.attrs?.public_id) {
      publicIdsToDelete.push(node.attrs.public_id);
    }
    if (node.content) {
      node.content.forEach(extractPublicIds);
    }
  };
  extractPublicIds(blog.content);

  await Promise.all(
    publicIdsToDelete.map((public_id: any) => cloudinary.uploader.destroy(public_id))
  );

  await Blog.findOneAndDelete({ _id: blogId });

  res.status(200).json({ msg: 'Blog and associated images deleted' });
};

const uploadImages = async (req: any, res: any) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ msg: 'No files uploaded' });
  }
  const urls = await Promise.all(
    req.files.map(async (file: any) => {
      // const base64 = `data:${file.mimetype};base64,${file.buffer.toString(
      //   'base64'
      // )}`;
      // const result = await cloudinary.uploader.upload(base64, {
      //   folder: 'blogs',
      // });]
      if (file) {
        console.log('uploadTocloudinary')
        const result = await uploadToCloudinary(file.path)
        // log.info(result)
        fs.unlinkSync(file.path);
        return {
          url: result?.secure_url,
          public_id: result?.public_id,
        };
      }
      else {
        return res.send('error')
      }

    })
  );
  console.log(urls);
  res.json({ urls });
};

const getBlogsOfTypes = async (req: any, res: any) => {
  const { type } = req.query;
  const blogs = await Blog.find({ type });
  res.status(200).json({ blogs });
};

const toggleFeature = async (req: any, res: any) => {
  const { blogId } = req.body;
  const blog = await Blog.findOne({ blogId });
  if (!blog) return res.status(400).json({ msg: 'blog not found' });
  blog.isFeature = !blog.isFeature;
  await blog.save();
  res.status(200).json({ blog });
}

const getFeaturedBlogs = async (req: any, res: any) => {
  const blogs = await Blog.find({ isFeature: true })
  res.status(200).json({ blogs });
}

const uploadToCloudinary = async (filePath: string) => {
  try {
    const response = await cloudinary.uploader.upload(filePath, {
      folder: 'blog',
      resource_type: 'auto'
    })
    return response
  } catch (error) {
    fs.unlinkSync(filePath) //removes locally saved file 
    log.error('error2!')
    return
  }
}

export {
  createBlog,
  updateBlog,
  getBlogs,
  deleteBlog,
  uploadImages,
  getBlogsOfTypes,
  toggleFeature,
  getFeaturedBlogs
};