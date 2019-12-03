<template lang='pug'>
.about.section
	.container
		.about__inner
			.about__photo
				img(:src='data.photo')
			.about__content
				h2.about__title(v-html='data.title')
				p.about__lead(v-html='data.lead')
</template>

<script>
	export default {
		props: {
			data: {
				type: Array,
				default: {
					title: 'Alexander Babinskiy',
					lead: 'Alexander Babinskiy was born in 1964 in Moscow. He enjoyed art history in his younger years but chose a different path professionally. <br><br>After more than 25 years in journalism, communications, and PR, Babinskiy held the courage to return to his youth’s passion – painting. After spending several years’ hard work under the guidance of prominent Moscow masters, Babinskiy amassed outstanding success.',
					photo: 'https://placeimg.com/452/515/people'
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
.about {
	&__inner {
		display: grid;
		grid-template-columns: vw(452) 1fr;
		grid-template-rows: auto;
		grid-column-gap: vw(165);
		grid-row-gap: 0px;
		align-items: center;
		padding: 0 vw(245);

		@include mobile {
			grid-template-columns: 1fr;
			grid-template-rows: auto auto;
			padding: vmin(75) 0 vmin(93);
			grid-column-gap: 0;
			grid-row-gap: vmin(30);
		}
	}
	&__photo {
		@include mobile {
			margin: 0 vmin(-20);
		}
		img {
			width: 100%;
		}
	}
	&__title {
		margin: 0 0 24px;

		@include mobile {
			margin: 0 0 vmin(20);
		}
	}
	&__lead {
		font-style: normal;
		font-weight: 500;
		font-size: 18px;
		line-height: 28px;
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