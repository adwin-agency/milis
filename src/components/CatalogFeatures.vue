<template>
  <div class="catalog-features">
    <Swiper
      :options="options"
    >
      <SwiperSlide
        v-for="item in items"
        :key="item.id"
      >
        <p class="catalog-features__item">{{ item.title }}</p>
      </SwiperSlide>
      <div class="swiper-scrollbar" slot="scrollbar"></div>
    </Swiper>
  </div>
</template>

<script>
import { swiper as Swiper, swiperSlide as SwiperSlide } from 'vue-awesome-swiper'

const items = [
  { id: 1, title: 'Бесплатный дизайн-проект' },
  { id: 2, title: 'Изготовление от 14 дней' },
  { id: 3, title: 'Рассрочка 0*0*8' },
  { id: 4, title: '3 простых шага - и кухня у Вас!' }
]

export default {
  name: 'CatalogFeatures',
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      items: items,
      options: {
        freeMode: true,
        slidesPerView: 'auto',
        scrollbar: {
          el: '.swiper-scrollbar'
        }
      }
    }
  }
}
</script>

<style lang="scss">
.catalog-features {
  .swiper-slide {
    width: 230px;
    height: auto;
    margin-left: 20px;

    &:last-child {
      margin-right: 20px;
    }
  }

  .swiper-scrollbar {
    background: $color-gray-8;
  }

  .swiper-scrollbar-drag {
    background: $color-blue;
  }

  .swiper-container-horizontal > .swiper-scrollbar {
    position: static;
    margin: 20px 20px 0;
    width: auto;
    height: 4px;
  }

  &__item {
    height: 100%;
    padding: 24px 30px;
    border-radius: 8px;
    font-family: $font-secondary;
    font-weight: 700;
    font-size: 14px;
    line-height: 120%;
    color: $color-blue;
    background-color: $color-gray-8;
  }
}
</style>
