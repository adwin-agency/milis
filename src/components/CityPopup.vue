<template>
  <div class="city-popup" :class="{'is-fixed': fixed}">
    <span
      v-if="arrow"
      class="city-popup__arrow"
      :class="{'city-popup__arrow_r': arrow === 'right'}"
    ></span>
    <p class="city-popup__title">{{title}}</p>
    <div
      v-if="detection"
      class="city-popup__btns"
    >
      <button
        class="city-popup__btn"
        type="button"
        @click="selectCity('spb')"
      >
        Да
      </button>
      <button
        class="city-popup__btn city-popup__btn_bordered"
        type="button"
        @click="closeDetection"
      >
        Нет
      </button>
    </div>
    <div
      v-else
      class="city-popup__btns"
    >
      <button
        v-for="(city, index) in cities"
        :key="index"
        class="city-popup__btn city-popup__btn_sm city-popup__btn_blue"
        type="button"
        @click="selectCity(city.code)"
      >
        {{city.name}}
      </button>
    </div>
    <button
      class="city-popup__close"
      type="button"
      @click="onClose"
    >
      <Icon name="close" />
    </button>
  </div>
</template>

<script>
import Icon from '@/components/base/Icon'

export default {
  name: 'CityPopup',
  components: {
    Icon
  },
  props: {
    arrow: String,
    fixed: Boolean,
    detection: Boolean
  },
  computed: {
    cities() {
      return this.$store.state.cities
    },
    activeCity() {
      return this.$store.getters.activeCity
    },
    title() {
      return this.detection ? `Ваш город ${this.activeCity && this.activeCity.name}?` : 'Выберите город'
    }
  },
  methods: {
    closeDetection() {
      this.detection = false
    },

    setCookie(name, value, days) {
      document.cookie = `${name}=${value}; max-age=${days * 24 * 60 * 60}; path=/`
    },

    selectCity(city) {
      this.setCookie('city', city, 30)
      this.$store.commit('setActiveCityCode', city)
      this.$store.commit('setCityDetection', false)
      this.$emit('select')
    },

    onClose() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.city-popup {
  $b: &;

  position: relative;
  padding: 16px 20px;
  font-family: $font-primary;
  background: #EDEDED;
  box-shadow: 0px 21px 14px -19px rgba(95, 159, 255, 0.25);

  &.is-fixed {
    text-align: center;

    #{$b} {
      &__close {
        display: none;
      }

      &__btns {
        justify-content: center;
      }
    }
  }

  &__arrow {
    content: "";
    position: absolute;
    left: 50px;
    bottom: 100%;
    border: 11px solid transparent;
    border-bottom-color: #EDEDED;
    pointer-events: none;

    &_r {
      left: auto;
      right: 30px;
    }
  }

  &__title {
    font-weight: bold;
    font-size: 14px;
    line-height: (17/14);
    color: $color-blue;
  }

  &__btns {
    display: flex;
    flex-wrap: wrap;
    margin-top: 12px;
    margin-bottom: -10px;
  }

  &__btn {
    min-width: 74px;
    margin-right: 20px;
    margin-bottom: 10px;
    padding: 6px 15px;
    border-radius: 100px;
    font-size: 14px;
    line-height: 17px;
    color: $color-green;
    background-color: #fff;
    transition: color .3s ease, background-color .3s ease;

    &:hover {
      color: #fff;
      background-color: $color-green;
    }

    &_sm {
      font-size: 12px;
    }

    &_bordered {
      background-color: transparent;
      box-shadow: inset 0 0 0 1px #fff;

      &:hover {
        color: $color-green;
        background-color: #fff;
      }
    }

    &_blue {
      color: $color-blue;

      &:hover {
        color: #fff;
        background-color: $color-blue;
      }
    }
  }

  &__close {
    position: absolute;
    top: 12px;
    right: 15px;
    width: 18px;
    height: 18px;
    fill: $color-blue;
  }

  @include media(lg) {
    text-align: center;

    &::before {
      left: 83px;
    }

    &__btns {
      justify-content: center;
      margin-top: 10px;
      margin-right: -12px;
    }

    &__btn {
      margin-right: 12px;
    }

    &__close {
      display: none;
    }
  }
}
</style>
