import 'swiper/dist/css/swiper.css'
import './styles/global.scss'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.directive('anim', {
  inserted(el, binding) {
    if (!binding.value) {
      return
    }    

    const delay = binding.value.delay ? binding.value.delay : 0

    function animate() {
      const rect = el.getBoundingClientRect()
      let target = Math.max(window.innerHeight * 0.75, window.innerHeight - rect.height + 10)

      if (el.classList.contains('fade-slide-up')) {
        target += rect.height
      }

      if (rect.top <= target) {
        window.removeEventListener('scroll', animate)
        
        setTimeout(() => {
          if (el.classList.contains('js-anim')) {
            el.classList.add('show')

          } else {
            const animElements = el.querySelectorAll('.js-anim')
            for (let element of animElements) {
              element.classList.add('show')
            }
          }
        }, delay)
      }
    }

    const img = el.querySelector('.anim-img img, .anim-img-re img')
    
    if (img) {
      img.onload = () => {
        window.addEventListener('scroll', animate)
        animate()
      }
    } else {
      window.addEventListener('scroll', animate)
      animate()
    }
  }
})

Vue.prototype.$basepath = process.env.NODE_ENV === 'production' ? '' : 'https://milismebel.ru'

Vue.prototype.$breakpoints = {
  xs: 370,
  sm: 570,
  md: 750,
  lg: 1150,
  lg2: 1280,
  xl: 1600
}

Vue.mixin({
  computed: {
    $windowWidth() {
      return this.$store.state.windowWidth
    },
    $mobile() {
      return this.$store.state.mobile
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
