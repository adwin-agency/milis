<template>
  <form class="main-form">
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
        placeholder="Имя"
      >
      <input
        type="text"
        class="main-form__field"
        placeholder="Контактный телефон"
      >
      <Button class="main-form__btn">Пригласить бесплатно</Button>
      <p class="main-form__policy">Нажимая кнопку “Пригласить бесплатно”, вы соглашаетесь с
        <a
          href="/"
          target="_blank"
        >Политикой конфиденциальности</a>
      </p>
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

export default {
  name: 'MainForm',
  components: {
    Icon,
    Button
  }
}
</script>

<style lang="scss">
.main-form {
  position: relative;
  padding: 32px 15px;
  font-family: $font-secondary;
  border-radius: 6px;
  background: $color-blue;

  &__title {
    font-weight: 700;
    font-size: 20px;
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
    background-color: #fff;

    &::placeholder {
      color: $color-gray-middle;
    }
  }

  &__btn {
    margin-top: 5px;
    width: 100%;
    height: 60px;
    font-weight: 700;
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
    padding: 32px;
  }

  @include media(lg) {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 40px 80px;

    &__header {
      position: relative;
      padding-left: 78px;
      max-width: 406px;
    }

    &__title {
      font-size: 24px;
    }

    &__desc {
      margin-top: 18px;
      font-size: 16px;
      line-height: 110%;
      color: #ffffff;
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
      margin-left: 20px;
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

    &__policy {
      margin-top: 0;
      text-align: right;
    }
  }
}
</style>