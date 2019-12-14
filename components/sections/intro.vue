<template lang='pug'>
.intro.section
  .intro__inner
    .intro__top.container
      .intro__top-inner
        .intro__bg(v-bind:style="{'background-image': `url(${backgroundUrl})`}")
        h1.intro__title {{ fullName }}
        p.intro__lead(v-html='lead')
    .intro__bottom
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  computed: {
    ...mapGetters('author', ['fullName']),
    ...mapState('author', ['lead']),
    ...mapState('intro', ['backgroundUrl'])
  }
}
</script>

<style lang="scss" scoped>
.intro {
  &__inner {
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr vh(270);
    grid-column-gap: 0px;
    grid-row-gap: 0px;

    @include mobile {
      grid-template-rows: 1fr vmin(168);
    }
  }
  &__top {
    position: relative;
    background-color: #0D0D0D;
    &-inner {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      z-index: 1;
    }
  }
  &__bottom {
    background: #0D0D0D;
  }
  &__bg {
    background-image: url('~assets/img/hero.jpg');
    background-size: cover;
    background-position: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.35;


    animation: image-in 4s both;
    animation-delay: 400ms;
  }
  &__title {
    font-family: $oswald;
    font-style: normal;
    font-weight: 500;
    font-size: vw(100);
    line-height: vw(110);
    color: #E3572E;
    margin: 0 0 vw(45);

    @include mobile {
      font-size: vmin(40);
      line-height: vmin(48);
      margin: 0 0 vmin(15);
    }

    animation: text-in 2s both $bezier;
    animation-delay: 250ms;
  }
  &__lead {
    font-style: normal;
    font-weight: normal;
    font-size: vw(24);
    line-height: vw(29);
    color: #C9C9C9;
    margin: 0 0 vw(70);

    @include mobile {
      font-size: vmin(16);
      line-height: vmin(20);
      margin: 0 0 vmin(30);
    }

    animation: text-in 2s both $bezier;
    animation-delay: 400ms;
  }
}
</style>
