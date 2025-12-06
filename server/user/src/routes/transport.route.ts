import express from 'express'
const Router = express.Router();
import multer from 'multer'
import { makeTransportRequest, uploadFiles, getAllRequest, getUserRequest, deletePost, getPost, getChats, sendChat, deleteChat } from '../controller/transport.controller';
import router from './user.route';
import Transport from '../models/transport.model'
const upload = multer({ storage: multer.memoryStorage() });

Router.route('/')
  .get(getAllRequest)
  .post(makeTransportRequest);
Router.route('/doc').post(
  upload.fields([
    { name: 'vacFront', maxCount: 1 },
    { name: 'vacBack', maxCount: 1 },
    { name: 'standing', maxCount: 1 },
    { name: 'sitting', maxCount: 1 },
  ]),
  uploadFiles
);
Router.route('/isApproved/:id').post(async (req: any, res: any) => {
  try {
    const { id } = req.params
    const post = await Transport.findByIdAndUpdate(id, { isApproved: true })
    res.status(200).json({ post })
  } catch (error) {
    res.status(401).json({ error: "server error" })
  }
})
Router.route('/isCompleted/:id').post(async (req: any, res: any) => {
  try {
    const { id } = req.params
    const post = await Transport.findByIdAndUpdate(id, { isCompleted: true })
    res.status(200).json({ post })
  } catch (error) {
    res.status(401).json({ error: "server error" })
  }
})
Router.route('/specific/:userId').get(getUserRequest)
Router.route('/delete/:id').delete(deletePost)
Router.route('/getPost/:id').get(getPost)
Router.route('/chat/:id').get(getChats)
  .post(sendChat)
  .delete(deleteChat)
export default Router;
