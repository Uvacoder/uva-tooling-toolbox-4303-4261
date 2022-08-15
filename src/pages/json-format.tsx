import React from "react"
import prettier from "prettier"
import parserBabel from "prettier/parser-babel"
import { Layout } from "../components/Layout"
import clsx from "clsx"
import { CopyButton } from "../components/Button"
import { Column, TwoColumns } from "../components/TwoColumns"

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
      if (err instanceof Error) {
        setError(err.message)
      }
    }
  }, [input])

  return (
    <Layout>
      <TwoColumns>
        <Column
          title="Input"
          renderRight={() => <CopyButton getValue={() => input} />}
        >
          <textarea
            className="h-full input w-full"
            value={input}
            rows={10}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
        </Column>
        <Column
          title="Output"
          renderRight={() => <CopyButton getValue={() => output} />}
        >
          <textarea
            className={clsx(`h-full input w-full`, error && `text-red-500`)}
            value={error || output}
            rows={10}
            disabled
          ></textarea>
        </Column>
      </TwoColumns>
    </Layout>
  )
}
