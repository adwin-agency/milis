<template>
  <div class="promo" :class="{'anim': scaled, 'show': anim}">
    <div class="promo__box">
      <picture>
        <source srcset="../assets/img/discount-banner-md.jpg" :media="'(min-width: ' + $breakpoints.md + 'px)'">        
        <img src="../assets/img/discount-banner.jpg" alt="">
      </picture>
      <svg v-if="$windowWidth < $breakpoints.md" viewBox="0 0 360 80" class="promo__date">
        <text v-if="promoText && sameMonth" x="320" y="48" text-anchor="end">{{ promoText.join(' - ') }}</text>
        <text v-if="promoText && !sameMonth" x="320" y="30" text-anchor="end">{{ 'с\xa0' + promoText[0] }}</text>
        <text v-if="promoText && !sameMonth" x="320" y="64" text-anchor="end">{{ 'по\xa0' + promoText[1] }}</text>
      </svg>
      <svg v-else viewBox="0 0 360 80" class="promo__date">
        <text v-if="promoText" x="38" y="32">{{ sameMonth ? promoText[0] + ' - ' + promoText[1].split('\xa0')[0] : 'с ' + promoText[0] }}</text>
        <text v-if="promoText" x="38" y="68">{{ sameMonth ? promoText[1].split('\xa0')[1] : 'по ' + promoText[1] }}</text>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Promo',
  props: {
    anim: Boolean,
    scaled: Boolean
  },
  computed: {
    promoText() {
      return this.$store.getters.promoText
    },
    sameMonth() {
      return this.promoText && this.promoText[0].length === 2
    }
  }
}
</script>

<style lang="scss">
.promo {
  $b: &;

  &.anim {
    overflow: hidden;
    transform: translate3d(0,0,0);

    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: $color-white;
      transition: transform .5s ease;
    }
  }

  &.show {
    &::after {
      transform: translateY(100%);
    }
  }

  &__box {
    position: relative;
  }

  &__date {
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    font-weight: bold;
    font-size: 32px;
    fill: #FFFFFF;
  }

  @include media(md) {
    &__date {
      top: 22%;
      font-size: 34px;
    }
  }
}
</style>
