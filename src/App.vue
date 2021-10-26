<template>
  <div id="app" class="app" :class="{'full-h': main}">
    <RouterView />
    <!-- <MobileBar class="app__mobile-bar" v-if="$mobile" /> -->
    <Modal />
    <Preloader
      v-if="loading"
      class="app__preloader"
    />
    <ArrowUp v-if="!main && isMediaSm" class="app__arrow-up" />
  </div>
</template>

<script>
import ArrowUp from './components/base/ArrowUp'
import Preloader from './components/base/Preloader'
// import MobileBar from './components/MobileBar'
import Modal from './components/Modal'

export default {
  name: 'App',
  components: {
    Preloader,
    // MobileBar,
    Modal,
    ArrowUp
  },
  computed: {
    loading() {
      document.body.style.overflow = this.$store.state.appLoading ? 'hidden' : ''
      return this.$store.state.appLoading
    },
    main() {
      return this.$route.name === 'main'
    },
    isMediaSm() {
      return this.$windowWidth < this.$breakpoints.md
    }
  },
  created() {
    this.storeScreen()
    this.$store.dispatch('loadBase')
    window.addEventListener('resize', this.handleResize)

    document.addEventListener('click', (e) => {
      if (e.target.closest('a[href^="tel"]')) {
        window.fbq && window.fbq('track', 'Contact')
      }
    })
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
  padding-top: $header-height;
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

  &__arrow-up {
    position: fixed;
    right: 30px;
    bottom: 30px;
    z-index: 10;
  }

  @include media(md) {
    padding-top: $header-height-md;
  }

  @include media(xl) {
    padding-top: $header-height-xl;
  }
}
</style>
