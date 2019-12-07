
export const state = () => ({
  locales: ['en-US'],
  locale: 'en-US'
})

export const mutations = {
  SET_LANG (state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  },
  ADD_LANG (state, locale) {
    if (!state.locales.includes(locale)) {
      state.locales.push(locale)
    }
  }
}

export const actions = {
  async putLocales({commit, state}, items) {
    for (let locale of items) {
      commit('ADD_LANG', locale['code'])
    }
    commit('SET_LANG', state.locales[0])
  }
};

export default {
  state,
  mutations,
  actions,
};
