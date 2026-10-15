/* Tailwind (CDN) theme extensions */
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter','ui-sans-serif','system-ui','sans-serif'],
        serif: ['Newsreader','Georgia','serif']
      },
      keyframes: {
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        fadeup: { from: { opacity:'0', transform:'translateY(14px)' }, to: { opacity:'1', transform:'none' } },
        pop:    { from: { opacity:'0', transform:'translateY(-12px)' }, to: { opacity:'1', transform:'none' } }
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        fadeup: 'fadeup .45s ease both',
        pop: 'pop .35s ease both'
      }
    }
  }
}
