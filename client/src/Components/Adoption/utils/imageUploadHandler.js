import axios from "axios";

const IMAGE_URL = "https://www.pawpalbd.com/api/adoption/api/uploadImage";
const POST_URL = "https://www.pawpalbd.com/api/adoption/api/createPost";

export const imageUploadHandler = async (file) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const { data } = await axios.post(IMAGE_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return data.url;
  } catch (error) {
    return error;
  }
};

export const addPost = async (formBody) => {
  try {
    console.log(formBody)
    const response = await axios.post(POST_URL, formBody);
    return response.data;
  } catch (error) {
    return error;
  }
};
