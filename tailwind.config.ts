import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  "./src/client/**/*.{js,ts,jsx,tsx}", 
  "./client/**/*.{js,ts,jsx,tsx}"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Pretendard", "-apple-system", "Roboto", "Helvetica", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        pos: {
          green: "hsl(var(--pos-green))",
          "green-dark": "hsl(var(--pos-green-dark))",
          "green-light": "hsl(var(--pos-green-light))",
          orange: "hsl(var(--pos-orange))",
          "orange-dark": "hsl(var(--pos-orange-dark))",
          yellow: "hsl(var(--pos-yellow))",
          "yellow-dark": "hsl(var(--pos-yellow-dark))",
          "yellow-muted": "hsl(var(--pos-yellow-muted))",
          "yellow-fg": "hsl(var(--pos-yellow-fg))",
          teal: "hsl(var(--pos-teal))",
          "teal-dark": "hsl(var(--pos-teal-dark))",
          blue: "hsl(var(--pos-blue))",
          "blue-dark": "hsl(var(--pos-blue-dark))",
          "blue-muted": "hsl(var(--pos-blue-muted))",
          "blue-fg": "hsl(var(--pos-blue-fg))",
          red: "hsl(var(--pos-red))",
          "red-muted": "hsl(var(--pos-red-muted))",
          "red-fg": "hsl(var(--pos-red-fg))",
          gray: "hsl(var(--pos-gray))",
          "gray-dark": "hsl(var(--pos-gray-dark))",
          "gray-border": "hsl(var(--pos-gray-border))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
