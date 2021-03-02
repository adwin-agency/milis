<template>
  <div class="not-found page-top">
    <div class="row">
      <div class="col col-12 col-lg-6 col-xl-5">
        <Header class="page-header fade-slide-down js-anim" v-anim="true" />
      </div>
      <div class="col col-12">
        <div class="not-found__main">
          <div class="not-found__img">
            <img src="@/assets/img/not-found.svg" alt="404">
          </div>
          <h1 class="not-found__heading">Упс.. мы потеряли кухни</h1>
          <p class="not-found__text">Но вы можете перейти в наш каталог, где <br>сможете подобрать идеальный вариант</p>
          <Button class="not-found__btn">Перейти в каталог</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/base/Button'
import Header from '@/components/Header'

export default {
  name: 'NotFound',
  components: {
    Button,
    Header
  }
}
</script>

<style lang="scss">
.not-found {
  &__main {
    text-align: center;
  }

  &__img {
    margin: 80px auto 0;
    max-width: 370px;
  }

  &__heading {
    margin-top: 19px;
    font-family: $font-secondary;   
    font-weight: bold;
    font-size: 28px;
    line-height: (69/50);
    color: $color-blue;
  }

  &__text {
    margin: 12px auto 0;
    max-width: 335px;
    font-family: $font-secondary;
    font-size: 14px;
    line-height: (30/18);
    color: $color-blue;

    br {
      display: none;
    }
  }

  &__btn {
    margin-top: 40px;
    width: 100%;
    max-width: 320px;
  }

  @include media(md) {
    &__img {
      margin-top: 22px;
      max-width: 600px;
    }

    &__heading {
      font-size: 36px;
    }
    
    &__text {
      max-width: none;
      font-size: 16px;

      br {
        display: initial;
      }
    }

    &__btn {
      width: auto;
      min-width: 320px;
    }
  }

  @include media(xl) {
    &__img {
      max-width: 925px;
    }

    &__heading {
      font-size: 50px;
    }

    &__text {
      font-size: 18px;
    }
  }
}
</style>
