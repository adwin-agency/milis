<template>
  <button class="arrow-up" @click="scrollToTop">
    <Icon name="arrow-down" class="arrow-up__icon" />
  </button>
</template>

<script>
import Icon from '@/components/base/Icon'

export default {
  name: 'ArrowUp',
  components: {
    Icon
  },
  methods: {
    scrollToTop() {
      const scrollTo = 0
      const cosParameter = (window.scrollY - scrollTo) / 2
      let scrollCount = 0,
        oldTimestamp = null

      function step(newTimestamp) {
        if (oldTimestamp !== null) {
          scrollCount += (Math.PI * (newTimestamp - oldTimestamp)) / 500

          if (scrollCount >= Math.PI) {
            return
          }

          window.scrollTo(0, scrollTo + cosParameter + cosParameter * Math.cos(scrollCount))
        }

        oldTimestamp = newTimestamp
        window.requestAnimationFrame(step)
      }
      window.requestAnimationFrame(step)
    }
  }
}
</script>

<style lang="scss">
.arrow-up {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: #F3F4F9;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.1);

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 66px;
    height: 66px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
  }

  &__icon {
    width: 19px;
    height: 19px;
    transform: rotate(180deg);
  }
}
</style>
