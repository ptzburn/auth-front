import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer.js'

const store = configureStore({
  reducer: {
    auth: authReducer
  },
  devTools: true
})

export default store
