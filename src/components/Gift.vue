<template>
  <div class="gift">
    <div class="gift__picture">
      <picture>
        <source
          srcset="@/assets/img/gift-wash-xl.png"
          :media="`(min-width: ${$breakpoints.xl}px)`"
        >
        <source
          srcset="@/assets/img/gift-wash-lg.png"
          :media="`(min-width: ${$breakpoints.lg}px)`"
        >
        <img
          src="@/assets/img/gift-wash.png"
          alt=""
          class="gift__img"
        >
      </picture>
    </div>

    <div class="gift__content">
      <p class="gift__title">Каменная мойка в подарок при покупке кухни</p>
      <p class="gift__desc">Акция продлится до конца месяца</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Gift'
}
</script>

<style lang="scss">
.gift {
  display: flex;
  color: $color-blue;
  text-align: right;
  font-family: $font-secondary;
  background: #f3f3f3;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  &__picture {
    margin-right: -6px;
    width: 180px;
    flex-shrink: 0;
  }

  &__content {
    align-self: center;
    margin: 0 auto;
    max-width: 300px;
    padding: 10px;
  }

  &__title {
    font-weight: 700;
    font-size: 18px;
    line-height: 100%;
  }

  &__desc {
    margin-top: 12px;
    margin-left: -8px;
    font-weight: 500;
    font-size: 19px;
    line-height: 110%;
  }

  @include media(xs) {
    &__content {
      padding: 20px;
    }
  }

  @include media(sm) {
    &__content {
      max-width: 400px;
    }

    &__title {
      font-size: 22px;
    }

    &__desc {
      font-size: 18px;
    }
  }

  @include media(md) {
    &__content {
      max-width: 300px;
    }

    &__title {
      font-size: 18px;
    }

    &__desc {
      font-size: 28px;
    }
  }

  @include media(lg) {
    &__picture {
      width: 318px;
    }

    &__content {
      max-width: 340px;
      padding: 15px $container-padding-md;
    }

    &__title {
      font-size: 26px;
    }

    &__desc {
      margin-top: 30px;
    }
  }

  @include media(xl) {
    &__picture {
      width: 410px;
    }

    &__content {
      max-width: 440px;
      padding: 15px $container-padding-xl 15px 20px;
    }

    &__title {
      font-size: 31px;
    }

    &__desc {
      margin-top: 19px;
    }
  }
}
</style>
