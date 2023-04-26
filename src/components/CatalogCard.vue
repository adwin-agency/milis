<template>
  <div
    class="catalog-card"
    :class="[
      {'catalog-card_high': high},
      {'catalog-card_alt': alt},
      {'catalog-card_top': top},
      {'catalog-card_in': similar},
      {'catalog-card_main': main}
    ]"
  >
    <RouterLink
      v-if="$windowWidth < $breakpoints.lg && !main"
      class="catalog-card__category"
      :to="{name: 'category', params: {category: kitchen.category}}"
    >
      {{kitchen.category_rus}} / {{kitchen.style}}
    </RouterLink>
    <RouterLink
      :to="{name: 'product', params: {category: kitchen.category, kitchen: kitchen.url}}"
      class="catalog-card__images"
      @click.native="onCardClick"
    >
      <div
        v-if="test || main"
        class="catalog-card__image anim-img js-anim"
      >
        <img
          :src="$basepath + ($mobile ? kitchen.pictures[0].tablet.path : high ? kitchen.pictures[0].square.path : kitchen.pictures[0].desktop.path)"
          alt=""
        >
      </div>
      <Swiper
        v-else
        :options="swiperOptions"
        ref="mySwiper"
        class="catalog-card__slider"
        @slideChange="onSlideChange"
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
            <img
              :src="$basepath + ($mobile ? picture.tablet.path : high ? picture.square.path : picture.desktop.path)"
              alt=""
            >
          </div>
          <div
            v-else
            class="catalog-card__image"
          >
            <img
              class="swiper-lazy"
              :data-src="$basepath + ($mobile ? picture.tablet.path : high ? picture.square.path : picture.desktop.path)"
              alt=""
            >
          </div>
        </SwiperSlide>
        <ButtonNav
          prev
          alt
          class="catalog-card__prev"
          slot="button-prev"
        />
        <ButtonNav
          alt
          class="catalog-card__next"
          slot="button-next"
        />
      </Swiper>
      <!-- <p
        v-if="kitchen.discount"
        class="catalog-card__label"
      >
        Рассрочка 0-0-8
      </p> -->
      <!-- <img
        v-if="kitchen.discount"
        class="catalog-card__label-new"
        src="@/assets/img/discount-label.png"
      > -->
      <button
        v-if="test"
        type="button"
        class="catalog-card__details-btn"
      >
        Подробнее
      </button>
      <button
        type="button"
        class="catalog-card__btn"
        @click.prevent="showModal"
      >
        Рассчитать
        <Icon
          class="catalog-card__btn-icon"
          name="arrow-right"
        />
      </button>
      <!-- <button
        class="catalog-card__video"
        @click.prevent
      >
        <span class="catalog-card__video-circle">
          <Icon
            class="catalog-card__video-icon"
            name="play"
          />
        </span>
        <span class="catalog-card__video-title">Видеоотзыв</span>
      </button> -->
    </RouterLink>
    <div class="catalog-card__content">
      <div class="catalog-card__info">
        <RouterLink
          v-if="$windowWidth >= $breakpoints.lg && !main"
          class="catalog-card__category"
          :to="{name: 'category', params: {category: kitchen.category}}"
        >
          {{kitchen.category_rus}} / {{kitchen.style}}
        </RouterLink>
        <p class="catalog-card__title">
          <RouterLink
            class="catalog-card__link"
            :to="{name: 'product', params: {category: kitchen.category, kitchen: kitchen.url}}"
            @click.native="onCardClick"
          >
            Кухня <span>«{{kitchenName}}»</span>
          </RouterLink>
          <button
            v-if="!main"
            type="button"
            class="catalog-card__stat"
            :class="{'is-active': activeLike}"
            @click="toggleLike"
          >
            <span class="catalog-card__stat-icon">
              <Icon name="likes" />
            </span>
            {{newLikesCount || kitchen.likes}}
          </button>
        </p>
      </div>
      <div class="catalog-card__prices">
        <p
          v-if="kitchen.old_price"
          class="catalog-card__oldprice"
        >{{kitchen.old_price}} ₽</p>
        <p class="catalog-card__price">
          <span class="catalog-card__price-num">{{kitchen.price}} ₽</span>
        </p>
        <p class="catalog-card__credit">от {{kitchen.installment}} ₽/мес.</p>
        <p class="catalog-card__price-note">цена за весь гарнитур</p>
      </div>
      <!-- <Discount
        v-if="kitchen.discount"
        :value="kitchen.discount"
        :size="$windowWidth < $breakpoints.lg ? 'xs' : 'sm'"
        class="catalog-card__discount"
      /> -->
      <div
        v-if="kitchen.discount"
        class="catalog-card__discount-new"
      >
        <span class="catalog-card__discount-title">скидка</span>
        <span class="catalog-card__discount-value">-{{kitchen.discount}}%</span>
        <!-- <Icon
          class="catalog-card__discount-icon"
          name="toy-47"
        /> -->
      </div>
    </div>
  </div>
</template>

<script>
// import Discount from './base/Discount'
import Icon from './base/Icon'
import ButtonNav from './base/ButtonNav'
import {
  swiper as Swiper,
  swiperSlide as SwiperSlide
} from 'vue-awesome-swiper'
import api from '@/api'

export default {
  name: 'CatalogCard',
  components: {
    // Discount,
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
    test: Boolean,
    main: Boolean
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
      newLikesCount: null,
      isWatched: false
    }
  },
  computed: {
    kitchenName() {
      return this.kitchen.name.split(' ').slice(1).join(' ')
    },
    modalData() {
      return {
        item: this.kitchen.name,
        itemId: this.kitchen.id,
        productType: this.kitchen.product_type,
        price: this.kitchen.price,
        category: `Кухни/${this.kitchen.category_rus}`
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

      api.sendLike(data).then(response => {
        this.activeLike = !this.activeLike
        this.sendingLike = false
        this.newLikesCount = response
      })
    },

    showModal() {
      this.$store.commit('setModal', 'calc')
      this.$store.commit('setModalData', this.modalData)
    },

    onSlideChange() {
      if (this.isWatched) return

      const { id, name, category_rus, price } = this.kitchen
      api.ecommerce('detail', id, name, `Кухни/${category_rus}`, price)
      
      this.isWatched = true
    },

    onCardClick() {
      if (this.main) {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({ 'event': 'main_top_kitchen' })
      }
    }
  }
}
</script>

<style lang="scss">
.catalog-card {
  $b: &;

  border-bottom: 1px solid #d9d9d9;
  padding-bottom: 17px;

  &_in {
    #{$b} {
      &__category {
        margin: 0;
      }

      &__images {
        margin-left: 0;
        margin-right: 0;
      }

      &__content {
        margin-left: 0;
        margin-right: 0;
      }

      &__price-note {
        margin-left: auto;
        max-width: 100px;
      }
    }
  }

  &_main {
    border-bottom: none;

    #{$b} {
      &__images {
        margin-top: 0;
        margin-left: 0;
        margin-right: 0;
      }

      &__content {
        margin-left: 0;
        margin-right: 0;
      }
    }
  }

  &__category {
    margin: 0 -10px;
    font-size: 12px;
    line-height: (16/14);
    text-decoration: underline;
    color: $color-gray-middle;
  }

  &__images {
    display: block;
    position: relative;
    margin: 0 (-$container-padding);
    margin-top: 8px;
    overflow: hidden;
  }

  &__image {
    position: relative;
    padding-top: 75.3%;
    overflow: hidden;

    picture,
    img {
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
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
  }

  &__prev {
    left: 2px;
  }

  &__next {
    right: 2px;
  }

  &__label {
    position: absolute;
    left: 20px;
    top: 12px;
    border-radius: 15px;
    padding: 5px 10px;
    font-family: $font-secondary;
    font-size: 12px;
    line-height: (15/12);
    color: $color-white;
    background-color: $color-blue;
    white-space: nowrap;
    z-index: 1;
  }

  &__label-new {
    position: absolute;
    left: 0;
    top: 0;
    width: 416px;
    pointer-events: none;
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
    padding: 12px 15px 12px 25px;
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
    fill: currentColor;
  }

  &__discount {
    margin-left: 7px;
  }

  &__discount-new {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-left: 6px;
    padding-left: 6px;
    border-left: 1px solid #d9d9d9;
    font-family: $font-secondary;
  }

  &__discount-title {
    font-weight: 500;
    font-size: 11px;
    line-height: 162.6%;
    color: #303864;
  }

  &__discount-value {
    font-weight: 700;
    font-size: 18px;
    line-height: 100%;
    letter-spacing: -0.05em;
    color: #0cd725;
  }

  &__discount-icon {
    position: absolute;
    left: 6px;
    top: 0;
    width: calc(100% - 6px);
    height: 100%;
  }

  &__content {
    display: flex;
    margin: 12px -10px 0;
  }

  &__info {
    margin-right: 16px;
  }

  &__title {
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 16px;
    line-height: 120%;
    color: $color-blue;
  }

  &__link {
    display: inline-block;
    span {
      display: block;
    }
  }

  &__stat {
    display: flex;
    align-items: center;
    margin-top: 7px;
    font-weight: bold;
    font-size: 14px;
    line-height: (17/14);
    color: $color-blue;
    fill: none;
    stroke: $color-red;
    stroke-width: 2px;
    transition: fill 0.3s ease;

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
    margin-left: auto;
    text-align: right;
  }

  &__oldprice {
    font-size: 14px;
    line-height: (17/14);
    text-decoration: line-through;
    color: $color-gray-middle;
  }

  &__price {
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 12px;
    line-height: (24/20);
    color: $color-blue;
  }

  &__price-num {
    font-size: 20px;

    span {
      color: $color-red;
    }
  }

  &__credit {
    font-family: $font-secondary;
    font-weight: 700;
    font-size: 12px;
    line-height: 17px;
    color: #fb626d;
  }

  &__price-note {
    margin-left: -50px;
    font-family: $font-secondary;
    font-size: 12px;
    color: $color-gray-middle;

    span {
      color: $color-red;
    }
  }

  &__video {
    position: absolute;
    left: 30px;
    bottom: 18px;
    z-index: 1;

    &::before {
      content: '';
      position: absolute;
      left: -8px;
      top: -8px;
      margin: auto;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: $color-blue;
      opacity: 0.2;
    }
  }

  &__video-circle {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: $color-blue;
  }

  &__video-icon {
    position: relative;
    width: 12px;
    height: 12px;
    margin-left: 4px;
    fill: $color-green;
  }

  &__video-title {
    display: none;
  }

  @include media(xs) {
    &_in {
      #{$b} {
        &__discount-new {
          margin-left: 8px;
          padding-left: 8px;
        }

        &__discount-value {
          font-size: 22px;
        }

        &__discount-icon {
          left: 8px;
          width: calc(100% - 8px);
        }
      }
    }

    &__discount-new {
      margin-left: 10px;
      padding-left: 10px;
    }

    &__discount-title {
      font-size: 13px;
    }

    &__discount-value {
      font-size: 24px;
    }

    &__discount-icon {
      left: 10px;
      width: calc(100% - 10px);
    }
  }

  @include media(sm) {
    &__discount-new {
      margin-left: 18px;
      padding-left: 18px;
    }

    &__discount-value {
      font-size: 28px;
    }

    &__discount-icon {
      left: 18px;
      width: calc(100% - 18px);
    }
  }

  @include media(md) {
    &__category {
      margin: 0;
    }

    &__images {
      margin-left: 0;
      margin-right: 0;
    }

    &__content {
      margin-left: 0;
      margin-right: 0;
    }

    &__prev {
      left: 10px;
    }

    &__next {
      right: 10px;
    }

    &__discount-new {
      margin-left: 10px;
      padding-left: 10px;
    }

    &__discount-value {
      font-size: 24px;
    }

    &__discount-icon {
      left: 10px;
      width: calc(100% - 10px);
    }
  }

  @include media(lg) {
    &_alt {
      border-top: none;
      padding-top: 0;
      padding-bottom: 14px;
      border-bottom: 1px solid #d9d9d9;

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
      }
    }

    &_in {
      #{$b} {
        &__label {
          left: 20px;
          top: 12px;
        }

        &__info {
          margin-top: 0;
        }

        &__category {
          font-size: 12px;
        }

        &__title {
          font-size: 18px;
        }

        &__oldprice {
          font-size: 16px;
        }

        &__price-num {
          font-size: 22px;
        }

        &__credit {
          font-size: 12px;
        }
      }
    }

    &_main {
      #{$b} {
        &__label {
          left: 15px;
          top: 15px;
        }

        &__title {
          font-size: 16px;
        }

        &__price-num {
          font-size: 20px;
        }

        &__discount-new {
          margin-left: 10px;
          padding-left: 10px;
        }
      }
    }

    &__label {
      left: 30px;
      top: 26px;
      padding: 7px 16px;
    }

    &__images {
      margin-top: 24px;
    }

    &__image {
      padding-top: 64.6%;
    }

    &__details-btn {
      padding: 12px 24px;
    }

    &__btn {
      padding: 15px 20px 15px 34px;
    }

    &__btn-icon {
      margin-left: 8px;
      width: 18px;
      height: 18px;
    }

    &__category {
      font-size: 14px;
      line-height: (12/10);
    }

    &__content {
      margin-top: 8px;
    }

    &__info {
      margin-top: 6px;
    }

    &__title {
      display: flex;
      align-items: flex-end;
      margin-top: 4px;
      font-size: 22px;
    }

    &__stat {
      margin-top: 0;
      margin-left: 5px;
      margin-bottom: 2px;
    }

    &__prices {
      margin-bottom: -2px;
    }

    &__price-num {
      font-size: 30px;
    }

    &__oldprice {
      margin-bottom: -2px;
      font-size: 20px;
    }

    &__credit {
      font-size: 14px;
    }

    &__price-note {
      margin-top: 2px;
    }

    &__discount-new {
      margin-left: 18px;
      padding-left: 18px;
    }

    &__discount-value {
      font-size: 28px;
    }

    &__discount-icon {
      left: 18px;
      width: calc(100% - 18px);
    }

    &__video {
      left: 26px;
      bottom: 24px;

      &::before {
        left: -10px;
        top: -10px;
        width: 80px;
        height: 80px;
      }

      &:hover {
        #{$b}__video-title {
          width: 210px;
        }
      }
    }

    &__video-circle {
      width: 60px;
      height: 60px;
      z-index: 1;
    }

    &__video-title {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 1px;
      top: 1px;
      width: 58px;
      height: 58px;
      padding-left: 48px;
      border-radius: 100px;
      text-decoration: underline;
      font-family: $font-secondary;
      font-weight: 700;
      font-size: 14px;
      color: $color-blue;
      background-color: #fff;
      overflow: hidden;
      transition: width .3s ease;
    }
  }

  @include media(1280) {
    &_in #{$b}__title span {
      display: block;
    }

    &__title span {
      display: inline;
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

    &_in {
      #{$b} {
        &__info {
          margin-right: 5px;
        }

        &__title {
          display: block;
          font-size: 16px;
        }

        &__stat {
          margin-top: 5px;
        }

        &__prices {
          display: block;
        }

        &__credit {
          font-size: 10px;
        }

        &__price-note {
          margin-right: 0;
        }
      }
    }

    &_main {
      #{$b} {
        &__label {
          left: 24px;
          top: 24px;
        }

        &__prices {
          display: block;
        }

        &__price-num {
          font-size: 30px;
        }

        &__price-note {
          margin-left: 0;
          margin-right: 0;
          max-width: none;
        }
      }
    }

    &__image {
      padding-top: 68.3%;
    }

    &__details-btn {
      padding: 15px 30px;
    }

    &__stat {
      margin-top: 0;
      margin-bottom: 0;
    }

    &__prices {
      display: grid;
      grid-template-columns: auto auto;
      align-items: center;
    }

    &__price-note {
      grid-row: 1/4;
      margin-left: auto;
      margin-right: 14px;
      max-width: 100px;
      line-height: 1;
    }
  }

  @include media(1890) {
    &_in {
      #{$b} {
        &__title {
          display: flex;
          font-size: 18px;
        }

        &__stat {
          margin-top: 0;
        }

        &__credit {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
