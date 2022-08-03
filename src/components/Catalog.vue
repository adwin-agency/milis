<template>
  <div class="catalog">
    <div
      v-if="kitchens.length"
      class="row catalog__row"
    >
      <template v-for="(kitchen, index) in kitchens">
        <div
          :key="kitchen.id"
          class="col col-12 col-md-6 catalog__col"
        >
          <CatalogCard
            :kitchen="kitchen"
            :catalogPage="catalogPage"
            v-anim="index % 2 === 0 ? true : {delay: 200}"
          />
        </div>
        <div
          v-if="index % 8 === 1"
          :key="kitchen.id + 'd'"
          class="col col-12 col-md-6 catalog__col catalog__col_features"
        >
          <Dropdowns
            :items="dropdowns"
            products
            disabled
            class="catalog__features"
          />
        </div>
        <div
          v-if="index % 8 === 1"
          :key="kitchen.id + 'b'"
          class="col col-12 col-md-6 catalog__col catalog__col_gift"
        >
          <DesignForm class="catalog__form" />
        </div>
        <div
          v-if="index % 8 === 3"
          :key="kitchen.id + 'q1'"
          class="col col-12 col-md-6 catalog__col"
        >
          <Questions
            class="catalog__questions catalog__questions_l"
            :title="questions[0].title"
            :desc="questions[0].desc"
            :image="questions[0].image"
            v-anim="true"
          />
        </div>
        <div
          v-if="index % 8 === 3"
          :key="kitchen.id + 'q2'"
          class="col col-12 col-md-6 catalog__col"
        >
          <Questions
            class="catalog__questions catalog__questions_r"
            :title="questions[1].title"
            :desc="questions[1].desc"
            :image="questions[1].image"
            v-anim="{delay: 200}"
          />
        </div>
        <div
          v-if="index % 8 === 5"
          :key="kitchen.id + 'q3'"
          class="col col-12 col-md-6 catalog__col"
        >
          <Questions
            class="catalog__questions catalog__questions_l"
            :title="questions[2].title"
            :desc="questions[2].desc"
            :image="questions[2].image"
            v-anim="true"
          />
        </div>
        <div
          v-if="index % 8 === 5"
          :key="kitchen.id + 'q4'"
          class="col col-12 col-md-6 catalog__col"
        >
          <Questions
            class="catalog__questions catalog__questions_r"
            :title="questions[3].title"
            :desc="questions[3].desc"
            :image="questions[3].image"
            v-anim="{delay: 200}"
          />
        </div>
      </template>
    </div>
    <p
      v-else-if="$mobile"
      class="catalog__stock"
    >
      К сожалению, по вашему запросу ничего не найдено. Попробуйте поменять один из фильтров - скорее всего, вас ждёт успех!
    </p>
  </div>
</template>

<script>
import CatalogCard from '../components/CatalogCard'
import Questions from '../components/Questions'
import Dropdowns from './base/Dropdowns.vue'
import DesignForm from './DesignForm.vue'

export default {
  name: 'Catalog',
  components: {
    CatalogCard,
    Questions,
    Dropdowns,
    DesignForm
  },
  props: {
    kitchens: Array,
    catalogPage: Number
  },
  data() {
    return {
      dropdowns: [
        {
          arrow: true,
          title: 'Бесплатный дизайн-проект',
          desc: 'Дизайнер составит проект вашей будущей кухни совершенно бесплатно, даже в том случае, если вы по какой-то причине решите отказаться от покупки.'
        },
        {
          arrow: true,
          title: 'Изготовление от 14 дней',
          desc: 'У нас собственный производственный цех, поэтому мы не зависим от посредников. Это позволяет изготавливать кухни гораздо быстрее и избегать неприятных задержек.'
        },
        {
          arrow: true,
          title: 'Рассрочка до 8 месяцев без первоначального взноса',
          desc: 'Предоставляем беспроцентную рассрочку на 8 месяцев от наших банков партнеров. Высокий шанс одобрения и быстрое принятие решения!'
        },
        {
          arrow: true,
          title: '3 простых шага - и кухня у Вас!',
          desc: 'Наш кухонный мир держится на трех китах - Заказ, Доставка, Сборка. Пройдет совсем немного времени с момента вашей заявки до момента, когда готовый гарнитур окажется у вас дома.'
        }
      ],
      questions: [
        {
          title: 'Насколько хорошее качество кухни?',
          desc: 'Все фасады сделаны из <span>влагостойкого</span> МДФ Немецкой фирмы EGGER <br>Корпуса выполнены из <span>надежного</span> ЛДСП Австрийской фирмы Kronospan'
        },
        {
          title: 'Как заказать кухню?',
          desc: 'Оставьте заявку или позвоните нам: наши менеджеры свяжутся с вами для <span>бесплатного</span> расчета кухни <br>Вы сможете задать все интересующие Вас вопросы, а мы с удовольствием расскажем обо всем :)'
        },
        {
          title: 'Что включено в покупку кухни?',
          desc: 'При покупке кухни вы получите: <br>- Выезд дизайнера и замер бесплатно <br>- Индивидуальный дизайн проект бесплатно <br>- Сборка и доставка <br>- Высококачественная кухня от фабрики Milis'
        },
        {
          title: 'Как происходит оплата?',
          desc: 'При заключении договора предоплата 30% от стоимости кухни. Оставшуюся часть вы оплачиваете после изготовления кухни. Доступна рассрочка 0% без первого взноса.'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.catalog {
  position: relative;

  &__logo {
    display: none;
    position: absolute;
    left: 5.5%;
    top: 30%;
  }

  &__decor {
    display: none;
    position: absolute;
    right: 25.5%;
    bottom: 6%;
    font-family: $font-decorative;
    font-size: 100px;
    line-height: 0.68;
    color: $color-gray-6;
  }

  &__stock {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    max-width: 500px;
    height: 100%;
    padding: 70px 10px;
    text-align: center;
    font-weight: bold;
    font-size: 16px;
    line-height: 1.5;
    color: $color-blue;
  }

  &__col {
    margin-bottom: 28px;
  }

  &__features {
    margin-top: 26px;
  }

  &__gift {
    margin: 26px (-$container-padding) 15px;
  }

  &__questions {
    margin: 15px (-$container-padding);
  }

  &__list {
    position: relative;
  }

  &__list-item {
    position: relative;
    margin-bottom: 28px;
  }

  &__list-card {
    height: 100%;
  }

  @include media(md) {
    &__col {
      margin-bottom: 50px;

      &_features,
      &_gift {
        align-self: center;
      }
    }

    &__features {
      margin-top: 0;
    }

    &__gift {
      margin: 0;
    }

    &__questions {
      margin: 0;
    }

    &__list {
      display: flex;
      flex-wrap: wrap;
      margin-left: -10px;
      margin-right: -10px;
    }

    &__list-item {
      width: 50%;
      padding: 0 10px;
      margin-bottom: 38px;
    }
  }

  @include media(lg) {
    &__row {
      margin-left: -20px;
      margin-right: -20px;
    }

    &__col {
      margin-bottom: 68px;
      padding-left: 20px;
      padding-right: 20px;
    }

    &__r-card {
      margin-left: 38px;
    }

    &__gift {
      margin-right: -$container-padding-md;
    }

    &__questions {
      &_l {
        margin-left: -$container-padding-md;
      }

      &_r {
        margin-right: -$container-padding-md;
      }
    }

    &__list {
      margin-top: 22px;
      margin-left: -14px;
      margin-right: -14px;
    }

    &__list-item {
      margin-bottom: 68px;
      width: 33.333%;
      padding: 0 14px;
    }
  }

  @include media(xl) {
    &__row {
      margin-left: -35px;
      margin-right: -35px;
    }

    &__col {
      margin-bottom: 108px;
      padding-left: 35px;
      padding-right: 35px;
    }

    &__r-card {
      margin-left: 65px;
    }

    &__gift {
      margin-right: -$container-padding-xl;
    }

    &__questions {
      &_l {
        margin-left: -$container-padding-xl;
      }

      &_r {
        margin-right: -$container-padding-xl;
      }
    }

    &__list {
      margin-top: 12px;
      margin-left: -25px;
      margin-right: -25px;
    }

    &__list-item {
      margin-bottom: 108px;
      width: 25%;
      padding: 0 25px;
    }

    &__logo {
      display: block;
    }

    &__decor {
      display: block;
    }

    &__form {
      margin-right: -$container-padding-xl;
    }
  }
}
</style>
