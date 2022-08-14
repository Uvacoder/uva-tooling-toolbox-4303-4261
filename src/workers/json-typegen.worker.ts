import { run } from "json_typegen_wasm"
import { handleActions } from "typed-worker"

const actions = {
  json_typegen({
    input,
    output_mode,
  }: {
    input: string
    output_mode: OutputMode
  }) {
    return run("Root", input, JSON.stringify({ output_mode }))
  },
}

export type Actions = typeof actions

export type OutputMode = "typescript" | "rust"

handleActions(actions)
