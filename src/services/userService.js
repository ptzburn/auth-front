import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || ''

const getUser = async () => {
  const token = localStorage.getItem('user')

  if (!token) {
    throw new Error('No token found, please log in')
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const { data } = await axios.get(`${API_URL}/api/user/data`, config)

  return data
}

const userService = {
  getUser
}

export default userService
