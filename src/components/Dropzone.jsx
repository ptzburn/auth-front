import React, { useCallback, useEffect, useState } from 'react'
import { TbCameraDown, TbCameraPlus } from 'react-icons/tb'
import { RxCross1 } from 'react-icons/rx'
import { useDropzone } from 'react-dropzone'
import { FaTriangleExclamation } from 'react-icons/fa6'

const Dropzone = ({ onChange, value }) => {
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')

  const onDrop = useCallback(
    async (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles?.length) {
        const droppedFile = Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0])
        })
        setFile(droppedFile)
        onChange(droppedFile)
        setError('')
      }

      if (rejectedFiles?.length) {
        setError(rejectedFiles[0].errors[0].message)
      }
    },
    [onChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png']
    },
    maxFiles: 1,
    maxSize: 500 * 10000
  })

  const removeFile = () => {
    if (file?.preview && file.preview.startsWith('blob:')) {
      URL.revokeObjectURL(file.preview)
    }
    setFile(null)
    onChange(null)
  }

  useEffect(() => {
    if (value && !file) {
      setFile(Object.assign(value, { preview: URL.createObjectURL(value) }))
    } else if (!value) {
      setFile(null)
    }
  }, [value])

  return (
    <>
      <div
        {...getRootProps({
          className:
            'rounded-full focus:outline-accent focus:text-accent focus:outline-2 focus:-outline-offset-2'
        })}
      >
        <div className="dropzone">
          <input {...getInputProps()} />
          {isDragActive ? (
            <div className={`dropdown ${isDragActive ? 'bg-hover' : ''}`}>
              <TbCameraDown size="100%" color="white" />
            </div>
          ) : (
            <>
              {file ? (
                <div className="relative rounded-full h-full w-full">
                  <div className="preview">
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={e => {
                        e.stopPropagation()
                        removeFile()
                      }}
                    >
                      <RxCross1 />
                    </button>
                  </div>
                </div>
              ) : (
                <i>
                  <TbCameraPlus size="100%" color="white" />
                </i>
              )}
            </>
          )}
        </div>
      </div>
      {file && <p className="text-xs">{file.name}</p>}
      {error && (
        <div className="flex mt-2 items-center w-full">
          <FaTriangleExclamation color="red" size="11" />
          <p className="text-error text-[11px] ml-1">{error}</p>
        </div>
      )}
    </>
  )
}

export default Dropzone
