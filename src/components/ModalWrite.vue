<template>
  <div class="modal-write">
    <div class="modal-write__content">
      <form class="modal-write__form">
        <div class="modal-write__row">
          <TextInput label="Имя" class="modal-write__field" />            
          <div class="modal-write__rate">
            <label class="modal-write__rate-item">
              <input
                class="modal-write__rate-input"
                type="radio"
                name="rate"
                value="5"
              >
              <span class="modal-write__rate-box">
                <span class="modal-write__rate-num">5</span>
                <span class="modal-write__rate-num">5</span>
              </span>
              <span class="modal-write__rate-icon">
                <Icon name="smile-5" />
              </span>
            </label>
            <label class="modal-write__rate-item">
              <input
                class="modal-write__rate-input"
                type="radio"
                name="rate"
                value="4"
              >
              <span class="modal-write__rate-box">
                <span class="modal-write__rate-num">4</span>
                <span class="modal-write__rate-num">4</span>
              </span>
              <span class="modal-write__rate-icon">
                <Icon name="smile-4" />
              </span>
            </label>
            <label class="modal-write__rate-item">
              <input
                class="modal-write__rate-input"
                type="radio"
                name="rate"
                value="3"
              >
              <span class="modal-write__rate-box">
                <span class="modal-write__rate-num">3</span>
                <span class="modal-write__rate-num">3</span>
              </span>
              <span class="modal-write__rate-icon">
                <Icon name="smile-3" />
              </span>
            </label>
            <label class="modal-write__rate-item">
              <input
                class="modal-write__rate-input"
                type="radio"
                name="rate"
                value="2"
              >
              <span class="modal-write__rate-box">
                <span class="modal-write__rate-num">2</span>
                <span class="modal-write__rate-num">2</span>
              </span>
              <span class="modal-write__rate-icon">
                <Icon name="smile-2" />
              </span>
            </label>
            <label class="modal-write__rate-item">
              <input
                class="modal-write__rate-input"
                type="radio"
                name="rate"
                value="1"
              >
              <span class="modal-write__rate-box">
                <span class="modal-write__rate-num">1</span>
                <span class="modal-write__rate-num">1</span>
              </span>
              <span class="modal-write__rate-icon">
                <Icon name="smile-1" />
              </span>
            </label>
          </div>
        </div>
        <TextInput
          textarea
          label="Отзыв"
          class="modal-write__field"
        />
        <Button send class="modal-write__btn">Отправить отзыв</Button>
      </form>
    </div>
    <div class="modal-write__image">
      <img src="../assets/img/modal-review.svg" alt="">
    </div>
    <div class="modal-write__close" @click="$emit('close')">
      <Icon name="close" />
    </div>
  </div>
</template>

<script>
import TextInput from './base/TextInput'
import Icon from './base/Icon'
import Button from './base/Button'

export default {
  name: 'ModalWrite',
  components: {
    TextInput,
    Icon,
    Button
  }
}
</script>

<style lang="scss">
.modal-write {
  $b: &;

  position: relative;
  background-color: $color-white;

  &__content {
    padding: 70px 20px 30px;
  }

  &__row {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    margin-bottom: 44px;
  }

  &__photo {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    margin-right: 44px;
    width: 110px;
    height: 110px;
    padding: 10px;
    border-radius: 50%;
    background-color: #EAEAEA;
    text-align: center;
    font-family: $font-secondary;
    font-size: 12px;
    line-height: (17/12);
    text-decoration: underline;
    cursor: pointer;
  }

  &__file {
    display: none;
  }

  &__field {
    width: 100%;
    background-color: $color-white;
  }

  &__rate {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
    width: 100%;
  }

  &__rate-item {    
    position: relative;
    width: 48px;
    padding: 0 2px;
    cursor: pointer;
  }

  &__rate-input {
    display: none;

    &:checked {
      & ~ #{$b} {
        &__rate-box {
          background-color: $color-green;
        }

        &__rate-icon {
          transform: translate(100%, -50%);
        }
      }
    }
  }

  &__rate-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 50px;
    padding: 2px;
    background-color: #EFEFEF;
    transition: background-color .3s ease;
  }

  &__rate-icon {
    position: absolute;
    left: 0;
    top: 50%;
    width: 24px;
    height: 24px;
    transform: translate(0, -50%);
    transition: transform .3s ease;
  }

  &__rate-num {
    position: relative;
    width: 50%;
    text-align: center;
    font-weight: bold;
    font-size: 12px;
    color: $color-white;
    transition: transform .3s ease;

    &:last-child {
      font-weight: normal;
      color: $color-blue;
    }
  }

  &__files {
    margin-top: 26px;
  }

  &__btn {
    margin-top: 26px;
    width: 100%;
  }

  &__image {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 35px;
    background-color: #EAEAEA;

    img {
      max-width: 282px;
    }
  }

  &__close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 26px;
    height: 26px;
    fill: $color-blue;
    cursor: pointer;
  }

  @include media(xs) {
    &__rate-item {
      width: 56px;
    }

    &__rate-icon {
      width: 28px;
      height: 28px;
    }
  }

  @include media(md) {
    &__content {
      padding: 100px 90px 75px;
    }

    &__row {
      align-items: flex-start;
    }

    &__photo {
      margin-right: 80px;
      margin-bottom: -80px;
    }

    &__rate {
      margin-top: 23px;
      margin-left: 190px;
      margin-right: 35px;
    }

    &__close {
      width: 34px;
      height: 34px;
    }
  }

  @include media(lg) {
    display: flex;

    &__image {
      order: -1;
      width: 40.5%;
      padding: 28px;

      img {
        max-width: none;
      }
    }

    &__content {
      flex: 1;
      padding: 140px 60px 130px;
    }

    &__photo {
      margin-right: 55px;
    }

    &__rate {
      margin-left: 165px;
      margin-right: 0;
    }

    &__close {
      top: 28px;
      right: 30px;
      width: 28px;
      height: 28px;
      fill: $color-gray;
    }
  }

  @include media(xl) {
    &__image {
      width: 39.5%;
      padding: 36px;
    }

    &__content {
      padding: 140px 140px 130px 120px;
    }
  }
}
</style>
