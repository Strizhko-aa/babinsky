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
        return context.store.dispatch('locale/putLocales', items)
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
          if(origin.index == 0 && direction =='down'){
            self.$store.commit('navigation/SET_DARK_THEME')
            self.$store.commit('navigation/HIDE_FOOTER')
          } else if(origin.index == 1 && direction == 'up'){
            self.$store.commit('navigation/REMOVE_DARK_THEME')
            self.$store.commit('navigation/SHOW_FOOTER')
          }

          if (origin.index == 1 && direction == 'down') {
            // self.$store.commit('navigation/SHOW_FOOTER')
          } else if (origin.index == 2 && direction == 'up') {
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
