<template>
  <RouterLink
    :to="to"
    :class="['back', {'back_sm': sm}]"
  >
    <span class="back__arrow">
      <Icon name="arrow-left"/>
    </span>
    <span
      v-if="!sm || $windowWidth >= $breakpoints.md"
      class="back__title"
    >Назад в каталог</span>
  </RouterLink>
</template>

<script>
import Icon from './Icon'

export default {
  name: 'Back',
  components: {
    Icon
  },
  props: {
    to: Object,
    sm: Boolean
  }
}
</script>

<style lang="scss">
.back {
  $b: &;

  display: inline-flex;
  align-items: center;
  position: relative;
  font-family: $font-secondary;
  font-size: 10px;
  line-height: (12/10);
  text-decoration: underline;
  color: $color-blue;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    margin-top: 15px;
    border-bottom: 1px solid $color-gray;
  }

  &_sm {
    &::after {
      display: none;
    }
  }

  &__arrow {
    width: 18px;
    height: 18px;
    fill: currentColor;
  }

  &__title {
    margin-left: 8px;
  }

  @include media(md) {
    border-radius: 2px;
    border-bottom: none;
    padding: 16px;
    background-color: #f3f3f3;

    &::after {
      display: none;
    }

    &__arrow {
      width: 14px;
      height: 14px;
    }
  }
}
</style>
