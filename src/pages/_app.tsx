import { useEffect, useState } from "react"
import "../css/tailwind.css"
import "../css/main.css"

import Script from "next/script"
import { withTRPC } from "@trpc/next"
import { AppRouter } from "./api/trpc/[trpc]"

function MyApp({ Component, pageProps }: any) {
  const [enableAnalytics, setEnableAnalytics] = useState(false)

  useEffect(() => {
    if (
      process.env.NODE_ENV === "production" &&
      location.hostname === "tooling.one"
    ) {
      setEnableAnalytics(true)
    }
  }, [])

  return (
    <>
      <Component {...pageProps} />
      {enableAnalytics && (
        <Script
          strategy="afterInteractive"
          data-website-id="997ad654-cb3a-4981-a30f-621da64fc508"
          src="https://umami.egoist.dev/mami.js"
        />
      )}
    </>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

function getBaseUrl() {
  if (typeof window !== "undefined") {
    return ""
  }
  // reference for vercel.com
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  // reference for render.com
  if (process.env.RENDER_INTERNAL_HOSTNAME) {
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`
  }

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    return {
      url: `${getBaseUrl()}/api/trpc`,
      /**
       * @link https://react-query-v3.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    }
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp)
