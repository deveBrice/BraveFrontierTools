const plugin = require('tailwindcss/plugin');
module.exports = {
    prefix: '',
    purge: {
      content: [
        './src/**/*.{html,ts}',
      ]
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      extend: {
        screens: {
          xs: '360px',
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        },

        colors: {
          blackCardUnit: '#2C2C2C',  //423D3D
          fireColor: '#FE2E2E',
          waterColor: '#3471EB',
          earthColor: '#04B404',
          lightningColor: '#F3F781',
          lightColor: '#BFBFBF',
          darkColor: '#D0A9F5',
          stars: '#FEF505',
          bgGray: '#C8C8C8',
          bgDarkGray: '#808080',
          bgOrange: '#FFC5A4',
          bgDarkOrange: '#FE792E',
          bgBlue: '#5B76AA',
          bgDarkBlue: '#1F54BB',
          bgYellow: '#F6D788',
          bgDarkYellow: '#FEB805',
          bgRed: '#FF8787',
          bgDarkRed: '#FE2E2E'
        },

        gridTemplateRows: {
          '10': 'minmax(10px, 1fr)',
        },
        gridTemplateColumns: {
          // Simple 16 column grid
         '16': 'repeat(10, calc(15% * 1))',
        },
        spacing: {
          '74': '18.5rem',
          '120': '30rem',
          '124': '31rem',
          '140': '35rem',
          '300': '75rem',
          '402': '100.5rem',
          '480': '100rem',
          '1000': '250rem',
        },

        backgroundImage: {
          'fire-picture': "url('assets/imgs/unitsList/elements/fire.png')",
          'water-picture': "url('assets/imgs/unitsList/elements/water.png')",
          'earth-picture': "url('assets/imgs/unitsList/elements/earth.png')",
          'lightning-picture': "url('assets/imgs/unitsList/elements/lightning.png')",
          'light-picture': "url('assets/imgs/unitsList/elements/light.png')",
          'dark-picture': "url('assets/imgs/unitsList/elements/dark.png')",
        },
      },

      borderRadius: {
      'none': '0',
       'sm': '0.125rem',
       DEFAULT: '0.25rem',
       DEFAULT: '4px',
       'md': '0.375rem',
       'lg': '0.5rem',
       'xl': '0.75rem',
       '2xl': '1rem',
       'full': '9999px',
       'large': '12px',
      }
    },
    variants: {
      extend: {
        borderRadius: ['responsive', 'important'],
        margin: ['responsive', 'important'],
        height: ['responsive', 'important'],
        width: ['responsive', 'important'],
        borderRadius: ['hover', 'focus', 'important'],
        backgroundImage: ['hover', 'focus', 'important'],
        display: ['hover', 'focus'],
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
      plugin(function({ addVariant }) {
        addVariant('important', ({ container }) => {
          container.walkRules(rule => {
            rule.selector = `.\\!${rule.selector.slice(1)}`
            rule.walkDecls(decl => {
              decl.important = true
            })
          })
        })
      })
    ],
};
