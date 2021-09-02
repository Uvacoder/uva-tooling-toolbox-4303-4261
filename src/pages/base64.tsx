import clsx from "clsx"
import React from "react"
import { Layout } from "../components/Layout"
import { ErrorMessage } from "../components/ErrorMessage"
import { Button, CopyButton } from "../components/Button"

export default function Base64Page() {
  const [encoded, setEncoded] = React.useState("")
  const [decoded, setDecoded] = React.useState("")
  const [encodingError, setEncodingError] = React.useState("")
  const [decodingError, setDecodingError] = React.useState("")

  const clearErrors = () => {
    setEncodingError("")
    setDecodingError("")
  }

  const handleDecodedChange = (e: any) => {
    const value = e.target.value
    setDecoded(value)
    clearErrors()
    try {
      const result = window.btoa(value)
      setEncoded(result)
    } catch (err) {
      console.error(err)
      setEncodingError(err.message)
    }
  }

  const handleEncodedChange = (e: any) => {
    const value = e.target.value
    setEncoded(value)
    clearErrors()
    try {
      const result = window.atob(value)
      setDecoded(result)
    } catch (err) {
      console.error(err)
      setDecodingError(err.message)
    }
  }

  return (
    <Layout>
      <div className="flex divide-x min-h-screen">
        <div className="w-1/2 p-5">
          <div className="mb-5 flex justify-between items-center">
            <label className="font-bold text-2xl" htmlFor="input-el">
              Text
            </label>
            <div>
              <CopyButton getValue={() => decoded} />
            </div>
          </div>

          <ErrorMessage className="mb-2" message={encodingError} />
          <textarea
            rows={10}
            id="input-el"
            className="w-full input"
            value={decoded}
            onChange={handleDecodedChange}
          ></textarea>
        </div>
        <div className="w-1/2 p-5">
          <div className="mb-5 flex justify-between">
            <label htmlFor="output-el" className="font-bold text-2xl">
              Encoded
            </label>
            <div>
              <CopyButton getValue={() => encoded} />
            </div>
          </div>
          <ErrorMessage className="mb-2" message={decodingError} />
          <textarea
            id="output-el"
            rows={10}
            value={encoded}
            onChange={handleEncodedChange}
            className={clsx(
              `w-full resize-none border rounded-md p-2 focus:outline-none focus:ring-2 focus:border-blue-500`
            )}
          ></textarea>
        </div>
      </div>
    </Layout>
  )
}
