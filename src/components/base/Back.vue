<template>
  <div :class="['back', {'back_sm': sm}]">
    <a :href="href" class="back__link">
      <span class="back__arrow">
        <Icon name="arrow-left"/>
      </span>
      <span class="back__title">Назад в каталог</span>      
    </a>
  </div>
</template>

<script>
import Icon from './Icon'

export default {
  name: 'Back',
  components: {
    Icon
  },
  props: {
    href: String,
    sm: Boolean
  }
}
</script>

<style lang="scss">
.back {
  $b: &;

  display: inline-block;
  padding-bottom: 25px;
  border-bottom: 1px solid $color-gray;

  &_sm {
    padding-bottom: 0;
    border-bottom: none;

    #{$b}__title {
      display: none;
    }  
  }

  &__link {
    display: flex;
    align-items: center;
    font-family: $font-secondary;
    font-size: 10px;
    line-height: (12/10);
    text-decoration: underline;
    color: $color-blue;
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
    &_sm {
      padding-bottom: 25px;
      border-bottom: 1px solid $color-gray;

      #{$b}__title {
        display: inline;
      }
    }    

    &__arrow {
      width: 14px;
      height: 14px;
    }
  }
}
</style>
