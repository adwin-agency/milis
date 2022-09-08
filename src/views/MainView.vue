<template>
  <div v-if="kitchens" class="v-main">
    <Main class="v-main__main" :kitchens="kitchens" />
  </div>
</template>

<script>
import Main from '../components/Main'
import store from '@/store'

export default {
  name: 'MainView',
  components: {
    Main
  },
  computed: {
    kitchens() {
      return this.$store.state.mainKitchens
    }
  },
  beforeRouteEnter(from, to, next) {
    store.dispatch('loadMainKitchens')
      .then(() => next())
  }
}
</script>

<style lang="scss">
.v-main {
  &__main {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
