<template lang='pug'>
//- .fullpage-container
  //- full-page(:options="options" id="fullpage")
.foobar
  section-intro.section(data-anchor="intro")
  section-gallery.section(data-anchor="gallery")
  section-about.section(data-anchor="about")
  //- section-news
  section-contacts.section(data-anchor="contacts")
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
