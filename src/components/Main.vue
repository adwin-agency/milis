<template>
  <div class="main">
    <Header
      v-if="$mobile"
      class="main__header"
      main
      :info="activeSlide === kitchens.length"
    />
    <div
      v-else
      class="main__top"
      :class="{'show': showTop}"
    >
      <div class="container">
        <div class="row">
          <div class="col col-12 col-lg-6 col-xl-5">
            <Header
              class="main__header"
              main
              :info="activeSlide === kitchens.length"
            />
          </div>
        </div>
      </div>      
    </div>
    <Swiper
      class="main__screens"
      :options="swiperOptions"
      ref="mySwiper"
      @slideChange="handleSlideChange"
    >
      <SwiperSlide
        v-for="(kitchen, index) in kitchens"
        :key="index"
      >
        <Screen
          class="main__screen"
          :first="index === 0"
          :anim="anim && index === 0"
          :active="activeSlide === index"
          :kitchen="kitchen"
          :nextKitchen="kitchens[index + 1]"
          @wheel.native="handleScreenWheel"
        />
      </SwiperSlide>
      <SwiperSlide class="main__wrapper">
        <div
          class="main__sections"
          ref="sections"
          @scroll="handleSectionsScroll"
          @wheel="handleSectionsWheel"
        >
          <Info class="main__info" :anim="animInfo" />
          <Footer
            v-if="!$mobile"
            class="main__footer"
          />
        </div>
      </SwiperSlide>
    </Swiper>
    <div class="main__pagination fade-slide-right" :class="{'show': showPagination}">
      <span
        v-for="i in ($mobile ? kitchens.length + 1 : kitchens.length)"
        :key="i"
        class="main__pagination-item"
        :class="{'is-active': activeSlide === i - 1}"
      >
        <span class="main__pagination-num">{{('0' + i).slice(-2)}}</span>
      </span>
    </div>
    <div
      v-if="!$mobile"
      class="main__leaf"
      :class="[{'show': anim}, {'show-bottom': activeSlide < kitchens.length}, {'show-top': activeSlide === kitchens.length && showTop}]"
    >
      <Icon name="leaf" />
    </div>
  </div>
</template>

<script>
import Icon from './base/Icon'
import Header from './Header'
import Screen from './Screen'
import Info from './Info'
import Footer from './Footer'
import { swiper as Swiper, swiperSlide as SwiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'Main',
  components: {
    Icon,
    Header,
    Screen,
    Info,
    Footer,
    Swiper,
    SwiperSlide
  },
  props: {
    kitchens: Array
  },
  data() {
    return {
      activeSlide: 0,
      info: false,
      changing: false,
      scrolling: false,
      scrollTimeout: null,
      anim: false,
      showTop: false,
      showPagination: false,
      animInfo: false,
      wheelDelta: 0,

      swiperOptions: {
        speed: 500,
        resistanceRatio: 0,
        pagination: {
          el: '.swiper-pagination',
        },
        breakpointsInverse: true,
        breakpoints: {
          [this.$breakpoints.lg]: {
            direction: 'vertical',
            followFinger: false,
            threshold: 20
          }
        }
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
    sections() {
      return this.$refs.sections
    }
  },
  created() {
    this.showTop = this.$mobile
    this.showPagination = this.$mobile
  },
  mounted() {
    this.anim = true
    this.showTop = true
    this.showPagination = true
  },
  methods: {

    handleSlideChange() {
      this.changing = true
      this.activeSlide = this.swiper.activeIndex
      this.showTop = this.activeSlide < this.kitchens.length || this.sections.scrollTop === 0
      this.showPagination = this.activeSlide < (this.$mobile ? this.kitchens.length + 1 : this.kitchens.length)

      setTimeout(() => {
        if (this.activeSlide === this.kitchens.length && !this.animInfo) {
          this.animInfo = true
        }
      }, 250)

      setTimeout(() => {
        this.changing = false
      }, 500)
    },

    handleSectionsScroll() {
      if (this.$mobile || this.changing) {
        return
      }

      this.scrolling = true
      this.showTop = this.sections.scrollTop === 0

      clearTimeout(this.scrollTimeout)

      this.scrollTimeout = setTimeout(() => {
        this.scrolling = false
      }, 300)
    },

    handleScreenWheel(e) {
      if (this.$mobile || this.changing) {
        return
      }

      this.wheelDelta += e.deltaY

      if (Math.abs(this.wheelDelta) >= 250) {
        this.wheelDelta < 0 ? this.swiper.slidePrev() : this.swiper.slideNext()
        this.wheelDelta = 0
      }
    },

    handleSectionsWheel(e) {
      if (this.$mobile || this.changing || this.scrolling) {
        return
      }

      if (this.sections.scrollTop === 0) {
        this.wheelDelta += e.deltaY

        if (this.wheelDelta <= -250) {
          this.swiper.slidePrev()
          this.wheelDelta = 0
        }
      }
    }
  }
}
</script>

<style lang="scss">
.main {
  $b: &;

  position: relative;
  padding-top: 65px;
  overflow: hidden;

  &__top {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    opacity: 0;
    transform: translateY(-20px);
    transition: opacity .3s ease, transform .3s ease;

    &.show {
      opacity: 1;
      transform: none;
    }
  }

  &__header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 65px;
    z-index: 2;
  }

  &__screens {
    height: 100%;
  }

  &__screen {
    height: 100%;
  }

  &__wrapper {
    position: relative;
    height: 100%;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 70px;
      background: linear-gradient(0deg, #FFFFFF 50%, rgba(255, 255, 255, 0));
    }
  }

  &__sections {
    height: 100%;
    padding-bottom: 35px;
    overflow-y: scroll;
  }

  &__pagination {
    display: flex;
    position: absolute;
    left: $container-padding;
    right: 50%;
    bottom: 15px;
    width: auto;
    text-align: left;
    pointer-events: none;
    z-index: 1;
  }

  &__pagination-item {
    margin-right: 8px;
    width: 5px;
    height: 5px;
    border-radius: 5px;
    background-color: #C4C4C4;
    transition: width .3s ease, background-color .3s ease;

    &.is-active {
      width: 20px;
      background-color: $color-blue;
    }
  }

  &__pagination-num {
    display: none;
  }

  @keyframes main-leaf {
    from {
      opacity: 0;
      transform: translateY(-100%) rotate(45deg);
    }
    to {
      opacity: 1;
      transform: translateY(100vh);
    }
  }

  &__leaf {
    position: absolute;
    left: 50%;
    top: 0;
    margin-top: -34px;
    margin-left: -20px;
    width: 52px;
    height: 52px;
    fill: $color-green;
    transition: transform .5s;
    transform: translateY(-100%);
    z-index: 1;

    &.show {
      animation: main-leaf 1s;
    }

    &.show-bottom {
      transform: translateY(100vh);
    }

    &.show-top {
      transform: translateY(0);
    }
  }

  @include media(md) {

    &__wrapper::after {
      height: 144px;
    }

    &__sections {
      padding-bottom: 72px;
    }

    &__pagination {
      left: $container-padding-md;
      bottom: 70px;
    }

    &__pagination-item {
      margin-right: 12px;
      width: 8px;
      height: 8px;
      border-radius: 8px;

      &.is-active {
        width: 32px;
      }
    }
  }

  @include media(lg) {
    padding-top: 0;
    padding-bottom: 0;

    &__top {
      transform: translateY(-100%);
      transition-duration: .5s;
    }

    &__header {
      position: relative;
      height: auto;
    }

    &__wrapper::after {
      display: none;
    }

    &__sections {
      padding-bottom: 0;
    }

    &__pagination {
      flex-direction: column;
      justify-content: center;
      top: 0;
      right: auto;
      bottom: 0;
    }

    &__pagination-item {
      width: 46px;
      margin-right: 0;
      margin-bottom: 20px;
      font-weight: bold;
      font-size: 10px;
      line-height: (12/10);
      color: $color-blue;
      background-color: transparent;

      &::after {
        content: "";
        display: block;
        margin-top: 4px;
        width: 100%;
        border-bottom: 1px solid $color-gray;
        transform-origin: left;
        transition: transform .3s ease;
      }

      &:last-child {
        margin-bottom: 0;
      }

      &.is-active {
        width: 46px;
        background-color: transparent;

        &::after {
          border-color: $color-blue;
          transform: scaleX(0.65);
        }

        #{$b}__pagination-num {
          opacity: 1;
        }
      }
    }

    &__pagination-num {
      display: block;
      opacity: 0;
      transition: opacity .3s ease;
    }
  }

  @include media(xl) {
    &__pagination {
      left: $container-padding-xl;
    }

    &__leaf {
      left: (100% / 12 * 5);
      margin-top: -85px;
      margin-left: 20px;
      width: 105px;
      height: 108px;
    }
  }
}
</style>
