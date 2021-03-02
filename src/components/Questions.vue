<template>
  <div class="questions">
    <p class="questions__title">{{title}}</p>
    <p class="questions__desc">{{desc}}</p>
    <div class="questions__overlay js-anim" v-if="!$mobile">
    </div>
    <div class="questions__mark js-anim">
      <Icon name="question" />
    </div>
    <div class="questions__leaf">
      <Icon name="leaf" />
    </div>
  </div>
</template>

<script>
import Icon from './base/Icon'

export default {
  name: 'Questions',
  components: {
    Icon
  },
  props: {
    title: String,
    desc: String
  }
}
</script>

<style lang="scss">
.questions {
  $b: &;

  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding: 20px 60px 20px 40px;
  min-height: 135px;
  background-color: $color-blue;
  color: $color-white;

  &__title {
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 16px;
    line-height: (24/20);
  }

  &__desc {
    margin-top: 7px;
    font-size: 12px;
    line-height: (21/14);
  }

  &__mark {
    position: absolute;
    left: -20px;
    bottom: -20px;
    width: 48px;
    height: 48px;
  }

  &__leaf {
    position: absolute;
    top: 30px;
    right: -10px;
    width: 50px;
    height: 50px;
    fill: $color-green;
    z-index: 1;
  }

  @include media(md) {
    padding: 20px 120px;

    &__mark {
      left: -24px;
      bottom: -24px;
    }

    &__leaf {
      right: -40px;
      width: 100px;
      height: 100px;
    }
  }

  @include media(lg) {
    padding: 20px ($container-padding-md + 90px) 20px 120px;

    &__overlay {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
      pointer-events: none;

      &::after {
        content: "";
        position: absolute;
        right: 0;
        bottom: 0;
        width: 105%;
        padding-top: 100%;
        border-top-left-radius: 100%;
        background-color: $color-white;
        transition: transform .75s ease;
      }

      &.show {
        &::after {
          transform: translateY(100%);
        }
      }
    }

    &__mark {
      left: -16px;
      bottom: -10px;
      width: 32px;
      height: 32px;
      opacity: 0;
      transition: opacity .5s ease .75s;

      &.show {
        opacity: 1;
      }
    }

    &__leaf {
      top: auto;
      right: -26px;
      bottom: -26px;
      width: 68px;
      height: 68px;
    }
  }

  @include media(xl) {
    padding: 20px ($container-padding-xl + 90px) 20px 120px;

    &__title {
      font-size: 20px;
    }

    &__desc {
      font-size: 14px;
    }

    &__mark {
      left: -24px;
      bottom: -14px;
      width: 48px;
      height: 48px;
    }

    &__leaf {
      bottom: -40px;
      width: 100px;
      height: 100px;
    }
  }
}
</style>
