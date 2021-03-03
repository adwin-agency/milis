<template>
  <div class="modal-technics">
    <div class="modal-technics__content">
      <form class="modal-technics__form">
        <p class="modal-technics__title">Заказать технику </p>
        <p class="modal-technics__desc">Укажите свои данные и мы перезвоним Вам в течении дня, чтобы оформить заказ и запланировать доставку</p>
        <div class="modal-technics__fields">
          <TextInput
            label="Имя"
            class="modal-technics__field"
          />
          <TextInput
            label="Телефон"
            class="modal-technics__field"
          />
          <TextInput
            label="Вопрос"
            textarea
            class="modal-technics__field"
          />
        </div>
        <Button
          send
          type="submit"
          class="modal-technics__btn"
        >
          Отправить
        </Button>
      </form>
    </div>
    <div class="modal-technics__image">
      <img src="@/assets/img/modal-technics.jpg" alt="">
    </div>
    <div class="modal-technics__close" @click="$emit('close')">
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
.modal-technics {
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
    height: 358px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
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
      padding: 55px 70px 64px;
    }

    &__title {
      padding-right: 0;
    }

    &__image {
      width: 44.5%;
      height: 100%;
    }

    &__close {
      top: 20px;
      right: 25px;
      width: 22px;
      height: 22px;
    }
  }

  @include media(xl) {
    &__desc {
      padding-right: 10px;
      font-size: 14px;
      line-height: (22/14);
    }
  }
}
</style>
