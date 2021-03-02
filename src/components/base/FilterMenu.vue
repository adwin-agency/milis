<template>
  <div class="filter-menu">
    <div class="filter-menu__wrapper">
      <template v-if="filterType === 'catalog'">
        <RouterLink
          v-if="activeCategory"
          class="filter-menu__item filter-menu__item_main"
          :to="{name: 'catalog', query: {style: activeStyle}}"
        >
          Все кухни
        </RouterLink>
        <RouterLink
          v-for="(category, index) in availableKitchenCategories"
          :key="index"
          class="filter-menu__item"
          :to="{name: 'category', params: {category: category.url}, query: {style: activeStyle}}"
        >
          {{category.name}}
        </RouterLink>
      </template>
      <template v-if="filterType === 'technics'">
        <RouterLink
          v-for="(category, index) in availableTechnicsCategories"
          :key="index"
          class="filter-menu__item"
          :class="{'filter-menu__item_main': category.url === 'all'}"
          :to="{name: category.url === 'all' ? 'technics' : 'techcategory', params: {category: category.url}}"
        >
          {{category.name}}
        </RouterLink>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterMenu',
  props: {
    filterType: String
  },
  computed: {
    activeCategory() {
      return this.$route.params.category
    },
    kitchenCategories() {
      return this.$store.state.kitchenCategories
    },
    availableKitchenCategories() {
      return this.kitchenCategories && this.kitchenCategories.filter(item => item.url !== this.activeCategory)
    },
    activeStyle() {
      return this.$route.query.style
    },
    technicsCategories() {
      return this.$store.state.technicsCategories
    },
    availableTechnicsCategories() {
      return this.technicsCategories && this.technicsCategories.filter(item => item.url !== (this.activeCategory || 'all'))
    }
  }
}
</script>

<style lang="scss">
.filter-menu {
  overflow: hidden;

  &__wrapper {
    display: flex;
    margin-bottom: -20px;
    padding-bottom: 20px;
    overflow-x: scroll;

    &::before,
    &::after {
      content: "";
      flex-shrink: 0;
      width: $container-padding;
    }
  }

  &__item {
    flex-shrink: 0;
    margin-right: 10px;
    padding: 7px 14px;
    border-radius: 85px;
    font-size: 12px;
    line-height: (14/12);
    background-color: $color-gray-6;

    &:last-child {
      margin-right: 0;
    }
  }

  @include media(md) {
    &__wrapper {
      &::before,
      &::after {
        width: $container-padding-md;
      }
    }

    &__item {
      padding: 8px 19px;
      font-size: 14px;
      line-height: (16/14);
    }
  }

  @include media(lg) {
    overflow: visible;

    &__wrapper {
      flex-wrap: wrap;
      margin-bottom: -26px;
      padding-bottom: 0;
      overflow-x: visible;

      &::before,
      &::after {
        display: none;
      }
    }

    &__item {
      margin-right: 26px;
      margin-bottom: 26px;
      padding: 0;
      font-size: 14px;
      line-height: (16/14);
      text-decoration: underline;
      color: $color-gray;
      background-color: transparent;

      &_main {
        color: $color-blue;
      }
    }
  }

  @include media(xl) {
    &__item {
      margin-right: 48px;
    }
  }
}
</style>
