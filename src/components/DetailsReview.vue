<template>
  <div class="details-review">
    <div class="row">
      <div
        class="col col-12"
        :class="{'col-lg-5': review}"
      >
        <div
          class="details-review__brands"
          :class="{'details-review__brands_long': !review}"
        >
          <img
            src="/assets/img/brand-blum.png"
            alt="Blum"
            class="details-review__brand"
            width="76"
          >
          <img
            src="/assets/img/brand-hettich.svg"
            alt="Hettich"
            class="details-review__brand"
          >
          <img
            src="/assets/img/brand-boyard.svg"
            alt="Boyard"
            class="details-review__brand"
          >
          <img
            src="/assets/img/brand-candy.svg"
            alt="Candy"
            class="details-review__brand"
          >
          <img
            src="/assets/img/brand-egger.svg"
            alt="Egger"
            class="details-review__brand"
          >
          <img
            src="/assets/img/brand-lex.svg"
            alt="Lex"
            class="details-review__brand"
          >
          <img
            src="/assets/img/brand-kronospan.svg"
            alt="Kronospan"
            class="details-review__brand"
          >
          <img
            src="/assets/img/brand-maunfeld.svg"
            alt="Maunfeld"
            class="details-review__brand"
          >
        </div>
      </div>
      <div
        v-if="review"
        class="col col-12 col-lg-7 "
      >
        <div class="details-review__main">
          <h2 class="details-review__heading">Отзыв владельца</h2>
          <div class="details-review__card">
            <div
              class="details-review__box"
              @click="showModal"
            >
              <img
                :src="$basepath + review.pictures[0].preview.path"
                alt=""
                class="details-review__img"
              >
              <span class="details-review__count">
                <Icon
                  class="details-review__count-icon"
                  name="camera"
                />
                {{ review.pictures.length }}
              </span>
            </div>
            <div class="details-review__content">
              <p class="details-review__text">{{ review.description }}</p>
              <div class="details-review__footer">
                <p class="details-review__author">{{ review.name }}</p>
                <div class="details-review__rating">
                  <Icon
                    v-for="n in +review.rating"
                    :key="n"
                    class="details-review__rating-icon"
                    name="star"
                  />
                </div>
                <p class="details-review__date">{{ review.date }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from './base/Icon.vue'

export default {
  name: 'DetailsReview',
  components: {
    Icon
  },
  props: {
    review: Object
  },
  created() {
    this.$store.commit('setReviews', { reviews: [this.review] })
  },
  methods: {
    showModal() {
      this.$store.commit('setInitialReview', this.review.id)
      this.$store.commit('setModal', 'review')
    }
  }
}
</script>

<style lang="scss">
.details-review {
  $b: &;

  &__brands {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-right: -18px;
    margin-bottom: -20px;
  }

  &__brand {
    margin-right: 18px;
    margin-bottom: 20px;

    &:nth-child(1) {
      width: 76px;
    }
    &:nth-child(2) {
      width: 55px;
    }
    &:nth-child(3) {
      width: 72px;
    }
    &:nth-child(4) {
      width: 78px;
    }
    &:nth-child(5) {
      width: 88px;
    }
    &:nth-child(6) {
      width: 78px;
    }
    &:nth-child(7) {
      width: 118px;
    }
    &:nth-child(8) {
      width: 116px;
    }
  }

  &__main {
    margin-top: 78px;
  }

  &__heading {
    font-size: 20px;
    line-height: (24/20);
  }

  &__card {
    margin-top: 20px;
  }

  &__box {
    position: relative;
    cursor: pointer;
  }

  &__count {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0;
    bottom: 0;
    border-radius: 4px 0 0 0;
    padding: 8px 16px;
    font-family: $font-secondary;
    font-weight: 700;
    font-size: 18px;
    color: #fff;
    background-color: rgba($color-blue, 0.8);

    &-icon {
      width: 15px;
      height: 13px;
      margin-right: 12px;
    }
  }

  &__content {
    margin-top: 24px;
  }

  &__text {
    font-size: 14px;
    line-height: 1.6;
  }

  &__footer {
    margin-top: 30px;
  }

  &__author {
    font-family: $font-secondary;
    font-weight: 700;
    font-size: 18px;
    line-height: (22/18);
    color: $color-blue;
  }

  &__rating {
    display: flex;
    margin-top: 5px;

    &-icon {
      width: 20px;
      height: 20px;
    }
  }

  &__date {
    margin-top: 12px;
    font-size: 16px;
    color: $color-gray-middle;
  }

  @include media(md) {
    &__card {
      display: flex;
      align-items: flex-start;
      margin-top: 26px;
    }

    &__box {
      flex-shrink: 0;
      width: 220px;
      margin-right: 35px;
    }

    &__content {
      margin-top: 0;
    }

    &__footer {
      display: grid;
      grid-template-columns: auto 1fr;
      margin-top: 24px;
    }

    &__author {
      margin-right: 60px;
    }

    &__rating {
      margin-top: 0;
    }

    &__date {
      margin-top: 6px;
    }
  }

  @include media(lg) {
    &__brands {
      margin-right: 0;
      margin-bottom: -50px;

      &_long {
        #{$b} {
          &__brand {
            &:nth-child(1) {
              width: 108px;
            }
            &:nth-child(2) {
              width: 76px;
            }
            &:nth-child(3) {
              width: 104px;
            }
            &:nth-child(4) {
              width: 112px;
            }
            &:nth-child(5) {
              width: 126px;
            }
            &:nth-child(6) {
              width: 110px;
            }
            &:nth-child(7) {
              width: 174px;
            }
            &:nth-child(8) {
              width: 170px;
            }
          }
        }
      }
    }

    &__brand {
      margin-right: 30px;
      margin-bottom: 50px;

      &:nth-child(1) {
        width: 120px;
      }
      &:nth-child(2) {
        width: 88px;
      }
      &:nth-child(3) {
        width: 116px;
      }
      &:nth-child(4) {
        width: 124px;
      }
      &:nth-child(5) {
        width: 138px;
      }
      &:nth-child(6) {
        width: 122px;
      }
      &:nth-child(7) {
        width: 186px;
      }
      &:nth-child(8) {
        width: 182px;
      }
    }

    &__main {
      margin-top: 0;
    }

    &__heading {
      font-size: 24px;
    }
  }

  @include media(xl) {
    &__brands {
      margin-bottom: -60px;

      &_long {
        #{$b} {
          &__brand {
            &:nth-child(1) {
              width: 146px;
            }
            &:nth-child(2) {
              width: 102px;
            }
            &:nth-child(3) {
              width: 140px;
            }
            &:nth-child(4) {
              width: 150px;
            }
            &:nth-child(5) {
              width: 170px;
            }
            &:nth-child(6) {
              width: 150px;
            }
            &:nth-child(7) {
              width: 234px;
            }
            &:nth-child(8) {
              width: 230px;
            }
          }
        }
      }
    }

    &__brand {
      margin-right: 58px;
      margin-bottom: 60px;

      &:nth-child(1) {
        width: 160px;
      }
      &:nth-child(2) {
        width: 116px;
      }
      &:nth-child(3) {
        width: 154px;
      }
      &:nth-child(4) {
        width: 164px;
      }
      &:nth-child(5) {
        width: 184px;
      }
      &:nth-child(6) {
        width: 164px;
      }
      &:nth-child(7) {
        width: 248px;
      }
      &:nth-child(8) {
        width: 244px;
      }
    }

    &__heading {
      font-size: 40px;
    }

    &__card {
      margin-top: 36px;
    }

    &__box {
      width: 280px;
      margin-right: 45px;
    }

    &__text {
      max-width: 610px;
    }

    &__footer {
      margin-top: 30px;
    }

    &__author {
      margin-right: 30px;
      font-size: 24px;
    }

    &__date {
      margin-top: 18px;
    }
  }
}
</style>
