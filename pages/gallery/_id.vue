<template lang='pug'>
.work
	.container
		.work__inner
			.work__left
				h1.work__title {{ picture.fields.name }}
				.work__meta
					.work__meta-item
						.work__meta-title(v-if='picture.fields.size') {{ $t('size') }}:
						.work__meta-value(v-html='picture.fields.size')
						.work__meta-title(v-if='picture.fields.description')
						.work__meta-value(v-html='picture.fields.description')
						.work__meta-title(v-if='picture.fields.date') {{ $t('year') }}:
						.work__meta-value(v-html='picture.fields.date')
			.work__center
				.work__zoom
					img.work__small(:src='picture.fields.image_medium.fields.file.url')
					img.work__origin(:src='picture.fields.image_large.fields.file.url')
			.work__right
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
