/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    COMMIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA || null,
    PKG_VERSION: require("./package.json").version,
  },
  webpack(config, { dev, isServer }) {
    // Replace React with Preact in client production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      })
    }

    config.experiments = config.experiments || {}
    Object.assign(config.experiments, {
      asyncWebAssembly: true,
    })

    return config
  },
}

module.exports = nextConfig
