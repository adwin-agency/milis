<template>
  <div class="discount-banner">
    <div class="discount-banner__circles-l"></div>
    <!-- <div
      v-if="$windowWidth >= $breakpoints.md"
      class="discount-banner__circles-r"
    ></div>
    <picture>media(md)
      <source
        :media="`(min-width: ${$breakpoints.xl}px)`"
        srcset="@/assets/img/discount-wash-xl.png"
      >
      <source
        :media="`(min-width: ${$breakpoints.md}px)`"
        srcset="@/assets/img/discount-wash-md.png"
      >
      <img
        src="@/assets/img/discount-wash.png"
        alt=""
        class="discount-banner__pic"
      >
    </picture>
    <div class="discount-banner__header">
      <p class="discount-banner__title">Скидка <br>на всё</p>
      <p class="discount-banner__value">
        -47%
        <Icon
          name="leaf-double"
          class="discount-banner__icon"
        />
      </p>
    </div>
    <p class="discount-banner__date">Акция действует <span>{{ promoText }}</span></p>
    <p class="discount-banner__desc">Каменная мойка <br><span>в{{'\xa0'}}подарок</span> при <br>покупке <br>кухни</p>
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
    </div> -->
    <picture>
      <source
        :media="`(min-width: ${$breakpoints.md}px)`"
        srcset="@/assets/img/discount-banner-ny-md.jpg"
      >
      <img
        src="@/assets/img/discount-banner-ny.jpg"
        alt=""
        class="discount-banner__image"
      >
    </picture>
  </div>
</template>

<script>
// import Icon from '@/components/base/Icon'

export default {
  name: 'DiscountBanner',
  components: {
    // Icon
  },
  computed: {
    promoText() {
      const text = this.$store.getters.promoText
      return text ? 'до\xa0' + text[1] : null
    }
  }
}
</script>

<style lang="scss">
.discount-banner {
  // position: relative;
  // padding: 20px 10px 80px;
  // background-color: $color-blue;
  // color: #fff;
  // box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.1);
  // overflow: hidden;

  &__image {
    margin: 0 auto;
    max-width: 500px;
  }

  &__circles-l {
    position: absolute;
    left: -235px;
    bottom: -303px;
    width: 612px;
    height: 612px;
    border-radius: 50%;
    background-color: rgba(#e4e4e4, 0.03);
    pointer-events: none;

    &::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      border-radius: 50%;
      width: 374px;
      height: 374px;
      background-color: rgba(#e4e4e4, 0.06);
      transform: translate(-50%, -50%);
    }
  }

  &__pic {
    position: absolute;
    left: 0;
    bottom: -15px;
    width: auto;
    pointer-events: none;
  }

  &__header {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__title {
    position: relative;
    font-family: $font-secondary;
    font-weight: 700;
    font-size: 33px;
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
    right: -14px;
    width: 32px;
    height: 32px;
    fill: $color-green;
    z-index: -1;
  }

  &__date {
    margin-top: 12px;
    text-align: center;
    font-family: $font-secondary;
    font-weight: 500;
    font-size: 15px;
    line-height: 100%;

    span {
      font-weight: 700;
    }
  }

  &__desc {
    margin-top: 35px;
    text-align: right;
    font-family: $font-secondary;
    font-weight: 700;
    font-size: 27px;
    line-height: 110%;

    span {
      color: $color-green;
    }
  }

  &__founders {
    display: none;
  }

  @include media(400) {
    &__desc {
      br:last-child {
        display: none;
      }
    }
  }

  @include media(475) {
    &__desc {
      margin-left: 150px;

      br {
        display: none;
      }
    }
  }

  @include media(md) {
    // padding: 80px 80px 106px;

    &__image {
      max-width: none;
    }

    &__circles-l {
      top: -218px;
      left: -240px;
      bottom: auto;
      width: 610px;
      height: 610px;

      &::before {
        width: 426px;
        height: 426px;
      }
    }

    &__circles-r {
      position: absolute;
      right: -200px;
      bottom: -230px;
      width: 572px;
      height: 572px;
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
        width: 368px;
        height: 368px;
        border-radius: 50%;
        background: radial-gradient(
          39.93% 39.93% at 51.93% 51.85%,
          rgba(228, 228, 228, 0) 63.02%,
          rgba(228, 228, 228, 0.4) 100%
        );
        transform: translate(-50%, -50%);
      }
    }

    &__pic {
      top: -5px;
      bottom: auto;
      width: 260px;
    }

    &__title {
      br {
        display: none;
      }
    }

    &__value {
      margin-left: 18px;
    }

    &__date {
      position: relative;
      margin-top: 18px;
      z-index: 1;
    }

    &__desc {
      position: relative;
      margin: 64px auto 0;
      max-width: 450px;
      text-align: center;
      z-index: 1;

      br {
        display: none;
      }
    }

    &__founders {
      display: block;
      position: absolute;
      right: 0;
      bottom: 0;

      &::before {
        content: '';
        position: absolute;
        right: -36px;
        bottom: -68px;
        width: 262px;
        height: 262px;
        border-radius: 50%;
        background-color: #e4e4e4;
      }
    }

    &__img {
      position: absolute;
      right: -80px;
      bottom: -14px;
      width: 380px;
    }

    &__note {
      position: absolute;
      right: 10px;
      bottom: 12px;
      width: 200px;
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
  }

  @include media(lg) {
    &__circles-l {
      top: -328px;
      left: -364px;
      width: 917px;
      height: 917px;

      &::before {
        width: 639px;
        height: 639px;
      }
    }

    &__circles-r {
      right: -300px;
      bottom: -350px;
      width: 860px;
      height: 860px;

      &::before {
        width: 554px;
        height: 554px;
      }
    }

    &__pic {
      width: auto;
    }

    &__title {
      font-size: 41px;
    }

    &__value {
      font-size: 76px;
    }

    &__icon {
      top: -30px;
      right: -40px;
      width: 62px;
      height: 62px;
    }

    &__date {
      font-size: 24px;
    }

    &__desc {
      max-width: 600px;
      font-size: 37px;
    }

    &__founders {
      &::before {
        right: -54px;
        bottom: -100px;
        width: 394px;
        height: 394px;
      }
    }

    &__img {
      right: -120px;
      bottom: -20px;
      width: 570px;
    }

    &__note {
      right: 70px;
      width: 250px;
      padding: 20px 18px 12px;
    }
  }

  @include media(xl) {
    // padding: 50px 50px 72px;

    &__circles-l {
      top: -570px;
      left: -482px;
      width: 1326px;
      height: 1326px;

      &::before {
        width: 888px;
        height: 888px;
      }
    }

    &__circles-r {
      right: -405px;
      bottom: -510px;
      width: 1278px;
      height: 1278px;

      &::before {
        width: 730px;
        height: 730px;
      }
    }

    &__title {
      font-size: 67px;
    }

    &__value {
      font-size: 90px;
    }

    &__date {
      margin-top: 22px;
      font-size: 28px;
    }

    &__desc {
      max-width: 870px;
      font-size: 53px;
    }

    &__founders {
      &::before {
        right: -74px;
        bottom: -144px;
        width: 510px;
        height: 510px;
      }
    }

    &__img {
      right: -150px;
      bottom: -30px;
      width: 730px;
    }

    &__note {
      width: 340px;
      font-size: 14px;

      span {
        font-size: 24px;
      }
    }
  }
}
</style>
