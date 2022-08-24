<template>
  <form
    class="main-form"
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
      class="main-form__content"
      :class="{'active': !formSuccess}"
    >
      <div class="main-form__header">
        <p class="main-form__title">Бесплатный выезд дизайнера и 3D-проект</p>
        <p
          v-if="!$mobile"
          class="main-form__desc"
        >Замер помещения и создание проекта по размерам вашей кухни</p>
        <Icon
          v-if="!$mobile"
          class="main-form__icon"
          name="leaf-double"
        />
      </div>
      <div class="main-form__fields">
        <input
          type="text"
          class="main-form__field"
          :class="{'error': errors.name}"
          placeholder="Имя"
          name="name"
          @input="handleInput('name', $event)"
        >
        <input
          type="tel"
          class="main-form__field"
          :class="{'error': errors.phone}"
          placeholder="Контактный телефон"
          name="phone"
          @input="handleInput('phone', $event)"
        >
        <Button
          class="main-form__btn"
          type="submit"
        >{{formSending ? 'Отправляем...' : 'Пригласить бесплатно'}}</Button>
        <p
          v-if="formError"
          class="main-form__error"
        >
          Ошибка отправки
        </p>
        <p class="main-form__policy">Нажимая кнопку “Пригласить бесплатно”, вы соглашаетесь с
          <a
            :href="policyLink"
            target="_blank"
          >Политикой конфиденциальности</a>
        </p>
      </div>
    </div>
    <div
      class="main-form__success"
      :class="{'active': formSuccess}"
    >
      <p class="main-form__title">Заявка принята!</p>
      <p class="main-form__desc">Спасибо за ваше обращение, наши менеджеры свяжутся с вами в ближайшее время :)</p>
    </div>
    <Icon
      v-if="$mobile"
      class="main-form__icon"
      name="leaf-double"
    />
  </form>
</template>

<script>
import Button from './base/Button.vue'
import Icon from './base/Icon.vue'
import api from '../api'

export default {
  name: 'MainForm',
  components: {
    Icon,
    Button
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
      formType: 'designer-main',
      formSending: false,
      formSuccess: false,
      formError: false
    }
  },
  computed: {
    page() {
      return this.$route.path
    },
    activeCity() {
      return this.$store.getters.activeCity?.code
    },
    policyLink() {
      return '/docs/policy_' + this.activeCity + '.pdf'
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
.main-form {
  position: relative;
  border-radius: 6px;
  font-family: $font-secondary;
  background: $color-blue;

  &__content,
  &__success {
    padding: 32px 15px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;

    &.active {
      opacity: 1;
      pointer-events: all;
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
    text-align: center;
  }

  &__title {
    font-weight: 700;
    font-size: 20px;
    line-height: 110%;
    color: #ffffff;
  }

  &__desc {
    margin: 18px auto 0;
    max-width: 290px;
    font-size: 16px;
    line-height: 110%;
    color: #ffffff;
  }

  &__fields {
    margin-top: 18px;
  }

  &__field {
    margin-bottom: 10px;
    width: 100%;
    height: 60px;
    padding: 0 30px;
    font-size: 14px;
    border: 1px solid #e0e0e0;
    background-color: #fff;
    transition: border-color 0.3s ease, color 0.3s ease;

    &::placeholder {
      color: $color-gray-middle;
      transition: color 0.3s ease;
    }

    &.error {
      border-color: $color-red;
      color: $color-red;

      &::placeholder {
        color: $color-red;
      }
    }
  }

  &__btn {
    margin-top: 5px;
    width: 100%;
    height: 60px;
    font-weight: 700;
  }

  &__error {
    margin-top: 10px;
    font-size: 14px;
    text-align: center;
    color: $color-red;
  }

  &__policy {
    margin-top: 12px;
    font-size: 11px;
    line-height: 120%;
    color: $color-gray-middle;

    a {
      text-decoration: underline;
    }
  }

  &__icon {
    position: absolute;
    right: -18px;
    bottom: -12px;
    width: 60px;
    height: 60px;
  }

  @include media(md) {
    &__content,
    &__success {
      padding: 32px;
    }
  }

  @include media(lg) {
    &__content,
    &__success {
      padding: 40px 80px;
    }

    &__content {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    &__success {
      text-align: left;
    }

    &__header {
      position: relative;
      padding-left: 78px;
      max-width: 406px;
    }

    &__title {
      font-size: 24px;
    }

    &__desc {
      margin: 18px 0 0;
      max-width: none;
    }

    &__icon {
      left: 0;
      top: 0;
      right: auto;
      bottom: auto;
    }

    &__fields {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 24px 18px;
      align-items: center;
      margin-top: 0;
      margin-left: 30px;
      width: 618px;
      flex-shrink: 0;
    }

    &__field {
      margin-bottom: 0;
    }

    &__btn {
      order: 1;
      margin-top: 0;
    }

    &__error {
      order: 1;
      grid-column: 2/3;
      margin-top: -15px;
    }

    &__policy {
      margin-top: 0;
      text-align: right;
    }
  }

  @include media(xl) {
    &__content,
    &__success {
      padding: 70px 120px;
    }

    &__header {
      max-width: 536px;
    }

    &__title {
      font-size: 34px;
    }

    &__desc {
      font-size: 22px;
    }

    &__fields {
      width: 720px;
    }
  }
}
</style>