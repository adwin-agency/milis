<template>
  <div
    class="modal-calc"
    :class="{'is-success': sendSuccess}"
  >
    <div class="modal-calc__content">
      <form
        class="modal-calc__form"
        ref="calcform"
        @submit.prevent="onSubmit"
      >
        <input
          type="hidden"
          name="type"
          value="size"
        >
        <input
          type="hidden"
          name="page"
          :value="inputPage"
        >
        <input
          type="hidden"
          name="item"
          :value="inputItem"
        >
        <input
          type="hidden"
          name="item_id"
          :value="inputItemId"
        >
        <input
          type="hidden"
          name="product_type"
          :value="inputProductType"
        >
        <input
          type="hidden"
          name="price"
          :value="inputPrice"
        >
        <p class="modal-calc__title">Рассчитать стоимость по Вашим размерам</p>
        <p class="modal-calc__desc">Наш специалист позвонит вам и назовет стоимость кухни по самым выгодным условиям.</p>

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
            label="Размер и пожелания"
            name="comment"
          />
          <div
            class="modal-calc__file"
            :class="{'is-active': inputFileName}"
          >
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
              {{inputFileName || 'Можно прикрепить эскиз проекта'}}
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
          {{ sending ? 'Отправляем...' : 'Рассчитать цену кухни' }}
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
    <div
      v-if="!$mobile"
      class="modal-calc__side"
    >
      <!-- <div class="modal-calc__features">
        <p class="modal-calc__feature">
          <span class="modal-calc__feature-icon">
            <Icon name="heart" />
          </span>
          Расчет за 5 минут
        </p>
        <p class="modal-calc__feature">
          <span class="modal-calc__feature-icon">
            <Icon name="heart" />
          </span>
          Выезд дизайнера и{{'\xa0'}}3D&#8209;проект — БЕСПЛАТНО
        </p>
        <p class="modal-calc__feature">
          <span class="modal-calc__feature-icon">
            <Icon name="heart" />
          </span>
          Каменная мойка в подарок
        </p>
        <p class="modal-calc__feature">
          <span class="modal-calc__feature-icon">
            <Icon name="heart" />
          </span>
          Рассрочка на 8 месяцев
        </p>
      </div>
      <img
        src="@/assets/img/modal-calc-wash.png"
        alt=""
        class="modal-calc__image"
      >
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
      /> -->
      <img
        src="@/assets/img/discount-form-ny.jpg"
        alt=""
        class="modal-calc__side-img"
      >
    </div>
    <div
      class="modal-calc__close"
      @click="$emit('close')"
    >
      <Icon name="close" />
    </div>
  </div>
</template>

<script>
import TextInput from './base/TextInput'
import Button from './base/Button'
import Icon from './base/Icon'
// import Discount from './base/Discount'
import FormSuccess from '@/components/FormSuccess'
import api from '@/api'

export default {
  name: 'ModalCalc',
  components: {
    TextInput,
    Button,
    Icon,
    // Discount,
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
    inputPrice() {
      return this.modalData && this.modalData.price
    },
    promoText() {
      return this.$store.getters.promoText?.[1]
    },
    promoEnd() {
      return this.$store.state.promoDate?.[1]
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

        if (value.trim() === '') {
          this.errors[input] = true
        }

        if (input === 'phone' && (value.length < 16 || api.checkDuplicateTel(value))) {
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

      api
        .sendForm(data, 'size')
        .then(() => {
          this.sending = false
          this.sendSuccess = true
          this.$emit('success')
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
    transition: fill 0.3s ease;
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
    transition: opacity 0.5s ease;
    z-index: -1;
  }

  &__side {
    position: relative;
    // padding: 40px 20px 250px;
    // background-color: $color-blue;
    overflow: hidden;
  }

  &__feature {
    display: flex;
    margin-bottom: 19px;
    font-weight: bold;
    font-size: 18px;
    line-height: (20/18);
    color: #fff;

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
    font-size: 16px;
    line-height: (27/20);
    color: #fff;
  }

  &__counter {
    margin-top: 40px;

    &-title {
      margin-bottom: 16px;
      font-family: $font-secondary;
      font-weight: 700;
      font-size: 18px;
      line-height: 100%;
      color: $color-green;
    }
  }

  &__image {
    position: absolute;
    right: -2px;
    bottom: 0;
    width: 282px;
  }

  &__like {
    position: absolute;
    right: 172px;
    bottom: 110px;
    width: 52px;
    height: 52px;
    fill: $color-blue;
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
    background-color: #e8505b;
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

  @include media(450) {
    &__counter {
      margin-bottom: -16%;
    }
  }

  @include media(md) {
    &__content {
      padding: 38px 100px 45px;
    }

    &__side {
      // padding: 70px 370px 100px 80px;
      min-height: 332px;
    }

    &__image {
      width: 348px;
    }

    &__like {
      right: 188px;
      bottom: 150px;
      width: 72px;
      height: 72px;
    }

    &__promo {
      right: 124px;
      bottom: -123px;
      width: 280px;
      height: 280px;
      padding: 50px 50px;
      font-size: 38px;
      line-height: (45/36);
    }

    &__smile {
      right: 315px;
      bottom: 125px;
      width: 35px;
      height: 35px;
    }

    &__discount {
      right: 84px;
      bottom: 58px;
    }

    &__counter {
      margin-bottom: 0;
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
      padding: 60px 70px;
    }

    &__title {
      padding-right: 0;
    }

    &__desc {
      padding-right: 50px;
    }

    &__side {
      width: 43.1%;
      // border-left: 4px solid $color-blue;
      // padding: 70px 40px 290px;
    }

    &__side-img {
      height: 100%;
    }

    &__promo {
      right: 164px;
    }

    &__discount {
      right: 134px;
    }

    &__like {
      right: 200px;
      bottom: 140px;
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
