<template>
  <div class="call" :class="{'is-success': success}">
    <div class="row">
      <div class="col col-12 col-xl-5">
        <div class="call__image anim-img js-anim" v-anim="true" >
          <img src="../assets/img/call-form.jpg" alt="">
        </div>
        <p class="call__decor" v-if="$windowWidth >= $breakpoints.xl">Все просто!</p>
      </div>
      <div class="col col-12 col-xl-7">
        <div class="call__content">
          <CallForm
            class="call__form"
            :hiddenData="hiddenData"
            @success="onSuccess"
          />
          <div class="call__success">
            <FormSuccess
              :class="{'is-active': success}"
              :title="`Ваша заявка \n успешно отправлена!`"
              :desc="`Мы свяжемся с Вами в ближайшее время, \n для подтверждения заявки`"
              :link="{path: 'catalog', title: 'Посмотреть похожиее кухни'}"
            />
          </div>
          <div class="call__leaf">
            <Icon name="leaf" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from './base/Icon'
import CallForm from './CallForm'
import FormSuccess from '@/components/FormSuccess'

export default {
  name: 'Call',
  components: {
    Icon,
    CallForm,
    FormSuccess
  },
  props: {
    details: Object
  },
  data() {
    return {
      success: false
    }
  },
  computed: {
    hiddenData() {
      return {
        item: this.details.name,
        itemId: this.details.id,
        productType: this.details.product_type
      }
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
.call {
  $b: &;

  &.is-success {
    #{$b} {
      &__success {
        opacity: 1;
        pointer-events: all;
        z-index: auto;
      }
    }
  }

  &__image {
    margin: 0 (-$container-padding);
  }

  &__decor {
    margin-top: 27px;
    margin-right: 44px;
    text-align: right;
    font-family: $font-decorative;
    font-size: 50px;
    color: $color-gray-middle;
  }

  &__content {
    position: relative;
    margin: 0 (-$container-padding);
    padding: 24px $container-padding;
    background-color: #F9F9F9;
  }

  &__success {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 20px;
    background-color: #F9F9F9;
    opacity: 0;
    pointer-events: none;
    transition: opacity .5s ease;
    z-index: -1;
  }

  &__leaf {
    position: absolute;
    top: -40px;
    right: 20px;
    width: 58px;
    height: 62px;
    fill: $color-green;
  }

  @include media(md) {
    &__image {
      margin: 0 (-$container-padding-md);
    }

    &__content {
      margin: 0 (-$container-padding-md);
      padding: 48px $container-padding-md 40px;
    }

    &__leaf {
      top: -24px;
      right: 0;
    }
  }

  @include media(lg) {
    &__image {
      margin: 0 30px;
    }

    &__content {
      margin: 0 30px;
      padding: 50px 120px;
    }

    &__leaf {
      top: -20px;
      right: 26px;
    }
  }

  @include media(xl) {
    &__image {
      margin: 0 -150px 0 (-$container-padding-xl);
    }

    &__content {
      margin: 50px 0 0 0;
      padding-right: 100px;
    }
  }
}
</style>
