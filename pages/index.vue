<template lang='pug'>
.fullpage-container
	full-page
		section-intro.section
		section-gallery.section
		section-about.section
		section-news.section
		section-contacts.section
</template>

<script>
import intro from '~/components/sections/intro.vue'
// import gallery from '~/components/sections/gallery.vue'
import about from '~/components/sections/about.vue'
// import news from '~/components/sections/news.vue'
import contacts from '~/components/sections/contacts.vue'

export default {
    components: {
        'section-intro': intro,
        // 'section-gallery': gallery,
        'section-about': about,
        // 'section-news': news,
        'section-contacts': contacts,
	},
  mounted() {
    this.$store.dispatch('author/getAuthor')
    this.$store.dispatch('navigation/getNavigation')
    this.$store.dispatch('about/getAbout')
    this.$store.dispatch('contacts/getContacts')
  }
}
</script>

<style>
</style>
