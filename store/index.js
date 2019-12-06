import Vuex from 'vuex';

import author from './modules/author';
import locale from './modules/locale';
import navigation from './modules/navigation';
import about from './modules/about';
import contacts from './modules/contacts';

import langChangerPlugin from '../plugins/lang_changer'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      locale: { ...locale, namespaced: true },
      author: { ...author, namespaced: true },
      navigation: { ...navigation, namespaced: true },
      about: { ...about, namespaced: true },
      contacts: { ...contacts, namespaced: true }
    },
    strict: false,
    plugins: [langChangerPlugin()]
  })
};

export default createStore
