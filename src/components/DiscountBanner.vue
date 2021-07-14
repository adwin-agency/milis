<template>
  <div class="discount-banner">
    <div class="discount-banner__circle"></div>
    <div class="discount-banner__inner">
      <template v-if="$windowWidth < $breakpoints.md">
        <p class="discount-banner__title">со<br>скидкой</p>
        <div class="discount-banner__details">
          <p class="discount-banner__value">
            -47%
            <Icon name="leaf" class="discount-banner__icon" />
          </p>
          <p class="discount-banner__date">до 01.09</p>
        </div>
      </template>
      <template v-else>
        <div class="discount-banner__top">
          <p class="discount-banner__title">Скидки<br>на кухни</p>
          <p class="discount-banner__value">
            -47%
            <Icon name="leaf" class="discount-banner__icon" />
          </p>
        </div>
        <p class="discount-banner__date">до 01.09</p>
        <div class="discount-banner__img">
          <img src="@/assets/img/founders3.png" alt>
        </div>
      </template>      
    </div>
  </div>
</template>

<script>
import Icon from '@/components/base/Icon'

export default {
  name: 'DiscountBanner',
  components: {
    Icon
  }
}
</script>

<style lang="scss">
.discount-banner {
  position: relative;  
  background-color: $color-blue;
  color: #fff;
  overflow: hidden;

  &__circle {
    position: absolute;
    left: -21px;
    top: -23px;
    width: 143px;
    height: 143px;
    border-radius: 50%;
    background-color: $color-green;

    &::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      width: 194px;
      height: 194px;
      border-radius: 50%;
      background-color: rgba($color-green, 0.5);
      transform: translate(-45%, -45%);
    }
  }

  &__inner {
    display: flex;
    position: relative;
    padding: 22px 20px;
  }

  &__title {
    flex-shrink: 0;
    margin-right: auto;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 24px;
    line-height: (29/24);
  }

  &__details {
    margin-right: calc(50% - 80px);
    text-align: center;
    transform: translateX(30%);
  }

  &__value {
    position: relative;
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 50px;
    line-height: (81/50);
    z-index: 1;
  }

  &__icon {
    position: absolute;
    top: 0;
    right: 0;
    width: 37px;
    height: 39px;
    fill: $color-green;
    z-index: -1;
  }

  &__date {
    border-top: 2px solid #fff;
    padding-top: 5px;
    font-weight: 500;
    font-size: 30px;
    line-height: (49/30);
  }

  @include media(md) {
    &__inner {
      flex-direction: column;
      height: 100%;
      padding: 14px 35px;
    }

    &__top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__title {
      text-transform: none;
    }

    &__value {
      margin-left: 12px;
      margin-right: 8px;
    }

    &__date {
      margin: 15px auto auto;
    }

    &__img {
      position: relative;
      margin: -80px -35px -14px auto;
      width: calc(100% + 35px);
      pointer-events: none;

      &::before {
        content: "";
        position: absolute;
        right: -80px;
        bottom: -35px;
        width: 103%;
        padding-top: 103%;
        border-radius: 50%;
        background-color: #E4E4E4;
      }

      img {
        position: relative;
      }
    }
  }

  @include media(lg) {
    &__inner {
      padding: 14px 20px;
    }

    &__value {
      font-size: 40px;
    }

    &__img {
      margin-right: -20px;
      width: calc(100% + 20px);
    }
  }

  @include media(xl) {
    &__inner {
      padding: 14px 35px;
    }

    &__value {
      font-size: 50px;
      margin-right: 8px;
    }

    &__img {
      margin-right: -35px;
      width: calc(100% + 35px);
    }
  }
}
</style>
