import { useEffect, useState } from "react"
import md5 from "crypto-js/md5"
import sha256 from "crypto-js/sha256"
import { Layout } from "../components/Layout"
import { Textarea } from "../components/Textarea"
import { Column, TwoColumns } from "../components/TwoColumns"

export default function HashPage() {
  const [input, setInput] = useState("")
  const [md5string, setMd5String] = useState("")
  const [sha256string, setSha256string] = useState("")

  useEffect(() => {
    if (!input) return
    setMd5String(md5(input).toString())
    setSha256string(sha256(input).toString())
  }, [input])

  return (
    <Layout>
      <div className="p-5">
        <TwoColumns>
          <Column title="Input">
            <Textarea
              id="input"
              value={input}
              fullWidth
              onChange={(value) => setInput(value)}
            />
          </Column>
          <Column title="Result">
            {input && (
              <div className="space-y-5">
                <div>
                  <div>
                    <span className="block mb-1">MD5</span>
                  </div>
                  <pre className="border rounded-lg p-3 w-full">
                    {md5string}
                  </pre>
                </div>
                <div>
                  <div>
                    <span className="block mb-1">SHA256</span>
                  </div>
                  <pre className="border rounded-lg p-3 w-full">
                    {sha256string}
                  </pre>
                </div>
              </div>
            )}
          </Column>
        </TwoColumns>
      </div>
    </Layout>
  )
}
