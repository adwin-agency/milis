<template>
  <div class="modal-technics" :class="{'is-success': sendSuccess}">
    <div class="modal-technics__content">
      <form
        class="modal-technics__form"
        ref="technicsform"
        @submit.prevent="onSubmit"
      >
        <input type="hidden" name="type" value="buy">
        <input type="hidden" name="page" :value="inputPage">
        <input type="hidden" name="item" :value="inputItem">
        <input type="hidden" name="item_id" :value="inputItemId">
        <input type="hidden" name="product_type" :value="inputProductType">
        <p class="modal-technics__title">Заказать технику </p>
        <p class="modal-technics__desc">Укажите свои данные и мы перезвоним Вам в течении дня, чтобы оформить заказ и запланировать доставку</p>
        <div class="modal-technics__fields">
          <TextInput
            class="modal-technics__field"
            label="Имя"
            type="text"
            name="name"
            :error="errors.name"
            @input="onInput('name', $event)"
          />
          <TextInput
            class="modal-technics__field"
            label="Телефон"
            type="tel"
            name="phone"
            :error="errors.phone"
            @input="onInput('phone', $event)"
          />
          <TextInput
            class="modal-technics__field"
            textarea
            label="Комментарий"
            name="comment"
            :error="errors.comment"
            @input="onInput('comment', $event)"
          />
        </div>
        <Button
          class="modal-technics__btn"
          type="submit"
          send          
        >
          Отправить
        </Button>
        <p
          v-if="sendError"
          class="modal-technics__error"
        >
          Ошибка отправки
        </p>
      </form>
      <div class="modal-technics__success">
        <ModalSuccess
          :class="{'is-active': sendSuccess}"
          :title="`Ваша заявка \n успешно отправлена!`"
          :desc="`Оператор свяжется с Вами в самое \n ближайшее время и уточнит детали!`"
          :link="{path: 'technics', title: 'Вернуться в каталог техники'}"
        />
      </div>
    </div>
    <div class="modal-technics__image">
      <img src="@/assets/img/modal-technics.jpg" alt="">
    </div>
    <div class="modal-technics__close" @click="$emit('close')">
      <Icon name="close" />
    </div>
  </div>
</template>

<script>
import TextInput from './base/TextInput'
import Button from './base/Button'
import Icon from './base/Icon'
import ModalSuccess from '@/components/ModalSuccess'
import api from '@/api'

export default {
  name: 'ModalTechnics',
  components: {
    TextInput,
    Button,
    Icon,
    ModalSuccess
  },
  data() {
    return {
      inputs: {
        name: '',
        phone: '',
        comment: ''
      },
      errors: {
        name: false,
        phone: false,
        comment: false
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
      const data = new FormData(this.$refs.technicsform)

      // if (window.Comagic) {
      //   const comagicData = window.Comagic.getCredentials()

      //   for (let item in comagicData) {
      //     data.append(item, comagicData[item])
      //   }
      // }

      api.sendForm(data, 'buy')
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
.modal-technics {
  $b: &;

  position: relative;
  background-color: $color-white;

  &.is-success {
    #{$b} {
      &__success {
        opacity: 1;
        pointer-events: all;
        z-index: auto;
      }
    }
  }

  &__content {
    position: relative;
    padding: 30px 20px;
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
    font-size: 11px;
    line-height: (17/11);
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
    top: 0;
    width: 100%;
    height: 100%;
    padding: 20px;
    background-color: #fff;
    opacity: 0;
    pointer-events: none;
    transition: opacity .5s ease;
    z-index: -1;
  }

  &__image {
    height: 358px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
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
    &__content {
      padding: 38px 100px 45px;
    }

    &__close {
      width: 34px;
      height: 34px;
    }
  }

  @include media(lg) {
    display: flex;
    box-shadow: 0px 0px 17px rgba(0, 0, 0, 0.25);

    &__content {
      position: static;
      flex: 1;
      padding: 55px 70px 64px;
    }

    &__title {
      padding-right: 0;
    }

    &__image {
      width: 44.5%;
      height: 100%;
    }

    &__close {
      top: 20px;
      right: 25px;
      width: 22px;
      height: 22px;
    }
  }

  @include media(xl) {
    &__desc {
      padding-right: 10px;
      font-size: 14px;
      line-height: (22/14);
    }
  }
}
</style>
