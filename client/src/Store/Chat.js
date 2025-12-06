import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://www.pawpalbd.com/api/user/transport/"

const initialState = {
  chats: [],
  isLoading: false,
  status: "idle",
};

export const getAllChats = createAsyncThunk(
  "adoptionPostSlice/getAllChats",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(BASE_URL+`chat/${id}`,);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: "Some error occured during call" });
    }
  }
);

export const sendChat = createAsyncThunk(
  "adoptionPostSlice/sendChat",
  async ({id, formBody}, thunkAPI) => {
    try {
      console.log(id, formBody, 'chat thunk')
      const response = await axios.post(BASE_URL+`chat/${id}`, formBody,);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: "Some error occured during call" });
    }
  }
);

export const deleteChat = createAsyncThunk(
  "adoptionPostSlice/deleteChat",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(
        BASE_URL+`chat/${id}`,
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);



const transportChatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllChats.pending, (state, action) => {
        state.isLoading = true;
        state.status = "pending";
      })
      .addCase(getAllChats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chats = action.payload
        state.status = "fulfilled";
      })
      .addCase(getAllChats.rejected, (state, action) => {
        state.isLoading = false;
        state.status = "rejected";
      })
      .addCase(sendChat.pending, (state, action) => {
        state.isLoading = true;
        state.status = "pending";
      })
      .addCase(sendChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "fulfilled";
      })
      .addCase(sendChat.rejected, (state, action) => {
        state.isLoading = false;
        state.status = "rejected";
      })
      .addCase(deleteChat.pending, (state, action) => {
        state.isLoading = true;
        state.status = "pending";
      })
      .addCase(deleteChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "fulfilled";
      })
      .addCase(deleteChat.rejected, (state, action) => {
        state.isLoading = false;
        state.status = "rejected";
      })
  },
});

export const selectAllChats = (state) => state.transportChats.chats;
export const getLoadingState = (state) => state.transportChats.isLoading;
export const getStatus = (state) => state.transportChats.status;

export default transportChatSlice.reducer;
