<template>
    <div id="term-of-privacy">
    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    beforeMount () {
        this.$store.commit('navigation/SET_DARK_THEME')
        this.asyncDATA()
    },
    methods: {
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
                    console.log("error", err);
                })
        }

    }
}
</script>
<style lang="scss" scoped>

</style>