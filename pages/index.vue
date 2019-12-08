<template>
<div class="fullpage-container">
  <no-ssr>
    <div class="content-wrapper" id="content-wrapper" >
      <div id="wrap-main" class="section-wrap" v-on:wheel='onWheel($event, 0)'>
        <div class="sup-wrap">
          <div class="wrap-start" v-observe-visibility="currentItem === 0 ? topScrollAllow : false"></div>
          <section-intro class="section" id="main" data-anchor="main"></section-intro>
          <div class="wrap-end" v-observe-visibility="currentItem === 0 ? botScrollAllow : false"></div>
        </div>
      </div>
      <div id="wrap-gallery" class="section-wrap" v-on:wheel='onWheel($event, 1)'>
        <div class="sup-wrap">
          <div class="wrap-start" v-observe-visibility="currentItem === 1 ? topScrollAllow : false"></div>
          <section-gallery class="section" id="gallery" data-anchor="gallery"></section-gallery>
          <div class="wrap-end" v-observe-visibility="currentItem === 1 ? botScrollAllow : false"></div>
        </div>
      </div>
      <div id="wrap-about" class="section-wrap" v-on:wheel='onWheel($event, 2)'>
        <div class="sup-wrap">
          <div class="wrap-start" v-observe-visibility="currentItem === 2 ? topScrollAllow : false"></div>
          <section-about class="section" id="about" data-anchor="about"></section-about>
          <div class="wrap-end" v-observe-visibility="currentItem === 2 ? botScrollAllow : false"></div>
        </div>
      </div>
      <div id="wrap-contacts" class="section-wrap" v-on:wheel='onWheel($event, 3)'>
        <div class="sup-wrap">
          <div class="wrap-start" v-observe-visibility="currentItem === 3 ? topScrollAllow : false"></div>
          <section-contacts class="section" id="contacts" data-anchor="contacts"></section-contacts>
          <div class="wrap-end" v-observe-visibility="currentItem === 3 ? botScrollAllow : false"></div>
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
          return context.store.dispatch('contacts/putContacts', contacts)
        })
      ]).then((results) => {
        console.dir(results)
        return {}
      })
  },
  data() {
    return {
      currentItem: 0,
      scrollTopAllow: false,
      scrollBotAllow: false,
      elemList: [
          'wrap-main',
          'wrap-gallery',
          'wrap-about',
          'wrap-contacts'
      ],
    }
  },
  methods: {
    topScrollAllow (visible, _) {
      this.scrollTopAllow = false
      if (visible) {
        this.scrollTopAllow = true
      }
      console.log('top', visible, this.currentItem)
    },
    botScrollAllow (visible, _) {
      this.scrollBotAllow = false
      if (visible) {
        this.scrollBotAllow = true
      }
      console.log('bot', visible, this.currentItem)
    },
    onWheel (e, index) {
      // if (this.scrollAllow) {
      //   var currentPage = document.getElementById(this.elemList[index])
      //   currentPage.scroll()
      // } else {
      if ( e.deltaY > 0 ) {
        if (this.scrollBotAllow) {
          this.currentItem = (index < this.elemList.length - 1) ? index + 1 : index
          this.toPage(this.elemList[this.currentItem])
        } else {
          var currentPage = document.getElementById(this.elemList[index])
          currentPage.scroll()
        }
      } else {
        if (this.scrollTopAllow) {
          this.currentItem = (index > 0) ? index - 1 : index
          this.toPage(this.elemList[this.currentItem])
        } else {
          var currentPage = document.getElementById(this.elemList[index])
          currentPage.scroll()
        }
      }
    }, 
    toPage(id) {
      var page = document.getElementById(id)
      var self = this
      setTimeout(function () {
        this.scrollBotAllow = false
        this.scrollTopAllow = false
      }, 700) 
      page.scrollIntoView({behavior: "smooth"})
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
  background-color: blue;
  position: absolute;
  top: 0px;
  left: 0;
  z-index: 99;
}
.wrap-end{
  width: 100%;
  height: 1px;
  background-color: palevioletred;
  position: absolute;
  bottom: 0px;
  left: 0;
  z-index: 99;
}
</style>
