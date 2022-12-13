<template>
  <div class="main-products">
    <h2 class="main-products__heading">Топ 3 кухни Milis</h2>
    <Swiper
      :options="swiperOptions"
      class="main-products__slider"
    >
      <SwiperSlide
        v-for="(kitchen, index) in products"
        :key="index"
        class="main-products__item"
      >
        <CatalogCard
          :kitchen="kitchen"
          main
          v-anim="{delay: index % 4 * 100}"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script>
import CatalogCard from './CatalogCard'
import {
  swiper as Swiper,
  swiperSlide as SwiperSlide
} from 'vue-awesome-swiper'

export default {
  name: 'MainProducts',
  components: {
    CatalogCard,
    Swiper,
    SwiperSlide
  },
  props: {
    products: Array
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 'auto',
        spaceBetween: 10,
        resistanceRatio: 0,
        breakpointsInverse: true,
        breakpoints: {
          [this.$breakpoints.md]: {
            spaceBetween: 20,
            freeMode: true
          },
          [this.$breakpoints.lg]: {
            slidesPerView: 3,
            spaceBetween: 20
          },
          [this.$breakpoints.xl]: {
            slidesPerView: 3,
            spaceBetween: 40
          },
        }
      }
    }
  }
}
</script>

<style lang="scss">
.main-products {
  &__heading {
    font-size: 20px;
    line-height: 1.1;
  }

  &__slider {
    margin-top: 14px;
    padding: 0 5px;
    overflow: visible;
  }

  @include media(md) {
    &__item {
      width: 400px;
    }
  }

  @include media(lg) {
    &__heading {
      font-size: 40px;
    }

    &__slider {
      margin-top: 32px;
    }

    &__item {
      width: auto;
    }
  }

  @include media(xl) {
    &__slider {
      margin-top: 72px;
    }
  }
}
</style>
