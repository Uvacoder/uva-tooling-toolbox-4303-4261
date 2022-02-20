import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        {process.env.NODE_ENV === "production" && (
          <script
            async
            defer
            data-website-id="4ff6897f-d635-4c16-8c67-91c40fae7281"
            src="https://umami.egoist.sh/umami.js"
          ></script>
        )}
      </body>
    </Html>
  )
}
