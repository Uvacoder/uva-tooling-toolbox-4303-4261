import type { editor as MonacoEditor } from "monaco-editor"
import { useEffect, useRef, useState } from "react"
import { Layout } from "../components/Layout"
import { Textarea } from "../components/Textarea"
import { Column, TwoColumns } from "../components/TwoColumns"
import { MONACO_LANGUAGES, MONACO_PATH } from "../generated/monaco-editor"

const loadMonaco = async (): Promise<typeof import("monaco-editor")> => {
  // @ts-expect-error
  if (window.monaco) return window.monaco

  return new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = `${MONACO_PATH}/min/vs/loader.js`
    script.id = "monaco-loader"
    script.onload = () => {
      // @ts-expect-error
      window.require.config({ paths: { vs: `${MONACO_PATH}/min/vs` } })
      // @ts-expect-error
      window.require(["vs/editor/editor.main"], () => {
        // @ts-expect-error
        resolve(window.monaco)
      })
    }
    document.body.appendChild(script)
  })
}

const getMonaco = (): typeof import("monaco-editor") | undefined => {
  // @ts-expect-error
  return window.monaco
}

export default function TextDiffPage() {
  const [original, setOriginal] = useState("Hello World")
  const [modified, setModified] = useState("Goodbye World")
  const editorContainer = useRef<HTMLDivElement | null>(null)
  const [language, setLanguage] = useState("text")

  const [diffEditor, setDiffEditor] =
    useState<MonacoEditor.IStandaloneDiffEditor | null>(null)

  const initEditor = async () => {
    const monaco = await loadMonaco()
    const originalModel = monaco.editor.createModel(original, language)
    const modifiedModel = monaco.editor.createModel(modified, language)
    const editor = monaco.editor.createDiffEditor(editorContainer.current, {
      enableSplitViewResizing: false,
      renderSideBySide: false,
    })
    editor.setModel({
      original: originalModel,
      modified: modifiedModel,
    })

    setDiffEditor(editor)
  }

  useEffect(() => {
    initEditor()

    return () => {
      if (diffEditor) diffEditor.dispose()
    }
  }, [])

  useEffect(() => {
    if (diffEditor) {
      diffEditor.getOriginalEditor().setValue(original)
    }
  }, [original])

  useEffect(() => {
    if (diffEditor) {
      diffEditor.getModifiedEditor().setValue(modified)
    }
  }, [modified])

  useEffect(() => {
    if (diffEditor) {
      const monaco = getMonaco()
      if (monaco) {
        const models = diffEditor.getModel()
        if (models) {
          console.log(models.modified.getLanguageId(), language)
          monaco.editor.setModelLanguage(models.modified, language)
          monaco.editor.setModelLanguage(models.original, language)
        }
      }
    }
  }, [language])

  return (
    <Layout>
      <TwoColumns>
        <Column title="Text">
          <div className="mb-5">
            <label className="text-sm text-zinc-400 mr-1">
              Choose a lanuage:
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {MONACO_LANGUAGES.map((lang) => {
                return (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="space-y-5">
            <Textarea fullWidth value={original} onChange={setOriginal} />
            <Textarea fullWidth value={modified} onChange={setModified} />
          </div>
        </Column>
        <Column title="Result">
          <div
            ref={editorContainer}
            className="h-[600px] border rounded-lg overflow-hidden"
          ></div>
        </Column>
      </TwoColumns>
    </Layout>
  )
}
