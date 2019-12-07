<template lang='pug'>
//- .fullpage-container
  //- full-page(:options="options" id="fullpage")
.foobar
  section-intro.section#intro
  section-gallery.section#gallery
  section-about.section#about
  //- section-news.section#news
  section-contacts.section#contacts
</template>

<script>
import intro from '~/components/sections/intro.vue'
import gallery from '~/components/sections/gallery.vue'
import about from '~/components/sections/about.vue'
// import news from '~/components/sections/news.vue'
import contacts from '~/components/sections/contacts.vue'


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

    return Promise.allSettled([
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
        console.dir(results)
        return {}
      })
  },
  data() {
    const self = this
    return {
      options: {
        // anchors: ['gallery',],
        anchors: ['intro', 'gallery', 'about', 'contacts'],
        scrollOverflow: true,
        fadingEffect: true,
        controlArrows: false,
        onLeave: function(origin, destination, direction) {
          if(origin.index == 0 && direction =='down'){
            self.$store.commit('navigation/SET_DARK_THEME')
          } else if(origin.index == 1 && direction == 'up'){
            self.$store.commit('navigation/REMOVE_DARK_THEME')
          }
        },
        afterRender: function(origin, destination, direction){
          if(origin.index == 0) {
            self.$store.commit('navigation/SET_DARK_THEME')
          }
        }
      }
    }
  },
}
</script>

<style>
</style>
