import Link from "next/link"
import { Layout } from "../components/Layout"
import { tools } from "~/tools"

export default function HomePage() {
  return (
    <Layout>
      <div className="p-5 max-w-screen-lg">
        <a
          target="_blank"
          rel="noopener nofollow"
          href="https://github.com/sponsors/egoist"
          className="mb-5 border-2 border-pink-400 text-pink-500 font-bold flex items-center justify-center p-5 rounded-lg text-xl space-x-2 hover:bg-pink-50"
        >
            <img
            alt="github sponsors logo"
            src="/github-sponsors-logo.svg"
            className="w-1- h-10"
          />
          <span>Welcome to the Toolbox.</span>
        </a>
        <div className="bg-cyan-100 text-cyan-700 font-bold p-5 rounded-lg space-y-3">
          <p>
            The Toolbox is a collection of useful tools for developers, it works
            locally mostly, no data will be uploaded to any server unless
            otherwise noted.
          </p>
          <p className="">
            I'll keep adding tools to the site, Check out the GitHub repo{" "}
            <a
              href="https://github.com/uvacoder/abc-tooling"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-5 p-5 max-w-screen-lg">
        {tools.map((tool) => {
          return (
            <Link href={tool.link} key={tool.name}>
              <a className="border rounded-lg p-5 font-bold hover:bg-zinc-100">
                {tool.name}
              </a>
            </Link>
          )
        })}
      </div>
    </Layout>
  )
}
