import { createAsyncThunk } from '@reduxjs/toolkit'
import userService from '../services/userService'

export const getUser = createAsyncThunk('', async () => {
  try {
    return await userService.getUser()
  } catch (error) {
    console.error(error.message)
    throw new Error('Error getting user')
  }
})
