import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { sendVerify, signout } from '../reducers/authReducer.js'
import { Link, useNavigate } from 'react-router-dom'
import { CiLogin, CiLogout } from 'react-icons/ci'

const Header = ({ userData, user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignOut = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      dispatch(signout())
      window.localStorage.removeItem('user')
      navigate('/')
    }
  }

  const handleVerify = async () => {
    const response = await dispatch(sendVerify())
    if (response.payload.success) navigate('/verify-email')
    setIsDropdownOpen(false)
  }
  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev)
  }

  return (
    <header>
      <Link className="logo" to="/">
        AuthMe
      </Link>
      {user ? (
        <div className="nav-buttons">
          <div className="profile group" onClick={toggleDropdown}>
            {userData?.avatarUrl ? (
              <img src={userData?.avatarUrl} alt="avatar" />
            ) : (
              userData?.firstName[0].toUpperCase()
            )}
            <div
              className={`options group-hover:block ${
                isDropdownOpen || 'group-hover:block'
              } ${isDropdownOpen ? 'block opacity-100' : 'hidden opacity-0'}`}
            >
              <ul>
                {!userData?.isVerified && <li onClick={handleVerify}>Verify email</li>}
                <li className="text-red-700 hover:text-white" onClick={handleSignOut}>
                  Sign out
                  <CiLogout size={25} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="nav-buttons">
          <Link className="link" to="/sign-in">
            Sign in
            <CiLogin size={25} />
          </Link>
          <Link className="link" to="/sign-up">
            Sign up
          </Link>
        </div>
      )}
    </header>
  )
}
export default Header
