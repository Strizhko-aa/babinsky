<template lang='pug'>
.work
	.container
		.work__inner
			.top-space
			.left-name
				h1.work__title {{ picture.fields.name }}
			.pic
				.work__zoom
					img.work__small(:src='picture.fields.image_medium.fields.file.url')
					img.work__origin(:src='picture.fields.image_large.fields.file.url')
			.right-top-space
			.left-nav
				img(src='~assets/img/arrow-left.svg')
				.nav-text previous work
			.right-nav
				.nav-text next work
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
    beforeMount() {
      this.$store.commit('navigation/SET_DARK_THEME')
      this.$store.commit('navigation/SHOW_FOOTER')
    },
    async asyncData(context) {
      await context.app.contentful.getLocales()
        .then(({items}) => {
          return context.store.dispatch('locale/putLocales', items)
        }).catch((err) => {
          console.log("error", err);
        })

      const picture = context.store.state.gallery.gallery_obj[context.route.params.id]

      if (!picture) {
        const store = context.store

        return Promise.allSettled([
          context.app.contentful.getEntries({
            content_type: 'picture',
            locale: context.store.state.locale.locale,
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
	height: 100vh;
	max-height: 100vh;
	padding: vw(190) 0 vw(160);

	&__inner {
		display: grid;
		grid-template-columns: 1fr vw(940) 1fr;
		grid-template-rows: 50px 50px 500px 300px 50px;
		grid-template: "topSpace topSpace topSpace"
									 "leftName picture rightTopSpace"
									 "leftNav picture rightNav"
									 "leftDesc picture rightBotSpace"
									 "bottomSpace bottomSpace bottomSpace";
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
.top-space {
	grid-area: topSpace;
}
.left-name {
	grid-area: leftName;
}
.pic {
	grid-area: picture;
	height: fit-content;
	display: flex;
	justify-content: center;
}
.right-top-space {
	grid-area: rightTopSpace;
}
.left-nav {
	grid-area: leftNav;
	display: flex;
	align-items: center;
}
.right-nav {
	grid-area: rightNav;
	display: flex;
	justify-content: flex-end;
	align-items: center;
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
	.container {
		display: block;
	}
	.container:first-child {
		grid-area: 1 / 1 / 3 / 2;
	}
	.work__inner {
		width: 90%;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-auto-rows: auto;
		grid-template: "topSpace topSpace topSpace"
									 "picture picture picture"
									 "leftNav rightBotSpace rightNav"
									 "leftName leftName leftName"
									 "leftDesc leftDesc leftDesc"
									 "bottomSpace rightTopSpace rightTopSpace"!important;
	}
	.left-name, .left-decr {
		padding-left: 20px;
	}
	.top-space {
		height: vmin(44);
	}
	.pic {
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
</style>
