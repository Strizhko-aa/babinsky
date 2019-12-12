<template>
<div id="main-container" class="fullpage-container">
  <no-ssr>
    <div class="content-wrapper" id="content-wrapper" >
      <div id="wrap-main" class="section-wrap" v-on:wheel='onWheel($event, 0)'>
        <div class="sup-wrap">
          <section-intro class="section" id="main" data-anchor="main"></section-intro>
          <div id="wrap-end-1" class="wrap-end" v-observe-visibility="(isVisible, entry) => visibilityChanged(isVisible, entry, 1)"></div>
        </div>
      </div>
      <div id="wrap-gallery" class="section-wrap" v-on:wheel='onWheel($event, 1)'>
        <div class="sup-wrap">
          <div id="wrap-start-2" class="wrap-start" v-observe-visibility="(isVisible, entry) => visibilityChanged(isVisible, entry, 2)"></div>
          <section-gallery class="section" id="gallery" data-anchor="gallery"></section-gallery>
          <div id="wrap-end-2" class="wrap-end" v-observe-visibility="(isVisible, entry) => visibilityChanged(isVisible, entry, 3)"></div>
        </div>
      </div>
      <div id="wrap-about" class="section-wrap" v-on:wheel='onWheel($event, 2)'>
        <div class="sup-wrap">
          <div id="wrap-start-3" class="wrap-start" v-observe-visibility="(isVisible, entry) => visibilityChanged(isVisible, entry, 4)"></div>
          <section-about class="section" id="about" data-anchor="about"></section-about>
          <div id="wrap-end-3" class="wrap-end" v-observe-visibility="(isVisible, entry) => visibilityChanged(isVisible, entry, 5)"></div>
        </div>
      </div>
      <div id="wrap-contacts" class="section-wrap" v-on:wheel='onWheel($event, 3)'>
        <div class="sup-wrap">
          <div id="wrap-start-4" class="wrap-start" v-observe-visibility="(isVisible, entry) => visibilityChanged(isVisible, entry, 6)"></div>
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
      currentItem: 0,
      scrollMainBotAllow: true,
      scrollGalleryTopAllow: true,
      scrollGalleryBotAllow: true,
      scrollAboutTopAllow: true,
      scrollAboutBotAllow: true,
      scrollContactsTopAllow: true,
      scrollBlocked: false,
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
    visibilityChanged (isVisible, entry, triggerIndex) {
      if (triggerIndex == 1) {
        console.log(triggerIndex, isVisible)
        this.scrollMainBotAllow = isVisible
      } else if (triggerIndex == 2) {
        console.log(triggerIndex, isVisible)
        this.scrollGalleryTopAllow = isVisible
      } else if (triggerIndex == 3) {
        console.log(triggerIndex, isVisible)
        this.scrollGalleryBotAllow = isVisible
      } else if (triggerIndex == 4) {
        console.log(triggerIndex, isVisible)
        this.scrollAboutTopAllow = isVisible
      } else if (triggerIndex == 5) {
        this.scrollAboutBotAllow = isVisible
      } else if (triggerIndex == 6) {
        this.scrollContactsTopAllow = isVisible
      }
    },
    onWheel (e, index) {
      if (this.scrollBlocked) {
        e.preventDefault()
        return
      }
      if ( e.deltaY > 0 ) {
        console.log(this.scrollGalleryBotAllow)
        if (this.scrollMainBotAllow) {
          console.log('check', this.scrollMainBotAllow)
          this.scrollBottom()
          e.preventDefault()
          return
        } else if (this.scrollGalleryBotAllow) {
          console.log(2)
          this.scrollBottom()
          e.preventDefault()
          return
        } else if (this.scrollAboutBotAllow) {
          console.log(3)
          this.scrollBottom()
          e.preventDefault()
          return
        }
      } else {
        if (this.scrollGalleryTopAllow) {
          this.scrollTop()
          e.preventDefault()
          return
        } else if (this.scrollAboutTopAllow) {
          this.scrollTop()
          e.preventDefault()
          return
        } else if (this.scrollContactsTopAllow) {
          this.scrollTop()
          e.preventDefault()
          return
        }
      }
    },
    scrollBottom() {
      this.scrollBlocked = true
      self = this
      setTimeout(function () {
        self.scrollBlocked = false
      }, 700)
      window.scrollTo({
        top: window.scrollY + window.innerHeight,
        behavior: "smooth"
      })
    },
    scrollTop() {
      this.scrollBlocked = true
      self = this
      setTimeout(function () {
        self.scrollBlocked = false
      }, 700)
      window.scrollTo({
        top: window.scrollY - window.innerHeight,
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
  top: 2px;
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
  bottom: 2px;
  left: 0;
  z-index: 9999999999999999999;
}
</style>
