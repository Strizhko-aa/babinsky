
export const state = {
    backgroundUrl: ''
  };
  
  export const mutations = {
    SET_BACKGROUND(state, data) {
      state.backgroundUrl = data;
    }
  };
  
  export const actions = {
    async putBackground({commit}, data) {
      commit('SET_BACKGROUND', data)
    }
  };
  
  export default {
    state,
    mutations,
    actions,
  };
  