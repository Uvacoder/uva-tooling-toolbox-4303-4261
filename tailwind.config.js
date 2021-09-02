module.exports = {
  mode: "jit",
  purge: ["./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      color: {
        "light-blue": "#55a3ff",
      },
      backgroundColor: {
        "light-blue": "#55a3ff",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
