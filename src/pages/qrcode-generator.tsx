import clsx from "clsx"
import React from "react"
import QRCode from "qrcode"
import { Layout } from "../components/Layout"
import { ErrorMessage } from "../components/ErrorMessage"
import { Button, CopyButton } from "../components/Button"

export default function QrcodePage() {
  const [input, setInput] = React.useState("")
  const [error, setError] = React.useState("")
  const [qrcode, setQrcode] = React.useState<string | null>(null)

  const handleInputChange = async (e: any) => {
    setInput(e.target.value)
    try {
      const dataURL = await QRCode.toDataURL(e.target.value, {
        width: 300,
      })
      setQrcode(dataURL)
    } catch (err) {
      setError(err.message)
      console.error(err)
    }
  }

  return (
    <Layout>
      <div className="flex divide-x min-h-screen">
        <div className="w-1/2 p-5">
          <div className="mb-5 flex justify-between items-center">
            <label className="font-bold text-2xl" htmlFor="input-el">
              Input
            </label>
            <div>
              <CopyButton getValue={() => input} />
            </div>
          </div>

          <ErrorMessage className="mb-2" message={error} />
          <textarea
            rows={10}
            id="input-el"
            className="w-full input"
            value={input}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="w-1/2 p-5">
          <div className="mb-5 flex justify-between">
            <label htmlFor="output-el" className="font-bold text-2xl">
              QR Code
            </label>
          </div>
          {qrcode && <img className="max-w-full" src={qrcode} />}
        </div>
      </div>
    </Layout>
  )
}
