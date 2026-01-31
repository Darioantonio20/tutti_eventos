/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    dark: '#0f1d24',
                    primary: '#2eb8ff',
                    teal: '#00d2ff',
                    accent: '#5eead4',
                }
            },
            backgroundImage: {
                'brand-gradient': 'linear-gradient(135deg, #0f1d24 0%, #163642 50%, #2eb8ff 100%)',
            },
            animation: {
                'fade-in': 'fadeIn 0.8s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        },
    },
    plugins: [],
}
