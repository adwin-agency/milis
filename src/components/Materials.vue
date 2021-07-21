<template>
  <div
    :class="[
      'materials',
      {'materials_info': info}
    ]"
  >
    <h2 class="materials__heading">Наши материалы</h2>
    <p class="materials__text" v-if="!info">Мы поможем вам подобрать материалы и фасады для вашей будущей кухни! <b>Более 250 видов</b> корпусов, фасадов и столешниц! Наш дизайнер подберет нужные вам цвета и произведет все необходимые замеры совершенно бесплатно.</p>  
    <div class="materials__wrapper">
      <div class="materials__items">
        <div class="materials__item">
          <div class="materials__image">
            <img src="../assets/img/materials-04.jpg" alt="">
          </div>
          <div class="materials__badge">
            <span class="materials__badge-num">250+</span>
            <span class="materials__badge-text">цветов и{{'\xa0'}}фактур</span>
          </div>
          <p class="materials__title">Фасады мдф</p>
          <div class="materials__desc">Австрийское качество от Egger</div>
        </div>
        <div class="materials__item">
          <div class="materials__image">
            <img src="../assets/img/materials-02.jpg" alt="">
          </div>
          <p class="materials__title">Корпус</p>
          <div class="materials__desc">Международный стандарт{{'\xa0'}}от Kronospan</div>
        </div>
        <div class="materials__item">
          <div class="materials__image">
            <img src="../assets/img/materials-05.jpg" alt="">
          </div>
          <p class="materials__title">Столешница</p>
          <div class="materials__desc">Влагостойкие столешницы</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Materials',
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
    margin-top: 24px;
  }

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    margin-bottom: 15px;
    min-height: 162px;
    border-radius: 10px 0 0 10px;
    padding: 20px;
    padding-left: calc(30% + 36px);
    background-color: #f3f3f3;
  }

  &__image {
    position: absolute;
    left: 0;
    top: 0;
    width: 30%;
    height: 100%;
    border-radius: 10px 0 0 10px;
    overflow: hidden;

    img {
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
    left: -12px;
    bottom: -8px;
    width: 70px;
    height: 70px;
    padding: 8px;
    border-radius: 50%;
    text-align: center;
    font-weight: bold;
    font-size: 8px;
    line-height: (9/8);
    color: $color-blue;
    background-color: #f3f3f3;
    z-index: 1;

    &-num {
      font-size: 22px;
      line-height: (27/22);
    }

    &-text {
      margin-bottom: 2px;
    }
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
    font-size: 14px;
    line-height: (19/14);
    color: $color-blue;
  }

  @include media(md) {
    &_info {
      #{$b} {
        &__heading {
          font-size: 44px;
          line-height: (54/44);
        }

        &__wrapper {
          margin: 0;
          overflow: visible;
        }

        &__items {
          flex-wrap: wrap;
          overflow-x: visible;
          padding-bottom: 0;
          margin-bottom: 0;
          margin-top: 30px;
          margin-right: -40px;

          &::before,
          &::after {
            display: none;
          }
        }

        &__item {
          max-width: calc(50% - 36px);
          margin-right: 36px;

          &:last-child {
            margin-right: 36px;
          }
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

    &__wrapper {
      margin: 0 (-$container-padding-md);
      overflow: hidden;
    }

    &__items {
      display: flex;
      flex-wrap: nowrap;
      overflow-x: scroll;
      margin-top: 24px;
      padding-bottom: 20px;
      margin-bottom: -20px;

      &::before,
      &::after {
        content: "";
        flex-shrink: 0;
        width: $container-padding-md;
      }
    }

    &__item {
      margin-right: 36px;
      flex: 1 0 270px;
      padding-left: 120px;

      &:last-child {
        margin-right: 0;
      }
    }

    &__image {
      width: 100px;
    }

    &__desc {
      font-size: 14px;
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

    &__wrapper {
      margin: 0;
      overflow: visible;
    }

    &__items {
      flex-wrap: wrap;
      overflow-x: visible;
      padding-bottom: 0;
      margin-bottom: 0;
      margin-top: 30px;
      margin-right: -36px;

      &::before,
      &::after {
        display: none;
      }
    }

    &__item {
      max-width: calc(50% - 36px);

      &:last-child {
        margin-right: 36px;
      }
    }

    &__leaf {
      margin-top: -15px;
      margin-left: 5px;
      width: 18px;
      height: 18px;
    }

    &__title {
      font-size: 16px;
      line-height: (26/16);
    }

    &__desc {
      font-size: 12px;
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
      margin-top: 5px;
      font-size: 14px;
    }
  }
}
</style>
