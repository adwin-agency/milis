<template>
  <div class="contacts page-top">
    <div class="row">
      <div class="col col-12 col-lg-6 contacts__map-col">
        <YandexMap
          class="contacts__map anim-img js-anim"
          :class="{'show': activeMap}"
          :settings="settings"
          :coords="activeCity ? [activeCity.coords.lat, activeCity.coords.long] : []"
          :zoom="14"
          :controls="[]"
          :options="{suppressMapOpenBlock: true}"
          @map-was-initialized="onMapInit"
        >
          <YmapMarker
            marker-id="marker"
            :coords="activeCity ? [activeCity.coords.lat, activeCity.coords.long] : []"
            :icon="{
              layout: 'default#image',
              imageHref: require('@/assets/img/marker.svg'),
              imageSize: [60, 80],
              imageOffset: [-30, -80]
            }"
          />
        </YandexMap>
      </div>
      <div class="col col-12 col-lg-6 col-xl-5">
        <Header class="page-header fade-slide-down js-anim" v-anim="true" />
        <div class="contacts__content fade-bounce-right js-anim" v-anim="true">
          <h1 class="contacts__heading">Контакты</h1>
          <div class="contacts__items">
            <div class="contacts__item">
              <p class="contacts__title">Адрес</p>
              <p class="contacts__desc">{{activeCity && activeCity.name}}, {{activeCity && activeCity.address}}</p>
            </div>
            <div class="contacts__item">
              <p class="contacts__title">Телефон</p>
              <p class="contacts__desc">{{activeCity && activeCity.phone}}</p>
            </div>
            <div class="contacts__item">
              <p class="contacts__title">Режим работы</p>
              <p class="contacts__desc">с 09.00 до 20.00 ежедневно, без выходных</p>
            </div>
          </div>
          <form
            class="contacts__form"
            :class="{'is-success': sendSuccess}"
            ref="contactform"
            @submit.prevent="onSubmit"
          >
            <input type="hidden" name="type" value="contacts">
            <input type="hidden" name="page" :value="inputPage">
            <div class="contacts__form-items">
              <div class="contacts__fields">
                <TextInput
                  class="contacts__field"
                  label="Телефон"
                  type="tel"
                  name="phone"
                  :error="errors.phone"
                  @input="onInput('phone', $event)"
                />
                <TextInput
                  class="contacts__field"
                  textarea
                  label="Задать вопрос"
                  name="comment"
                />
              </div>
              <Button
                type="submit"
                class="contacts__btn"
              >
                Отправить заявку
              </Button>
            </div>
            <p
              v-if="sendError"
              class="contacts__error"
            >
              Ошибка отправки
            </p>
            <div class="contacts__success">
              <FormSuccess
                :class="{'is-active': sendSuccess}"
                :title="`Ваша заявка \n успешно отправлена!`"
              />
            </div>
          </form>
        </div>
      </div>
    </div>    
  </div>
</template>

<script>
import TextInput from './base/TextInput'
import Button from './base/Button'
import Header from './Header'
import FormSuccess from '@/components/FormSuccess'
import { yandexMap as YandexMap, ymapMarker as YmapMarker } from 'vue-yandex-maps'
import api from '@/api'

export default {
  name: 'Contacts',
  components: {
    TextInput,
    Button,
    Header,
    FormSuccess,
    YandexMap,
    YmapMarker
  },
  data() {
    return {
      activeMap: false,
      settings: {
        apiKey: '97b47e29-9575-451d-85f1-81cb05d53b6d'
      },
      inputs: {
        phone: ''
      },
      errors: {
        phone: false
      },
      sending: false,
      sendSuccess: false,
      sendError: false
    }
  },
  computed: {
    activeCity() {
      return this.$store.getters.activeCity
    },
    inputPage() {
      return this.$route.path
    }
  },
  methods: {
    onMapInit() {
      this.activeMap = true
    },

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
      const data = new FormData(this.$refs.contactform)

      api.sendForm(data, 'contact')
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
.contacts {
  $b: &;

  &__content {
    margin-top: 40px;
  }

  &__heading {
    font-size: 34px;
    line-height: (41/34);
  }

  &__items {
    margin-top: 20px;
  }

  &__item {
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__title {
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 14px;
    line-height: (22/14);
    color: $color-blue;
  }

  &__desc {
    margin-top: 2px;
    font-size: 14px;
    line-height: (22/14);
    color: $color-gray-middle;
  }

  &__form {
    position: relative;
    margin-top: 34px;

    &.is-success {
      #{$b} {
        &__success {
          opacity: 1;
          pointer-events: all;
          z-index: auto;
        }
      }
    }
  }

  &__field {
    margin-bottom: 22px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__btn {
    margin-top: 20px;
    width: 100%;
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
    background-color: #fff;
    opacity: 0;
    pointer-events: none;
    transition: opacity .5s ease;
    z-index: -1;
  }

  &__error {
    margin-top: 12px;
    text-align: center;
    font-family: $font-secondary;
    font-size: 14px;
    color: $color-red;
  }

  &__map {
    margin: 0 (-$container-padding);
    height: 300px;
    background-color: #ccc;
  }

  @include media(md) {
    &__map {
      margin: 0 (-$container-padding-md);
      height: 580px;
    }

    &__heading {
      font-size: 44px;
      line-height: (54/44);
    }

    &__form {
      margin-right: 100px;
    }

    &__form-items {
      display: flex;
      align-items: flex-end;
    }

    &__fields {
      flex: 1;
      margin-right: 32px;
    }

    &__field {
      margin-bottom: 32px;
      background-color: $color-white;
    }

    &__btn {
      width: 174px;
      height: 133px;
      line-height: (22/14);
    }
  }

  @include media(lg) {
    &__map-col {
      order: 1;
    }

    &__map {
      margin-left: 0;
      height: 400px;
      padding-top: 0;
    }

    &__items {
      margin-top: 34px;
    }

    &__form {
      margin-right: -70px;
    }
  }

  @include media(xl) {
    &__map-col {
      margin-left: auto;
    }

    &__map {
      margin-right: -$container-padding-xl;
      height: 716px;
    }

    &__content {
      margin-top: 56px;
    }

    &__heading {
      font-size: 60px;
      line-height: (73/60);
    }

    &__items {
      margin-top: 44px;
    }

    &__form {
      margin-top: 30px;
      margin-right: 120px;
    }
  }
}
</style>
