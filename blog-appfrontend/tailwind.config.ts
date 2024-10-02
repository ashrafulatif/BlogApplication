import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlack: "#222831",
        customTeal: "#00897B",
        customTeal2: "#008080",
        customBlack2: "#31363F",
        customGray: "#EEEEEE",
        customCyan: "rgb(193, 248, 251)",
        customWhite: "rgba(255, 255, 255, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
