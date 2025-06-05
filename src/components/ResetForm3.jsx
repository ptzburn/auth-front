import React, { useEffect, useState } from 'react'
import { FaLock, FaTriangleExclamation } from 'react-icons/fa6'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { reset, resetPassword, signIn } from '../reducers/authReducer.js'
import Spinner from './Spinner.jsx'

const ResetForm3 = ({ otp, email }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      newPassword: ''
    },
    mode: 'onChange'
  })

  const { user, isLoading, isError, isSuccess } = useSelector(state => state.auth)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const passwordValue = watch('newPassword')
  const [passwordType, setPasswordType] = useState(true)

  const onSubmit = async data => {
    const resetData = { ...data, otp, email }
    const response = await dispatch(resetPassword(resetData))

    if (response.payload.success) {
      await dispatch(signIn({ email, password: passwordValue }))
    }
  }

  useEffect(() => {
    if (isError) {
      return alert('Authentication failed.')
    }

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
      <h2>New password</h2>
      <div className="input">
        <label htmlFor="newPassword">Choose password</label>
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
            {...register('newPassword', {
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
      <input className="submit" type="submit" value="Submit" hidden={!isValid} />
    </form>
  )
}
export default ResetForm3
