<template>
  <div class="mobile-bar">
    <MobileMenu
      class="mobile-bar__menu"
      :class="{'is-active': activeMenu}"
      @closeMenu="toggleMenu"
    />
    <div class="mobile-bar__wrapper">
      <div class="mobile-bar__items">
        <div class="mobile-bar__item-group">
          <RouterLink 
            class="mobile-bar__item mobile-bar__item_first"
            :to="{name: 'main'}"
            exact
          >
            <Icon
              class="mobile-bar__icon"
              name="home"
            />
            Главная
          </RouterLink>
          <RouterLink 
            class="mobile-bar__item"
            :to="{name: 'about'}"
          >
            <Icon
              class="mobile-bar__icon"
              name="materials"
            />
            О компании
          </RouterLink>
        </div>        
        <RouterLink 
          class="mobile-bar__item"
          :to="{name: 'catalog'}"
        >
          <span class="mobile-bar__round">
            <Icon
              class="mobile-bar__round-icon"
              name="logo-m"  
            />
          </span>
          Каталог
        </RouterLink>
        <div class="mobile-bar__item-group">
          <a
            class="mobile-bar__item"
            :href="`tel:${activeCity && activeCity.phone}`"
          >
            <Icon
              class="mobile-bar__icon"
              name="phone"
            />
            Позвонить
          </a>
          <button 
            class="mobile-bar__item mobile-bar__item_last"
            type="button"
            @click="toggleMenu"
          >
            <span class="mobile-bar__menu-icon" :class="{'is-active': activeMenu}">
              <span></span>
            </span>
            Меню
          </button>
        </div>
      </div>
    </div>       
  </div>
</template>

<script>
import Icon from './base/Icon'
import MobileMenu from './MobileMenu'

export default {
  name: 'MobileBar',
  components: {
    Icon,
    MobileMenu
  },
  data() {
    return {
      activeMenu: false
    }
  },
  computed: {
    activeCity() {
      return this.$store.getters.activeCity
    }
  },
  methods: {
    toggleMenu() {
      this.activeMenu = !this.activeMenu
    }
  }
}
</script>

<style lang="scss">
.mobile-bar {
  &__wrapper {
    display: flex;
    align-items: center;
    position: relative;
    height: $mobile-bar-height;
    padding: 10px $container-padding;
    background-color: $color-white;
    box-shadow: 1px 0px 17px rgba(0, 0, 0, 0.15);
  }

  &__items {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 100%;
  }

  &__item-group {
    display: flex;
    justify-content: space-between;
    flex: 1;
  }

  &__item {
    margin: 0 auto;
    text-align: center;
    font-size: 10px;
    line-height: (12/10);
    background-color: transparent;
    cursor: pointer;

    &_first {
      margin: 0;
    }

    &_last {
      margin: 0;
    }
  }

  &__icon {
    width: 30px;
    height: 30px;
    margin: 0 auto;
    fill: currentColor;
  }

  &__round {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: -25px auto 15px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: $color-blue;
    box-shadow: 0px 10px 30px -2px rgba(48, 56, 100, 0.5);
  }

  &__round-icon {
    width: 27px;
    height: 21px;
  }

  &__menu-icon {
    display: block;
    position: relative;
    width: 24px;
    height: 30px;
    margin: 0 auto;

    span {
      position: absolute;
      left: 0;
      top: 50%;
      margin-top: -1px;
      width: 100%;
      height: 2px;
      background-color: $color-black-gray;
      transition: transform .15s ease;

      &::before,
      &::after {
        content: "";
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: inherit;
      }

      &::before {
        top: -6px;
        transition: top .15s ease .15s;
      }

      &::after {
        bottom: -6px;
        transition: bottom .15s ease .15s, transform .15s ease;
      }
    }

    &.is-active {
      span {
        transform: rotate(45deg);
        transition: transform .15s ease .15s;

        &::before {
          top: 0;
          transition: top .15s ease;
        }

        &::after {
          bottom: 0;
          transform: rotate(-90deg);
          transition: bottom .15s ease, transform .15s ease .15s;
        }
      }
    }
  }

  &__menu {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    transform: translateX(100%);
    transition: transform .3s ease;

    &.is-active {
      transform: translateX(0);
    }
  }

  @include media(md) {
    &__wrapper {
      height: $mobile-bar-height-md;
    }

    &__items {
      padding: 0 80px;
    }

    &__icon {
      margin-bottom: 5px;
    }

    &__round {
      margin-bottom: 20px;
    }
  }
}
</style>
