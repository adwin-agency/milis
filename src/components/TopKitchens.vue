<template>
  <div class="top-kitchens">
    <h2 class="top-kitchens__heading">Топ 3 кухни Milis в августе</h2>
    <!-- <Swiper class="top-kitchens__slider">
      <SwiperSlide class="top-kitchens__slide">
        <CatalogCard class="top-kitchens__card" />
      </SwiperSlide>
      <SwiperSlide class="top-kitchens__slide">
        <CatalogCard class="top-kitchens__card" />
      </SwiperSlide>
      <SwiperSlide class="top-kitchens__slide">
        <CatalogCard class="top-kitchens__card" />
      </SwiperSlide>
    </Swiper> -->
  </div>
</template>

<script>
import {
  swiper as Swiper,
  swiperSlide as SwiperSlide
} from 'vue-awesome-swiper'
import CatalogCard from './CatalogCard.vue'

export default {
  name: 'TopKitchens',
  components: {
    Swiper,
    SwiperSlide,
    CatalogCard
  }
}
</script>