<template>
  <div id="app" class="app" :class="{'full-h': main}">
    <RouterView />
    <!-- <MobileBar class="app__mobile-bar" v-if="$mobile" /> -->
    <Modal />
    <Preloader
      v-if="loading"
      class="app__preloader"
    />
  </div>
</template>

<script>
import Preloader from './components/base/Preloader'
// import MobileBar from './components/MobileBar'
import Modal from './components/Modal'

export default {
  name: 'App',
  components: {
    Preloader,
    // MobileBar,
    Modal
  },
  computed: {
    loading() {
      document.body.style.overflow = this.$store.state.appLoading ? 'hidden' : ''
      return this.$store.state.appLoading
    },
    main() {
      return this.$route.name === 'main'
    }
  },
  created() {
    this.storeScreen()
    this.$store.dispatch('loadBase')
    window.addEventListener('resize', this.handleResize)
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    storeScreen() {
      this.$store.commit('storeScreen', {
        width: window.innerWidth,
        mobile: window.innerWidth < this.$breakpoints.lg
      })
    },    
    handleResize() {
      this.storeScreen()
    }
  }
}
</script>

<style lang="scss">
.app {
  overflow: hidden;
  
  &__mobile-bar {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 10;
  }

  &__preloader {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }
}
</style>
