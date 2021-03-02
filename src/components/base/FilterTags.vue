<template>
  <div class="filter-tags">
    <p class="filter-tags__title">Вы уже определились со стилем?</p>
    <div class="filter-tags__list">
      <RouterLink
        v-for="(tag, index) in tags"
        :key="index"        
        :to="{name: activeCategory ? 'category' : 'catalog', params: {category: activeCategory}, query: {style: tag.code}}"
        v-slot="{ href, navigate, isActive }"
        exact
        custom
      >
        <span
          class="filter-tags__item"
          :class="isActive && 'is-active'">
          <a :href="href" @click="navigate">{{tag.name}}</a>
          <span
            class="filter-tags__close"
            @click.prevent="$emit('deselectTag')"
          ></span>
        </span>
      </RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterTags',
  props: {
    tags: Array,
    activeTag: String
  },
  computed: {
    activeCategory() {
      return this.$route.params.category
    },
    styles() {
      return this.$store.state.styles
    }
  }
}
</script>

<style lang="scss">
  .filter-tags {
    $b: &;

    border-top: 1px solid #D9D9D9;
    padding: 27px $container-padding 0;

    &__title {
      margin-bottom: 33px;
      font-weight: bold;
      font-size: 14px;
      line-height: (17/14);
      color: $color-blue;
    }

    &__list {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    &__item {
      position: relative;
      margin-bottom: 26px;
      margin-left: -16px;
      padding: 5px 16px;
      border-radius: 30px;
      font-size: 14px;
      line-height: (17/14);
      text-decoration: underline;
      transition: transform .3s ease, color .3s ease;

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: calc(100% + 12px);
        height: 100%;
        border-radius: inherit;
        background-color: $color-blue;
        opacity: 0;
        transform: translateZ(0);
        transition: opacity .3s ease;
        pointer-events: none;
        z-index: -1;
      }

      &.is-active {
        transform: translateX(16px);
        color: $color-white;

        &::before {
          opacity: 1;
        }

        a {
          pointer-events: none;
        }

        #{$b}__close {
          opacity: 1;
          pointer-events: all;
        }
      }
    }

    &__close {
      position: absolute;
      top: 0;
      right: -3px;
      bottom: 0;
      margin: auto;
      width: 12px;
      height: 12px;
      opacity: 0;
      pointer-events: none;
      transition: opacity .3s ease;
      cursor: pointer;

      &::before,
      &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 100%;
        height: 1px;
        background-color: $color-white;
      }

      &::before {
        transform: rotate(-45deg);
      }

      &::after {
        transform: rotate(45deg);
      }
    }

    @include media(lg) {
      display: flex;
      flex-wrap: wrap;
      border-top: none;
      padding: 0;

      &__title {
        flex-shrink: 0;
        margin-top: 5px;
        margin-bottom: 12px;
        margin-right: 58px;
      }

      &__list {
        flex-wrap: wrap;
        flex-direction: row;
        align-items: center;
        margin-left: -16px;
      }


      &__item {
        margin-left: 0;
        margin-right: 14px;
        margin-bottom: 12px;
        color: $color-gray;

        &.is-active {
          transform: none;
        }
      }
    }
  }
</style>
