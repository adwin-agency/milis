<template>
  <div class="discount-banner">
    <div class="discount-banner__circles-l"></div>
    <div
      v-if="$windowWidth >= $breakpoints.md"
      class="discount-banner__circles-r"
    ></div>
    <div class="discount-banner__main">
      <div class="discount-banner__header">
        <p class="discount-banner__title">Скидка <br>на кухни</p>
        <p class="discount-banner__value">
          -47%
          <Icon
            name="leaf"
            class="discount-banner__icon"
          />
        </p>
      </div>
      <p class="discount-banner__date">акция действует {{ promoText }}</p>
      <div class="discount-banner__counter">
        <div class="discount-banner__counter-box">
          <p class="discount-banner__counter-title">До конца <br>акции осталось</p>
          <Counter
            class="discount-banner__counter-items"
            :date="promoEnd"
          />
        </div>
      </div>
    </div>
    <div
      v-if="$windowWidth >= $breakpoints.md"
      class="discount-banner__founders"
    >
      <img
        src="@/assets/img/founders3.png"
        alt
        class="discount-banner__img"
      >
      <p class="discount-banner__note">
        <span>Артём и Мила</span><br>
        дизайнер и главный конструктор,<br>
        основатели компании
      </p>
      <p class="discount-banner__decor">3 простых шага <br>до вашей кухни <br>мечты!</p>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/base/Icon'
import Counter from './Counter.vue'

export default {
  name: 'DiscountBanner',
  components: {
    Icon,
    Counter
  },
  computed: {
    promoText() {
      const text = this.$store.getters.promoText
      // return text ? 'c\xa0' + text[0] + '\xa0по\xa0' + text[1] : null
      return text ? 'до\xa0' + text[1] : null
    },
    promoEnd() {
      return this.$store.state.promoDate?.[1]
    }
  }
}
</script>

<style lang="scss">
.discount-banner {
  position: relative;
  padding: 20px 10px 0;
  background-color: $color-blue;
  color: #fff;
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  &__circles-l {
    position: absolute;
    left: -324px;
    top: -380px;
    width: 760px;
    height: 760px;
    border-radius: 50%;
    background-color: rgba(#e4e4e4, 0.03);
    pointer-events: none;

    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      border-radius: 50%;
      background-color: rgba(#e4e4e4, 0.06);
      transform: translate(-50%, -50%);
    }

    &::before {
      width: 508px;
      height: 508px;
    }

    &::after {
      width: 284px;
      height: 284px;
    }
  }

  &__main {
    position: relative;
  }

  &__header {
    display: flex;
    align-items: center;
  }

  &__title {
    position: relative;
    font-family: $font-secondary;
    font-weight: 700;
    font-size: 29px;
    line-height: 90%;
  }

  &__value {
    display: inline-block;
    position: relative;
    margin-left: 8px;
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 55px;
    line-height: 100%;
    z-index: 1;
  }

  &__icon {
    position: absolute;
    top: -12px;
    right: -7px;
    width: 28px;
    height: 30px;
    fill: $color-green;
    z-index: -1;
  }

  &__date {
    display: inline-block;
    margin-top: 20px;
    border-radius: 100px;
    padding: 16px 40px;
    font-family: $font-secondary;
    font-weight: 700;
    font-size: 20px;
    line-height: 100%;
    background-color: $color-blue;
  }

  &__counter {
    margin: 16px -10px 0;
    border-radius: 20px 20px 0px 0px;
    padding: 16px 10px;
    background-color: $color-green;

    &-box {
      margin: 0 auto;
      max-width: 300px;
    }

    &-title {
      margin-bottom: 8px;
      font-family: $font-secondary;
      font-weight: 700;
      font-size: 20px;
      line-height: 100%;
    }
  }

  &__founders {
    display: none;
  }

  @include media(sm) {
    &__value {
      margin: 0 auto;
    }

    &__counter {
      &-box {
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: none;
      }

      &-title {
        margin-right: 30px;
      }
    }
  }

  @include media(md) {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 30px 30px 0;

    &__circles-l {
      left: -300px;
    }

    &__circles-r {
      position: absolute;
      right: -190px;
      bottom: -240px;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      background: linear-gradient(
        323.1deg,
        rgba(228, 228, 228, 0.5) 14.01%,
        rgba(228, 228, 228, 0.15) 73.03%
      );
      opacity: 0.3;
      pointer-events: none;

      &::before {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        width: 350px;
        height: 350px;
        border-radius: 50%;
        background: radial-gradient(
          39.93% 39.93% at 51.93% 51.85%,
          rgba(228, 228, 228, 0) 63.02%,
          rgba(228, 228, 228, 0.4) 100%
        );
        transform: translate(-50%, -50%);
      }
    }

    &__value {
      margin: 0;
      margin-left: 30px;
    }

    &__counter {
      margin: 0;
      margin-top: -26px;
      margin-left: -30px;
      padding: 48px 30px 20px;

      &-title {
        max-width: 120px;
      }
    }

    &__founders {
      display: block;
      position: relative;
      margin-left: -280px;
      margin-right: -60px;
      width: 280px;

      &::before {
        content: '';
        position: absolute;
        right: 0;
        bottom: -80px;
        width: 280px;
        height: 280px;
        border-radius: 50%;
        background-color: #e4e4e4;
      }
    }

    &__img {
      position: relative;
      width: 360px;
      margin-left: -70px;
      margin-bottom: -15px;
    }

    &__note {
      position: absolute;
      left: 5px;
      bottom: 12px;
      border-bottom-left-radius: 20px 60px;
      padding: 12px 18px;
      font-family: $font-secondary;
      font-style: italic;
      font-weight: 600;
      font-size: 10px;
      line-height: 100%;
      color: $color-blue;
      background: linear-gradient(
        -45deg,
        transparent 16px,
        rgba(#e4e4e4, 0.9) 16px
      );

      span {
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 162.6%;
        color: #000000;
      }
    }

    &__decor {
      position: absolute;
      left: 0;
      bottom: 95%;
      text-align: center;
      font-family: $font-decorative;
      font-weight: 400;
      font-size: 36px;
      line-height: 0.5;
      transform: rotate(-10.32deg);
    }
  }

  @include media(lg) {
    padding: 40px 40px 0;

    &__circles-l {
      left: -420px;
      top: -550px;
      width: 1152px;
      height: 1152px;

      &::before {
        width: 772px;
        height: 772px;
      }

      &::after {
        width: 430px;
        height: 430px;
      }
    }

    &__circles-r {
      right: -320px;
      bottom: -350px;
      width: 904px;
      height: 904px;

      &::before {
        width: 518px;
        height: 518px;
      }
    }

    &__main {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    &__title {
      font-size: 59px;
    }

    &__value {
      margin-left: 40px;
      font-size: 105px;
    }

    &__icon {
      top: -20px;
      right: -12px;
      width: 52px;
      height: 54px;
    }

    &__date {
      position: relative;
      margin-top: 24px;
      max-width: 360px;
    }

    &__counter {
      margin-top: -32px;
      margin-left: -40px;
      border-radius: 0 95px 0 0;
      padding: 64px 75px 30px 44px;

      &-box {
        justify-content: flex-start;
        align-items: flex-start;
      }

      &-title {
        margin-right: 10px;
        margin-bottom: 0;
        max-width: 230px;
        padding-right: 30px;
        font-size: 30px;
      }
    }

    &__founders {
      width: 364px;
      margin-left: -364px;
      margin-right: -90px;

      &::before {
        bottom: -96px;
        width: 364px;
        height: 364px;
      }
    }

    &__note {
      padding-left: 30px;
    }

    &__img {
      width: 550px;
      margin-left: -120px;
      margin-bottom: -25px;
    }

    &__decor {
      left: -80px;
      bottom: 92%;
      font-size: 70px;
    }
  }

  @include media(xl) {
    &__circles-r {
      right: -390px;
      bottom: -500px;
      width: 1276px;
      height: 1276px;

      &::before {
        width: 730px;
        height: 730px;
      }
    }

    &__founders {
      width: 506px;
      margin-left: -506px;
      margin-right: -110px;

      &::before {
        bottom: -134px;
        width: 506px;
        height: 506px;
      }
    }

    &__img {
      width: 750px;
      margin-top: -50px;
      margin-left: -150px;
      margin-bottom: -30px;
    }

    &__note {
      bottom: 16px;
      border-bottom-left-radius: 30px 80px;
      padding: 22px;
      padding-left: 40px;
      font-size: 14px;
      background: linear-gradient(
        -45deg,
        transparent 26px,
        rgba(228, 228, 228, 0.9) 26px
      );

      span {
        font-size: 24px;
      }
    }

    &__decor {
      left: -300px;
      bottom: 72%;
      font-size: 78px;
    }
  }

  @include media(1800) {
    &__decor {
      left: -320px;
      bottom: 62%;
      font-size: 90px;
    }
  }
}
</style>
