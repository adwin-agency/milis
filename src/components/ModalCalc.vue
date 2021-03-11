<template>
  <div class="modal-calc" :class="{'is-success': sendSuccess}">
    <div class="modal-calc__content">
      <form
        class="modal-calc__form"
        ref="calcform"
        @submit.prevent="onSubmit"
      >
        <input type="hidden" name="type" value="size">
        <input type="hidden" name="page" :value="inputPage">
        <input type="hidden" name="item" :value="inputItem">
        <input type="hidden" name="item_id" :value="inputItemId">
        <input type="hidden" name="product_type" :value="inputProductType">
        <p class="modal-calc__title">Рассчитать стоимость</p>
        <p class="modal-calc__desc">Вы можете оставить номер, размеры и пожелания и мы перезвоним Вам с рассчетом</p>
        <div class="modal-calc__fields">
          <TextInput
            class="modal-calc__field"
            label="Имя"
            type="text"
            name="name"
            :error="errors.name"
            @input="onInput('name', $event)"
          />
          <TextInput
            class="modal-calc__field"
            label="Телефон"
            type="tel"
            name="phone"
            :error="errors.phone"
            @input="onInput('phone', $event)"
          />
          <TextInput
            class="modal-calc__field"
            textarea
            label="Комментарий"
            name="comment"
          />
          <div class="modal-calc__file" :class="{'is-active': inputFileName}">
            <label class="modal-calc__file-label">
              <input
                class="modal-calc__file-input"
                type="file"
                name="file"
                accept="image/*"                
                ref="fileInput"
                @change="onFileChange"
              >
              <span class="modal-calc__file-icon">
                <Icon name="attach" />
              </span>
              {{inputFileName || 'Прикрепить фото эскиза'}}
            </label>
            <span
              class="modal-calc__file-remove"
              @click="onFileRemove"
            >
              <Icon name="close" />
            </span>
          </div>
        </div>
        <Button
          send
          type="submit"
          class="modal-calc__btn"
        >
          Отправить
        </Button>
        <p
          v-if="sendError"
          class="modal-calc__error"
        >
          Ошибка отправки
        </p>
      </form>
      <div class="modal-calc__success">
        <FormSuccess
          :class="{'is-active': sendSuccess}"
          :title="`Ваша заявка \n успешно отправлена!`"
          :desc="`Оператор свяжется с Вами в самое \n ближайшее время и уточнит детали!`"
          :link="{path: 'catalog', title: 'Вернуться в каталог кухонь'}"
        />
      </div>
    </div>
    <div class="modal-calc__side">
      <div class="modal-calc__features">
        <p class="modal-calc__feature">
          <span class="modal-calc__feature-icon">
            <Icon name="heart" />
          </span>
          Рассчет до рубля за 5 минут
        </p>
        <p class="modal-calc__feature">
          <span class="modal-calc__feature-icon">
            <Icon name="heart" />
          </span>
          При расчете — 3D проект в{{'\xa0'}}подарок
        </p>
      </div>
      <p class="modal-calc__date">Акция ограничена <br>до <b>{{promoDate}}</b></p>
      <img src="@/assets/img/modal-calc.png" alt="" class="modal-calc__image">
      <span class="modal-calc__like">
        <Icon name="hand-like" />
      </span>
      <div class="modal-calc__promo">
        <span>АКЦИЯ МЕСЯЦА</span>
      </div>
      <span class="modal-calc__smile">
        <Icon name="smile-5" />
      </span>
      <Discount
        class="modal-calc__discount"
        value="47"
      />
    </div>
    <div class="modal-calc__close" @click="$emit('close')">
      <Icon name="close" />
    </div>
  </div>
</template>

<script>
import TextInput from './base/TextInput'
import Button from './base/Button'
import Icon from './base/Icon'
import Discount from './base/Discount'
import FormSuccess from '@/components/FormSuccess'
import api from '@/api'

export default {
  name: 'ModalCalc',
  components: {
    TextInput,
    Button,
    Icon,
    Discount,
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
      inputFileName: null,
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
    },
    promoDate() {
      return this.$store.state.promoDate
    }
  },
  methods: {
    onInput(input, value) {
      if (this.errors[input]) {
        this.errors[input] = false
      }

      this.inputs[input] = value
    },

    onFileChange(e) {
      this.inputFileName = e.target.files.length ? e.target.files[0].name : ''
    },

    onFileRemove() {
      this.inputFileName = ''
      this.$refs.fileInput.value = ''
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
      const data = new FormData(this.$refs.calcform)

      api.sendForm(data, 'size')
        .then(() => {
          this.sending = false
          this.sendSuccess = true
        })
        .catch((err) => {
          console.log(err)
          this.sending = false
          this.sendError = true
        })
    }
  }
}
</script>

<style lang="scss">
.modal-calc {
  $b: &;

  position: relative;
  background-color: $color-white;
  overflow: hidden;

  &.is-success {
    #{$b} {
      &__success {
        opacity: 1;
        pointer-events: all;
        z-index: 1;
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

  &__file {
    display: flex;
    align-items: center;
    margin-top: 20px;

    &.is-active {
      #{$b} {
        &__file-icon {
          fill: $color-green;
        }

        &__file-remove {
          display: inline-block;
        }
      }
    }
  }

  &__file-label {
    display: flex;
    align-items: center;
    font-family: $font-secondary;
    font-size: 12px;
    line-height: (19/12);
    text-decoration: underline;
    color: $color-blue;
    cursor: pointer;
  }

  &__file-input {
    display: none;
  }

  &__file-icon {
    width: 22px;
    height: 22px;
    margin-right: 11px;
    fill: $color-blue;
    transition: fill .3s ease;
  }

  &__file-remove {
    display: none;
    width: 8px;
    height: 8px;
    margin-top: 2px;
    margin-left: 11px;
    cursor: pointer;
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

  &__side {
    position: relative;
    padding: 40px 20px 220px;
    background-color: #EEEEEE;
  }

  &__feature {
    display: flex;
    margin-bottom: 19px;
    font-weight: bold;
    font-size: 20px;
    line-height: (27/20);
    color: $color-blue;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__feature-icon {
    flex-shrink: 0;
    width: 25px;
    height: 25px;
    margin-right: 18px;
  }

  &__date {
    margin-top: 35px;
    font-size: 20px;
    line-height: (27/20);
    color: $color-blue;
  }

  &__image {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 250px;
  }

  &__like {
    position: absolute;
    right: 152px;
    bottom: 101px;
    width: 52px;
    height: 52px;
  }

  &__promo {
    position: absolute;
    right: 118px;
    bottom: -88px;
    width: 216px;
    height: 216px;
    border-radius: 50%;
    padding: 48px 45px;
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 26px;
    line-height: (33/26);
    color: $color-white;
    background-color: #E8505B;
  }

  &__smile {
    position: absolute;
    right: 256px;
    bottom: 105px;
    width: 25px;
    height: 25px;
  }

  &__discount {
    position: absolute;
    right: 53px;
    bottom: 10px;
    width: 104px;
    height: 106px;
    padding-bottom: 16px;
    font-size: 25px;
  }

  &__close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 26px;
    height: 26px;
    fill: $color-blue;
    cursor: pointer;
    z-index: 2;
  }

  @include media(xs) {
    &__side {
      padding: 40px 20px 185px;
    }
  }

  @include media(md) {
    &__content {
      padding: 38px 100px 45px;
    }

    &__side {
      padding: 70px 360px 80px 80px;
      min-height: 332px;
    }

    &__image {
      width: 348px;
    }

    &__like {
      right: 180px;
      bottom: 140px;
      width: 72px;
      height: 72px;
    }

    &__promo {
      right: 134px;
      bottom: -123px;
      width: 300px;
      height: 300px;
      padding: 65px 60px;
      font-size: 36px;
      line-height: (45/36);
    }

    &__smile {
      right: 325px;
      bottom: 145px;
      width: 35px;
      height: 35px;
    }

    &__discount {
      right: 45px;
      bottom: 15px;
      width: 144px;
      height: 148px;
      font-size: 36px;
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
      padding: 60px 82px 60px 70px;
    }

    &__title {
      padding-right: 0;
    }

    &__desc {
      padding-right: 50px;
    }

    &__side {
      width: 43%;
      border-left: 4px solid $color-green;
      padding: 124px 40px 352px;
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
      font-size: 14px;
      line-height: (22/14);
    }
  }
}
</style>
