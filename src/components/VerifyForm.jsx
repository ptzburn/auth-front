import React from 'react'
import { FaTriangleExclamation } from 'react-icons/fa6'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { verifyEmail } from '../reducers/authReducer.js'
import { useNavigate } from 'react-router-dom'

const VerifyForm = ({ userData, setUserData }) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      key0: '',
      key1: '',
      key2: '',
      key3: '',
      key4: '',
      key5: ''
    },
    mode: 'onChange'
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async () => {
    const otp = Object.values(getValues()).join('')
    const response = await dispatch(verifyEmail({ otp }))

    console.log('response', response)

    if (response.payload.success) {
      setUserData({ ...userData, isVerified: true })
      navigate('/')
    }
  }

  const handleInput = (e, index) => {
    if (e.target.value.length === 1 && index < 5) {
      const nextInput = document.querySelector(`input[name="key${index + 1}"]`)
      if (nextInput) {
        nextInput.focus()
      }
    }
  }

  const handleBackspace = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      const nextInput = document.querySelector(`input[name="key${index - 1}"]`)
      if (nextInput) {
        nextInput.focus()
      }
    }
  }

  const handlePaste = e => {
    e.preventDefault()
    const paste = e.clipboardData.getData('text').trim()
    const pasteArray = paste.split('')
    pasteArray.forEach((char, i) => {
      setValue(`key${i}`, char, { shouldValidate: true })
    })
  }

  return (
    <form className="sign-up" onSubmit={handleSubmit(onSubmit)}>
      <h2>Verify email with OTP</h2>
      <div className="input">
        <label className="flex justify-center">Enter the 6-digit code sent to your email</label>
        <div className="digits" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <input
                type="text"
                inputMode="numeric"
                maxLength="1"
                required
                onInput={e => handleInput(e, i)}
                onKeyDown={e => handleBackspace(e, i)}
                key={i}
                className="digit"
                {...register(`key${i}`, {
                  required: true,
                  maxLength: {
                    value: 1
                  },
                  pattern: { value: /^\d$/, message: 'Must be a digit' }
                })}
              />
            ))}
        </div>
        {errors?.first && (
          <div className="text-error text-[11px] mt-2 flex items-center">
            <FaTriangleExclamation color="red" />
            <p className="ml-1">{errors?.first?.message || 'Error'}</p>
          </div>
        )}
      </div>
      <input className="submit" type="submit" value="Submit" hidden={!isValid} />
    </form>
  )
}
export default VerifyForm
