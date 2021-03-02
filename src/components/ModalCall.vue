<template>
  <div class="modal-call">
    <div class="modal-call__content">
      <CallForm
        class="modal-call__form"
        modal
        :hiddenData="modalData"
      />
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

export default {
  name: 'ModalCall',
  components: {
    Icon,
    CallForm
  },
  props: {
    hiddenData: Object
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
  position: relative;

  &__content {
    position: relative;
    padding: 22px 20px 38px;
    background-color: $color-white;
  }

  &__decor {
    display: none;
    font-family: $font-decorative;
    font-size: 50px;
    line-height: (48/50);
    text-align: right;
    color: #E0E0E0;
  } 

  &__image {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 18px;
    background-color: #EEEEEE;

    img {
      max-width: 320px;
    }
  }

  &__leaf {
    position: absolute;
    top: -30px;
    right: 20px;
    width: 58px;
    height: 62px;
    fill: $color-green;
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
    &__content {
      padding: 48px 36px 38px;
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

    &__content {
      margin: 64px 0;
      flex: 1;
      padding: 48px 70px 40px 78px;
      box-shadow: 0px 0px 17px rgba(0, 0, 0, 0.25);
    }

    &__image {
      width: 43%;
      padding: 50px;

      img {
        max-width: none;
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
    }

    &__close {
      top: 30px;
      right: 36px;
      width: 30px;
      height: 30px;
    }
  }

  @include media(xl) {
    &__content {
      margin: 90px 0;
      padding: 156px 70px 160px 132px;
    }

    &__image {
      width: 39%;
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
