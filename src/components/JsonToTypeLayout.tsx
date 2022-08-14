import { useEffect } from "react"
import { createWorker } from "typed-worker"
import { Actions, OutputMode } from "~/workers/json-typegen.worker"
import { ConversionLayout } from "./ConversionLayout"

export const JsonToTypeLayout: React.FC<{
  mode: OutputMode
}> = ({ mode }) => {
  const { run, destroy } = createWorker<Actions>(
    () =>
      new Worker(new URL("../workers/json-typegen.worker.ts", import.meta.url))
  )

  const convert = (input: string) => {
    return run("json_typegen", { input, output_mode: mode })
  }

  useEffect(() => {
    return () => {
      destroy()
    }
  }, [])

  return (
    <ConversionLayout
      inputTitle="JSON"
      resultTitle="Result"
      convert={convert}
      defaultInput={JSON.stringify({ name: "Eren Yeager", age: 19 }, null, 2)}
    />
  )
}
