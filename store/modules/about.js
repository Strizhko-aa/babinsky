
export const state = {
  title: '',
  lead: '',
  photo: ''
};

export const mutations = {
  SET_ABOUT(state, data) {
    state.title = data.title;
    state.lead = data.lead;
    state.photo = data.photo.fields.file.url;
  }
};

export const actions = {
  async putAbout({commit}, about) {
    commit('SET_ABOUT', about['fields'])
  }
};

export default {
  state,
  mutations,
  actions,
};
