<template>
  <div class="modal-call" :class="{'is-success': success}">
    <div class="modal-call__content">
      <CallForm
        class="modal-call__form"
        modal
        :hiddenData="modalData"
        @success="onSuccess"
      />
      <div class="modal-call__success">
        <ModalSuccess
          :class="{'is-active': success}"
          :title="`Ваша заявка \n успешно отправлена!`"
          :desc="`Мы свяжемся с Вами в ближайшее время, \n для подтверждения заявки`"
          :link="{path: 'catalog', title: 'Посмотреть похожиее кухни'}"
        />
      </div>
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
  },
  methods: {
    onSuccess() {
      this.success = true
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
      &__success {
        transform: translateY(-100%);
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

  &__success {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    height: 310px;
    padding: 20px;
    background-color: #EEEEEE;
    transition: transform .5s ease;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -5px;
      width: 100%;
      height: 10px;
      background-color: inherit;
    }
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

    &__success {
      align-items: flex-start;
      height: 100%;
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
        &__success {
          transform: translateX(-100%);
        }

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
      padding: 48px 70px 40px 78px;
      box-shadow: 0px 0px 17px rgba(0, 0, 0, 0.25);
    }

    &__success {
      justify-content: flex-start;
      align-items: center;
      top: 0;
      left: 100%;
      padding: 170px;

      &::after {
        left: auto;
        right: -5px;
        bottom: 0;
        width: 10px;
        height: 100%;
      }
    }

    &__image {
      width: 43%;
      height: auto;
      padding: 50px;

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
      bottom: 55px;
      width: 80px;
      height: 82px;
      transition: transform .5s cubic-bezier(0.25, -0.25, 0.25, 1.25);
    }

    &__decor {
      display: block;
      position: absolute;
      right: 44px;
      bottom: 32px;
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
            transform: translateX(-86px) scale(1.2);
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

    &__success {
      padding: 220px;
    }

    &__image {
      width: 39%;
      padding: 50px;
    }

    &__leaf {
      left: -48px;
      bottom: 62px;
    }

    &__decor {
      left: -100%;
      right: 100%;
      bottom: 44px;
      margin-right: 82px;
    }

    &__close {
      top: 28px;
      right: 28px;      
    }
  }
}
</style>
