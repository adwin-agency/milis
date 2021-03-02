<template>
  <div
    class="filter-details"
    ref="filters"
  >
    <div class="filter-details__items">
      <button
        v-for="(category, index) in kitchenCategories"
        :key="index"
        type="button"
        class="filter-details__item"
        :class="{'is-active': activeCategory === category.url}"
        @click="onCategoryClick(category.url)"
      >
        <span class="filter-details__item-check">
          <Icon name="check" />
        </span>  
        {{category.name}}
      </button>
    </div>
    <div class="filter-details__tags">
      <p class="filter-details__tags-title">Вы уже определились со стилем?</p>
      <button
        v-for="(style, index) in kitchenStyles"
        :key="index"
        type="button"
        class="filter-details__tag"
        :class="{'is-active': activeStyle === style.code}"
        @click="onStyleClick(style.code)"
      >
        {{style.name}}
        <span class="filter-details__tag-close"></span>
      </button>
    </div>
    <Button
      class="filter-details__btn"
      @click.native="applyFilters"
    >
      Применить
    </Button>
    <button
      type="button"
      class="filter-details__close"
      @click="closeFilters"
    >
      <Icon name="close" />
    </button>
  </div>
</template>

<script>
import Icon from '@/components/base/Icon'
import Button from '@/components/base/Button'

export default {
  name: 'MobileFilters',
  components: {
    Icon,
    Button
  },
  data() {
    return {
      categoryIsChanged: false,
      selectedCategory: null,
      styleIsChanged: false,
      selectedStyle: null
    }
  },
  computed: {
    kitchenCategories() {
      return this.$store.state.kitchenCategories
    },
    activeCategory() {
      return this.categoryIsChanged ? this.selectedCategory : this.$route.params.category
    },
    kitchenStyles() {
      return this.$store.state.kitchenStyles
    },
    activeStyle() {
      return this.styleIsChanged ? this.selectedStyle : this.$route.query.style
    }
  },
  methods: {
    onCategoryClick(id) {      
      this.selectedCategory = this.activeCategory === id ? null : id
      this.categoryIsChanged = true
    },
    onStyleClick(id) {
      this.selectedStyle = this.activeStyle === id ? null : id
      this.styleIsChanged = true
    },
    resetData() {
      this.categoryIsChanged = false
      this.selectedCategory = null
      this.styleIsChanged = false
      this.selectedStyle = null
    },
    applyFilters() {      
      this.$emit('applyFilters', this.activeCategory, this.activeStyle)
      this.resetData()
      setTimeout(() => {
        this.$refs.filters.scroll(0, 0)
      }, 300)      
    },
    closeFilters() {      
      this.$emit('closeFilters')
      this.resetData()
    }
  }
}
</script>

<style lang="scss">
.filter-details {
  $b: &;

  position: relative;
  padding: 60px $container-padding 120px;
  background-color: $color-white;
  overflow-y: auto;

  &__items {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 25px;
  }

  &__item {
    position: relative;
    margin-bottom: 37px;
    margin-left: -23px;
    padding-left: 23px;
    font-size: 14px;
    line-height: (16/14);
    text-decoration: underline;
    transition: transform .3s ease;

    &:last-child {
      margin-bottom: 0;
    }

    &.is-active {
      font-weight: bold;
      transform: translateX(23px);

      #{$b} {
        &__item-check {
          opacity: 1;
        }
      }
    }
  }

  &__item-check {
    position: absolute;
    left: 0;
    top: -3px;
    width: 19px;
    height: 19px;
    opacity: 0;
    transition: opacity .3s ease;
  }

  &__tags {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    border-top: 1px solid #D9D9D9;
    padding: 27px $container-padding 0;
  }

  &__tags-title {
    margin-bottom: 33px;
    font-weight: bold;
    font-size: 14px;
    line-height: (17/14);
    color: $color-blue;
  }

  &__tag {
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

      #{$b}__tag-close {
        opacity: 1;
        pointer-events: all;
      }
    }
  }

  &__tag-close {
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

  &__btn {
    margin-top: 14px;
    width: 100%;
  }

  &__close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 20px;
    height: 20px;
    fill: $color-blue;
  }

  @include media(md) {
    &__panel {
      padding: 25px $container-padding-md;
    }

    &__menu {
      padding: 60px $container-padding-md 40px;
    }
  }
}
</style>
