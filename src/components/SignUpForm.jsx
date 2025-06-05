import React, { useEffect, useState } from 'react'
import { FaEnvelope, Fa1, Fa2, FaLock, FaTriangleExclamation } from 'react-icons/fa6'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { reset, signUp, uploadAvatar } from '../reducers/authReducer.js'
import Dropzone from './Dropzone.jsx'
import Spinner from './Spinner.jsx'

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      avatar: null
    },
    mode: 'onChange'
  })

  const { user, isLoading, isError, isSuccess } = useSelector(state => state.auth)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const passwordValue = watch('password')
  const [passwordType, setPasswordType] = useState(true)

  const onSubmit = async userData => {
    let avatarUrl = ''
    if (userData.avatar) {
      const formData = new FormData()
      formData.append('file', userData.avatar)
      try {
        const response = await dispatch(uploadAvatar(formData))
        avatarUrl = response.payload
      } catch (error) {
        console.error('Error uploading avatar', error.message)
        throw new Error(error.message)
      }
    }

    const { avatar, ...rest } = userData
    const newData = { ...rest, avatarUrl }

    await dispatch(signUp(newData))
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
      <h2>Create an account</h2>
      <Controller
        name="avatar"
        control={control}
        rules={{
          required: false
        }}
        render={({ field: { onChange, value } }) => <Dropzone onChange={onChange} value={value} />}
      />
      <div className="input">
        <label htmlFor="firstName">First Name</label>
        <div className="field">
          <i>
            <Fa1 color={errors?.firstName ? '#f44336' : 'gray'} />
          </i>
          <input
            className={errors?.firstName ? 'border-error' : ''}
            type="text"
            placeholder="John"
            {...register('firstName', {
              required: 'Please enter first name',
              minLength: {
                value: 2,
                message: 'First name must be at least 2 characters long'
              },
              maxLength: {
                value: 20,
                message: 'First name shall be at max 20 characters long'
              },
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: 'First name must contain only letters'
              }
            })}
          />
          {errors?.firstName && (
            <div className="text-error text-[11px] mt-2 flex items-center">
              <FaTriangleExclamation color="red" />
              <p className="ml-1">{errors?.firstName?.message || 'Error'}</p>
            </div>
          )}
        </div>
      </div>
      <div className="input">
        <label htmlFor="lastName">Last Name</label>
        <div className="field">
          <i>
            <Fa2 color={errors?.lastName ? '#f44336' : 'gray'} />
          </i>
          <input
            className={errors?.lastName ? 'border-error' : ''}
            type="text"
            placeholder="Doe"
            {...register('lastName', {
              required: 'Please enter last name',
              minLength: {
                value: 2,
                message: 'Last name must be at least 2 characters long'
              },
              maxLength: {
                value: 20,
                message: 'Last name shall be at max 20 characters long'
              },
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: 'First name must contain only letters'
              }
            })}
          />
          {errors?.lastName && (
            <div className="text-error text-[11px] mt-2 flex items-center">
              <FaTriangleExclamation color="red" />
              <p className="ml-1">{errors?.lastName?.message || 'Error'}</p>
            </div>
          )}
        </div>
      </div>
      <div className="input">
        <label htmlFor="email">Email</label>
        <div className="field">
          <i>
            <FaEnvelope color={errors?.email ? '#f44336' : 'gray'} />
          </i>
          <input
            className={errors?.email ? 'border-error' : ''}
            type="email"
            placeholder="example@email.com"
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
        <label htmlFor="password">Choose password</label>
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
            placeholder="Minimum 8 characters"
            {...register('password', {
              required: 'Please enter password',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long'
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
      <input className="submit" type="submit" value="Sign up" hidden={!isValid} />
      <div className="alt-option">
        Already have an account?
        <Link className="link" to="/sign-in">
          Sign in
        </Link>
      </div>
    </form>
  )
}
export default SignUpForm
