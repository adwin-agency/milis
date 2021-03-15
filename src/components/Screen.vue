<template>
  <div class="screen">
    <div class="container screen__container">
      <div class="row screen__row">
        <div class="col col-12 col-lg-6 col-xl-7 screen__images-col">
          <div class="screen__images">
            <ScreenSlider
              class="screen__slider"
              :first="first"
              :anim="anim"
              :active="active"
              :kitchen="kitchen"
            />
            <div class="screen__additional" v-if="!$mobile">
              <Preview
                class="screen__preview"
                :first="first"
                v-anim="first && {delay: 250}"
              />
              <RouterLink
                :to="{name: 'category', params: {category: kitchen.category}}"
                class="screen__similar"
                :class="{'fade-slide-left js-anim': first}"
                v-anim="first && {delay: 500}"
              >
                <span class="screen__similar-text">Посмотреть <br>похожие кухни</span>
                <span class="screen__similar-icon">
                  <Icon name="arrow-right" />
                </span>
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="col col-12 col-lg-6 col-xl-5 screen__content-col">          
          <div class="screen__content">
            <div
              class="screen__info"
              :class="{'fade-slide-right js-anim': first}"
              v-anim="first && {delay: 250}"
            >
              <RouterLink :to="{name: 'category', params: {category: kitchen.category}}" class="screen__category">{{kitchen.category_rus}}</RouterLink>
              <span class="screen__note">
                <span class="screen__note-icon">
                  <Icon name="check" />
                </span>
                Кухня сделана на заказ</span>
              <h2 class="screen__heading">
                <RouterLink :to="{name: 'product', params: {category: kitchen.category, kitchen: kitchen.url}}">{{kitchen.name}}</RouterLink>  
              </h2>
              <p class="screen__price">от 
                <span class="screen__price-num">{{kitchen.price}} ₽<span>*</span></span>
              </p>
              <p class="screen__price-note"><span>*</span>за весь гарнитур</p>
              <Button
                class="screen__btn"
                modal="calc"
                :modalData="modalData"
              >
                Рассчитать стоимость
              </Button>
            </div>
            <div
              class="screen__next"
              :class="{'fade-slide-up js-anim': first}"
              v-anim="first"
            >
              <p
                v-if="nextKitchen"
                class="screen__next-category"
              >
                {{nextKitchen.category_rus}}
              </p>
              <p class="screen__next-title">
                <span class="screen__next-icon">
                  <Icon name="arrow-down" />
                </span>
                {{nextKitchen ? nextKitchen.name : 'О нас'}}
              </p>
            </div>
          </div>
        </div>        
      </div>
    </div>
  </div>
</template>

<script>
import Icon from './base/Icon'
import Button from './base/Button'
import ScreenSlider from './ScreenSlider'
import Preview from './Preview'

export default {
  name: 'Screen',
  components: {
    Icon,
    Button,
    ScreenSlider,
    Preview
  },
  props: {
    first: Boolean,
    anim: Boolean,
    active: Boolean,
    kitchen: Object,
    nextKitchen: Object
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
.screen {
  $b: &;

  &__container {
    height: 100%;
  }

  &__row {
    height: 100%;
    flex-direction: column;
  }

  &__images-col {
    flex: 1;
  }

  &__images {
    margin: 0 (-$container-padding);
    height: 100%;
  }

  &__slider {
    height: 100%;
  }

  &__additional {
    display: flex;
  }

  &__preview {
    flex: 1;
  }

  &__similar {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    flex-shrink: 0;
    padding: 26px 10px 10px 16px;
    font-family: $font-secondary;
    font-size: 10px;
    line-height: (15/10);
    text-decoration: underline;
    color: $color-gray;

    &::before,
    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      transition: opacity .3s ease;
    }

    &::before {
      background: $gradient-blue;
    }

    &::after {
      opacity: 0;
      background: #1961AF;
    }

    &:hover {
      &::before {
        opacity: 0;
      }

      &::after {
        opacity: 1;
      }
    }
  }

  &__similar-text,
  &__similar-icon {
    position: relative;
    z-index: 1;
  }

  &__similar-icon {
    flex-shrink: 0;
    width: 17px;
    height: 17px;
    margin-left: 3px;
    fill: currentColor;
  }

  &__content {
    padding: 14px 0 16px;
  }

  &__category {
    font-size: 14px;
    line-height: (16/14);
    text-decoration: underline;
    color: $color-gray;
  }

  &__note {
    display: none;
    margin-left: 70px;
    font-family: $font-secondary;
    font-size: 10px;
    line-height: (12/10);
    color: $color-black-gray;
  }

  &__note-icon {
    display: inline-block;
    width: 9px;
    height: 9px;
    margin-right: 3px;
  }

  &__heading {
    margin-top: 8px;
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 20px;
    line-height: (24/20);
    color: $color-blue;
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
    font-size: 12px;
    color: $color-blue;

    span {
      color: $color-red;
    }
  }

  &__btn {
    margin-top: 10px;
    width: 100%;
  }

  &__next {
    margin-top: 14px;
    margin-left: auto;
    width: 50%;
    font-family: $font-secondary;
  }

  &__next-category {
    display: none;
    margin-left: 4px;
    margin-bottom: 4px;
    font-size: 8px;
    text-decoration: underline;
    color: $color-gray;
  }

  &__next-title {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-weight: bold;
    font-size: 12px;
    line-height: (15/12);
    color: $color-blue;
  }

  &__next-icon {
    margin-right: 10px;
    width: 11px;
    height: 11px;
    transform: rotate(-90deg);
  }

  @include media(md) {
    &__images {
      margin: 0 (-$container-padding-md);
    }

    &__content {
      padding: 82px 0 66px;
    }

    &__note {
      display: inline;
    }

    &__heading {
      font-size: 60px;
      line-height: (73/60);
    }

    &__price {
      margin-top: 10px;
    }

    &__price-num {
      margin-left: 10px;
      font-size: 60px;
    }
    
    &__price-note {
      margin-top: 5px;
    }

    &__btn {
      margin-top: 30px;
      width: auto;
      min-width: 320px;
    }

    &__next {
      margin-top: 44px;
    }

    &__next-title {
      font-size: 14px;
    }

    &__next-icon {
      width: 13px;
      height: 13px;
    }
  }

  @include media(lg) {
    &__row {
      flex-direction: row;
    }

    &__content {
      display: flex;
      align-items: center;
      position: relative;
      height: 100%;
      padding: 120px 0px 80px 96px;
    }

    &__note {
      margin-left: 64px;
    }

    &__heading {
      font-size: 44px;
      line-height: (54/44);
    }

    &__price-num {
      font-size: 50px;
    }

    &__btn {
      margin-top: 36px;
    }

    &__next {
      position: absolute;
      left: 120px;
      bottom: 30px;
    }

    &__next-category {
      display: block;
    }
    
    &__next-icon {
      position: absolute;
      left: -22px;
      bottom: 4px;
      width: 11px;
      height: 11px;
      transform: none;
    }

    &__next-title {
      display: block;
      position: relative;
      font-size: 18px;
    }

    &__images-col {
      flex: initial;
      order: 1;
    }

    &__images {
      display: flex;
      flex-direction: column;
      margin-left: 0;
    }

    &__slider {
      flex: 1;
      height: auto;
    }
  }

  @include media(xl) {
    &__content {
      padding: 150px 0 150px 132px;
    }

    &__heading {
      font-size: 60px;
      line-height: (73/60);
    }

    &__price-num {
      font-size: 60px;
    }

    &__price-note {
      font-size: 14px;
    }

    &__btn {
      margin-top: 32px;
    }

    &__next {
      left: 130px;
      bottom: 22px;
    }

    &__images {
      margin-left: 65px;
      margin-right: -$container-padding-xl;
    }

    &__similar {
      padding: 68px 56px 56px 64px;
      font-size: 12px;
      line-height: (18/12);
    }

    &__similar-icon {
      margin-left: 10px;
      width: 26px;
      height: 26px;
    }
  }
}
</style>
