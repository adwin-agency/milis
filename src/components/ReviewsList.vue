<template>
  <div class="reviews-list">
    <!-- <FilterMenu class="reviews-list__menu" reviews /> -->
    <div class="reviews-list__row">
      <div
        v-for="(review, index) in reviews"
        :key="index"
        class="reviews-list__col">
        <ReviewCard
          class="reviews-list__item"
          :reviewData="review"
          @detailsClick="showModal(review.id)"
        />
      </div>
    </div>
    <div class="reviews-list__panel">
      <Button
        small
        underline
        icon="edit"
        class="reviews-list__btn"
        modal="write"
      >
        Написать отзыв
      </Button>
      <div class="reviews-list__pagination">
        <button
          v-for="i in pages"
          :key="i"
          type="button"
          class="reviews-list__pagination-item"
          :class="{'is-active': activePage === i}"
          @click="$emit('changePage', i)"
        >
          {{i}}
        </button>
        <!-- <a href="#" class="reviews-list__pagination-item">Следующая страница</a> -->
      </div>
    </div>
  </div>
</template>

<script>
// import FilterMenu from './base/FilterMenu'
import Button from './base/Button'
import ReviewCard from './ReviewCard'

export default {
  name: 'ReviewsList',
  components: {
    // FilterMenu,
    Button,
    ReviewCard
  },
  props: {
    reviews: Array,
    pages: Number,
    activePage: Number
  },
  methods: {
    showModal(id) {      
      this.$store.commit('setInitialReview', id)
      this.$store.commit('setModal', 'review')
    }
  }
}
</script>

<style lang="scss">
.reviews-list {
  &__menu {
    margin: 0 (-$container-padding);
  }

  &__row {
    display: flex;
    flex-wrap: wrap;
    margin: 54px -10px -20px;
  }

  &__col {
    padding: 0 10px;
    margin-bottom: 20px;
  }

  &__panel {
    margin-top: 60px;
  }

  &__btn {
    width: 100%;
  }

  &__pagination {
    display: flex;
    justify-content: center;
    margin-top: 48px;
  }

  &__pagination-item {
    margin-right: 16px;
    padding: 0 2px;
    font-family: $font-secondary;
    font-size: 14px;
    line-height: (17/14);
    text-decoration: underline;
    color: $color-gray;

    &:last-child {
      margin-right: 0;
    }

    &.is-active {
      color: $color-black-gray;
      pointer-events: none;
    }
  }

  @include media(md) {
    &__row {
      margin-top: 40px;
      margin-bottom: -40px;
    }

    &__col {
      width: 50%;
      margin-bottom: 40px;
    }

    &__item {
      margin-right: 10px;
    }

    &__panel {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 48px;
    }

    &__btn {
      order: 1;
      width: auto;
      flex: 1;
      max-width: 415px;
    }

    &__pagination {
      margin-top: 0;
      margin-right: 20px;
    }
  }

  @include media(lg) {
    &__menu {
      margin: 0;
    }

    &__row {
      margin-top: 50px;
    }

    &__col {
      width: 33.333%;
    }

    &__item {
      margin-right: 24px;
    }
  }

  @include media(xl) {
    &__row {
      margin-top: 64px;
      margin-right: 45px;
      margin-bottom: -70px;
    }

    &__col {
      margin-bottom: 70px;
    }

    &__item {
      margin-right: 30px;
    }

    &__panel {
      margin-top: 58px;
    }
  }
}
</style>
