import uploadToCloudinary from "../utils/uploadToCloudinary";
import Transport from '../models/transport.model'
import Chat from '../models/chat.model'
import log from '../utils/logger'
export const makeTransportRequest = async (req: any, res: any) => {
  const { userId, owner, pet, travel, agency, document } = req.body;
  console.log(owner)
  // if (!owner || !pet || !travel || !agency || !document) {
  //     return res.status(400).json({ error: 'Missing fields' });
  // }

  try {
    const transport = await Transport.create({
      userId,
      owner,
      pet,
      travel,
      agency,
      document,
    });

    return res.status(201).json({ transport });
  } catch (error) {
    log.error(error)
    res.status(401).json({ msg: "server error" })
  }
};

export const uploadFiles = async (req: any, res: any) => {
  if (!req.files) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  const resultUrls: any = {};
  const keys = ['vacFront', 'vacBack', 'standing', 'sitting'];
  for (const key of keys) {
    const file = req.files[key]?.[0];
    if (!file) {
      return res.status(400).json({ error: `${key} is missing` });
    }
    try {
      const uploadRes: any = await uploadToCloudinary(file.buffer, `transport/${key}`);
      resultUrls[key] = uploadRes.secure_url;
    } catch (error) {
      console.log(error)
      res.status(500).json
    }

  }
  return res.status(200).json({ urls: resultUrls });
};


export const getAllRequest = async (req: any, res: any) => {
  const transports = await Transport.find({})
  res.status(200).json({ transports });
}

export const getUserRequest = async (req: any, res: any) => {
  try {
    const { userId } = req.params;
    const transports = await Transport.find({ userId })
    res.status(200).json({ transports });
  } catch (error) {
    res.status(401).json({ error: error })
  }
}

export const deletePost = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    await Transport.findByIdAndDelete(id)
    res.status(200).json({ msg: "post deleted" })
  } catch (error) {
    res.status(401).json({ error: error })
  }
}

export const getPost = async (req: any, res: any) => {
  try {
    const { id } = req.params
    const post = await Transport.findById(id)
    res.status(200).json(post)
  } catch (error) {
    res.status(401).json({ error: error })
  }
}

export const getChats = async (req: any, res: any) => {
  try {
    const { id } = req.params
    const chats = await Chat.find({ id }).sort({ createdAt: 1 })
    res.status(200).json(chats)
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const sendChat = async (req:any, res:any) => {
  try {
    const { id } = req.params
    const { body, isAdmin, userName } = req.body

    const newChat = new Chat({
      id,
      body,
      isAdmin,
      userName
    })

    await newChat.save()
    res.status(201).json(newChat)
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const deleteChat = async (req:any, res:any) => {
  try {
    const { id } = req.params
    await Chat.find({id:id})
    res.status(200).json({ message: 'Chat deleted successfully.' })
  } catch (error) {
    res.status(500).json({error})
  }
}
