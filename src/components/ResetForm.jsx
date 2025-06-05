import React from 'react'
import { FaEnvelope, FaTriangleExclamation } from 'react-icons/fa6'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { sendResetOtp } from '../reducers/authReducer.js'

const ResetForm = ({ setIsEmail, setEmail }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      email: ''
    },
    mode: 'onChange'
  })

  const dispatch = useDispatch()

  const onSubmit = async email => {
    const response = await dispatch(sendResetOtp(email))
    setEmail(email.email)
    setIsEmail(response.payload.success)
  }

  return (
    <form className="sign-up" onSubmit={handleSubmit(onSubmit)}>
      <h2>Reset password</h2>
      <div className="input">
        <label htmlFor="email">Email you used to register the account</label>
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
      <input className="submit" type="submit" value="Submit" hidden={!isValid} />
    </form>
  )
}
export default ResetForm
