import { useEffect, useState } from "react"
import "../css/tailwind.css"
import "../css/main.css"

import { SWUpdatePopup } from "~/components/SWUpdatePopup"
import Script from "next/script"

function MyApp({ Component, pageProps }) {
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
      <SWUpdatePopup />
      {enableAnalytics && (
        <Script
          strategy="afterInteractive"
          data-website-id="4ff6897f-d635-4c16-8c67-91c40fae7281"
          src="https://umami.egoist.sh/mami.js"
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

export default MyApp
