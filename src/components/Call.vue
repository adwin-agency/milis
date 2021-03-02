<template>
  <div class="call">
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
          />
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

export default {
  name: 'Call',
  components: {
    Icon,
    CallForm
  },
  props: {
    details: Object
  },
  computed: {
    hiddenData() {
      return {
        item: this.details.name,
        itemId: this.details.id,
        productType: this.details.product_type
      }
    }
  }
}
</script>

<style lang="scss">
.call {
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
    // margin-top: 50px;
    // padding: 54px 117px;
    padding: 24px $container-padding;
    background-color: #F9F9F9;
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
    }
  }
}
</style>
