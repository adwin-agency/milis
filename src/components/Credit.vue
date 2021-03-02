<template>
  <div class="credit">
    <div class="row">
      <div class="col col-12 col-lg-6">
        <div class="credit__image anim-img js-anim" v-anim="true">
          <img src="../assets/img/credit.jpg" alt="">
        </div>
      </div>
      <div class="col col-12 col-lg-6">
        <div class="credit__content">
          <div class="credit__banks" v-if="$windowWidth >= $breakpoints.md">
            <div class="credit__bank">
              <img src="../assets/img/credit-bank-01.png" alt="">
            </div>
            <div class="credit__bank">
              <img src="../assets/img/credit-bank-02.png" alt="">
            </div>
            <div class="credit__bank">
              <img src="../assets/img/credit-bank-03.png" alt="">
            </div>
            <div class="credit__bank">
              <img src="../assets/img/credit-bank-04.png" alt="">
            </div>
            <div class="credit__bank">
              <img src="../assets/img/credit-bank-05.png" alt="">
            </div>
            <div class="credit__bank">
              <img src="../assets/img/credit-bank-06.png" alt="">
            </div>
            <div class="credit__bank">
              <img src="../assets/img/credit-bank-07.png" alt="">
            </div>
          </div>
          <h2 class="credit__heading">Рассрочка</h2>
          <p class="credit__text">Вы можете купить новую кухню уже сегодня, воспользовавшись нашей беспроцентной рассрочкой</p>
          <div class="credit__terms">
            <span class="credit__term">0₽</span>
            <span class="credit__term">0%</span>
            <span class="credit__term">6мес</span>
          </div>
          <div class="credit__banks" v-if="$windowWidth < $breakpoints.md">
            <div class="credit__bank">
              <img src="../assets/img/credit-bank-01.png" alt="">
            </div>
            <div class="credit__bank">
              <img src="../assets/img/credit-bank-02.png" alt="">
            </div>
            <div class="credit__bank">
              <img src="../assets/img/credit-bank-03.png" alt="">
            </div>
            <div class="credit__bank">
              <img src="../assets/img/credit-bank-04.png" alt="">
            </div>
            <div class="credit__bank">
              <img src="../assets/img/credit-bank-05.png" alt="">
            </div>
            <div class="credit__bank">
              <img src="../assets/img/credit-bank-06.png" alt="">
            </div>
            <div class="credit__bank">
              <img src="../assets/img/credit-bank-07.png" alt="">
            </div>
          </div>
          <div class="credit__features">
            <p class="credit__feature">
              <span class="credit__feature-icon">
                <Icon name="leaf" />
              </span>
              У нас быстрое принятие решения
            </p>
            <p class="credit__feature">
              <span class="credit__feature-icon">
                <Icon name="leaf" />
              </span>
              Высокий шанс одобрения
            </p>
            <p class="credit__feature">
              <span class="credit__feature-icon">
                <Icon name="leaf" />
              </span>
              Большое количество банков-партнеров
            </p>
            <p class="credit__feature">
              <span class="credit__feature-icon">
                <Icon name="leaf" />
              </span>
              Чтобы оформить заказ в рассрочку и получить предварительный рассчет оставьте Ваш номер
            </p>
          </div>
          <form class="credit__form">
            <TextInput label="Телефон" class="credit__input"/>
            <Button class="credit__btn" type="submit" send>Отправить</Button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from './base/Icon'
import TextInput from './base/TextInput'
import Button from './base/Button'

export default {
  name: 'Credit',
  components: {
    Icon,
    TextInput,
    Button
  }
}
</script>

<style lang="scss">
.credit {
  &__image {
    margin: 0 (-$container-padding);
  }

  &__content {
    margin-top: 40px;
  }

  &__heading {
    font-size: 34px;
    line-height: (41/34);
  }

  &__text {
    margin-top: 22px;
    font-size: 14px;
    line-height: (22/14);
  }

  &__terms {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    max-width: 350px;
  }

  &__term {
    font-weight: 300;
    font-size: 50px;
    line-height: (59/50);
    color: $color-gray;
  }

  &__banks {
    margin-top: 20px;
    border: 1px solid $color-gray;
    padding: 50px 10px 15px 40px;
  }

  &__bank {
    display: inline-block;
    vertical-align: middle;
    margin-right: 30px;
    margin-bottom: 30px;
  }

  &__features {
    margin-top: 20px;
  }

  &__feature {
    display: flex;
    margin-bottom: 20px;
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

  &__form {
    margin-top: 40px;
  }

  &__input {
    background-color: $color-white;
  }

  &__btn {
    margin-top: 20px;
    width: 100%;
  }

  @include media(md) {
    &__image {
      margin: 0 (-$container-padding-md);
    }

    &__content {
      margin-top: 40px;
    }

    &__heading {
      font-size: 44px;
      line-height: (54/44);
    }

    &__text {
      font-size: 16px;
      line-height: (25/16);
    }

    &__terms {
      max-width: 330px;
    }

    &__features {
      margin-top: 62px;
    }

    &__banks {
      float: right;
      order: -1;
      margin-top: 0;
      margin-left: 60px;
      margin-bottom: 20px;
      width: 303px;
      padding: 44px 10px 15px 34px;
    }

    &__bank {
      margin-right: 24px;
      margin-bottom: 24px;
    }

    &__form {
      display: flex;
      clear: right;
      margin-top: 32px;
    }

    &__input {
      flex: 1;
      margin-right: 20px;
    }

    &__btn {
      margin-top: 0;
      width: auto;
      min-width: 344px;
    }
  }

  @include media(lg) {
    &__image {
      margin-right: 0;
    }

    &__content {
      margin-top: -10px;
      margin-left: 26px;
    }

    &__text {
      margin-top: 16px;
      font-size: 12px;
      line-height: (19/12);
    }

    &__term {
      font-size: 45px;
      line-height: (53/45);
    }

    &__banks {
      margin-top: 16px;
      margin-left: 30px;
      width: 168px;
      padding: 24px 0 15px 20px;
    }

    &__bank {
      margin-right: 8px;
      margin-bottom: 8px;

      img {
        width: auto;
        max-width: 82px;
        max-height: 22px;
      }
    }

    &__features {
      margin-top: 48px;
    }

    &__feature {
      margin-bottom: 22px;
      font-size: 12px;
      line-height: (19/12);
    }

    &__form {
      margin-top: 56px;
    }

    &__input {
      margin-right: 16px;
    }

    &__btn {
      min-width: 236px;
    }
  }

  @include media(xl) {
    &__image {
      margin-left: -$container-padding-xl;
      margin-right: 56px;
    }

    &__content {
      margin-top: 0;
      margin-left: 0;
    }

    &__heading {
      font-size: 60px;
      line-height: (73/60);
    }

    &__text {
      margin-top: 10px;
      font-size: 16px;
      line-height: (25/16);
    }

    &__terms {
      margin-top: 10px;
      max-width: 400px;
    }

    &__term {
      font-size: 60px;
      line-height: (70/60);
    }

    &__banks {
      margin-top: 10px;
      width: 303px;
      padding: 40px 10px 15px 34px;
    }

    &__bank {
      margin-right: 24px;
      margin-bottom: 24px;

      img {
        width: 100%;
        max-width: none;
        max-height: none;
      }
    }

    &__features {
      margin-top: 28px;
      padding-right: 300px;
    }

    &__feature {
      margin-bottom: 20px;
      font-size: 14px;
      line-height: (22/14);
    }

    &__form {
      margin-top: 48px;
    }

    &__btn {
      min-width: 400px;
    }
  }
}
</style>
