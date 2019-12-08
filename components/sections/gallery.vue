<template lang='pug'>
.gallery.section
  .container(ref='gallery')
    .gallery__inner
      .gallery__top
        h2.gallery__title(v-html='galleryName')
        .gallery__photographer <span>Photo by:</span> Matvey Sysoev
      .grid-wrap
        .grid-wrap
        nuxt-link.grid-elem(:to='`/gallery/${item.sys.id}`' v-for='(item, index) in items' :key='index' :data-index='index' :class='`box-${index}`')
          img(:src='item.fields.image_small.fields.file.url')
      .scroll-trigger(v-observe-visibility="visibilityChanged")

</template>

<script>
import { mapState, mapGetters } from 'vuex';

import Vue from 'vue'
import { ObserveVisibility } from 'vue-observe-visibility'

Vue.directive('observe-visibility', ObserveVisibility)

if (process.browser) {
  var ImagesLoaded = require('imagesloaded');
}

export default {
  data() {
    return {
        loadCount: 0,
        selector: ".gallery__items",
        loading: false,
        items: []
      }
    },
  computed: {
    ...mapGetters('navigation', ['galleryName']),
    ...mapState('gallery', ['gallery'])
  },
  methods: {
    visibilityChanged (visible, second) {
      if (visible && (this.loadCount < this.gallery.length)) {
        this.loadMore()
      }
    },
    loadMore() {
      if (!this.loading) {
        this.loading = true;
        for (let i = this.loadCount; i < this.gallery.length, i < this.loadCount + 5; ++i) {
          this.items.push(this.gallery[i])
        }

        this.loadCount += 5

        const self = this
        setTimeout(() => {
          ImagesLoaded(self.selector, () => {
            // fullpage_api.reBuild()
            self.loading = false;
          });
        }, 1000)
      }
    }
  },
  mounted() {
    const store = this.$store
    const self = this

    this.$root.context.app.contentful.getEntries({
      content_type: 'picture',
      locale: store.state.locale.locale,
      order: 'fields.rating',
    }).then((pictures) => {
      return store.dispatch('gallery/putGallery', pictures)
    }).then(() => {
      self.loadMore()
    }).catch(err => {
      console.error(err)
    })
  }
}
</script>

<style lang="scss" scoped>
.gallery {
  height: auto;
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
    column-count: 3;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 20px;
    column-width: 400px;
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
