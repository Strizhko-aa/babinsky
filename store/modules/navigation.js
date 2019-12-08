
const getRandom = require('unique-random-array');

export const state = () => ({
  menu: {
    openText: 'menu',
    closeText: 'close',
    contactsText: 'contacts',
    termsText: 'terms of privacy',
    items: [
      {
        title: 'main',
        href: '/#main',
        img: '#'
      },
      {
        title: 'gallery',
        href: '/#gallery',
        img: '#'
      },
      {
        title: 'about',
        href: '/#about',
        img: '#'
      },
      {
        title: 'contacts',
        href: '/#contacts',
        img: '#'
      }
    ]
  },
  background: require("~/assets/img/hero.jpg"),
  darkTheme: false,
  showFooter: true
})

export const getters = {
  galleryName: state => {
    for (let item of state.menu.items) {
      if (item.href == '#gallery') {
        return item.title[0].toUpperCase() + item.title.slice(1)
      }
    }
    return 'Gallery'
  }
}

export const mutations = {
  SET_MENU (state, nav) {
    state.menu = {
      openText: nav['open'],
      closeText: nav['close'],
      contactsText: nav['contacts'],
      termsText: nav['terms'],
      items: nav['navigation']
    }
  },
  CHANGE_BACKGOUND (state, data) {
    state.background = data
  },
  SET_DARK_THEME (state) {
    state.darkTheme = true
  },
  REMOVE_DARK_THEME (state) {
    state.darkTheme = false
  },
  HIDE_FOOTER (state) {
    state.showFooter = false
  },
  SHOW_FOOTER (state) {
    state.showFooter = true
  }
}

export const actions = {
  async putNavigation({commit}, nav) {
    commit('SET_MENU', nav['fields'])
    // const randomBackground = getRandom(nav['backgrounds'])()['fields']['file']['url']
    // commit('CHANGE_BACKGOUND', randomBackground)
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
};
