<template>
  <div class="modal-review">
    <div class="modal-review__wrapper">
      <Swiper
        class="modal-review__slider"
        :options="swiperOptions"
        ref="mySwiper"
        @slideChange="onSlideChange"
      >
        <SwiperSlide
          v-for="(picture, index) in reviewsPictures"
          :key="index"
          class="modal-review__slide"
        >
          <img :src="`https://milismebel.ru${$mobile ? picture.tablet.path : picture.desktop.path}`" alt="">  
        </SwiperSlide>
      </Swiper>
      <div
        v-if="currentReview"
        class="modal-review__content"
      >
        <p class="modal-review__date">{{currentReview.date}}</p>
        <p class="modal-review__title">{{currentReview.name}}
          <span class="modal-review__rating">
            <span class="modal-review__rating-icon">
              <Icon :name="`smile-${currentReview.rating}`" />
            </span>
            {{currentReview.rating}}</span>
        </p>
        <p class="modal-review__desc">{{currentReview.description}}</p>
      </div>
      <span class="modal-review__prev">
        <Icon name="arrow-left" />
      </span>
      <span class="modal-review__next">
        <Icon name="arrow-right" />
      </span>
    </div>      
    <Swiper
      class="modal-review__gallery"
      :options="galleryOptions"
      ref="myGallery"
    >
      <SwiperSlide
        v-for="(picture, index) in reviewsPictures"
        :key="index"
        class="modal-review__gallery-item"
        :class="{'is-active': activeSlide === index}"
        @click.native="onGalleryClick"
      >
        <div class="modal-review__gallery-image">
          <img :src="`https://milismebel.ru${picture.preview.path}`" alt="">
        </div>
      </SwiperSlide>
    </Swiper>
    <div class="modal-review__close" @click="$emit('close')">
      <Icon name="close" />
    </div>
  </div>
</template>

<script>
import Icon from './base/Icon'
import { swiper as Swiper, swiperSlide as SwiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'ModalReview',
  components: {
    Icon,
    Swiper,
    SwiperSlide
  },
  props: {
    initial: Number
  },
  data() {
    return {
      activeSlide: this.initial || 0,
      swiperOptions: {
        initialSlide: this.initial || 0,
        resistanceRatio: 0,
        navigation: {
          nextEl: '.modal-review__next',
          prevEl: '.modal-review__prev',
        },
      },
      galleryOptions: {
        initialSlide: this.initial || 0,
        resistanceRatio: 0,
        spaceBetween: 16,
        slidesPerView: 'auto',
        freeMode: true,
        freeModeMomentum: false,
        breakpointsInverse: true,
        breakpoints: {
          [this.$breakpoints.md]: {
            spaceBetween: 20
          },
          [this.$breakpoints.lg]: {
            slidesPerView: 8,
            freeMode: false
          }
        }
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
    gallery() {
      return this.$refs.myGallery.swiper
    },
    reviews() {
      return this.$store.state.reviews
    },
    reviewsPictures() {
      return this.$store.getters.reviewsPictures
    },
    currentReview() {
      return this.reviews && this.reviews.find(item => item.id === this.reviewsPictures[this.activeSlide].id)
    }
  },
  methods: {
    onSlideChange() {
      const swiper = this.swiper
      const gallery = this.gallery
      const swiperIndex = swiper.activeIndex
      const galleryIndex = gallery.activeIndex
      const slidesInView = this.$mobile ? Math.floor((gallery.width + gallery.params.spaceBetween) / (gallery.slides[1].offsetWidth + gallery.params.spaceBetween)) : gallery.params.slidesPerView

      this.activeSlide = swiperIndex
      
      if (swiperIndex > galleryIndex + slidesInView - 1) {
        this.gallery.slideTo(galleryIndex + 1)
      } else if (swiperIndex <= galleryIndex) {
        this.gallery.slideTo(swiperIndex)
      }
    },
    onGalleryClick() {
      this.swiper.slideTo(this.gallery.clickedIndex)
    }
  }
}
</script>

<style lang="scss">
.modal-review {
  position: relative;
  padding: 108px 0 30px;
  background-color: $color-white;
  overflow: hidden;

  &__slide {
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__content {
    position: relative;
    margin-top: 56px;
    padding: 0 20px;
    z-index: 1;
  }

  &__date {
    font-family: $font-secondary;
    font-size: 10px;
    line-height: (14/10);
    color: $color-gray;
  }

  &__title {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 14px;
    line-height: (14/10);
    color: $color-blue;
  }

  &__rating {
    display: flex;
    margin-top: -5px;
    margin-left: 20px;
    font-size: 12px;
    line-height: (17/12);
  }

  &__rating-icon {
    width: 20px;
    height: 20px;
    margin-right: 15px;
  }

  &__desc {
    margin-top: 12px;
    font-size: 12px;
    line-height: (19/12);
  }

  &__prev,
  &__next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 60px;
    height: 60px;
    fill: $color-white;
    cursor: pointer;
    transition: opacity .3s ease;

    &.swiper-button-disabled {
      opacity: 0;
      pointer-events: none;
    }
  }

  &__prev {
    left: -100px;
  }

  &__next {
    right: -100px;
  }

  &__gallery {
    margin: 26px 20px 0;
    overflow: visible;
  }

  &__gallery-item {
    width: 115px;
    border: 2px solid transparent;
    transition: border-color .3s ease;
    cursor: pointer;

    &.is-active {
      border-color: $color-green;
    }
  }

  &__gallery-image {
    position: relative;
    padding-top: 58.1%;

    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;

      &::selection {
        background-color: transparent;
      }
    }
  }

  &__close {
    position: absolute;
    top: 25px;
    right: 30px;
    width: 30px;
    height: 30px;
    fill: $color-gray;
    cursor: pointer;
    z-index: 1;
  }

  @include media(md) {
    padding: 126px 0 68px;

    &__content {
      margin-top: 82px;
      padding: 0 30px;
    }

    &__gallery {
      margin: 26px 30px 0;
    }

    &__gallery-item {
      width: 140px;
    }

    &__close {
      width: 36px;
      height: 36px;
    }
  }

  @include media(lg) {
    padding: 0 100px;
    background-color: transparent;

    &__wrapper {
      display: flex;
      align-items: flex-end;
      position: relative;

      &::before {
        content: "";
        padding-top: 56.2%;
      }
    }

    &__slider {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }

    &__content {
      margin-top: 0;
      max-width: 705px;
      padding: 20px 25px 30px;
      background-color: $color-white;
    }

    &__gallery {
      margin: 26px 0 0;
      overflow: hidden;
    }

    &__gallery-item {
      width: auto;
    }

    &__close {
      top: 0;
      right: 0;
      width: 30px;
      height: 30px;
      fill: $color-white;
    }
  }

  @include media(xl) {
    padding: 0 240px;

    &__prev {
      left: -240px;
    }

    &__next {
      right: -240px;
    }
  }
}
</style>
