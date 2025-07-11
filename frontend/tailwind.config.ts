import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {} },
  plugins: [require('@tailwindcss/typography')],
}

export default config
