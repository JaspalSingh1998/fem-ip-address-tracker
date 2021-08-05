module.exports = {
  purge: [ './src/**/*.html',
  './src/**/*.js',],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "img": "url('/pattern-bg.png')"
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
