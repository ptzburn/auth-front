import React, { useEffect, useState } from 'react'
import { FaEnvelope, FaLock, FaTriangleExclamation } from 'react-icons/fa6'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { reset, signIn } from '../reducers/authReducer.js'
import Spinner from './Spinner.jsx'

const SignInForm = ({ setIsReset }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  })

  const { user, isLoading, isError, isSuccess } = useSelector(state => state.auth)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const passwordValue = watch('password')
  const [passwordType, setPasswordType] = useState(true)

  const onSubmit = async userData => {
    await dispatch(signIn(userData))
  }

  useEffect(() => {
    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [isSuccess, isError, user, dispatch, navigate])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <form className="sign-up" onSubmit={handleSubmit(onSubmit)}>
      <h2>Sign in</h2>
      <div className="input">
        <label htmlFor="email">Email</label>
        <div className="field">
          <i>
            <FaEnvelope color={errors?.email ? '#f44336' : 'gray'} />
          </i>
          <input
            className={errors?.email ? 'border-error' : ''}
            type="email"
            placeholder="Enter email"
            {...register('email', {
              required: 'Please enter email',
              maxLength: {
                value: 50,
                message: 'Email shall be at max 20 characters long'
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Please enter a valid email address'
              }
            })}
          />
          {errors?.email && (
            <div className="text-error text-[11px] mt-2 flex items-center">
              <FaTriangleExclamation color="red" />
              <p className="ml-1">{errors?.email?.message || 'Error'}</p>
            </div>
          )}
        </div>
      </div>
      <div className="input">
        <label htmlFor="password">Password</label>
        <div className="field">
          <i>
            <FaLock color={errors?.password ? '#f44336' : 'gray'} />
          </i>
          <button
            onClick={e => {
              e.preventDefault()
              setPasswordType(!passwordType)
            }}
            hidden={passwordValue.length === 0}
          >
            {passwordType ? 'Show' : 'Hide'}
          </button>
          <input
            className={errors?.password ? 'border-error' : ''}
            type={passwordType ? 'password' : 'text'}
            placeholder="Enter password"
            {...register('password', {
              required: 'Please enter password',
              minLength: {
                value: 8,
                message: 'Password is at least 8 characters long'
              }
            })}
          />
          {errors?.password && (
            <div className="text-error text-[11px] mt-2 flex items-center">
              <FaTriangleExclamation color="red" />
              <p className="ml-1">{errors?.password?.message || 'Error'}</p>
            </div>
          )}
        </div>
      </div>
      <button className="password-reset" onClick={() => setIsReset(true)}>
        Forgot password?
      </button>
      <input className="submit" type="submit" value="Sign in" hidden={!isValid} />
      <div className="alt-option">
        Don't have an account?{' '}
        <Link className="link" to="/sign-up">
          Sign up
        </Link>
      </div>
    </form>
  )
}
export default SignInForm
