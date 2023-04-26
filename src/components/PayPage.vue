<template>
  <div class="payment">
    <div class="row">
      <div class="col col-12 col-lg-6 payment__image-col">
        <div class="payment__image anim-img js-anim" v-anim="true">
          <img src="@/assets/img/payment.jpg" alt=""/>
        </div>
      </div>
      <div class="col col-12 col-lg-6 col-xl-5">
        <Header class="slide-down js-anim" v-anim="true"/>
        <div class="payment__content fade-bounce-right js-anim" v-anim="true">
          <h1 class="payment__heading">Оплата</h1>
          <div class="payment__desc pay__desc">
            <p class="payment__text">
              Оплачивайте кухню картой прямо на сайте или наличными выездному
              менеджеру. <br/>У нас принимаются к оплате карты Visa и Master
              card<br/>

            </p>
            <div class="payment__icons">
              <div class="payment__icon">
                <Icon name="visa"/>
              </div>
              <div class="payment__icon">
                <Icon name="mastercard"/>
              </div>
              <div class="payment__icon">
                <Icon name="mir"/>
              </div>
            </div>
            <a
              :href="returnMoneyLink"
              target="_blank"
              class="pay__link"
            >
              Правила возврата денежных средств
            </a>
          </div>
        </div>
        <form class="pay__form" ref="form" @submit.prevent="onSubmit">
          <div class="pay__leaf">
            <Icon name="leaf"/>
          </div>

          <div class="pay__city">
            <p class="pay__city-text">
              Выберите город, в котором Вы хотите оплатить заказ
            </p>
            <div class="pay__city-choose">
              <div class="pay__radios">
                <Radio
                    name="city"
                    id="pay-city1"
                    labelText="Санкт-Петербург"
                    labelClass="pay__radio-label"
                    radioClass="pay__radio-btn"
                    :checked="activeCity === 'spb'"
                    value="spb"
                    @change="handleUserChange($event)"
                />
                <Radio
                    name="city"
                    id="pay-city2"
                    labelText="Москва"
                    labelClass="pay__radio-label"
                    radioClass="pay__radio-btn"
                    :checked="activeCity === 'msk'"
                    value="msk"
                    @change="handleUserChange($event)"
                />
              </div>
              <p class="pay__decore">Все просто!</p>
            </div>

            <hr class="pay__line"/>
            <div class="pay__availible" v-if="payAvailable && activeCity && activeCity !== 'spb'">
              <input type="hidden" name="shop_id" :value="shopId[activeCity]">
              <div class="pay__field">
                <TextInput
                    label="Имя и фамилия"
                    name="name"
                    class="pay__input"
                    :error="errors.name"
                    @input="onInput('name', $event)"
                />
              </div>
              <div class="pay__field">
                <TextInput
                    label="Телефон"
                    type="tel"
                    name="phone"
                    class="pay__input"
                    :error="errors.phone"
                    @input="onInput('phone', $event)"
                />
              </div>
              <div class="pay__field">
                <TextInput
                    label="e-mail"
                    name="email"
                    class="pay__input"
                    :error="errors.mail"
                    @input="onInput('mail', $event)"
                />
                <span class="pay__label"
                >*После прохождения платежа отправим квитанцию на почту</span
                >
              </div>
              <div class="pay__field">
                <TextInput
                    label="Адрес"
                    name="address"
                    class="pay__input"
                    :error="errors.adress"
                    @input="onInput('adress', $event)"
                />
                <span class="pay__label">*Как в договоре</span>
              </div>
              <div class="pay__field pay__field_contract">
                <TextInputContract
                    label="Номер договора"
                    name="contract-l"
                    class="pay__input-contract pay__input pay__input-contract_wtext"
                    placeholder="Буквы"
                    :prefix="prefix"
                    @inputChar="inputChar"
                    :error="false"
                    @input="onInput('contract_text', $event)"
                />
                <span class="pay__dash"> - </span>
                <TextInputContract
                    label=""
                    name="contract-n"
                    class="pay__input-contract pay__input"
                    placeholder="Цифры"
                    @inputNum="inputNum"
                    :error="false"
                    :prefix="prefix"
                />
              </div>
              <div class="pay__field">
                <TextInput
                    label="Сумма оплаты"
                    name="sum"
                    type="number"
                    class="pay__input"
                    :error="errors.sum"
                    @input="onInput('sum', $event)"
                />
                <span class="pay__label">*Минимальная сумма 1000 ₽</span>
              </div>
              <div v-if="activeCity !== 'msk'" class="pay__field">
                <TextInput
                    label="Дополнительный номер"
                    name="additional_number"
                    type="number"
                    class="pay__input"
                    :error="errors.addnum"
                    @input="onInput('addnum', $event)"
                />
              </div>
              <div class="pay__field" :class="{'pay__field_lg': activeCity === 'msk'}">
                <Select
                    className="pay__select"
                    name="payment_method"
                    :options="[
                    { value: 'sbp', title: 'Система Быстрых Платежей' },
                    { value: 'cart', title: 'Прочие способы оплаты' }
                  ]"
                    id="payment-type"
                />
              </div>
              <div class="pay__field pay__field_lg">
                <TextInput
                    label="Комментарии (необязательно)"
                    name="comment"
                    class="pay__input"
                    textarea
                />
              </div>
              <div class="pay__field">
                <div class="pay__policy-container">
                  <input
                      type="checkbox"
                      name="agreement"
                      id="pay-policy"
                      class="pay__policy-checkbox"
                      @change="checkboxClick"
                      ref="checkbox"
                  />
                  <label for="pay-policy" class="pay__policy"
                  >Нажимая кнопку "Отправить", вы соглашаетесь с
                    <a
                        :href="policyLink"
                        target="_blank"
                        class="pay__link"
                    >
                      политикой конфиденциальности
                    </a>
                    и
                    <a
                        :href="offerLink"
                        target="_blank"
                        class="pay__link"
                    >
                      публичной офертой.
                    </a>
                  </label>
                </div>
              </div>
              <div class="pay__field">
                <Button
                    type="submit"
                    class="pay__btn btn btn_blue"
                    :disabled="!numMask || !charMask || !checkBoxChecked"
                >
                  {{ sending ? 'Отправляем...' : 'Отправить' }}
                </Button>
              </div>
              <p
                  v-if="sendError"
                  class="pay__error"
              >
                Ошибка отправки
              </p>
            </div>
            <div class="pay__not-available" v-else>
              <p class="pay__not-available-tex">
                Для оплаты из этого региона, пожалуйста, ознакомьтесь с
                инструкцией в вашем договоре.
              </p>
              <!-- <p class="pay__not-available-tex">
                В случае возникновения вопросов, свяжитесь с нами по телефону
                <a href="+4959662520 " class="pay__tel">+7 (495) 966-25-20</a>
                (ежедневно с 9 до 22)
              </p> -->
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "./base/Icon";
import Header from "./Header";
import Radio from "./base/Radio";
import TextInput from "./base/TextInput";
import Select from "./base/Select";
import TextInputContract from "./base/TextInputContract";
import api from "../api"

export default {
  name: "Payment",
  components: {
    Icon,
    Header,
    Radio,
    TextInput,
    TextInputContract,
    Select,
  },
  data() {
    return {
      numMask: false,
      charMask: false,
      checkBoxChecked: false,

      // other
      prefixes: {
        spb: ["С", "ДС"],
        msk: ["НМ"]
      },
      shopId: {
        spb: "899034",
        msk: "899080",
      },
      errors: {
        sum: false,
        adress: false,
        phone: false,
        name: false,
        mail: false,
        addnum: false
      },
      values: {
        sum: "",
        adress: "",
        phone: "",
        name: "",
        mail: "",
        orderChar: "",
        orderNum: "",
        addnum: ""
      },
      userSelection: null,
      sending: false,
      sendError: false
    };
  },
  computed: {
    baseCity() {
      return this.$store.getters.activeCity?.code;
    },
    activeCity() {
      return this.userSelection || this.baseCity;
    },
    payAvailable() {
      return false
      // return this.shopId[this.activeCity] != "";
    },
    prefix() {
      return this.prefixes[this.activeCity];
    },
    returnMoneyLink() {
      return '/docs/return-money_' + this.activeCity + '.pdf'
    },
    policyLink() {
      return '/docs/policy_' + this.activeCity + '.pdf'
    },
    offerLink() {
      return '/docs/offer_' + this.activeCity + '.pdf'
    }
  },
  watch: {
    baseCity() {
      this.userSelection = null;
    },
    prefix() {
      this.charMask = false;
    },
  },
  created() {
  },

  methods: {
    inputChar(data) {
      this.charMask = data.mask;
      this.values.orderChar = data.value;
    },
    inputNum(data) {
      this.numMask = data.mask;
      this.values.orderNum = data.value;
    },

    handleUserChange(value) {
      this.userSelection = value;
    },
    checkboxClick() {
      if (this.$refs.checkbox.checked) {
        this.checkBoxChecked = true;
      } else {
        this.checkBoxChecked = false;
      }
    },
    onInput(inp, val) {
      if (this.errors[inp]) {
        this.errors[inp] = false;
      }

      this.values[inp] = val;
    },
    onSubmit() {
      for (let input in this.values) {
        const value = this.values[input];

        if (value.trim() === '') {
          this.errors[input] = true;
        }

        if (input === 'addnum' && this.activeCity === 'msk') {
          this.errors[input] = false;
        }

        if (input === "phone" && (value.length < 16 || api.checkDuplicateTel(value))) {
          this.errors[input] = true;
        }
      }

      for (let error in this.errors) {
        if (this.errors[error]) {
          return;
        }
      }

      this.sending = true
      this.sendError = false
      const data = new FormData(this.$refs.form)

      api.sendForm(data, 'payment')
          .then(() => {
            this.sending = false
          })
          .catch(() => {
            this.sending = false
            this.sendError = true
          })
    },
  },
};
</script>

<style lang="scss">
.pay {
  &__form {
    background-color: #f9f9f9;
    padding: 27px 22px 43px;
    z-index: 10;
    margin-top: 50px;
    margin-left: -20px;
    margin-right: -20px;
    position: relative;
  }

  &__city-text {
    color: #515151;
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 22px;
  }

  &__radios {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 10px;
    max-width: 567px;
  }

  &__radio-btn {
    display: none;
  }

  &__radio-label {
    background-color: #303864;
    color: white;
    font-size: 16px;
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 54px;
    padding: 0 10px;
    width: 100%;
    cursor: pointer;
    text-align: center;
  }

  &__radio-btn:checked + &__radio-label {
    background-color: #0cd725;
  }

  &__link {
    color: #303864;
    text-decoration: underline;

    font-size: 14px;
  }

  &__line {
    background-color: #acacac;
    height: 1px;
    padding: 0;
    margin: 0;
    border: 0px;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  &__input input {
    background-color: white;

    &::placeholder {
      color: #acacac;
    }
  }

  &__input .text-input__label {
    background: linear-gradient(0deg, white 50%, transparent 50%);
  }

  &__input {
    background-color: white;
  }

  &__input input {
    -moz-appearance: textfield;
  }

  &__input input::-webkit-outer-spin-button,
  &__input input::-webkit-inner-spin-button {
    display: none;
    -webkit-appearance: none;
    margin: 0;
  }

  &__input textarea {
    background-color: white;
  }

  &__availible {
    display: grid;
    row-gap: 20px;
  }

  &__label {
    font-size: 12px;
    color: #acacac;
  }

  &__field_contract {
    display: grid;
    grid-template-columns: 167px 20px auto;
    align-items: center;
  }

  &__dash {
    display: block;
    text-align: center;
    color: #acacac;
    font-size: 24px;
  }

  &__input-contract_wtext .text-input__label {
    transform: translateY(-27px);
  }

  &__desc .payment__icons {
    margin-bottom: 17px;
  }

  &__policy {
    font-size: 14px;
    color: #959494;
    cursor: pointer;
  }

  &__btn {
    width: 100%;
  }

  &__policy-container {
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 8px;
  }

  &__policy-checkbox {
    border-radius: 0px;
    width: 12px;
    height: 12px;
    cursor: pointer;
  }

  &__decore {
    font-family: Madelyn, sans-serif;
    font-size: 50px;
    line-height: 0.96;
    text-align: right;
    color: #acacac;
  }

  &__leaf {
    fill: #0cd725;
    position: absolute;
    right: 11px;
    top: -39px;
    width: 57px;
    height: 61px;
  }

  &__decore {
    display: none;
  }

  &__not-available {
    padding-top: 20px;
    display: grid;
    row-gap: 25px;
  }

  &__not-available-tex {
    font-size: 16px;
    line-height: 25px;
    color: #021a76;
  }

  &__tel {
    font-weight: bold;
    white-space: nowrap;
  }

  &__error {
    text-align: center;
    font-family: $font-secondary;
    font-size: 14px;
    color: $color-red;
  }
}

@media (min-width: 800px) {
  .pay {
    &__availible {
      grid-template-columns: 1fr 1fr;
      column-gap: 20px;
      row-gap: 38px;
    }

    &__field .text-input_ta .text-input__field {
      height: 45px;
      overflow: hidden;
    }

    &__field_lg {
      grid-column: 1 / -1;
    }

    &__label {
      height: 0px;
      overflow: visible;
      display: block;
      margin-top: 5px;
    }

    &__city-choose {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__decore {
      display: block;
      //margin-right: 20px;
    }

    &__radios {
      flex-shrink: 0;
      flex-grow: 1;
    }

    &__desc {
      display: grid !important;
      grid-template-columns: auto auto;
      row-gap: 20px;
    }

    &__not-available {
      padding-top: 8px;
      max-width: 544px;
      row-gap: 25px;
    }

    &__not-available-tex {
      font-size: 16px;
      line-height: 25px;
      color: #021a76;
    }

    &__tel {
      font-weight: bold;
      white-space: nowrap;
    }

    &__error {
      grid-column: 2/3;
    }
  }
}

@media (min-width: 1150px) {
  .pay {
    &__form {
      min-width: 1100px;
    }

    &__decore {
      margin-right: 20px;
    }

    &__line {
      margin-top: 38px;
      margin-bottom: 38px;
    }

    &__form {
      padding: 36px 60px 67px;
    }

    &__leaf {
      height: 78px;
      width: 73px;
      right: -7px;
      top: -30px;
    }
  }
}

.payment {
  &__image {
    margin: 0 (-$container-padding);
    z-index: -1;
  }

  &__content {
    margin-top: 40px;
  }

  &__heading {
    font-size: 34px;
    left: (41/34);
  }

  &__desc {
    margin-top: 22px;
  }

  &__text {
    font-size: 14px;
    line-height: (25/14);
  }

  &__icons {
    display: flex;
    align-items: center;
    margin-top: 12px;
  }

  &__icon {
    width: 48px;
    height: 48px;
    margin-right: 22px;

    &:last-child {
      margin-right: 0;
    }
  }

  &__features {
    margin-top: 32px;
  }

  &__feature {
    display: flex;
    margin-bottom: 24px;
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 14px;
    line-height: (22/14);
    color: $color-blue;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__feature-icon {
    flex-shrink: 0;
    width: 15px;
    height: 16px;
    margin-right: 14px;
    fill: $color-green;
  }

  @include media(md) {
    &__image {
      margin: 0 (-$container-padding-md);
    }

    &__heading {
      font-size: 44px;
      line-height: (54/44);
    }

    &__desc {
      display: flex;
      align-items: center;
    }

    &__text {
      font-size: 16px;
      line-height: (29/16);
    }

    &__icons {
      flex-shrink: 0;
      margin: 0 44px;
    }

    &__features {
      margin-top: 38px;
    }

    &__feature {
      margin-bottom: 18px;
    }
  }

  @include media(lg) {
    &__image-col {
      order: 1;
    }

    &__image {
      margin-left: 0;
    }

    &__content {
      margin-top: 48px;
    }

    &__desc {
      margin-top: 20px;
    }

    &__text {
      font-size: 12px;
      line-height: (22/12);
    }

    &__icons {
      margin-left: 32px;
      margin-right: 124px;
    }

    &__features {
      margin-top: 84px;
      margin-right: -50%;
    }
  }

  @include media(xl) {
    &__image-col {
      margin-left: auto;
    }

    &__image {
      margin-right: -$container-padding-xl;
    }

    &__content {
      margin-top: 54px;
    }

    &__heading {
      font-size: 60px;
      line-height: (73/60);
    }

    &__text {
      font-size: 16px;
      line-height: (29/16);
    }

    &__features {
      margin-top: 48px;
      margin-right: 0;
    }
  }
}
</style>