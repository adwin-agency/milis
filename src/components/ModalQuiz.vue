<template>
  <div class="modal-quiz" :class="{'is-success': sendSuccess}">

    <div class="modal-quiz__header d-flex">
      <img class="modal-quiz__logo" src="/assets/img/logo-2.svg" alt="">
      <p class="modal-quiz__title">Рассчитать стоимость будущей кухни </p>
      <div class="modal-quiz__close" @click="$emit('close')">
        <Icon name="close"/>
      </div>
    </div>

    <form class="modal-quiz__form" action="" method="POST">
      <!-- step 1 -->
      <div class="modal-quiz__step">
        <p class="modal-quiz__name">Выберите форму и введите размеры будущей кухни</p>
        <div class="modal-quiz__grid d-flex">

          <div class="modal-quiz__section">
            <div class="modal-quiz__inner d-flex">
              <p class="modal-quiz__desc">
                <span class="modal-quiz__number">1</span>
              </p>
              <ul class="modal-quiz__type quiz-type d-flex">
                <li
                    v-for="(label, index) in labels"
                    :key="index"
                    class="quiz-type__element"
                >
                  <label class="quiz-type__label">
                    <input type="radio" :class="'quiz-type__radio ' + index" :value="label.value" name="quiz-type"
                           tabindex="-1">
                    <div class="quiz-type__label-box d-flex">
                      <span class="quiz-type__name">{{ label.title }}</span>
                      <Icon class="quiz-type__check" name="check-circle"/>
                      <Icon class="quiz-type__icon" :name="label.icon"/>
                    </div>
                  </label>
                </li>
              </ul>
            </div>
          </div>

          <div class="modal-quiz__section modal-quiz__section_large">

            <div class="modal-quiz__inner d-flex">

              <p class="modal-quiz__desc">
                <span class="modal-quiz__number">2</span>
              </p>

              <div class="modal-quiz__layout quiz-layout">
                <p class="modal-quiz__name">Размеры стен, где будет расположена кухня</p>

                <div class="quiz-layout__arrow">
                  <span class="quiz-layout__arrow-element"></span>
                  <span class="quiz-layout__arrow-element"></span>
                </div>
                <div class="quiz-layout__main d-flex">

                  <div class="quiz-layout__arrow quiz-layout__arrow_vertical">
                    <span class="quiz-layout__arrow-element"></span>
                    <span class="quiz-layout__arrow-element"></span>
                  </div>

                  <ul class="quiz-layout__row wrap d-flex">

                    <li class="quiz-layout__block d-flex"
                        :class="{'quiz-layout__block_vertical': n > 1}"
                        v-for="n in 3"
                        :key="n"
                    >
                      <input type="number" class="quiz-layout__input" name="quiz-size[]" placeholder="1,2 см">
                    </li>

                  </ul>

                  <div class="quiz-layout__arrow quiz-layout__arrow_vertical">
                    <span class="quiz-layout__arrow-element"></span>
                    <span class="quiz-layout__arrow-element"></span>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
        <div class="modal-quiz__footer">
          <button type="button" class="modal-quiz__button modal-quiz__button-next modal-quiz__button_disable d-flex">
            <span class="modal-quiz__button-text">Следующий шаг</span>
            <Icon class="modal-quiz__button-icon" name="button-arrow"/>
          </button>
        </div>
      </div>
      <!-- / step 1 / -->

      <!-- step 2 -->
      <div class="modal-quiz__step" style="display:none;">
        <div class="modal-quiz__section">
          <p class="modal-quiz__name">Выберите материал и фурнитуру будущей кухни</p>
          <p class="modal-quiz__desc modal-quiz__desc_size-small">
            <span class="modal-quiz__number modal-quiz__number_size-medium">1</span>
            Материалы
          </p>
          <ul class="modal-quiz__list quiz-list">
            <li
                v-for="(label, index) in materials"
                :key="index"
                class="quiz-list__element"
            >
              <label class="quiz-list__label">
                <input type="radio" :class="'quiz-list__radio ' + index" :value="label.title" name="quiz-materials"
                       tabindex="-1">
                <span class="quiz-list__name">{{ label.title }}</span>
              </label>
            </li>
          </ul>
        </div>
        <div class="modal-quiz__section">
          <p class="modal-quiz__desc modal-quiz__desc_size-small">
            <span class="modal-quiz__number modal-quiz__number_size-medium">2</span>
            Фурнитура
          </p>
          <ul class="modal-quiz__list quiz-list">
            <li
                v-for="(label, index) in furniture"
                :key="index"
                class="quiz-list__element"
            >
              <label class="quiz-list__label">
                <input type="radio" :class="'quiz-list__radio ' + index" :value="label.title" name="quiz-furniture"
                       tabindex="-1">
                <span class="quiz-list__name">{{ label.title }}</span>
              </label>
            </li>
          </ul>
        </div>
        <div class="modal-quiz__footer">
          <button type="button" class="modal-quiz__button modal-quiz__button-next modal-quiz__button_disable d-flex">
            <span class="modal-quiz__button-text">Следующий шаг</span>
            <Icon class="modal-quiz__button-icon" name="button-arrow"/>
          </button>
          <button type="button" class="modal-quiz__button modal-quiz__button-prev d-flex">
            <Icon class="modal-quiz__button-icon" name="button-arrow"/>
            <span class="modal-quiz__button-text">Вернуться назад</span>
          </button>
        </div>
      </div>
      <!-- / step 2 / -->

      <!-- step 3 -->
      <div class="modal-quiz__step" style="display:none;">
        <div class="modal-quiz__section">
          <p class="modal-quiz__desc modal-quiz__desc_size-large">
            Ваши пожелания к дизайну
          </p>
          <TextInput class="modal-quiz__textarea" textarea name="quiz-comment"
                     placeholder="У меня маленькая и темная кухня,  мне хотелось бы добавить яркости..."/>
          <div class="modal-calc__file modal-quiz-file" :class="{'is-active': inputFileName}">
            <label class="modal-calc__file-label">
              <input
                  class="modal-calc__file-input"
                  type="file"
                  name="file"
                  accept="image/*"
                  ref="fileInput"
                  @change="onFileChange"
              >
              <span class="modal-calc__file-icon">
                  <Icon name="attach"/>
                </span>
              {{ inputFileName || 'Прикрепить фото эскиза' }}
            </label>
            <span
                class="modal-calc__file-remove"
                @click="onFileRemove"
            >
              <Icon name="close"/>
              </span>
          </div>
          <p class="modal-quiz__text">
            *Этот шаг можно пропустить
          </p>
          <div class="modal-quiz__footer">
            <button type="button" class="modal-quiz__button modal-quiz__button-next modal-quiz__button_disable d-flex">
              <span class="modal-quiz__button-text">Следующий шаг</span>
              <Icon class="modal-quiz__button-icon" name="button-arrow"/>
            </button>
            <button type="button" class="modal-quiz__button modal-quiz__button-prev d-flex">
              <Icon class="modal-quiz__button-icon" name="button-arrow"/>
              <span class="modal-quiz__button-text">Вернуться назад</span>
            </button>
          </div>
        </div>
      </div>
      <!-- / step 3 / -->

      <!-- step 4 -->
      <div class="modal-quiz__step" style="display:none;">
        <div class="modal-quiz__section">
          <p class="modal-quiz__desc modal-quiz__desc_size-large">
            Спасибо! Мы уже начали расчет
          </p>
          <p class="modal-quiz__desc modal-quiz__desc_size-small modal-quiz__desc_font-primary">
            Если вы оставите свои контакты, то мы сможем <span class="modal-quiz__desc-color">закрепить скидку и подарить вам фурнитуру</span>
          </p>
          <TextInput
              class="modal-calc__field modal-quiz__field"
              label="Имя"
              type="text"
              name="name"
              :error="errors.name"
              @input="onInput('name', $event)"
          />
          <TextInput
              class="modal-calc__field modal-quiz__field"
              label="Телефон"
              type="tel"
              name="phone"
              :error="errors.phone"
              @input="onInput('phone', $event)"
          />
        </div>
        <button type="submit" class="modal-quiz__button modal-quiz__submit modal-quiz__button-next d-flex">
          <span class="modal-quiz__button-text">Закрепить скидку и получить подарок</span>
        </button>
        <button type="button" class="modal-quiz__button modal-quiz__button-prev d-flex">
          <Icon class="modal-quiz__button-icon" name="button-arrow"/>
          <span class="modal-quiz__button-text">Вернуться назад</span>
        </button>
      </div>
      <!-- / step 4 / -->
    </form>

  </div>
</template>

<script>
// import Button from './base/Button'
import Icon from './base/Icon'
import TextInput from "@/components/base/TextInput";
// import api from '@/api'

export default {
  name: 'ModalQuiz',
  components: {
    TextInput,
    // Button,
    Icon,
  },
  props: {
    hiddenData: Object
  },
  data() {
    return {
      labels: [
        {title: 'Угловая', value: 'uglovie', icon: 'icon-corner'},
        {title: 'Прямая', value: 'pryamye', icon: 'icon-straight'},
        {title: 'П-образная', value: 'pryamye', icon: 'icon-shaped'},
      ],
      materials: [
        {title: 'МДФ пленка ПВХ'},
        {title: 'МДФ пластик'},
      ],
      furniture: [
        {title: 'Стандартная'},
        {title: 'С доводчиками'},
      ],
      inputs: {
        name: '',
        phone: ''
      },
      errors: {
        name: false,
        phone: false
      },
      inputFileName: null,
      sending: false,
      sendSuccess: false,
      sendError: false
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
    },

    onInput(input, value) {
      if (this.errors[input]) {
        this.errors[input] = false
      }

      this.inputs[input] = value
    },

    onFileChange(e) {
      this.inputFileName = e.target.files.length ? e.target.files[0].name : ''
    },

    onFileRemove() {
      this.inputFileName = ''
      this.$refs.fileInput.value = ''
    },

  }
}
</script>


<style lang="scss">

.modal-quiz {
  $b: &;

  font-family: $font-secondary;
  position: relative;
  max-width: 1090px;

  .d-flex {
    display: flex;
  }

  .wrap {
    flex-wrap: wrap;
  }

  &__header {
    position: relative;
    background-color: #EFEFEF;
    padding: 20px 20px 19px;
    align-items: center;
  }

  &__logo {
    max-width: 124px;
    display: none;
  }

  &__grid {
    flex-direction: column;
  }

  &__inner{
    flex-direction: column;
  }

  &__title {
    font-weight: 700;
    font-size: 22px;
    line-height: 30px;
    color: $color-blue;
    max-width: 70%;
  }

  &__form {
    background-color: #fff;
    padding: 23px 20px 40px;
  }

  &__name {
    font-size: 20px;
    line-height: 27px;
    color: $color-blue;
    margin: 0px 0px 14px;
  }

  &__section {
    padding: 0px 0px 0px;
  }

  &__desc {
    font-family: $font-secondary;
    font-size: 50px;
    line-height: 67px;
    font-weight: 700;
    color: $color-blue;

    &_font-primary {
      font-family: $font-primary;
    }

    &_size-small {
      font-size: 20px;
      line-height: 27px;
    }

    &_size-large {
      font-size: 24px;
      line-height: 32px;
      margin-bottom: 20px;
    }

    &-color {
      color: $color-green;
    }

  }

  &__number {
    font-family: $font-primary;
    font-size: inherit;
    margin-right: 13px;

    &_size-medium {
      font-size: 32px;
      line-height: normal;
    }
  }

  &__type {
    margin: 8px -5px 0px;
  }

  &__layout {
    margin: 18px 0px 0px;
  }

  &__list {
    margin: 27px 0px 0px;
  }

  &__button {
    position: relative;
    font-weight: 700;
    line-height: 1;
    width: 100%;
    margin: 36px auto 0px;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &-icon {
      position: absolute;
      fill: currentColor;
      width: 20px;
      height: 20px;
    }

    &-next {
      font-size: 18px;
      background-color: $color-green;
      color: #fff;
      padding: 10px 30px;
      height: 71px;

      #{$b}__button-icon {
        right: 35px;
        transform: rotate(180deg);
      }

    }

    &-prev {
      color: $color-blue;
      font-size: 14px;
      max-width: 270px;

      #{$b}__button-text {
        text-decoration: underline;
      }

      #{$b}__button-icon {
        right: auto;
        left: 30px;
      }

    }

    &_disable {
      background-color: $color-gray;
      //pointer-events: none;
    }

  }

  &__submit {
    margin: 24px 0px 0px;
    font-size: 14px;
    line-height: 17px;
  }

  &__textarea {
    margin: 26px 0px 0px;
    height: 259px;
  }

  &__text {
    margin: 27px 0px 0px;
    font-size: 16px;
    color: $color-black-gray;
    font-weight: 500;
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

  @include media(lg) {

    &__logo {
      display: block;
      margin-right: 50px;
    }

    &__header {
      padding: 24px 40px 21px;
    }

    &__grid {
      flex-direction: row;
      width: 100%;
      margin: 0px -15px;
    }

    &__inner{
      flex-direction: row;
      align-items: flex-start;
    }

    &__section {
      flex: 1;
      padding: 0px 15px;

      &_large {
        flex: 1 0 50%;
        max-width: 50%;
      }
    }

    &__number{
      line-height: 1;
    }

    &__form {
      padding-bottom: 0;
    }

    &__step {
      display: flex;
      flex-wrap: wrap;
    }

    &__close {
      top: 50%;
      right: 30px;
      transform: translateY(-50%);
    }

    &__footer {
      flex: 1 0 100%;
    }

    &__type{
      flex-direction: column;
    }

  }

}

.modal-quiz-file.modal-calc__file {
  background-color: $color-blue;
  padding: 17px 18px 19px;
  border-radius: 60px;
  display: flex;
  justify-content: center;
  align-content: center;
}

.modal-quiz-file .modal-calc__file-label {
  color: #fff;
  font-size: 14px;
}

.modal-quiz-file .modal-calc__file-icon {
  fill: $color-green;
  width: 34px;
  height: 34px;
}


//layout

.quiz-layout {
  $b: &;

  &__main {
    margin: 14px 0px 0px;
  }

  &__row {
    justify-content: space-between;
  }

  &__arrow {
    position: relative;
    background-color: $color-blue;
    border-radius: 2px;
    height: 2px;

    &-element {
      position: absolute;
      left: 2px;

      &:before,
      &:after {
        content: "";
        position: absolute;
        top: -5px;
        right: 0;
        margin: -1px 0px 0px;
        background: $color-blue;
        border-radius: 2px;
        display: block;
        height: 9px;
        width: 2px;
      }

      &:before {
        top: 0;
        transform: rotate(-45deg);
      }

      &:after {
        transform: rotate(45deg);
      }

      &:last-child {
        right: 2px;

        &:before {
          transform: rotate(45deg);
        }

        &:after {
          transform: rotate(-45deg);
        }

      }
    }

    &_vertical {
      height: inherit;
      width: 2px;

      .quiz-layout__arrow-element {
        top: 3px;
        left: 3px;
        transform: rotate(90deg);

        &:after,
        &:before {
          margin: 0px;
        }

        &:after {
          top: -5px;
        }
      }

      .quiz-layout__arrow-element:last-child {
        top: auto;
        bottom: 2px;
        transform: rotate(90deg);
      }

    }

  }

  &__row {
    padding: 0px 18px;
    flex: 1;
  }

  &__block {
    background-color: #C8C8C8;
    flex: 1 0 100%;
    height: 80px;
    justify-content: center;
    align-items: center;
    padding: 12px;

    &_vertical {
      margin: 11px 0px 0px;
      height: 190px;
      flex: 0 1 110px;

    }
  }

  &__input {
    background-color: #fff;
    border: 2px solid $color-green;
    width: 100%;
    max-width: 110px;
    height: 40px;
    padding: 8px 15px;
  }

}

//type

.quiz-type {
  $b: &;

  &__element {
    padding: 0px 5px;
    flex: 1;
  }

  &__label {
    cursor: pointer;

    &-box {
      position: relative;
      display: block;
      min-height: 88px;
      width: 100%;
      background-color: $color-gray;
      border-radius: 7px;
      flex-direction: column;
      justify-content: flex-end;
      align-content: flex-end;
      padding: 8px 8px 13px;
    }
  }

  &__name {
    font-family: $font-secondary;
    font-size: 14px;
    line-height: 19px;
    color: #fff;
  }

  &__check {
    position: absolute;
    top: 8px;
  }

  &__icon {
    fill: currentColor;
    width: 34px;
    height: 23px;
    margin: 11px 0px 0px;
  }

  &__check {
    display: none;
    object-fit: cover;
    flex-shrink: 0;
    width: 14px;
    height: 14px;
  }

  &__radio {
    display: none;

    &:checked + #{$b}__label-box {
      background-color: $color-blue;
    }

    &:checked + #{$b}__label-box #{$b}__icon {
      color: $color-green;
    }

    &:checked + #{$b}__label-box #{$b}__check {
      display: block;
    }
  }
}

// list

.quiz-list {
  $b: &;

  &__element {
    margin: 0px 0px 27px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__radio {
    display: none;

    &:checked + #{$b}__name {
      background-color: $color-green;
    }
  }

  &__name {
    cursor: pointer;
    font-family: $font-primary;
    font-size: 18px;
    line-height: 22px;
    font-weight: 700;
    width: 100%;
    display: block;
    background-color: $color-blue;
    text-align: center;
    padding: 21px 20px 22px;
    border-radius: 60px;
    color: #fff;
  }

}


</style>
