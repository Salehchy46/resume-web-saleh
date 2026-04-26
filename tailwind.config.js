export const theme = {
    extend: {
        animation: {
            'gradient-xy': 'gradient-xy 15s ease infinite',
        },
        keyframes: {
            'gradient-xy': {
                '0%, 100%': { backgroundPosition: '0% 50%' },
                '50%': { backgroundPosition: '100% 50%' },
            },
        },
    },
};

export default {
    content: [
        './index.html', 
        './src/**/*.{js,jsx,ts,tsx}'
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};

