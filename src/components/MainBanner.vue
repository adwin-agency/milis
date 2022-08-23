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
                -47<sup>%</sup>
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
      <div
        class="swiper-pagination"
        slot="pagination"
      ></div>
    </Swiper>
  </div>
</template>

<script>
import {
  swiper as Swiper,
  swiperSlide as SwiperSlide
} from 'vue-awesome-swiper'
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
        spaceBetween: 20,
        pagination: {
          el: '.swiper-pagination'
        },
        autoplay: {
          delay: 5000
        },
        speed: 1000
      }
    }
  }
}
</script>

<style lang="scss">
.main-banner {
  $b: &;

  .swiper-pagination-bullets {
    bottom: 6px;
  }
  .swiper-pagination-bullet {
    width: 20px;
    height: 4px;
    margin: 0 5px !important;
    border-radius: 100px;
    opacity: 1;
    background: $color-gray-8;
    transition: background 0.3s ease;
  }
  .swiper-pagination-bullet-active {
    background: $color-blue;
  }

  &__item {
    display: flex;
    align-items: center;
    position: relative;
    border-radius: 6px;
    height: 165px;
    padding-bottom: 10px;
    overflow: hidden;

    &_1 {
      justify-content: center;
      padding-left: 6px;
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
          margin-top: -28px;
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
          right: 0;
          bottom: 0;
          width: 202px;
        }
      }
    }

    &_2 {
      justify-content: center;
      padding-left: 16px;
      padding-right: 16px;
      font-family: $font-secondary;
      background: linear-gradient(90deg, #1e3c72 0%, #1e3c72 1%, #2a5298 100%);

      #{$b} {
        &__title {
          display: flex;
          align-items: flex-end;
          max-width: 330px;
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

          sup {
            position: relative;
            top: 6px;
            left: 2px;
            font-size: 38px;
          }
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
      justify-content: center;
      padding-left: 16px;
      padding-right: 60px;
      font-family: $font-secondary;
      color: $color-blue;
      background: linear-gradient(90deg, #cfd9df 0%, #e2ebf0 100%),
        radial-gradient(
          90.99% 75.14% at 77.33% 68.48%,
          #dde76a 0%,
          #13bb27 100%
        );

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

  @include media(sm) {
    &__item {
      height: 200px;

      &_1 {
        padding-right: 140px;

        #{$b} {
          &__title {
            max-width: 220px;
            font-size: 36px;
          }
          &__desc {
            margin: 16px auto 0;
            max-width: 230px;
            font-size: 16px;
          }
          &__img {
            width: 232px;
          }
        }
      }

      &_2 {
        #{$b} {
          &__title {
            align-items: center;
            max-width: 380px;
            font-size: 38px;
          }
          &__discount {
            margin-bottom: 0;
            font-size: 64px;
          }
          &__desc {
            font-size: 16px;
          }
        }
      }

      &_3 {
        padding-right: 150px;

        #{$b} {
          &__title {
            max-width: 260px;
            font-size: 32px;
          }
          &__list {
            max-width: 190px;
          }
          &__list-item {
            font-size: 15px;
          }
        }
      }
    }
  }

  @include media(md) {
    &__item {
      height: 250px;

      &_1 {
        padding-right: 220px;

        #{$b} {
          &__title {
            max-width: 320px;
            font-size: 50px;
          }
          &__icon {
            margin-left: -50px;
            margin-top: -44px;
            width: 50px;
            height: 44px;
          }
          &__desc {
            margin: 24px auto 0;
            max-width: 320px;
            font-size: 22px;
          }
          &__img {
            width: 330px;
          }
        }
      }

      &_2 {
        padding-right: 100px;

        #{$b} {
          &__title {
            max-width: 500px;
            font-size: 52px;
          }
          &__discount {
            font-size: 78px;

            sup {
              font-size: 48px;
            }
          }
          &__desc {
            margin-top: 32px;
            font-size: 20px;
          }
        }
      }

      &_3 {
        #{$b} {
          &__title {
            max-width: 400px;
            font-size: 48px;
          }
          &__list {
            max-width: 320px;
          }
          &__list-item {
            padding-left: 30px;
            font-size: 18px;
          }
        }
      }
    }
  }

  @include media(lg) {
    .swiper-pagination-bullets {
      bottom: 16px;
    }
    .swiper-pagination-bullet {
      width: 50px;
      height: 6px;
      margin: 0 8px !important;
    }

    &__item {
      height: 450px;

      &_1 {
        padding: 20px 30px;
        padding-right: 520px;

        #{$b} {
          &__title {
            max-width: 610px;
            font-size: 90px;
          }
          &__icon {
            top: -30px;
            left: 50px;
            margin-left: -106px;
            margin-top: -90px;
            width: 106px;
            height: 90px;
          }
          &__desc {
            margin: 38px auto 0;
            max-width: 460px;
            font-size: 30px;
          }
          &__img {
            width: 920px;
          }
        }
      }

      &_2 {
        #{$b} {
          &__title {
            max-width: 900px;
            font-size: 80px;
          }
          &__discount {
            font-size: 190px;

            sup {
              font-size: 110px;
            }
          }
          &__icon {
            right: -76px;
            bottom: -20px;
            width: 250px;
            height: 220px;
          }
          &__desc {
            margin-top: 40px;
            font-size: 30px;
          }
        }
      }

      &_3 {
        padding-left: 50px;
        padding-right: 500px;

        #{$b} {
          &__title {
            max-width: 750px;
            font-size: 80px;
          }
          &__list {
            margin-top: 50px;
            max-width: none;
          }
          &__list-item {
            margin-bottom: 36px;
            padding-left: 72px;
            font-size: 21px;
          }
          &__icon {
            top: -12px;
            width: 52px;
            height: 44px;
          }
        }
      }
    }
  }

  @include media(xl) {
    &__item {
      &_1 {
        padding-right: 750px;

        #{$b} {
          &__title {
            max-width: 730px;
            font-size: 110px;
          }
          &__icon {
            top: -50px;
            left: 70px;
            margin-left: -144px;
            margin-top: -122px;
            width: 144px;
            height: 122px;
          }
          &__desc {
            max-width: 600px;
            font-size: 40px;
          }
          &__img {
            width: auto;
            height: 100%;
          }
        }
      }

      &_2 {
        #{$b} {
          &__title {
            max-width: 1150px;
            font-size: 100px;
          }
          &__discount {
            font-size: 220px;

            sup {
              font-size: 130px;
            }
          }
          &__icon {
            right: -96px;
            bottom: -130px;
            width: 412px;
            height: 360px;
          }
          &__desc {
            font-size: 40px;
          }
        }
      }

      &_3 {
        padding-left: 70px;
        padding-right: 700px;

        #{$b} {
          &__title {
            font-size: 90px;
          }
          &__list-item {
            font-size: 30px;
          }
          &__icon {
            top: -6px;
          }
        }
      }
    }
  }
}
</style>