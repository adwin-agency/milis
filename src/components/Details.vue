<template>
  <div class="details">
    <div class="row">
      <div
        class="col col-12 col-lg-6"
        v-if="$windowWidth < $breakpoints.xl"
      >
        <Header
          class="slide-down js-anim"
          v-anim="true"
        />
      </div>
      <div
        class="col col-12"
        v-if="$windowWidth < $breakpoints.xl"
      ></div>
      <div class="col col-12 col-lg2-7 details__slider-col">
        <DetailSlider
          class="details__slider"
          :details="details"
        />
      </div>
      <div class="col col-12 col-lg-9 col-lg2-5">
        <Header
          class="slide-down js-anim"
          v-anim="true"
          v-if="$windowWidth >= $breakpoints.xl"
        />
        <div
          class="details__wrapper fade-bounce-right js-anim"
          v-anim="true"
        >
          <div class="details__nav">
            <Back
              sm
              :to="{name: 'catalog'}"
              class="details__back"
            />
            <p class="details__category">
              <RouterLink :to="{name: 'category', params: {category: details.category}}">{{details.category_rus}} / {{details.style}}</RouterLink>
            </p>
          </div>
          <h1 class="details__heading">{{details.name}}</h1>
          <div class="details__stats">
            <p class="details__note">
              <span class="details__note-icon">
                <Icon name="check" />
              </span>
              Кухня сделана на заказ
            </p>
            <button
              type="button"
              class="details__stat"
              :class="{'is-active': activeLike}"
              @click="toggleLike"
            >
              <span class="details__stat-icon">
                <Icon name="likes" />
              </span>
              {{newLikesCount || details.likes}}
            </button>
          </div>
          <div class="details__chars">
            <div
              v-for="n in Math.ceil(chars.length / 4)"
              :key="n"
              class="details__chars-col"
            >
              <div
                v-for="item in chars.slice((n - 1) * 4, n * 4)"
                :key="item.id"
                class="details__char"
              >
                <span class="details__char-title">{{ item.title }}</span>
                <span class="details__char-value">{{ item.value }}</span>
              </div>
            </div>
          </div>
          <div class="details__info">
            <div class="details__cost">
              <div class="details__prices">
                <div class="details__price">
                  <p class="details__price-note">цена за весь гарнитур</p>
                  <p class="details__price-value">{{details.price}} ₽</p>
                </div>
                <div class="details__old-price">
                  <p class="details__old-price-value">{{details.old_price}} ₽</p>
                  <p class="details__old-price-note">старая цена</p>
                </div>
              </div>
              <div class="details__credit">
                <p class="details__credit-value">{{ details.installment }} ₽/мес</p>
                <p class="details__credit-note">при оформлении рассрочки</p>
                <Icon
                  class="details__credit-icon"
                  name="leaf"
                />
              </div>
            </div>
            <Button
              small
              class="details__btn"
              modal="calc"
              :modalData="modalData"
            >
              Рассчитать стоимость
            </Button>
          </div>
          <p class="details__desc">{{details.description}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Back from './base/Back'
import Button from './base/Button'
import Icon from './base/Icon'
import Header from './Header'
import DetailSlider from './DetailSlider'
import api from '@/api'

const chars = [
  { id: 1, title: 'Фасады', value: 'МДФ Egger' },
  { id: 2, title: 'Корпус', value: 'МДФ Kronospan' },
  { id: 3, title: 'Столешница', value: 'Влагостойкая' },
  { id: 4, title: 'Доводчики', value: 'Есть' },
  { id: 5, title: 'Страна-производитель', value: 'Россия' },
  { id: 6, title: 'Гарантия', value: '24 месяца' },
  { id: 7, title: 'Рассрочка', value: '0*0*8' }
]

export default {
  name: 'Details',
  components: {
    Back,
    Button,
    Icon,
    Header,
    DetailSlider
  },
  props: {
    details: Object
  },
  data() {
    return {
      chars: chars,
      activeLike: this.details.likes_status !== 'disable',
      sendingLike: false,
      newLikesCount: null
    }
  },
  computed: {
    modalData() {
      return {
        item: this.details.name,
        itemId: this.details.id,
        productType: this.details.product_type,
        price: this.details.price,
        category: `Кухни/${this.details.category_rus}`
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
        id: this.details.id,
        increase: !this.activeLike
      }

      data = JSON.stringify(data)

      api.sendLike(data).then(response => {
        this.activeLike = !this.activeLike
        this.sendingLike = false
        this.newLikesCount = response
      })
    }
  }
}
</script>

<style lang="scss">
.details {
  &__slider {
    margin: 0 (-$container-padding);
  }

  &__nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }

  &__category {
    font-size: 12px;
    line-height: (14/12);
    text-decoration: underline;
    color: $color-gray-middle;
  }

  &__heading {
    margin-top: 14px;
    font-size: 20px;
    line-height: (24/20);
  }

  &__info {
    margin-top: 38px;
  }

  &__prices {
    display: flex;
    align-items: flex-end;
  }

  &__old-price {
    margin-left: 20px;
    color: $color-gray-middle;

    &-value {
      font-weight: 300;
      font-size: 19px;
      text-decoration: line-through;
    }

    &-note {
      font-size: 14px;
    }
  }

  &__price {
    color: $color-blue;

    &-note {
      font-size: 14px;
    }

    &-value {
      font-weight: 300;
      font-size: 40px;
    }
  }

  &__credit {
    position: relative;
    margin-top: 16px;
    max-width: 250px;

    &-value {
      font-weight: 500;
      font-size: 19px;
      color: $color-red;
    }

    &-note {
      font-size: 14px;
      color: $color-gray-middle;
    }

    &-icon {
      position: absolute;
      top: 0;
      right: 0;
      width: 33px;
      height: 35px;
      fill: $color-green;
    }
  }

  &__btn {
    margin-top: 28px;
    width: 100%;
  }

  &__features {
    position: relative;
    margin-left: 12px;
    margin-top: 40px;
    padding: 26px 46px;
    background-color: #efefef;
  }

  &__features-icon {
    position: absolute;
    top: -25px;
    right: -8px;
    width: 33px;
    height: 33px;
    fill: $color-green;
  }

  &__feature {
    position: relative;
    margin-bottom: 20px;
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 12px;
    line-height: (16/12);
    color: $color-blue;

    &::before {
      content: '';
      position: absolute;
      top: 7px;
      right: 100%;
      margin-right: 20px;
      width: 38px;
      height: 2px;
      background-color: $color-blue;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__stats {
    display: flex;
    align-items: center;
    margin-top: 20px;
  }

  &__note {
    display: flex;
    margin-right: 18px;
    font-size: 14px;
    line-height: (14/12);
    color: $color-gray;
  }

  &__note-icon {
    flex-shrink: 0;
    width: 9px;
    height: 9px;
    margin-top: 2px;
    margin-right: 4px;
  }

  &__stat {
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: (17/14);
    color: $color-gray-middle;
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

  &__desc {
    margin-top: 30px;
    font-size: 14px;
    line-height: 2;
  }

  &__chars {
    margin-top: 32px;
    padding-bottom: 15px;
    border-bottom: 1px solid $color-gray;
    font-size: 14px;
  }

  &__char {
    display: flex;
    justify-content: space-between;
    font-family: $font-secondary;
    line-height: 1.7;

    &-value {
      margin-left: 20px;
      font-weight: 700;
    }
  }

  @include media(md) {
    &__slider {
      margin: 0 (-$container-padding-md);
    }

    &__wrapper {
      max-width: 800px;
    }

    &__nav {
      display: block;
      margin-top: 36px;
    }

    &__category {
      margin-top: 24px;
    }

    &__heading {
      margin-top: 10px;
      font-size: 50px;
      line-height: (61/50);
    }

    &__cost {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    &__credit {
      padding-right: 50px;
    }

    &__btn {
      width: 280px;
    }

    &__features {
      margin-top: 10px;
      padding: 26px 34px;
    }

    &__features-icon {
      top: -8px;
      right: -2px;
    }

    &__feature::before {
      margin-right: 14px;
      width: 28px;
    }

    &__stats {
      margin-top: 44px;
    }

    &__desc {
      margin-top: 40px;
      font-size: 14px;
      line-height: (29/14);
    }
  }

  @include media(lg) {
    &__nav {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    &__category {
      margin-top: 0;
      margin-left: 38px;
    }

    &__heading {
      margin-top: 16px;
    }

    &__stats {
      margin-top: 14px;
    }

    &__note {
      margin-right: 58px;
    }

    &__info {
      padding-right: 70px;
    }

    &__features {
      margin-top: 24px;
      padding: 26px 30px;
    }

    &__desc {
      margin-top: 30px;
    }
  }

  @include media(lg2) {
    &__slider {
      margin-left: 0;
    }

    &__slider-col {
      order: 1;
    }

    &__nav {
      margin-top: 20px;
    }

    &__info {
      padding-right: 0;
    }

    &__chars {
      display: flex;
      justify-content: space-between;
      padding-bottom: 34px;

      &-col {
        width: calc(50% - 10px);
      }
    }

    &__cost {
      display: flex;
    }

    &__credit {
      max-width: 190px;
    }

    &__desc {
      font-size: 16px;
      line-height: 1.6;
    }

    &__features {
      display: none;
    }
  }

  @include media(xl) {
    &__wrapper {
      padding-right: 30px;
    }

    &__heading {
      margin-top: 12px;
    }

    &__chars {
      max-width: 700px;

      &-col {
        width: calc(50% - 45px);
      }
    }

    &__cost {
      justify-content: flex-start;
    }

    &__credit {
      margin-left: 50px;
      max-width: 250px;
    }

    &__features {
      display: block;
      margin-top: 10px;
    }

    &__features-icon {
      top: -26px;
    }

    &__slider {
      margin-top: 0;
      margin-left: 0;
      margin-right: -$container-padding-xl;
    }
  }

  @include media(1800) {
    &__price {
      &-value {
        font-size: 50px;
      }
    }
    &__credit {
      margin-left: 72px;
    }
  }
}
</style>
