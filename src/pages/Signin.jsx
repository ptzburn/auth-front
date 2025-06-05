import React, { useState } from 'react'
import SignInForm from '../components/signInForm.jsx'
import ResetForm from '../components/ResetForm.jsx'
import ResetForm2 from '../components/ResetForm2.jsx'
import ResetForm3 from '../components/ResetForm3.jsx'

const Signin = () => {
  const [isReset, setIsReset] = useState(false)
  const [isEmail, setIsEmail] = useState(false)
  const [isOtp, setIsOtp] = useState(false)
  const [otp, setOtp] = useState(0)
  const [email, setEmail] = useState('')

  return (
    <>
      {isReset ? (
        <div className="login">
          {!isEmail && <ResetForm setIsEmail={setIsEmail} setEmail={setEmail} />}
          {!isOtp && isEmail && (
            <ResetForm2 setIsOtp={setIsOtp} setOtp={setOtp} email={email} otp={otp} />
          )}
          {isOtp && isEmail && <ResetForm3 otp={otp} email={email} />}
        </div>
      ) : (
        <div className="login">
          <SignInForm setIsReset={setIsReset} />
        </div>
      )}
    </>
  )
}
export default Signin
