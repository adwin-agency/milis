<template>
  <div class="company">
    <h1 class="company__heading">О компании</h1>
    <p class="company__decor">Кухни «Милис» - это просто!</p>
    <div class="company__row">
      <Promo class="company__image"/>
      <div class="company__content">
        <p class="company__desc">Привет! <br>Мы — основатели компании Milis, Мила и Артём. <br>Мила — конструктор корпусной мебели. Она всю жизнь посвятила дизайну мебели и знает, как должна выглядеть красивая кухня. А я — инженер-технолог и могу превратить её эскиз в качественный функциональный гарнитур. Мы уверены, что хорошая красивая кухня не должна стоить дорого, и с 2015 года создаем мебельные гарнитуры по этому принципу.</p>
        <Dropdowns class="company__items" :items="dropdowns" disabled />
      </div>
    </div>
  </div>
</template>

<script>
import Dropdowns from './base/Dropdowns'
import Promo from './Promo.vue'

export default {
  name: 'Company',
  components: {
    Dropdowns,
    Promo
  },
  data() {
    return {
      dropdowns: [
        {arrow: true, title: 'Бесплатный дизайн-проект', desc: 'Дизайнер составит проект вашей будущей кухни совершенно бесплатно, даже в том случае, если вы по какой-то причине решите отказаться от покупки.'},
        {arrow: true, title: 'Изготовление от 14 дней', desc: 'У нас собственный производственный цех, поэтому мы не зависим от посредников. Это позволяет изготавливать кухни гораздо быстрее и избегать неприятных задержек.'},
        {arrow: true, title: 'Рассрочка до 8 месяцев без первоначального взноса', desc: 'Предоставляем беспроцентную рассрочку на 8 месяцев от наших банков партнеров. Высокий шанс одобрения и быстрое принятие решения!'},
        {arrow: true, title: '3 простых шага - и кухня у Вас!', desc: 'Наш кухонный мир держится на трех китах - Заказ, Доставка, Сборка. Пройдет совсем немного времени с момента вашей заявки до момента, когда готовый гарнитур окажется у вас дома.'}
      ]
    }
  }
}
</script>

<style lang="scss">
.company {
  &__heading {
    font-size: 34px;
    line-height: (41/34);
  }

  &__decor {
    font-family: $font-decorative;
    font-size: 38px;
    line-height: (51/38);    
    color: $color-blue;
  }

  &__row {
    margin-top: 8px;
  }

  &__content {
    margin-top: 11px;
  }

  &__desc {
    font-size: 12px;
    line-height: (20/12);
  }

  &__items {
    margin-top: 23px;
  }

  &__item {
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  @include media(md) {
    &__heading {
      font-size: 44px;
      line-height: (54/44);
    }

    &__decor {
      margin-top: 25px;
      font-size: 50px;
      line-height: (68/50);
    }

    &__row {
      display: flex;
      margin-top: 14px;
    }

    &__image {
      flex-shrink: 0;
      width: 48.5%;
    }

    &__content {
      flex: 1;
      margin-left: 23px;
      margin-top: 0;
    }

    &__desc {
      font-size: 16px;
      line-height: (26/16);
    }

    &__items {
      margin-top: 32px;
    }
  }

  @include media(lg) {
    &__decor {
      margin-top: 12px;
      font-size: 40px;
      line-height: (54/40);
    }

    &__content {
      margin-top: -8px;
    }

    &__desc {
      font-size: 14px;
      line-height: (26/14);
    }

    &__items {
      margin-top: 18px;
    }
  }

  @include media(xl) {
    &__heading {
      font-size: 60px;
      line-height: (73/60);
    }

    &__decor {
      margin-top: 2px;
      font-size: 50px;
      line-height: (68/50);
    }

    &__image {
      width: 47.5%;
    }

    &__content {
      margin-top: -4px;
      margin-left: 48px;
    }

    &__desc {
      font-size: 16px;
      line-height: (26/16);
    }

    &__items {
      margin-top: 30px;
    }
  }
}
</style>
