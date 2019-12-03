<template lang='pug'>
.contacts.section
	.container
		.contacts__inner
			.contacts__top
				h2.contacts__title(v-html='data.title')
				p.contacts__lead(v-html='data.lead')
			.contacts__items
				.contacts__item(v-for='(item, index) in data.contacts' :key='index')
					.contacts__item-title(v-html='item.title')
					.contacts__item-value
						a.contacts__link(:data-type='item.type' :href='`tel:${item.value}`' v-if='item.type === "phone"') {{item.value}}
						a.contacts__link(:data-type='item.type' :href='`mailto:${item.value}`' v-if='item.type === "email"') {{item.value}}
						a.contacts__link(:data-type='item.type' :href='`https://www.instagram.com/${item.value}/`' v-if='item.type === "instagram"') @{{item.value}}
</template>

<script>
	export default {
		props: {
			data: {
				type: Array,
				default: {
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
				}
			},
		},
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
	}
}
</style>