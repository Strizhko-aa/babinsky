<template lang='pug'>
.work
	.container
		.work__inner
			.top-space
			.left-name
				h1.work__title {{ picture.fields.name }}
			.pic
				.pic-content
					.work__zoom
						img.work__small(:src='picture.fields.image_medium.fields.file.url')
						img.work__origin(:src='picture.fields.image_large.fields.file.url')
			.right-top-space
			.left-nav(@click="linkTo('prev')")
				img(src='~assets/img/arrow-left.svg')
				.nav-text {{ localeComp === 'ru-RU' ? 'Предыдущая' : 'previous work'}}
			.right-nav(@click="linkTo('next')")
				.nav-text {{ localeComp === 'ru-RU' ? 'Следующая' : 'next work'}}
				img(src='~assets/img/arrow-left.svg')
			.left-decr
				.work__meta-item
					.work__meta-title(v-if='picture.fields.size') {{ $t('size') }}:
					.work__meta-value(v-html='picture.fields.size')
					.work__meta-title(v-if='picture.fields.description')
					.work__meta-value(v-html='picture.fields.description')
					.work__meta-title(v-if='picture.fields.date') {{ $t('year') }}:
					.work__meta-value(v-html='picture.fields.date')
			.right-bottom-space
			.bottom-space
</template>

<script>
  import $ from 'jquery';
  import { mapState } from 'vuex';

	export default {
		data () {
			return {
				picturesUrls: [],
				pictureIndex: null
			}
		},
		computed: {
			localeComp () {
				return this.$store.state.locale.locale
			}
		},
		methods: {
			workHover() {
				$('.work__zoom').on( "mousemove", function( event ) {
					var zoomHeight = $('.work__origin').outerHeight() - $(this).outerHeight();
					var zoomWidth = $('.work__origin').outerWidth() - $(this).outerWidth();

					var top = 	( ( $(this).offset().top - event.pageY ) * ( zoomHeight / $(this).outerHeight() ) ) - $(this).outerHeight();
					var left =  ( ( $(this).offset().left - event.pageX ) * ( zoomWidth / $(this).outerWidth() ) ) - $(this).outerWidth();
					console.log(left);

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
			}
    },
    beforeMount() {
			let _locale = localStorage.getItem('locale')

			if (_locale !== null) {
				this.$store.commit('locale/SET_LANG', _locale)
			}

      this.$store.commit('navigation/SET_DARK_THEME')
			this.$store.commit('navigation/SHOW_FOOTER')

			this.getPicturesUrlsFromStore().then(picUrlsFromRequest => {
				this.picturesUrls = picUrlsFromRequest
				this.pictureIndex = this.getPictureIndex(picUrlsFromRequest)
			})
		},
		created() {
			// console.log('before create')
			// console.log(this.localeComp)
			// if (this.localeComp === 'ru-RU') {
			// 	this.$root.context.app.contentful.getEntries({
			// 		content_type: 'picture',
      //       locale: 'ru-RU',
      //       order: 'fields.rating'
			// 	}).then((pictures) => {
			// 		this.$store.dispatch('gallery/putGallery', pictures)
			// 	})
			// }
		},

    async asyncData(context) {
			// console.log(context.req)

      await context.app.contentful.getLocales()
        .then(({items}) => {
					context.store.dispatch('locale/putLocales', items)
        }).catch((err) => {
          console.log("error", err);
        })

			const picture = context.store.state.gallery.gallery_obj[context.route.params.id]
			console.log(context.route.params)

      if (!picture) {
				const store = context.store
				// console.log(context.store.state.locale.locale)

        return Promise.all([
          context.app.contentful.getEntries({
            content_type: 'picture',
            locale: context.store.state.locale.locale,
            // locale: 'ru-RU',
            order: 'fields.rating'
          }).then((pictures) => {
            return context.store.dispatch('gallery/putGallery', pictures)
					}),
          context.app.contentful.getEntry(process.env.CTF_NAVIGATION_ID, {
            content_type: 'navigation',
						locale: context.store.state.locale.locale,
          }).then((nav) => {
            return context.store.dispatch('navigation/putNavigation', nav)
          })
        ]).then(() => {
					// console.log(context.store.state.gallery.gallery_obj[context.route.params.id])
          return {
            picture: context.store.state.gallery.gallery_obj[context.route.params.id]
          }
        }).catch(err => {
          context.error(err)
        })
      }

      return {
        picture: picture
      }
		},
		mounted () {
			this.workHover();
    },
	}
</script>

<style lang="scss" scoped>
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
									 "bottomSpace bottomSpace bottomSpace";
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
		max-width: 90%;

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
	padding-left: 20px;
}
.right-nav {
	padding-right: 20px;
}
.right-nav img {
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
		display: grid;
		grid-template: "topSpace topSpace topSpace"
									 "picture picture picture"
									 "leftNav . rightNav"
									 "leftName leftName leftName"
									 "leftDesc leftDesc leftDesc"
									 "rightBotSpace rightBotSpace rightBotSpace" 50px
									 "bottomSpace bottomSpace bottomSpace" 0 / 1fr 1fr 1fr;
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
