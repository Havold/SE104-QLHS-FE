const { colors } = require("@mui/material");
const { purple, yellow } = require("@mui/material/colors");

// tailwind.config.js
module.exports = {
  mode: "jit",
  // These paths are just examples, customize them to match your project structure
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        webSky: "#C3EBFA",
        webSkyBold: "#75cef0",
        webSkyLight: "#def5fc",
        webPurple: "#CFCEFF",
        webPurpleLight: "#F1F0FF",
        webYellow: "#FAE27C",
        webYellowLight: "#fae37c93",
        webGreen: "#2D9D14",
        webRed: "#DB0606",
      },
    },
  },
  plugins: [],
};
