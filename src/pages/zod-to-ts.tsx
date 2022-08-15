import React from "react"
import { useDebounce } from "use-debounce"
import { Layout } from "../components/Layout"
import clsx from "clsx"
import { Button, CopyButton } from "../components/Button"
import { Column, TwoColumns } from "../components/TwoColumns"
import { trpc } from "~/utils/trpc"

const sample = `
export const Person = z.object({
    name: z.string(),
    age: z.number(),
    address: z.object({
        street: z.string(),
        city: z.string(),
        state: z.string(),
        zip: z.string(),
    }).nullish(),
})

export const Community = z.object({
    name: z.string(),
    members: z.array(Person),
})
`.trim()

export default function HtmlToMarkdownPage() {
  const [input, setInput] = React.useState(sample)
  const [debouncedInput] = useDebounce(input, 300)

  const zodToTsQuery = trpc.useQuery(
    ["zod-to-ts", { code: debouncedInput }],
    {}
  )

  return (
    <Layout>
      <TwoColumns>
        <Column
          title="Zod"
          renderRight={() => (
            <>
              <Button onClick={() => setInput(sample)}>Sample</Button>
              <CopyButton getValue={() => input} />
            </>
          )}
        >
          <div>
            <textarea
              className="h-full input w-full"
              value={input}
              rows={10}
              onChange={(e) => setInput(e.target.value)}
            ></textarea>
          </div>
        </Column>
        <Column
          title="TypeScript"
          renderRight={() => (
            <CopyButton getValue={() => zodToTsQuery.data || ""} />
          )}
        >
          <div>
            <textarea
              className={clsx(
                `h-full input w-full`,
                zodToTsQuery.error && `text-red-500`
              )}
              value={
                zodToTsQuery.isLoading
                  ? "Converting.."
                  : zodToTsQuery.error
                  ? zodToTsQuery.error.message
                  : zodToTsQuery.data
              }
              rows={10}
              disabled
            ></textarea>
          </div>
        </Column>
      </TwoColumns>
    </Layout>
  )
}
