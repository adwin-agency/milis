<template>
  <header class="header">
    <RouterLink
      :to="{name: 'catalog'}"
      exact
      class="header__logo"
    >
      <img src="../assets/img/logo-2.svg" alt="Milis">
    </RouterLink>
    <div
      v-if="$windowWidth >= $breakpoints.md"
      class="header__slogan"
    >
      <p class="header__note">Фабрика кухонь</p>
      <p class="header__decor">Кухня за 3 шага</p>
    </div>
    <template v-if="!$mobile">
      <nav class="header__nav">
        <div
          class="header__nav-item"
          :class="{'is-menu': activeMenu}"
          @mouseenter="openMenu"
          @mouseleave="closeMenu"
        >
          <RouterLink
            class="header__link"
            :to="{name: 'catalog'}"
            @click.native="closeMenu"
          >
            <span class="header__nav-arrow">
              <Icon name="angle-right"/>
            </span>
            Кухни
          </RouterLink>
          <Menu
            class="header__menu"
            @closeMenu="closeMenu"
          />
        </div>
        <div class="header__nav-item">
          <RouterLink class="header__link" :to="{name: 'about'}">О нас</RouterLink>
        </div>
        <div class="header__nav-item">
          <RouterLink class="header__link" :to="{name: 'delivery'}">Доставка и монтаж</RouterLink>
        </div>
        <div class="header__nav-item">
          <RouterLink class="header__link" :to="{name: 'payment'}">Оплата</RouterLink>
        </div>
        <div class="header__nav-item">
          <RouterLink class="header__link" :to="{name: 'care'}">{{ careLink }}</RouterLink>
        </div>
        <div class="header__nav-item">
          <RouterLink class="header__link" :to="{name: 'contacts'}">Контакты</RouterLink>
        </div>
      </nav>
      <div class="header__contacts">
        <a
          :href="`tel:${activeCity && activeCity.phone}`"
          class="header__phone"
        >
          <span class="header__phone-icon">
            <Icon name="phone"/>
          </span>
          {{activeCity && activeCity.phone}}
        </a>
        <div class="header__city">
          <button
            class="header__city-current"
            type="button"
            @click="openCityPopup"
          >
            {{activeCity && activeCity.name}}
          </button>
          <CityPopup
            class="header__city-popup"
            :class="{'is-active': cityDetection || activeCityPopup}"
            arrow="right"
            :detection="cityDetection"
            @select="closeCityPopup"
          />
        </div>
      </div>
    </template>
    <!-- <RouterLink
      :to="{name: 'blog'}"
      v-slot="{ href, navigate }"
      v-if="main && $mobile"
      custom
    >
      <ButtonAlt
        class="header__btn"
        :href="href"
        text="Читать блог"
        :shadow="info"
        @click.native="navigate"
      />
    </RouterLink> -->
    <!-- <button
      v-if="filters"
      class="header__filters"
      type="button"
      @click="$emit('openFilters')"
    >
      <span
        class="header__filters-icon"
        :class="{'is-active': selectedFilters}"
      >
        <Icon name="filters" />
      </span>
      Фильтры
    </button> -->
    <a
      :href="`tel:${activeCity && activeCity.phone}`"
      class="header__call-btn"
    >
      <!-- <Icon name="call" /> -->
      {{activeCity && activeCity.phone}}
    </a>
    <button
      class="header__menu-btn"
      type="button"
      @click="openMobileMenu"
    >
      <Icon name="menu" />
    </button>
    <MobileMenu
      v-if="$mobile"
      class="header__mobile-menu"
      :class="{'is-active': activeMobileMenu}"
      @close="closeMobileMenu"
    />
    <CityPopup
      v-if="$mobile && cityDetection"
      class="header__city-popup is-active"
      fixed
      :detection="true"
      @select="closeCityPopup"
    />
  </header>
</template>

<script>
import Icon from './base/Icon'
// import ButtonAlt from './base/ButtonAlt'
import CityPopup from './CityPopup'
import Menu from './Menu'
import MobileMenu from '@/components/MobileMenu'

export default {
  name: 'Header',
  components: {
    Icon,
    // ButtonAlt,
    CityPopup,
    Menu,
    MobileMenu
  },
  props: {
    main: Boolean,
    info: Boolean,
    filters: Boolean
  },
  data() {
    return {
      activeMenu: false,
      activeMobileMenu: false,
      activeCityPopup: false
    }
  },
  computed: {
    activeCity() {
      return this.$store.getters.activeCity
    },
    cityDetection() {
      return this.$store.state.cityDetection
    },
    selectedFilters() {
      return this.$route.params.category
    },
    careLink() {
      return (this.$windowWidth < 1300 || this.$windowWidth >= 1600 && this.$windowWidth < 1700) ? 'ЦЗК' : 'Центр заботы о клиентах'
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
  },
  destroyed() {
    this.closeMobileMenu()
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      if (!this.$mobile && this.activeMobileMenu) {
        this.closeMobileMenu()
      }
    },

    openMenu() {
      this.activeMenu = true
    },
    closeMenu() {
      this.activeMenu = false
    },

    openMobileMenu() {
      this.activeMobileMenu = true
      document.body.classList.add('is-mobile-menu')
      document.body.style.overflow = 'hidden'
    },
    closeMobileMenu() {
      this.activeMobileMenu = false

      const bodyClassList = document.body.classList

      bodyClassList.remove('is-mobile-menu')

      if (!bodyClassList.contains('is-mobile-filters') && !bodyClassList.contains('is-modal')) {
        document.body.style.overflow = ''
      }
    },

    openCityPopup() {
      this.activeCityPopup = true
    },
    closeCityPopup() {
      this.activeCityPopup = false
    }
  }
}
</script>

<style lang="scss">
.header {
  $b: &;

  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  height: $header-height;
  padding: 0 $container-padding;
  font-family: $font-secondary;
  background-color: $color-white;
  box-shadow: 0px 7px 9px rgba(207, 207, 207, 0.25);
  z-index: 20;

  &__logo {
    flex-shrink: 0;
    margin-right: auto;
    width: 69px;
  }

  &__actions {
    padding: 14px;
  }

  &__nav {
    display: flex;
    margin-right: auto;
  }

  &__nav-item {
    position: relative;
    margin-right: 22px;
    font-size: 14px;
    line-height: (15/12);
    color: $color-blue;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    &.is-menu {
      #{$b} {
        &__nav-arrow {
          transform: rotate(90deg);
        }

        &__menu {
          opacity: 1;
          pointer-events: all;
        }
      }
    }
  }

  &__link {
    display: flex;

    &.is-active {
      font-weight: bold;
    }
  }

  &__nav-arrow {
    width: 8px;
    height: 8px;
    margin-top: 2px;
    margin-right: 3px;
    fill: $color-blue;
    transition: transform .3s ease;
  }

  &__menu {
    position: absolute;
    left: -120px;
    top: 100%;
    box-shadow: 0px 0px 17px rgba(0, 0, 0, 0.25);
    opacity: 0;
    pointer-events: none;
    transition: opacity .3s ease;
    cursor: auto;
    z-index: 10;
  }

  &__contacts {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  &__city {
    margin-top: 4px;
    position: relative;
  }

  &__city-current {
    font-size: 12px;
    line-height: (12/10);
    text-decoration: underline;
    color: $color-gray;
  }

  &__city-popup {
    display: none;
    position: absolute;
    right: 10px;
    top: 100%;
    margin-top: 20px;
    width: 300px;

    &.is-active {
      display: block;
    }
  }

  &__phone {
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 16px;
    line-height: (17/14);
    text-decoration: underline;
    white-space: nowrap;
    color: $color-blue;
  }

  &__phone-icon {
    width: 20px;
    height: 20px;
    margin-right: 4px;
    fill: $color-green;
  }

  &__filters {
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 14px;
    line-height: (16/14);
    color: $color-blue;
  }

  &__filters-icon {
    position: relative;
    margin-top: -3px;
    margin-right: 10px;
    width: 18px;
    height: 12px;

    &.is-active {
      &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: $color-green;
      }
    }
  }

  &__call-btn {
    flex-shrink: 0;
    margin-left: auto;
    // width: 22px;
    // height: 22px;
    white-space: nowrap;
    font-weight: bold;
    color: $color-blue;
  }

  &__menu-btn {
    flex-shrink: 0;
    margin-left: 24px;
    width: 24px;
    height: 24px;
    fill: $color-blue;
  }

  &__mobile-menu {
    position: fixed;
    left: 100%;
    top: 0;
    width: 100%;
    height: 100%;
    transition: transform .3s ease;

    &.is-active {
      transform: translateX(-100%);
    }
  }

  @include media(xs) {
    &__call-btn {
      margin-left: 56px;
    }

    &__menu-btn {
      margin-left: 38px;
    }
  }

  @include media(md) {
    height: $header-height-md;
    padding: 0 $container-padding-md;
    
    &__logo {
      width: 80px;
      margin-right: 20px;
    }

    &__slogan {
      margin-right: auto;
    }

    &__note {
      font-family: $font-primary;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      letter-spacing: 0.02em;
      text-transform: uppercase;
      color: $color-blue;
    }

    &__decor {
      margin-left: 48px;
      font-family: $font-decorative;
      font-size: 30px;
      line-height: 30px;
      letter-spacing: -0.03em;
      color: $color-blue;
    }
  }

  @include media(lg) {
    &__logo {
      width: 100px;
    }

    &__call-btn,
    &__menu-btn {
      display: none;
    }
  }

  @include media(xl) {
    height: $header-height-xl;
    padding: 0 $container-padding-xl;

    &__logo {
      width: 132px;
    }

    &__nav-item {
      margin-right: 54px;
      font-size: 16px;
      line-height: (20/16);
    }

    &__nav-arrow {
      width: 12px;
      height: 12px;
    }

    &__menu {
      left: 0;
    }

    &__city {
      margin-top: 12px;
    }

    &__city-current {
      font-size: 16px;
      line-height: (20/16);
    }

    &__phone {
      font-size: 20px;
      line-height: (24/20);
    }

    &__phone-icon {
      width: 27px;
      height: 27px;
    }
  }
}
</style>
