import React from "react"
import { Layout } from "../components/Layout"

export default function Base64Page() {
  const [input, setInput] = React.useState("")
  const [output, setOutput] = React.useState("")
  const [isDecode, setIsDecode] = React.useState(false)

  React.useEffect(() => {
    setOutput(isDecode ? window.atob(input) : window.btoa(input))
  }, [input, isDecode])

  const useAsInput = () => {
    setInput(output)
  }

  const handleIsDecodeChange = (e: any) => {
    setIsDecode(e.target.value === "decode")
  }

  return (
    <Layout>
      <div className="p-5 border-b">
        <div className="mb-2 flex justify-between items-center">
          <label className="font-bold" htmlFor="input-el">
            Input:
          </label>
          <div>
            <div className="space-x-5">
              <label>
                <input
                  type="radio"
                  name="isDecode"
                  value="encode"
                  onChange={handleIsDecodeChange}
                  checked={!isDecode}
                />
                <span className="ml-1">Encode</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="isDecode"
                  value="decode"
                  onChange={handleIsDecodeChange}
                  checked={isDecode}
                />
                <span className="ml-1">Decode</span>
              </label>
            </div>
          </div>
        </div>
        <textarea
          rows={10}
          id="input-el"
          className="w-full resize-none border rounded-md p-2 focus:outline-none focus:ring-2 focus:border-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
      </div>
      <div className="p-5">
        <div className="mb-2 font-bold flex justify-between">
          <label htmlFor="output-el">Output:</label>
          <div>
            <button
              className="bg-gray-300 rounded-lg py-1 px-3 text-xs active:bg-blue-500 active:text-white"
              onClick={useAsInput}
            >
              Use as Input
            </button>
          </div>
        </div>
        <textarea
          id="output-el"
          rows={10}
          disabled
          defaultValue={output}
          className="w-full resize-none border rounded-md p-2 focus:outline-none focus:ring-2 focus:border-blue-500"
        ></textarea>
      </div>
    </Layout>
  )
}
