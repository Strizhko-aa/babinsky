<template lang='pug'>
.fullpage-container
  no-ssr
    full-page(:options="options" ref="fullpage")
      section-intro.section(data-anchor="main")
      section-gallery.section(data-anchor="gallery")
      section-about.section(data-anchor="about")
      section-contacts.section(data-anchor="contacts")
</template>

<script>
import intro from '~/components/sections/intro.vue'
import gallery from '~/components/sections/gallery.vue'
import about from '~/components/sections/about.vue'
// import news from '~/components/sections/news.vue'
import contacts from '~/components/sections/contacts.vue'

if (process.browser) {
  require('fullpage.js/vendors/scrolloverflow')
}

export default {
  components: {
      'section-intro': intro,
      'section-gallery': gallery,
      'section-about': about,
      // 'section-news': news,
      'section-contacts': contacts,
  },

  async asyncData(context) {
    const contentful = context.app.contentful

    await contentful.getLocales()
      .then(({items}) => {
        context.store.dispatch('locale/putLocales', items)
      })

    return Promise.all([
        contentful.getEntry(process.env.CTF_AUTHOR_ID, {
          content_type: 'author',
          locale: context.store.state.locale.locale,
        }).then((author) => {
          return context.store.dispatch('author/putAuthor', author)
        }),
        contentful.getEntry(process.env.CTF_NAVIGATION_ID, {
          content_type: 'navigation',
          locale: context.store.state.locale.locale,
        }).then((nav) => {
          return context.store.dispatch('navigation/putNavigation', nav)
        }),
        contentful.getEntry(process.env.CTF_ABOUT_ID, {
          content_type: 'about',
          locale: context.store.state.locale.locale,
        }).then((about) => {
          return context.store.dispatch('about/putAbout', about)
        }),
        contentful.getEntry(process.env.CTF_CONTACTS_ID, {
          content_type: 'contacts',
          locale: context.store.state.locale.locale
        }).then((contacts) => {
          return context.store.dispatch('contacts/putContacts', contacts)
        })
      ]).then((results) => {
        return {}
      })
  },
  head () {
    return  {

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
    }
  },
  beforeMount () {
    let _locale = localStorage.getItem('locale')

    if (_locale !== null) {
      this.$store.commit('locale/SET_LANG', _locale)
    }
  },
  data() {
    const self = this
    return {
      options: {
        anchors: ['main', 'gallery', 'about', 'contacts'],
        scrollOverflow: true,
        scrollOverflowOptions: {
          // probeType: 3,
          // scrollBar: true,
          // scrollbars: true,
          // mouseWheel: true,
          // interactiveScrollbars: true,
          // shrinkScrollbars: 'scale',
          // // fadeScrollbars: true,
          // bounceEasing: 'elastic',
          // bounceTime: 1200,
        },
        // fadingEffect: true,
        licenseKey: '00122C31-74D341B7-81D0999A-E51563F7',
        onLeave: function(origin, destination, direction) {
          if (destination.index == 0) {
            self.$store.commit('navigation/REMOVE_DARK_THEME')
            self.$store.commit('navigation/SHOW_FOOTER')
          } else {
            self.$store.commit('navigation/SET_DARK_THEME')
            self.$store.commit('navigation/HIDE_FOOTER')
          }
        },
        afterRender: function(origin, destination, direction){
          self.$store.commit('navigation/REMOVE_DARK_THEME')
          if(origin.index > 0) {
            self.$store.commit('navigation/SET_DARK_THEME')
          }
          if (origin.index == 1) {
            self.$store.commit('navigation/HIDE_FOOTER')
          }
        }
      }
    }
  },
}
</script>

<style>
.fp-scroller {
  transition-duration: 600ms !important;
}
</style>
