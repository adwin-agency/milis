<template>
  <div :class="['materials', {'materials_info': info}]">
    <h2 class="materials__heading">Наши материалы</h2>
    <p class="materials__text" v-if="!info">Мы поможем Вам подобрать материалы и и фасады для Вашей идеальной кухни! <b>Более 250 видов</b> корпусов, фасадов и столешниц. А наш дизайнер подберет нужные Вам цвета и произведет все необходимые замеры бесплатно</p>
    <div class="materials__items">
      <div class="materials__item materials__item_big">
        <div class="materials__image">
          <img src="../assets/img/materials-01.jpg" alt="">
        </div>
        <div class="materials__badge">
          <span class="materials__badge-bg">
            <Icon name="leaf"/>
          </span>
          <span class="materials__badge-num">250+</span>
          <span class="materials__badge-text">цветов и{{'\xa0'}}фактур</span>
        </div>
        <div class="materials__leaf">
          <Icon name="leaf"/>
        </div>
        <p class="materials__title">Фасады мдф</p>
        <div class="materials__desc">Пленка ПВХ, пластик</div>
      </div>
      <div class="materials__item">
        <div class="materials__image">
          <img src="../assets/img/materials-02.jpg" alt="">
        </div>
        <div class="materials__leaf">
          <Icon name="leaf"/>
        </div>
        <p class="materials__title">Корпус</p>
        <div class="materials__desc">ЛДСП класса E0.5</div>
      </div>
      <div class="materials__item">
        <div class="materials__image">
          <img src="../assets/img/materials-03.jpg" alt="">
        </div>
        <div class="materials__leaf">
          <Icon name="leaf"/>
        </div>
        <p class="materials__title">Столешница</p>
        <div class="materials__desc">Из ЛДСП толщиной до 60 мм</div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from './base/Icon'

export default {
  name: 'Materials',
  components: {
    Icon
  },
  props: {
    info: Boolean
  }
}
</script>

<style lang="scss">
.materials {
  $b: &;
  $gap: 26px;

  &_info {
    #{$b} {
      &__heading {
        font-size: 34px;
        line-height: (41/34);
      }
    }
  }

  &__heading {
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 34px;
    line-height: (41/34);
    color: $color-blue;
  }

  &__text {
    margin-top: 12px;
    font-size: 14px;
    line-height: (29/14);
    color: $color-black-gray;
  }

  &__items {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 24px -10px -22px;
  }

  &__item {
    position: relative;
    width: 50%;
    padding: 0 10px;
    margin-bottom: 22px;

    &_big {
      width: 100%;

      #{$b}__image {
        padding-top: 48%;
      }
    }
  }

  &__image {
    position: relative;
    padding-top: 126%;
    overflow: hidden;

    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__badge {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -22px;
    right: -2px;
    width: 80px;
    height: 80px;
    padding: 8px;
    text-align: center;
    font-weight: bold;
    font-size: 8px;
    line-height: (9/8);
    color: $color-blue;
    z-index: 1;
  }

  &__badge-bg {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    transform: rotate(8deg);
    fill: $color-gray-6;
  }

  &__badge-text {
    position: relative;
    margin-right: 12px;
    margin-bottom: 4px;
  }

  &__badge-num {
    position: relative;
    margin-left: 10px;
    font-size: 22px;
    line-height: (27/22);
  }

  &__leaf {
    position: relative;
    margin-top: -12px;
    width: 21px;
    height: 22px;
    fill: $color-green;
  }

  &__title {
    margin-top: 5px;
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 18px;
    line-height: (29/18);
    color: $color-blue;
  }

  &__desc {
    margin-top: 6px;
    font-size: 10px;
    line-height: (14/10);
    color: $color-gray-middle;
  }

  @include media(md) {
    &_info {
      #{$b} {
        &__heading {
          font-size: 44px;
          line-height: (54/44);
        }
      }
    }

    &__heading {
      font-size: 44px;
      line-height: (54/44);
    }

    &__text {
      font-size: 16px;
      line-height: (28/16);
    }

    &__items {
      margin-top: 24px;
    }

    &__item {
      width: 30%;

      &_big {
        width: 40%;

        #{$b}__image {
          padding-top: calc((100% + 20px) / 1.333);
        }
      }
    }

    &__image {
      padding-top: calc(100% + 20px);
    }
  }

  @include media(lg) {
    &_info {
      #{$b} {
        &__heading {
          font-size: 40px;
          line-height: (49/40);
        }
      }
    }

    &__text {
      margin-top: 30px;
      padding-right: 60px;
    }

    &__items {
      margin-top: 30px;
    }

    &__item {
      width: 25%;

      &_big {
        width: 50%;

        #{$b}__image {
          padding-top: calc((100% + 20px) / 2);
        }
      }
    }

    &__badge {
      top: -26px;
      right: 0;
    }

    &__leaf {
      margin-top: -4px;
      width: 18px;
      height: 18px;
    }

    &__title {
      font-size: 16px;
      line-height: (26/16);
    }

    &__desc {
      margin-top: -2px;
    }
  }

  @include media(xl) {
    &__heading {
      font-size: 60px;
      line-height: (73/60);
    }

    &__text {
      margin-top: 18px;
    }

    &__items {
      margin-top: 24px;
    }

    &__leaf {
      width: 22px;
      height: 22px;
    }

    &__title {
      font-size: 18px;
      line-height: (29/18);
    }

    &__desc {
      margin-top: 8px;
    }
  }
}
</style>
