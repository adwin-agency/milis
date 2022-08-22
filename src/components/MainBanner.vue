<template>
  <div class="main-banner">
    <Swiper
      class="main-banner__slider"
      :options="swiperOptions"
    >
      <SwiperSlide class="main-banner__slide">
        <div class="main-banner__item main-banner__item_1">
          <picture class="main-banner__picture">
            <source
              :media="`(min-width: ${$breakpoints.xl}px)`"
              srcset="/assets/img/main-wash-xl.png"
            >
            <source
              :media="`(min-width: ${$breakpoints.lg}px)`"
              srcset="/assets/img/main-wash-lg.png"
            >
            <img
              class="main-banner__img"
              src="/assets/img/main-wash.png"
            >
          </picture>
          <div class="main-banner__content">
            <p class="main-banner__title">
              Дарим подарки!
              <Icon
                class="main-banner__icon"
                name="leaf-double-1"
              />
            </p>
            <p class="main-banner__desc">Каменная мойка <b>в{{'\xa0'}}подарок</b> к каждой кухне</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide class="main-banner__slide">
        <div class="main-banner__item main-banner__item_2">
          <picture class="main-banner__picture">
            <source
              :media="`(min-width: ${$breakpoints.xl}px)`"
              srcset="/assets/img/main-discount-xl.png"
            >
            <source
              :media="`(min-width: ${$breakpoints.lg}px)`"
              srcset="/assets/img/main-discount-lg.png"
            >
            <img
              class="main-banner__img"
              src="/assets/img/main-discount.png"
            >
          </picture>
          <div class="main-banner__content">
            <p class="main-banner__title">
              Скидка на все кухни
              <span class="main-banner__discount">
                -47%
                <Icon
                  class="main-banner__icon"
                  name="leaf-double-2"
                />
              </span>
            </p>
            <p class="main-banner__desc">Акция действует до 23 августа</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide class="main-banner__slide">
        <div class="main-banner__item main-banner__item_3">
          <picture class="main-banner__picture">
            <source
              :media="`(min-width: ${$breakpoints.xl}px)`"
              srcset="/assets/img/main-factory-xl.png"
            >
            <source
              :media="`(min-width: ${$breakpoints.lg}px)`"
              srcset="/assets/img/main-factory-lg.png"
            >
            <img
              class="main-banner__img"
              src="/assets/img/main-factory.png"
            >
          </picture>
          <div class="main-banner__content">
            <p class="main-banner__title">Мебельная фабрика Milis</p>
            <ul class="main-banner__list">
              <li class="main-banner__list-item">
                <Icon
                  class="main-banner__icon"
                  name="leaf-double-3"
                />
                Производим кухни на заказ с 2015
              </li>
              <li class="main-banner__list-item">
                <Icon
                  class="main-banner__icon"
                  name="leaf-double-3"
                />
                Собственное производство без посредников
              </li>
            </ul>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script>
import { swiper as Swiper, swiperSlide as SwiperSlide } from 'vue-awesome-swiper'
import Icon from './base/Icon.vue'

export default {
  name: 'MainBanner',
  components: {
    Swiper,
    SwiperSlide,
    Icon
  },
  data() {
    return {
      swiperOptions: {
        spaceBetween: 20
      }
    }
  }
}
</script>

<style lang="scss">
.main-banner {
  $b: &;

  &__item {
    display: flex;
    align-items: center;
    position: relative;
    border-radius: 6px;
    height: 165px;
    overflow: hidden;

    &_1 {
      padding: 6px;
      padding-right: 86px;
      font-family: $font-secondary;
      text-align: center;
      color: $color-blue;
      background: linear-gradient(94.14deg, #abecd6 15.15%, #fbed96 96.12%);

      #{$b} {
        &__title {
          position: relative;
          margin: 0 auto;
          max-width: 190px;
          font-weight: 700;
          font-size: 30px;
          line-height: 90%;
          text-align: center;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          z-index: 1;
        }
        &__icon {
          display: inline;
          position: relative;
          top: -10px;
          left: 6px;
          margin-left: -34px;
          width: 34px;
          height: 28px;
          z-index: -1;
        }
        &__desc {
          margin: 8px auto 0;
          max-width: 150px;
          font-size: 12px;
          line-height: 110%;
        }
        &__img {
          position: absolute;
          top: 0;
          right: 0;
          width: 202px;
        }
      }
    }

    &_2 {
      padding: 10px 16px;
      font-family: $font-secondary;
      background: linear-gradient(90deg, #1e3c72 0%, #1e3c72 1%, #2a5298 100%);

      #{$b} {
        &__title {
          display: flex;
          align-items: flex-end;
          font-weight: 700;
          font-size: 32px;
          line-height: 90%;
          letter-spacing: -0.01em;
          color: #ffffff;
        }
        &__discount {
          position: relative;
          margin-left: -10px;
          margin-bottom: 10px;
          font-size: 58px;
          letter-spacing: -0.04em;
          z-index: 1;
        }
        &__icon {
          position: absolute;
          right: -16px;
          bottom: 0;
          width: 86px;
          height: 76px;
          z-index: -1;
        }
        &__desc {
          margin-top: 22px;
          font-weight: 500;
          font-size: 12px;
          line-height: 110%;
          color: $color-green;
        }
        &__img {
          position: absolute;
          top: 0;
          right: 0;
          width: auto;
          height: 100%;
        }
      }
    }

    &_3 {
      padding: 10px 16px;
      font-family: $font-secondary;
      color: $color-blue;
      background: linear-gradient(90deg, #cfd9df 0%, #e2ebf0 100%),
        radial-gradient(90.99% 75.14% at 77.33% 68.48%, #dde76a 0%, #13bb27 100%);

      #{$b} {
        &__title {
          max-width: 235px;
          font-weight: 700;
          font-size: 26px;
          line-height: 100%;
          letter-spacing: -0.01em;
        }
        &__list {
          margin-top: 16px;
          max-width: 150px;
        }
        &__list-item {
          margin-bottom: 10px;
          position: relative;
          padding-left: 24px;
          font-size: 11px;
          line-height: 110%;

          &:last-child {
            margin-bottom: 0;
          }
        }
        &__icon {
          position: absolute;
          left: 0;
          top: 0;
          width: 22px;
          height: 18px;
        }
        &__img {
          position: absolute;
          top: 0;
          right: 0;
          width: auto;
          height: 100%;
        }
      }
    }
  }

  &__content {
    position: relative;
    flex-shrink: 0;
    max-width: 100%;
  }

  &__picture {
    width: 0;
  }
}
</style>