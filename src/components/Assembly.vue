<template>
  <div class="assembly">
    <div class="row">
      <div class="col col-12 col-lg-7">
        <div class="assembly__image anim-img js-anim" v-anim="true">
          <img src="../assets/img/assembly.jpg" alt="">
        </div>
      </div>
      <div class="col col-12 col-lg-5">
        <div class="assembly__content">
          <h2 class="assembly__heading">Качественная сборка</h2>
          <p class="assembly__text">Перед отправкой со склада ваша мебель тщательно проверяется и упаковывается. Наша сборка гарантирует более долговечное использование продукции. Наши сборщики отлично знают свою работу, сделают это быстро и качественно, а также уберут за собой мусор. <br><br>Такая сборка увеличивает Ваш срок гарантии еще на 6 месяцев. <br>Стоимость сборки 10% от стоимости гарнитура</p>
          <Steps
            class="assembly__steps"
            v-if="$windowWidth >= $breakpoints.xl"
            leaf
            assembly
          />
        </div>
      </div>
      <div class="col col-12 col-lg-9" v-if="$windowWidth < $breakpoints.xl">
        <Steps leaf assembly class="assembly__steps"/>
      </div>
    </div>
  </div>
</template>

<script>
import Steps from './Steps'

export default {
  name: 'Assembly',
  components: {
    Steps
  }
}
</script>

<style lang="scss">
.assembly {
  display: flex;

  &__image {
    margin: 0 (-$container-padding);
    // margin-top: 12px;
    // width: 60.4%;
  }

  &__content {
    margin-top: 25px;
    // width: 39.6%;
    // padding-left: 60px;
    // padding-right: 60px;
  }

  &__heading {
    font-size: 34px;
    line-height: (39/34);
  }

  &__text {
    margin-top: 20px;
    font-size: 14px;
    line-height: (30/14);
  }

  &__steps {
    margin: 52px (-$container-padding) 0;
    // margin-left: -262px;
  }

  @include media(md) {
    &__image {
      margin: 0 (-$container-padding-md);
    }

    &__content {
      margin-top: 38px;
    }

    &__heading {
      font-size: 44px;
      line-height: (51/44);
    }

    &__text {
      font-size: 16px;
      line-height: (32/16);
    }

    &__steps {
      margin: 40px (-$container-padding-md) 0;
    }
  }

  @include media(lg) {
    &__image {
      margin-right: 0;
    }

    &__content {
      margin-top: 10px;
      margin-left: 26px;
    }

    &__text {
      margin-top: 16px;
      font-size: 12px;
      line-height: (24/12);
    }

    &__steps {
      margin: 48px 20px 0 (-$container-padding-md);
    }
  }

  @include media(xl) {
    &__image {
      margin-left: -$container-padding-xl;
      margin-right: -20px;
    }

    &__content {
      margin-top: -12px;
      margin-left: 60px;
    }

    &__heading {
      font-size: 60px;
      line-height: (69/60);
    }

    &__text {
      font-size: 16px;
      line-height: (32/16);
    }

    &__steps {
      margin: 32px 70px 0 -260px;
    }
  }
}
</style>
