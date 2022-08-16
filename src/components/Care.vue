<template>
  <div class="care">
    <div class="row">
      <div class="col col-12 col-lg-6">
        <Header
          class="slide-down js-anim"
          v-anim="true"
        />
        <div class="care__main fade-bounce-right js-anim" v-anim="true">
          <h1 class="care__heading">Центр заботы о клиентах</h1>
          <p class="care__desc">Вы наш клиент и столкнулись с проблемой? Обязательно расскажите, мы свяжемся с Вами в ближайшее время!</p>
          <form
            class="care__form"
            ref="form"
            @submit.prevent="handleSubmit"
          >
            <input
              type="hidden"
              name="type"
              value="care"
            >
            <input
              type="hidden"
              name="page"
              :value="currentPath"
            >
            <div class="care__fields">
              <TextInput
                class="care__field care__field_half"
                label="ФИО"
                name="name"
                :error="errors.name"
                @input="handleInput('name', $event)"
              />
              <TextInput
                class="care__field care__field_half"
                label="Номер телефона"
                type="tel"
                name="phone"
                :error="errors.phone"
                @input="handleInput('phone', $event)"
              />
            </div>
            <Select
              class="care__field"
              name="question"
              :options="[
              { value: 'default', title: 'Предложенные варианты проблемы' },
              { value: 'order', title: 'Вопрос по уже выполненному заказу / гарантии' },
              { value: 'spec', title: 'Вопрос по работе специалиста' },
              { value: 'payment', title: 'Вопрос по оплате заказа' },
              { value: 'refund', title: 'Вопрос о возврате средств' },
              { value: 'other', title: 'Другие вопросы' },
            ]"
              id="care-question"
              withDefault
              :error="errors.question"
              @changeSelect="handleSelect('question', $event)"
            />
            <TextInput
              class="care__field"
              label="Опишите суть проблемы..."
              name="comment"
              textarea
              :error="errors.comment"
              @input="handleInput('comment', $event)"
            />
            <div class="care__form-footer">
              <Button
                class="care__btn"
                type="submit"
              >
                {{ sending ? 'Отправляем...' : 'Отправить заявку' }}
              </Button>
              <p
                v-if="sendError"
                class="care__error"
              >
                Ошибка отправки
              </p>
              <p class="care__policy">Нажимая кнопку “Отправить заявку”, вы соглашаетесь с 
                <a
                  :href="policyLink"
                  target="_blank"
                >
                  Политикой конфиденциальности
                </a>
              </p>
            </div>
          </form>
          <p class="care__note">Вы можете написать нам напрямую на email <a href="mailto:zabotaoklientah@kuhzavod.ru">zabotaoklientah@kuhzavod.ru</a></p>
        </div>
      </div>
      <div class="col col-12 col-lg-6">
        <div class="care__img anim-img js-anim" v-anim="true">
          <img src="/assets/img/care.jpg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from './base/Button.vue'
import Select from './base/Select.vue'
import TextInput from './base/TextInput.vue'
import Header from './Header.vue'
import api from '../api'

export default {
  name: 'Care',
  components: {
    Header,
    Select,
    Button,
    TextInput
  },
  data() {
    return {
      values: {
        name: '',
        phone: '',
        question: '',
        comment: ''
      },
      errors: {
        name: false,
        phone: false,
        question: false,
        comment: false
      },
      sending: false,
      sendError: false
    }
  },
  computed: {
    currentPath() {
      return this.$route.path
    },
    activeCityCode() {
      return this.$store.getters.activeCity?.code
    },
    policyLink() {
      return '/docs/policy_' + this.activeCityCode + '.pdf'
    }
  },
  methods: {
    handleInput(name, value) {
      if (this.errors[name]) {
        this.errors[name] = false
      }

      this.values[name] = value
    },
    handleSelect(name, value) {
      if (this.errors[name]) {
        this.errors[name] = false
      }

      this.values[name] = value.value
    },
    handleSubmit() {
      for (let key in this.values) {
        const value = this.values[key]

        console.log(value)

        if (value.trim() === '') {
          this.errors[key] = true
        }

        if (key === 'phone' && value.length < 16) {
          this.errors[key] = true
        }
      }

      for (let key in this.errors) {
        if (this.errors[key]) {
          return
        }
      }

      this.sending = true
      this.sendError = false
      const data = new FormData(this.$refs.form)

      api
        .sendForm(data, 'care')
        .then(() => {
          this.sending = false
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
.care {
  &__main {
    padding-top: 26px;
  }

  &__heading {
    font-size: 34px;
    line-height: (41/34);
  }

  &__desc {
    margin-top: 18px;
    font-family: $font-secondary;
    font-weight: 700;
    font-size: 14px;
    line-height: 120%;
    color: $color-blue;
  }

  &__form {
    margin-top: 38px;
  }

  &__field {
    margin-bottom: 20px;
    background-color: #fff;
  }

  &__btn {
    width: 100%;
  }

  &__error {
    margin-top: 12px;
    text-align: center;
    font-size: 14px;
    color: $color-red;
  }

  &__policy {
    margin-top: 20px;
    font-family: $font-secondary;
    font-size: 12px;
    line-height: 120%;
    color: $color-gray-middle;

    a {
      text-decoration: underline;
    }
  }

  &__note {
    margin-top: 30px;
    padding: 20px;
    background: $color-gray-8;
    border-radius: 8px;
    font-family: $font-secondary;
    font-weight: 700;
    font-size: 14px;
    line-height: 1.2;
    color: $color-blue;
  }

  &__img {
    margin: 30px (-$container-padding) 0;
    width: calc(100% + #{$container-padding} * 2);
  }

  @include media(md) {
    &__heading {
      font-size: 44px;
      line-height: (54/44);
    }

    &__fields {
      display: flex;
      justify-content: space-between;
    }

    &__field {
      width: 100%;

      &_half {
        width: calc(50% - 10px);
      }
    }

    &__note {
      padding: 30px 40px;
    }

    &__img {
      margin: 30px (-$container-padding-md) 0;
      width: calc(100% + #{$container-padding-md} * 2);
    }
  }

  @include media(lg) {
    &__main {
      max-width: 680px;
      padding-top: 40px;
      padding-bottom: 25px;
    }

    &__form-footer {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }

    &__btn {
      width: 270px;
      flex-shrink: 0;
    }

    &__error {
      order: 1;
      width: 270px;
    }

    &__policy {
      width: calc(100% - 270px);
      margin-top: 0;
      padding-left: 20px;
    }

    &__img {
      margin: 0 (-$container-padding-md) 0 0;
      width: calc(100% + #{$container-padding-md});
    }
  }

  @include media(xl) {
    &__main {
      padding-top: 60px;
    }

    &__heading {
      font-size: 60px;
      line-height: (73/60);
    }

    &__img {
      margin: 0 (-$container-padding-xl) 0 0;
      width: calc(100% + #{$container-padding-xl});
    }
  }
}
</style>