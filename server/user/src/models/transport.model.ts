import mongoose from 'mongoose'
import User from './user.model'
import { required } from 'joi';
const transportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true
  },
  owner: {
    type: Object,
    required: true,
  },
  pet: {
    type: Object,
    required: true,
  },
  travel: {
    type: Object,
    required: true,
  },
  agency: {
    type: Object,
    required: true,
  },
  document: {
    type: Object,
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('transport', transportSchema);
