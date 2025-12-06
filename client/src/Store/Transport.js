import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import axios from "axios";

export const uploadMessagesByChat = createAsyncThunk(
  "transport/uploadMessagesByChat",
  async ({ data, id }, thunkAPI) => {
    try {
      const response = await axios.post("", data, {
        params: { id }, 
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getAllTransportRequest = createAsyncThunk(
  "transport/getAllTransportRequest",
  async (_arg, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://www.pawpalbd.com/api/user/transport", {}
      );
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getUserTransport = createAsyncThunk('transport/getUserTransport', async (userId, thunkAPI) => {
  try {
    const response = await axios.get(
      `https://www.pawpalbd.com/api/user/transport/specific/${userId}`, {}
    )
    return response?.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message)
  }
})

export const getMessagesByChat = createAsyncThunk(
  "transport/getMessagesByChat",
  async ({ id }, thunkAPI) => {
    try {
      const response = axios.get("", {
        params: { id }, 
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getChatId = createAsyncThunk(
  "transport/getChatId",
  async ({ userId, agencyId }, thunkAPI) => {
    try {
      const response = axios.get("", {
        params: { userId, agencyId }, 
      });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const uploadDocs = createAsyncThunk(
  "transport/uploadDocs",
  async (files, thunkAPI) => {
    try {
      const fd = new FormData();
      Object.entries(files).forEach(([k, file]) => fd.append(k, file));
      const resp = await axios.post(
        "https://www.pawpalbd.com/api/user/transport/doc",
        fd,
        {
          headers: { "Content-Type": "multipart/form-data" }, 
        }
      );
      return resp.data.urls; // { vacFront, vacBack, standing, sitting }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const makeTransport = createAsyncThunk(
  "transport/makeTransport",
  async (data, thunkAPI) => {
    try {
      console.log("inside makeTransport");
      const response = await axios.post(
        "https://www.pawpalbd.com/api/user/transport/",
        data,{}
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTransport = createAsyncThunk(
  "transport/deleteTransport",
  async (id, thunkAPI) => {
    try {
      console.log(id, "inside makeTransport");
      const response = await axios.delete(
        `https://www.pawpalbd.com/api/user/transport/delete/${id}`, {}
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getSingleTransportById = createAsyncThunk("transport/getSingleTransportById", async(id, thunkAPI) => {
  try {
    console.log(id, 'inside single by id')
    const response = await axios.get(`https://www.pawpalbd.com/api/user/transport/getPost/${id}`, {});
    console.log(response.data);
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
})
const initialState = {
  allTransPortDetails: [],
  userTransPortDetails: [],
  singleTransportDetails: null,
  messages: [],
  chatId: null,
  isLoading: false,
  transportForm: {
    owner: null,
    pet: null,
    travel: null,
    document: null,
    agency: null,
  },
};

const transportSlice = createSlice({
  name: "transport",
  initialState,
  reducers: {
    setTransportFrom(state, action) {
      const { data, section } = action.payload;
      state.transportForm[section] = { ...data };
    },
    appendMessage(state, action) {
      state.messages.push(action.payload);
    },
    setSingleTransportDetails(state, action) {
      state.singleTransportDetails = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(makeTransport.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(makeTransport.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success("Request is placed successfully!");
      })
      .addCase(makeTransport.rejected, (state, action) => {
        state.isLoading = false;
        toast.error("Oops! something went wrong...");
      })
      .addCase(uploadDocs.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(uploadDocs.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(uploadDocs.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getChatId.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getChatId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chatId = action.payload;
      })
      .addCase(getChatId.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getMessagesByChat.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(uploadMessagesByChat.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      })
      .addCase(getUserTransport.pending, (state,action) => {
        state.isLoading = true
      })
      .addCase(getUserTransport.fulfilled, (state,action) => {
        state.isLoading = false;
        console.log(action.payload, 'from reducer')
        state.userTransPortDetails = action.payload.transports
      })
      .addCase(getUserTransport.rejected, (state,action) => {
        state.isLoading = false
      })
      .addCase(deleteTransport.pending, (state,action) => {
        state.isLoading = true
      })
      .addCase(deleteTransport.fulfilled, (state,action) => {
        state.isLoading = false;
        console.log(action.payload, 'from reducer')
      })
      .addCase(deleteTransport.rejected, (state,action) => {
        state.isLoading = false
      })
      .addCase(getSingleTransportById.pending, (state,action) => {
        state.isLoading = true
      })
      .addCase(getSingleTransportById.fulfilled, (state,action) => {
        state.isLoading = false;
        console.log(action.payload, 'from reducer')
        state.singleTransportDetails = action.payload
      
      })
      .addCase(getSingleTransportById.rejected, (state,action) => {
        state.isLoading = false
      })
      .addCase(getAllTransportRequest.pending, (state,action) => {
        state.isLoading = true
      })
      .addCase(getAllTransportRequest.fulfilled, (state,action) => {
        state.isLoading = false;
        console.log(action.payload, 'from reducer')
        state.allTransPortDetails = action.payload.transports
      })
      .addCase(getAllTransportRequest.rejected, (state,action) => {
        state.isLoading = false
      })
  },
});

export default transportSlice.reducer;
export const { setTransportFrom, appendMessage, setSingleTransportDetails } =
  transportSlice.actions;

export const transportForm = (state) => state.transport.transportForm;
export const transportIsLoading = (state) => state.transport.isLoading;
export const chatId = (state) => state.transport.chatId;
export const messages = (state) => state.transport.messages;
export const singleTransportDetails = (state) =>
  state.transport.singleTransportDetails;
export const getUserTransportDeatils = state => state.transport.userTransPortDetails
export const getAllList = state => state.transport.allTransPortDetails
