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
      { hid: 'apple-mobile-web-app-title', name: 'apple-mobile-web-app-title', content: 'Babinskiy' },
      { hid: 'application-name', name: 'application-name', content: 'Babinskiy' },
      { name: 'msapplication-TileColor', content: '#ffffff' },
      { name: 'theme-color', content: '#ffffff' },
      { hid: 'description', name: 'description', content: 'Artist abstract expressionism' },
      // Open Graph / Facebook
      { property: 'og:type', content: 'website'},
      { hid: 'og:url', property: 'og:url', content: 'https://babinskiy.com/'},
      { hid: 'og:title', property: 'og:title', content: 'Alexander Babinskiy'},
      { hid: 'og:description', property: 'og:description', content: 'Artist abstract expressionism'},
      { hid: 'og:image', property: 'og:image', content: 'http://images.ctfassets.net/iqefgd30u0a2/2zjVYYLFpierD58gY8xGA4/80b5b8b10fb23e1f570112019a4274c7/M_-_Capture_One_Catalog7214.jpg'},
      // Twitter
      { hid: 'twitter:card', property: 'twitter:card', content: 'http://images.ctfassets.net/iqefgd30u0a2/2zjVYYLFpierD58gY8xGA4/80b5b8b10fb23e1f570112019a4274c7/M_-_Capture_One_Catalog7214.jpg'},
      { hid: 'twitter:url', property: 'twitter:url', content: 'https://babinskiy.com/'},
      { hid: 'twitter:title', property: 'twitter:title', content: 'Alexander Babinskiy'},
      { hid: 'twitter:description', property: 'twitter:description', content: 'Artist abstract expressionism'},
      { hid: 'twitter:image', property: 'twitter:image', content: 'http://images.ctfassets.net/iqefgd30u0a2/2zjVYYLFpierD58gY8xGA4/80b5b8b10fb23e1f570112019a4274c7/M_-_Capture_One_Catalog7214.jpg'},
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

    // parser: [require('postcss-scss')],
    postcss: {
      plugins: {
        // Disable `postcss-url`
        // 'postcss-url': false,
        // Add some plugins
        // 'postcss-nested': {},
        // 'postcss-responsive-type': {},
        // 'postcss-hexrgba': {}
        'postcss-node-sass': {}
      },
      // preset: {
      //   autoprefixer: {
      //     grid: true
      //   }
      // }
    }

  },
  generate: {
    fallback: true,
    routes: function () {
      return ['/gallery/7Aga76NoAn0c5Ef6z9i6pJ']
    }
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
