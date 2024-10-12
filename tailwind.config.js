// tailwind.config.js
module.exports = {
  mode: "jit",
  // These paths are just examples, customize them to match your project structure
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  theme: {},
  plugins: [],
};
