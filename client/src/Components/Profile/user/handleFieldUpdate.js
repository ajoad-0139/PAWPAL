import axios from 'axios'

const handleFieldUpdate = async (userId, field, data) => {
  console.log(userId,field,data)

  try {
    const response = await axios.put(`https://www.pawpalbd.com/api/user/api/edit/${userId}/${field}`, {data})
    return response?.data;
  } catch (error) {
    throw error?.response?.data || "Failed to update data"
  }
}

export default handleFieldUpdate