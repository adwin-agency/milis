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
          <TextWrap class="reviews__text" v-if="$windowWidth < $breakpoints.md || $windowWidth >= $breakpoints.lg && $windowWidth < $breakpoints.xl">
            Озывы о компании всегда очень важная часть. Она не только помогает увидеть все плюсы и минусы честно, от одних людей другим людям, но и помогают нам стать лучше. Спасибо Вам, что благодарите нас за работу или даете нам повод стать лучше! <br><br>Здесь вы можете написать обо всем! Рассказать впечатление о мебели, о сервисах и услугах. Возможно Ваши предложения.
          </TextWrap>
          <p class="reviews__text" v-else>Озывы о компании всегда очень важная часть. Она не только помогает увидеть все плюсы и минусы честно, от одних людей другим людям, но и помогают нам стать лучше. Спасибо Вам, что благодарите нас за работу или даете нам повод стать лучше! <br><br>Здесь вы можете написать обо всем! Рассказать впечатление о мебели, о сервисах и услугах. Возможно Ваши предложения.</p>
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
