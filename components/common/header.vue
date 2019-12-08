<template lang='pug'>
.header(:class='{"header--dark": darkTheme}')
  .header__border
    nuxt-link.header__logo(to="/" v-html='lastName')
    .header__langs
      .header__lang(v-for='(lang, index) in locales' :key='index' v-html='lang.slice(0, 2)' @click='changeLang(lang)' :class='{"header__lang--active": lang === locale}')
    .header__menu(@click='toggleMenu()')
      .header__menu-button(v-if='!menuShow')
        span {{ menu.openText }}
      .header__menu-button(v-else)
        span {{ menu.closeText }}
      .header__menu-icon
        .header__menu-icon-item(:class='{"header__menu-icon-item--active": menuShow}')
    .header__menu-wrapper(:class='{"header__menu-wrapper--active": menuWrapper}')
      .header__menu-top(:class='{"header__menu-top--active": menuShow}')
        .header__menu-items
          a.header__menu-item(v-for='(item, index) in menu.items' :key='index' v-html='item.title' :href='item.href' @click='toggleMenu()')
      .header__menu-bottom(:class='{"header__menu-bottom--active": menuShow}')
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      menuShow: false,
      menuWrapper: false,
      backDark: false
    }
  },
  methods: {
    toggleMenu() {
      this.menuShow = !this.menuShow;
      if (this.menuShow) {
        if (this.darkTheme) {
          this.backDark = true
        }
        this.$store.commit('navigation/REMOVE_DARK_THEME')
        this.menuWrapper = true
      } else {
        if (this.backDark) {
          this.$store.commit('navigation/SET_DARK_THEME')
          this.backDark = false
        }

        let self = this
        setTimeout(function() { self.menuWrapper = false }, 400)
      }
    },
    changeLang(locale) {
      this.$store.commit('locale/SET_LANG', locale)
    }
  },
  computed: {
    ...mapState('locale', ['locales', 'locale']),
    ...mapState('author', ['lastName']),
    ...mapState('navigation', ['menu', 'darkTheme'])
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  padding: vw(60) vw(122) 0 vw(122);
  width: 100%;
  z-index: 999;

  @include mobile {
    padding: vmin(20) vmin(20) 0 vmin(20);
  }

  &__border {
    display: grid;
    grid-template-columns: vw(150) 1fr vw(150);
    grid-template-rows: auto;
    grid-column-gap: vw(50);
    grid-row-gap: 0px;

    padding-bottom: 20px;

    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    transition: border-color 500ms ease;

    width: 100%;

    @include mobile {
      grid-template-columns: 1fr 1fr;
      grid-column-gap: vmin(20);
    }
  }

  &__logo {
    display: block;
    font-family: $oswald;
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
    color: #FFFFFF;
    text-decoration: none;
    transition: color 500ms ease;

    @include mobile {
      font-size: vmin(24);
      line-height: vmin(36);
    }
  }

  &__langs {
    display: flex;
    justify-content: center;
    align-items: center;

    @include mobile {
      display: none;
    }
  }

  &__lang {
    position: relative;
    top: calc(((-1em / 1.5) + 0.7ex) / 2);

    display: block;
    font-family: $oswald;
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 27px;
    color: #ffffff66;
    cursor: pointer;
    transition: color 500ms ease;

    &:not(:last-child)::after {
      content: '\00a0|\00a0';
      color: #ffffff66;
    }

    &--active {
      color: #FFFFFF;
    }
  }

  &__menu {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    cursor: pointer;
    &-button {
      position: relative;

      margin: 0 vw(15) 0 0;
      font-family: $oswald;
      font-style: normal;
      font-weight: 300;
      font-size: 18px;
      line-height: 1;
      color: #FFFFFF;
      transition: color 500ms ease;

      @include mobile {
        font-size: vmin(18);
        line-height: vmin(27);
        margin: 0 vmin(15) 0 0;
      }

      span {
        position: relative;
        top: calc(((-1em / 1.5) + 0.7ex) / 2);
      }
    }
    &-icon {
      position: relative;
      width: vw(24);
      height: vw(21);

      @include mobile {
        width: vmin(24);
        height: vmin(24);
      }

      &-item {
        width: vw(24);
        height: 2px;
        background: #ffffff;
        position: absolute;
        top: calc(50% - 1px);
        transform-origin: center;
        transition: transform 150ms ease, background 500ms ease;

        @include mobile {
          width: vmin(24);
          height: 3px;
          top: calc(50% - 1.5px);
        }

        &::before {
          content: '';
          width: vw(24);
          height: 2px;
          background: #ffffff;
          position: absolute;
          top: vw(-10);
          transform-origin: center;
          transition: background 500ms ease;

          @include mobile {
            width: vmin(24);
            height: 3px;
            top: vmin(-10);
          }
        }

        &::after {
          content: '';
          width: vw(24);
          height: 2px;
          background: #ffffff;
          position: absolute;
          bottom: vw(-10);
          transform-origin: center;
          transition: background 500ms ease;

          @include mobile {
            width: vmin(24);
            height: 3px;
            bottom: vmin(-10);
          }
        }

        &--active {
          transform: rotate(45deg);

          &::before {
            transform: rotate(-90deg) translateX(vw(-10));
            @include mobile {
              transform: rotate(-90deg) translateX(vmin(-10));
            }
          }

          &::after {
            transform: rotate(-90deg) translateX(vw(10));
            @include mobile {
              transform: rotate(-90deg) translateX(vmin(10));
            }
          }
        }
      }
    }
    &-wrapper {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: -2;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr vh(270);
      grid-column-gap: 0px;
      grid-row-gap: 0px;
      visibility: hidden;

      &--active {
        visibility: visible;
      }
    }

    &-top {
      background: #E3572E;

      height: 0;
      transition: height 0.4s $bezier;

      &--active {
        height: 100%;
      }
    }
    &-bottom {
      background: #0D0D0D;

      align-self: flex-end;
      height: 0;
      transition: height 0.4s $bezier;

      &--active {
        height: 100%;
      }
    }
    &-items {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      padding: 0 0 vh(156);
    }
    &-item {
      font-family: $oswald;
      font-style: normal;
      font-weight: 500;
      font-size: vh(64);
      line-height: vh(110);
      text-align: center;
      color: #FFFFFF;
      transition: all 150ms ease;
      cursor: pointer;
      text-decoration: none;

      &:hover {
        letter-spacing: vw(12.8);
        transform: translateX(vw(6.4));
        text-decoration: none;
      }
    }
  }
}
</style>

<style lang="scss">
.header {
  &--dark {
    border-color: #0d0d0d33!important;
    background-color: #ffffff;
    transition: background-color 1s $bezier;

    .header {
      &__border {
        border-bottom: 1px solid rgba(13, 13, 13, 0.2);
      }

      &__logo {
        color: #0D0D0D;
      }
      &__lang {
        color: #999999;

        &:not(:last-child)::after {
          color: #0D0D0D;
        }

        &--active {
          color: #0D0D0D;
        }
      }
      &__menu {
        &-button {
          color: #0D0D0D;
        }
        &-icon {
          &-item {
            background: #0D0D0D;

            &::before {
              background: #0D0D0D;
            }

            &::after {
              background: #0D0D0D;
            }
          }
        }
      }
    }
  }
}
</style>
