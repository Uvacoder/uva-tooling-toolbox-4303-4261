import { ConversionLayout } from "../components/ConversionLayout"
import { useWorker } from "../hooks/useWorker"

export default function JsonToTypeScriptPage() {
  const { run } = useWorker<
    {
      input: string
      options: { output_mode: string }
    },
    string
  >(
    () =>
      new Worker(new URL("../workers/json-typegen.worker.ts", import.meta.url))
  )

  const convert = (input: string) => {
    return run({ input, options: { output_mode: "typescript" } })
  }

  return (
    <ConversionLayout
      inputTitle="JSON"
      resultTitle="TypeScript"
      convert={convert}
      defaultInput={JSON.stringify({ name: "Eren Yeager", age: 19 }, null, 2)}
    />
  )
}
