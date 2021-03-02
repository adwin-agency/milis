<template>
  <div class="pagination">
    <button
      type="button"
      v-for="i in pages"
      :key="i"
      class="pagination__item"
      :class="{'is-active': activePage === i}"
      @click="$emit('changePage', i)"
    >
      {{i}}
    </button>
    <a v-if="false" href="#" class="pagination__link">Следующая страница</a>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pages: Number,
    activePage: Number
  }
}
</script>

<style lang="scss">
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: $font-secondary;

    &__item,
    &__link {
      font-weight: bold;
      font-size: 18px;
      line-height: (22/18);
      text-decoration: underline;
    }

    &__item {
      margin: 0 18px;
      padding: 0 6px;
      color: $color-gray;

      &:last-child {
        margin-right: 0;
      }

      &.is-active {
        color: $color-blue;
        pointer-events: none;
      }
    }

    &__link {
      display: none;
      color: $color-blue;
    }

    @include media(md) {
      justify-content: flex-start;

      &__item {
        margin-left: 0;
        margin-right: 36px;
      }

      &__link {
        display: inline;
      }
    }
  }
</style>
