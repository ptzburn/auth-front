import axios from 'axios'

// Signing up
const signUp = async userData => {
  const { data } = await axios.post('/api/auth/sign-up', userData)

  if (data) localStorage.setItem('user', data.data.token)

  console.log(data.success, data.message)

  return data
}

// Signing in
const signIn = async userData => {
  const { data } = await axios.post('/api/auth/sign-in', userData)
  localStorage.setItem('user', data.data.token)

  return data
}

// Uploading avatar and getting its URL back
const uploadAvatar = async avatar => {
  const { data } = await axios.post('/api/auth/upload', avatar, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })

  return data.url
}

// Sending email verification OTP
const sendVerify = async () => {
  const token = localStorage.getItem('user')

  if (!token) {
    throw new Error('No token found, please log in')
  }

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

  const { data } = await axios.post('/api/auth/send-verification')

  return data
}

// Verifying email
const verifyEmail = async otp => {
  const token = localStorage.getItem('user')

  if (!token) {
    throw new Error('No token found, please log in')
  }

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

  const { data } = await axios.post('/api/auth/verify-email', otp)

  return data
}

// Sending password reset OTP
const sendResetOtp = async email => {
  const { data } = await axios.post('/api/auth/send-reset', email)

  return data
}

// Check reset OTP
const checkResetOtp = async userData => {
  const { data } = await axios.post('/api/auth/check-otp', userData)

  return data
}

// Resetting the password
const resetPassword = async resetData => {
  const { data } = await axios.post('/api/auth/reset-password', resetData)

  return data
}

const authService = {
  signUp,
  signIn,
  uploadAvatar,
  sendVerify,
  verifyEmail,
  sendResetOtp,
  resetPassword,
  checkResetOtp
}

export default authService
