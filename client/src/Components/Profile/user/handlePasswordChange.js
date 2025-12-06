import axios from "axios";


const handlePasswordChange = async (password, userId) => {
    try {
        const response = await axios.put(`https://www.pawpalbd.com/api/user/api/resetPassword/${userId}`, {password});
				return response?.data?.msg || 'Password Updated Successfully'
    } catch (error) {
        throw error?.response?.data?.msg || 'Something went wrong';
    }
}

export default handlePasswordChange;