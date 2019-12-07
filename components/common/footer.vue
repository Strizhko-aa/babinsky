<template lang='pug'>
.footer
	.footer__left.footer__copywrite © {{lastName}}, {{year}}
	.footer__right
		.footer__menu
			a.footer__menu-item(href='/#contacts') {{ menu.contactsText }}
			a.footer__menu-item(href='#terms') {{ menu.termsText }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      year: new Date().getFullYear()
    }
  },
  computed: {
    ...mapState('author', ['lastName']),
    ...mapState('navigation', ['menu']),
  }
}
</script>

<style lang="scss" scoped>
.footer {
	font-style: normal;
	font-weight: normal;
	font-size: 18px;
	line-height: 22px;
	color: #C4C4C4;

	@include mobile {
		font-size: vmin(14);
		line-height: vmin(17);
	}

	&__left {
		position: fixed;
		left: vw(122);
		bottom: vw(58);
		z-index: 99999;

		@include mobile {
			left: vmin(20);
			bottom: vmin(30);
    }

    animation: text-in 2s both $bezier;
    animation-delay: 400ms;
	}

	&__right {
		position: fixed;
		right: vw(122);
		bottom: vw(58);
		z-index: 99999;

		@include mobile {
			display: none;
    }

    animation: text-in 2s both $bezier;
    animation-delay: 400ms;
	}

	&__menu {
		display: flex;
		justify-content: flex-end;

		&-item {
			text-decoration: none;
			color: #C4C4C4;

			&:not(:last-child) {
				margin: 0 vw(50) 0 0;
			}
		}
	}
}
</style>
