<template lang='pug'>
.gallery.section
  .container(ref='gallery')
    .gallery__inner
      .gallery__top
        h2.gallery__title(v-html='galleryName')
        .gallery__photographer <span>Photo by:</span> Matvey Sysoev
      .grid-wrap
        .grid-wrap
        nuxt-link.grid-elem(:to='`/gallery/${item.sys.id}`' v-for='(item, index) in gallery' :key='index' :data-index='index' :class='`box-${index}`')
          img(:src='item.fields.image_small.fields.file.url')
      .scroll-trigger(v-observe-visibility="visibilityChanged")

</template>

<script>
import { mapState, mapGetters } from 'vuex';

import Vue from 'vue'
import { ObserveVisibility } from 'vue-observe-visibility'

Vue.directive('observe-visibility', ObserveVisibility)

if (process.browser) {
  // var Masonry = require('masonry-layout');
  var ImagesLoaded = require('imagesloaded');
}

export default {
  data() {
    return {
        loadCount: 9,
        selector: ".gallery__items",
        loading: false,
        // options: {
        //   columnWidth: ".grid-sizer",
        //   percentPosition: true,
        //   itemSelector: ".gallery__item",
        // },
        // masonry: null,
      }
    },
  computed: {
    ...mapGetters('navigation', ['galleryName']),
    ...mapState('gallery', ['gallery'])
  },
  methods: {
    visibilityChanged (visible, second) {
      // if (visible) {
      //   this.loadMore()
      // }
    },
    loadMore() {

      /** This is only for this demo, you could
        * replace the following with code to hit
        * an endpoint to pull in more data. **/
      this.loading = true;
        // console.log(this.$parent.$refs.fullpage)
      console.log(this.items.length)
      this.loading = false;
      setTimeout(e => {
        fullpage_api.reBuild()
        console.log('rebuild')
      }, 3000);
      /**************************************/

    }
  },
  // watch: {
  //   data() {
  //     this.loaded();
  //   }
  // },
  mounted() {
    const store = this.$store
    this.$root.context.app.contentful.getEntries({
      content_type: 'picture',
      locale: store.state.locale.locale,
      order: 'fields.rating',
      // skip: 0,
      // limit: 5
    }).then((pictures) => {
      store.dispatch('gallery/putGallery', pictures)
      setTimeout(() => {
        fullpage_api.reBuild()
      }, 1500);
      setTimeout(() => {
        fullpage_api.reBuild()
      }, 2000);
    }).catch(err => {
      console.error(err)
    })
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
</style>

<style lang="scss">
.grid-sizer {
  width: calc(33.33333% - 80px / 3);
}
.gallery__item {
  float: left;
  width: calc(33.33333% - 80px / 3);
  margin-right: 40px;
  margin-bottom: 40px;

  &:nth-child(3n+1) {
    margin-right: 0;
  }

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
  background-color: transparent;
  // background-color: red;
  // border: red 1px solid;
  position: absolute;
  bottom: 0;
  pointer-events: none;
}

.grid-wrap {
    column-count: auto;
    column-gap: 20px;
    column-width: 500px;
}
.grid-elem {
    display: inline-block;
    margin: 0 0 10px;
    width: 100%;
    position: relative;
}

.grid-elem img {
    width: 100%;
    object-fit: cover;
    border-radius: 2px;
}
</style>
