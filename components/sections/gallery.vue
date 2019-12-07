<template lang='pug'>
.gallery.section
  .container(ref='gallery')
    .gallery__inner
      .gallery__top
        h2.gallery__title(v-html='galleryName')
        .gallery__photographer <span>Photo by:</span> Matvey Sysoev
      .gallery__items
        .grid-sizer
        nuxt-link.gallery__item(:to='`/gallery/${item.sys.id}`' v-for='(item, index) in gallery' :key='index' :data-index='index' :class='`box-${index}`')
          img(:src='item.fields.image_small.fields.file.url')

</template>

<script>
import { mapState, mapGetters } from 'vuex';

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
        },
        masonry: null,
      }
    },
  computed: {
    ...mapGetters('navigation', ['galleryName']),
    ...mapState('gallery', ['gallery'])
  },
  methods: {
    loaded() {
      ImagesLoaded(this.selector, () => {
        this.$emit("masonry-images-loaded");
        // activate mansonry grid
        this.masonry = new Masonry(this.selector, this.options);
        this.$emit("masonry-loaded", this.masonry);
      });
    },
  },
  watch: {
    data() {
      this.loaded();
    }
  },
  mounted() {
    const store = this.$store
    const self = this

    this.$root.context.app.contentful.getEntries({
      content_type: 'picture',
      locale: store.state.locale.locale,
      order: 'fields.rating'
    }).then((pictures) => {
      return store.dispatch('gallery/putGallery', pictures)
    }).then(_ => {
      self.loaded()
    }).catch(err => {
      console.error(err)
    })

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
</style>
