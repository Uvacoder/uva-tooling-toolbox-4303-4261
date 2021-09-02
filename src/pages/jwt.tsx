import React from "react"
import { decode } from "jws"
import { Layout } from "../components/Layout"
import clsx from "clsx"

const stringify = (data: any) => JSON.stringify(data, null, 2)

function base64url(str: string) {
  return window
    .btoa(str)
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
}

function strToJson(str: string) {
  return JSON.stringify(JSON.parse(str))
}

export default function JwtPage() {
  const [input, setInput] = React.useState("")
  const [header, setHeader] = React.useState("{}")
  const [payload, setPayload] = React.useState("{}")
  const [signature, setSignature] = React.useState("")
  const [decodeError, setDecodeError] = React.useState("")
  const [encodeError, setEncodeError] = React.useState("")

  React.useEffect(() => {
    decodeInput(input)
  }, [])

  const clearError = () => {
    setDecodeError("")
    setEncodeError("")
  }

  const handleInputChange = (e: any) => {
    setInput(e.target.value)
    decodeInput(e.target.value)
  }

  const decodeInput = (input: string) => {
    try {
      clearError()
      if (!input) return
      const decoded = decode(input)
      if (!decoded) throw new Error(`Invalid token`)
      setPayload(stringify(decoded.payload))
      setHeader(stringify(decoded.header))
      setSignature(decoded.signature)
    } catch (err) {
      setDecodeError(err.message)
    }
  }

  const updateInput = () => {
    try {
      clearError()
      const token = `${base64url(strToJson(header))}.${base64url(
        strToJson(payload)
      )}.${signature}`
      setInput(token)
    } catch (err) {
      setEncodeError(err.message)
    }
  }

  const handleHeaderChange = (e: any) => {
    setHeader(e.target.value)
    updateInput()
  }

  const handlePayloadChange = (e: any) => {
    setPayload(e.target.value)
    updateInput()
  }

  const handleSignatureChange = (e: any) => {
    setSignature(e.target.value)
    updateInput()
  }

  return (
    <Layout>
      <div className="flex divide-x">
        <div className="w-1/2 p-5 ">
          <div className="mb-5">
            <span className="font-bold text-2xl">JWT</span>
          </div>
          {decodeError && (
            <div className="px-5 py-3 text-white bg-red-500 rounded-lg mb-3">
              {decodeError}
            </div>
          )}
          <div>
            <textarea
              className={clsx(`input w-full`)}
              name=""
              id=""
              rows={10}
              value={input}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>
        <div className="w-1/2 p-5">
          <div className="mb-5">
            <span className="font-bold text-2xl">Decoded</span>
          </div>
          {encodeError && (
            <div className="px-5 py-3 text-white bg-red-500 rounded-lg mb-3">
              {encodeError}
            </div>
          )}
          <div className="space-y-5">
            <div>
              <div className="mb-2">Header:</div>
              <textarea
                className="input w-full"
                rows={5}
                value={header}
                onChange={handleHeaderChange}
              ></textarea>
            </div>
            <div>
              <div className="mb-2">Payload:</div>
              <textarea
                rows={5}
                className="input w-full"
                value={payload}
                onChange={handlePayloadChange}
              ></textarea>
            </div>
            <div>
              <div className="mb-2">Signature:</div>
              <textarea
                rows={5}
                className="input w-full"
                value={signature}
                onChange={handleSignatureChange}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
