<template>
  <div class="filter-tags">
    <p class="filter-tags__title">Вы уже определились со стилем?</p>
    <div class="filter-tags__wrapper">
      <RouterLink
        v-for="(tag, index) in tags"
        :key="index"
        :to="{name: activeCategory ? 'category' : 'catalog', params: {category: activeCategory}, query: activeStyle === tag.code ? false : {style: tag.code}}"
        exact
        class="filter-tags__item"
        :class="{'is-active': activeStyle === tag.code}"
      >
        {{tag.name}}
        <span class="filter-tags__close">
          <Icon name="close" />
        </span>
      </RouterLink>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/base/Icon'

export default {
  name: 'FilterTags',
  components: {
    Icon
  },
  props: {
    tags: Array
  },
  computed: {
    activeCategory() {
      return this.$route.params.category
    },
    activeStyle() {
      return this.$route.query.style
    }
  }
}
</script>

<style lang="scss">
  .filter-tags {
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

    &__title {
      display: none;
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

      &__close {
        width: 10px;
        height: 10px;
        margin-left: 10px;
      }
    }

    @include media(lg) {
      display: flex;
      flex-wrap: wrap;
      overflow: visible;

      &__wrapper {
        flex-wrap: wrap;
        margin-left: -16px;
        margin-bottom: 0;
        padding-bottom: 0;
        overflow-x: visible;

        &::before,
        &::after {
          display: none;
        }
      }

      &__title {
        display: block;
        flex-shrink: 0;
        margin-top: 5px;
        margin-bottom: 12px;
        margin-right: 58px;
        font-weight: bold;
        font-size: 14px;
        line-height: (17/14);
        color: $color-blue;
      }

      &__item {
        position: relative;
        margin-right: 20px;
        margin-bottom: 12px;
        padding: 5px 16px;
        border-radius: 30px;
        font-size: 14px;
        line-height: (17/14);
        text-decoration: underline;
        color: $color-gray-middle;
        background-color: transparent;

        &:last-child {
          margin-right: 20px;
        }

        &.is-active {
          margin-right: 0px;          
          color: $color-white;
        }
      }
    }
  }
</style>
