import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
import Signup from './pages/Signup.jsx'
import Signin from './pages/Signin.jsx'
import Home from './pages/Home.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './reducers/userReducer.js'
import EmailVerification from './pages/EmailVerification.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const [userData, setUserData] = useState(null)

  const { user } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(getUser())
      setUserData(response?.payload?.data || null)
    }

    if (user) {
      fetchData()
    } else {
      setUserData(null)
    }
  }, [user, dispatch])

  return (
    <main>
      <Header userData={userData} user={user} />
      <ToastContainer />
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<Home userData={userData} user={user} />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route
            path="/verify-email"
            element={<EmailVerification userData={userData} setUserData={setUserData} />}
          />
        </Routes>
      </div>
    </main>
  )
}
export default App
