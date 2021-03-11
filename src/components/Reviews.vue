<template>
  <div class="reviews page-top">
    <div class="row">
      <div class="col col-12 col-lg-6 reviews__image-col">
        <div class="reviews__image anim-img js-anim" v-anim="true">
          <img src="../assets/img/reviews.jpg" alt="">
        </div>
      </div>
      <div class="col col-12 col-lg-6 col-xl-5">
        <Header class="page-header fade-slide-down js-anim" v-anim="true" />
        <div class="reviews__wrapper fade-bounce-right js-anim" v-anim="true">
          <h1 class="heading reviews__heading">Отзывы о нас</h1>
          <TextWrap
            v-if="$windowWidth < $breakpoints.md || $windowWidth >= $breakpoints.lg && $windowWidth < $breakpoints.xl"
            class="reviews__text"
          >
            Мы дорожим своей репутацией, поэтому для нас очень важна обратная связь. Она не только помогает увидеть все наши плюсы и минусы со стороны, но и постоянно делает нас лучше. <br><br>Здесь вы можете поделиться своими впечатлениями и эмоциям от работы с нашей компанией. Рассказать свои впечатления о мебели, сервисе и услугах нашей компании. Спасибо за каждый отзыв! Мы вас ценим!
          </TextWrap>
          <p
            v-else
            class="reviews__text"
          >
            Мы дорожим своей репутацией, поэтому для нас очень важна обратная связь. Она не только помогает увидеть все наши плюсы и минусы со стороны, но и постоянно делает нас лучше. <br><br>Здесь вы можете поделиться своими впечатлениями и эмоциям от работы с нашей компанией. Рассказать свои впечатления о мебели, сервисе и услугах нашей компании. Спасибо за каждый отзыв! Мы вас ценим!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextWrap from './base/TextWrap'
import Header from './Header'

export default {
  name: 'Reviews',
  components: {
    TextWrap,
    Header
  }
}
</script>

<style lang="scss">
.reviews {
  &__image {
    margin: 0 (-$container-padding);
  }

  &__heading {
    margin-top: 40px;
  }

  &__text {
    margin-top: 20px;
    font-size: 16px;
    line-height: (32/16);
  }

  @include media(md) {
    &__image {
      margin: 0 (-$container-padding-md);
    }

    &__text {
      max-width: 630px;
    }
  }

  @include media(lg) {
    &__image-col {
      order: 1;
    }

    &__image {
      margin-left: 0;
    }

    &__heading {
      margin-top: 34px;
    }

    &__text {
      font-size: 14px;
      line-height: (28/14);
    }
  }

  @include media(xl) {
    &__image-col {
      margin-left: auto;
    }

    &__image {
      margin-right: -$container-padding-xl;
    }

    &__heading {
      margin-top: 50px;
    }

    &__text {
      font-size: 16px;
      line-height: (32/16);
    }
  }
}
</style>
