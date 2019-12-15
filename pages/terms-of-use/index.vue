<template>
    <div id="terms-of-use" v-html="contentTermOfPrivacy">
    </div>
</template>
<script>
export default {
    async asyncData(context) {
        const contentful = context.app.contentful

        await contentful.getLocales()
        .then(({items}) => {
            context.store.dispatch('locale/putLocales', items)
        })

        return Promise.all([
            contentful.getEntry(process.env.CTF_NAVIGATION_ID, {
                content_type: 'navigation',
                locale: context.store.state.locale.locale,
            }).then((nav) => {
                let indexImages = Math.floor(Math.random() * Math.floor(nav.fields.images.length))
                context.store.dispatch('intro/putMenuBackground', nav.fields.images[indexImages].fields.file.url)
                return context.store.dispatch('navigation/putNavigation', nav)
            })
        ]).then((results) => {
            return {}
        })
    },
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
    mounted () {
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
                        // let indexImages = Math.floor(Math.random() * Math.floor(nav.items[0].fields.images.length))
                        // context.store.dispatch('intro/putMenuBackground', nav.items[0].fields.images[indexImages].fields.file.url)
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