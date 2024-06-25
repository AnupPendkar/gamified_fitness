import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        ternary: 'var(--color-ternary)',

        success: 'var(--color-success)',
        background: 'var(--color-background)',

        primary_text: 'var(--color-text-primary)',
        secondary_text: 'var(--color-text-secondary)',

        primary_text_dark: 'var(--color-text-primary-dark)',
        secondary_text_dark: 'var(--color-text-secondary-dark)',
      },
      padding: {
        global: 'var(--global-padding)',
      },
      borderColor: {
        success: 'var(--color-success)',
      },
      margin: {
        global: 'var(--global-padding)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
