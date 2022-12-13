<template>
  <div class="main-reviews">
    <div class="main-reviews__box">
      <h2
        v-if="!$mobile"
        class="main-reviews__heading"
      >Отзывы владельцев</h2>
      <Swiper
        class="main-reviews__slider"
        :options="swiperOptions"
      >
        <SwiperSlide
          v-for="item in items"
          :key="item.id"
          class="main-reviews__slide"
        >
          <VideoReviewCard
            :data="item"
            :active="activeVideo === item.id"
            @play="setActiveVideo"
          />
        </SwiperSlide>
        <div
          class="main-reviews__prev"
          slot="button-prev"
        >
          <Icon
            class="main-reviews__nav-icon"
            name="angle-right"
          />
        </div>
        <div
          class="main-reviews__pagination"
          slot="pagination"
        ></div>
        <div
          class="main-reviews__next"
          slot="button-next"
        >
          <Icon
            class="main-reviews__nav-icon"
            name="angle-right"
          />
        </div>
      </Swiper>
    </div>
    <CatalogFeatures
      v-if="$windowWidth < $breakpoints.lg"
      class="main-reviews__features"
    />
    <Dropdowns
      v-else
      :items="dropdowns"
      main
      disabled
      class="main-reviews__features"
    />
  </div>
</template>

<script>
import {
  swiper as Swiper,
  swiperSlide as SwiperSlide
} from 'vue-awesome-swiper'
import VideoReviewCard from './VideoReviewCard.vue'
import CatalogFeatures from './CatalogFeatures.vue'
import Icon from './base/Icon.vue'
import Dropdowns from './base/Dropdowns.vue'

export default {
  name: 'MainReviews',
  components: {
    Swiper,
    SwiperSlide,
    VideoReviewCard,
    CatalogFeatures,
    Icon,
    Dropdowns
  },
  props: {
    items: Array
  },
  data() {
    return {
      activeVideo: null,
      swiperOptions: {
        slidesPerView: 'auto',
        spaceBetween: 30,
        threshold: 20,
        navigation: {
          prevEl: '.main-reviews__prev',
          nextEl: '.main-reviews__next'
        },
        pagination: {
          el: '.main-reviews__pagination'
        },
        breakpointsInverse: true,
        breakpoints: {
          [this.$breakpoints.lg]: {
            slidesPerView: 2
          },
          [this.$breakpoints.xl]: {
            slidesPerView: 3
          }
        }
      },
      dropdowns: [
        {
          arrow: true,
          title: 'Бесплатный дизайн-проект',
          desc: 'Дизайнер составит проект вашей будущей кухни совершенно бесплатно, даже в том случае, если вы по какой-то причине решите отказаться от покупки.'
        },
        {
          arrow: true,
          title: 'Рассрочка до 8 месяцев без первоначального взноса',
          desc: 'Предоставляем беспроцентную рассрочку на 8 месяцев от наших банков партнеров. Высокий шанс одобрения и быстрое принятие решения!'
        },
        {
          arrow: true,
          title: 'Изготовление от 14 дней',
          desc: 'У нас собственный производственный цех, поэтому мы не зависим от посредников. Это позволяет изготавливать кухни гораздо быстрее и избегать неприятных задержек.'
        },
        {
          arrow: true,
          title: '3 простых шага - и кухня у Вас!',
          desc: 'Наш кухонный мир держится на трех китах - Заказ, Доставка, Сборка. Пройдет совсем немного времени с момента вашей заявки до момента, когда готовый гарнитур окажется у вас дома.'
        }
      ]
    }
  },
  methods: {
    setActiveVideo(id) {
      this.activeVideo = id
    }
  }
}
</script>

<style lang="scss">
.main-reviews {
  .swiper-wrapper {
    margin-bottom: 15px;
  }

  .swiper-pagination-bullets {
    display: flex;
    width: auto;
  }

  .swiper-pagination-bullet {
    margin: 0 5px !important;
    width: 20px;
    height: 4px;
    border-radius: 2px;
    background-color: $color-gray-8;
    opacity: 1;
    transition: background-color 0.3s ease;
  }

  .swiper-pagination-bullet-active {
    background-color: $color-blue;
  }

  &__slider {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin: 0 (-$container-padding);
    padding: 0 $container-padding;
  }

  &__slide {
    max-width: 380px;
  }

  &__prev,
  &__next {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: $color-gray-8;
    cursor: pointer;
  }

  &__prev {
    order: 1;
    transform: rotate(180deg);
  }

  &__pagination {
    order: 2;
  }

  &__next {
    order: 3;
  }

  &__nav-icon {
    width: 20px;
    height: 20px;
  }

  &__features {
    margin: 40px (-$container-padding) 0;
  }

  @include media(md) {
    &__slider {
      margin: 0 (-$container-padding-md);
      padding: 0 $container-padding-md;
    }

    &__features {
      margin: 40px (-$container-padding-md) 0;
    }
  }

  @include media(lg) {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .swiper-wrapper {
      margin-top: 40px;
      margin-bottom: 0;
    }

    &__features {
      margin: 0;
      margin-right: 50px;
    }

    &__box {
      order: 1;
    }

    &__heading {
      font-size: 24px;
      line-height: 110%;
    }

    &__slider {
      justify-content: flex-end;
      margin: -26px 0 0;
      padding: 0;
      width: 800px;
      flex-shrink: 0;
    }

    &__slide {
      max-width: none;
    }

    &__prev {
      order: -3;
    }

    &__pagination {
      order: -2;
      margin: 0 20px;
    }

    &__next {
      order: -1;
    }
  }

  @include media(xl) {
    &__heading {
      font-size: 34px;
    }

    &__slider {
      margin-top: -36px;
      width: 1200px;
    }
  }

  @include media(xxl) {
    &__slider {
      width: 1300px;
    }
  }
}
</style>