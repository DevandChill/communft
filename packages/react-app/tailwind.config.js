module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        "1/2": "50vh",
        "1/3": "33.333333vh",
        "2/3": "66.666667vh",
        "1/4": "25vh",
        "2/4": "50vh",
        "3/4": "75vh",
        "1/5": "20vh",
        "2/5": "40vh",
        "3/5": "60vh",
        "4/5": "80vh",
        "1/6": "16.666667vh",
        "2/6": "33.333333vh",
        "3/6": "50vh",
        "4/6": "66.666667vh",
        "5/6": "83.333333vh",
        "1/12": "8.333333vh",
        "2/12": "16.666667vh",
        "3/12": "25vh",
        "4/12": "33.333333vh",
        "5/12": "41.666667vh",
        "6/12": "50vh",
        "7/12": "58.333333vh",
        "8/12": "66.666667vh",
        "9/12": "75vh",
        "10/12": "83.333333vh",
        "11/12": "91.666667vh",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
