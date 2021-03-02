<template>
  <div v-if="kitchens" class="v-main">
    <Main :kitchens="kitchens" />
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
 