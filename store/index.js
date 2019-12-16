import Vuex from 'vuex';

import author from './modules/author';
import locale from './modules/locale';
import navigation from './modules/navigation';
import about from './modules/about';
import contacts from './modules/contacts';
import gallery from './modules/gallery';
import intro from './modules/intro';

// import 'eventsource-polyfill'

import langChangerPlugin from '../plugins/langChanger'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      locale: { ...locale, namespaced: true },
      author: { ...author, namespaced: true },
      navigation: { ...navigation, namespaced: true },
      about: { ...about, namespaced: true },
      contacts: { ...contacts, namespaced: true },
      gallery: { ...gallery, namespaced: true },
      intro: { ...intro, namespaced: true}
    },
    strict: false,
    plugins: [langChangerPlugin()]
  })
};

export default createStore
