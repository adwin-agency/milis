<template>
  <div :class="['tooltip', {'tooltip_r': right}]">
    <div class="tooltip__point"></div>
    <div class="tooltip__box">
      <p class="tooltip__text">{{text}}</p>
      <div v-if="false" class="tooltip__image">
        <img src="../../assets/img/brand-01.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    right: Boolean,
    text: String
  }
}
</script>

<style lang="scss">
@keyframes wave {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(3);
  }
}

.tooltip {
  $b: &;

  position: relative;

  &_r {
    #{$b}__box {
      left: 100%;
      right: auto;
      margin-left: 10px;
      margin-right: 0;

      &::after {
        left: auto;
        right: 100%;
        margin-left: 0;
        margin-right: -1px;
        border-left-color: transparent;
        border-right-color: $color-white;
      }
    }
  }

  &__point {
    position: relative;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: 7px solid $color-green;
    background-color: $color-white;

    &::before,
    &::after {
      content: "";
      position: absolute;
      left: -7px;
      top: -7px;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      border: 1px solid $color-white;
      opacity: 0;
      pointer-events: none;
    }

    &:hover {
      &::before {
        animation: wave 1s ease;
      }

      &::after {
        animation: wave 1s ease .25s;
      }

      & + #{$b}__box {
        opacity: 1;
      }
    }
  }

  &__box {
    position: absolute;
    top: 50%;
    right: 100%;
    margin-right: 10px;
    padding: 5px 8px;
    background-color: $color-white;
    transform: translateY(-50%);
    opacity: 0;
    pointer-events: none;
    transition: opacity .3s ease;

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 100%;
      margin-top: -7px;
      margin-left: -1px;
      border: 7px solid transparent;
      border-left-color: $color-white;
    }
  }

  &__text {
    font-size: 12px;
    line-height: (17/12);
  }

  &__image {
    display: inline-block;
    width: 53px;
  }

  @include media(md) {
    &__text {
      white-space: nowrap;
    }
  }

  @include media(lg) {
    &__box {
      padding: 9px 27px;
    }
  }
}
</style>
