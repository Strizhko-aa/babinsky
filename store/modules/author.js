
export const state = {
  firstName: '',
  lastName: '',
  lead: '',
};

export const getters = {
  fullName: state => `${state['firstName']} ${state['lastName']}`
}

export const mutations = {
  SET_AUTHOR(state, data) {
    state.firstName = data.firstName;
    state.lastName = data.lastName;
    state.lead = data.lead;
  }
};

export const actions = {
  async putAuthor({commit}, author) {
    commit('SET_AUTHOR', author['fields'])
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
};
