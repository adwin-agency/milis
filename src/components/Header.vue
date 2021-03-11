<template>
  <header class="header">
    <RouterLink
      :to="{name: 'main'}"
      exact
      class="header__logo"
    >
      <img src="../assets/img/logo.svg" alt="Milis">
    </RouterLink>
    <div class="header__actions" v-if="!$mobile">
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
          <RouterLink class="header__link" :to="{name: 'about'}">Материалы</RouterLink>
        </div>
        <div class="header__nav-item">
          <RouterLink class="header__link" :to="{name: 'delivery'}">Доставка и монтаж</RouterLink>
        </div>
        <div class="header__nav-item">
          <RouterLink class="header__link" :to="{name: 'payment'}">Оплата</RouterLink>
        </div>
      </nav>
      <div class="header__contacts">
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
            :detection="cityDetection"
            @select="closeCityPopup"
          />
        </div>
        <a
          :href="`tel:${activeCity && activeCity.phone}`"
          class="header__phone"
        >
          <span class="header__phone-icon">
            <Icon name="phone"/>
          </span>
          {{activeCity && activeCity.phone}}
        </a>
      </div>
    </div>
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
    <button
      v-if="filters && $mobile"
      class="header__filters"
      type="button"
      @click="$emit('openFilters')"
    >
      <span class="header__filters-icon">
        <Icon name="filters" />
      </span>
      Фильтры
    </button>
  </header>
</template>

<script>
import Icon from './base/Icon'
// import ButtonAlt from './base/ButtonAlt'
import CityPopup from './CityPopup'
import Menu from './Menu'

export default {
  name: 'Header',
  components: {
    Icon,
    // ButtonAlt,
    CityPopup,
    Menu
  },
  props: {
    main: Boolean,
    info: Boolean,
    filters: Boolean
  },
  data() {
    return {
      activeMenu: false,
      activeCityPopup: false
    }
  },
  computed: {
    activeCity() {
      return this.$store.getters.activeCity
    },
    cityDetection() {
      return this.$store.state.cityDetection
    }
  },
  methods: {
    openMenu() {
      this.activeMenu = true
    },
    closeMenu() {
      this.activeMenu = false
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
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  font-family: $font-secondary;

  &__logo {
    flex-shrink: 0;
    width: 69px;
  }

  &__actions {
    padding: 14px;
  }

  &__nav {
    display: flex;
  }

  &__nav-item {
    position: relative;
    margin-right: 24px;
    font-size: 12px;
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
    transition: transform .3s ease;
  }

  &__menu {
    position: absolute;
    left: 0;
    top: 100%;
    width: 900px;
    box-shadow: 0px 0px 17px rgba(0, 0, 0, 0.25);
    opacity: 0;
    pointer-events: none;
    transition: opacity .3s ease;
    cursor: auto;
    z-index: 10;
  }

  &__contacts {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 20px;
  }

  &__city {
    position: relative;
    margin-right: 18px;
  }

  &__city-current {
    display: block;
    font-size: 10px;
    line-height: (12/10);
    text-decoration: underline;
    color: $color-gray;
  }

  &__city-popup {
    display: none;
    position: absolute;
    left: 50%;
    top: 100%;
    margin-top: 20px;
    width: 300px;
    transform: translateX(-34%);
    z-index: 5;

    &.is-active {
      display: block;
    }
  }

  &__phone {
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 14px;
    line-height: (17/14);
    text-decoration: underline;
    color: $color-blue;
  }

  &__phone-icon {
    width: 15px;
    height: 15px;
    margin-right: 4px;
    fill: $color-green;
  }

  &__filters {
    display: flex;
    align-items: center;
    margin-left: auto;
    font-weight: bold;
    font-size: 14px;
    line-height: (16/14);
    color: $color-blue;
  }

  &__filters-icon {
    margin-right: 10px;
    width: 18px;
    height: 12px;
  }

  @include media(md) {
    padding-top: 24px;
    
    &__logo {
      width: 80px;
    }
  }

  @include media(lg) {
    align-items: flex-start;
    padding-top: 28px;

    &__logo {
      width: 100px;
    }
  }

  @include media(xl) {
    padding-top: 43px;

    &__logo {
      width: 132px;
    }

    &__nav-item {
      margin-right: 46px;
      font-size: 14px;
      line-height: (17/14);
    }

    &__nav-arrow {
      width: 12px;
      height: 12px;
    }

    &__menu {
      width: 1207px;
    }

    &__city {
      margin-right: 50px;      
    }

    &__city-current {
      font-size: 12px;
      line-height: (15/12);
    }

    &__phone {
      font-size: 16px;
      line-height: (20/16);
    }

    &__phone-icon {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
