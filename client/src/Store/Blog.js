import { dataURItoBlob, extractPublicIds } from "@/Utils/blog";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import axios from "axios";

export const getFeaturedBlogs = createAsyncThunk(
  "blog/getFeaturedBlogs",
  async ({ userId }, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://www.pawpalbd.com/api/user/blog/feature",
        { params: { userId } }
      );
      console.log(response.data, "response.data");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const toggleFeaturedBlog = createAsyncThunk(
  "blog/toggleFeaturedBlog",
  async ({ blogId }, thunkAPI) => {
    try {
      const response = await axios.patch(
        "https://www.pawpalbd.com/api/user/blog/feature",
        { blogId }
      );
      console.log(response.data, "response.data");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getEverySingleBlogs = createAsyncThunk(
  "blog/getEverySingleBlog",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://www.pawpalbd.com/api/user/blog/getAllBlogs"
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getBlogs = createAsyncThunk(
  "blog/getBlogs",
  async ({ userId }, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://www.pawpalbd.com/api/user/blog/",
        { params: { userId } }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getSpecificBlogs = createAsyncThunk(
  "blog/getSpecificBlogs",
  async ({ type }, thunkAPI) => {
    try {
      console.log("inside getSpecificBlogs....");
      const response = await axios.get(
        "https://www.pawpalbd.com/api/user/blog/type",
        {
          params: { type },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteBlogPost = createAsyncThunk(
  "blog/deleteBlogPost",
  async ({ blogId }, thunkAPI) => {
    console.log(blogId, "delete");
    try {
      const response = await axios.delete(
        "https://www.pawpalbd.com/api/user/blog/",
        {
          params: { blogId },
        }
      );
      return blogId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateBlogPost = createAsyncThunk(
  "blog/updateBlogPost",
  async ({ newContentJson, oldContentJson, blogId }, thunkAPI) => {
    try {
      const base64Images = [];
      const removedImageIds = [];

      const oldImageIds = extractPublicIds(oldContentJson);
      const newImageIds = extractPublicIds(newContentJson);

      oldImageIds.forEach((id) => {
        if (!newImageIds.has(id)) {
          removedImageIds.push(id);
        }
      });
      const findBase64Images = (node) => {
        if (node.type === "image" && node.attrs?.src?.startsWith("data:")) {
          base64Images.push({ node, blob: dataURItoBlob(node.attrs.src) });
        }
        node.content?.forEach(findBase64Images);
      };
      findBase64Images(newContentJson);
      if (base64Images.length > 0) {
        const formData = new FormData();
        base64Images.forEach(({ blob }) => formData.append("images", blob));

        const uploadRes = await axios.post(
          "https://www.pawpalbd.com/api/user/blog/image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const { urls } = uploadRes.data;

        let index = 0;
        const replaceImages = (node) => {
          if (node.type === "image" && node.attrs?.src?.startsWith("data:")) {
            node.attrs.src = urls[index].url;
            node.attrs.public_id = urls[index].public_id;
            index++;
          }
          node.content?.forEach(replaceImages);
        };
        replaceImages(newContentJson);
      }

      const res = await axios.patch("https://www.pawpalbd.com/api/user/blog/", {
        blogId,
        content: newContentJson,
        removedImageIds,
        withCredentials: true,
      });

      return res.data.blog;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const saveBlogPost = createAsyncThunk(
  "blog/saveBlogPost",
  async ({ contentJson, type, userId }, thunkAPI) => {
    try {
      const base64Images = [];

      const dataURItoBlob = (dataURI) => {
        const byteString = atob(dataURI.split(",")[1]);
        const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
      };

      const findBase64Images = (node) => {
        if (node.type === "image" && node.attrs?.src?.startsWith("data:")) {
          base64Images.push({ node, blob: dataURItoBlob(node.attrs.src) });
        }
        node.content?.forEach(findBase64Images);
      };
      findBase64Images(contentJson);

      if (base64Images.length > 0) {
        const formData = new FormData();
        base64Images.forEach(({ blob }) => formData.append("images", blob));

        const uploadRes = await axios.post(
          "https://www.pawpalbd.com/api/user/blog/image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const { urls } = uploadRes.data;

        let index = 0;
        const replaceImages = (node) => {
          if (node.type === "image" && node.attrs?.src?.startsWith("data:")) {
            node.attrs.src = urls[index].url;
            node.attrs.public_id = urls[index].public_id;
            index++;
          }
          node.content?.forEach(replaceImages);
        };
        replaceImages(contentJson);
      }

      const createRes = await axios.post(
        "https://www.pawpalbd.com/api/user/blog/",
        {
          content: contentJson,
          type,
          userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = createRes.data;
      return data.blog;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  blogUser: null,
  blog: null,
  featuredBlogs: [],
  blogs: [],
  specificBlogs: [],
  blogTabIndex: 6,
  isShowBlogTypeModal: false,
  isLoading: false,
  everySingleBlog: [],
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogTabIndex(state, action) {
      state.blogTabIndex = action.payload;
    },
    setBlog(state, action) {
      state.blog = action.payload;
    },
    setBlogs(state, action) {
      state.blogs.push(action.payload);
    },
    setIsShowBlogTypeModal(state, action) {
      state.isShowBlogTypeModal = action.payload;
    },
    setBlogUser(state, action) {
      state.blogUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveBlogPost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(saveBlogPost.rejected, (state, action) => {
        state.isLoading = false;
        toast.error("Oops! something wrong happened...");
      })
      .addCase(saveBlogPost.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
        state.isLoading = false;
        toast.success("Blog is posted successfully!");
        console.log(action.payload);
      })
      .addCase(getBlogs.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        console.log(action.payload);
        state.blogs = action.payload.blogs;
        state.isLoading = false;
      })
      .addCase(getSpecificBlogs.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getSpecificBlogs.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getSpecificBlogs.fulfilled, (state, action) => {
        state.specificBlogs = action.payload.blogs;
        state.isLoading = false;
      })
      .addCase(updateBlogPost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateBlogPost.rejected, (state, action) => {
        state.isLoading = false;
        toast.error("Oops! something wrong happened...");
      })
      .addCase(updateBlogPost.fulfilled, (state, action) => {
        const { _id } = action.payload;
        state.blogs = state.blogs.filter((item) => item._id !== _id);
        state.blogs.push(action.payload);
        state.isLoading = false;
        toast.success("Blog is updated successfully!");
      })
      .addCase(deleteBlogPost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteBlogPost.rejected, (state, action) => {
        state.isLoading = false;
        toast.error("Oops! something wrong happened...");
      })
      .addCase(deleteBlogPost.fulfilled, (state, action) => {
        console.log(action.payload, "from delete");
        state.blogs = state.blogs.filter((item) => item._id !== action.payload);
        state.isLoading = false;
        toast.success("Blog is deleted successfully!");
      })
      .addCase(getFeaturedBlogs.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getFeaturedBlogs.fulfilled, (state, action) => {
        state.featuredBlogs = action.payload.blogs;
        state.isLoading = false;
      })
      .addCase(getFeaturedBlogs.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getEverySingleBlogs.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getEverySingleBlogs.fulfilled, (state, action) => {
        // console.log(action?.payload?.blogs)
        state.everySingleBlog = action?.payload?.blogs;
        state.isLoading = false;
      })
      .addCase(getEverySingleBlogs.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(toggleFeaturedBlog.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(toggleFeaturedBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedBlog = action?.payload?.blog;

        if (updatedBlog?.isFeature) {
          if (
            !state.featuredBlogs.some((blog) => blog._id === updatedBlog._id)
          ) {
            state.featuredBlogs.push(updatedBlog);
          }

          state.everySingleBlog = state.everySingleBlog.filter(
            (blog) => blog._id !== updatedBlog._id
          );
        } else {
          state.featuredBlogs = state.featuredBlogs.filter(
            (blog) => blog._id !== updatedBlog._id
          );

          if (
            !state.everySingleBlog.some((blog) => blog._id === updatedBlog._id)
          ) {
            state.everySingleBlog.push(updatedBlog);
          }
        }
      })
      .addCase(toggleFeaturedBlog.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default blogSlice.reducer;
export const {
  setBlogTabIndex,
  setBlog,
  setBlogs,
  setIsShowBlogTypeModal,
  setBlogUser,
} = blogSlice.actions;
export const blogs = (state) => state.blog.blogs;
export const blog = (state) => state.blog.blog;
export const featuredBlogs = (state) => state.blog.featuredBlogs;
export const blogTabIndex = (state) => state.blog.blogTabIndex;
export const isShowBlogTypeModal = (state) => state.blog.isShowBlogTypeModal;
export const specificBlogs = (state) => state.blog.specificBlogs;
export const blogIsLoading = (state) => state.blog.isLoading;
export const blogUser = (state) => state.blog.blogUser;
export const everyBlog = (state) => state.blog.everySingleBlog;
