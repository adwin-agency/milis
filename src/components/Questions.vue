<template>
  <div
    class="questions"
    :class="{'questions_img': image}"
  >
    <p class="questions__title">{{title}}</p>
    <p class="questions__desc">{{desc}}</p>
    <div
      class="questions__overlay js-anim"
      v-if="!$mobile"
    ></div>
    <div
      v-if="image"
      class="questions__image js-anim"
    >
      <img
        :src="require('@/assets/img/' + image)"
        alt=""
      >
    </div>
    <div
      v-else
      class="questions__mark js-anim"
    >
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
    desc: String,
    image: String
  }
}
</script>

<style lang="scss">
.questions {
  $b: &;
  position: relative;
  padding: 50px 10px 40px;
  background-color: $color-blue;
  color: $color-white;

  &_img {
    padding-left: 100px;
  }

  &__title {
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 20px;
    line-height: (24/20);
  }

  &__desc {
    margin-top: 10px;
    font-size: 18px;
    line-height: (25/18);
  }

  &__mark {
    position: absolute;
    left: 10px;
    top: -30px;
    width: 60px;
    height: 60px;
  }

  &__image {
    position: absolute;
    left: -50px;
    top: 50%;
    width: 130px;
    transform: translateY(-50%);
  }

  &__leaf {
    position: absolute;
    right: 10px;
    bottom: -30px;
    width: 56px;
    height: 58px;
    fill: $color-green;
    z-index: 1;
  }

  @include media(md) {
    padding: 50px 20px 40px;

    &__image {
      left: -40px;
    }
  }

  @include media(lg) {
    padding: 44px $container-padding-md 32px;

    &_img {
      min-height: 120px;
      border-radius: 100px 0 0 100px;
      padding-left: 180px;
    }

    &__overlay {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
      pointer-events: none;

      &::after {
        content: '';
        position: absolute;
        right: 0;
        bottom: 0;
        width: 112%;
        padding-top: 100%;
        border-top-left-radius: 100%;
        background-color: $color-white;
        transition: transform 0.75s ease;
      }

      &.show {
        &::after {
          transform: translateY(100%);
        }
      }
    }

    &__mark {
      left: 26px;
      opacity: 0;
      transition: opacity 0.5s ease 0.75s;

      &.show {
        opacity: 1;
      }
    }

    &__image {
      left: -5px;
      width: 150px;
      opacity: 0;
      transition: opacity 0.5s ease 0.75s;

      &.show {
        opacity: 1;
      }
    }

    &__title {
      font-size: 22px;
    }

    &__desc {
      padding-right: 50px;
    }

    &__leaf {
      right: 0;
      bottom: -50px;
      width: 98px;
      height: 100px;
    }
  }

  @include media(xl) {
    padding: 44px $container-padding-xl;

    &_img {
      min-height: 138px;
      padding-left: 200px;
    }

    &__mark {
      left: 54px;
    }

    &__image {
      left: -60px;
      width: 200px;
    }
  }
}
</style>
