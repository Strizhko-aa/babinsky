
export const state = {
    backgroundUrl: '',
    backgroundMenuUrl: ''
  };
  
  export const mutations = {
    SET_BACKGROUND(state, data) {
      console.log('BACK', data)
      state.backgroundUrl = data;
    },
    SET_MENU_BACKGROUND(state, data) {
      console.log('MENU', data)
      state.backgroundMenuUrl = data;
    }
  };
  
  export const actions = {
    async putBackground({commit}, data) {
      commit('SET_BACKGROUND', data)
    },
    async putMenuBackground({commit}, data) {
      commit('SET_MENU_BACKGROUND', data)
    }
  };
  
  export default {
    state,
    mutations,
    actions,
  };
  