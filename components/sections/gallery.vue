<template lang='pug'>
.gallery.section
	.container
		.gallery__inner
			.gallery__top
				h2.gallery__title(v-html='data.title+showWorks')
			.gallery__items
				//- .gutter-sizer
				//- .grid-sizer
				nuxt-link.gallery__item(:to='`/gallery/${index}`' v-for='(item, index) in data.items' v-if='index < showWorks' :key='index' :data-index='index' :class='`box-${index}`')
					img(:src='item.img')
			button(@click='loadMore()') load more
</template>

<script>
	if (process.browser) {
		var Masonry = require('masonry-layout');
		var ImagesLoaded = require('imagesloaded');
	}
	export default {
		props: {
			data: {
				type: Object,
				default: {
					title: 'Gallery',
					items: [
						{
							img: 'https://placeimg.com/450/450/arch'
						},
						{
							img: 'https://placeimg.com/450/644/arch'
						},
						{
							img: 'https://placeimg.com/450/450/arch'
						},
						{
							img: 'https://placeimg.com/450/315/arch'
						},
						{
							img: 'https://placeimg.com/450/307/arch'
						},
						{
							img: 'https://placeimg.com/450/642/arch'
						},
						{
							img: 'https://placeimg.com/450/450/arch'
						},
						{
							img: 'https://placeimg.com/450/561/arch'
						},
						{
							img: 'https://placeimg.com/450/450/arch'
						},
						{
							img: 'https://placeimg.com/450/315/arch'
						},
						{
							img: 'https://placeimg.com/450/415/arch'
						},
						{
							img: 'https://placeimg.com/450/642/arch'
						},
						{
							img: 'https://placeimg.com/450/450/arch'
						},
						{
							img: 'https://placeimg.com/450/644/arch'
						},
						{
							img: 'https://placeimg.com/450/450/arch'
						},
						{
							img: 'https://placeimg.com/450/315/arch'
						},
						{
							img: 'https://placeimg.com/450/307/arch'
						},
						{
							img: 'https://placeimg.com/450/642/arch'
						},
					]
				},
			},
		},
		data() {
			return {
				selector: ".gallery__items",
				options: {
					columnWidth: ".gallery__item",
					gutter: '.gutter-sizer',
					percentPosition: true,
					itemSelector: ".gallery__item"
				},
				masonry: null,
				totalWorks: null,
				showWorks: 9
			}
		},
		methods: {
			loaded() {
				// all images are loaded
				ImagesLoaded(this.selector, () => {
					this.$emit("masonry-images-loaded");
					// activate mansonry grid
					this.masonry = new Masonry(this.selector, this.options);
					this.$emit("masonry-loaded", this.masonry);
					this.totalWorks = this.data.items.length;
				});
			},
			loadMore() {
				this.showWorks += 9;
				// this.masonry.reloadItems();
			},
			openWork(id) {
				this.$router.push({
					path: `/gallery/${id}`
				})
			}
		},
		watch: {
			data() {
				// this.loaded();
			}
		},
		mounted() {
			// this.loaded();
		},
	}
</script>

<style lang="scss" scoped>
.gallery {
	&__inner {
		padding: vw(190) vw(122);

		@include mobile {
			padding: vmin(106) 0 vmin(130);
		}
	}
	&__title {
		margin: 0 0 30px;

		@include mobile {
			margin: 0 0 vmin(20);
		}
	}
	&__items {
		// margin: 0 vw(-40) 0 vw(-40);
		// columns: 3 vw(450);
		// column-gap: vw(40);
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		@include mobile {
			
		}
	}
	&__item {
		cursor: pointer;
	}
}
</style>

<style lang="scss">
.grid-sizer {
	width: vw(450);
}
.gutter-sizer {
	width: vw(40);
}
.gallery__item {
	float: left;
	width: vw(450);
	margin: 0 0 vw(40);
	// padding-bottom: vw(40);
	// padding-left: vw(40);

	@include mobile {
		width: 100%;
		margin: 0 0 vmin(20);
	}

	img {
		width: 100%;
	}
}
</style>