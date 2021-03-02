<template>
  <div class="company">
    <h1 class="company__heading">О компании</h1>
    <p class="company__decor">Кухни «Милис» - это просто!</p>
    <div class="company__row">
      <div class="company__image">
        <picture>
          <source srcset="../assets/img/company-md.jpg" :media="'(min-width: ' + $breakpoints.md + 'px)'">
          <source srcset="../assets/img/company.jpg">                
          <img src="../assets/img/company-md.jpg" alt="">
        </picture>
      </div>
      <div class="company__content">
        <p class="company__desc">Компания “Милис” занимается производством кухонь с 2015 года. <br><br>Мы решили объединить то, что прекрасно умеем оба! Милла всю жизнь посвятила дизайну мебели и в частности кухонь. А я прекрасно знаю, как из эскиза на бумаге воплотить это в жизнь.</p>
        <Dropdowns class="company__items" :items="dropdowns" />
      </div>
    </div>
  </div>
</template>

<script>
import Dropdowns from './base/Dropdowns'

export default {
  name: 'Company',
  components: {
    Dropdowns
  },
  data() {
    return {
      dropdowns: [
        {arrow: true, title: 'Бесплатный дизайн-проект', desc: '“Создать кухню Вашей мечты просто. Мы создадим вам кухню на заказ именно ту, о которой вы мечтали! Ведь это так просто”'},
        {arrow: true, title: 'Изготовление от 14 дней', desc: '“Создать кухню Вашей мечты просто. Мы создадим вам кухню на заказ именно ту, о которой вы мечтали! Ведь это так просто”'},
        {arrow: true, title: 'Рассрочка до 6 месяцев', desc: '“Создать кухню Вашей мечты просто. Мы создадим вам кухню на заказ именно ту, о которой вы мечтали! Ведь это так просто”'}
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
    margin-top: 13px;
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
