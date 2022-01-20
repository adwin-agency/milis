<template>
  <div :class="['review-card', {'review-card_in': inner}]">
    <div class="review-card__side">
      <p class="review-card__date">{{reviewData.date}}</p>
      <div class="review-card__image">
        <img :src="$basepath + reviewData.pictures[0].preview.path" alt="">
      </div>
    </div>
    <div class="review-card__content">
      <p class="review-card__title">
        {{reviewData.name}}
        <span class="review-card__rating">
          <span class="review-card__rating-icon">
            <Icon :name="`smile-${reviewData.rating}`"/>
          </span>
          {{reviewData.rating}}
        </span>
      </p>
      <p class="review-card__desc">{{reviewData.description_short}}</p>
      <button
        v-if="!inner"
        type="button"
        class="review-card__link"
        @click="$emit('detailsClick')"
      >
        Читать полностью
      </button>
    </div>
  </div>
</template>

<script>
import Icon from './base/Icon'

export default {
  name: 'ReviewCard',
  components: {
    Icon
  },
  props: {
    inner: Boolean,
    reviewData: Object
  }
}
</script>

<style lang="scss">
.review-card {
  $b: &;

  &_in {
    #{$b} {
      &__image {
        width: 100%;
        padding-top: 37%;
      }

      &__content {
        margin-top: 16px;
      }

      &__rating {
        display: block;
        margin-bottom: -20px;
      }

      &__rating-icon {
        margin-right: 0;
        margin-bottom: 3px;
      }

      &__link {
        font-size: 16px;
        line-height: (22/14);
      }
    }
  }

  &__date {
    font-size: 10px;
    line-height: (14/10);
    color: $color-gray;
  }

  &__image {
    position: relative;
    margin-top: 4px;
    width: 53%;
    padding-top: 32%;

    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__content {
    margin-top: 28px;
  }

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 14px;
    line-height: (20/14);
    color: $color-blue;
  } 

  &__rating {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    margin-left: 20px;
    text-align: center;
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 12px;
    line-height: (17/12);
  }

  &__rating-icon {
    display: block;
    margin-right: 14px;
    width: 20px;
    height: 20px;
  }

  &__desc {
    margin-top: 7px;
    padding-right: 30px;
    font-size: 12px;
    line-height: (17/12);
  }

  &__link {
    display: inline-block;
    margin-top: 18px;
    font-size: 12px;
    line-height: (17/12);
    text-decoration: underline;
    color: $color-blue;
  }

  @include media(lg) {
    &_in {
      display: flex;

      #{$b} {
        &__side {
          flex-shrink: 0;
          width: 37%;
        }

        &__image {
          padding-top: 60.6%;
        }

        &__content {
          flex: 1;
          margin-top: 0;
          margin-left: 34px;
        }

        &__rating {
          display: flex;
          align-items: center;
          margin-bottom: 0;
        }

        &__rating-icon {
          margin-right: 12px;
          margin-bottom: 0;
        }

        &__desc {
          padding-right: 0;
        }

        &__link {
          font-size: 12px;
          line-height: (17/12);
        }
      }
    }
  }

  @include media(xl) {
    &_in {
      #{$b} {
        &__side {
          width: 33%;
        }

        &__content {
          margin-left: 30px;
        }
      }
    }

    display: flex;

    &__side {
      width: 33%;
    }

    &__image {
      width: 100%;
      padding-top: 61%;
    }

    &__content {
      flex: 1;
      margin-top: 0;
      margin-left: 30px;
    }
  }
}
</style>
