<template>
  <div class="production">
    <div class="production__header">
      <h2 class="production__heading">Контроль качества</h2>
      <p class="production__decor" v-if="$windowWidth >= $breakpoints.md">Все просто! <br>Кухня за 3 шага</p>    
    </div>    
    <p class="production__text">Добротная кухня начинается с дотошного контроля качества. <br>Мы тестируем все материалы и комплектующие, которые получаем от поставщиков. Проверяем всё: экологичность, ударопрочность, качество склейки и надежность фурнитуры. <br>Контролируем распил и сборку модулей в ручном режиме. <br>Перед отправкой упаковываем каждую деталь, как родное дитя. <br>Полный контроль работы сводит к минимуму вероятность брака на всех этапах производства.</p>
    <p class="production__decor" v-if="$windowWidth < $breakpoints.md">Все просто! <br>Кухня за 3 шага</p>    
  </div>
</template>

<script>
export default {
  name: 'Production'
}
</script>

<style lang="scss">
.production {
  &__heading {
    font-size: 34px;
    line-height: (39/34);
  }

  &__text {
    margin-top: 20px;
    font-size: 14px;
    line-height: (28/14);
  }

  &__decor {
    margin-top: 25px;
    font-family: $font-decorative;
    font-size: 40px;
    line-height: (44/40);
    color: $color-gray-middle;
  }

  @include media(md) {
    &__header {
      display: flex;
      justify-content: space-between;
    }

    &__heading {
      margin-right: 20px;
      font-size: 44px;
      line-height: (51/44);
    }

    &__decor {
      margin-top: 14px;
      flex-shrink: 0;
    }

    &__text {
      margin-top: 24px;
      padding-right: 10px;
      font-size: 16px;
      line-height: (32/16);
    }
  }

  @include media(lg) {
    &__decor {
      margin-top: 36px;
      margin-right: 8px;
      font-size: 30px;
      line-height: (33/30);
    }

    &__text {
      margin-top: 22px;
      padding-right: 30px;
      font-size: 12px;
      line-height: (24/12);
    }
  }

  @include media(xl) {
    &__heading {
      font-size: 60px;
      line-height: (69/60);
    }

    &__decor {
      margin-top: 58px;
      margin-right: 62px;
      font-size: 40px;
      line-height: (44/40);
    }

    &__text {
      padding-right: 150px;
      font-size: 16px;
      line-height: (32/16);
    }
  }
}
</style>
