
export const state = {
  title: 'Contacts',
  lead: 'I help but mention one of the greatest artists, a visionary of the evolution of painting - William Turner.',
  contacts: [
    {
      type: 'phone',
      title: 'phone:',
      value: '+7 892 758 34 32'
    },
    {
      type: 'email',
      title: 'email:',
      value: 'babinskiy@mail.com'
    },
    {
      type: 'instagram',
      title: 'instagram',
      value: 'babinskiy_art'
    },
  ]
};

export const mutations = {
  SET_CONTACTS(state, data) {
    state.title = data.title;
    state.lead = data.lead;
    state.contacts[0]['value'] = data.phone;
    state.contacts[1]['value'] = data.email;
    state.contacts[2]['value'] = data.instagram;
  }
};

export const actions = {
  async putContacts({commit}, contacts) {
    commit('SET_CONTACTS', contacts['fields'])
  }
};

export default {
  state,
  mutations,
  actions,
};
