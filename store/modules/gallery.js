import {createClient} from '../../plugins/contentful';
const contentfulClient = createClient();

export const state = {
  gallery: [],
  gallery_obj: {}
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
  getGallery({commit, state, rootState}) {
    contentfulClient.getEntries({
      content_type: 'picture',
      locale: rootState.locale.locale,
      order: 'fields.rating'
    }).then((pictures) => {
      commit('UPDATE_PICTURES', pictures['items'])
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
