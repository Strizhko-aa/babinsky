<template lang='pug'>
.about.section
	.container
		.about__inner
			.about__photo
				img(:src='photo')
			.about__content
				h2.about__title(v-html='title')
				p.about__lead(v-html='lead')
</template>

<script>
import { mapState } from 'vuex';
	export default {
		computed: {
      ...mapState('about', ['title', 'lead', 'photo']),
		},
	}
</script>

<style lang="scss" scoped>
.about {
	&__inner {
		display: grid;
		grid-template-columns: vw(452) 1fr;
		grid-template-rows: auto;
		grid-column-gap: vw(165);
		grid-row-gap: 0px;
		padding: vw(245) vw(200) vw(345) vw(245);

		@include mobile {
			grid-template-columns: 1fr;
			grid-template-rows: auto auto;
			padding: vmin(106) 0 vmin(93);
			grid-column-gap: 0;
			grid-row-gap: vmin(30);
		}
	}
	&__photo {
		margin-top: 28px;
		@include mobile {
			margin: 0 vmin(-20);
		}
		img {
			width: 100%;
		}
	}
	&__title {
		margin: 0 0 24px;

		@include mobile {
			margin: 0 0 vmin(20);
		}
	}
	&__lead {
		font-style: normal;
		font-weight: 500;
		font-size: 16px;
		line-height: 25px;
		color: #000000;
		text-align: justify;

		@include mobile {
			font-size: vmin(14);
			line-height: vmin(24);
		}
	}
	.container {
		min-height: 100vh;
	}
}
</style>
