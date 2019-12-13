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
      { hid: 'description', name: 'description', content: 'abstract expressionism artist working with acryl & oil' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', href: '/favicon-16x16.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#e3572e' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700|Oswald:300,400,500,600&display=swap&subset=cyrillic' }
    ]
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
    '~/plugins/contentful',
    { src: '~/plugins/reloadClear', mode: 'client' },
    '~/plugins/i18n.js'
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
    /*
    ** Run ESLINT on save
    */
    // extend (config, ctx) {
    //   if (ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // },

    postcss: [
      require('autoprefixer')()
    ],

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
