<template>
  <div class="modal-details" :class="{'is-success': sendSuccess}">
    <div class="modal-details__top">
      <p class="modal-details__title">Рассчитать стоимость кухни</p>
      <div class="modal-details__info">
        <p class="modal-details__info-title">{{details.name}}</p>
        <div class="modal-details__prices">
          <p
            v-if="details.old_price"
            class="modal-details__old-price"
          >
            {{details.old_price}} ₽
          </p>
          <p class="modal-details__price"><span class="modal-details__price-num">{{details.price}}</span> ₽</p>
        </div>
        <Discount
          v-if="details.discount"
          :value="details.discount"
          size="sm"
          class="modal-details__discount"
        />
      </div>
    </div>    
    <form
      class="modal-details__form"
      ref="detailsform"
      @submit.prevent="onSubmit"
    >
      <input type="hidden" name="type" value="inner_size">
      <input type="hidden" name="page" :value="inputPage">
      <input type="hidden" name="item" :value="inputItem">
      <input type="hidden" name="item_id" :value="inputItemId">
      <input type="hidden" name="product_type" :value="inputProductType">
      <TextInput
        class="modal-details__field"
        small
        label="Имя"
        type="text"
        name="name"
        :error="errors.name"
        @input="onInput('name', $event)"
      />
      <TextInput
        class="modal-details__field"
        small
        label="Телефон"
        type="tel"
        name="phone"
        :error="errors.phone"
        @input="onInput('phone', $event)"
      />
      <Button
        sendsm
        type="submit"
        class="modal-details__btn"
      >
        {{ sending ? 'Отправляем...' : 'Отправить' }}
      </Button>
      <p
        v-if="sendError"
        class="modal-details__error"
      >
        Ошибка отправки
      </p>
      <div class="modal-details__success">
        <FormSuccess
          :class="{'is-active': sendSuccess}"
          small
          :title="`Ваша заявка успешно отправлена!`"
        />
      </div>
    </form>
  </div>
</template>

<script>
import Discount from '@/components/base/Discount'
import TextInput from '@/components/base/TextInput'
import Button from '@/components/base/Button'
import FormSuccess from '@/components/FormSuccess'
import api from '@/api'

export default {
  name: 'ModalDetails',
  components: {
    Discount,
    TextInput,
    Button,
    FormSuccess
  },
  props: {
    details: Object
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
      const data = new FormData(this.$refs.detailsform)

      api.sendForm(data, 'inner_size')
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
.modal-details {
  $b: &;

  position: relative;
  padding: 23px 26px 33px;
  background-color: $color-white;

  &.is-success {
    #{$b} {
      &__title {
        opacity: 0;
        pointer-events: none;
      }

      &__success {
        opacity: 1;
        pointer-events: all;
        z-index: 1;
      }
    }
  }

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  &__info {
    display: inline-block;
    position: relative;
    flex-shrink: 0;
    margin-top: -53px;
    padding: 14px 37px 12px 25px;
    background-color: #EDEDED;
  }

  &__info-title {
    padding-right: 20px;
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 18px;
    line-height: (22/18);
    color: $color-blue;
  }

  &__prices {
    display: flex;
    align-items: flex-end;
    margin-top: 5px;
  }

  &__old-price {
    margin-right: 12px;
    font-weight: 200;
    font-size: 16px;
    line-height: 26px;
    text-decoration: line-through;
    color: $color-gray-middle;
  }

  &__price {
    font-weight: 300;
    font-weight: 16px;
    line-height: 26px;
    color: $color-blue;
  }

  &__price-num {
    font-size: 22px;
  }

  &__discount {
    position: absolute;
    top: -12px;
    right: -12px;
  }

  &__title {
    margin-right: 30px;
    width: 100%;
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 18px;
    line-height: (25/18);
    color: $color-blue;
    transition: opacity .5s ease;
  }

  &__form {
    display: flex;
    position: relative;
    padding-top: 20px;
  }

  &__field {
    margin-right: 20px;
    width: 204px;
    background-color: $color-white;
  }

  &__btn {
    min-width: 218px;
  }

  &__error {
    position: absolute;
    right: 0;
    top: 100%;
    margin-top: 8px;
    text-align: center;
    font-family: $font-secondary;
    font-size: 12px;
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
    padding-top: 20px;
    background-color: #fff;
    opacity: 0;
    pointer-events: none;
    transition: opacity .5s ease;
    z-index: -1;
  }
}
</style>
