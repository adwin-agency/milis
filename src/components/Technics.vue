<template>
  <div class="technics">
    <div class="row">
      <div class="col col-12 col-lg-6">
        <Swiper
          :key="info.id"
          :options="swiperOptions"
          ref="mySwiper"
          class="technics__slider"
        >
          <SwiperSlide
            v-for="(picture, index) in info.pictures"
            :key="index"
            class="technics__image"
            :class="{'anim-img js-anim': index === 0}"
            v-anim="index === 0"
          >
            <img
              v-if="index === 0"
             :src="$basepath + ($mobile ? picture.tablet.path : picture.desktop.path)"
             alt=""
            >
            <img
              v-else
              class="swiper-lazy"
              :data-src="$basepath + ($mobile ? picture.tablet.path : picture.desktop.path)"
              alt=""
            >
          </SwiperSlide>
          <ButtonNav
            prev
            alt
            class="technics__prev"
            slot="button-prev"  
          />
          <ButtonNav
            next
            alt
            class="technics__next"
            slot="button-next"  
          />
        </Swiper>
      </div>
      <div class="col col-12 col-lg-6 technics__content-col">
        <div class="row">
          <div class="col col-12 col-xl-10">
            <Header class="slide-down js-anim" v-anim="true" />
          </div>
        </div>
        <div class="technics__wrapper fade-bounce-right js-anim" v-anim="true">
          <FilterMenu
            class="technics__menu"
            filterType="technics"
          />
          <h1 class="heading technics__heading">{{info.name}}</h1>
          <p class="technics__text">{{info.text}}</p>
          <!-- <div class="technics__cards" v-if="inside && $windowWidth >= $breakpoints.xl">
            <div class="row">
              <div class="col col-6">
                <TechnicsCard
                  image="technics-card-03.png"
                  title="Варочная панель SIMFER H 60 D 17"
                  price="27 500"
                  class="technics__card"
                />
              </div>
              <div class="col col-6">
                <TechnicsCard
                  image="technics-card-03.png"
                  title="Варочная панель SIMFER H 60 D 17"
                  price="27 500"
                  class="technics__card"
                />
              </div>
            </div>
          </div> -->
          <template v-if="$windowWidth >= $breakpoints.xl">
            <Steps class="technics__steps" leaf="bottom" />
            <p class="technics__decor">Всё просто!</p>
          </template>
        </div>
      </div>
      <template v-if="$windowWidth >= $breakpoints.md && $windowWidth < $breakpoints.xl">
        <div class="col col-12 col-lg-9">
          <Steps class="technics__steps fade-bounce-right js-anim" v-anim="true" leaf="bottom" />
        </div>
        <div class="col col-12 col-lg-3">
          <p class="technics__decor fade-slide-down js-anim" v-anim="true">Всё просто!</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import FilterMenu from './base/FilterMenu'
import ButtonNav from './base/ButtonNav'
import Header from './Header'
import Steps from './Steps'
// import TechnicsCard from './TechnicsCard'
import { swiper as Swiper, swiperSlide as SwiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'Technics',
  components: {
    FilterMenu,
    ButtonNav,
    Header,
    Steps,
    // TechnicsCard,
    Swiper,
    SwiperSlide
  },
  props: {
    info: Object
  },
  data: () => ({
    swiperOptions: {
      resistanceRatio: 0,
      navigation: {
        prevEl: '.technics__prev',
        nextEl: '.technics__next'
      },
      lazy: {
        loadPrevNext: true
      },
      touchEventsTarget: 'wrapper'
    }
  }),
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  }
}
</script>

<style lang="scss">
.technics {
  &__slider {
    margin: 0 (-$container-padding);
  }

  &__image {
    position: relative;
    padding-top: 75%;

    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__prev,
  &__next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
  }

  &__prev {
    left: 2px;
  }

  &__next {
    right: 2px;
  }

  &__menu {
    margin: 40px (-$container-padding) 0;
  }

  &__heading {
    margin-top: 24px;
  }

  &__text {
    margin-top: 18px;
    font-size: 16px;
    line-height: (32/16);
  }

  &__cards {
    margin-top: 50px;
    margin-bottom: 80px;
  }

  &__card {
    margin-right: 30px;
  }

  @include media(md) {
    &__slider {
      margin: 0 (-$container-padding-md);
    }

    &__image {
      padding-top: 59.7%;
    }

    &__prev {
      left: 10px;
    }

    &__next {
      right: 10px;
    }

    &__heading {
      margin-top: 38px;
    }

    &__text {
      margin-top: 20px;
      max-width: 580px;
    }

    &__steps {
      margin: 40px (-$container-padding-md) 0;
    }

    &__decor {
      margin-top: 10px;
      font-family: $font-decorative;
      font-size: 100px;
      color: $color-gray-6;
    }
  }

  @include media(lg) {
    &__content-col {
      order: -1;
    }

    &__slider {
      margin-left: 0;
    }

    &__image {
      padding-top: 75%;
    }

    &__menu {
      margin: 36px 0 0;
    }

    &__heading {
      margin-top: 16px;
    }

    &__text {
      max-width: 470px;
      font-size: 14px;
      line-height: (28/14);
    }

    &__steps {
      margin-top: 30px;
      margin-right: 20px;
    }

    &__decor {
      margin-top: 168px;
      margin-left: 8px;
      font-size: 80px;
    }
  }

  @include media(xl) {
    &__slider {
      margin-right: -$container-padding-xl;
    }

    &__menu {
      margin-top: 58px;
    }

    &__text {
      max-width: 570px;
      font-size: 16px;
      line-height: (32/16);
    }

    &__steps {
      margin-left: -$container-padding-xl;
      margin-top: 40px;
      margin-right: 80px;
    }

    &__decor {
      margin-top: 0;
      margin-left: -12px;
      font-size: 100px;
    }
  }
}
</style>
