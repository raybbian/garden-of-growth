/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx}"],
    theme: {
        extend: {
            fontFamily: {
                'sarala': ['Sarala', 'sans-serif'],
            },
            colors: {
                'sage-green': '#d7e4c2',
                'koi-red': '#fd2e5f',
                'cream': '#fffef4',
                'light-green': '#9db445',
                'teal': '#376f5c',
                'sakura-pink': '#eb80a8',
                'pastel-orange': '#fcdaba',
                'pastel-pink': '#ffe3ed',
            },
            transitionProperty: {
                'width': 'width',
                'height': 'height',
                'top': 'top',
                'bottom': 'bottom',
                'left': 'left',
                'right': 'right',
            },
        },
        screens: {
            'mobile': {'max': '575px'},
            'desktop': {'min': '576px'}
        }
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
    ],
}

