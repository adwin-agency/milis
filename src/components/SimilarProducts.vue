<template>
  <div class="similar-products">
    <h2 class="similar-products__heading">Похожие кухни в{{'\xa0'}}стиле «{{kitchenStyle}}»</h2>
    <Swiper
      :options="swiperOptions"
      ref="mySwiper"
      class="similar-products__slider"
    >
      <SwiperSlide
        v-for="(kitchen, index) in similars"
        :key="index"
        class="similar-products__item"
      >
        <CatalogCard
          :kitchen="kitchen"
          similar
          v-anim="{delay: index % 4 * 100}"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script>
import CatalogCard from './CatalogCard'
import { swiper as Swiper, swiperSlide as SwiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'SimilarProducts',
  components: {
    CatalogCard,
    Swiper,
    SwiperSlide
  },
  props: {
    kitchenStyle: String,
    similars: Array
  },
  data() {
    return {
      swiperOptions: {
        spaceBetween: 20,
        slidesPerView: 'auto',
        freeMode: true,
        freeModeMomentum: false,
        resistanceRatio: 0,
        breakpointsInverse: true,
        breakpoints: {
          [this.$breakpoints.md]: {
            spaceBetween: 50
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
.similar-products {
  &__heading {
    font-size: 34px;
    line-height: (41/34);
  }

  &__slider {
    margin: 28px (-$container-padding) 0;
  }

  &__item {
    width: 336px;

    &:first-child {
      margin-left: 10px;
    }

    &:last-child {
      margin-right: 10px;
    }
  }

  @include media(md) {
    &__heading {
      font-size: 40px;
      line-height: (49/40);
    }

    &__slider {
      margin: 40px (-$container-padding-md) 0;
    }

    &__item {
      width: 410px;

      &:first-child {
        margin-left: $container-padding-md;
      }

      &:last-child {
        margin-right: $container-padding-md;
      }
    }
  }

  @include media(xl) {
    &__slider {
      margin: 40px 0 0;
    }
    
    &__item {
      width: calc(25% - 150px / 4);

      &:first-child {
        margin-left: 0;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
