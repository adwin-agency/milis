<template>
  <div class="about">
    <div class="row">
      <div class="col col-12" v-if="$mobile">
        <div class="about__image">
          <img src="../assets/img/about-2.jpg" alt="">
        </div>
      </div>
      <div class="col col-12 col-lg-6 col-xl-5 about__main-col">
        <Header class="slide-down js-anim" v-anim="true" />
        <div class="about__wrapper fade-bounce-right js-anim" v-anim="true">
          <Back
            :to="{name: 'catalog'}"
            class="about__back"
          />
          <Company class="about__company" />
        </div>        
        <div class="about__add-img anim-img js-anim" v-anim="true">
          <img src="../assets/img/about-add-2.jpg" alt="">
        </div>
      </div>
      <div class="col col-12 col-lg-6">
        <div class="about__image anim-img js-anim" v-anim="true" v-if="!$mobile">
          <img src="../assets/img/about-2.jpg" alt="">
        </div>
        <Production class="about__production" />
        <Materials class="about__materials" />
      </div>
    </div>
  </div>
</template>

<script>
import Back from '../components/base/Back'
import Header from '../components/Header'
import Company from '../components/Company'
import Production from '../components/Production'
import Materials from '../components/Materials'

export default {
  name: 'About',
  components: {
    Back,
    Header,
    Company,
    Production,
    Materials
  }
}
</script>

<style lang="scss">
.about {
  &__image {
    margin: 0 (-$container-padding);
    min-height: 70px;
  }

  &__back {
    margin-top: 18px;
  }

  &__company {
    margin-top: 20px;
  }

  &__add-img {
    margin: 55px (-$container-padding) 0;
  }

  &__production {
    margin-top: 25px;
  }

  &__materials {
    margin-top: 40px;
  }

  @include media(md) {
    &__image {
      margin: 0 (-$container-padding-md);
    }

    &__back {
      margin-top: 40px;
    }

    &__add-img {
      margin: 90px (-$container-padding-md) 0;
    }

    &__production {
      margin-top: 50px;
    }
  }

  @include media(lg) {
    &__back {
      margin-top: 34px;
    }

    &__image {
      margin-left: 0;
    }

    &__add-img {
      margin-top: 140px;
      margin-right: 32px;
    }

    &__production {
      margin-top: 132px;
    }

    &__materials {
      margin-top: 60px;
    }
  }

  @include media(xl) {
    &__main-col {
      margin-right: auto;
    }

    &__back {
      margin-top: 46px;
    }

    &__image {
      margin-right: -$container-padding-xl;
    }

    &__add-img {
      margin-top: 155px;
      margin-left: -$container-padding-xl;
      margin-right: 0;
    }

    &__production {
      margin-top: 150px;
    }

    &__materials {
      margin-top: 22px;
    }
  }
}
</style>
