<template>
  <div class="screen-slider">
    <Swiper
      :options="swiperOptions"
      ref="mySwiper"
      class="screen-slider__images"
    >
      <SwiperSlide
        v-for="(picture, index) in kitchen.pictures"
        :key="index"
      >
        <div
          v-if="index === 0"
          class="screen-slider__image"
          :class="{'anim-img js-anim': first}"
          v-anim="first && {delay: 250}"
        >
          <img :src="$mobile ? `https://milismebel.ru${picture.tablet.path}` : `https://milismebel.ru${picture.desktop.path}`" alt="">
        </div>
        <div
          v-else
          class="screen-slider__image"
        >
          <img class="swiper-lazy" :data-src="$mobile ? `https://milismebel.ru${picture.tablet.path}` : `https://milismebel.ru${picture.desktop.path}`" alt="">
        </div>
      </SwiperSlide>
      <ButtonNav
        class="screen-slider__prev"
        :class="[{'show': anim && first}, {'show-in': first ? anim && active : active}]"
        prev
        slot="button-prev"
      />
      <ButtonNav
        class="screen-slider__next"
        :class="[{'show': anim && first}, {'show-in': first ? anim && active : active}]"
        next
        slot="button-next"
      />
    </Swiper>
    <div
      class="screen-slider__btns"
      :class="[{'show': anim && first}, {'show-in': first ? anim && active : active}]"
      v-if="!$mobile"
    >
      <RouterLink
        to="/about"
        v-slot="{ href, navigate }"
        custom
      >
        <ButtonAlt
          :href="href"
          icon="materials"
          text="Материалы, из которых <br>изготовлена кухня"
          class="screen-slider__btn"
          @click.native="navigate"
        />
      </RouterLink>      
      <ButtonAlt
        icon="home"
        text="Вызвать <br>дизайнера"
        expand
        class="screen-slider__btn"
        modal="call"
        :modalData="modalData"
      />
    </div>
    <div class="screen-slider__overlay"></div>
  </div>
</template>

<script>
import ButtonAlt from './base/ButtonAlt'
import ButtonNav from './base/ButtonNav'
import { swiper as Swiper, swiperSlide as SwiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'ScreenSlider',
  components: {
    ButtonAlt,
    ButtonNav,
    Swiper,
    SwiperSlide
  },
  props: {
    first: Boolean,
    anim: Boolean,
    active: Boolean,
    kitchen: Object
  },
  data() {
    return {
      swiperOptions: {
        resistanceRatio: 0,
        navigation: {
          prevEl: '.screen-slider__prev',
          nextEl: '.screen-slider__next'
        },
        lazy: {
          loadPrevNext: true
        }
      }
    }
  },
  computed: {
    modalData() {
      return {
        item: this.kitchen.name,
        itemId: this.kitchen.id,
        productType: this.kitchen.product_type
      }
    }
  }
}
</script>

<style lang="scss">
.screen-slider {
  position: relative;
  overflow: hidden;

  &__images {
    height: 100%;
  }

  &__image {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__prev,
  &__next {
    position: absolute;
    bottom: 0;
    z-index: 2;
  }

  &__prev {
    right: 45px;
  }

  &__next {
    right: 0;
  }

  &__btns {
    position: absolute;
    right: $container-padding-md;
    bottom: 24px;
    opacity: 0;
    transition: opacity .5s ease .5s;
    z-index: 2;    
  }

  &__btn {
    position: relative;
    margin-right: 19px;

    &:last-child {
      margin-right: 0;
    }
  }

  &__overlay {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: $color-white;
    pointer-events: none;
    transform: translateY(100%);
    z-index: 1;
  }

  @include media(md) {
    &__prev {
      right: 54px;
    }
  }

  @include media(lg) {

    @keyframes screen-slider-btns {
      0% {
        opacity: 0;
      }
      75% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    &__prev,
    &__next,
    &__btns {
      opacity: 0;
      transition: opacity .5s ease .5s;

      &.show {
        animation: screen-slider-btns 1.25s;
      }

      &.show-in {
        opacity: 1;
      }
    }

    &__prev {
      left: 0;
      right: auto;
    }

    &__next {
      left: 62px;
      right: auto;
    }
  }

  @include media(xl) {
    &__btns {
      right: $container-padding-xl;
      bottom: 38px;
    }
  }
}
</style>
