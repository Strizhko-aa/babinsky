<template>
<div class="fullpage-container">
  <no-ssr>
    <div class="content-wrapper" id="content-wrapper" >
      <div id="wrap-main" class="section-wrap" v-on:wheel='onWheel($event, 0)'>
        <div class="sup-wrap">
          <div class="wrap-start" v-observe-visibility="topScrollAllow"></div>
          <section-intro class="section" id="main" data-anchor="main"></section-intro>
          <div class="wrap-end" v-observe-visibility="botScrollAllow"></div>
        </div>
      </div>
      <div id="wrap-gallery" class="section-wrap" v-on:wheel='onWheel($event, 1)'>
        <div class="sup-wrap">
          <div class="wrap-start" v-observe-visibility="topScrollAllow"></div>
          <section-gallery class="section" id="gallery" data-anchor="gallery"></section-gallery>
          <div class="wrap-end" v-observe-visibility="botScrollAllow"></div>
        </div>
      </div>
      <div id="wrap-about" class="section-wrap" v-on:wheel='onWheel($event, 2)'>
        <div class="sup-wrap">
          <div class="wrap-start" v-observe-visibility="topScrollAllow"></div>
          <section-about class="section" id="about" data-anchor="about"></section-about>
          <div class="wrap-end" v-observe-visibility="botScrollAllow"></div>
        </div>
      </div>
      <div id="wrap-contacts" class="section-wrap" v-on:wheel='onWheel($event, 3)'>
        <div class="sup-wrap">
          <div class="wrap-start" v-observe-visibility="topScrollAllow"></div>
          <section-contacts class="section" id="contacts" data-anchor="contacts"></section-contacts>
          <div class="wrap-end" v-observe-visibility="botScrollAllow"></div>
        </div>
      </div>
    </div>
  </no-ssr>
</div>
</template>

<script>
import Vue from 'vue'

import intro from '~/components/sections/intro.vue'
import gallery from '~/components/sections/gallery.vue'
import about from '~/components/sections/about.vue'
import contacts from '~/components/sections/contacts.vue'
import { ObserveVisibility } from 'vue-observe-visibility'

import { mapState, mapGetters } from 'vuex';

Vue.directive('observe-visibility', ObserveVisibility)

export default {
  components: {
      'section-intro': intro,
      'section-gallery': gallery,
      'section-about': about,
      'section-contacts': contacts,
  },
  async asyncData(context) {
    const contentful = context.app.contentful

    await contentful.getLocales()
      .then(({items}) => {
        return context.store.dispatch('locale/putLocales', items)
      })

    return Promise.all([
        contentful.getEntry(process.env.CTF_AUTHOR_ID, {
          content_type: 'author',
          locale: context.store.state.locale.locale,
        }).then((author) => {
          return context.store.dispatch('author/putAuthor', author)
        }),
        contentful.getEntry(process.env.CTF_NAVIGATION_ID, {
          content_type: 'navigation',
          locale: context.store.state.locale.locale,
        }).then((nav) => {
          return context.store.dispatch('navigation/putNavigation', nav)
        }),
        contentful.getEntry(process.env.CTF_ABOUT_ID, {
          content_type: 'about',
          locale: context.store.state.locale.locale,
        }).then((about) => {
          return context.store.dispatch('about/putAbout', about)
        }),
        contentful.getEntry(process.env.CTF_CONTACTS_ID, {
          content_type: 'contacts',
          locale: context.store.state.locale.locale
        }).then((contacts) => {
          console.log('get contants')
          console.log(contacts)
          return context.store.dispatch('contacts/putContacts', contacts)
        })
      ]).then((results) => {
        // console.dir(results)
        return {}
      })
  },
  data() {
    return {
      currentItem: 0,
      scrollTopAllow: 0,
      scrollBotAllow: 0,
      scrollDisable: false,
      elemList: [
          'wrap-main',
          'wrap-gallery',
          'wrap-about',
          'wrap-contacts'
      ],
    }
  },
  computed: {
    ...mapState('navigation', ['pageToLink'])
  },
  watch: {
    pageToLink (newVal) {
      if (newVal !== -999) {
        this.currentItem = this.elemList.indexOf(newVal)
        this.toPage(newVal, true)
      }
    }
  },
  methods: {
    topScrollAllow (visible, _) {
      if (visible) {
        setTimeout(() => {
          this.scrollTopAllow = 1
          // console.log('top', this.scrollTopAllow)
        }, 100);
      }
    },
    botScrollAllow (visible, _) {
      if (visible) {
        setTimeout(() => {
          this.scrollBotAllow = 1
          // console.log('bot', this.scrollBotAllow)
        }, 100);
      }
    },
    onWheel (e, index) {
      // if (this.scrollAllow) {
      //   var currentPage = document.getElementById(this.elemList[index])
      //   currentPage.scroll()
      // } else {
      if (this.scrollDisable) {
        e.preventDefault();
        return
      }
      if ( e.deltaY > 0 ) {
        if (this.scrollBotAllow === 1 && this.currentItem < this.elemList.length - 1) {
          this.scrollTopAllow = 0
          this.scrollBotAllow = 0
          this.currentItem = (index < this.elemList.length - 1) ? index + 1 : index
          this.toPage(this.elemList[this.currentItem])
        } else {
          if (this.currentItem < this.elemList.length - 1) {
            this.scrollTopAllow = 0
            this.scrollBotAllow = 0
          }
          var currentPage = document.getElementById(this.elemList[index])
          currentPage.scroll()
        }
      } else {
        if (this.scrollTopAllow === 1 && this.currentItem > 0) {
          this.scrollTopAllow = 0
          this.scrollBotAllow = 0
          this.currentItem = (index > 0) ? index - 1 : index
          this.toPage(this.elemList[this.currentItem])
        } else {
          if (this.currentItem > 0) {
            this.scrollTopAllow = 0
            this.scrollBotAllow = 0
          }
          var currentPage = document.getElementById(this.elemList[index])
          currentPage.scroll()
        }
      }
    },
    toPage(id, force = false) {
      if (force) {
        this.scrollTopAllow = 0
        this.scrollBotAllow = 0
      }
      var page = document.getElementById(id)
      var self = this
      this.scrollDisable = true
      // console.log('start')
      setTimeout(function () {
        self.scrollDisable = false
        // console.log('end')
      }, 600)
      page.scrollIntoView({behavior: "smooth"})
      // console.log('i scrolling')
    },
  }
}
</script>

<style>
.section-wrap {
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}
.sup-wrap {
  position: relative;
}
.wrap-start{
  width: 100%;
  height: 1px;
  /* background-color: blue; */
  background-color: transparent;
  position: absolute;
  pointer-events: none;
  top: 10px;
  left: 0;
  z-index: 99999999999999999999999999;
}
.wrap-end{
  width: 100%;
  height: 1px;
  /* background-color: palevioletred; */
  background-color: transparent;
  position: absolute;
  pointer-events: none;
  bottom: 10px;
  left: 0;
  z-index: 9999999999999999999;
}
</style>
