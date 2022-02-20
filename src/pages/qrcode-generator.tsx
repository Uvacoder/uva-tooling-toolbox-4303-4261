import clsx from "clsx"
import React from "react"
import QRCode from "qrcode"
import { Layout } from "../components/Layout"
import { ErrorMessage } from "../components/ErrorMessage"
import { Button, CopyButton } from "../components/Button"
import { Column, TwoColumns } from "../components/TwoColumns"

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
      <TwoColumns>
        <Column
          title="Input"
          renderRight={() => <CopyButton getValue={() => input} />}
        >
          <ErrorMessage className="mb-2" message={error} />
          <textarea
            rows={10}
            id="input-el"
            className="w-full input"
            value={input}
            onChange={handleInputChange}
          ></textarea>
        </Column>
        <Column title="QR Code">
          {qrcode && <img className="max-w-full" src={qrcode} />}
        </Column>
      </TwoColumns>
    </Layout>
  )
}
