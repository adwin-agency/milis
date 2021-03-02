<template>
  <div class="discount">
    <div class="discount__bg">
      <Icon name="double-leaf"/>
    </div>
    <span class="discount__text">-{{value}}%</span>
  </div>
</template>

<script>
import Icon from './Icon'

export default {
  name: 'Discount',
  components: {
    Icon
  },
  props: {
    value: String
  }
}
</script>

<style lang="scss">
.discount {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 84px;
  height: 86px;
  padding: 10px;
  font-family: $font-secondary;
  font-weight: bold;
  font-size: 19px;
  line-height: (31/19);
  color: $color-white;

  &__bg {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }

  &__text {
    position: relative;
    padding-top: 4px;
  }
}
</style>
