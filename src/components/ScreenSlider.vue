<template>
  <div class="screen-slider">
    <RouterLink
      :to="{name: 'product', params: {category: kitchen.category, kitchen: kitchen.url}}"
      class="screen-slider__box"
    >
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
            <img
              :src="$basepath + ($mobile ? picture.tablet.path : picture.desktop.path)"
              alt=""
            >
          </div>
          <div
            v-else
            class="screen-slider__image"
          >
            <img
              class="swiper-lazy"
              :data-src="$basepath + ($mobile ? picture.tablet.path : picture.desktop.path)"
              alt=""
            >
          </div>
        </SwiperSlide>
        <ButtonNav
          class="screen-slider__prev"
          :class="[{'show': anim && first}, {'show-in': first ? anim && active : active}]"
          slot="button-prev"
          prev
          alt
        />
        <ButtonNav
          class="screen-slider__next"
          :class="[{'show': anim && first}, {'show-in': first ? anim && active : active}]"
          slot="button-next"
          next
          alt
        />
      </Swiper>
    </RouterLink>
    <div
      class="screen-slider__btns"
      :class="[{'show': anim && first}, {'show-in': first ? anim && active : active}]"
      v-if="!$mobile"
    >
      <RouterLink
        :to="{name: 'about'}"
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
import {
  swiper as Swiper,
  swiperSlide as SwiperSlide
} from 'vue-awesome-swiper'

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
        },
        touchEventsTarget: 'wrapper'
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

  &__box,
  &__images {
    height: 100%;
  }

  &__box {
    display: block;
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

  &__nav {
    position: absolute;
    left: 0;
    top: 50%;
    right: 0;
  }

  &__prev,
  &__next {
    position: absolute;
    top: 50%;
    border-radius: 50%;
    transform: translateY(-50%);
    z-index: 2;
  }

  &__prev {
    left: 2px;
  }

  &__next {
    right: 2px;
  }

  &__btns {
    position: absolute;
    right: $container-padding-md;
    bottom: 24px;
    opacity: 0;
    transition: opacity 0.5s ease 0.5s;
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
      left: 10px;
    }

    &__next {
      right: 10px;
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
      transition: opacity 0.5s ease 0.5s, background-color 0.3s ease, fill 0.3s ease;

      &.show {
        animation: screen-slider-btns 1.25s;
      }

      &.show-in {
        opacity: 1;
      }
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
