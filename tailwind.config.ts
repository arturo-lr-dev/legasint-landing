import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'fadeIn': 'fadeIn 0.8s ease-out forwards',
        'fadeInUp': 'fadeInUp 0.8s ease-out forwards',
        'bounce-gentle': 'bounceGentle 3s infinite ease-in-out',
      },
    },
  },
  plugins: [],
} satisfies Config;
