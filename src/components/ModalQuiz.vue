<template>
  <div class="modal-quiz">

    <div class="modal-quiz__header d-flex">
      <img class="modal-quiz__logo" src="/assets/img/logo-2.svg" alt="">
      <p class="modal-quiz__title">Рассчитать стоимость будущей кухни </p>
      <div class="modal-quiz__close" @click="$emit('close')">
        <Icon name="close" />
      </div>
    </div>

    <div class="modal-quiz__body">

      <div class="modal-quiz__step">
        <div class="modal-quiz__section">
          <p class="modal-quiz__name">Выберите форму и введите размеры будущей кухни</p>
          <p class="modal-quiz__number">1</p>
          <div class="modal-quiz__type quiz-type">

          </div>
        </div>

        <div class="modal-quiz__section">
          <p class="modal-quiz__number">2</p>
          <p class="modal-quiz__name">Размеры стен, где будет расположена кухня</p>

          <div class="modal-quiz__layout quiz-layout">

            <div class="quiz-layout__arrow"></div>
            <div class="quiz-layout__main d-flex">

              <div class="quiz-layout__arrow quiz-layout__arrow_vertical"></div>

              <div class="quiz-layout__row wrap d-flex">
                <div class="quiz-layout__block d-flex">
                  <input type="number" class="quiz-layout__input" placeholder="1,2 см">
                </div>
                <div class="quiz-layout__block quiz-layout__block_vertical d-flex">
                  <input type="number" class="quiz-layout__input" placeholder="1,2 см">
                </div>
                <div class="quiz-layout__block quiz-layout__block_vertical d-flex">
                  <input type="number" class="quiz-layout__input" placeholder="1,2 см">
                </div>
              </div>

              <div class="quiz-layout__arrow quiz-layout__arrow_vertical"></div>

            </div>

          </div>
        </div>
        <button type="button" class="modal-quiz__button">Следующий шаг</button>
      </div>

      <div class="modal-quiz__step"></div>
      <div class="modal-quiz__step"></div>
      <div class="modal-quiz__step"></div>
    </div>

  </div>
</template>

<script>
import Icon from './base/Icon'

export default {
  name: 'ModalQuiz',
  components: {
    Icon
  },
  props: {
    hiddenData: Object
  },
  data() {
    return {
      success: false
    }
  },
  computed: {
    modalData() {
      return this.$store.state.modalData
    }
  },
  methods: {
    onSuccess() {
      this.success = true
    }
  }
}
</script>


<style lang="scss">

.modal-quiz {
  $b: &;

  font-family: $font-secondary;
  position: relative;
  max-width: 1090px;


  .d-flex{
    display: flex;
  }

  .wrap{
    flex-wrap: wrap;
  }

  &__header{
    position: relative;
    background-color: #EFEFEF;
    padding: 20px 20px 19px;
  }

  &__logo{
    max-width: 124px;
    display: none;
  }

  &__title{
    font-weight: 700;
    font-size: 22px;
    line-height: 30px;
    color: $color-blue;
    max-width: 70%;
  }

  &__body{
    background-color: #fff;
    padding: 23px 20px 40px;
  }

  &__name{
    font-size: 20px;
    line-height: 27px;
    color: $color-blue;
    margin: 0px 0px 14px;
  }

  &__number{
    font-family: $font-primary;
    font-size: 50px;
    line-height: 67px;
    font-weight: 700;
    color: $color-blue;
  }

  &__button{
    font-size: 18px;
    line-height: 1;
    font-weight: 700;
    background-color: $color-green;
    color: #fff;
    margin: 37px 0px 0px;
    padding: 10px 30px;
    height: 71px;
    width: 100%;
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

}

//layout

.quiz-layout{
  $b: &;

  &__main{
    margin: 14px 0px 0px;
  }

  &__row{
    justify-content: space-between;
  }

  &__arrow{
    background-color: $color-blue;
    height: 2px;
  }

  &__arrow_vertical{
    height: inherit;
    width: 2px;
  }

  &__row{
    padding: 0px 18px;
    flex: 1;
  }

  &__block{
    $c: &;
    background-color: #C8C8C8;
    flex: 1 0 100%;
    height: 80px;
    justify-content: center;
    align-items: center;
    padding: 12px;

    &_vertical{
      margin: 11px 0px 0px;
      height: 190px;
      flex: 0 1 110px;

    }
  }

  &__input{
    background-color: #fff;
    border: 2px solid $color-green;
    width: 100%;
    max-width: 110px;
    height: 40px;
    padding: 8px 15px;
  }

}

</style>
