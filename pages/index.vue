<template>
<div id="main-container" class="fullpage-container">
  <no-ssr>
    <div class="content-wrapper" id="content-wrapper" >
      <div id="wrap-main" class="section-wrap" v-on:wheel='onWheel($event, 0)'>
        <div class="sup-wrap">
          <section-intro class="section" id="main" data-anchor="main"></section-intro>
          <div id="wrap-end-1" class="wrap-end"></div>
        </div>
      </div>
      <div id="wrap-gallery" class="section-wrap" v-on:wheel='onWheel($event, 1)'>
        <div class="sup-wrap">
          <div id="wrap-start-2" class="wrap-start"></div>
          <section-gallery class="section" id="gallery" data-anchor="gallery"></section-gallery>
          <div id="wrap-end-2" class="wrap-end"></div>
        </div>
      </div>
      <div id="wrap-about" class="section-wrap" v-on:wheel='onWheel($event, 2)'>
        <div class="sup-wrap">
          <div id="wrap-start-3" class="wrap-start"></div>
          <section-about class="section" id="about" data-anchor="about"></section-about>
          <div id="wrap-end-3" class="wrap-end"></div>
        </div>
      </div>
      <div id="wrap-contacts" class="section-wrap" v-on:wheel='onWheel($event, 3)'>
        <div class="sup-wrap">
          <div id="wrap-start-4" class="wrap-start"></div>
          <section-contacts class="section" id="contacts" data-anchor="contacts"></section-contacts>
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
<<<<<<< HEAD
      options: {
        anchors: ['main', 'gallery', 'about', 'contacts'],
        scrollOverflow: true,
        scrollOverflowOptions: {
          probeType: 3,
          scrollBar: true,
          scrollbars: true,
          mouseWheel: true,
          interactiveScrollbars: true,
          shrinkScrollbars: 'scale',
          fadeScrollbars: true,
          bounceEasing: 'elastic',
          bounceTime: 1200,
        },
        fadingEffect: true,
        licenseKey: '00122C31-74D341B7-81D0999A-E51563F7',
        onLeave: function(origin, destination, direction) {
          if(origin.index == 0 && direction =='down'){
            self.$store.commit('navigation/SET_DARK_THEME')
            self.$store.commit('navigation/HIDE_FOOTER')
          } else if(origin.index == 1 && direction == 'up'){
            self.$store.commit('navigation/REMOVE_DARK_THEME')
            self.$store.commit('navigation/SHOW_FOOTER')
          }

          if (origin.index == 1 && direction == 'down') {
            self.$store.commit('navigation/SHOW_FOOTER')
          } else if (origin.index == 2 && direction == 'up') {
            self.$store.commit('navigation/HIDE_FOOTER')
          }
=======
      currentItem: 0,
      scrollMainBotAllow: true,
      scrollGalleryTopAllow: true,
      scrollGalleryBotAllow: true,
      scrollAboutTopAllow: true,
      scrollAboutBotAllow: true,
      scrollContactsTopAllow: true,
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
    onWheel (e, index) {
      var element1Bot = document.querySelector('#wrap-end-1')
      var position1Bot = element1Bot.getBoundingClientRect()
      if(position1Bot.top >= window.scrollY && position1Bot.bottom <= (window.scrollY + window.innerHeight)) {
        console.log(window.innerHeight)
        this.scrollMainBotAllow = true
      } else {
        this.scrollMainBotAllow = false
      }
      var element2Top = document.querySelector('#wrap-start-2')
      var position2Top = element2Top.getBoundingClientRect()
      if(position2Top.top >= window.scrollY && position2Top.bottom <= (window.scrollY + window.innerHeight)) {
        this.scrollGalleryTopAllow = true
      } else {
        this.scrollGalleryTopAllow = false
      }
      var element2Bot = document.querySelector('#wrap-end-2')
      var position2Bot = element2Bot.getBoundingClientRect()
      if(position2Bot.top >= window.scrollY && position2Bot.bottom <= (window.scrollY + window.innerHeight)) {
        this.scrollGalleryBotAllow = true
      } else {
        this.scrollGalleryBotAllow = false
      }
      var element3Top = document.querySelector('#wrap-start-3')
      var position3Top = element3Top.getBoundingClientRect()
      if(position3Top.top >= window.scrollY && position3Top.bottom <= (window.scrollY + window.innerHeight)) {
        this.scrollAboutTopAllow = true
      } else {
        this.scrollAboutTopAllow = false
      }
      var element3Bot = document.querySelector('#wrap-end-3')
      var position3Bot = element3Bot.getBoundingClientRect()
      if(position3Bot.top >= window.scrollY && position3Bot.bottom <= (window.scrollY + window.innerHeight)) {
        this.scrollAboutBotAllow = true
      } else {
        this.scrollAboutBotAllow = false
      }
      var element4Top = document.querySelector('#wrap-start-4')
      var position4Top = element4Top.getBoundingClientRect()
      if(position4Top.top >= window.scrollY && position4Top.bottom <= (window.scrollY + window.innerHeight)) {
        this.scrollContactsTopAllow = true
      } else {
        this.scrollContactsTopAllow = false
      }
>>>>>>> dev

      if ( e.deltaY > 0 ) {
        console.log(this.scrollMainBotAllow)
        console.log(this.scrollGalleryBotAllow)
        console.log(this.scrollAboutBotAllow)
        this.scrollBottom()
        if (this.scrollMainBotAllow) {
          this.toPage(this.elemList[1])
          e.preventDefault()
          return
        } else if (this.scrollGalleryBotAllow) {
          this.toPage(this.elemList[2])
        } else if (this.scrollAboutBotAllow) {
          this.toPage(this.elemList[3])
        }
      } else {
        if (this.scrollGalleryTopAllow) {
          this.toPage(this.elemList[0])
        } else if (this.scrollAboutTopAllow) {
          this.toPage(this.elemList[1])
        } else if (this.scrollContactsTopAllow) {
          this.toPage(this.elemList[2])
        }
      }
    },
    toPage(id, force = false) {
      var page = document.getElementById(id)
      // page.scrollIntoView({behavior: "smooth"})
      // console.log('i scrolling')
      var pos = page.getBoundingClientRect()
      window.scrollTo({
        top: pos.top,
        behavior: "smooth"
      })
    },
    scrollBottom() {
      window.scrollTo({
        top: window.scrollY + window.innerHeight,
        behavior: "smooth"
      })
    }
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
  height: 100px;
  background-color: blue;
  /* background-color: transparent; */
  position: absolute;
  pointer-events: none;
  top: 0px;
  left: 0;
  z-index: 99999999999999999999999999;
}
.wrap-end{
  width: 100%;
  height: 100px;
  background-color: palevioletred;
  /* background-color: transparent; */
  position: absolute;
  pointer-events: none;
  bottom: 0px;
  left: 0;
  z-index: 9999999999999999999;
}
</style>
