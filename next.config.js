/** @type {import('next').NextConfig} */
module.exports = {
  webpack(config, { dev, isServer, webpack }) {
    // Needed by `htmltojsx` package
    config.plugins.push(
      new webpack.DefinePlugin({
        IN_BROWSER: !isServer,
      })
    )

    // Replace React with Preact in client production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      })
    }

    return config
  },
}
