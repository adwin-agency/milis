<template>
  <div class="modal-question" :class="{'is-success': sendSuccess}">
    <div class="modal-question__content">
      <form
        class="modal-question__form"
        ref="questionform"
        @submit.prevent="onSubmit"
      >
        <input type="hidden" name="type" value="question">
        <input type="hidden" name="page" :value="inputPage">
        <input type="hidden" name="item" :value="inputItem">
        <input type="hidden" name="item_id" :value="inputItemId">
        <input type="hidden" name="product_type" :value="inputProductType">
        <p class="modal-question__title">Задать вопрос</p>
        <p class="modal-question__desc">У Вас остались любые вопросы по сервису, доставке, услугах или товаре? Оставьте свой номер, и мы Вам перезвоним в течение 20 минут</p>
        <div class="modal-question__fields">
          <TextInput
            class="modal-question__field"
            label="Имя"
            type="text"
            name="name"
            :error="errors.name"
            @input="onInput('name', $event)"
          />
          <TextInput
            class="modal-question__field"
            label="Телефон"
            type="tel"
            name="phone"
            :error="errors.phone"
            @input="onInput('phone', $event)"
          />
          <TextInput
            class="modal-question__field"
            textarea
            label="Вопрос"
            name="comment"
          />
        </div>
        <Button
          class="modal-question__btn"          
          type="submit"
          send          
        >
          {{ sending ? 'Отправляем...' : 'Отправить' }}
        </Button>
        <p
          v-if="sendError"
          class="modal-question__error"
        >
          Ошибка отправки
        </p>
      </form>
      <div class="modal-question__success">
        <FormSuccess
          :class="{'is-active': sendSuccess}"
          :title="`Ваш вопрос \n успешно отправлен`"
          :desc="`Наш первый освободившийся оператор \n перезвонит Вам и ответит \n на интересующий вопрос`"
        />
      </div>
    </div>
    <div class="modal-question__image">
      <img src="../assets/img/modal-question.svg" alt="">
    </div>
    <div class="modal-question__close" @click="$emit('close')">
      <Icon name="close" />
    </div>
  </div>
</template>

<script>
import TextInput from './base/TextInput'
import Button from './base/Button'
import Icon from './base/Icon'
import FormSuccess from '@/components/FormSuccess'
import api from '@/api'

export default {
  name: 'ModalQuestion',
  components: {
    TextInput,
    Button,
    Icon,
    FormSuccess
  },
  data() {
    return {
      inputs: {
        name: '',
        phone: ''
      },
      errors: {
        name: false,
        phone: false
      },
      sending: false,
      sendSuccess: false,
      sendError: false
    }
  },
  computed: {
    modalData() {
      return this.$store.state.modalData
    },
    inputPage() {
      return this.$route.path
    },
    inputItem() {
      return this.modalData && this.modalData.item
    },
    inputItemId() {
      return this.modalData && this.modalData.itemId
    },
    inputProductType() {
      return this.modalData && this.modalData.productType
    }
  },
  methods: {
    onInput(input, value) {
      if (this.errors[input]) {
        this.errors[input] = false
      }

      this.inputs[input] = value
    },

    onSubmit() {
      if (this.sending || this.sendSuccess) {
        return
      }

      for (let input in this.inputs) {
        const value = this.inputs[input]

        if (value.trim() === '' || input === 'phone' && value.length < 16) {
          this.errors[input] = true
        }
      }

      for (let error in this.errors) {
        if (this.errors[error]) {
          return
        }
      }

      this.sending = true
      this.sendError = false
      const data = new FormData(this.$refs.questionform)

      api.sendForm(data, 'question')
        .then(() => {
          this.sending = false
          this.sendSuccess = true
        })
        .catch(() => {
          this.sending = false
          this.sendError = true
        })
    }
  }
}
</script>

<style lang="scss">
.modal-question {
  $b: &;

  position: relative;
  background-color: $color-white;

  &.is-success {
    #{$b} {
      &__content {
        max-height: 310px;
      }
      &__success {
        transform: translateY(-100%);
      }
    }
  }

  &__content {
    position: relative;
    padding: 30px 20px;
    max-height: 550px;
    transition: max-height .5s ease;
    overflow: hidden;
  }

  &__form {
    position: relative;
  }

  &__title {
    padding-right: 50px;
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 24px;
    line-height: (32/24);
    color: $color-blue;
  }

  &__desc {
    margin-top: 10px;
    font-size: 14px;
    line-height: (22/14);
  }

  &__fields {
    margin-top: 20px;
  }

  &__field {
    margin-top: 18px;
    background-color: $color-white;

    &:first-child {
      margin-top: 0;
    }
  }

  &__btn {
    margin-top: 24px;
    width: 100%;
  }

  &__error {
    margin-top: 12px;
    text-align: center;
    font-family: $font-secondary;
    font-size: 14px;
    color: $color-red;
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
    padding: 30px;
    background-color: #EEEEEE;

    img {
      max-width: 295px;
    }
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
      padding: 38px 100px 45px;
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

    &__close {
      width: 34px;
      height: 34px;
    }
  }

  @include media(lg) {
    display: flex;
    box-shadow: 0px 0px 17px rgba(0, 0, 0, 0.25);

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
      }
    }

    &__content {
      flex: 1;
      padding: 55px 95px 64px 70px;
    }

    &__title {
      padding-right: 0;
    }

    &__success {
      justify-content: flex-start;
      align-items: center;
      top: 0;
      left: 100%;

      &::after {
        left: auto;
        right: -5px;
        bottom: 0;
        width: 10px;
        height: 100%;
      }
    }

    &__image {
      margin-top: 0;
      width: 41.5%;
      padding: 15px;

      img {
        max-width: none;
        transform-origin: right;
      }
    }

    &__close {
      top: 20px;
      right: 25px;
      width: 22px;
      height: 22px;
    }
  }
}
</style>
