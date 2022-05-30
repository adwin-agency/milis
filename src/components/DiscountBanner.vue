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
      <Counter :date="promoEnd" />
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
      return text ? 'c\xa0' + text[0] + '\xa0по\xa0' + text[1] : null
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
      background: rgba(255, 255, 255, 0.3);
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
        background-color: rgba(12, 215, 37, 0.2);
      }

      &::after {
        width: 184px;
        height: 184px;
        background-color: $color-green;
      }
    }
  }

  &__title {
    position: relative;
    font-family: $font-secondary;
    font-weight: 700;
    font-size: 24px;
    line-height: 100%;
    color: #ffffff;
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
    display: inline-flex;
    flex-wrap: wrap;
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
    grid-column: 2/3;
    grid-row: 1/3;
    margin: 32px auto 20px;
    max-width: 280px;

    &-title {
      font-family: $font-secondary;
      font-weight: 700;
      font-size: 18px;
      line-height: 100%;
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

  @include media(xs) {
    &__value {
      margin: 20px auto 0;
    }

    &__date {
      margin-top: 20px;
    }

    &__founders {
      margin-top: -15%;
    }
  }

  @include media(600) {
    &__value {
      margin: 0;
    }

    &__date {
      margin-top: 32px;
    }

    &__founders {
      margin-top: -120px;
    }

    &__counter {
      margin-top: -120px;
      margin-right: 20px;
      max-width: 230px;

      &-title {
        text-align: right;
      }
    }
  }

  @include media(md) {
    &__value {
      margin-left: 50px;
    }

    &__date {
      margin-left: 80px;
    }

    &__founders {
      margin-top: -170px;

      &::before {
        right: -30px;
        width: 280px;
        height: 280px;
      }
    }

    &__note {
      margin-right: -100px;
    }

    &__img {
      width: 396px;
    }
  }

  @include media(lg) {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: start;
    padding-bottom: 24px;

    &__value {
      margin-left: 0;
      margin-top: 10px;
    }

    &__date {
      justify-self: start;
      margin-left: 15px;
      margin-top: 5px;
      width: auto;
      padding: 8px 18px;
      font-size: 14px;
    }

    &__founders {
      display: none;
    }

    &__counter {
      margin-top: 32px;
      margin-left: 20px;
      margin-bottom: 0;
      max-width: none;
    }
  }

  @include media(xl) {
    &__date {
      margin-left: 35px;
      margin-top: 0;
    }

    &__counter-item {
      width: 60px;
      height: 70px;
      font-size: 25px;
    }
  }
}
</style>
