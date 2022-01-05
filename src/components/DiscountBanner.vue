<template>
  <div class="discount-banner">
    <div class="discount-banner__circle"></div>
    <div class="discount-banner__inner">
      <p class="discount-banner__title">Скидка<br>на кухни</p>
      <div class="discount-banner__details">
        <p class="discount-banner__value">
          -47%
          <Icon name="leaf" class="discount-banner__icon" />
        </p>
        <p class="discount-banner__date">с 30 декабря <br>по 10 января</p>
      </div>
      <div
        v-if="$windowWidth >= $breakpoints.md"
        class="discount-banner__founders"
      >
        <p class="discount-banner__note">Основатели компании Милис<br>Артем и Мила</p>
        <img src="@/assets/img/founders3.png" alt class="discount-banner__img">
      </div>
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
    left: -75px;
    top: -65px;
    width: 226px;
    height: 226px;
    border-radius: 50%;
    background-color: rgba($color-green, 0.5);

    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      border-radius: 50%;      
      transform: translate(-50%, -50%);
    }

    &::before {
      width: 474px;
      height: 474px;
      background-color: rgba(120, 144, 207, 0.4);
      transform: translate(-44%, -55%);
    }

    &::after {
      width: 143px;
      height: 143px;
      background-color: $color-green;
    }
  }

  &__inner {
    display: flex;
    position: relative;
    padding: 22px 20px 52px;
  }

  &__title {
    flex-shrink: 0;
    margin-right: 5px;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 24px;
    line-height: (29/24);
  }

  &__details {
    flex-shrink: 0;
    margin: 0 auto;
  }

  &__value {
    display: inline-block;
    position: relative;
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 50px;
    line-height: (81/50);
    z-index: 1;
  }

  &__icon {
    position: absolute;
    top: 5px;
    right: -12px;
    width: 37px;
    height: 39px;
    fill: $color-green;
    z-index: -1;
  }

  &__date {
    margin-top: -10px;
    margin-left: -20px;
    font-weight: 500;
    font-size: 24px;
  }

  @include media(xs) {
    &__date {
      font-size: 30px;
    }
  }

  @include media(md) {
    &__circle {
      left: -62px;
    }

    &__inner {
      padding: 18px 20px 52px;
    }

    &__title {
      margin-right: 12px;
    }

    &__details {
      margin-left: 0;
    }

    &__date {
      margin-left: 45px;
      border-bottom: 2px solid #fff;
    }

    &__founders {
      display: flex;
      position: relative;
      margin-top: 15px;
      margin-right: -20px;
      margin-bottom: -52px;
      width: 390px;

      &::before {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        width: 285px;
        height: 285px;
        border-radius: 50%;
        background-color: #E4E4E4;
        transform: translate(-37%, -25%);        
      }
    }

    &__note {
      position: absolute;
      bottom: 34px;
      right: 65%;
      padding: 10px 68px 10px 22px;
      font-style: italic;
      font-weight: 300;
      font-size: 14px;
      line-height: (15/14);
      text-align: right;
      white-space: nowrap;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 16px 100%, 0 calc(100% - 16px));
      background-color: rgba(196, 196, 196, 0.4);
      backdrop-filter: blur(68px);
    }

    &__img {
      position: relative;
      margin-top: auto;
    }
  }

  @include media(lg) {
    &__inner {
      min-height: 230px;
    }

    &__date {
      margin-left: -15px;
      margin-bottom: 40px;
    }
  }

  @include media(xl) {
    &__date {
      margin-left: 45px;
    }
  }
}
</style>
