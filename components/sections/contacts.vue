<template lang='pug'>
.contacts.section
	.container
		.contacts__inner
			.contacts__top
				h2.contacts__title(v-html='title')
				p.contacts__lead(v-html='lead')
			.contacts__items
				.contacts__item(v-for='(item, index) in contacts' :key='index')
					.contacts__item-title(v-html="localeComp === 'ru-RU' ? item.titleRus : item.titleEn")
					.contacts__item-value
						a.contacts__link(:data-type='item.type' :href='`tel:${item.value}`' v-if='item.type === "phone"') {{item.value}}
						a.contacts__link(:data-type='item.type' :href='`mailto:${item.value}`' v-if='item.type === "email"') {{item.value}}
						a.contacts__link(:data-type='item.type' :href='`https://www.instagram.com/${item.value}/`' v-if='item.type === "instagram"') {{'@' + item.value}}
</template>

<script>
import { mapState } from 'vuex';
	export default {
		computed: {
			...mapState('contacts', ['title', 'lead', 'contacts']),
			localeComp () {
				return this.$store.state.locale.locale
			}
    }
	}
</script>

<style lang="scss" scoped>
.contacts {
	&__inner {
		display: grid;
		grid-template-columns: auto vw(573) auto;
		grid-template-rows: repeat(2, auto);
		grid-column-gap: vw(40);
		grid-row-gap: 33px;

		@include mobile {
			display: grid;
			grid-template-columns: auto;
			grid-column-gap: 0;
			grid-row-gap: vmin(20);
			padding: vmin(106) 0 vmin(113);
		}
	}

	&__top {
		grid-area: 1 / 2 / 2 / 3;
		text-align: center;
		align-self: end;

		@include mobile {
			text-align: left;
			grid-area: initial;
		}
	}

	&__items {
		grid-area: 2 / 2 / 3 / 3;
		text-align: center;

		@include mobile {
			text-align: left;
			grid-area: initial;
		}
	}

	&__item {
		font-style: normal;
		font-weight: 500;
		font-size: 18px;
		line-height: 30px;
		color: #999999;

		&:not(:last-child) {
			margin: 0 0 37px;

			@include mobile {
				margin: 0 0 vmin(20);
			}
		}

		@include mobile {
			font-size: vmin(14);
			line-height: vmin(24);
		}
	}

	&__link {
		color: #0085FF;
		font-weight: 500;

		&[data-type=phone] {
			text-decoration: none;
			color: #000000;
		}
	}

	&__title {
		margin: 0 0 33px;

		@include mobile {
			margin: 0 0 vmin(20);
		}
	}

	&__lead {
		font-style: normal;
		font-weight: 500;
		font-size: 18px;
		line-height: 30px;
		color: #000000;

		@include mobile {
			font-size: vmin(14);
			line-height: vmin(24);
		}
	}
	.container {
		min-height: 100vh;
		display: block;
	}
}
</style>
