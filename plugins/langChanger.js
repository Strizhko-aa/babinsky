export default function langChangerPlugin () {
  return store => {
    let prelocale = store.state.locale.locale
    store.subscribe((mutation, state) => {
      if (mutation.type === 'locale/SET_LANG') {
        if (prelocale != state.locale.locale) {
          Promise.all([
            store.contentful.getEntry(process.env.CTF_AUTHOR_ID, {
              content_type: 'author',
              locale: store.state.locale.locale,
            }).then((author) => {
              return store.dispatch('author/putAuthor', author)
            }),
            store.contentful.getEntry(process.env.CTF_NAVIGATION_ID, {
              content_type: 'navigation',
              locale: store.state.locale.locale,
            }).then((nav) => {
              return store.dispatch('navigation/putNavigation', nav)
            }),
            store.contentful.getEntry(process.env.CTF_ABOUT_ID, {
              content_type: 'about',
              locale: store.state.locale.locale,
            }).then((about) => {
              return store.dispatch('about/putAbout', about)
            }),
            store.contentful.getEntry(process.env.CTF_CONTACTS_ID, {
              content_type: 'contacts',
              locale: store.state.locale.locale
            }).then((contacts) => {
              return store.dispatch('contacts/putContacts', contacts)
            })
          ])
          .then(results => {console.log(results)})
          .catch((err) => {
            console.log("error", err);
          })

          prelocale = state.locale.locale
        }
      }
    })
  }
}
