
export const state = {
  title: 'Contacts',
  lead: '',
  contacts: [
    {
      type: 'phone',
      titleEn: 'phone:',
      titleRus: 'телефон:',
      value: ''
    },
    {
      type: 'email',
      titleEn: 'email:',
      titleRus: 'почта:',
      value: ''
    },
    {
      type: 'instagram',
      titleEn: 'instagram',
      titleRus: 'инстаграм',
      value: ''
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
