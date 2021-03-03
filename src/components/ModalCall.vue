<template>
  <div class="modal-call" :class="{'is-success': success}">
    <div class="modal-call__content" @click="success = true">
      <CallForm
        class="modal-call__form"
        modal
        :hiddenData="modalData"
      />
    </div>
    <div class="modal-call__success-wrap" @click="success = false">
      <ModalSuccess class="modal-call__success" :class="{'is-active': success}" />
    </div>
    <div class="modal-call__image">
      <img src="../assets/img/modal-call.svg" alt="">
      <div class="modal-call__leaf">
        <Icon name="leaf" />
      </div>
      <p class="modal-call__decor">Все просто! <br>Фабрика мебели «Милис»</p>
    </div>    
    <div class="modal-call__close" @click="$emit('close')">
      <Icon name="close" />
    </div>
  </div>
</template>

<script>
import Icon from './base/Icon'
import CallForm from './CallForm'
import ModalSuccess from '@/components/ModalSuccess'

export default {
  name: 'ModalCall',
  components: {
    Icon,
    CallForm,
    ModalSuccess
  },
  props: {
    hiddenData: Object
  },
  data() {
    return {
      success: false
    }
  },
  computed: {
    modalData() {
      return this.$store.state.modalData
    }
  }
}
</script>

<style lang="scss">
.modal-call {
  $b: &;

  position: relative;
  overflow: hidden;

  &.is-success {
    #{$b} {
      &__content {
        max-height: 310px;
      }
      &__success-wrap {
        transform: none;
      }
      &__leaf {
        transform: translateY(350px);
      }
    }
  }

  &__content {
    position: relative;
    padding: 22px 20px 38px;
    max-height: 850px;
    background-color: $color-white;
    transition: max-height .5s ease;
    overflow: hidden;
  }

  &__decor {
    display: none;
    font-family: $font-decorative;
    font-size: 50px;
    line-height: (48/50);
    text-align: right;
    color: #E0E0E0;
  }

  &__success-wrap {
    position: absolute;
    left: 0;
    bottom: 360px;
    width: 100%;
    height: 310px;
    padding: 30px 20px;
    background-color: #EEEEEE;
    transform: translateY(100%);
    transition: transform .5s ease;
    overflow: hidden;
  }

  &__success {
    position: relative;
    transition-delay: .5s;
    z-index: 1;
  }

  &__image {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 360px;
    padding: 18px;
    background-color: #EEEEEE;

    img {
      width: auto;
      height: 100%;
    }
  }

  &__leaf {
    position: absolute;
    top: -30px;
    right: 20px;
    width: 58px;
    height: 62px;
    fill: $color-green;
    transition: transform .5s ease;
  }

  &__close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 26px;
    height: 26px;
    fill: $color-blue;
    cursor: pointer;
  }

  @include media(md) {
    &.is-success {
      #{$b} {
        &__content {
          max-height: none;
        }
        
        &__image {
          img {
            transform: translateY(-50px) scale(1.35);
          }
        }
      }
    }

    &__content {
      padding: 48px 36px 38px;
      max-height: none;
    }

    &__success-wrap {
      height: calc(100% - 360px);
      padding: 100px;
    }

    &__image {
      img {
        transform-origin: bottom;
        transition: transform .5s ease;
      }
    }

    &__leaf {
      display: none;
    }

    &__close {
      width: 34px;
      height: 34px;
    }
  }

  @include media(lg) {
    display: flex;

    &.is-success {
      #{$b} {
        &__image {
          img {
            transform: translateX(-10px) scale(1.2);
          }
        }

        &__leaf,
        &__decor {
          transform: translateX(-500px);
        }
      }
    }

    &__content {
      flex: 1;
      align-self: center;
      padding: 48px 70px 40px 78px;
      box-shadow: 0px 0px 17px rgba(0, 0, 0, 0.25);
    }

    &__success-wrap {
      display: flex;
      align-items: center;
      left: 0;
      top: 0;
      right: auto;
      bottom: auto;
      width: 57%;
      height: 100%;
      padding: 170px;
      transform: translateX(100%);
    }

    &__image {
      width: 43%;
      height: auto;
      padding: 235px 50px;

      img {
        width: 100%;
        height: auto;
        transform-origin: right;
      }
    }

    &__leaf {
      display: block;
      top: auto;
      right: auto;
      left: -44px;
      bottom: 95px;
      width: 80px;
      height: 82px;
    }

    &__decor {
      display: block;
      position: absolute;
      right: 44px;
      bottom: 72px;
      transition: transform .5s ease;
    }

    &__close {
      top: 30px;
      right: 36px;
      width: 30px;
      height: 30px;
    }
  }

  @include media(xl) {
    &.is-success {
      #{$b} {
        &__image {
          img {
            transform: translateX(-86px) scale(1.45);
          }
        }

        &__leaf,
        &__decor {
          transform: translateX(-356px);
        }
      }
    }

    &__content {
      padding: 156px 70px 160px 132px;
    }

    &__success-wrap {
      width: 61%;
      padding: 206px;
    }

    &__image {
      width: 39%;
      padding: 200px 50px;
    }

    &__leaf {
      left: -48px;
      bottom: 162px;
    }

    &__decor {
      left: -100%;
      right: 100%;
      bottom: 144px;
      margin-right: 82px;
    }

    &__close {
      top: 28px;
      right: 28px;      
    }
  }
}
</style>
