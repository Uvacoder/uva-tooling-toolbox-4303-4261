import { useWorker } from "../hooks/useWorker"
import { ConversionLayout } from "./ConversionLayout"

export const JsonToTypeLayout: React.FC<{
  mode: "typescript" | "rust"
}> = ({ mode }) => {
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
    return run({ input, options: { output_mode: mode } })
  }

  return (
    <ConversionLayout
      inputTitle="JSON"
      resultTitle="Result"
      convert={convert}
      defaultInput={JSON.stringify({ name: "Eren Yeager", age: 19 }, null, 2)}
    />
  )
}
