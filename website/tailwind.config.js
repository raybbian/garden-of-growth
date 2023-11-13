/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx}"],
    theme: {
        extend: {
            fontFamily: {
                'sarala': ['Sarala', 'sans-serif'],
            },
            colors: {
                'koi-red': '#fd2e5f',
                'cream': '#fffef4',
            }
        },
        screens: {
            'small': {'max': '639px'},
            'mobile': {'max': '1279px'},
            'desktop': {'min': '1280px'}
        }
    },
    plugins: [],
}

