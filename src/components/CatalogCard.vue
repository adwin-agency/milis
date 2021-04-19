<template>
  <div
    class="catalog-card"
    :class="[{'catalog-card_high': high}, {'catalog-card_alt': alt}, {'catalog-card_top': top}, {'catalog-card_in': similar}]"
  >
    <RouterLink
      v-if="$mobile || (!alt && !top)"
      class="catalog-card__category"
      :to="{name: 'category', params: {category: kitchen.category}}"
    >
      {{kitchen.category_rus}} / {{kitchen.style}}
    </RouterLink>
    <RouterLink :to="{name: 'product', params: {category: kitchen.category, kitchen: kitchen.url}}" class="catalog-card__images">
      <div
        v-if="test"
        class="catalog-card__image anim-img js-anim"
      >
        <img :src="$mobile ? `https://milismebel.ru${kitchen.pictures[0].tablet.path}` : high ? `https://milismebel.ru${kitchen.pictures[0].square.path}` : `https://milismebel.ru${kitchen.pictures[0].desktop.path}`" alt="">
      </div>
      <Swiper
        v-else
        :options="swiperOptions"
        ref="mySwiper"
        class="catalog-card__slider"
      >
        <SwiperSlide
          v-for="(picture, index) in kitchen.pictures"
          :key="index"
          class="catalog-card__item"
        >
          <div
            v-if="index === 0"
            class="catalog-card__image anim-img js-anim"
          >
            <img :src="$mobile ? `https://milismebel.ru${picture.tablet.path}` : high ? `https://milismebel.ru${picture.square.path}` : `https://milismebel.ru${picture.desktop.path}`" alt="">
          </div>
          <div
            v-else
            class="catalog-card__image"
          >
            <img class="swiper-lazy" :data-src="$mobile ? `https://milismebel.ru${picture.tablet.path}` : high ? `https://milismebel.ru${picture.square.path}` : `https://milismebel.ru${picture.desktop.path}`" alt="">
          </div>
        </SwiperSlide>
        <ButtonNav
          prev
          :sm="alt"
          :xs="!alt"
          class="catalog-card__prev"
          slot="button-prev"  
        />
        <ButtonNav
          :sm="alt"
          :xs="!alt"
          class="catalog-card__next"
          slot="button-next"  
        />
      </Swiper>
      <p v-if="kitchen.discount" class="catalog-card__label">Скидка на материалы</p>
      <Discount
        v-if="kitchen.discount"
        class="catalog-card__discount"
        :value="kitchen.discount"
      />
      <button
        v-if="test"
        type="button"
        class="catalog-card__details-btn"
      >
        Подробнее
      </button>
      <button type="button" class="catalog-card__btn" @click.prevent="showModal">
        Рассчитать
        <span class="catalog-card__btn-icon">
          <img src="../assets/img/arrow-right-gradient.svg" alt="">
        </span>
      </button>
    </RouterLink>
    <div class="catalog-card__content">
      <div class="catalog-card__info">
        <RouterLink
          v-if="!$mobile && (alt || top)"
          class="catalog-card__category"
          :to="{name: 'category', params: {category: kitchen.category}}"
        >
          {{kitchen.category_rus}} / {{kitchen.style}}
        </RouterLink>
        <p class="catalog-card__title">
          <RouterLink :to="{name: 'product', params: {category: kitchen.category, kitchen: kitchen.url}}">{{kitchen.name}}</RouterLink>
          <button
            type="button"
            class="catalog-card__stat"
            :class="{'is-active': activeLike}"
            @click="toggleLike"
          >
            <span class="catalog-card__stat-icon">
              <Icon name="likes"/>
            </span>
            {{newLikesCount || kitchen.likes}}
          </button>
        </p>
      </div>
      <div class="catalog-card__prices">
        <p v-if="kitchen.old_price" class="catalog-card__oldprice">{{kitchen.old_price}} ₽</p> 
        <p class="catalog-card__price">
          <span class="catalog-card__price-num">{{kitchen.price}} ₽<span>*</span></span>
        </p>
        <p class="catalog-card__price-note"><span>*</span>за весь гарнитур</p>
      </div>
    </div>
  </div>
</template>

<script>
import Discount from './base/Discount'
import Icon from './base/Icon'
import ButtonNav from './base/ButtonNav'
import { swiper as Swiper, swiperSlide as SwiperSlide } from 'vue-awesome-swiper'
import api from '@/api'

export default {
  name: 'CatalogCard',
  components: {
    Discount,
    Icon,
    ButtonNav,
    Swiper,
    SwiperSlide
  },
  props: {
    high: Boolean,
    alt: Boolean,
    top: Boolean,
    kitchen: Object,
    similar: Boolean,
    animDelay: Number,
    test: Boolean
  },
  data() {
    return {
      swiperOptions: {
        resistanceRatio: 0,
        loop: true,
        navigation: {
          prevEl: '.catalog-card__prev',
          nextEl: '.catalog-card__next'
        },
        allowTouchMove: !this.similar,
        lazy: {
          loadPrevNext: true
        },
        touchEventsTarget: 'wrapper'
      },
      activeLike: this.kitchen.likes_status !== 'disable',
      sendingLike: false,
      newLikesCount: null
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
  },
  methods: {
    toggleLike() {
      if (this.sendingLike) {
        return
      }

      this.sendingLike = true

      let data = {
        id: this.kitchen.id,
        increase: !this.activeLike
      }

      data = JSON.stringify(data)

      api.sendLike(data)
        .then(response => {
          this.activeLike = !this.activeLike
          this.sendingLike = false
          this.newLikesCount = response
        })
    },

    showModal() {
      this.$store.commit('setModal', 'quiz')
      this.$store.commit('setModalData', this.modalData)
    }
  }
}
</script>

<style lang="scss">
.catalog-card {
  $b: &;

  border-top: 1px solid #D9D9D9;
  padding-top: 11px;

  &_in {
    #{$b} {
      &__images {
        margin-left: 0;
        margin-right: 0;
      }

      &__discount {
        right: -14px;
      }
    }
  }

  &__category {
    font-size: 14px;
    line-height: (16/14);
    text-decoration: underline;
    color: $color-gray-middle;
  }

  &__images {
    display: block;
    position: relative;
    margin: 0 (-$container-padding);
    margin-top: 14px;
  }

  &__image {
    position: relative;
    padding-top: 75.3%;
    overflow: hidden;

    picture, img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__prev,
  &__next {
    position: absolute;
    bottom: 0;
    transform: translateZ(0);
    z-index: 1;
  }

  &__prev {
    left: 0;
  }

  &__next {
    left: 37px;
  }

  &__label {
    position: absolute;
    left: 24px;
    top: 20px;
    border-radius: 15px;
    padding: 5px 10px;
    font-family: $font-secondary;    
    font-size: 12px;
    line-height: (15/12);
    color: $color-white;
    background-color: $color-blue;
    z-index: 1;
  }

  &__discount {
    position: absolute;
    top: -18px;
    right: 4px;
    z-index: 1;
  }

  &__details-btn {
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 10px 20px;
    font-family: $font-secondary;
    color: #fff;
    background-color: $color-blue;
    transform: translateZ(0);
    z-index: 1;
  }

  &__btn {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 10px 5px 10px 20px;
    border-top-left-radius: 30px;
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 12px;
    line-height: 1.47;
    text-decoration: underline;
    color: $color-white;
    background-color: $color-green;
    transform: translateZ(0);
    z-index: 1;
  }

  &__btn-icon {
    flex-shrink: 0;
    width: 14px;
    height: 14px;
    margin-left: 8px;
  }

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 17px;
  }

  &__info {
    margin-right: 20px;
  }

  &__title {
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 18px;
    line-height: (29/18);
    color: $color-blue;
  }

  &__stat {
    display: flex;
    align-items: center;
    font-weight: normal;
    font-size: 10px;
    line-height: (12/10);
    color: $color-gray-middle;
    fill: $color-gray;
    transition: fill .3s ease;

    &.is-active {
      fill: $color-red;
    }
  }

  &__stat-icon {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }

  &__prices {
    flex-shrink: 0;
    text-align: right;
  }

  &__oldprice {
    margin-top: -6px;
    font-size: 20px;
    line-height: (24/20);
    text-decoration: line-through;
    color: $color-gray-middle;
  }

  &__price {
    font-weight: bold;
    font-size: 12px;
    line-height: (24/20);
    color: $color-blue;
  }

  &__price-num {
    font-size: 30px;

    span {
      color: $color-red;
    }
  }

  &__price-note {
    font-size: 12px;
    color: $color-blue;

    span {
      color: $color-red;
    }
  }

  @include media(md) {
    &__images {
      margin-left: 0;
      margin-right: 0;
    }

    &__discount {
      right: -14px;
    }
  }

  @include media(lg) {
    padding-top: 20px;

    &_alt {
      border-top: none;
      padding-top: 0;
      padding-bottom: 14px;
      border-bottom: 1px solid #D9D9D9;

      #{$b} {
        &__images {
          margin-top: 0;
        }

        &__image {
          padding-top: 53.8%;
        }

        &__next {
          left: 42px;
        }

        &__btn {
          padding: 15px 20px 15px 35px;
        }

        &__content {
          margin-top: 20px;
        }

        &__category {
          font-size: 12px;
          line-height: (15/12);
        }

        &__title {
          display: flex;
          align-items: center;
          margin-top: 10px;
          margin-right: 0;
          font-size: 22px;
          line-height: (36/22);
        }

        &__stat {
          margin-top: 0;
          margin-left: 22px;
          margin-bottom: 0;
        }

        &__price {
          font-size: 22px;
          line-height: (36/22);
        }

        &__price-note {
          margin-top: -8px;
        }
      }
    }

    &_high {
      #{$b} {
        &__image {
          padding-top: 96.9%;
        }
      }

      &#{$b}_alt {
        #{$b}__image {
          padding-top: 100%;
        }
      }
    }

    &_top {
      border-bottom: none;

      #{$b} {
        &__image {
          padding-top: 75.3%;
        }

        &__content {
          padding-right: $container-padding-md;
        }

        &__btn {
          padding-right: #{$container-padding-md + 20px};
        }

        &__discount {
          top: 20px;
          right: 24px;
        }
      }
    }

    &__images {
      margin-top: 24px;
    }

    &__image {
      padding-top: 64.6%;
    }

    &__next {
      left: 38px;
    }

    &__details-btn {
      padding: 12px 24px;
    }

    &__btn {
      padding: 10px 10px 10px 24px;
    }

    &__btn-icon {
      margin-left: 8px;
      width: 18px;
      height: 18px;
    }

    &__category {
      font-size: 10px;
      line-height: (12/10);
    }

    &__content {
      margin-top: 16px;
    }

    &__title {
      margin-right: -30px;
      font-size: 18px;
      line-height: (29/18);
    }

    &__stat {
      margin-top: 10px;
      margin-bottom: 2px;
    }

    &__prices {
      margin-bottom: -2px;
    }

    &__oldprice {
      margin-left: 30px;
    }
  }

  @include media(xl) {
    &_high {
      #{$b} {
        &__image {
          padding-top: 102.9%;
        }
      }
    }

    &_alt {
      #{$b} {
        &__next {
          left: 48px;
        }
      }
    }

    &_top {
      #{$b} {
        &__btn {
          padding-right: #{$container-padding-xl + 20px};
        }

        &__content {
          padding-right: $container-padding-xl;
        }
      }
    }

    &__image {
      padding-top: 68.3%;
    }

    &__next {
      left: 42px;
    }

    &__discount {
      top: -15px;
    }

    &__details-btn {
      padding: 15px 30px;
    }
    
    &__stat {
      margin-top: 0;
      margin-bottom: 0;
    }
  }
}
</style>
