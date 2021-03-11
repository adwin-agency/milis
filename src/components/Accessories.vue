<template>
  <div class="accessories" :class="{'accessories_short': short}">

    <div v-if="short">
      <h2 class="accessories__heading">Надежная фурнитура</h2>
      <div class="accessories__about">
        <p class="accessories__desc"><b>Все наши кухни с доводчиками.<br> </b>Мы сотрудничаем с немецкими и отечественными производителями фурнитуры, как эконом, так и премиум класса. Объединяет их всех высокое качество, долговечность и точность сроков поставки.</p>
        <div class="accessories__brands">
          <div class="accessories__brand">
            <img src="../assets/img/brand-01.png" alt="">
          </div>
          <div class="accessories__brand">
            <img src="../assets/img/brand-02.svg" alt="">
          </div>
          <div class="accessories__brand">
            <img src="../assets/img/brand-03.svg" alt="">
          </div>
          <div v-if="short" class="accessories__brand">
            <img src="../assets/img/brand-04.svg" alt="">
          </div>
          <div v-if="short" class="accessories__brand">
            <img src="../assets/img/brand-05.svg" alt="">
          </div>
        </div>
      </div>
    </div>

    <div class="row" v-if="!short">
      <div class="col col-12 col-xl-10">
        <h2 class="accessories__heading">Надежная фурнитура</h2>
        <div class="accessories__about">
          <p class="accessories__desc"><b>Все наши кухни с доводчиками.<br> </b>Мы сотрудничаем с немецкими и отечественными производителями фурнитуры, как эконом, так и премиум класса. Объединяет их всех высокое качество, долговечность и точность сроков поставки.</p>
          <div class="accessories__brands">
            <div class="accessories__brand">
              <img src="../assets/img/brand-01.png" alt="">
            </div>
            <div class="accessories__brand">
              <img src="../assets/img/brand-02.svg" alt="">
            </div>
            <div class="accessories__brand">
              <img src="../assets/img/brand-03.svg" alt="">
            </div>
          </div>
        </div>
        <div class="accessories__content">
          <div class="row">
            <div class="col col-12 col-lg-9 col-xl-12">
              <p class="accessories__decor">3 простых шага до Вашей кухни!</p>
              <div class="accessories__row">
                <Steps leaf class="accessories__steps"/>
                <div v-if="$mobile" class="accessories__image">
                  <picture>
                    <source srcset="../assets/img/accessories-md.jpg" :media="'(min-width: ' + $breakpoints.md + 'px)'">
                    <source srcset="../assets/img/accessories.jpg">
                    <img src="../assets/img/accessories-md.jpg" alt="">
                  </picture>
                </div>
                <div class="accessories__items">
                  <Dropdown
                    class="accessories__item"
                    lg
                    title="Почему наши кухни дешевле, чем у конкурентов?"
                    desc="Собственное производство позволяет снизить себестоимость кухни без потери в качестве. У нас нет салонов в привычном понимании - только онлайн. Это позволяет сэкономить на аренде магазинов и прочих затратных атрибутах оффлайн магазинов."
                  />
                  <Dropdown
                    class="accessories__item"
                    lg
                    title="Как происходит оплата?"
                    desc="После бесплатного выезда замерщика и составления дизайн-проекта, вам будет предложено заключить договор. Если вас всё устроит, то сперва необходимо будет внести предоплату в размере 30% от общей стоимости. Оставшуюся часть вы оплачиваете уже после того, как кухня будет изготовлена. Также, предусмотрена рассрочка."
                  />
                  <Dropdown
                    class="accessories__item"
                    lg
                    title="Как заказать кухню?"
                    desc="Вам никуда не нужно ехать. Мы сами приедем к вам. С собой наш специалист возьмет образцы материалов, чтобы вы получили полное представление о том, какой будет ваша будущая кухня. При этом, выезд дизайнера будет бесплатным даже в том случае, если вы решите повременить с покупкой."
                  />
                  <Dropdown
                    class="accessories__item"
                    lg
                    title="Что включено в покупку кухни?"
                    desc="Мы знаем, что такое делать ремонт, выбирать мебель. Как сложно обойти массу салонов и поговорить с кучей консультантов. Поэтому, мы выбрали формат онлайн подборки, без салонов, зато быстрее и дешевле"
                  />
                  <Dropdown
                    class="accessories__item"
                    lg
                    title="Насколько хорошее качество кухни?"
                    desc="Фасады изготавливаются из МДФ производства фирмы EGGER, которая хорошо зарекомендовала себя на рынке за счет высокой прочности материалов. Корпуса выполнены из ЛДСП фирмы Kronospan - ещё одного флагмана кухонной индустрии."
                  />
                </div>
              </div>              
            </div>
            <div class="col col-3" v-if="$windowWidth >= $breakpoints.lg && $windowWidth < $breakpoints.xl">
              <div class="accessories__image anim-img js-anim" v-anim="true">
                <img src="../assets/img/accessories-lg.jpg" alt="">
              </div>
            </div>
          </div>          
        </div>
      </div>
      <div class="col col-2" v-if="$windowWidth >= $breakpoints.xl">
        <div v-if="!short" class="accessories__image anim-img js-anim" v-anim="true">
          <img src="../assets/img/accessories-lg.jpg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from './base/Dropdown'
import Steps from './Steps'

export default {
  name: 'Accessories',
  components: {
    Dropdown,
    Steps
  },
  props: {
    short: Boolean
  }
}
</script>

<style lang="scss">
.accessories {
  $b: &;

  &__heading {
    font-size: 34px;
    line-height: (41/34);
  }

  &__about {
    margin-top: 20px;
  }

  &__desc {
    font-size: 14px;
    line-height: (29/14);

    b {
      color: $color-blue;
    }
  }

  &__brands {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-right: -15px;
    margin-bottom: -12px;
  }

  &__brand {
    margin-right: 18px;
    margin-bottom: 12px;
  }

  &__content {
    margin-top: 68px;
  }

  &__decor {
    padding-right: 70px;
    font-family: $font-decorative;
    font-size: 40px;
    line-height: (41/40);
    color: $color-blue;
  }

  &__row {
    margin-top: 10px;
  }

  &__steps {
    margin: 0 (-$container-padding);
  }

  &__image {
    margin: 0 (-$container-padding);
  }

  &__items {
    margin-top: 18px;
  }

  &__item {
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__question {
    font-weight: bold;
    font-size: 18px;
    line-height: (22/18);
    color: $color-blue;
  }

  &__answer {
    margin-top: 12px;
    max-width: 480px;
    font-family: $font-secondary;
    font-size: 12px;
    line-height: (22/12);
    color: $color-gray-middle;
  }

  @include media(md) {
    &__heading {
      font-size: 44px;
      line-height: (54/44);
    }

    &__desc {
      font-size: 16px;
      line-height: (34/16);

      b {
        font-size: 18px;
        line-height: (38/18);
      }
    }

    &__brands {
      margin-top: 22px;
      margin-right: -48px;
    }

    &__brand {
      margin-right: 48px;
    }

    &__content {
      margin-top: 44px;
    }

    &__decor {
      position: relative;
      font-size: 60px;
      line-height: (81/60);
      z-index: 1;
    }

    &__row {
      margin-top: -12px;
    }

    &__steps {
      margin: 0 (-$container-padding-md);
    }

    &__image {
      margin: 0 (-$container-padding-md);
    }

    &__items {
      margin-top: 22px;
    }

    &__item {
      margin-bottom: 18px;
    }
  }

  @include media(lg) {
    &_short {
      #{$b} {
        &__about {
          display: block;
        }

        &__desc {
          width: 100%;
        }

        &__brands {
          margin-top: 36px;
          margin-left: 0;
          margin-right: -45px;
        }

        &__brand {
          margin-right: 45px;
        }
      }
    }

    &__about {
      display: flex;
      align-items: center;
    }

    &__desc {
      width: 55%;
    }

    &__brands {
      margin-top: -20px;
      margin-left: auto;
      margin-right: -80px;
    }

    &__brand {
      margin-right: 80px;
    }

    &__content {
      margin-top: 52px;
    }

    &__steps {
      margin-right: 20px;
    }

    &__image {
      margin-left: 0;
      margin-top: 15px;
    }

    &__items {
      margin-top: 44px;
      max-width: 550px;
    }
  }

  @include media(xl) {
    &_short {
      #{$b} {
        &__about {
          margin-top: 30px;
          width: 100%;
        }
      }
    }

    &__heading {
      font-size: 60px;
      line-height: (73/60);
    }

    &__about {
      align-items: flex-start;
      margin-top: 12px;
      width: 80%;
    }

    &__desc {
      width: 50%;
    }

    &__brands {
      margin-top: 26px;
      margin-right: -120px;
    }

    &__brand {
      margin-right: 120px;
    }

    &__row {
      display: flex;
      align-items: flex-start;
      margin-left: -$container-padding-xl;
    }

    &__steps {
      margin: 0;
      width: 56%;
      flex-shrink: 0;
    }

    &__items {
      position: relative;
      margin-top: 0;
      margin-left: 48px;
      z-index: 1;
    }

    &__image {
      margin-top: 24px;
      margin-right: -$container-padding-xl;
    }
  }
}
</style>
