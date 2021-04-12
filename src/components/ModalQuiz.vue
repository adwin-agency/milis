<template>
  <div class="modal-quiz" :class="{'is-success': sendSuccess}">

    <div class="modal-quiz__header d-flex">
      <img class="modal-quiz__logo" src="/assets/img/logo-2.svg" alt="">
      <p class="modal-quiz__title">Рассчитать стоимость будущей кухни </p>
      <div class="modal-quiz__close" @click="$emit('close')">
        <Icon name="close"/>
      </div>
    </div>

    <form
      class="modal-quiz__form"
      ref="quizform"
      @submit.prevent="onSubmit"
    >
      <input type="hidden" name="type" value="quiz">
      <input type="hidden" name="page" :value="inputPage">
      <input type="hidden" name="item" :value="inputItem">
      <input type="hidden" name="item_id" :value="inputItemId">
      <input type="hidden" name="product_type" :value="inputProductType">
      <div class="modal-quiz__steps quiz-steps">
        <div
          class="modal-quiz__steps-wrapper"
          :style="!$mobile && `transform: translateX(-${(currentStep - 1) * 100}%)`"
        >
          <!-- step 1 -->
          <div class="modal-quiz__step quiz-steps-one" :class="{'is-active': currentStep === 1}">
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
                        <input
                          type="radio"
                          :class="'quiz-type__radio ' + index"
                          name="quiz-type"
                          :value="label.value"
                          :checked="currentType === label.id"
                          tabindex="-1"
                          @change="onTypeChange(label.id)"
                        >
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
                    <p class="modal-quiz__name modal-quiz__name_font-primary">Размеры стен, где будет расположена
                      кухня</p>
                    <div class="quiz-layout__arrow">
                      <Icon
                        name="angle-right"
                        class="quiz-layout__arrow-el quiz-layout__arrow-el_l"
                      />
                      <Icon
                        name="angle-right"
                        class="quiz-layout__arrow-el quiz-layout__arrow-el_r"
                      />
                      <!-- <span class="quiz-layout__arrow-element"></span> -->
                      <!-- <span class="quiz-layout__arrow-element"></span> -->
                    </div>

                    <div class="quiz-layout__main d-flex">

                      <div
                        v-if="currentType !== 'straight'"
                        class="quiz-layout__arrow quiz-layout__arrow_vertical"
                      >
                        <Icon
                          name="angle-right"
                          class="quiz-layout__arrow-el quiz-layout__arrow-el_t"
                        />
                        <Icon
                          name="angle-right"
                          class="quiz-layout__arrow-el quiz-layout__arrow-el_b"
                        />
                        <!-- <span class="quiz-layout__arrow-element"></span> -->
                        <!-- <span class="quiz-layout__arrow-element"></span> -->
                      </div>

                      <ul class="quiz-layout__row wrap d-flex">

                        <li class="quiz-layout__block d-flex">
                          <input
                            type="text"
                            class="quiz-layout__input"
                            name="quiz-size[]"
                            :value="sizeInputs.size_one"
                            placeholder="1,2 м"
                            v-imask="mask"
                            @accept="onSizeInput('size_one', $event)"
                          >
                        </li>
                        <li
                          v-if="currentType !== 'straight'"
                          class="quiz-layout__block quiz-layout__block_vertical d-flex"
                        >
                          <input
                            type="text"
                            class="quiz-layout__input"
                            name="quiz-size[]"
                            :value="sizeInputs.size_two"
                            placeholder="1,2 м"
                            v-imask="mask"
                            @accept="onSizeInput('size_two', $event)"
                          >
                        </li>
                        <li
                          v-if="currentType === 'shaped'"
                          class="quiz-layout__block quiz-layout__block_vertical d-flex"
                        >
                          <input
                            type="text"
                            class="quiz-layout__input"
                            name="quiz-size[]"
                            :value="sizeInputs.size_three"
                            placeholder="1,2 м"
                            v-imask="mask"
                            @accept="onSizeInput('size_three', $event)"
                          >
                        </li>
                      </ul>

                      <div
                        v-if="currentType === 'shaped'"
                        class="quiz-layout__arrow quiz-layout__arrow_vertical"
                      >
                        <Icon
                          name="angle-right"
                          class="quiz-layout__arrow-el quiz-layout__arrow-el_t"
                        />
                        <Icon
                          name="angle-right"
                          class="quiz-layout__arrow-el quiz-layout__arrow-el_b"
                        />
                        <!-- <span class="quiz-layout__arrow-element"></span> -->
                        <!-- <span class="quiz-layout__arrow-element"></span> -->
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-quiz__footer d-flex">
              <button
                type="button"
                class="modal-quiz__button modal-quiz__button-next d-flex"
                :class="{'modal-quiz__button_disable': !completedSteps[1]}"
                :disabled="!completedSteps[1]"
                @click="onNextBtnClick"
              >
                <span class="modal-quiz__button-text">Следующий шаг</span>
                <Icon class="modal-quiz__button-icon" name="button-arrow"/>
              </button>
            </div>
          </div>
          <!-- / step 1 / -->

          <!-- step 2 -->
          <div class="modal-quiz__step quiz-steps-two" :class="{'is-active': currentStep === 2}">
            <p class="modal-quiz__name">Выберите материал и фурнитуру будущей кухни</p>

            <div class="modal-quiz__grid d-flex">

              <div class="modal-quiz__section">
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
                      <input
                        type="radio"
                        :class="'quiz-list__radio ' + index"
                        name="quiz-materials"
                        :value="label.title"
                        :checked="currentMaterial === label.title"
                        tabindex="-1"
                        @change="onMaterialChange(label.title)"
                      >
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
                      <input
                        type="radio"
                        :class="'quiz-list__radio ' + index"
                        name="quiz-furniture"
                        :value="label.title"
                        :checked="currentFurniture === label.title"
                        tabindex="-1"
                        @change="onFurnitureChange(label.title)"
                      >
                      <span class="quiz-list__name">{{ label.title }}</span>
                    </label>
                  </li>
                </ul>
              </div>

            </div>

            <div class="modal-quiz__footer d-flex">
              <button
                type="button"
                class="modal-quiz__button modal-quiz__button-next d-flex"
                :class="{'modal-quiz__button_disable': !completedSteps[2]}"
                :disabled="!completedSteps[2]"
                @click="onNextBtnClick"
              >
                <span class="modal-quiz__button-text">Следующий шаг</span>
                <Icon class="modal-quiz__button-icon" name="button-arrow"/>
              </button>
              <button
                type="button"
                class="modal-quiz__button modal-quiz__button-prev d-flex"
                @click="onPrevBtnClick"
              >
                <Icon class="modal-quiz__button-icon" name="button-arrow"/>
                <span class="modal-quiz__button-text">Вернуться назад</span>
              </button>
            </div>
          </div>
          <!-- / step 2 / -->

          <!-- step 3 -->
          <div class="modal-quiz__step quiz-steps-three" :class="{'is-active': currentStep === 3}">
            <p class="modal-quiz__desc modal-quiz__desc_size-large">
              Ваши пожелания к дизайну
            </p>
            <div class="modal-quiz__grid d-flex">
              <div class="modal-quiz__section">

                <TextInput
                textarea
                class="modal-quiz__textarea"
                name="quiz-comment"
                placeholder="У меня маленькая и темная кухня,  мне хотелось бы добавить яркости..."
                />
                <div class="modal-quiz__row d-flex">
                  <div
                    class="modal-calc__file modal-quiz-file"
                    :class="{'is-active': fileName}"
                  >
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
                      {{ fileName || 'Прикрепить фото эскиза' }}
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
                </div>

              </div>
            </div>
            <div class="modal-quiz__footer d-flex">
              <button
                type="button"
                class="modal-quiz__button modal-quiz__button-next d-flex"
                @click="onNextBtnClick"
              >
                <span class="modal-quiz__button-text">Следующий шаг</span>
                <Icon class="modal-quiz__button-icon" name="button-arrow"/>
              </button>
              <button
                type="button"
                class="modal-quiz__button modal-quiz__button-prev d-flex"
                @click="onPrevBtnClick"
              >
                <Icon class="modal-quiz__button-icon" name="button-arrow"/>
                <span class="modal-quiz__button-text">Вернуться назад</span>
              </button>
            </div>
          </div>
          <!-- / step 3 / -->

          <!-- step 4 -->
          <div class="modal-quiz__step quiz-steps-four" :class="{'is-active': currentStep === 4}">
            <p class="modal-quiz__desc modal-quiz__desc_size-large">
              Спасибо! Мы уже начали расчет
            </p>
            <p class="modal-quiz__desc modal-quiz__desc_size-small modal-quiz__desc_font-primary">
              Если вы оставите свои контакты, то мы сможем <span class="modal-quiz__desc-color">закрепить скидку и подарить вам фурнитуру</span>
            </p>
            <div class="modal-quiz__grid d-flex">
              <div class="modal-quiz__section">

                <div
                  class="modal-quiz__fields"
                  :class="{'is-success': sendSuccess}"
                >
                  <TextInput
                    class="modal-calc__field modal-quiz__field"
                    label="Имя"
                    type="text"
                    name="name"
                    :error="contactErrors.name"
                    @input="onContactInput('name', $event)"
                  />
                  <TextInput
                    class="modal-calc__field modal-quiz__field"
                    label="Телефон"
                    type="tel"
                    name="phone"
                    :error="contactErrors.phone"
                    @input="onContactInput('phone', $event)"
                  />
                  <div class="modal-quiz__footer d-flex">
                    <button
                      type="submit"
                      class="modal-quiz__button modal-quiz__submit modal-quiz__button-next d-flex"
                    >
                      <span class="modal-quiz__button-text">Закрепить скидку и получить подарок</span>
                    </button>
                    <p
                      v-if="sendError"
                      class="modal-quiz__error"
                    >
                      Ошибка отправки
                    </p>
                    <button
                      type="button"
                      class="modal-quiz__button modal-quiz__button-prev d-flex"
                      @click="onPrevBtnClick"
                    >
                      <Icon class="modal-quiz__button-icon" name="button-arrow"/>
                      <span class="modal-quiz__button-text">Вернуться назад</span>
                    </button>
                  </div>
                  <div class="modal-quiz__success">
                    <FormSuccess
                      :class="{'is-active': sendSuccess}"
                      :title="`Ваша заявка \n успешно отправлена!`"
                      :desc="`Оператор свяжется с Вами в самое \n ближайшее время и уточнит детали!`"
                    />
                  </div>
                </div>
              </div>
              <div class="modal-quiz__section modal-quiz__section_banner">
                <div class="modal-quiz__banner">
                  <img src="@/assets/img/quiz-banner.jpg" alt="" class="modal-quiz__banner-image">
                  <div class="modal-quiz__circle modal-quiz__banner-element">
                    <span>Ваша <br> скидка</span>
                    <span class="modal-quiz__like modal-quiz__banner-element">
                      <Icon name="hand-like" />
                    </span>
                    <span class="modal-quiz__smile modal-quiz__banner-element">
                      <Icon name="smile-5" />
                    </span>
                    <Discount
                      class="modal-quiz__discount modal-quiz__banner-element"
                      value="47"
                    />
                  </div>

                </div>
              </div>
            </div>

          </div>
          <!-- / step 4 / -->
        </div>
      </div>
    </form>

  </div>
</template>

<script>
import Icon from './base/Icon'
import TextInput from "@/components/base/TextInput";
import Discount from "@/components/base/Discount";
import FormSuccess from "@/components/FormSuccess";
import api from '@/api'
import {IMaskDirective} from 'vue-imask'

export default {
  name: 'ModalQuiz',
  directives: {
    imask: IMaskDirective
  },
  components: {
    TextInput,
    Discount,
    FormSuccess,
    Icon,
  },
  props: {
    hiddenData: Object
  },
  data() {
    return {      
      mask: {
        mask: '0,000'
      },
      labels: [
        {id: 'corner', title: 'Угловая', value: 'угловая', icon: 'icon-corner'},
        {id: 'straight', title: 'Прямая', value: 'прямая', icon: 'icon-straight'},
        {id: 'shaped', title: 'П-образная', value: 'п-образная', icon: 'icon-shaped'},
      ],
      materials: [
        {title: 'Эконом'},
        {title: 'Премиум'},
      ],
      furniture: [
        {title: 'Эконом'},
        {title: 'Премиум'},
      ],

      currentType: 'corner',
      sizeInputs: {
        size_one: '',
        size_two: ''
      },
      currentMaterial: '',
      currentFurniture: '',
      fileName: null,
      comment: '',
      contactInputs: {
        name: '',
        phone: ''
      },
      contactErrors: {
        name: false,
        phone: false
      },

      currentStep: 1,
      completedSteps: {
        1: false,
        2: false,
        3: true
      },
      
      sending: false,
      sendSuccess: false,
      sendError: false
    }
  },
  computed: {
    modalData() {
      return this.$store.state.modalData
    },
    inputPage() {
      return this.$route.path
    },
    inputItem() {
      return this.modalData && this.modalData.item
    },
    inputItemId() {
      return this.modalData && this.modalData.itemId
    },
    inputProductType() {
      return this.modalData && this.modalData.productType
    }
  },
  methods: {
    onTypeChange(id){
      const sizeInputs = {
        size_one: ''
      }

      if (id !== 'straight') {
        sizeInputs.size_two = ''
      }

      if (id === 'shaped') {
        sizeInputs.size_three = ''
      }

      this.currentType = id;
      this.sizeInputs = sizeInputs
      this.completedSteps[1] = false
    },
    onSizeInput(name, e){
      this.sizeInputs[name] = e.detail.value

      for (let key in this.sizeInputs) {
        if (this.sizeInputs[key] === '') {
          this.completedSteps[1] = false
          return
        }
      }

      this.completedSteps[1] = true
    },
    onMaterialChange(value) {
      this.currentMaterial = value

      if (this.currentFurniture) {
        this.completedSteps[2] = true
      }
    },
    onFurnitureChange(value) {
      this.currentFurniture = value

      if (this.currentMaterial) {
        this.completedSteps[2] = true
      }
    },
    onFileChange(e) {
      this.fileName = e.target.files.length ? e.target.files[0].name : ''
    },
    onFileRemove() {
      this.fileName = ''
      this.$refs.fileInput.value = ''
    },
    onContactInput(input, value) {
      if (this.contactErrors[input]) {
        this.contactErrors[input] = false
      }

      this.contactInputs[input] = value
    },

    onPrevBtnClick() {
      this.currentStep--

      if (this.$mobile) {
        this.$emit('scrollTop')
      }
    },
    onNextBtnClick() {
      if (this.completedSteps[this.currentStep]) {
        const goals = {
          1: 'quiz_size',
          2: 'quiz_materials',
          3: 'quiz_comment'
        }

        window.ym && window.ym(73257226, 'reachGoal', goals[this.currentStep])
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({'event': goals[this.currentStep]})

        this.currentStep++
      }

      if (this.$mobile) {
        this.$emit('scrollTop')
      }
    },

    onSubmit() {
      if (this.currentStep !== 4 || this.sending || this.sendSuccess) {
        return
      }

      for (let input in this.contactInputs) {
        const value = this.contactInputs[input]

        if (value.trim() === '' || input === 'phone' && value.length < 16) {
          this.contactErrors[input] = true
        }
      }

      for (let error in this.contactErrors) {
        if (this.contactErrors[error]) {
          return
        }
      }

      this.sending = true
      this.sendError = false
      const data = new FormData(this.$refs.quizform)

      api.sendForm(data, 'quiz')
        .then(() => {
          this.sending = false
          this.sendSuccess = true
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

.modal-quiz {
  $b: &;

  font-family: $font-secondary;
  position: relative;
  max-width: 600px;
  overflow: hidden;

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

  &__inner {
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
  }

  &__name {
    font-size: 20px;
    line-height: 27px;
    color: $color-blue;
    margin: 0px 0px 14px;

    &_font-primary {
      font-family: $font-primary;
    }
  }

  &__step {
    display: none;
    padding: 23px 20px 40px;

    &.is-active {
      display: flex;
      flex-direction: column;
    }
  }

  &__section {
    padding: 15px 0px 0px;
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
    margin: 31px auto 0px;
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
      padding: 5px;

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

    .text-input__field {
      height: 259px;
    }
  }

  &__row {
    flex-direction: column;
  }

  &__text {
    margin: 27px 0px 0px;
    font-size: 16px;
    color: $color-black-gray;
    font-weight: 500;
  }

  &__footer {
    flex-direction: column;
  }

  &__banner{
    position: relative;
    margin: 30px -20px -40px;
    overflow: hidden;

    &-image{
      object-fit: cover;
      max-height: 350px;
    }

    &-element{
      position: absolute;
    }

  }

  &__fields{
    position: relative;
    margin: 23px 0px 0px;

    &.is-success {
      #{$b}__success {
        opacity: 1;
        pointer-events: all;
        z-index: 1;
      }
    }
  }

  &__circle{
    position: absolute;
    width: 300px;
    height: 300px;
    padding: 50px 0px 30px;
    border-radius: 50%;
    background-color: $color-red;
    bottom: -150px;
    left: 0%;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    font-size: 36px;
    line-height: 45px;
    font-family: $font-primary;
    font-weight: 700;
    z-index: 20;
  }

  &__smile{
    top: 0px;
    left: 60px;
    width: 38px;
    height: 38px;
  }

  &__like{
    width: 78px;
    height: 78px;
    top: -50px;
    left: 150px;
    z-index: 1;
  }

  .discount{
    width: 132px;
    height: 132px;
    font-size: 36px;
    right: -50px;
    top: 0;
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

  &__error {
    margin-top: 12px;
    align-self: center;
    text-align: center;
    font-family: $font-secondary;
    font-size: 14px;
    color: $color-red;
  }

  &__success {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: -5px;
    top: -15px;
    right: -5px;
    bottom: -5px;
    padding: 20px;
    background-color: #fff;
    opacity: 0;
    pointer-events: none;
    transition: opacity .5s ease;
    z-index: -1;
  }

  // media

  @include media(sm) {
    &__circle{
      left: 50%;
      transform: translateX(-50%);
    }
  }

  @include media(lg) {
    max-width: 1090px;
    width: 100%;

    &__logo {
      display: block;
      margin-right: 50px;
    }

    &__header {
      padding: 24px 40px 21px;
    }

    &__grid {
      flex-direction: row;
      flex: 1;
      margin: 42px -15px 0px;
    }

    &__inner {
      flex-direction: row;
      align-items: flex-start;
    }

    &__name {
      margin-bottom: 0;
    }

    &__layout {
      margin: 0px;
      background-color: $color-gray-7;
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
      border-radius: 4px;
      padding: 18px 35px 37px;
      flex: 1;
      min-height: 455px;
    }

    &__type {
      margin-top: 0;
    }

    &__list {
      margin: 44px 0px 0px;
    }

    &__section {
      flex: 1;
      padding: 0px 15px;

      &_large {
        flex: 2;
      }

      &_banner{
        display: flex;
        align-items: flex-end;
        margin-right: -170px;
      }
    }

    &__banner{
      margin: 0px;
      width: 450px;
      height: auto;
      border-radius: 400px 0px 0px 0px;

      &-image{
        max-height: 100%;
      }
    }

    &__circle{
      width: 330px;
      height: 330px;
      bottom: -165px;
      padding: 50px 0px 50px;
      left: 0;
      transform: translate(0);
    }

    &__desc {
      font-size: 32px;

      &_size-large {
        margin-bottom: 0;
      }
    }

    &__number {
      line-height: 1;
      font-size: 50px;
      margin-right: 31px;
      display: block;
    }

    &__form {
      overflow: hidden;
    }

    &__steps {
      overflow: hidden;
    }

    &__steps-wrapper {
      display: flex;
      width: 100%;
      transition: transform .5s ease;
    }

    &__step {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      width: 100%;
      padding: 42px 40px 0px;
      min-height: 670px;
      opacity: 0;
      pointer-events: none;
      transition: opacity .5s ease;
      overflow: hidden;

      &.is-active {
        opacity: 1;
        pointer-events: all;
      }
    }

    &__close {
      top: 50%;
      right: 30px;
      transform: translateY(-50%);
    }

    &__type {
      flex-direction: column;
    }

    &__fields {
      margin: 0px 0px 0px;
      max-width: 507px;

      .modal-calc__field {
        margin-top: 23px;
      }
    }

    &__button {
      position: relative;
      width: 420px;
      border-radius: 60px 0px 0px 0px;
      margin: 0;

      &-next {
        margin-left: auto;

        &:before{
          content: '';
          position: absolute;
          left: 99%;
          height: 100%;
          width: 300px;
          background-color: inherit;
        }
      }

      &-prev {
        justify-content: center;
        text-align: center;

        .icon{
          left: 0;
        }
      }
    }

    &__row {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    &__footer {
      width: 100%;
      margin-top: auto;
      flex-direction: row-reverse;
      justify-content: space-between;
      align-items: flex-start;
    }

    .quiz-layout .modal-quiz__name {
      margin-bottom: 29px;
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

// media

@include media(lg) {

  .quiz-steps-two .modal-quiz__grid {
    margin-top: 104px;
  }

  .quiz-steps-two .modal-quiz__desc {
    display: flex;
    align-items: center;
  }

  .modal-quiz-file.modal-calc__file {
    width: 430px;
  }

  .quiz-steps-four .modal-quiz__desc_size-small {
    font-size: 26px;
    line-height: 38px;
    margin: 26px 0px 0px;
    max-width: 70%;
  }

  .quiz-steps-four .modal-quiz__footer {
    flex-direction: column;
    margin: 23px 0px 0px;
  }

  .quiz-steps-four .modal-quiz__button-next {
    width: 100%;
    border-radius: 0;
  }

  .quiz-steps-four .modal-quiz__button-prev {
    margin: 93px 0px 0px;
  }

  .quiz-steps-four .modal-quiz__button-next:before{
    display: none;
  }


}


//layout

.quiz-layout {
  $b: &;

  &__main {
    margin: 14px 0px 0px;
    height: 282px;
  }

  &__row {
    justify-content: space-between;
  }

  &__arrow {
    position: relative;
    background-color: $color-blue;
    border-radius: 2px;
    height: 2px;
    flex-shrink: 0;

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

    &-el {
      position: absolute;
      width: 20px;
      height: 20px;

      &_l {
        left: -8px;
        top: 50%;
        margin-top: -10px;
        transform: rotate(180deg);
      }

      &_r {
        right: -8px;
        top: 50%;
        margin-top: -10px;
      }

      &_t {
        top: -8px;
        left: 50%;
        margin-left: -10px;
        transform: rotate(-90deg);
      }

      &_b {
        bottom: -8px;
        left: 50%;
        margin-left: -10px;
        transform: rotate(90deg);
      }
    }

    &_vertical {
      height: inherit;
      width: 2px;

      .quiz-layout__arrow-element {
        top: 3px;
        // left: 3px;
        margin-left: 1px;
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
        margin-left: 3px;
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

  // media

  @include media(lg) {
    &__main {
      margin: 26px 0px 0px;
      height: auto;
    }
    &__row {
      padding: 0px 26px;
    }
    &__block {
      min-height: 99px;

      &_vertical {
        margin: 18px 0px 0px;
        height: 200px;
        flex-basis: 143px;
      }
    }
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
    font-size: 11px;
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

  // media

  @include media(xs) {
    &__name {
      font-size: 14px;
    }
  }

  @include media(lg) {

    &__element {
      margin: 0px 0px 20px;

      &:last-child {
        margin: 0px;
      }
    }

    &__label {
      &-box {
        padding: 27px;
        width: 210px;
        min-height: 150px;
      }
    }

    &__name {
      font-size: 22px;
    }

    &__icon {
      width: 65px;
      height: 42px;
    }

    &__check {
      top: 20px;
      right: 20px;
      width: 27px;
      height: 27px;
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

  // media

  @include media(lg) {
    &__element {
      margin: 0px 0px 31px;
    }

    &__name {
      padding: 27px 30px 25px;
    }

  }

}


</style>
