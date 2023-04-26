<template>
  <transition name="fade" @after-leave="afterLeave">
    <div
      v-show="active"
      ref="modal"
      class="modal"
    >
      <div class="modal__area">
        <div class="modal__overlay" @click="closeModal"></div>

        <ModalCall
          v-if="modal === 'call'"
          class="modal__call"
          @close="closeModal"
        />

        <ModalQuestion
          v-if="modal === 'question'"
          class="modal__question"
          @close="closeModal"
        />

        <ModalCalc
          v-if="modal === 'calc'"
          class="modal__calc"
          @close="closeModal"
          @success="handleCalcSuccess"
        />
        
        <ModalWrite
          v-if="modal === 'write'"
          class="modal__write"
          @close="closeModal"
        />

        <ModalSlides
          v-if="modal === 'review'"
          class="modal__slides"
          :initial="initialReviewIndex"
          type="reviews"
          @close="closeModal"
        />

        <ModalSlides
          v-if="modal === 'details'"
          class="modal__slides"
          :initial="initialDetailSlide"
          type="details"
          @close="closeModal"
        />

        <ModalTechnics
          v-if="modal === 'technics'"
          class="modal__technics"
          @close="closeModal"
        />

        <ModalQuiz
          v-if="modal === 'quiz'"
          class="modal__quiz"
          @scrollTop="scrollTopModal"
          @close="closeModal"
        />

      </div>
    </div>
  </transition>
</template>

<script>
import ModalCall from '@/components/ModalCall'
import ModalQuestion from '@/components/ModalQuestion'
import ModalCalc from '@/components/ModalCalc'
import ModalWrite from '@/components/ModalWrite'
import ModalSlides from '@/components/ModalSlides'
import ModalTechnics from '@/components/ModalTechnics'
import ModalQuiz from "@/components/ModalQuiz"
import api from '../api'

export default {
  name: 'Modal',
  components: {
    ModalQuiz,
    ModalCall,
    ModalQuestion,
    ModalCalc,
    ModalWrite,
    ModalSlides,
    ModalTechnics
  },
  data() {
    return {
      active: false,
      ecommerce: null
    }
  },
  computed: {
    modal() {
      return this.$store.state.modal
    },
    initialReviewIndex() {
      return this.$store.getters.initialReviewIndex
    },
    initialDetailSlide() {
      return this.$store.state.initialDetailSlide
    },
    productId() {
      return this.$store.state.modalData?.itemId
    },
    productName() {
      return this.$store.state.modalData?.item
    },
    productCategory() {
      return this.$store.state.modalData?.category
    },
    productPrice() {
      return this.$store.state.modalData?.price
    }
  },
  watch: {
    modal(newModal) {
      if (newModal) {
        const modalGoals = {
          call: 'open_designer',
          calc: 'open_size',
          technics: 'open_buy',
          question: 'open_question',
          details: 'open_inner_size',
          quiz: 'open_quiz'
        }

        if (newModal in modalGoals) {
          window.VK && window.VK.Goal('initiate_checkout')
          window.dataLayer = window.dataLayer || []
          window.dataLayer.push({'event': modalGoals[newModal]})
          window.dataLayer.push({'event': 'open_form'})
        }

        this.showModal()
      }

      if (newModal === 'calc') {
        // const _tmr = window._tmr || (window._tmr = [])
        // _tmr.push({ type: 'reachGoal', id: 3243290, goal: 'vk_ecom_cart'})
        

        if (!this.productId || !this.productName || !this.productCategory || !this.productPrice) return
        
        api.ecommerce('detail', this.productId, this.productName, this.productCategory, this.productPrice)
        api.ecommerce('add', this.productId, this.productName, this.productCategory, this.productPrice)
        this.ecommerce = {
          id: this.productId,
          name: this.productName,
          category: this.productCategory,
          price: this.productPrice
        }
      }

      // if (newModal === null && this.ecommerce) {
      //   api.ecommerce('remove', this.ecommerce.id, this.ecommerce.name, this.ecommerce.category)
      //   this.ecommerce = null
      // }
    },
    $route() {
      if (this.active) {
        this.closeModal()
      }
    }
  },
  methods: {
    showModal() {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth + 'px'

      document.body.classList.add('is-modal')
      document.body.style.paddingRight = scrollBarWidth
      document.body.style.overflow = 'hidden'

      const header = document.querySelector('.header')
      header.style.marginRight = scrollBarWidth

      this.active = true     
    },

    closeModal() {      
      this.active = false      
    },
    
    afterLeave() {
      document.body.style.paddingRight = ''

      const header = document.querySelector('.header')
      header.style.marginRight = ''

      const bodyClassList = document.body.classList
      bodyClassList.remove('is-modal')

      if (!bodyClassList.contains('is-mobile-menu') && !bodyClassList.contains('is-mobile-filters')) {
        document.body.style.overflow = ''
      }
      
      this.$store.commit('setModal', null)
      this.$store.commit('setModalData', null)
    },

    scrollTopModal() {
      this.$refs.modal.scrollTop = 0
    },

    handleCalcSuccess() {
      if (!this.ecommerce) return
      const { id, name, category, price } = this.ecommerce
      api.ecommerce('purchase', id, name, category, price)
      this.ecommerce = null
    }
  }
}
</script>

<style lang="scss">
.modal {
  $b: &;

  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  transform: translate3d(0, 0, 0);
  z-index: 99999;

  &.fade-enter, &.fade-leave-to {
    opacity: 0;
  }

  &.fade-enter-active, &.fade-leave-active {
    transition: opacity .3s ease;
  }

  &__area {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    min-height: 100%;
  }

  &__overlay {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(#000, .75);
  }

  &__call {
    width: 100%;
    max-width: 1150px;
  }

  &__question {
    width: 100%;
    max-width: 972px;
  }

  &__calc {
    width: 100%;
    max-width: 958px;
  }  

  &__write {
    width: 100%;
    max-width: 1065px;
  }

  &__slides {
    width: 100%;
  }

  &__technics {
    width: 100%;
    max-width: 970px;
  }

  @include media(lg) {
    &__area {
      padding: 25px 10px;
    }
  }

  @include media(xl) {
    &__area {
      padding: 25px;
    }

    &__call {
      max-width: 1626px;
    }

    &__write {
      max-width: 1363px;
    }
  }
}
</style>
