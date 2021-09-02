import React from "react"
import prettier from "prettier"
import parserBabel from "prettier/parser-babel"
import { Layout } from "../components/Layout"
import clsx from "clsx"
import { CopyButton } from "../components/Button"

export default function JsonFormatPage() {
  const [input, setInput] = React.useState("")
  const [output, setOutput] = React.useState("")
  const [error, setError] = React.useState("")

  React.useEffect(() => {
    setError("")
    if (!input) return
    try {
      setOutput(
        prettier.format(input, { parser: "json", plugins: [parserBabel] })
      )
    } catch (err) {
      console.error(err)
      setError(err.message)
    }
  }, [input])

  return (
    <Layout>
      <div className="flex divide-x min-h-screen">
        <div className="w-1/2 p-5">
          <div className="mb-5 flex justify-between items-center">
            <span className="text-2xl font-bold">Input</span>
            <div>
              <CopyButton getValue={() => input} />
            </div>
          </div>
          <div>
            <textarea
              className="h-full input w-full"
              value={input}
              rows={10}
              onChange={(e) => setInput(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="w-1/2 p-5">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-2xl font-bold">Output</span>
            <div>
              <CopyButton getValue={() => output} />
            </div>
          </div>
          <div>
            <textarea
              className={clsx(`h-full input w-full`, error && `text-red-500`)}
              value={error || output}
              rows={10}
              disabled
            ></textarea>
          </div>
        </div>
      </div>
    </Layout>
  )
}
