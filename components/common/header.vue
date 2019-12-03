<template lang='pug'>
.header.header--dark
	nuxt-link.header__logo(to="/" v-html='data.name')
	.header__langs
		.header__lang(v-for='(item, index) in data.lang' :key='index' v-html='item.alias' @click='changeLang(item.alias)' :class='{"header__lang--active": item.alias === lang}')
	.header__menu(@click='openMenu()')
		.header__menu-button(v-html='data.menu.openText' v-if='!menuShow')
		.header__menu-button(v-html='data.menu.closeText' v-else)
		.header__menu-icon
			.header__menu-icon-item(:class='{"header__menu-icon-item--active": menuShow}')
	.header__menu-wrapper(v-if='menuShow')
		.header__menu-top
			.header__menu-items
				.header__menu-item(v-for='(item, index) in data.menu.items' :key='index' v-html='item.title')
		.header__menu-bottom
</template>

<script>
	export default {
		data() {
			return {
				menuShow: false
			}
		},
		methods: {
			openMenu() {
				this.menuShow = !this.menuShow;
			},
			changeLang(lang) {
				this.lang = lang;
			}
		},
		props: {
			lang: {
				type: String,
				default: 'en'
			},
			data: {
				type: Object,
				default: {
					name: 'Babinskiy',
					lang: [
						{
							title: 'Russian',
							alias: 'ru'
						},
						{
							title: 'English',
							alias: 'en'
						}
					],
					menu: {
						openText: 'menu',
						closeText: 'close',
						items: [
							{
								title: 'main',
								href: '#',
								img: '#'
							},
							{
								title: 'gallery',
								href: '#',
								img: '#'
							},
							{
								title: 'about',
								href: '#',
								img: '#'
							},
							// {
							// 	title: 'news',
							// 	href: '#',
							// 	img: '#'
							// },
							{
								title: 'contacts',
								href: '#',
								img: '#'
							}
						]
					}
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
.header {
	position: fixed;
	left: vw(122);
	right: vw(122);
	top: vw(60);
	display: grid;
	grid-template-columns: vw(150) 1fr vw(150);
	grid-template-rows: auto;
	grid-column-gap: vw(50);
	grid-row-gap: 0px;
	padding: 0 0 vw(20);
	border-bottom: 1px solid rgba(255, 255, 255, 0.4);
	z-index: 999;
	transition: border-color 500ms ease;

	@include mobile {
		left: vmin(20);
		right: vmin(20);
		top: vmin(20);
		grid-template-columns: 1fr 1fr;
		grid-column-gap: vmin(20);
		padding: 0 0 vmin(20);
	}

	&__logo {
		display: block;
		font-family: $oswald;
		font-style: normal;
		font-weight: 600;
		font-size: 24px;
		line-height: 36px;
		color: #FFFFFF;
		text-decoration: none;
		transition: color 500ms ease;

		@include mobile {
			font-size: vmin(24);
			line-height: vmin(36);
		}
	}

	&__langs {
		display: flex;
		justify-content: center;
		align-items: center;

		@include mobile {
			display: none;
		}
	}

	&__lang {
		display: block;
		font-family: $oswald;
		font-style: normal;
		font-weight: 300;
		font-size: 18px;
		line-height: 27px;
		color: #ffffff66;
		cursor: pointer;
		transition: color 500ms ease;

		&:not(:last-child)::after {
			content: '\00a0|\00a0';
			color: #ffffff66;
		}

		&--active {
			color: #FFFFFF;
		}
	}

	&__menu {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		cursor: pointer;
		&-button {
			margin: 0 vw(15) 0 0;
			font-family: $oswald;
			font-style: normal;
			font-weight: 300;
			font-size: 18px;
			line-height: 27px;
			color: #FFFFFF;
			transition: color 500ms ease;

			@include mobile {
				font-size: vmin(18);
				line-height: vmin(27);
				margin: 0 vmin(15) 0 0;
			}
		}
		&-icon {
			position: relative;
			width: vw(24);
			height: vw(21);

			@include mobile {
				width: vmin(24);
				height: vmin(24);
			}

			&-item {
				width: vw(24);
				height: 2px;
				background: #ffffff;
				position: absolute;
				top: calc(50% - 1px);
				transform-origin: center;
				transition: transform 150ms ease, background 500ms ease;

				@include mobile {
					width: vmin(24);
					height: 3px;
					top: calc(50% - 1.5px);
				}

				&::before {
					content: '';
					width: vw(24);
					height: 2px;
					background: #ffffff;
					position: absolute;
					top: vw(-10);
					transform-origin: center;
					transition: background 500ms ease;

					@include mobile {
						width: vmin(24);
						height: 3px;
						top: vmin(-10);
					}
				}

				&::after {
					content: '';
					width: vw(24);
					height: 2px;
					background: #ffffff;
					position: absolute;
					bottom: vw(-10);
					transform-origin: center;
					transition: background 500ms ease;

					@include mobile {
						width: vmin(24);
						height: 3px;
						bottom: vmin(-10);
					}
				}

				&--active {
					transform: rotate(45deg);

					&::before {
						transform: rotate(-90deg) translateX(vw(-10));
						@include mobile {
							transform: rotate(-90deg) translateX(vmin(-10));
						}
					}

					&::after {
						transform: rotate(-90deg) translateX(vw(10));
						@include mobile {
							transform: rotate(-90deg) translateX(vmin(10));
						}
					}
				}
			}
		}
		&-wrapper {
			position: fixed;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			z-index: -2;
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: 1fr vh(270);
			grid-column-gap: 0px;
			grid-row-gap: 0px;
		}
		&-top {
			background: #E3572E;
		}
		&-bottom {
			background: #0D0D0D;
		}
		&-items {
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: flex-end;
			padding: 0 0 vh(78);
		}
		&-item {
			font-family: $oswald;
			font-style: normal;
			font-weight: 500;
			font-size: vh(64);
			line-height: vh(110);
			text-align: center;
			color: #FFFFFF;
			transition: all 150ms ease;
			cursor: pointer;

			&:hover {
				letter-spacing: vw(12.8);
				transform: translateX(vw(6.4))
			}
		}
	}
}
</style>

<style lang="scss">
.header {
	&--dark {
		border-color: #0d0d0d33!important;
		.header {
			&__logo {
				color: #0D0D0D;
			}
			&__lang {
				color: #0D0D0D;

				&:not(:last-child)::after {
					color: #0D0D0D;
				}

				&--active {
					color: #999999;
				}
			}
			&__menu {
				&-button {
					color: #0D0D0D;
				}
				&-icon {
					&-item {
						background: #0D0D0D;

						&::before {
							background: #0D0D0D;
						}

						&::after {
							background: #0D0D0D;
						}
					}
				}
			}
		}
	}
}
</style>