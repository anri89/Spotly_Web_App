module.exports = {
    content: [
      "./views/**/*.ejs",
      "./public/js/**/*.js"
    ],
    theme: {
      extend: {
        colors: {
          cream: '#FDF6EC',
          chill: '#98C1A6',
          lively: '#EBAE84',
          study: '#A7E0D2',
          artsy: '#B9A7F1',
          charcoal: '#333333',
          midnight: '#0f1020',
        },
        borderRadius: {
          '2xl': '1.5rem',
          '3xl': '2rem'
        },
        boxShadow: {
          card: '0 24px 60px rgba(0,0,0,0.4)'
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif']
        }
      }
    },
    plugins: [],
  }
  module.exports = {
  content: ["./views/**/*.{ejs,html}", "./public/js/**/*.js"],
  theme: {
    extend: {
      boxShadow: {
        // Soft warm shadow (good for beige background)
        'soft-warm': '0 25px 60px rgba(210, 180, 140, 0.35)',

        // Purple glow (looks aesthetic with your gradient design)
        'glow-purple': '0 20px 50px rgba(150, 90, 255, 0.35)',

        // Pink dreamy shadow
        'glow-pink': '0 20px 50px rgba(255, 120, 180, 0.32)',

        // Dark floating card shadow
        'card-dark': '0 20px 50px rgba(0, 0, 0, 0.25)',
      }
    }
  },
  plugins: [],
}
