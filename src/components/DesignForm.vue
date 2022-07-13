<template>
  <form
    class="design-form"
    ref="form"
    @submit.prevent="handleSubmit"
  >
    <input
      type="hidden"
      name="type"
      :value="formType"
    >
    <input
      type="hidden"
      name="page"
      :value="page"
    >
    <div
      class="design-form__content"
      :class="{'active': !formSuccess}"
    >
      <p class="design-form__title">Бесплатный вызов дизайнера на дом</p>
      <div class="design-form__fields">
        <input
          type="text"
          class="design-form__field"
          :class="{'error': errors.name}"
          placeholder="Имя"
          name="name"
          @input="handleInput('name', $event)"
        >
        <input
          type="tel"
          class="design-form__field"
          :class="{'error': errors.phone}"
          placeholder="Контактный телефон"
          name="phone"
          @input="handleInput('phone', $event)"
        >
        <button class="design-form__btn">{{formSending ? 'Отправляем...' : 'Отправить'}}</button>
      </div>
      <p
        v-if="formError"
        class="design-form__error"
      >
        Ошибка отправки
      </p>
      <p class="design-form__note">Нажимая кнопку "Отправить", вы соглашаетесь с
        <a
          href="/"
          target="_blank"
        >
          Политикой конфиденциальности
        </a>
      </p>
    </div>
    <div
      class="design-form__success"
      :class="{'active': formSuccess}"
    >
      <p class="design-form__title">Заявка принята!</p>
      <p class="design-form__desc">Спасибо за ваше обращение, наши менеджеры свяжутся с вами в ближайшее время :)</p>
    </div>
    <Icon
      class="design-form__icon"
      name="leaf-double"
    />
  </form>
</template>

<script>
import Icon from './base/Icon.vue'
import api from '../api'

export default {
  name: 'DesignForm',
  components: {
    Icon
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
      formType: 'designer-inner',
      formSending: false,
      formSuccess: false,
      formError: false
    }
  },
  computed: {
    page() {
      return this.$route.path
    }
  },
  methods: {
    handleInput(name, e) {
      if (name === 'phone') {
        let val = e.target.value.replace(/\D/g, '')

        if (val) {
          if (val[0] === '7' || val[0] === '8') {
            val = val.slice(1)
          }

          val = val.match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/)
          val =
            '+7' +
            (val[2] ? '(' + val[1] + ')' + val[2] : val[1] ? val[1] : '') +
            (val[3] ? '-' + val[3] : '') +
            (val[4] ? '-' + val[4] : '')
        }

        e.target.value = val
      }

      this.inputs[name] = e.target.value
      this.errors[name] = false
    },
    handleSubmit() {
      if (this.formSending || this.formSuccess) {
        return
      }

      for (let input in this.inputs) {
        const value = this.inputs[input]

        if (value.trim() === '' || (input === 'phone' && value.length < 16)) {
          this.errors[input] = true
        }
      }

      for (let error in this.errors) {
        if (this.errors[error]) {
          return
        }
      }

      this.formSending = true
      this.formError = false
      const data = new FormData(this.$refs.form)

      api
        .sendForm(data, this.formType)
        .then(() => {
          this.formSending = false
          this.formSuccess = true
        })
        .catch(() => {
          this.formSending = false
          this.formError = true
        })
    }
  }
}
</script>

<style lang="scss">
.design-form {
  position: relative;
  color: #fff;
  background-color: $color-blue;

  &__content,
  &__success {
    padding: 30px 20px;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;

    &.active {
      opacity: 1;
      pointer-events: all;
    }
  }

  &__title {
    font-family: $font-secondary;
    font-weight: 700;
    font-size: 34px;
    font-size: 22px;
    line-height: 110%;
  }

  &__desc {
    margin-top: 32px;
    font-family: $font-secondary;
    font-weight: 700;
    font-size: 18px;
    line-height: 130%;
  }

  &__fields {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
  }

  &__field {
    height: 60px;
    padding: 0 25px;
    font-size: 14px;
    background: #ffffff;
    border: 1px solid #e0e0e0;

    &::placeholder {
      color: #acacac;
    }

    & + & {
      margin-top: 12px;
    }

    &.error {
      border-color: #FB4C58;
      color: #FB4C58;

      &::placeholder {
        color: #FB4C58;
      }
    }
  }

  &__btn {
    margin-top: 18px;
    height: 60px;
    font-family: $font-secondary;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    background-color: $color-green;
  }

  &__error {
    margin-top: 10px;
    font-size: 14px;
    text-align: center;
    color: #FB4C58;
  }

  &__note {
    margin-top: 24px;
    padding-right: 50px;
    font-size: 12px;
    line-height: 15px;
    color: #acacac;

    a {
      text-decoration: underline;
    }
  }

  &__success {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  &__icon {
    position: absolute;
    right: -20px;
    bottom: -20px;
    width: 86px;
    height: 86px;
  }

  @include media(md) {
    &__title {
      font-size: 24px;
    }
  }

  @include media(lg) {
    &__content,
    &__success {
      padding: 30px 50px;
    }

    &__title {
      font-size: 28px;
    }

    &__desc {
      font-size: 20px;
    }
  }

  @include media(xl) {
    &__content,
    &__success {
      padding: 54px 70px 35px;
    }

    &__title {
      font-size: 34px;
    }

    &__desc {
      font-size: 22px;
    }

    &__fields {
      flex-direction: row;
    }

    &__field {
      flex: 1;

      & + & {
        margin-top: 0;
        margin-left: 12px;
      }
    }

    &__btn {
      flex: 1;
      margin-top: 0;
      margin-left: 18px;
    }

    &__note {
      padding-right: 0;
      text-align: right;
    }

    &__success {
      justify-content: flex-start;
    }

    &__icon {
      left: -30px;
      top: 38px;
    }
  }
}
</style>
