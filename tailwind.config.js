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
          thunderColor: '#F3F781',
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
          bgDarkRed: '#FE2E2E',
          lightBlue: '#5B76AA',
          gold: '#9B8444'
        },

        gridTemplateRows: {
          '10': 'minmax(10px, 1fr)',
        },
        gridTemplateColumns: {
          // Simple 16 column grid
         '16': 'repeat(10, calc(15% * 1))',
        },
        spacing: {
          '4.5': '1.125rem',
          '5.5': '1.375rem',
          '10.5': '2.625rem',
          '15': '3.75rem',
          '17': '4.25rem',
          '74': '18.5rem',
          '76': '19rem',
          '77': '19.25rem',
          '78': '19.5rem',
          '117': '29.25rem',
          '118': '29.5rem',
          '119': '29.75rem',
          '120': '30rem',
          '124': '31rem',
          '140': '35rem',
          '300': '75rem',
          '402': '100.5rem',
          '480': '100rem',
          '1000': '250rem',
        },
        width: {
          '1/7': '14.2857143%',
          '2/7': '28.5714286%',
          '3/7': '42.8571429%',
          '4/7': '57.1428571%',
          '5/7': '71.4285714%',
          '6/7': '85.7142857%',
          '9/10':'90%',
        },
        height: {
          '1/7': '14.2857143%',
          '2/7': '28.5714286%',
          '3/7': '42.8571429%',
          '4/7': '57.1428571%',
          '5/7': '71.4285714%',
          '6/7': '85.7142857%',
          '9/10':'90%',
        },

        backgroundImage: {
          'fire-picture': "url('assets/imgs/unitsList/elements/fire.png')",
          'water-picture': "url('assets/imgs/unitsList/elements/water.png')",
          'earth-picture': "url('assets/imgs/unitsList/elements/earth.png')",
          'thunder-picture': "url('assets/imgs/unitsList/elements/thunder.png')",
          'light-picture': "url('assets/imgs/unitsList/elements/light.png')",
          'dark-picture': "url('assets/imgs/unitsList/elements/dark.png')",
          'male-picture': "url('assets/imgs/unitsList/genders/male.png')",
          'female-picture': "url('assets/imgs/unitsList/genders/female.png')",
          'genderLess-picture': "url('assets/imgs/unitsList/genders/genderless.png')",
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
      },
      minWidth: {
        '0': '0',
        '26': '104px',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
       },
       rotate: {
        '-180': '-180deg',
         '-90': '-90deg',
         '-60': '-60deg',
        '-45': '-45deg',
         '0': '0',
         '10': '10deg',
         '20': '20deg',
         '30': '30deg',
         '45': '45deg',
         '60': '60deg',
         '90': '90deg',
        '135': '135deg',
         '180': '180deg',
        '270': '270deg',
       },
       backgroundSize: {
        'auto': 'auto',
        'cover': 'cover',
        'contain': 'contain',
        '50%': '50%',
        '16': '4rem',
        '4' : '1rem',
        '5' : '1.25rem',
        '6' : '1.5rem',
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
        transform: ['hover', 'focus'],
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
