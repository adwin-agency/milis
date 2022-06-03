<template>
  <div class="discount-banner">
    <div class="discount-banner__header">
      <div class="discount-banner__circle">
        <div class="discount-banner__circle-bg"></div>
        <p class="discount-banner__title">Скидка<br>на кухни</p>
      </div>
      <p class="discount-banner__value">
        -47%
        <Icon
          name="leaf"
          class="discount-banner__icon"
        />
      </p>
    </div>
    <p class="discount-banner__date">акция действует {{ promoText }}</p>
    <!-- <div class="discount-banner__founders">
      <p class="discount-banner__note">Основатели <br>компании Милис<br>Артем и Мила</p>
      <img
        src="@/assets/img/founders3.png"
        alt
        class="discount-banner__img"
      >
    </div> -->
    <div class="discount-banner__counter">
      <p class="discount-banner__counter-title">До конца <br>акции осталось</p>
      <div class="discount-banner__counter-box">
        <Counter :date="promoEnd" />
      </div>
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
  background-color: $color-blue;
  color: #fff;
  overflow: hidden;

  &__header {
    display: flex;
  }

  &__circle {
    position: relative;
    padding: 20px 25px;

    &-bg {
      position: absolute;
      left: 45%;
      top: 20%;
      width: 766px;
      height: 766px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      transform: translate(-50%, -50%);
      pointer-events: none;

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
        width: 315px;
        height: 315px;
        background: rgba(255, 255, 255, 0.2);
      }

      &::after {
        width: 184px;
        height: 184px;
        background: rgba(255, 255, 255, 0.8);
      }
    }
  }

  &__title {
    position: relative;
    font-family: $font-secondary;
    font-weight: 700;
    font-size: 24px;
    line-height: 100%;
    color: $color-blue;
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
    position: relative;
    margin-top: 32px;
    margin-left: 10px;
    border-radius: 100px;
    width: 230px;
    padding: 8px 30px;
    font-family: $font-secondary;
    font-weight: 700;
    font-size: 16px;
    line-height: 100%;
    color: #ffffff;
    background-color: $color-blue;
  }

  &__founders {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    position: relative;
    margin-top: -20px;

    &::before {
      content: '';
      position: absolute;
      right: -50px;
      bottom: -80px;
      width: 210px;
      height: 210px;
      border-radius: 50%;
      background-color: #e4e4e4;
    }
  }

  &__counter {
    position: relative;
    margin-top: 36px;
    border-radius: 30px 30px 0px 0px;
    padding: 20px;
    background-color: $color-green;

    &-title {
      margin-bottom: 16px;
      font-family: $font-secondary;
      font-weight: 700;
      font-size: 18px;
      line-height: 100%;
      color: $color-blue;
    }
  }

  &__note {
    margin-right: -70px;
    flex-shrink: 0;
    padding: 16px 30px 16px 30px;
    font-family: $font-secondary;
    font-weight: 500;
    font-size: 14px;
    line-height: 100%;
    text-align: right;
    color: #ffffff;
    background-image: linear-gradient(135deg, transparent 20px, #b9bbc6 20px);
  }

  &__img {
    position: relative;
    margin-right: -60px;
    margin-bottom: -20px;
    width: 276px;
  }
  
  @include media(400) {
    &__date {
      margin-left: auto;
      margin-top: 10px;
      margin-right: auto;
    }

    &__counter {
      display: flex;
      align-items: center;

      &-title {
        flex: 1;
        margin-top: 4px;
        margin-right: 10px;
      }
    }
  }

  @include media(550) {
    display: grid;
    grid-template-columns: 300px 1fr;

    &__date {
      display: flex;
      align-items: center;
      margin-top: 0;
      margin-left: 30px;
      border-radius: 0 0 0 30px;
    }

    &__counter {
      grid-column: 1/3;
      width: 500px;
      margin: 50px auto 0;
    }
  }

  @include media(md) {
    grid-template-columns: 50% 1fr;

    &__value {
      margin-left: 50px;
    }

    &__counter {
      margin-top: 20px;
    }
  }

  @include media(lg) {
    grid-template-columns: auto 1fr;
    align-items: start;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

    &__circle-bg::after {
      background: #fff;
    }

    &__value {
      margin-left: 10px;
    }

    &__date {
      grid-row: 2/3;
      border-radius: 100px;
      margin-left: 6px;
      margin-bottom: 16px;
      width: auto;
      padding: 8px 18px;
      font-size: 14px;
    }

    &__founders {
      display: none;
    }

    &__counter {
      flex-direction: column;
      align-items: flex-end;
      grid-column: 2/3;
      grid-row: 1/3;
      margin-right: 0;
      width: auto;
      padding: 0;
      background-color: transparent;

      &-title {
        text-align: right;
        color: #fff;
      }

      &-box {
        border-radius: 30px 0 0 0;
        padding: 20px 14px 14px;
        background-color: $color-green;
      }
    }
  }

  @include media(xl) {
    &__circle-bg::after {
      width: 200px;
      height: 200px;
    }
    
    &__title {
      font-size: 26px;
    }

    &__value {
      margin-top: 5px;
      margin-left: 30px;
      margin-right: -30px;
      font-size: 58px;
    }

    &__date {
      margin-left: 20px;
      margin-right: 50px;
      font-size: 16px;
    }

    &__counter {
      margin-left: -30px;

      &-title {
        margin-right: 14px;
        font-size: 20px;
      }
    }
  }
}
</style>
