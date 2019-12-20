
export const state = {
  gallery: [],
  gallery_obj: {},
  pictureDescription: {}
};

export const mutations = {
  UPDATE_PICTURES(state, data) {
    for (let picture of data) {
      if(state.gallery_obj[picture.sys.id]) {
        state.gallery.splice(state.gallery.indexOf(picture), 1, picture)
      } else {
        state.gallery.push(picture)
      }
      state.gallery_obj[picture.sys.id] = picture
    }
  }
};

export const actions = {
  async putGallery({commit}, pictures) {
    commit('UPDATE_PICTURES', pictures['items'])
  }
};

export default {
  state,
  mutations,
  actions,
};
