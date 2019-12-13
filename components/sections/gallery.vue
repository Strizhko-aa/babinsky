<template lang='pug'>
.gallery.section
  .container(ref='gallery')
    .gallery__inner
      .gallery__top
        h2.gallery__title(v-html='galleryName')
        .gallery__photographer <span>Photo by:</span> Matvey Sysoev
      .grid-wrap
        .grid-sizer
        .gutter-sizer
        //- nuxt-link.grid-elem(:to='`/gallery/${item.sys.id}`' v-for='(item, index) in items' :key='index' :data-index='index' :class='`box-${index}`')
        //-   img.load-image-trigger(:src='item.fields.image_small.fields.file.url')
        //- .skeleton-block.shine.grid-elem(v-for="index in 5" :key="'skeleton' + index" v-show="loading")
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
        loadCount: 0,
        selector: ".load-trigger",
        loading: false,
        items: [],
        msnry: null,
        imgLoad: null
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
    loadMore () {
      if (!this.loading) {
        this.loading = true;

        let _picturesFragment = document.createDocumentFragment() // фрагмент DOM в котором будут изображения
        let _picturesElems = [] // массив с этими же элементами для того чтобы скормить его Masonry

        for (let i = this.loadCount; i < this.gallery.length && i < this.loadCount + 5; i++) { // 5 изображений

          let _picture = document.createElement('div') // внешний блок
          let _pictureUrl = '/gallery/' + this.gallery[i].sys.id // чтобы значение стало строкой и при клике не зависило от this.gallery[i]
          let _index = i
          _picture.onclick = function () {
            localStorage.setItem('currentPicture', _index)
            window.location.href = _pictureUrl
          }
          _picture.className = 'grid-elem'

          let _imgWrapper = document.createElement('div') // внутри внешнего блока будет враппер для изображения, на нем будет скелетон, пока изобрадение не загрузится
          _imgWrapper.className = 'shine skeleton-block' // средний размер картины и анимация загрузки

          let _img = new Image() // само изображение
          _img.className = 'load-image-trigger' // нужен для отслеживания загрузки изображения этот же класс делает 100% прозрачности, пока картина не загрузится
          _img.src = this.gallery[i].fields.image_small.fields.file.url

          _imgWrapper.appendChild(_img)
          _picture.appendChild(_imgWrapper)
          _picturesFragment.appendChild(_picture)
          _picturesElems.push(_picture)
          // итого 5 таких блоков
          // <div class="grid-elem" href="ссылка на подробный просмртр пикчи">
          //   <div class="shine skeleton-block">
          //     <img class="load-image-trigger" src="ссылка на маленькое изображение">
          //   </div>
          // </div>
        }

        let grid = document.querySelector('.grid-wrap')

        grid.appendChild(_picturesFragment) // засовывем наши блоки в DOM дерево
        this.msnry.appended(_picturesElems) // засовывем наши блоки в мансори
        this.msnry.layout() // после чего ровняем блоки

        this.initImageLoad() // инициализируем чекер загрузки изображений, в нем же убираются не нужные классы и меняется флаг загрузки

        this.loadCount += 5
      }
    },

    initMsnry () {
      this.msnry = new Masonry('.grid-wrap', { // где там наша сетка
        itemSelector: '.grid-elem', // что там является её элементами
        columnWidth: '.grid-sizer', // размер заданный через css
        percentPosition: true, // чтобы размер был в процентах
        gutter: '.gutter-sizer' // отступ между картинами
      })
    },

    onProgress (e, image) {
      // console.log(image.isLoaded)
      if (image.isLoaded) { // если изображение загрузилось(обычно onProgress вызывается, когда оно загрузилось, а не в его процессе)
        image.img.classList.remove('load-image-trigger') // убраем класс для отслеживания загрузки и стопроцентную прозрачность элемента
        image.img.parentElement.classList.remove('shine') // убираем скелетон
        image.img.parentElement.classList.remove('skeleton-block') // убираем скелетон
      }
    },

    onDone (e, e2) {
      this.msnry.layout() // подравнять сетку
      this.loading = false // загрузка закончена
    },

    initImageLoad () {
      this.imgLoad = ImagesLoaded('.load-image-trigger')
      this.imgLoad.on('progress', this.onProgress) // загрузилось/зафйлилось хоть одно изображение
      this.imgLoad.on('done', this.onDone) // загрузились все пять изображений
    },

    pushPicturesUrlsToLocalStore (pictures) {
      if (pictures.items.length > 0 && localStorage.getItem('picturesUrls') === null) { // и хранилище не заполнено
        let _picturesUrls = []
        for (let i = 0; i < pictures.items.length; i++) {
          _picturesUrls.push('/gallery/' + pictures.items[i].sys.id)
        }
        localStorage.setItem('picturesUrls', _picturesUrls)
      }
    }
  },

  mounted () {
    const store = this.$store
    const self = this

    this.initMsnry()
    this.initImageLoad()

    this.$root.context.app.contentful.getEntries({
      content_type: 'picture',
      locale: store.state.locale.locale,
      order: 'fields.rating',
    }).then((pictures) => {
      this.pushPicturesUrlsToLocalStore(pictures)
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
    padding: vw(190) vw(122) vw(500);

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
  &__item {
    cursor: pointer;
  }
}
</style>

<style lang="scss">
.grid-sizer, .grid-elem {
  width: calc(33.33333% - 40px);
  margin-bottom: 40px;
}

.gutter-sizer {
  width: 40px;
}

.grid-wrap {
  width: 100%;
}

.grid-elem img {
  width: 100%;
  object-fit: cover;
  border-radius: 2px;
  cursor: pointer;
}

.scroll-trigger {
  width: 50vw;
  height: 50vh;
  background-color: transparent;
  position: absolute;
  bottom: 0;
  pointer-events: none;
}

.load-image-trigger {
  opacity: 0;
  transition: all;
}

.skeleton-block {
  width: 100%;
  min-height: 520px;
}
.shine {
  background: #f6f7f8;
  background-image: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  background-repeat: no-repeat;
  // background-size: 800px 104px; 
  display: inline-block;
  position: relative; 
  
  -webkit-animation-duration: 1s;
  -webkit-animation-fill-mode: forwards; 
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-name: placeholderShimmer;
  -webkit-animation-timing-function: linear;
}
@keyframes placeholderShimmer {
  0% {
    background-position: -468px 0;
  }
  
  100% {
    background-position: 468px 0; 
  }
}
</style>
