
export const state = {
  title: 'Alexander Babinskiy',
  lead: 'Alexander Babinskiy was born in 1964 in Moscow. He enjoyed art history in his younger years but chose a different path professionally. <br><br>After more than 25 years in journalism, communications, and PR, Babinskiy held the courage to return to his youth’s passion – painting. After spending several years’ hard work under the guidance of prominent Moscow masters, Babinskiy amassed outstanding success.',
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
