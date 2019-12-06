import {createClient} from '../../plugins/contentful';
const getRandom = require('unique-random-array');

const contentfulClient = createClient();

export const state = () => ({
  menu: {
    openText: 'menu',
    closeText: 'close',
    contactsText: 'contacts',
    termsText: 'terms of privacy',
    items: [
      {
        title: 'main',
        href: '#main',
        img: '#'
      },
      {
        title: 'gallery',
        href: '#gallery',
        img: '#'
      },
      {
        title: 'about',
        href: '#about',
        img: '#'
      },
      {
        title: 'news',
        href: '#news',
        img: '#'
      },
      {
        title: 'contacts',
        href: '#contacts',
        img: '#'
      }
    ]
  },
  background: require("~/assets/img/hero.jpg")
})

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
  }
}

export const actions = {
  getNavigation({commit, rootState}) {
    contentfulClient.getEntry(process.env.CTF_NAVIGATION_ID, {
      content_type: 'navigation',
      locale: rootState.locale.locale,
    }).then((nav) => {
      commit('SET_MENU', nav['fields'])
      // const randomBackground = getRandom(nav['backgrounds'])()['fields']['file']['url']
      // commit('CHANGE_BACKGOUND', randomBackground)
    }).catch((err) => {
      console.error("error", err);
    });
  }
};

export default {
  state,
  mutations,
  actions,
};
