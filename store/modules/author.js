import {createClient} from '../../plugins/contentful';
const contentfulClient = createClient();

export const state = {
  firstName: 'Alexander',
  lastName: 'Babinskiy',
  lead: 'abstract expressionism artist <br>working with acryl & oil',
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
  getAuthor({commit, state, rootState}) {
    contentfulClient.getEntry(process.env.CTF_AUTHOR_ID, {
      content_type: 'author',
      locale: rootState.locale.locale,
    }).then((author) => {
      commit('SET_AUTHOR', author['fields'])
    }).catch((err) => {
      console.error("error", err);
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
};
