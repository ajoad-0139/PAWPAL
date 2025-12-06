import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




const BASE_URL = 'https://www.pawpalbd.com/api/adoption/api/comment/'


const initialState = {
  comments: [],
  isLoading: false,
  state: 'idle'
}

export const createNewComment = createAsyncThunk("comments/createNewComment", async (comment) => {
  try{
    console.log(comment, "comment")
    const response = await axios.post(BASE_URL+'saveComment', comment);
    return response.data;
  } catch(err) {
    return err
  }
})

export const getAllComments = createAsyncThunk("comments/getAllComments", async(id) => {
  try {
    const response = await axios.get(BASE_URL+`loadComments/${id}`);
    return response.data
  } catch (error) {
    return error;
  }
})

export const eraseComment = createAsyncThunk("comments/eraseComment", async(id) => {
  try {
    const response = await axios.delete(BASE_URL+`deleteComment/${id}`);
    return response.data
  } catch (error) {
    return error;
  }
})

const adoptionCommentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
    .addCase(createNewComment.pending,(state,action) => {
      state.isLoading = true
      state.status = 'pending'
    })
    .addCase(createNewComment.fulfilled, (state, action) => {
      state.isLoading = false
      state.status = 'fulfilled'
    })
    .addCase(createNewComment.rejected,(state,action) => {
      state.isLoading=false,
      state.status = 'rejected'
    })
    .addCase(getAllComments.pending,(state,action) => {
      state.isLoading = true
      state.status = 'pending'
    })
    .addCase(getAllComments.fulfilled, (state, action) => {
      state.isLoading = false
      state.status = 'fulfilled'
      // state.comments = action?.payload
      //console.log(action.payload, 'action payload');
      state.comments = action?.payload
    })
    .addCase(getAllComments.rejected,(state,action) => {
      state.isLoading=false,
      state.status = 'rejected'
    })
    .addCase(eraseComment.pending,(state,action) => {
      state.isLoading = true
      state.status = 'pending'
    })
    .addCase(eraseComment.fulfilled, (state, action) => {
      state.isLoading = false
      state.status = 'fulfilled'
    })
    .addCase(eraseComment.rejected,(state,action) => {
      state.isLoading=false,
      state.status = 'rejected'
    })
  }
});

export const selectAllComments = (state) => state.adoptionComment.comments

export default adoptionCommentSlice.reducer;