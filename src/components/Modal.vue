<template>
  <transition name="fade" @after-leave="afterLeave">
    <div class="modal" v-show="active">
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
        />
        
        <ModalWrite
          v-if="modal === 'write'"
          class="modal__write"
          @close="closeModal"
        />

        <ModalReview
          v-if="modal === 'review'"
          class="modal__review"
          :initial="initialReviewIndex"
          @close="closeModal"
        />

        <ModalTechnics
          v-if="modal === 'technics'"
          class="modal__technics"
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
import ModalReview from '@/components/ModalReview'
import ModalTechnics from '@/components/ModalTechnics'

export default {
  name: 'Modal',
  components: {
    ModalCall,
    ModalQuestion,
    ModalCalc,
    ModalWrite,
    ModalReview,
    ModalTechnics
  },
  data() {
    return {
      active: false
    }
  },
  computed: {
    modal() {
      return this.$store.state.modal
    },
    initialReviewIndex() {
      return this.$store.getters.initialReviewIndex
    }
  },
  watch: {
    modal(newModal) {
      if (newModal) {
        const modalGoals = {
          call: 'open_designer',
          calc: 'open_size',
          technics: 'open_buy',
          question: 'open_question'
        }

        if (newModal in modalGoals) {
          window.VK && window.VK.Goal('initiate_checkout')
          window.dataLayer = window.dataLayer || []
          window.dataLayer.push({'event': modalGoals[newModal]})
        }

        this.showModal()
      }
    }
  },
  methods: {
    showModal() {
      document.body.style.paddingRight = window.innerWidth - document.documentElement.clientWidth + 'px'
      document.body.style.overflow = 'hidden'
      this.active = true     
    },

    closeModal() {      
      this.active = false      
    },
    
    afterLeave() {
      document.body.style.paddingRight = ''
      document.body.style.overflow = ''
      this.$store.commit('setModal', null)
      this.$store.commit('setModalData', null)
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
  z-index: 100;

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

  &__review {
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
