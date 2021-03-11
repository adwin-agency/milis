<template>
  <div class="reviews-in">
    <div class="reviews-in__header">
      <h2 class="reviews-in__heading">Отзывы</h2>
      <div class="reviews-in__actions">
        <RouterLink class="reviews-in__link" :to="{name: 'reviews'}">Читать все отзывы</RouterLink>
        <!-- <Button
          v-if="$windowWidth >= $breakpoints.md"
          small
          underline
          icon="edit"
          modal="write"
          class="reviews-in__btn"
        >
          Написать отзыв
        </Button> -->
      </div>
    </div>
    <div class="reviews-in__slider">
      <Swiper
        :options="swiperOptions"
        ref="mySwiper"
        class="reviews-in__container"
      >
        <SwiperSlide
          v-for="(review, index) in reviews"
          :key="index"
          class="reviews-in__item"
        >
          <ReviewCard
            inner
            :reviewData="review"
          />
        </SwiperSlide>   
      </Swiper>
      <ButtonNav
        prev
        sm
        transparent
        class="reviews-in__prev"
      />
      <ButtonNav
        next
        sm
        transparent
        class="reviews-in__next"
      />
    </div>
    <!-- <Button
      v-if="$windowWidth < $breakpoints.md"
      small
      underline
      icon="edit"
      modal="write"
      class="reviews-in__btn"
    >
      Написать отзыв
    </Button> -->
  </div>
</template>

<script>
// import Button from './base/Button'
import ButtonNav from './base/ButtonNav'
import ReviewCard from './ReviewCard'
import { swiper as Swiper, swiperSlide as SwiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'ReviewSm',
  components: {
    // Button,
    ButtonNav,
    ReviewCard,
    Swiper,
    SwiperSlide
  },
  props: {
    reviews: Array
  },
  data() {
    return {
      swiperOptions: {
        spaceBetween: 20,
        slidesPerView: 'auto',
        freeMode: true,
        resistanceRatio: 0,
        navigation: {
          prevEl: '.reviews-in__prev',
          nextEl: '.reviews-in__next'
        },
        breakpointsInverse: true,
        breakpoints: {
          [this.$breakpoints.md]: {
            spaceBetween: 40
          },
          [this.$breakpoints.lg]: {
            spaceBetween: 20,
            slidesPerView: 2,
            freeMode: false
          },
          [this.$breakpoints.xl]: {
            spaceBetween: 40,
            slidesPerView: 3,
            freeMode: false
          }
        }
      }
    }    
  }
}
</script>

<style lang="scss">
.reviews-in {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  &__heading {
    margin-right: 20px;
    font-size: 34px;
    line-height: (41/34);
    // font-size: 60px;
    // line-height: (73/60);
  }

  &__actions {
    // display: flex;
    // align-items: center;
    margin-bottom: 5px;
  }

  &__link {
    font-size: 14px;
    line-height: (20/14);
    text-decoration: underline;
    color: $color-blue;
    // margin-right: 44px;
  }

  &__btn {
    margin-top: 34px;
    width: 100%;
  }

  &__slider {
    margin: 26px (-$container-padding) 0;
  }

  &__item {
    width: 282px;

    &:first-child {
      margin-left: $container-padding;
    }

    &:last-child {
      margin-right: $container-padding;
    }
  }

  &__prev,
  &__next {
    display: none;
    position: absolute;
    top: 50%;
    margin-top: -17px;
    z-index: 1;
  }

  &__prev {
    left: -15px;
  }

  &__next {
    right: -15px;
  }

  @include media(md) {
    &__header {
      align-items: center;
    }

    &__heading {
      margin-bottom: 8px;
    }

    &__actions {
      display: flex;
      align-items: center;
      margin-bottom: 0;
    }

    &__link {
      margin-right: 20px;
    }

    &__btn {
      margin-top: 0;
      width: auto;
      min-width: 344px;
    }

    &__slider {
      margin: 26px (-$container-padding-md) 0;
    }

    &__item {
      &:first-child {
        margin-left: $container-padding-md;
      }

      &:last-child {
        margin-right: $container-padding-md;
      }
    }
  }

  @include media(lg) {
    &__heading {
      font-size: 44px;
      line-height: (54/44);
    }

    &__link {
      margin-right: 46px;
      font-size: 12px;
      line-height: (17/12);
    }

    &__btn {
      min-width: 260px;
    }

    &__slider {
      position: relative;
      margin: 18px 0 0;
      padding: 0 37px;
    }

    &__prev,
    &__next {
      display: flex;
    }

    &__item {
      padding-right: 40px;
      
      &:first-child {
        margin-left: 0;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }

  @include media(xl) {
    &__heading {
      margin-bottom: 18px;
      font-size: 60px;
      line-height: (73/60);
    }

    &__slider {
      margin-top: 40px;
    }

    &__item {
      padding-right: 10px;
    }
  }
}
</style>
