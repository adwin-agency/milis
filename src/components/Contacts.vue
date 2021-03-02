<template>
  <div class="contacts page-top">
    <div class="row">
      <div class="col col-12 col-lg-6 contacts__map-col">
        <YandexMap
          class="contacts__map anim-img js-anim"
          :class="{'show': activeMap}"
          :settings="settings"
          :coords="[59.969281, 30.451343]"
          :zoom="14"
          :controls="[]"
          :options="{suppressMapOpenBlock: true}"
          @map-was-initialized="onMapInit"
        >
          <YmapMarker
            marker-id="123"
            :coords="[59.969281, 30.451343]"
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
          <form class="contacts__form">
            <div class="contacts__fields">
              <TextInput                
                label="Телефон"
                class="contacts__field"
              />
              <TextInput
                textarea
                label="Задать вопрос"
                class="contacts__field"
              />
            </div>
            <Button
              type="submit"
              class="contacts__btn"
            >
              Отправить заявку
            </Button>
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
import { yandexMap as YandexMap, ymapMarker as YmapMarker } from 'vue-yandex-maps'

export default {
  name: 'Contacts',
  components: {
    TextInput,
    Button,
    Header,
    YandexMap,
    YmapMarker
  },
  data() {
    return {
      activeMap: false,
      settings: {
        apiKey: '97b47e29-9575-451d-85f1-81cb05d53b6d'
      }
    }
  },
  computed: {
    activeCity() {
      return this.$store.state.cities[0]
    }
  },
  methods: {
    onMapInit() {
      this.activeMap = true
    }
  }
}
</script>

<style lang="scss">
.contacts {
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
    margin-top: 34px;
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

  &__map {
    margin: 0 (-$container-padding);
    padding-top: 79%;
    background-color: #ccc;
  }

  @include media(md) {
    &__map {
      margin: 0 (-$container-padding-md);
      padding-top: 82%;
    }

    &__heading {
      font-size: 44px;
      line-height: (54/44);
    }

    &__form {
      display: flex;
      align-items: flex-end;
      margin-right: 100px;
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
