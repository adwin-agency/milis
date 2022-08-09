<template>
  <form
    :class="['call-form', {'call-form_modal': modal}]"
    ref="callform"
    @submit.prevent="onSubmit"
  >
    <input type="hidden" name="type" value="designer">
    <input type="hidden" name="page" :value="inputPage">
    <input type="hidden" name="item" :value="inputItem">
    <input type="hidden" name="item_id" :value="inputItemId">
    <input type="hidden" name="product_type" :value="inputProductType">
    <p class="call-form__title">Пригласите дизайнера домой</p>
    <p class="call-form__desc">Заполните заявку на сайте, выберите удобные дату и время встречи. Наши специалисты свяжутся с вами для подтверждения заявки.</p>
    <div class="call-form__items">
      <div class="call-form__fields">
        <TextInput
          class="call-form__field"
          label="Имя"
          type="text"
          name="name"
          :error="errors.name"
          @input="onInput('name', $event)"
        />
        <TextInput
          class="call-form__field"
          label="Телефон"
          type="tel"
          name="phone"
          :error="errors.phone"
          @input="onInput('phone', $event)"
        />
        <div class="call-form__dates">
          <label
            v-for="(item, index) in dates"
            :key="index"
            class="call-form__date"
            @click="showTimes"
          >
            <input
              class="call-form__date-radio"
              type="radio"
              name="date"
              :value="weekdays[index] + ' ' + daysmonths[index]"
            >
            <span class="call-form__date-box"><b>{{weekdays[index]}}</b><br>{{daysmonths[index]}}</span>
          </label>
        </div>
        <div
          class="call-form__times"
          :class="{'is-active': activeTimes}"
          ref="times"
        >
          <p class="call-form__times-title">Интервал времени</p>
          <div
            v-for="(time, index) in times"
            :key="index"
            class="call-form__times-item"
          >
            <label class="call-form__time">
              <input
                class="call-form__time-radio"
                type="radio"
                name="time"
                :value="time"
              >
              <span class="call-form__time-box">{{time}}</span>
              <span class="call-form__time-check">
                <Icon name="check-circle"/>
              </span>
            </label>
          </div>
        </div>
        <Button
          class="call-form__btn"
          type="submit"
          blue
        >
          {{ sending ? 'Отправляем...' : 'Отправить' }}
        </Button>
        <p
          v-if="sendError"
          class="call-form__error"
        >
          Ошибка отправки
        </p>
      </div>
      <div class="call-form__features">
        <p class="call-form__feature">
          <span class="call-form__feature-icon">
            <Icon name="money"/>
          </span>
          Замеры производятся БЕСПЛАТНО
        </p>
        <p class="call-form__feature">
          <span class="call-form__feature-icon">
            <Icon name="ruler"/>
          </span>
          Дизайнер замерит помещение
        </p>
        <p class="call-form__feature">
          <span class="call-form__feature-icon">
            <Icon name="paint"/>
          </span>
          Предложит выбор из более чем 250{{'\xa0'}}видов цветов и фактур
        </p>
        <p class="call-form__feature">
          <span class="call-form__feature-icon">
            <Icon name="brilliant"/>
          </span>
          Подберет для Вас лучший вариант
        </p>
        <p class="call-form__decor" v-if="$windowWidth >= $breakpoints.md && $windowWidth < $breakpoints.lg">Все просто!</p>
      </div>
    </div>
  </form>
</template>

<script>
import TextInput from './base/TextInput'
import Icon from './base/Icon'
import Button from './base/Button'
import api from '@/api'

export default {
  name: 'CallForm',
  components: {
    TextInput,
    Icon,
    Button
  },
  props: {
    modal: Boolean,
    hiddenData: Object,
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
      dates: null,
      times: ['09:00 - 12:00', '12:00 - 15:00', '15:00 - 18:00', '18:00 - 21:00'],
      activeTimes: false,
      sending: false,
      sendSuccess: false,
      sendError: false
    }
  },
  computed: {
    inputPage() {
      return this.$route.path
    },
    inputItem() {
      return this.hiddenData && this.hiddenData.item
    },
    inputItemId() {
      return this.hiddenData && this.hiddenData.itemId
    },
    inputProductType() {
      return this.hiddenData && this.hiddenData.productType
    },
    weekdays() {
      return this.dates.map(item => item.toLocaleString('ru', {weekday: 'short'}))
    },
    daysmonths() {
      return this.dates.map(item => item.toLocaleString('ru', {day: '2-digit', month: 'long'}))
    }
  },
  created() {
    const today = new Date()
    const tomorrow = new Date()
    const afterTomorrow = new Date()

    tomorrow.setDate(tomorrow.getDate() + 1)
    afterTomorrow.setDate(afterTomorrow.getDate() + 2)

    this.dates = [today, tomorrow, afterTomorrow]
  },
  methods: {
    showTimes() {
      if (this.activeTimes) {
        return
      }

      this.activeTimes = true

      const timesRef = this.$refs.times
      timesRef.style.height = timesRef.scrollHeight + 'px'

      setTimeout(() => {
        timesRef.style.height = 'auto'
      }, 300)
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
      const data = new FormData(this.$refs.callform)

      api.sendForm(data, 'designer')
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
.call-form {
  $b: &;

  &_modal {
    #{$b} {
      &__title {
        padding-right: 50px;
        margin-bottom: 20px;
      }

      &__field {
        background-color: $color-white;
      }
    }
  }

  &__title {
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

  &__items {
    margin-top: 25px;
  }

  &__field {
    margin-top: 24px;
    background-color: #F9F9F9;

    &:first-child {
      margin-top: 0;
    }
  }

  &__dates {
    display: flex;
    margin: 26px -3px 0;
  }

  &__date {
    display: block;
    flex-grow: 1;
    margin: 0 3px;
    font-family: $font-secondary;
    cursor: pointer;
  }

  &__date-radio {
    display: none;

    &:checked + #{$b}__date-box {
      background-color: $color-green;
    }
  }

  &__date-box {
    display: block;
    padding: 6px;
    text-align: center;
    font-size: 11px;
    line-height: (14/11);
    color: $color-white;
    background-color: $color-blue;
    transition: background-color .3s ease;
  }

  &__times {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -10px -10px;
    height: 0;
    padding-top: 18px;
    opacity: 0;
    overflow: hidden;
    transition: opacity .3s ease, height .3s ease;

    &.is-active {
      opacity: 1;
    }
  }

  &__times-title {
    width: 100%;
    margin-left: 10px;
    margin-bottom: 9px;
    font-size: 11px;
    line-height: (17/11);
    color: $color-gray;
  }

  &__times-item {
    flex: 1 0 50%;
    padding: 0 10px;
    margin-bottom: 10px;
  }

  &__time {
    display: block;
    position: relative;
    font-family: $font-secondary;
    cursor: pointer;
  }

  &__time-radio {
    display: none;

    &:checked ~ #{$b}__time-box {
      border-color: $color-green;
    }

    &:checked ~ #{$b}__time-check {
      opacity: 1;
    }
  }

  &__time-box {
    display: block;
    border: 1px solid $color-gray;
    padding: 5px;
    text-align: center;
    font-size: 12px;
    line-height: (16/12);
    white-space: nowrap;
    color: $color-blue;
    transition: border-color .3s ease;
  }

  &__time-check {
    position: absolute;
    top: -7px;
    right: -5px;
    width: 11px;
    height: 11px;
    opacity: 0;
    pointer-events: none;
    transition: opacity .3s ease;
  }

  &__btn {
    margin-top: 28px;
    width: 100%;
  }

  &__features {
    margin-top: 26px;
    padding-right: 20px;
  }

  &__feature {
    display: flex;
    align-items: center;
    margin-bottom: 23px;
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 12px;
    line-height: (16/12);
    color: $color-blue;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__feature-icon {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    margin-right: 14px;
  }

  &__error {
    margin-top: 12px;
    text-align: center;
    font-family: $font-secondary;
    font-size: 14px;
    color: $color-red;
  }

  &__decor {
    display: none;
    margin-top: -6px;
    margin-left: 6px;
    font-family: $font-decorative;
    font-size: 50px;
    color: $color-gray-middle;
  }

  @include media(md) {
    &_modal {
      #{$b} {
        &__title {
          margin-bottom: 0;
        }
      }
    }

    &__desc {
      max-width: 620px;
    }

    &__items {
      display: flex;
      margin-top: 22px;
    }

    &__fields {
      width: 57%;
      margin-right: 26px;
    }

    &__times {
      margin: 0 -6px -10px;
    }

    &__times-title {
      margin-left: 6px;
    }

    &__times-item {
      flex: 1 0 25%;
      padding: 0 6px;
    }

    &__features {
      flex: 1;
      align-self: center;
      margin-top: 0;
      padding-right: 0;
    }

    &__feature {
      margin-bottom: 38px;
    }

    &__feature-icon {
      width: 24px;
      height: 24px;
      margin-right: 8px;
    }

    &__decor {
      display: block;
    }
  }

  @include media(lg) {
    &_modal {
      #{$b} {
        &__title {
          padding-right: 0;
        }

        &__items {
          display: block;
          margin-right: 105px;
        }

        &__fields {
          width: 100%;
        }

        &__features {
          margin-top: 26px;
        }

        &__feature {
          margin-bottom: 22px;

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }

    &__fields {
      width: 50%;
      margin-right: 60px;
    }

    &__feature {
      font-size: 14px;
      line-height: (19/14);
    }

    &__feature-icon {
      margin-right: 12px;
    }
  }

  @include media(xl) {
    &_modal {
      #{$b} {
        &__items {
          display: flex;
          margin-right: 0;
        }

        &__fields {
          width: 51%;
        }

        &__features {
          margin-top: 0;
        }

        &__feature {
          margin-bottom: 38px;
        }
      }
    }

    &__fields {
      min-width: 390px;
    }
  }
}
</style>