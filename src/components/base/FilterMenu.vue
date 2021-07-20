<template>
  <div class="filter-menu">
    <div class="filter-menu__wrapper">
      <div class="filter-menu__items">
        <template v-if="filterType === 'catalog'">
          <RouterLink
            v-for="(category, index) in kitchenCategories"
            :key="index"
            class="filter-menu__item"
            :class="{'is-active': activeCategory === category.url}"
            :to="{
              name: activeCategory === category.url ? 'catalog' : 'category',
              params: {category: activeCategory === category.url ? false : category.url},
              query: activeStyle ? {style: activeStyle} : false
            }"
          >
            {{category.name}}
            <span class="filter-menu__close">
              <Icon name="close" />
            </span>
          </RouterLink>
        </template>
        <template v-if="filterType === 'technics'">
          <RouterLink
            v-for="(category, index) in technicsCategories"
            :key="index"
            class="filter-menu__item"
            :class="{'is-active': activeCategory === category.url}"
            :to="{
              name: activeCategory === category.url ? 'technics' : 'techcategory',
              params: {category: activeCategory === category.url ? false : category.url}
            }"
          >
            {{category.name}}
            <span class="filter-menu__close">
              <Icon name="close" />
            </span>
          </RouterLink>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/base/Icon'

export default {
  name: 'FilterMenu',
  components: {
    Icon
  },
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
    activeStyle() {
      return this.$route.query.style
    },
    technicsCategories() {
      return this.$store.state.technicsCategories && this.$store.state.technicsCategories.slice(1)
    }
  }
}
</script>

<style lang="scss">
.filter-menu {
  $b: &;

  &__wrapper {
    overflow: hidden;
  }

  &__items {
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
    display: flex;
    align-items: center;
    flex-shrink: 0;
    margin-right: 20px;
    padding: 6px 22px;
    border-radius: 85px;
    border: 1px solid $color-gray;
    font-size: 16px;
    line-height: (19/16);
    color: $color-blue;
    text-decoration: underline;

    &:last-child {
      margin-right: 0;
    }

    &.is-active {
      color: #fff;
      background-color: $color-blue;

      #{$b}__close {
        display: block;
      }
    }
  }

  &__close {
    display: none;
    width: 8px;
    height: 8px;
    margin-left: 8px;
    fill: #fff;
  }

  @include media(md) {
    &__items {
      &::before,
      &::after {
        width: $container-padding-md;
      }
    }
  }

  @include media(lg) {
    padding-right: 12px;

    &__wrapper {
      overflow: visible;
    }

    &__items {
      flex-wrap: wrap;
      margin-bottom: -20px;
      padding-bottom: 0;
      overflow-x: visible;

      &::before,
      &::after {
        display: none;
      }
    }

    &__item {
      margin-right: 18px;
      margin-bottom: 18px;

      &_main {
        color: $color-blue;
      }
    }
  }
}
</style>
