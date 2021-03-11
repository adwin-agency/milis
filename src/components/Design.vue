<template>
  <div class="design">
    <h2 class="design__heading">Выезд дизайнера к{{'\xa0'}}Вам домой</h2>
    <p class="design__text">Вы можете пригласить дизайнера. Эта услуга абсолютно бесплатна.  Кстати, это тоже очень просто.</p>
    <div class="design__row">
      <div class="design__items">
        <p class="design__item">
          <span class="design__icon">
            <Icon name="leaf" />
          </span>
          Мы приедем к Вам, произведем все необходимые замеры
        </p>
        <p class="design__item">
          <span class="design__icon">
            <Icon name="leaf" />
          </span>
          Вместе с Вами выберем стиль будущей кухни
        </p>
        <p class="design__item">
          <span class="design__icon">
            <Icon name="leaf" />
          </span>
          Исходя из Ваших желаний - создадим 3D проект
        </p>
      </div>
      <Button class="design__btn" modal="call">Пригласить дизайнера</Button>
    </div>
  </div>
</template>

<script>
import Icon from './base/Icon'
import Button from './base/Button'

export default {
  name: 'Design',
  components: {
    Icon,
    Button
  }
}
</script>

<style lang="scss">
.design {
  &__heading {
    font-size: 34px;
    line-height: (41/34);
  }

  &__text {
    margin-top: 11px;
    font-size: 14px;
    line-height: (22/14);
  }

  &__row {
    margin-top: 20px;
  }

  &__item {
    display: flex;
    margin-bottom: 32px;
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 16px;
    line-height: (25/16);
    color: $color-blue;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__icon {
    flex-shrink: 0;
    width: 28px;
    height: 29px;
    margin-top: 5px;
    margin-right: 17px;
    fill: $color-green;
  }

  &__btn {
    margin-top: 34px;
    width: 100%;
  }

  @include media(md) {
    &__heading {
      max-width: 580px;
      font-size: 44px;
      line-height: (54/44);
    }

    &__text {
      margin-top: 30px;
      max-width: 550px;
      font-size: 16px;
      line-height: (26/16);
    }

    &__row {
      margin-top: 40px;
    }

    &__item {
      margin-bottom: 36px;
      font-size: 18px;
      line-height: (28/18);
    }

    &__icon {
      margin-top: 0;
    }

    &__btn {
      margin-top: 62px;
      width: auto;
      min-width: 436px;
    }
  }

  @include media(lg) {
    &__heading {
      max-width: none;
    }

    &__text {
      margin-top: 24px;
      max-width: none;
    }

    &__row {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 58px;
    }

    &__items {
      margin-right: 20px;
    }

    &__icon {
      margin-top: 5px;
    }

    &__btn {
      margin-top: 0;
      flex-shrink: 0;
    }
  }

  @include media(xl) {
    &__heading {
      font-size: 60px;
      line-height: (73/60);
    }

    &__row {
      align-items: flex-start;
    }

    &__items {
      display: flex;
    }

    &__item {
      max-width: 370px;
      margin-right: 48px;
      margin-bottom: 0;

      &:last-child {
        margin-right: 0;
      }
    }

    &__icon {
      margin-right: 12px;
    }
  }
}
</style>
