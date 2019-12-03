<template lang='pug'>
.work
	.container
		.work__inner
			.work__left
				h1.work__title {{data.title}}
				.work__meta
					.work__meta-item(v-for='(item, index) in data.options')
						.work__meta-title(v-if='item.title') {{item.title}}:
						.work__meta-value(v-html='item.value')
			.work__center
				.work__zoom
					img.work__small(:src='data.small')
					img.work__origin(:src='data.origin')
			.work__right
</template>

<script>
	import $ from 'jquery';
	export default {
		methods: {
			workHover() {
				$('.work__zoom').on( "mousemove", function( event ) {
					var zoomHeight = $('.work__origin').outerHeight() - $(this).outerHeight();
					var zoomWidth = $('.work__origin').outerWidth() - $(this).outerWidth();
					
					var top = 	( ( $(this).offset().top - event.pageY ) * ( zoomHeight / $(this).outerHeight() ) ) - $(this).outerHeight();
					var left =  ( ( $(this).offset().left - event.pageX ) * parseInt( zoomWidth / $(this).outerWidth() ) ) - $(this).outerWidth();

					var translate = left+"px,"+top+"px";
					
					$('.work__origin').css({
							"-webkit-transform":"translate("+translate+")",
							"-ms-transform":"translate("+translate+")",
							"transform":"translate("+translate+")"
					});
				});
			}
		},
		mounted () {
			this.workHover();
		},
		props: {
			data: {
				type: Array,
				default: {
					title: 'tOPP',
					options: [
						{
							title: 'size',
							value: '110 x 130'
						},
						{
							title: null,
							value: 'acrylic & mixed media <br>on canvas'
						},
						{
							title: 'year',
							value: '2019'
						},
					],
					small: 'https://placeimg.com/940/727/arch',
					origin: 'https://placeimg.com/1880/1454/arch',
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
.work {
	height: 100vh;
	max-height: 100vh;
	padding: vw(190) 0 vw(160);
	&__inner {
		display: grid;
		grid-template-columns: 1fr vw(940) 1fr;
		grid-template-rows: 1fr;
		grid-column-gap: vw(40);
		grid-row-gap: 0;
	}
	&__left {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr auto;
		grid-column-gap: 0;
		grid-row-gap: vw(40);
	}
	&__center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	&__meta {
		&-item {
			display: block;
			font-style: normal;
			font-weight: 500;
			font-size: 18px;
			line-height: 28px;

			&:not(:last-child) {
				margin: 0 0 18px;
			}
		}
		&-title {
			color: #999999;
		}
		&-value {
			color: #000000;
		}
	}
	&__zoom {
		position: relative;
		display: inline-block;
		overflow: hidden;

		&:hover {
			.work__origin {
				opacity: 1;
			}
		}
	}
	&__small {
		display: block;
		max-height: 67.31481481481481vh;
		// max-width: 100%;
	}
	&__origin {
		position: absolute;
		opacity: 0;
		left: 100%;
		top: 100%;
		transform: translate(50%, 50%);
		transition: opacity .5s linear;
		cursor: pointer;
		z-index: 1;
	}
	.container {
		height: 100%;
	}
}
</style>