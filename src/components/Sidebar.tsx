import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import clsx from "clsx"
import { tools } from "../utils/tools"

export const Sidebar = () => {
  const router = useRouter()

  return (
    <div className="w-72 bg-gray-100 border-r fixed left-0 top-0 bottom-0">
      <header className="p-3 border-b">
        <h1 className="text-xl font-medium">
          <Link href="/">
            <a className="flex space-x-2 items-center px-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-5 h-5"
              >
                <linearGradient
                  id="logo-fill"
                  gradientUnits="userSpaceOnUse"
                  x1="-34.107"
                  y1="644.988"
                  x2="-34.107"
                  y2="620.713"
                  gradientTransform="matrix(20.48 0 0 -20.48 954.52 13224.2)"
                >
                  <stop offset="0" stop-color="#ff5d3b" />
                  <stop offset="1" stop-color="#ff2d67" />
                </linearGradient>
                <path
                  d="M366.49 241.807l-143.36 184.32a10.251 10.251 0 01-8.09 3.953c-1.577 0-3.154-.369-4.628-1.106-4.362-2.232-6.554-7.229-5.202-11.94l37.212-130.314H153.6a10.251 10.251 0 01-9.196-5.734 10.26 10.26 0 011.126-10.793l143.36-184.32c3.011-3.891 8.335-5.059 12.718-2.847a10.235 10.235 0 015.202 11.94L269.599 225.28H358.4c3.932 0 7.496 2.232 9.216 5.734a10.26 10.26 0 01-1.126 10.793M256 0C114.852 0 0 114.831 0 256c0 141.148 114.852 256 256 256 141.169 0 256-114.852 256-256C512 114.831 397.169 0 256 0"
                  fill="url(#logo-fill)"
                />
              </svg>
              <span>One Tooling</span>
            </a>
          </Link>
        </h1>
      </header>
      <div className="p-3">
        {tools.map((tool) => {
          const isActive = router.asPath === tool.link
          return (
            <Link href={tool.link} key={tool.link}>
              <a
                className={clsx(
                  `px-4 py-1 rounded-lg flex`,
                  isActive && `bg-light-blue text-white`
                )}
              >
                {tool.name}
              </a>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
