import * as trpc from "@trpc/server"
import * as trpcNext from "@trpc/server/adapters/next"
import { z } from "zod"
import { zodToTs, printNode } from "zod-to-ts"
import { VM } from "vm2"
import cors from "cors"
import { createRouter, expressWrapper } from "next-connect"
import { NextApiRequest, NextApiResponse } from "next"

const router = createRouter<NextApiRequest, NextApiResponse>()

export const appRouter = trpc.router().query("zod-to-ts", {
  input: z.object({
    code: z.string(),
  }),
  output: z.string(),
  async resolve({ input }) {
    const code = `
    var __obj = {}
    ${input.code.replace(
      /^export\s+(const|let|var)\s+([^\s]+)\s+/gm,
      "$1 $2 = __obj.$2 "
    )}

    handle(__obj)
    `
    const handle = (obj: any) => {
      const types: string[] = []
      for (const name in obj) {
        const { node } = zodToTs(obj[name], name)
        types.push(`interface ${name} ${printNode(node)}`)
      }
      return types.join("\n\n")
    }

    const result = new VM({
      sandbox: {
        z,
        handle,
      },
    }).run(code)
    return result
  },
})

// export type definition of API
export type AppRouter = typeof appRouter

const trpcHandler = trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
})

// export API handler
router.use(expressWrapper(cors())).all((req, res) => trpcHandler(req, res))

export default router.handler()
