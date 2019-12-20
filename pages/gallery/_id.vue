<template lang='pug'>

.work
	.container
		.work__inner(v-if="!loading")
			.top-space
			.left-name
				h1.work__title {{ pictureLocal.fields.name }}
			.pic
				.pic-content
					.work__zoom
						img.work__small(:src='pictureLocal.fields.image_medium.fields.file.url')
						img.work__origin(:src='pictureLocal.fields.image_large.fields.file.url')
			.right-top-space
			.left-nav(@click="linkTo('prev')")
				.reverse-arrow
					.arrow-wrapper
						a.animated-arrow
							span.the-arrow.-left
								span.shaft
							span.main
								span.text-reverse {{ localeComp === 'ru-RU' ? 'Предыдущая' : 'previous work'}}
								span.the-arrow.-right
									span.shaft
			.right-nav(@click="linkTo('next')")
				.arrow-wrapper
					a.animated-arrow
						span.the-arrow.-left
							span.shaft
						span.main
							span.text {{ localeComp === 'ru-RU' ? 'Следующая' : 'next work'}}
							span.the-arrow.-right
								span.shaft
			.left-decr
				.work__meta-item
					.work__meta-title(v-if='pictureLocal.fields.size') {{ localeComp === 'ru-RU' ? 'размер' : 'size' }}:
					.work__meta-value(v-html='pictureLocal.fields.size')
					.work__meta-title(v-if='pictureLocal.fields.description')
					.work__meta-value(v-html='pictureLocal.fields.description')
					.work__meta-title(v-if='pictureLocal.fields.date') {{ localeComp === 'ru-RU' ? 'год' : 'year' }}:
					.work__meta-value(v-html='pictureLocal.fields.date')
			.right-bottom-space
			.bottom-space
</template>

<script>
  import $ from 'jquery';
	import { mapState } from 'vuex';

	export default {
		async asyncData(context) {
        const contentful = context.app.contentful

        await contentful.getLocales()
        .then(({items}) => {
            context.store.dispatch('locale/putLocales', items)
        })

        return Promise.all([
						// get picture date for preview
						// contentful.getEntries({
						// 	content_type: 'picture',
						// 	limit: '999',
						// 	// locale: _locale,
						// 	order: 'fields.rating'
						// }).then((pictures) => {
						// 	let _picId = context.route.params.id
						// 	let _myPic = null

						// 	for (let i = 0; i < pictures.items.length && _myPic === null; i++) {
						// 		if (pictures.items[i].sys.id === _picId) {
						// 			for (let key in pictures.items[i]) {
						// 				_myPic = {}
						// 				_myPic[key] = pictures.items[i][key]
						// 			}
						// 			break
						// 		}
						// 	}

						// 	if (_myPic === null) {
						// 		console.log('set default descr')
						// 		return
						// 	} else {
						// 		// console.log(_myPic.fields.image_small.fields.file.url)
						// 		const picDescr = {
						// 			name: _myPic.fields.name,
						// 			year: _myPic.fields.date,
						// 			description: _myPic.fields.description,
						// 			picLink: 'https:' + _myPic.fields.image_small.fields.file.url,
						// 			url: 'https://babinskiy.com/gallery/' + _picId
						// 		}
						// 		return picDescr
						// 	}
						// }),
            contentful.getEntry(process.env.CTF_NAVIGATION_ID, {
                content_type: 'navigation',
                locale: context.store.state.locale.locale,
            }).then((nav) => {
                context.store.dispatch('intro/putMenuBackground', nav.fields.images)
                return context.store.dispatch('navigation/putNavigation', nav)
            })
        ]).then((results) => {
						// console.log(results)
						let picDescr = results[0]
            return { picDescr }
        })
		},
		// head () {
		// 	console.log('pic descrip', this.picDescr)
		// 	return {
		// 		title: 'Babinskiy ' + this.picDescr.name,
		// 		meta: [
		// 			{ charset: 'utf-8' },
		// 			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		// 			{ name: 'apple-mobile-web-app-title', content: 'Babinskiy' + this.picDescr.name },
		// 			{ name: 'application-name', content: 'Babinskiy' + this.picDescr.name },
		// 			{ name: 'msapplication-TileColor', content: '#ffffff' },
		// 			{ name: 'theme-color', content: '#ffffff' },
		// 			{ hid: 'description', name: 'description', content: this.picDescr.year + ' ' + this.picDescr.description },
		// 			// Open Graph / Facebook
		// 			{ property: 'og:type', content: 'website'},
		// 			{ property: 'og:url', content: this.picDescr.url},
		// 			{ property: 'og:title', content: 'Babinskiy' + this.picDescr.name},
		// 			{ property: 'og:description', content: this.picDescr.year + ' ' + this.picDescr.description},
		// 			{ property: 'og:image', content: this.picDescr.picLink},
		// 			{ property: 'og:image:width', content: '1500'},
		// 			{ property: 'og:image:height', content: '564'},
		// 			// Twitter
		// 			{ property: 'twitter:card', content: this.picDescr.picLink},
		// 			{ property: 'twitter:url', content: this.picDescr.url},
		// 			{ property: 'twitter:title', content: 'Babinskiy' + this.picDescr.name},
		// 			{ property: 'twitter:description', content: this.picDescr.year + ' ' + this.picDescr.description},
		// 			{ property: 'twitter:image', content: this.picDescr.picLink},
		// 		],
		// 		link: [
		// 			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
		// 			{ rel: 'icon', type: 'image/png', href: '/favicon-32x32.png' },
		// 			{ rel: 'icon', type: 'image/png', href: '/favicon-16x16.png' },
		// 			{ rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
		// 			{ rel: 'manifest', href: '/site.webmanifest' },
		// 			{ rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#e3572e' },
		// 			{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700|Oswald:300,400,500,600&display=swap&subset=cyrillic' }
		// 		]
		// 	}
		// },
		data () {
			return {
				picturesUrls: [],
				pictureIndex: null,
				pictureLocal: {},
				loading: true
			}
		},

		computed: {
			localeComp () {
				return this.$store.state.locale.locale
			}
		},
		
		watch: {
			localeComp (newVal) {
				this.$root.context.app.contentful.getEntries({
					content_type: 'picture',
					limit: '999',
					locale: this.$store.state.locale.locale,
					// locale: 'ru-RU',
					order: 'fields.rating'
				}).then((pictures) => {
					this.$store.dispatch('gallery/putGallery', pictures)
					this.pictureLocal = this.$store.state.gallery.gallery_obj[this.$route.params.id]
				})
			}
		},

		methods: {
			workHover() {
				$('.work__zoom').on( "mousemove", function( event ) {
					var zoomHeight = $('.work__origin').outerHeight() - $(this).outerHeight();
					var zoomWidth = $('.work__origin').outerWidth() - $(this).outerWidth();

					var top = 	( ( $(this).offset().top - event.pageY ) * ( zoomHeight / $(this).outerHeight() ) ) - $(this).outerHeight();
					var left =  ( ( $(this).offset().left - event.pageX ) * ( zoomWidth / $(this).outerWidth() ) ) - $(this).outerWidth();
					// console.log(left);

					var translate = left+"px,"+top+"px";

					$('.work__origin').css({
							"-webkit-transform":"translate("+translate+")",
							"-ms-transform":"translate("+translate+")",
							"transform":"translate("+translate+")"
					});
				});
			},

			getPicturesUrlsFromStore () {
				return new Promise(resolve => {
					let _urls = localStorage.getItem('picturesUrls')
	
					if (_urls !== null) { // если значения уже есть из основной страницы
						resolve(_urls.split(','))
					} else { // если значений нет, то запрашиваем
						const store = this.$store
	
						this.$root.context.app.contentful.getEntries({
							content_type: 'picture',
							limit: '999',
							locale: store.state.locale.locale,
							order: 'fields.rating',
						}).then((pictures) => {
							this.pushPicturesUrlsToLocalStore(pictures)
	
							let _newUrls = localStorage.getItem('picturesUrls')
							resolve(_newUrls.split(','))
						})
					}
				})
			},

			pushPicturesUrlsToLocalStore (pictures) {
				if (pictures.items.length > 0) {
					let _picturesUrls = []
					for (let i = 0; i < pictures.items.length; i++) {
						_picturesUrls.push('/gallery/' + pictures.items[i].sys.id)
					}
					localStorage.setItem('picturesUrls', _picturesUrls)
				}
			},

			getPictureIndex (picUrlsFromRequest) {
				let _index = localStorage.getItem('currentPicture')
				if (_index !== null) {
					return Number(_index)
				} else {
					// let picId = context.store.state.gallery.gallery_obj[context.route.params.id]
					let _picId = window.location.pathname
					let _picIndex = picUrlsFromRequest.indexOf(_picId)
					localStorage.setItem('currentPicture', _picIndex)
					return _picIndex
				}
			},

			linkTo (page) {
				if (page === 'next') { // если след картина
					if (this.pictureIndex + 1 > this.picturesUrls.length - 1) { // если выходит за край массива, то первую иначе следующую
						localStorage.setItem('currentPicture', 1)
						this.pictureIndex = 1
					} else {
						localStorage.setItem('currentPicture', this.pictureIndex + 1)
						this.pictureIndex++
					}
				} else if (page === 'prev') { // если предыдущую
					if (this.pictureIndex - 1 < 0) { // если уходим за край начала, то последнюю
						localStorage.setItem('currentPicture', this.picturesUrls.length - 1)
						this.pictureIndex = this.picturesUrls.length - 1
					} else {
						localStorage.setItem('currentPicture', this.pictureIndex - 1)
						this.pictureIndex--
					}
				}
				window.location.href = this.picturesUrls[this.pictureIndex]
			},

			async myNotasyncDATA () {
				this.loading = true
				this.$root.context.app.contentful.getLocales()
					.then(({items}) => {
						this.$store.dispatch('locale/putLocales', items)

						let _locale = localStorage.getItem('locale')

						if (_locale !== null) {
							this.$store.commit('locale/SET_LANG', _locale)
						}
					}).catch((err) => {
						console.log("error", err);
					})

				const picture = this.$store.state.gallery.gallery_obj[this.$route.params.id]
				// console.log(picture)

				if (!picture) {
					const store = this.$store
					let _locale = localStorage.getItem('locale')

					return Promise.all([
						this.$root.context.app.contentful.getEntries({
							content_type: 'picture',
							limit: '999',
							locale: _locale,
							order: 'fields.rating'
						}).then((pictures) => {
							return this.$store.dispatch('gallery/putGallery', pictures)
						}),
						this.$root.context.app.contentful.getEntries({
							content_type: 'author',
							locale: this.$store.state.locale.locale,
						}).then((author) => {
							return this.$store.dispatch('author/putAuthor', author.items[0])
						}),
						this.$root.context.app.contentful.getEntries({
							content_type: 'navigation',
							locale: this.$store.state.locale.locale,
						}).then((nav) => {
							return this.$store.dispatch('navigation/putNavigation', nav.items[0])
						})
					]).then(() => {
						this.loading = false
						this.pictureLocal = this.$store.state.gallery.gallery_obj[this.$route.params.id]
					}).catch(err => {
						console.log(err)
						this.loading = false
					})
				}

				this.pictureLocal = picture
			}
		},

    async beforeMount() {
      this.$store.commit('navigation/SET_DARK_THEME')
			this.$store.commit('navigation/SHOW_FOOTER')

			this.getPicturesUrlsFromStore().then(picUrlsFromRequest => {
				this.picturesUrls = picUrlsFromRequest
				this.pictureIndex = this.getPictureIndex(picUrlsFromRequest)
			})

		},

		async mounted () {
			await this.myNotasyncDATA()
			this.workHover();
    }
	}
</script>

<style lang="scss" scoped>

// arrow 
// Variables

$black: #4c4c4c;
$white: #eaeaea;
$gray: #808080;

$text-arrow-space: 16px;
$shaft-width: 1px;
$newshaft-width: 64px;
$shaft-thickness: 1px;
$arrow-head-width: 8px;
$arrow-head-thickness: $shaft-thickness;



// Base

* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html,
body {
  background: #ffffff;
  height: 100%;
  // font-family: 'Helvetica Neue LT W01_41488878';
  font-size: 16px;
  line-height: 26px;
}

.arrow-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

// The Arrow

.the-arrow {
  width: $shaft-width;
  transition: all 0.2s;
 
  &.-left {
    position: absolute;
    top: 60%;
    left: 0;

    > .shaft {
      width: 0;
      background-color: $black;
      
      &:before,
      &:after {
        width: 0;
        background-color: $black;
      }

      &:before {
        transform: rotate(0);
      }

      &:after {
        transform: rotate(0);
      }
    }
  }
  
  &.-right {
    top: 3px;
    
    > .shaft {
      width: $shaft-width;
      transition-delay: 0.2s;

      &:before,
      &:after { 
        width: $arrow-head-width;
        transition-delay: 0.3s;
        transition: all 0.5s;
      }
      
      &:before {
        transform: rotate(40deg);
      }
      
      &:after {
        transform: rotate(-40deg);
      }
    }
  }

  > .shaft {
    background-color: $black;
    display: block;
    height: $shaft-thickness;
    position: relative;
    transition: all 0.2s;
    transition-delay: 0;
    will-change: transform;

    &:before,
    &:after {
      background-color: $black;
      content: '';
      display: block;
      height: $arrow-head-thickness;
      position: absolute;
      top: 0;
      right: 0;
      transition: all 0.2s;
      transition-delay: 0;
    }

    &:before {
      transform-origin: top right;
    }

    &:after {
      transform-origin: bottom right;
    }
  }
}



// Animated Arrow Button

.animated-arrow {
  display: inline-block;
  color: $black;
  font-size: 1.25em;
  // font-style: italic;
  text-decoration: none;
  position: relative;
  transition: all 0.2s;
  
  &:hover {
    color: $gray;
    
    > .the-arrow.-left {
      > .shaft {
        width: $newshaft-width;
        transition-delay: 0.1s;
        background-color: $gray;

        &:before,
        &:after {
          width: $arrow-head-width;
          transition-delay: 0.1s;
          background-color: $gray;
        }

        &:before {
          transform: rotate(40deg);
        }

        &:after {
          transform: rotate(-40deg);
        }
      }
    }
    
    > .main {
      transform: translateX($shaft-width + $text-arrow-space);
      transform: translateX($newshaft-width + $text-arrow-space);
      
      > .the-arrow.-right {
        > .shaft {
          width: 0;
          transform: translateX(200%);
          transition-delay: 0;
          
          &:before,
          &:after {
            width: 0;
            transition-delay: 0;
            transition: all 0.1s;
          }

          &:before {
            transform: rotate(0);
          }

          &:after {
            transform: rotate(0);
          }
        }
      }
    }
  }
  
  > .main {
    display: flex;
    align-items: center;
    transition: all 0.2s;
    
    > .text {
      margin: 0 $text-arrow-space 0 0;
      line-height: 1;
    }
    
    > .the-arrow {
      position: relative;
    }
  }
}

.reverse-arrow {
	transform: scale(-1, 1);
	> .arrow-wrapper {
		> .animated-arrow {
			> .main {
				> .text-reverse {
					margin: 0 $text-arrow-space 0 0;
					line-height: 1;
					transform: scale(-1, 1);
				}
			}
		}
	}

}

.work {
	overflow-Y: auto;
	// max-height: 100vh;
	padding: vw(190) 0 vw(160);

	&__inner {
		display: grid;
		grid-template: "topSpace topSpace topSpace"
									 "leftName picture rightTopSpace"
									 "leftNav picture rightNav"
									 "leftDesc picture rightBotSpace"
									 "bottomSpace bottomSpace bottomSpace" auto / 1fr 5fr 1fr;
		// grid-template-columns: 1fr 5fr 1fr;
		grid-row-gap: 0;
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
		// max-width: 90%;

		&:hover {
			.work__origin {
				opacity: 1;
			}
		}
	}
	&__small {
		display: block;
		max-height: 67.31481481481481vh;
		max-width: 100%;
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
		@include mobile {
			display: none;
		}
	}
	// .container {
	// 	height: 100%;
	// }
}
.top-space {
	grid-area: topSpace;
}
.left-name {
	grid-area: leftName;
}
.pic {
	width: 100%;
	height: 67.31481481481481vh;
	grid-area: picture;
	display: flex;
	align-items: center;
	justify-content: center;
}
.pic-content {
	height: fit-content;
	display: flex;
	align-items: center;
	justify-content: center;
}
.right-top-space {
	grid-area: rightTopSpace;
}
.left-nav {
	grid-area: leftNav;
	display: flex;
	align-items: center;
	cursor: pointer;
}
.right-nav {
	grid-area: rightNav;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	cursor: pointer;
}
.left-decr {
	grid-area: leftDesc;
	display: flex;
	align-items: flex-end;
}
.right-bottom-space {
	grid-area: rightBotSpace;
}
.bottom-space {
	grid-area: bottomSpace;
}
.left-nav {
	// padding-left: 20px;
}
.right-nav {
	padding-right: 20px;
}
.left-nav img {
	transform: rotate(180deg);
}
.nav-text {
	font-weight: 500;
	padding: 10px;
}
@include mobile {
	.work {
		overflow-Y: hidden;
	}
	.container {
		display: block;
		// width: 90vw;
	}
	.container:first-child {
		grid-area: 1 / 1 / 3 / 2;
	}
	.work__inner {
		display: -ms-grid;
		width: 100%;
		height: 100%;
		-ms-grid-rows: auto auto;
		grid-template: "topSpace topSpace topSpace"
									 "picture picture picture"
									 "leftNav someEmpty rightNav"
									 "leftName leftName leftName"
									 "leftDesc leftDesc leftDesc"
									 "rightBotSpace rightBotSpace rightBotSpace"
									 "bottomSpace bottomSpace bottomSpace" auto / 1fr 5fr 1fr;
		-ms-grid-columns: 1fr 5fr 1fr;
		max-width: 100vw;
	}

	.left-name, .left-decr {
		padding-left: 20px;
	}
	.top-space {
		height: vmin(64);
	}
	.pic {
		width: 100%;
		height: auto; 
	}
	.pic-content {
		width: 100%;
		height: auto;
	}
	.pic img {
		width: 100%;
		height: auto;
	}
	.bottom-space {
		height: vmin(70);
	}
	.left-nav, .right-nav {
		padding-top: 20px;
		padding-bottom: 20px;
	}
	.left-nav {
		padding-left: 20px;
	}
	.nav-text {
		color: #C4C4C4;
	}
}
.fadeIn {
	animation: fadeIn 1s ease-in;
}
@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
</style>
