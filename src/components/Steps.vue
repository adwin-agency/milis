<template>
  <div :class="['steps', {'steps_transparent': delivery}, {'steps_service': service}]">

    <div v-if="delivery" class="steps__items">
      <div class="steps__item">
        <p class="steps__title">
          <span class="steps__num">1</span>
          Изготовление <br>кухни
        </p>
        <p class="steps__desc">Стандартные сроки изготовления кухонь на нашем производстве - от{{'\xa0'}}14{{'\xa0'}}дней <br><br><span>*Срочное изготовление</span></p>
      </div>
      <div class="steps__item">
        <p class="steps__title">
          <span class="steps__num">2</span>
          Оповещение <br>клиента
        </p>
        <p class="steps__desc">С вами свяжется менеджер, чтобы договориться об удобном для вас времени доставки. До момента доставки кухня будет храниться у нас на складе.</p>
      </div>
      <div class="steps__item">
        <p class="steps__title">
          <span class="steps__num">3</span>
          Доставка <br>до двери
        </p>
        <p class="steps__desc">Мы доставим вашу кухню до двери с подъемом на этаж в удобное для вас время.</p>
      </div>
    </div>

    <div v-else-if="assembly" class="steps__items">
      <div class="steps__item">
        <p class="steps__title">
          <span class="steps__num">1</span>
          Распаковываем <br>и собираем
        </p>
        <p class="steps__desc">Сперва сборщик собирает все корпуса, устанавливает двери и доводчики</p>
      </div>
      <div class="steps__item">
        <p class="steps__title">
          <span class="steps__num">2</span>
          Вырезаем <br>и монтируем
        </p>
        <p class="steps__desc">Далее производятся все необходимые дополнительные установки, такие как вырез столешницы под мойку, установка бытовой техники и прочее.</p>
      </div>
      <div class="steps__item">
        <p class="steps__title">
          <span class="steps__num">3</span>
          Убираем <br>мусор
        </p>
        <p class="steps__desc">Кухня готова! После того, как вы проверите качество выполненной работы и останетесь им довольны, мы уберем и вывезем за собой весь крупногабаритный строительный мусор.</p>
      </div>
    </div>

    <div v-else class="steps__items">
      <div class="steps__item">
        <p class="steps__title">
          <span class="steps__num">1</span>
          Замер <br>и 3D проект
        </p>
        <p class="steps__desc">Дизайнер-проектировщик измерит помещение и изготовит бесплатный 3D проект</p>
      </div>
      <div class="steps__item">
        <p class="steps__title">
          <span class="steps__num">2</span>
          Изготовление <br>и доставка
        </p>
        <p class="steps__desc">Ваша кухня будет готова в течение 30 дней. После этого мы свяжемся с вами и договоримся о доставке в удобное для вас время</p>
      </div>
      <div class="steps__item">
        <p class="steps__title">
          <span class="steps__num">3</span>
          Сборка <br>и установка
        </p>
        <p class="steps__desc">Сборщик аккуратно соберет вашу кухню и не оставит после себя строительный мусор</p>
      </div>
    </div>
    
    <div class="steps__leaf" :class="{'steps__leaf_bottom': leaf === 'bottom'}" v-if="leaf">
      <Icon name="leaf"/>
    </div>
  </div>
</template>

<script>
import Icon from './base/Icon'

export default {
  name: 'Steps',
  components: {
    Icon
  },
  props: {
    leaf: String,
    delivery: Boolean,
    assembly: Boolean,
    service: Boolean,
    info: Boolean
  }
}
</script>

<style lang="scss">
.steps {
  $b: &;

  position: relative;
  padding: 18px $container-padding 24px;
  background-color: #F9F9F9;

  &_transparent {
    border-top: 1px solid $color-gray;
    padding: 38px 0 0;
    background-color: transparent;
  }

  &__item {
    margin-bottom: 34px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__title {
    position: relative;
    padding-left: 68px;
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 14px;
    line-height: (16/14);
    color: #303864;
  }

  &__num {
    position: absolute;
    left: 0;
    top: 0;
    font-family: $font-primary;
    margin-top: -9px;
    margin-right: 27px;
    font-size: 70px;
    line-height: (82/70);
  }

  &__desc {
    margin-top: 10px;
    padding-left: 68px;
    font-size: 12px;
    line-height: (18/12);

    span {
      text-decoration: underline;
      font-family: $font-secondary;
      color: $color-gray;
    }
  }

  &__leaf {
    position: absolute;
    top: -34px;
    right: 10px;
    width: 63px;
    height: 65px;
    fill: $color-green;

    &_bottom {
      top: auto;
      right: -14px;
      bottom: -28px;
    }
  }

  @include media(md) {
    padding: 32px $container-padding-md;

    &_transparent {
      padding: 32px 0 0;
    }

    &__items {
      display: flex;
    }

    &__item {
      flex: 1;
      margin-right: 45px;
      margin-bottom: 0;

      &:last-child {
        margin-right: 0;
      }
    }

    &__title {
      display: flex;
      padding-left: 0;
      font-size: 18px;
      line-height: (20/18);
    }

    &__num {
      position: static;
      margin-top: -15px;
      margin-right: 5px;
      margin-bottom: -5px;
      font-size: 60px;
      line-height: (70/60);
    }

    &__desc {
      margin-top: 5px;
      padding-left: 0;
      font-size: 14px;
      line-height: (21/14);
    }
  }

  @include media(lg) {
    &_service {
      padding-left: 68px;
    }

    &__title {
      font-size: 16px;
      line-height: (18/16);
    }

    &__desc {
      font-size: 12px;
      line-height: (18/12);
    }

    &__leaf {
      top: -26px;
      right: -10px;

      &_bottom {
        top: auto;
        right: -12px;
        bottom: -34px;
      }
    }
  }

  @include media(xl) {
    padding-left: $container-padding-xl;

    &_transparent {
      padding-left: 0;
    }

    &__title {
      font-size: 18px;
      line-height: (20/18);
    }

    &__desc {
      font-size: 14px;
      line-height: (21/14);
    }

    &__leaf {
      &_bottom {
        right: -26px;
        bottom: -10px;
      }
    }
  }
}
</style>
