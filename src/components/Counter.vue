<template>
  <div
    class="counter"
    :class="{'counter_inv': inverse}"
  >
    <div class="counter__items">
      <div class="counter__item">
        <span class="counter__num">{{ days }}</span>
        <span class="counter__text">{{ daysText }}</span>
      </div>
      <div class="counter__item">
        <span class="counter__num">{{ hours }}</span>
        <span class="counter__text">{{ hoursText }}</span>
      </div>
      <div class="counter__item">
        <span class="counter__num">{{ minutes }}</span>
        <span class="counter__text">{{ minutesText }}</span>
      </div>
      <div class="counter__item">
        <span class="counter__num">{{ seconds }}</span>
        <span class="counter__text">{{ secondsText }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  props: {
    inverse: Boolean,
    date: String
  },
  data() {
    return {
      interval: null,
      days: null,
      hours: null,
      minutes: null,
      seconds: null
    }
  },
  computed: {
    daysText() {
      return this.numWord(this.days, ['день', 'дня', 'дней'])
    },
    hoursText() {
      return this.numWord(this.hours, ['час', 'часа', 'часов'])
    },
    minutesText() {
      return this.numWord(this.minutes, ['минута', 'минуты', 'минут'])
    },
    secondsText() {
      return this.numWord(this.seconds, ['секунда', 'секунды', 'секунд'])
    }
  },
  watch: {
    date() {
      if (this.interval) {
        clearInterval(this.interval)
      }
      this.startCounter()
    }
  },
  methods: {
    startCounter() {
      const dateArr = this.date.split('.')
      const end = new Date(
        +dateArr[2],
        +dateArr[1] - 1,
        +dateArr[0] + 1
      ).getTime()

      this.interval = setInterval(() => {
        const now = new Date().getTime()
        const diff = end > now ? end - now : 0

        this.seconds = Math.floor((diff % (1000 * 60)) / 1000)
        this.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        this.hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
        this.days = Math.floor(diff / (1000 * 60 * 60 * 24))

        if (diff <= 0) {
          clearInterval(this.interval)
        }
      }, 1000)
    },
    numWord(value, words) {
      const val = Math.abs(value) % 100
      const num = value % 10

      if (val > 10 && val < 20) return words[2]
      if (num > 1 && num < 5) return words[1]
      if (num == 1) return words[0]

      return words[2]
    }
  },
  created() {
    if (this.date) {
      this.startCounter()
    }
  },
  destroyed() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }
}
</script>

<style lang="scss">
.counter {
  $b: &;

  &_inv {
    #{$b} {
      &__items {
        justify-content: flex-start;
      }

      &__text {
        order: -1;
        margin-top: 0;
        margin-bottom: 6px;
      }
    }
  }

  &__items {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
  }

  &__item {
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    text-align: center;
    font-family: $font-secondary;
    line-height: 100%;
    color: #fff;

    &:last-child {
      margin-right: 0;
    }
  }

  &__text {
    margin-top: 10px;
    font-weight: 500;
    font-size: 10px;
  }

  &__num {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 60px;
    border-radius: 4px;
    font-weight: 700;
    font-size: 20px;
    background-color: #b9bbc6;
  }

  @include media(xl) {
    &__num {
      width: 60px;
      height: 70px;
      font-size: 25px;
    }

    &__text {
      font-size: 12px;
    }
  }
}
</style>
