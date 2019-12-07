import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({ app, store }) => {
  app.i18n = new VueI18n({
    locale: store.state.locale.locale,
    fallbackLocale: 'en-US',
    messages: {
      'en-US': require('~/locales/en-US.js'),
      'ru-RU': require('~/locales/ru-RU.js')
    }
  })
}
