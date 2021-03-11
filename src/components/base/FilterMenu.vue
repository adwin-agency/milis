<template>
  <div class="filter-menu">
    <div class="filter-menu__wrapper">
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
    display: flex;
    align-items: center;
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
      color: $color-gray-middle;
      background-color: transparent;

      &_main {
        color: $color-blue;
      }

      &.is-active {
        font-weight: bold;
        color: $color-blue;
        background-color: transparent;
      }
    }

    &__close {
      fill: $color-blue;
    }
  }

  @include media(xl) {
    &__item {
      margin-right: 48px;
    }
  }
}
</style>
