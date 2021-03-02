<template>
  <div class="city-popup">
    <p class="city-popup__title">Ваш город Санкт-Петербург?</p>
    <div class="city-popup__btns">
      <button class="city-popup__btn">Да</button>
      <button class="city-popup__btn city-popup__btn_bordered">Нет</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CityPopup'
}
</script>

<style lang="scss">
.city-popup {
  background: #F7F7F7;
  box-shadow: 0px 21px 14px -19px rgba(95, 159, 255, 0.25);

  &__title {
    font-weight: bold;
    font-size: 14px;
    line-height: (17/14);
    color: $color-blue;
  }
}
</style>
