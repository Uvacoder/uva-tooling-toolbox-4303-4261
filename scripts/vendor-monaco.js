import fs from "fs-extra"

const monacoPkg = JSON.parse(
  fs.readFileSync("node_modules/monaco-editor/package.json")
)

fs.copySync(
  "node_modules/monaco-editor/",
  `public/vendor/monaco-editor-${monacoPkg.version}`
)

const languages = fs.readdirSync(
  "node_modules/monaco-editor/min/vs/basic-languages"
)

languages.unshift("text")

fs.outputFileSync(
  `src/generated/monaco-editor.ts`,
  `export const MONACO_PATH = "/vendor/monaco-editor-${monacoPkg.version}";
  
  export const MONACO_LANGUAGES = ${JSON.stringify(languages)}`
)
