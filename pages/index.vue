<template lang='pug'>
.fullpage-container
  no-ssr
    full-page(:options="options" id="fullpage" ref="fullpage")
      section-intro.section(data-anchor="intro")
      section-gallery.section(data-anchor="gallery")
      section-about.section(data-anchor="about")
      //- section-news.section#news
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
  mounted() {
    this.$store.dispatch('author/getAuthor')
    this.$store.dispatch('navigation/getNavigation')
    this.$store.dispatch('about/getAbout')
    this.$store.dispatch('contacts/getContacts')
  },
  data() {
    const self = this
    return {
      options: {
        // anchors: ['gallery',],
        anchors: ['intro', 'gallery', 'about', 'contacts'],
        scrollOverflow: true,
        scrollOverflowReset: true,
        scrollOverflowOptions: {
          probeType: 3,
          scrollBar: true,
          scrollbars: true,
          mouseWheel: true,
          interactiveScrollbars: true,
          shrinkScrollbars: 'scale',
          fadeScrollbars: true,
          bounceEasing: 'elastic', 
          bounceTime: 1200,
        },
        fadingEffect: true,
        controlArrows: false,
        licenseKey: '00122C31-74D341B7-81D0999A-E51563F7',
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
.fp-scroller {
  transition-duration: 600ms !important;
}
</style>
