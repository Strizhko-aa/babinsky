<template lang='pug'>
.fullpage-container
	//- .fullpage-wp.home(v-fullpage="options" ref="home")
	full-page(:options="options" id="fullpage")
		section-intro.section
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
	data() {
		return {
			options: {
				anchors: ['intro', 'gallery', 'about', 'contacts'],
				scrollOverflow: true,
				fadingEffect: true,
				controlArrows: false,
				onLeave: function(origin, destination, direction){
					
					// if(origin.index == 0 && direction =='down'){
					// 	document.querySelector('.header').classList.add('header--dark');
					// 	document.querySelector('.footer').classList.add('footer--dark');
					// }

					// else if(origin.index == 1 && direction == 'up'){
					// 	document.querySelector('.header').classList.remove('header--dark');
					// 	document.querySelector('.footer').classList.remove('footer--dark');
					// }
				},
				afterRender: function(origin, destination, direction){
					// if(origin.index == 0){
					// 	document.querySelector('.header').classList.remove('header--dark');
					// 	document.querySelector('.footer').classList.remove('footer--dark');
					// }
				}
			}
		}
	},
}
</script>

<style>
/* .fullpage-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
} */
</style>