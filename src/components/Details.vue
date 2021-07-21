<template>
  <div class="details page-top">
    <div class="row">
      <div class="col col-12 col-lg-6" v-if="$windowWidth < $breakpoints.xl">
        <Header class="page-header fade-slide-down js-anim" v-anim="true" />
      </div>
      <div class="col col-12" v-if="$windowWidth < $breakpoints.xl"></div>
      <div class="col col-12 col-lg2-7 details__slider-col">
        <DetailSlider
          class="details__slider"
          :details="details"
        />
      </div>
      <div class="col col-12 col-lg-9 col-lg2-5">
        <Header class="page-header fade-slide-down js-anim" v-anim="true" v-if="$windowWidth >= $breakpoints.xl" />
        <div class="details__wrapper fade-bounce-right js-anim" v-anim="true">
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
          <div class="details__info">
            <div class="details__cost">
              <div class="details__prices">
                <p
                  v-if="details.old_price"
                  class="details__old-price"
                >
                  {{details.old_price}} ₽
                </p>
                <p class="details__price">
                  <span class="details__price-num">{{details.price}} ₽<span>*</span></span>
                </p>
                <p class="details__price-note"><span>*</span>за весь гарнитур</p>
              </div>
              <Button
                small
                class="details__btn"
                modal="quiz"
                :modalData="modalData"
              >
                Рассчитать стоимость
              </Button>
            </div>          
            <div class="details__features">
              <div class="details__features-icon">
                <Icon name="leaf" />
              </div>
              <p class="details__feature">Рассрочка 0˙0˙6</p>
              <p class="details__feature">Гарантия 2 года</p>
              <p class="details__feature">Бесплатный 3D проект </p>
            </div>
          </div>
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
                <Icon name="likes"/>
              </span>
              {{newLikesCount || details.likes}}
            </button>
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
        productType: this.details.product_type
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

      api.sendLike(data)
        .then(response => {
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
    margin-top: 4px;
  }

  &__prices {    
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  &__old-price {
    margin-right: 20px;    
    font-weight: 200;
    font-size: 18px;
    line-height: (14/12);
    text-decoration: line-through;
    color: $color-gray-middle;
  }

  &__price {
    font-weight: 300;
    font-size: 20px;
    line-height: (23/20);
    color: $color-blue;
  }

  &__price-num {
    font-size: 30px;

    span {
      color: $color-red;
    }
  }

  &__price-note {
    margin-top: 2px;
    width: 100%;
    font-size: 12px;
    color: $color-blue;

    span {
      color: $color-red;
    }
  }

  &__btn {
    margin-top: 12px;
    width: 100%;
  }

  &__features {
    position: relative;
    margin-left: 12px;
    margin-top: 40px;
    padding: 26px 46px;
    background-color: #EFEFEF;
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
      content: "";
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
    margin-top: 27px;
  }

  &__note {
    display: flex;
    margin-right: 80px;
    font-size: 12px;
    line-height: (14/12);
    color: $color-gray;
  }

  &__note-icon {
    flex-shrink: 0;
    width: 9px;
    height: 9px;
    margin-right: 4px;
  }

  &__stat {
    display: flex;
    align-items: center;
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

  &__desc {
    margin-top: 17px;
    font-size: 12px;
    line-height: (24/12);
  }

  @include media(md) {
    &__slider {
      margin: 0 (-$container-padding-md);
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

    &__info {
      display: flex;
      align-items: flex-start;
      margin-top: 6px;
    }

    &__cost {
      flex: 1;
      margin-right: 20px;
    }

    &__old-price {
      margin-top: 16px;
      margin-right: 36px;
      font-size: 28px;
      line-height: (46/28);
    }

    &__price {
      font-size: 22px;
      line-height: (36/22);
    }

    &__price-num {
      font-size: 50px;
    }

    &__price-note {
      margin-top: 0;
    }

    &__btn {
      margin-top: 26px;
      width: auto;
      min-width: 280px;
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
    &__slider {
      margin-top: 30px;
    }

    &__heading {
      margin-top: 16px;
    }

    &__info {
      padding-right: 70px;
    }

    &__features {
      margin-top: 24px;
      padding: 26px 30px;
    }

    &__stats {
      margin-top: 38px;
    }

    &__desc {
      margin-top: 52px;
      padding-right: 30px;
    }
  }

  @include media(lg2) {
    &__slider-col {
      order: 1;
    }

    &__slider {
      margin-left: -54px;
    }

    &__wrapper {
      padding-right: 80px;
    }

    &__info {
      padding-right: 0;
    }

    &__features {
      display: none;
    }
  }

  @include media(xl) {
    &__nav {
      margin-top: 56px;
    }

    &__heading {
      margin-top: 12px;
    }

    &__info {
      padding-right: 36px;
    }

    &__features {
      display: block;
      margin-top: 10px;
    }

    &__features-icon {
      top: -26px;
    }

    &__desc {
      margin-top: 44px;
      font-size: 16px;
      line-height: (33/16);
    }
    
    &__slider {
      margin-top: 0;
      margin-left: 0;
      margin-right: -$container-padding-xl;
    }
  }
}
</style>
