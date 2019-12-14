<template>
    <div id="terms-of-use" v-html="contentTermOfPrivacy">
    </div>
</template>
<script>
export default {
    data() {
        return {
            contentTermOfPrivacy: ''
        }
    },
    watch: {
        locale (newVal) {
            this.getText()
        }
    },
    computed: {
        locale () {
            return this.$store.state.locale.locale
        }
    },
    beforeMount () {
        this.$store.commit('navigation/SET_DARK_THEME')
        this.$store.commit('navigation/HIDE_FOOTER')
        this.asyncDATA()
    },
    methods: {
        getText() {
            this.$root.context.app.contentful.getEntries({
                content_type: 'termOfPrivacy',
                locale: this.$store.state.locale.locale
            }).then((termOfPrivacy) => {
                this.contentTermOfPrivacy = termOfPrivacy.items[0].fields.texttext
            })
        },
        async asyncDATA () {
            this.loading = true
            this.$root.context.app.contentful.getLocales()
                .then(({items}) => {
                    this.$store.dispatch('locale/putLocales', items)

                    let _locale = localStorage.getItem('locale')

                    if (_locale !== null) {
                        this.$store.commit('locale/SET_LANG', _locale)
                    }
                }).catch((err) => {
                    console.log("error", err)
                })
                return Promise.all([
                    this.$root.context.app.contentful.getEntries({
                        content_type: 'author',
                        locale: this.$store.state.locale.locale,
                    }).then((author) => {
                        return this.$store.dispatch('author/putAuthor', author.items[0])
                    }),
                    this.$root.context.app.contentful.getEntries({
                        content_type: 'navigation',
                        locale: this.$store.state.locale.locale,
                    }).then((nav) => {
                        return this.$store.dispatch('navigation/putNavigation', nav.items[0])
                    }),
                    this.$root.context.app.contentful.getEntries({
                        content_type: 'termOfPrivacy',
                        locale: this.$store.state.locale.locale
                    }).then((termOfPrivacy) => {
                        this.contentTermOfPrivacy = termOfPrivacy.items[0].fields.texttext
                    })
                ]).then(() => {
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                })
        }

    }
}
</script>
<style lang="scss" scoped>
#terms-of-use {
    padding: vw(190) vw(422) vw(200);

    @include mobile {
      padding: vmin(106) vmin(20) vmin(130);
    }
}
</style>