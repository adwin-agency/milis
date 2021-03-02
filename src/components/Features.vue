<template>
  <div class="features">
    <div class="features__wrapper">
      <div class="features__image">
        <picture>
          <source srcset="../assets/img/features-xl.jpg" :media="'(min-width: ' + $breakpoints.xl + 'px)'">
          <source srcset="../assets/img/features-lg.jpg" :media="'(min-width: ' + $breakpoints.lg + 'px)'">
          <source srcset="../assets/img/features-md.jpg" :media="'(min-width: ' + $breakpoints.md + 'px)'">
          <source srcset="../assets/img/features.jpg">
          <img src="../assets/img/features-xl.jpg" alt="">
        </picture>
      </div>
      <div class="features__item features__item_1">
        <div class="features__mark">
          <div class="features__icon">
            <Icon name="plus"/>
          </div>
        </div>
        <p class="features__text">Варочную панель мы  переместили вправо, визуально расширив общее пространство для готовки.</p>
      </div>
      <div class="features__item features__item_2">
        <div class="features__mark">
          <div class="features__icon">
            <Icon name="plus"/>
          </div>
        </div>
        <p class="features__text">Учитывая небольшие размеры кухни, мы использовали каждый квадратный сантиметр по назначению.</p>
      </div>
      <div class="features__item features__item_3">
        <div class="features__mark">
          <div class="features__icon">
            <Icon name="plus"/>
          </div>
        </div>
        <p class="features__text">Глубокая раковина с фильтром для воды и удобным смесителем превратила мытье продуктов и посуды в приятный процесс. </p>
      </div>
    </div>
    <RouterLink to="/blog"  v-slot="{ href, navigate }" custom>
      <Button
        arrow
        blue
        :href="href"
        class="features__btn"
        @click.native="navigate"
      >
        Читать полную статью в блоге
      </Button>
    </RouterLink>
  </div>
</template>

<script>
import Icon from './base/Icon'
import Button from './base/Button'

export default {
  name: 'Features',
  components: {
    Icon,
    Button
  }
}
</script>

<style lang="scss">
.features {
  position: relative;

  &__item {
    position: relative;
    margin-left: 12px;
    margin-top: 40px;
    padding: 28px;
    padding-left: 40px;
    font-size: 12px;
    line-height: (17/12);
    background-color: #F9F9F9;
  }

  &__mark {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: -12px;
    top: -18px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: $color-blue;
  }

  &__icon {
    width: 18px;
    height: 18px;
  }

  &__btn {
    margin-top: 40px;
    width: 100%;
  }

  @include media(md) {
    &__wrapper {
      position: relative;
      min-height: 250px;
    }

    &__item {
      position: absolute;
      margin-left: 0;
      margin-top: 0;
      max-width: 320px;

      &_1 {
        left: 0;
        top: -20px;
      }

      &_2 {
        left: 0;
        top: 85%;
      }

      &_3 {
        left: 59%;
        top: 19%;
        right: -$container-padding-md;
      }
    }

    &__mark {
      left: -18px;
    }

    &__btn {
      position: absolute;
      right: -12px;
      bottom: -30px;
      width: auto;
    }
  }

  @include media(lg) {
    &__wrapper {
      margin: 0 90px;
      min-height: 350px;
    }

    &__item {
      max-width: 363px;

      &_1 {
        left: -80px;
        top: -26px;        
        max-width: 318px;
      }

      &_2 {
        left: 17%;
        top: 83%;        
      }

      &_3 {
        left: 68%;
        top: 45%;        
      }
    }

    &__btn {
      right: 2px;
      min-width: 375px;
    }
  }

  @include media(xl) {
    &__wrapper {
      margin: 0 150px;
    }

    &__item {
      &_1 {
        left: -75px;
      }

      &_2 {
        left: 26%;
      }

      &_3 {
        left: 67%;
      }
    }

    &__btn {
      right: 62px;
      bottom: -26px;
    }
  }
}
</style>
