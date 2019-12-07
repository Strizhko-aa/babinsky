<template lang='pug'>
.gallery.section
  .container(ref='gallery')
    .gallery__inner
      .gallery__top
        h2.gallery__title(v-html='galleryName')
        .gallery__photographer <span>Photo by:</span> Matvey Sysoev
      .gallery__items
        .grid-sizer
        nuxt-link.gallery__item(:to='`/gallery/${index}`' v-for='(item, index) in items' :key='index' :data-index='index' :class='`box-${index}`')
          img(:src='item.img')
      .scroll-trigger(v-observe-visibility="visibilityChanged")

</template>

<script>
import { mapState, mapGetters } from 'vuex';

import Vue from 'vue'
import { ObserveVisibility } from 'vue-observe-visibility'

Vue.directive('observe-visibility', ObserveVisibility)

if (process.browser) {
  var Masonry = require('masonry-layout');
  var ImagesLoaded = require('imagesloaded');
}

export default {
  data() {
    return {
        loadCount: 9,
        selector: ".gallery__items",
        loading: false,
        options: {
          columnWidth: ".grid-sizer",
          percentPosition: true,
          itemSelector: ".gallery__item",
          stagger: 30,
          // nicer reveal transition
          visibleStyle: { transform: 'translateY(0)', opacity: 1 },
          hiddenStyle: { transform: 'translateY(100px)', opacity: 0 },
        },
        masonry: null,
        items: [
						{
							img: 'https://placeimg.com/450/450/arch'
						}
					]
      }
    },
  computed: {
    ...mapGetters('navigation', ['galleryName']),
    ...mapState('gallery', ['gallery'])
  },
  methods: {
    visibilityChanged (visible, second) {
      if (visible) {
        this.loadMore()
      }
    },
    loaded() {
      ImagesLoaded(this.selector, () => {
        this.$emit("masonry-images-loaded");
        // activate mansonry grid
        this.masonry = new Masonry(this.selector, this.options);
        this.$emit("masonry-loaded", this.masonry);
      });
    },
    loadMore () {

      /** This is only for this demo, you could
        * replace the following with code to hit
        * an endpoint to pull in more data. **/
      this.loading = true;
      this.items.push({
        img: 'https://placeimg.com/450/315/arch'
      });
      this.items.push({
        img: 'https://placeimg.com/450/315/arch'
      });
      this.items.push({
        img: 'https://placeimg.com/450/315/arch'
      });
        // console.log(this.$parent.$refs.fullpage)
      console.log(this.items.length)
      this.loading = false;
      setTimeout(e => {
        fullpage_api.reBuild()
        console.log(this.masonry)
        this.masonry.destroy()
        this.masonry = new Masonry(this.selector, this.options);
        console.log('rebuild')
      }, 3000);
      /**************************************/

    }
  },
  watch: {
    data() {
      this.loaded();
    }
  },
  mounted() {
    this.$store.dispatch('gallery/getGallery')
    this.loaded()
  }
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
  &__top {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: flex-end;

    margin: 0 0 30px;

    line-height: 1;
  }
  &__title {
    flex: 1;

    @include mobile {
      margin: 0 0 vmin(20);
    }
  }
  &__photographer {
    font-family: $montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;

    span {
      color: #999999;
    }
  }
  &__items {
    // margin: 0 vw(-40) 0 vw(-40);
    // columns: 3 vw(450);
    // column-gap: vw(40);
    // display: flex;
    // flex-wrap: wrap;
    // justify-content: space-between;

    @include mobile {

    }

    &:after {
      content: '';
      display: block;
      clear: both;
    }
  }
  &__item {
    cursor: pointer;
  }
}
.page-load-status {
  display: none; /* hidden by default */
  padding-top: 20px;
  border-top: 1px solid #DDD;
  text-align: center;
  color: #777;
}
</style>

<style lang="scss">
.grid-sizer {
  width: 33.3333%;
}
.gallery__item {
  float: left;
  width: 33.3333%;

  @include mobile {
    width: 100%;
  }

  img {
    display: block;
    max-width: 100%;
  }
}

.scroll-trigger {
  width: 50vw;
  height: 50vh;
  // background-color: transparent;
  // background-color: red;
  border: red 1px solid;
  position: absolute;
  bottom: 0;
  pointer-events: none;
}
</style>
