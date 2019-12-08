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
	}
</script>

<style lang='scss'>
body {
	overflow: hidden;
}
html {
	overflow: hidden;
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
