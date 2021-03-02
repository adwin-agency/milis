<template>
  <div class="modal-calc">
    <div class="modal-calc__content">
      <form
        class="modal-calc__form"
        ref="calcform"
        @submit.prevent="onSubmit"
      >
        <input type="hidden" name="type" value="size">
        <input type="hidden" name="page" :value="inputPage">
        <input type="hidden" name="item" :value="inputItem">
        <input type="hidden" name="item_id" :value="inputItemId">
        <input type="hidden" name="product_type" :value="inputProductType">
        <p class="modal-calc__title">Рассчитать стоимость</p>
        <p class="modal-calc__desc">Вы можете воспользоваться калькулятором, это займет не больше 5 минут, и получите примерный рассчет. Или оставить номер, размеры и пожелания и мы сами перезвоним Вам с рассчетом</p>
        <div class="modal-calc__fields">
          <TextInput
            class="modal-calc__field"
            label="Имя"
            type="text"
            name="name"
            v-model="inputName"
          />
          <TextInput
            class="modal-calc__field"
            label="Телефон"
            type="tel"
            name="phone"
            v-model="inputPhone"
          />
          <TextInput
            class="modal-calc__field"
            textarea
            label="Комментарий"
            name="comment"
            v-model="inputComment"
          />
          <input type="file" name="file" style="margin-top: 20px">
        </div>
        <Button
          send
          type="submit"
          class="modal-calc__btn"
        >
          Отправить
        </Button>
      </form>
    </div>
    <div class="modal-calc__side">
      <div class="modal-calc__features">
        <p class="modal-calc__feature">
          <span class="modal-calc__feature-icon">
            <Icon name="heart" />
          </span>
          Рассчет до рубля за 5 минут
        </p>
        <p class="modal-calc__feature">
          <span class="modal-calc__feature-icon">
            <Icon name="heart" />
          </span>
          При расчете — 3D проект в{{'\xa0'}}подарок
        </p>
      </div>
      <p class="modal-calc__date">Акция ограничена <br>до <b>21 марта</b></p>
      <img src="@/assets/img/modal-calc.png" alt="" class="modal-calc__image">
      <span class="modal-calc__like">
        <Icon name="hand-like" />
      </span>
      <div class="modal-calc__promo">
        <span>АКЦИЯ МЕСЯЦА</span>
      </div>
      <span class="modal-calc__smile">
        <Icon name="smile-5" />
      </span>
      <Discount
        class="modal-calc__discount"
        value="47"
      />
    </div>
    <div class="modal-calc__close" @click="$emit('close')">
      <Icon name="close" />
    </div>
  </div>
</template>

<script>
import TextInput from './base/TextInput'
import Button from './base/Button'
import Icon from './base/Icon'
import Discount from './base/Discount'
import api from '@/api'

export default {
  name: 'ModalCalc',
  components: {
    TextInput,
    Button,
    Icon,
    Discount
  },
  data() {
    return {
      inputName: '',
      inputPhone: '',
      inputComment: ''
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
    onSubmit() {
      const data = new FormData(this.$refs.calcform)
      api.sendForm(data)
    }
  }
}
</script>

<style lang="scss">
.modal-calc {
  $b: &;

  position: relative;
  background-color: $color-white;
  overflow: hidden;

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

  &__side {
    position: relative;
    padding: 40px 20px 220px;
    background-color: #EEEEEE;
  }

  &__feature {
    display: flex;
    margin-bottom: 19px;
    font-weight: bold;
    font-size: 20px;
    line-height: (27/20);
    color: $color-blue;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__feature-icon {
    flex-shrink: 0;
    width: 25px;
    height: 25px;
    margin-right: 18px;
  }

  &__date {
    margin-top: 35px;
    font-size: 20px;
    line-height: (27/20);
    color: $color-blue;
  }

  &__image {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 250px;
  }

  &__like {
    position: absolute;
    right: 152px;
    bottom: 101px;
    width: 52px;
    height: 52px;
  }

  &__promo {
    position: absolute;
    right: 118px;
    bottom: -88px;
    width: 216px;
    height: 216px;
    border-radius: 50%;
    padding: 48px 45px;
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 26px;
    line-height: (33/26);
    color: $color-white;
    background-color: #E8505B;
  }

  &__smile {
    position: absolute;
    right: 256px;
    bottom: 105px;
    width: 25px;
    height: 25px;
  }

  &__discount {
    position: absolute;
    right: 53px;
    bottom: 10px;
    width: 104px;
    height: 106px;
    padding-bottom: 16px;
    font-size: 25px;
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
    &__side {
      padding: 40px 20px 185px;
    }
  }

  @include media(md) {
    &__content {
      padding: 38px 100px 45px;
    }

    &__side {
      padding: 70px 360px 80px 80px;
      min-height: 332px;
    }

    &__image {
      width: 348px;
    }

    &__like {
      right: 180px;
      bottom: 140px;
      width: 72px;
      height: 72px;
    }

    &__promo {
      right: 134px;
      bottom: -123px;
      width: 300px;
      height: 300px;
      padding: 65px 60px;
      font-size: 36px;
      line-height: (45/36);
    }

    &__smile {
      right: 325px;
      bottom: 145px;
      width: 35px;
      height: 35px;
    }

    &__discount {
      right: 45px;
      bottom: 15px;
      width: 144px;
      height: 148px;
      font-size: 36px;
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
      padding: 60px 82px 60px 70px;
    }

    &__title {
      padding-right: 0;
    }

    &__desc {
      padding-right: 50px;
    }

    &__side {
      width: 43%;
      border-left: 4px solid $color-green;
      padding: 124px 40px 352px;
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
