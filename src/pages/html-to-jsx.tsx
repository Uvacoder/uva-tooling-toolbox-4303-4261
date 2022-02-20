import { useEffect, useState } from "react"
import HtmlToJsx from "htmltojsx"
import { CopyButton } from "../components/Button"
import { CodeBlock } from "../components/CodeBlock"
import { Layout } from "../components/Layout"
import { Textarea } from "../components/Textarea"
import { Column, TwoColumns } from "../components/TwoColumns"

export default function HtmlToJsxPage() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState("")

  const converter = new HtmlToJsx({
    createClass: false,
  })

  useEffect(() => {
    setResult(converter.convert(input).trim())
  }, [input])

  return (
    <Layout>
      <TwoColumns>
        <Column title="Image">
          <Textarea value={input} fullWidth onChange={setInput} />
        </Column>
        <Column
          title="Result"
          renderRight={() => <CopyButton getValue={() => result} />}
        >
          {result && (
            <div>
              <CodeBlock code={result} />
            </div>
          )}
        </Column>
      </TwoColumns>
    </Layout>
  )
}
