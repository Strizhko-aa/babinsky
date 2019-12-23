<template lang='pug'>
.wrapper
	section-header
	nuxt
	section-footer
</template>

<script>
	import header from '@/components/common/header.vue'
	import footer from '@/components/common/footer.vue'
	import { mapState } from 'vuex'

	export default {
		components: {
			'section-header': header,
			'section-footer': footer,
		},
		head: {
			title: 'Alexander Babinskiy',
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
				{ property: 'og:url', content: 'https://babinskiy.com/'},
				{ property: 'og:title', content: 'Alexander Babinskiy'},
				{ property: 'og:description', content: 'Artist abstract expressionism'},
				{ property: 'og:image', content: 'http://images.ctfassets.net/iqefgd30u0a2/2zjVYYLFpierD58gY8xGA4/80b5b8b10fb23e1f570112019a4274c7/M_-_Capture_One_Catalog7214.jpg'},
				// Twitter
				{ property: 'twitter:card', content: 'http://images.ctfassets.net/iqefgd30u0a2/2zjVYYLFpierD58gY8xGA4/80b5b8b10fb23e1f570112019a4274c7/M_-_Capture_One_Catalog7214.jpg'},
				{ property: 'twitter:url', content: 'https://babinskiy.com/'},
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
	}
</script>

<style lang='scss'>
body {
	// overflow: hidden;
}
html {
	// overflow: hidden;
  font-family: $montserrat;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.container {
	display: grid;
	grid-template-columns: auto vw(1676) auto;
	grid-template-rows: 1fr;
	grid-column-gap: 0px;
	grid-row-gap: 0px;

	@include mobile {
		grid-template-columns: auto vmin(280) auto;
	}

	> div:first-child {
		grid-area: 1 / 2 / 2 / 3;
	}
}

// Typography
h2 {
	font-family: $oswald;
	font-style: normal;
	font-weight: 500;
	font-size: 48px;
	line-height: 71px;
	color: #0D0D0D;

	@include mobile {
		font-size: vmin(36);
		line-height: vmin(53);
	}
}

// Transitions
.page-enter-active, .page-leave-active {
	transition: opacity .5s;
}
.page-enter, .page-leave-active {
	opacity: 0;
}
</style>
