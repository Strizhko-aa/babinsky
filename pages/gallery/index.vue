<template>
  <div>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Babinskiy gallery',
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
      // { property: 'og:url', content: 'https://babinskiy.com/'},
      { property: 'og:title', content: 'Alexander Babinskiy'},
      { property: 'og:description', content: 'Artist abstract expressionism'},
      { property: 'og:image', content: 'http://images.ctfassets.net/iqefgd30u0a2/2zjVYYLFpierD58gY8xGA4/80b5b8b10fb23e1f570112019a4274c7/M_-_Capture_One_Catalog7214.jpg'},
      // Twitter
      { property: 'twitter:card', content: 'http://images.ctfassets.net/iqefgd30u0a2/2zjVYYLFpierD58gY8xGA4/80b5b8b10fb23e1f570112019a4274c7/M_-_Capture_One_Catalog7214.jpg'},
      // { property: 'twitter:url', content: 'https://babinskiy.com/'},
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
  beforeMount () {
    document.location.href = '/#gallery'
  }
}
</script>