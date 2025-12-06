import axios from 'axios'

const getUserDetailsWithId = async (userId) => {
    console.log(userId)
  try {
    const response = await axios.get(`https://www.pawpalbd.com/api/user/api/getUserInfo/${userId}`)
    return response?.data;
  } catch (error) {
    throw error?.response?.data || "Failed to fetch user data"
  }
}

export default getUserDetailsWithId