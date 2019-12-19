const {getConfigForKeys} = require('./lib/config.js')
const ctfConfig = getConfigForKeys([
  'CTF_SPACE_ID',
  'CTF_CDA_ACCESS_TOKEN',
  'CTF_NAVIGATION_ID',
  'CTF_AUTHOR_ID',
  'CTF_ABOUT_ID',
  'CTF_CONTACTS_ID',
])

export default {
  mode: 'universal',
  server: {
    port: 8000, // default: 3000
    host: '0.0.0.0' // default: localhost
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Alexander Babinskiy',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'apple-mobile-web-app-title', content: 'Babinskiy' },
      { name: 'application-name', content: 'Babinskiy' },
      { name: 'msapplication-TileColor', content: '#ffffff' },
      { name: 'theme-color', content: '#ffffff' },
      { hid: 'description', name: 'description', content: 'Artist abstract expressionism' },
      // Open Graph / Facebook
      { property: 'og:type', content: 'website'},
      { property: 'og:url', content: 'https://babinskiy.com/'},
      { property: 'og:title', content: 'Alexander Babinskiy'},
      { property: 'og:description', content: 'Artist abstract expressionism'},
      { property: 'og:image', content: 'http://images.ctfassets.net/iqefgd30u0a2/2zjVYYLFpierD58gY8xGA4/80b5b8b10fb23e1f570112019a4274c7/M_-_Capture_One_Catalog7214.jpg'},
      // Twitter
      { property: 'twitter:card', content: 'http://images.ctfassets.net/iqefgd30u0a2/2zjVYYLFpierD58gY8xGA4/80b5b8b10fb23e1f570112019a4274c7/M_-_Capture_One_Catalog7214.jpg'},
      { property: 'twitter:url', content: 'https://babinskiy.com/'},
      { property: 'twitter:title', content: 'Alexander Babinskiy'},
      { property: 'twitter:description', content: 'Artist abstract expressionism'},
      { property: 'twitter:image', content: 'http://images.ctfassets.net/iqefgd30u0a2/2zjVYYLFpierD58gY8xGA4/80b5b8b10fb23e1f570112019a4274c7/M_-_Capture_One_Catalog7214.jpg'},
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', href: '/favicon-16x16.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#e3572e' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700|Oswald:300,400,500,600&display=swap&subset=cyrillic' }
    ],
  },
  transition: {
    name: 'page',
    mode: 'out-in'
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#e3572e' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // {src: '~/plugins/polyfills.js'},
    '~/plugins/contentful',
    { src: '~/plugins/fullpage', mode: 'client' },
    { src: '~/plugins/reloadClear', mode: 'client' },
    '~/plugins/i18n.js',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    // 'fullpage-nuxt',
    // 'nuxt-fullpage.js',
    '@nuxtjs/netlify-files',
  ],

  styleResources: {
    scss: [
      './assets/scss/*.scss',
      ]
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  build: {
    // try to use eventsource-pilyfill
    // extend(config, ctx) {
    //   if(ctx.idDev) {
    //     config.entry.push('eventsource-polyfill')
    //   }
    // },

    // postcss: [
    //   require('autoprefixer')()
    // ],
    postcss: {
      // Add plugin names as key and arguments as value
      // Install them before as dependencies with npm or yarn
      plugins: {
        // Disable a plugin by passing false as value
        'postcss-url': false,
        // 'postcss-nested': {},
        // 'postcss-responsive-type': {},
        // 'postcss-hexrgba': {}
      },
      preset: {
        // Change the postcss-preset-env settings
        autoprefixer: {
          grid: true
        }
      }
    }

  },
  generate: {
    fallback: true
  },

  /*
  ** Define environment variables being available
  ** in generate and browser context
  */
  env: {
    CTF_SPACE_ID: ctfConfig.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: ctfConfig.CTF_CDA_ACCESS_TOKEN,
    CTF_NAVIGATION_ID: ctfConfig.CTF_NAVIGATION_ID,
    CTF_AUTHOR_ID: ctfConfig.CTF_AUTHOR_ID,
    CTF_ABOUT_ID: ctfConfig.CTF_ABOUT_ID,
    CTF_CONTACTS_ID: ctfConfig.CTF_CONTACTS_ID,
  }
}
