<template>
  <svg :width="getWidth" class="icon" xmlns="http://www.w3.org/2000/svg">
    <use :xlink:href="iconPath" xmlns:xlink="http://www.w3.org/1999/xlink"/>
  </svg>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    name: String,
    width: Number,
    height: Number
  },
  computed: {
    iconPath() {
      let icon = require(`@/assets/icons/${this.name}.svg`);
      if (Object.prototype.hasOwnProperty.call(icon, 'default')) {
        icon = icon.default;
      }
      return icon.url;
    },
    getWidth(){
      return this.width
    }
  }
}
</script>

<style lang="scss">
.icon {
  display: block;
  width: 100%;
  height: 100%;
}
</style>