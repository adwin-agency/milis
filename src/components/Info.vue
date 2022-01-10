<template>
  <div class="info">
    <div class="container info__container">
      <div class="row info__row">
        <div class="col col-12 col-lg-5 col-xl-7 info__image-col">          
          <div class="info__image">
            <img src="../assets/img/info-image.jpg" alt="">
          </div>
          <h2
            class="info__heading"
            v-if="$mobile"
          >Кухни на заказ</h2>
          <div class="info__about">
            <div class="info__about-content">
              <div class="info__about-img" v-if="$mobile">
                <picture>
                  <source srcset="../assets/img/discount-banner-11-17-01-md.jpg" :media="'(min-width: ' + $breakpoints.md + 'px)'">        
                  <img src="../assets/img/discount-banner-11-17-01.jpg" alt="">
                </picture>
              </div>
              <p class="info__quote">Мы основатели компании “Милис”: Артем и Мила. В этой статье мы хотели бы ответить на самые популярные вопросы клиентов.
                <span class="info__author">Артем и{{'\xa0'}}Мила</span>
              </p>              
              <div class="info__about-details">              
                <div class="info__items">
                  <div class="info__item">
                    <p class="info__question">Почему у нас дешевле чем в салоне?</p>
                    <p class="info__answer">Обход массы салонов и переговоры с кучей консультантов утомляют и часто сбивают с толку. Поэтому мы выбрали формат онлайн-подборки. Без салонов, но зато быстрее и дешевле.</p>
                  </div>
                  <div class="info__item">
                    <p class="info__question">В чем преимущества такого формата?</p>
                    <p class="info__answer">Наши дизайнеры-замерщики приедут к вам домой, вы сможете пощупать все материалы, посмотреть их при естественном освещении. Вам сделают бесплатные замеры и дизайн-проект на основе вашего помещения.</p>
                  </div>
                  <div class="info__item">
                    <p class="info__question">Как происходит сотрудничество?</p>
                    <p class="info__answer">Удобство заключается в том, что вам не нужно ничего делать самим. Вы оставляете заявку на нашем сайте, с вами связывается оператор, затем приезжает дизайнер, который делает замеры и составляет проект по вашему вкусу. Не нужно долго выбирать и прикидывать. Образцы фасадов он также привезет с собой.</p>
                  </div>
                </div>
                <RouterLink
                  class="info__link"
                  :to="{name: 'about'}"
                >
                  Узнать больше о компании
                </RouterLink>
              </div>
            </div>
            <div class="info__about-img anim-img" :class="{'show': anim}" v-if="!$mobile">               
              <img src="../assets/img/discount-banner-11-17-01-md.jpg" alt="">
            </div>
          </div>        
        </div>
        <div class="col col-12 col-lg-7 col-xl-5 info__content-col">
          <div class="info__wrapper fade-slide-right" :class="{'show': anim}">
            <h2
              class="info__heading"
              v-if="!$mobile"
            >Кухни на заказ</h2>
            <p class="info__decor">Все просто! Кухня за 3 шага</p>
            <Steps class="info__steps" />
          </div>          
          <Materials info class="info__materials fade-slide-right" :class="{'show': anim}" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Steps from './Steps'
import Materials from './Materials'

export default {
  name: 'Info',
  components: {
    Steps,
    Materials
  },
  props: {
    anim: Boolean
  }
}
</script>

<style lang="scss">
.info {
  $b: &;

  padding: 14px 0 30px;

  &__heading {
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 24px;
    line-height: (33/24);
    
    color: $color-blue;
  }

  &__image {
    display: none;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(124, 140, 231, 0.5);
    }
  }

  &__about {
    margin-top: 20px;
  }

  &__quote {
    margin-top: 22px;
    font-size: 12px;
    line-height: (20/12);
    color: $color-gray-middle;
  }

  &__author {
    display: block;
    margin-top: 14px;
    text-align: right;
    font-family: $font-decorative;
    font-size: 28px;
    line-height: (19/28);
  }

  &__about-details {
    margin-top: 14px;
  }

  &__item {
    margin-bottom: 2px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__question {
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 14px;
    line-height: (23/14);
    color: $color-blue;
  }

  &__answer {
    margin-top: 8px;
    font-size: 10px;
    line-height: (18/10);
  }

  &__link {
    display: inline-block;
    margin-top: 18px;
    font-family: $font-secondary;
    font-size: 12px;
    line-height: (15/12);
    text-decoration: underline;
    color: $color-blue;
  }

  &__wrapper {
    margin-top: 40px;
  }

  &__decor {
    font-family: $font-decorative;
    font-size: 30px;
    line-height: (23/30);
    color: $color-gray-middle;
  }

  &__steps {
    margin: 16px (-$container-padding) 0;
  }

  &__materials {
    margin-top: 30px;
  }

  @include media(md) {
    padding-top: 0;
    padding-bottom: 60px;

    &__image {
      display: block;
      margin: 0 (-$container-padding-md);
    }

    &__heading {
      margin-top: 28px;
      width: 74%;
      padding-right: 30px;
      font-size: 44px;
      line-height: (54/44);
    }

    &__about {
      margin-top: 18px;
    }

    &__about-content {
      display: flex;
      flex-wrap: wrap;
    }

    &__quote {
      display: flex;
      margin-top: 0;
      flex: 1;
      margin-right: 25px;
      padding-bottom: 15px;
      border-bottom: 1px solid #D9D9D9;
      font-size: 14px;
      line-height: (23/14);
    }

    &__author {
      margin-left: 50px;
      margin-right: -16px;
      text-align: left;
      font-size: 40px;
      line-height: (27/40);
    }

    &__about-img {
      position: relative;
      order: 1;
      margin-top: -38.5%;
      margin-right: 10px;
      width: 26%;
    }

    &__about-details {
      order: 2;
      margin-top: 24px;
      padding: 0 90px;
    }

    &__item {
      margin-bottom: 12px;
    }

    &__question {
      font-size: 18px;
      line-height: (29/18);
    }

    &__answer {
      margin-top: 0;
      font-size: 12px;
      line-height: (21/12);
    }

    &__link {
      margin-top: 12px;
    }

    &__wrapper {
      margin-top: 72px;
    }

    &__steps {
      margin: 16px (-$container-padding-md) 0;
    }

    &__materials {
      margin-top: 36px;
    }
  }

  @include media(lg) {
    padding-bottom: 30px;

    &__content-col {
      display: flex;
      flex-direction: column;
      padding-top: 152px;
    }

    &__wrapper {
      margin-top: 0;
    }

    &__heading {
      margin-top: 0;
      width: auto;
      padding-right: 0;
    }

    &__decor {
      margin-top: 20px;
    }

    &__steps {
      margin: 16px 36px 0 -30px;
    }

    &__materials {
      margin-top: 24px;
      margin-right: 36px;
      transition-delay: .1s;
    }
    
    &__image-col {
      order: 1;
    }

    &__image {
      margin-left: 20px;
      margin-top: $header-height-md;
      overflow: hidden;

      img {
        width: 140%;
      }
    }

    &__about {
      margin-left: 20px;
      margin-top: 56px;
    }

    &__quote {
      margin-right: (-$container-padding-md);
      padding-bottom: 46px;
      font-size: 12px;
      line-height: (20/12);
    }

    &__author {
      margin-left: 20px;
      margin-top: 18px;
      margin-right: 20px;
      font-size: 30px;
      line-height: (21/30);
    }

    &__about-img {
      display: none;
    }

    &__about-details {
      padding: 0;
    }

    &__item {
      margin-bottom: 26px;
    }

    &__link {
      margin-top: 15px;
    }
  }

  @include media(xl) {
    padding-bottom: 62px;

    &__content-col {
      padding-top: 200px;
    }

    &__heading {
      font-size: 60px;
      line-height: (73/60);
    }

    &__decor {
      margin-top: 16px;
    }

    &__steps {
      margin: 16px 0 0 (-$container-padding-xl);
    }

    &__materials {
      margin-top: 60px;
      margin-right: -100px;
    }

    &__image {
      margin-left: 68px;
      margin-top: $header-height-xl;
      margin-right: -$container-padding-xl;

      img {
        width: 100%;
      }
    }

    &__about {
      display: flex;
      margin-left: 68px;
      margin-top: 34px;
    }

    &__about-content {
      display: block;
      flex: 1;
    }

    &__quote {
      margin-right: 150px;
      padding-bottom: 18px;
      font-size: 14px;
      line-height: (23/14);
    }

    &__author {
      margin-left: 40px;
      margin-top: 16px;
      margin-right: -10px;
      font-size: 40px;
      line-height: (27/40);
    }

    &__about-details {
      margin-left: 84px;
      margin-right: 60px;
    }

    &__item {
      margin-bottom: 12px;
    }

    &__about-img {
      display: block;
      margin-top: -78px;
      margin-right: 0;
      margin-bottom: -62px;
      flex-shrink: 0;
      width: 34.5%;
    }
  }
}
</style>
