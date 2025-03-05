
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom space theme colors
				space: {
					"black": "#050714",
					"blue": "#2563EB",
					"purple": "#9061F9",
					"pink": "#E879F9",
					"cyan": "#67e8f9",
					"indigo": "#4f46e5",
					"violet": "#7c3aed"
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-20px)' },
				},
				'pulse-glow': {
					'0%, 100%': { 
						opacity: '1',
						filter: 'brightness(1)'
					},
					'50%': { 
						opacity: '0.8',
						filter: 'brightness(1.2)'
					},
				},
				'shooting-star': {
					'0%': { 
						transform: 'translateX(0) translateY(0) rotate(-45deg)',
						opacity: '1'
					},
					'70%': { opacity: '1' },
					'100%': { 
						transform: 'translateX(-500px) translateY(500px) rotate(-45deg)',
						opacity: '0'
					},
				},
				'twinkle': {
					'0%, 100%': { opacity: '0.2' },
					'50%': { opacity: '1' },
				},
				'rotate-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					},
				},
				'blur-in': {
					'0%': {
						opacity: '0',
						filter: 'blur(10px)'
					},
					'100%': {
						opacity: '1',
						filter: 'blur(0)'
					},
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
				'shooting-star': 'shooting-star 5s linear infinite',
				'twinkle': 'twinkle 4s ease-in-out infinite',
				'rotate-slow': 'rotate-slow 20s linear infinite',
				'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
				'blur-in': 'blur-in 0.8s ease-out forwards',
			},
			backgroundImage: {
				'space-gradient': 'linear-gradient(to bottom, #050714, #0a0d28, #0f0f38)',
				'button-gradient': 'linear-gradient(to right, #2563EB, #9061F9)',
				'card-gradient': 'linear-gradient(to bottom right, rgba(37, 99, 235, 0.1), rgba(144, 97, 249, 0.1))',
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
