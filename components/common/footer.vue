<template lang='pug'>
.footer
	.footer__left.footer__copywrite(v-html='data.copywrite')
	.footer__right
		.footer__menu
			a.footer__menu-item(v-for='(item, index) in data.items' :key='index' v-html='item.title' :href='item.href')
</template>

<script>
	export default {
		props: {
			data: {
				type: Object,
				default: {
					copywrite: '© Babinskiy, 2019',
					items: [
						{
							title: 'contacts',
							href: '#'
						},
						{
							title: 'terms of privacy',
							href: '#'
						},
					]
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
.footer {
	font-style: normal;
	font-weight: normal;
	font-size: 18px;
	line-height: 22px;
	color: #C4C4C4;

	@include mobile {
		font-size: vmin(14);
		line-height: vmin(17);
	}

	&__left {
		position: fixed;
		left: vw(122);
		bottom: vw(58);
		z-index: 99999;

		@include mobile {
			left: vmin(20);
			bottom: vmin(30);
		}
	}

	&__right {
		position: fixed;
		right: vw(122);
		bottom: vw(58);
		z-index: 99999;

		@include mobile {
			display: none;
		}
	}

	&__menu {
		display: flex;
		justify-content: flex-end;

		&-item {
			text-decoration: none;
			color: #C4C4C4;

			&:not(:last-child) {
				margin: 0 vw(50) 0 0;
			}
		}
	}
}
</style>