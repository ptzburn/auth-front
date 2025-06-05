import React from 'react'
import VerifyForm from '../components/VerifyForm.jsx'
import { useNavigate } from 'react-router-dom'

const EmailVerification = ({ userData, setUserData }) => {
  const navigate = useNavigate()

  if (userData?.isVerified) {
    navigate('/')
  }

  return (
    <div className="email-verification">
      <VerifyForm userData={userData} setUserData={setUserData} />
    </div>
  )
}
export default EmailVerification
