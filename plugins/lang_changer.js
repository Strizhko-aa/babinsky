export default function langChangerPlugin () {
  return store => {
    let prelocale = store.state.locale.locale
    store.subscribe((mutation, state) => {
      if (mutation.type === 'locale/SET_LANG') {
        if (prelocale != state.locale.locale) {
          store.dispatch('author/getAuthor')
          store.dispatch('navigation/getNavigation')
          store.dispatch('about/getAbout')
          store.dispatch('contacts/getContacts')
          store.dispatch('gallery/getGallery')
          prelocale = state.locale.locale
        }
      }
    })
  }
}
