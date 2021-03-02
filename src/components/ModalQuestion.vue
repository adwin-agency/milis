<template>
  <div class="modal-question">
    <div class="modal-question__content">
      <form class="modal-question__form">
        <p class="modal-question__title">Задать вопрос</p>
        <p class="modal-question__desc">Если у Вас остались любые вопросы по сервису, доставке, услугах, товаре оставьте свой номер и мы Вам перезвоним в течении 20 минут</p>
        <div class="modal-question__fields">
          <TextInput
            label="Имя"
            class="modal-question__field"
          />
          <TextInput
            label="Телефон"
            class="modal-question__field"
          />
          <TextInput
            label="Вопрос"
            textarea
            class="modal-question__field"
          />
        </div>
        <Button
          send
          type="submit"
          class="modal-question__btn"
        >
          Отправить
        </Button>
      </form>
    </div>
    <div class="modal-question__image">
      <img src="../assets/img/modal-question.svg" alt="">
    </div>
    <div class="modal-question__close" @click="$emit('close')">
      <Icon name="close" />
    </div>
  </div>
</template>

<script>
import TextInput from './base/TextInput'
import Button from './base/Button'
import Icon from './base/Icon'

export default {
  name: 'ModalQuestion',
  components: {
    TextInput,
    Button,
    Icon
  }
}
</script>

<style lang="scss">
.modal-question {
  $b: &;

  position: relative;
  background-color: $color-white;

  &__content {
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
    color: $color-gray;
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

  &__btn {
    margin-top: 24px;
    width: 100%;
  }

  &__image {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
    background-color: #EEEEEE;

    img {
      max-width: 295px;
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

  @include media(md) {
    &__content {
      padding: 38px 100px 45px;
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
      flex: 1;
      padding: 55px 95px 64px 70px;
    }

    &__title {
      padding-right: 0;
    }

    &__desc {
      padding-right: 50px;
    }

    &__image {
      width: 41.5%;
      padding: 15px;

      img {
        max-width: none;
      }
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
