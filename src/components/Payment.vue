<template>
  <div class="payment">
    <div class="row">
      <div class="col col-12 col-lg-6 payment__image-col">
        <div class="payment__image anim-img js-anim" v-anim="true">
          <img src="../assets/img/payment.jpg" alt="">
        </div>
      </div>
      <div class="col col-12 col-lg-6 col-xl-5">
        <Header class="slide-down js-anim" v-anim="true" />
        <div class="payment__content fade-bounce-right js-anim" v-anim="true">
          <h1 class="payment__heading">Оплата</h1>
          <div class="payment__desc">
            <p class="payment__text">Оплачивайте кухню картой прямо на сайте или наличными выездному менеджеру. <br>У нас принимаются к оплате карты Visa, MasterCard и МИР</p>
            <div class="payment__icons">
              <div class="payment__icon">
                <Icon name="visa" />
              </div>
              <div class="payment__icon">
                <Icon name="mastercard" />
              </div>
              <div class="payment__icon payment__icon_lg">
                <Icon name="mir" />
              </div>
            </div>
          </div>
          <div class="payment__features">
            <p class="payment__feature">
              <span class="payment__feature-icon">
                <Icon name="leaf" />
              </span>
              Сроки изготовления кухни 1 месяц
            </p>
            <p class="payment__feature">
              <span class="payment__feature-icon">
                <Icon name="leaf" />
              </span>
              Предоплата от 30%
            </p>
            <p class="payment__feature">
              <span class="payment__feature-icon">
                <Icon name="leaf" />
              </span>
              Перед оформлением заказа Вы можете заказать бесплатный замер и 3D проект
            </p>
            <p class="payment__feature">
              <span class="payment__feature-icon">
                <Icon name="leaf" />
              </span>
              Чтобы оформить заказ просто оставьте Ваш номер, мы перезвоним и оформим заказ
            </p>
          </div>
        </div>
      </div>
    </div>    
  </div>
</template>

<script>
import Icon from './base/Icon'
import Header from './Header'

export default {
  name: 'Payment',
  components: {
    Icon,
    Header
  }
}
</script>

<style lang="scss">
.payment {
  &__image {
    margin: 0 (-$container-padding);
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

    &_lg {
      width: 68px;
    }

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
