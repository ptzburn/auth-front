import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from '../services/authService.js'
import { toast } from 'react-toastify'

const initialState = {
  user: localStorage.getItem('user') ? localStorage.getItem('user') : null,
  isError: false,
  isSuccess: false,
  isLoading: false
}

export const signUp = createAsyncThunk('auth/sign-up', async user => {
  try {
    const response = await authService.signUp(user)
    toast.success(response.message)
    return response
  } catch (error) {
    toast.error(error.response.data.message)
    throw new Error('Invalid data')
  }
})

export const signIn = createAsyncThunk('auth/sign-in', async user => {
  try {
    const response = await authService.signIn(user)
    toast.success(response.message)
    return response
  } catch (error) {
    toast.error(error.response.data.message)
    throw new Error('Invalid data')
  }
})

export const uploadAvatar = createAsyncThunk('auth/upload', async avatar => {
  try {
    return await authService.uploadAvatar(avatar)
  } catch (error) {
    console.error(error.message)
    throw new Error('Invalid data')
  }
})

export const sendVerify = createAsyncThunk('auth/send-verification', async () => {
  try {
    const response = await authService.sendVerify()
    toast.success(response.message)
    return response
  } catch (error) {
    toast.error(error.response.data.message)
    throw new Error('Invalid data')
  }
})

export const verifyEmail = createAsyncThunk('auth/verify-email', async otp => {
  try {
    const response = await authService.verifyEmail(otp)
    toast.success(response.message)
    return response
  } catch (error) {
    toast.error(error.response.data.message)
    throw new Error('Invalid data')
  }
})

export const sendResetOtp = createAsyncThunk('auth/send-reset', async email => {
  try {
    const response = await authService.sendResetOtp(email)
    toast.success(response.message)
    return response
  } catch (error) {
    toast.error(error.response.data.message)
    throw new Error('Invalid data')
  }
})

export const checkResetOtp = createAsyncThunk('auth/check-otp', async userData => {
  try {
    return await authService.checkResetOtp(userData)
  } catch (error) {
    toast.error(error.response.data.message)
    throw new Error('Invalid data')
  }
})

export const resetPassword = createAsyncThunk('auth/reset-password', async resetData => {
  try {
    return await authService.resetPassword(resetData)
  } catch (error) {
    console.error(error.message)
    throw new Error('Invalid data')
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: state => {
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
    },
    signout: state => {
      state.user = null
    }
  },
  extraReducers: builder => {
    builder
      // Signing up
      .addCase(signUp.pending, state => {
        state.isLoading = true
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(signUp.rejected, state => {
        state.isLoading = false
        state.isError = true
        state.user = null
      })
      // Signing in
      .addCase(signIn.pending, state => {
        state.isLoading = true
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(signIn.rejected, state => {
        state.isLoading = false
        state.isError = true
        state.user = null
      })
  }
})

export const { reset, signout } = authSlice.actions
export default authSlice.reducer
