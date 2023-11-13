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
            'mobile': {'max': '575px'},
            'tablet': {'max': '1151px'},
            'desktop': {'min': '1152px'}
        }
    },
    plugins: [],
}

