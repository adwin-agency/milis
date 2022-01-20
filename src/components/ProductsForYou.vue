<template>
  <div class="products-for-you">
    <h2 class="products-for-you__heading">Кухни для Вас</h2>
    <Swiper
      :options="swiperOptions"
      ref="mySwiper"
      class="products-for-you__items"
    >
      <SwiperSlide
        v-for="(category, index) in categories"
        :key="index"
        class="products-for-you__item"
      >
        <RouterLink
          class="products-for-you__card"
          :to="{name: 'category', params: {category: category.url}}"
        >
          <span class="products-for-you__image">
            <img :src="$basepath + category.picture" alt="">
          </span>
          <span class="products-for-you__title">{{category.name}}</span>
        </RouterLink>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script>
import { swiper as Swiper, swiperSlide as SwiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'ProductsForYou',
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      swiperOptions: {
        spaceBetween: 20,
        slidesPerView: 'auto',
        freeMode: true,
        resistanceRatio: 0,
        breakpointsInverse: true,
        breakpoints: {
          [this.$breakpoints.lg]: {
            spaceBetween: 0,
            allowTouchMove: false
          }
        }
      }
    }
  },
  computed: {
    categories() {
      return this.$store.state.kitchenCategories
    }
  }
}
</script>

<style lang="scss">
.products-for-you {
  $b: &;

  &__heading {
    font-size: 34px;
    line-height: (41/34);
  }

  &__items {
    margin: 27px (-$container-padding) 0;
  }

  &__item {
    width: 313px;

    &:nth-child(2n) {
      #{$b}__image::after {
        background-color: rgba(4, 25, 135, 0.6);
      }
    }
  }

  &__card {
    display: flex;
    align-items: flex-end;
    position: relative;
    overflow: hidden;
    cursor: pointer;

    &::before {
      content: "";
      padding-top: 55.9%;
    }

    &:hover {      
      #{$b}__image {
        transform: scale(1.07, 1.1);
      }
    }
  }

  &__image {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    transition: transform .3s ease;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(124, 140, 231, 0.5);
    }
  }

  &__title {
    position: relative;
    margin-left: auto;
    padding: 18px 30px;
    font-weight: bold;
    font-size: 16px;
    line-height: (19/16);
    text-decoration: underline;
    color: $color-white;
    z-index: 2;
  }

  @include media(md) {
    &__heading {
      font-size: 44px;
      line-height: (54/44);
    }

    &__items {
      margin: 38px (-$container-padding-md) 0;
    }

    &__item {
      width: 410px;
    }

    &__card::before {
      padding-top: 50.6%;
    }

    &__title {
      padding: 15px 30px;
      font-size: 18px;
      line-height: (21/18);
    }
  }

  @include media(lg) {
    &__items {
      margin-top: 35px;
    }

    &__item {
      flex: 1;
      width: auto;
    }

    &__card::before {
      padding-top: 68.6%;
    }

    &__title {
      padding: 15px 25px;
    }
  }

  @include media(xl) {
    &__heading {
      font-size: 60px;
      line-height: (73/60);
    }

    &__items {
      margin: 45px (-$container-padding-xl) 0;
    }

    &__card::before {
      padding-top: 51.6%;
    }

    &__title {
      padding: 22px 60px;
    }
  }
}
</style>
