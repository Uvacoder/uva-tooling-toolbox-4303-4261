import { useEffect, useState } from "react"
import { CopyButton } from "./Button"
import { CodeBlock } from "./CodeBlock"
import { Layout } from "./Layout"
import { Textarea } from "./Textarea"
import { Column, TwoColumns } from "./TwoColumns"

export const ConversionLayout: React.FC<{
  inputTitle: string
  resultTitle: string
  defaultInput?: string
  convert: (input: string) => Promise<string> | string
}> = ({ inputTitle, resultTitle, convert, defaultInput }) => {
  const [input, setInput] = useState(defaultInput || "")
  const [result, setResult] = useState("")
  const [converting, setConverting] = useState(false)

  useEffect(() => {
    setConverting(true)
    Promise.resolve(convert(input || "{}"))
      .then((result) => {
        setResult(result)
      })
      .catch(console.error)
      .finally(() => {
        setConverting(false)
      })
  }, [input, convert])

  return (
    <Layout>
      <TwoColumns>
        <Column title={inputTitle}>
          <Textarea value={input} fullWidth onChange={setInput} />
        </Column>
        <Column
          title={resultTitle}
          renderRight={() => <CopyButton getValue={() => result} />}
        >
          <CodeBlock code={result} />
        </Column>
      </TwoColumns>
    </Layout>
  )
}
