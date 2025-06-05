import axios from 'axios'

const BASE_URL = 'api/user'

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

  const { data } = await axios.get(`${BASE_URL}/data`, config)

  return data
}

const userService = {
  getUser
}

export default userService
