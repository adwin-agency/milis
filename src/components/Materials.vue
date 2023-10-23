<template>
  <div
    :class="[
      'materials',
      {'materials_info': info}
    ]"
  >
    <h2 class="materials__heading">Наши материалы</h2>
    <p class="materials__text" v-if="!info"><b>Более 250 видов</b> корпусов, фасадов и столешниц. Наш дизайнер поможет подобрать идеальное сочетание цветов и фактур для вашей кухни.</p>  
    <div class="materials__wrapper">
      <div class="materials__items">
        <div class="materials__item">
          <div class="materials__image">
            <img src="../assets/img/materials-04.jpg" alt="">
          </div>
          <div class="materials__badge">
            <span class="materials__badge-num">500+</span>
            <span class="materials__badge-text">цветов и{{'\xa0'}}фактур</span>
          </div>
          <div class="materials__title">
            <p>Фасады мдф</p>
            <div class="materials__info">
              <span class="materials__info-open" @click="setActiveItem('m1')">
                <Icon name="info" class="materials__info-icon" />
              </span>
              <div class="materials__info-box" :class="{'active': activeItem === 'm1'}">
                <p class="materials__info-title">Фасады МДФ</p>
                <p class="materials__info-desc">Egger — лидеры рынка древесно-стружечных материалов. У них 2 завода на территории России. Это гарантирует соответствие европейским экологическим стандартам и строгий контроль качества по приемлемым ценам, которые не зависят от колебаний курса валют.</p>
                <span class="materials__info-close" @click="setActiveItem(null)"></span>
              </div>
            </div>
          </div>
          <div class="materials__desc">Австрийское качество от Egger</div>
        </div>
        <div class="materials__item">
          <div class="materials__image">
            <img src="../assets/img/materials-02.jpg" alt="">
          </div>
          <div class="materials__title">
            <p>Корпус</p>
            <div class="materials__info">
              <span class="materials__info-open" @click="setActiveItem('m2')">
                <Icon name="info" class="materials__info-icon" />
              </span>
              <div class="materials__info-box materials__info-box_r" :class="{'active': activeItem === 'm2'}">
                <p class="materials__info-title">Корпус</p>
                <p class="materials__info-desc">Австрийская компания Kronospan уделяет особое внимание безопасности своей продукции. Kronospan сертифицируют продукцию в Калифорнийском совете по воздушным ресурсам (CARB), который подтверждает  экологическую чистоту производства.</p>
                <span class="materials__info-close" @click="setActiveItem(null)"></span>
              </div>
            </div>
          </div>
          <div class="materials__desc">Международный стандарт{{'\xa0'}}от Kronospan</div>
        </div>
        <div class="materials__item">
          <div class="materials__image">
            <img src="../assets/img/materials-05.jpg" alt="">
          </div>
          <p class="materials__title">Столешница</p>
          <div class="materials__desc">Влагостойкие столешницы</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from './base/Icon.vue'
export default {
  components: { Icon },
  name: 'Materials',
  props: {
    info: Boolean
  },
  data() {
    return {
      activeItem: null
    }
  },
  methods: {
    setActiveItem(id) {
      if (!this.$mobile) return

      this.activeItem = id
    }
  }
}
</script>

<style lang="scss">
.materials {
  $b: &;
  $gap: 26px;

  &_info {
    #{$b} {
      &__heading {
        font-size: 34px;
        line-height: (41/34);
      }
    }
  }

  &__heading {
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 34px;
    line-height: (41/34);
    color: $color-blue;
  }

  &__text {
    margin-top: 12px;
    font-size: 14px;
    line-height: (29/14);
    color: $color-black-gray;
  }

  &__items {
    margin-top: 24px;
  }

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    margin-bottom: 15px;
    min-height: 162px;
    border-radius: 10px 0 0 10px;
    padding: 20px;
    padding-left: calc(30% + 26px);
    background-color: #f3f3f3;
  }

  &__image {
    position: absolute;
    left: 0;
    top: 0;
    width: 30%;
    height: 100%;
    border-radius: 10px 0 0 10px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__badge {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: -12px;
    bottom: -8px;
    width: 70px;
    height: 70px;
    padding: 8px;
    border-radius: 50%;
    text-align: center;
    font-weight: bold;
    font-size: 8px;
    line-height: (9/8);
    color: $color-blue;
    background-color: #f3f3f3;
    z-index: 1;

    &-num {
      font-size: 22px;
      line-height: (27/22);
    }

    &-text {
      margin-bottom: 2px;
    }
  }

  &__leaf {
    position: relative;
    margin-top: -12px;
    width: 21px;
    height: 22px;
    fill: $color-green;
  }

  &__title {
    display: flex;
    align-items: center;
    margin-top: 5px;
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 18px;
    line-height: (29/18);
    color: $color-blue;

    > p {
      white-space: nowrap;
    }
  }

  &__info {
    margin-top: 1px;
  }

  &__info-open {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 20px;
    height: 20px;
  }

  &__info-icon {
    width: 15px;
    height: 15px;
    fill: #52C7B1;
  }

  &__info-box {
    position: fixed;
    left: 0;
    top: 100%;
    width: 100%;
    border-radius: 10px 10px 0 0;
    padding: 26px 18px;
    background-color: #fff;
    box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.25);
    opacity: 0;
    transition: opacity .3s ease, transform .3s ease;
    z-index: 11;

    &.active {
      opacity: 1;
      transform: translateY(-100%);
    }
  }

  &__info-title {
    font-weight: 700;
    font-size: 15px;
    line-height: 1.93;
    color: $color-blue;
  }

  &__info-desc {
    margin-top: 10px;
    font-family: $font-primary;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.4;
    color: #7C8096;
  }

  &__info-close {
    position: absolute;
    top: 20px;
    right: 10px;
    width: 35px;
    height: 35px;

    &::before,
    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 18px;
      height: 2px;
      background-color: #C1B8AF;
    }

    &::before {
      transform: rotate(-45deg);
    }

    &::after {
      transform: rotate(45deg);
    }
  }

  &__desc {
    margin-top: 6px;
    font-size: 14px;
    line-height: (19/14);
    color: $color-blue;
  }

  @include media(md) {
    &_info {
      #{$b} {
        &__heading {
          font-size: 44px;
          line-height: (54/44);
        }

        &__wrapper {
          margin: 0;
          overflow: visible;
        }

        &__items {
          flex-wrap: wrap;
          overflow-x: visible;
          padding-bottom: 0;
          margin-bottom: 0;
          margin-top: 30px;
          margin-right: -40px;

          &::before,
          &::after {
            display: none;
          }
        }

        &__item {
          max-width: calc(50% - 36px);
          margin-right: 36px;

          &:last-child {
            margin-right: 36px;
          }
        }
      }
    }

    &__heading {
      font-size: 44px;
      line-height: (54/44);
    }

    &__text {
      font-size: 16px;
      line-height: (28/16);
    }

    &__wrapper {
      margin: 0 (-$container-padding-md);
      overflow: hidden;
    }

    &__items {
      display: flex;
      flex-wrap: nowrap;
      overflow-x: scroll;
      margin-top: 24px;
      padding-bottom: 20px;
      margin-bottom: -20px;

      &::before,
      &::after {
        content: "";
        flex-shrink: 0;
        width: $container-padding-md;
      }
    }

    &__item {
      margin-right: 36px;
      flex: 1 0 270px;
      padding-left: 120px;

      &:last-child {
        margin-right: 0;
      }
    }

    &__image {
      width: 100px;
    }

    &__desc {
      font-size: 14px;
    }
  }

  @include media(lg) {
    &_info {
      #{$b} {
        &__heading {
          font-size: 40px;
          line-height: (49/40);
        }
      }
    }

    &__text {
      margin-top: 30px;
      padding-right: 60px;
    }

    &__wrapper {
      margin: 0;
      overflow: visible;
    }

    &__items {
      flex-wrap: wrap;
      overflow-x: visible;
      padding-bottom: 0;
      margin-bottom: 0;
      margin-top: 30px;
      margin-right: -36px;

      &::before,
      &::after {
        display: none;
      }
    }

    &__item {
      max-width: calc(50% - 36px);
      padding-left: 100px;
      padding-right: 10px;

      &:last-child {
        margin-right: 36px;
      }
    }

    &__image {
      width: 90px;
    }

    &__leaf {
      margin-top: -15px;
      margin-left: 5px;
      width: 18px;
      height: 18px;
    }

    &__title {
      font-size: 16px;
      line-height: (26/16);
    }

    &__info {
      position: relative;
    }

    &__info-open {
      cursor: pointer;
      
      &:hover {
        #{$b}__info-icon {
          fill: #52C7B1;
        }

        + #{$b}__info-box {
          opacity: 1;
          pointer-events: all;
        }
      }
    }

    &__info-icon {
      fill: #C6C6C6;
      transition: fill .3s ease;
    }

    &__info-box {
      position: absolute;
      left: -24px;
      top: auto;
      bottom: calc(100% + 20px);
      width: 360px;
      border-radius: 10px;
      padding: 25px 28px;
      pointer-events: none;

      &::before {
        content: "";
        position: absolute;
        left: 35px;
        top: calc(100% - 7px);
        border: 12px solid;
        border-color: #fff transparent transparent #fff;
      }

      &_r {
        left: auto;
        right: -24px;

        &::before {
          left: auto;
          right: 30px;
          border-color: #fff #fff transparent transparent;
        }
      }
    }

    &__info-title {
      display: none;
    }

    &__info-desc {
      margin-top: 0;
      font-size: 13px;
    }

    &__info-close {
      display: none;
    }

    &__desc {
      font-size: 12px;
    }
  }

  @include media(xl) {
    &__heading {
      font-size: 60px;
      line-height: (73/60);
    }

    &__text {
      margin-top: 18px;
    }

    &__items {
      margin-top: 24px;
    }

    &__item {
      padding-left: 120px;
      padding-right: 20px;
    }

    &__image {
      width: 100px;
    }

    &__leaf {
      width: 22px;
      height: 22px;
    }

    &__title {
      font-size: 18px;
      line-height: (29/18);
    }

    &__info-box {
      width: 390px;
    }

    &__desc {
      margin-top: 5px;
      font-size: 14px;
    }
  }
}
</style>
