<template lang='pug'>
.news.section
	.container
		.news__inner
			.news__top
				h2.news__title(v-html='data.title')
			.news__items
				.news__item(v-for='(item, index) in data.items' :key='index')
					.news__item-image(:style='`background-image: url(${item.photo})`')
					.news__item-meta
						span.news__item-date(v-html='item.date')
						h4.news__item-title(v-html='item.title')
						p.news__item-lead(v-html='item.lead')
</template>

<script>
	export default {
		props: {
			data: {
				type: Array,
				default: {
					title: 'News',
					items: [
						{
							title: 'Fellow critics note a spontaneous',
							lead: 'It catches the eye and makes the viewer dive into a complex game of layers and sizes,..',
							date: '02.11.19',
							photo: 'https://placeimg.com/250/250/arch'
						},
						{
							title: 'The issue of theme ceases to exist',
							lead: 'It catches the eye and makes the viewer dive into a complex game of layers and sizes,..',
							date: '02.11.19',
							photo: 'https://placeimg.com/250/250/arch'
						},
						{
							title: 'Zilliard engages with friends and patrons',
							lead: 'It catches the eye and makes the viewer dive into a complex game of layers and sizes,..',
							date: '02.11.19',
							photo: 'https://placeimg.com/250/250/arch'
						},
						{
							title: 'Preferring acrylic abstractions',
							lead: 'It catches the eye and makes the viewer dive into a complex game of layers and sizes,..',
							date: '02.11.19',
							photo: 'https://placeimg.com/250/250/arch'
						},
						{
							title: 'We are gifted with a special opportunity',
							lead: 'It catches the eye and makes the viewer dive into a complex game of layers and sizes,..',
							date: '02.11.19',
							photo: 'https://placeimg.com/250/250/arch'
						},
						{
							title: 'The theme could be anything',
							lead: 'It catches the eye and makes the viewer dive into a complex game of layers and sizes,..',
							date: '02.11.19',
							photo: 'https://placeimg.com/250/250/arch'
						},
					]
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
.news {
	&__inner {
		padding: vw(190) vw(122);
	}
	&__title {
		margin: 0 0 30px;
	}
	&__items {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: auto;
		grid-column-gap: vw(40);
		grid-row-gap: vw(50);
	}
	&__item {
		display: grid;
		grid-template-columns: vw(205) 1fr;
		grid-template-rows: auto;
		grid-column-gap: vw(40);
		grid-row-gap: 0px;

		&-image {
			height: vw(137);
			background-size: cover;
			background-position: center;
		}

		&-date {
			font-style: normal;
			font-weight: 500;
			font-size: 18px;
			line-height: 28px;
			color: #999999;
		}

		&-title {
			font-family: $oswald;
			font-style: normal;
			font-weight: 500;
			font-size: 24px;
			line-height: 36px;
			color: #0D0D0D;
			margin: 0 0 9px;
		}

		&-lead {
			font-style: normal;
			font-weight: 500;
			font-size: 18px;
			line-height: 28px;
			color: #000000;
			margin: 0;
		}
	}
}
</style>