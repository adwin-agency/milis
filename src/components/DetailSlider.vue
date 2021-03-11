<template>
  <div class="detail-slider">
    <Swiper
      :key="details.id"
      :options="swiperOptions"
      ref="mySwiper"
      class="detail-slider__container"
      v-anim="true"
    >
      <SwiperSlide
        v-for="(picture, index) in details.pictures"
        :key="index"
        class="detail-slider__item"
      >
        <div
          v-if="index === 0"
          class="detail-slider__image anim-img js-anim"
        >
          <img :src="$mobile ? `https://milismebel.ru${picture.tablet.path}` : `https://milismebel.ru${picture.desktop.path}`" alt="">
        </div>
        <div
          v-else
          class="detail-slider__image"
        >
          <img class="swiper-lazy" :data-src="$mobile ? `https://milismebel.ru${picture.tablet.path}` : `https://milismebel.ru${picture.desktop.path}`" alt="">
        </div>
        <template v-if="index === 0">
          <div
            v-for="(point, index) in details.points"
            :key="index"
            class="detail-slider__tooltip"
            :style="`top:${point.coords.top}; left:${point.coords.left}`"
          >
            <Tooltip
              :right="parseFloat(point.coords.left) < 50"
              :text="point.text"
            />
          </div>
        </template>
      </SwiperSlide>
      <ButtonNav
        prev
        class="detail-slider__prev"
        slot="button-prev"  
      />
      <ButtonNav
        next
        class="detail-slider__next"
        slot="button-next"  
      />
      <div
        class="detail-slider__pagination"
        slot="pagination"
      ></div>
    </Swiper>
    <Discount
      class="detail-slider__discount"
      :value="details.discount"
    />
    <ButtonAlt
      icon="home"
      text="Вызвать дизайнера"
      class="detail-slider__btn"
      modal="call"
      :modalData="modalData"
    />
  </div>
</template>

<script>
import Tooltip from './base/Tooltip'
import Discount from './base/Discount'
import ButtonAlt from './base/ButtonAlt'
import ButtonNav from './base/ButtonNav'
import { swiper as Swiper, swiperSlide as SwiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'DetailSlider',
  components: {
    Tooltip,
    Discount,
    ButtonAlt,
    ButtonNav,
    Swiper,
    SwiperSlide
  },
  props: {
    details: Object
  },
  data() {
    return {
      swiperOptions: {
        resistanceRatio: 0,
        loop: true,
        navigation: {
          prevEl: '.detail-slider__prev',
          nextEl: '.detail-slider__next'
        },
        pagination: {
          el: '.detail-slider__pagination'
        },
        lazy: {
          loadPrevNext: true
        },
        touchEventsTarget: 'wrapper'
      }
    }
  },
  computed: {
    modalData() {
      return {
        item: this.details.name,
        itemId: this.details.id,
        productType: this.details.product_type
      }
    }
  }
}
</script>

<style lang="scss">
.detail-slider {
  $b: &;

  position: relative;

  &__item {
    position: relative;
  }

  &__image {
    position: relative;
    padding-top: 101%;

    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__tooltip {
    display: none;
  }

  &__discount {
    position: absolute;
    top: 12px;
    right: 16px;
    z-index: 1;
  }

  &__btn {
    display: none;
    position: absolute;
    right: $container-padding-md;
    bottom: 52px;
    max-width: 144px;
    z-index: 1;
  }

  &__prev,
  &__next {
    display: none;
    position: absolute;
    bottom: 0;
    z-index: 1;
  }

  &__prev {
    left: 0;
  }

  &__next {
    left: 54px;
  }

  .swiper-pagination-bullets {
    display: flex;
    justify-content: center;
    position: absolute;
    left: $container-padding;
    right: $container-padding;
    bottom: 18px;
    width: auto;
    z-index: 1;
  }

  .swiper-pagination-bullet {
    margin: 0 5px !important;
    flex-shrink: 1;
    width: 56px;
    height: 4px;
    border-radius: 4px;
    background-color: $color-white;
    opacity: 1;
  }

  .swiper-pagination-bullet-active {
    background-color: $color-green;
  }

  @include media(md) {
    &__image {
      padding-top: 60%;
    }

    &__discount {
      top: 18px;
      right: 30px;
    }

    &__prev,
    &__next {
      display: flex;
    }

    &__btn {
      display: inline-flex;
    }

    .swiper-pagination-bullets {
      justify-content: flex-end;
      left: 130px;
      right: $container-padding-md;
      bottom: 22px;
    }
  }

  @include media(lg) {
    &__image {
      padding-top: 45%;
    }

    &__tooltip {
      display: block;
      position: absolute;
    }
    
    &__discount {
      top: 38px;
      right: 60px;
    }

    &__next {
      left: 62px;
    }

    &__btn {
      right: 52px;
      bottom: 74px;
    }

    .swiper-pagination-bullets {
      left: 170px;
      right: 48px;
      bottom: 38px;
    }
  }

  @include media(xl) {
    &__image {
      padding-top: 60%;
    }
  }
}
</style>
