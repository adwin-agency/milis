<template>
  <div
    :class="[
      'dropdowns',
      {'dropdowns_products': products}
    ]"
  >
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="[
        'dropdowns__item',
        {'is-active': activeItem === index}
      ]"
    >
      <p class="dropdowns__title" @click="onTitleClick(index)">
        <span
          v-if="products"
          class="dropdowns__icon"
        >
          <Icon name="leaf" />
        </span>
        <span
          v-else
          class="dropdowns__arrow"
        >
          <Icon name="caret-right" />
        </span>
        {{item.title}}
      </p>
      <div class="dropdowns__content" ref="content">
        <p class="dropdowns__desc">{{item.desc}}</p>
      </div>
    </div>
  </div>  
</template>

<script>
import Icon from './Icon'

export default {
  name: 'Dropdown',
  components: {
    Icon
  },
  props: {
    items: Array,
    products: Boolean
  },
  data() {
    return {
      activeItem: null
    }
  },
  methods: {
    onTitleClick(index) {
      const closingContent = this.activeItem === null ? null : this.$refs.content[this.activeItem]
      const openingContent = this.activeItem === index ? null : this.$refs.content[index]

      this.activeItem = openingContent ? index : null

      if (closingContent) {
        closingContent.style.height = ''
      }

      if (openingContent) {
        openingContent.style.height = openingContent.scrollHeight + 'px'
      }
    }
  }
}
</script>

<style lang="scss">
.dropdowns {
  $b: &;

  &_products {
    #{$b} {
      &__item {
        margin-bottom: 18px;
      }

      &__title {
        font-size: 16px;
      }

      &__desc {
        font-size: 14px;
      }
    }
  }


  &__item {
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }    

    &.is-active {
      #{$b} {
        &__arrow {
          transform: rotate(90deg);
        }

        &__content {
          opacity: 1;
        }
      }
    }
  }

  &__title {
    display: inline-flex;
    position: relative;
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 12px;
    line-height: (20/12);
    color: $color-blue;
    cursor: pointer;
  }

  &__arrow {
    flex-shrink: 0;
    margin-top: 4px;    
    margin-right: 12px;
    width: 12px;
    height: 12px;
    transition: transform .3s ease;
  }

  &__icon {
    position: absolute;
    left: -2px;
    top: -6px;
    width: 22px;
    height: 22px;
    fill: $color-green;
    z-index: -1;
  }

  &__content {
    height: 0;
    opacity: 0;
    overflow: hidden;
    transition: height .3s ease, opacity .3s ease;
  }

  &__desc {
    padding-top: 10px;
    padding-left: 24px;
    font-size: 12px;
    line-height: (23/14);
  }

  @include media(md) {
    &_products {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-bottom: -28px;

      #{$b} {
        &__item {
          width: 46%;
          margin-bottom: 28px;
        }
      }
    }

    &__item {
      margin-bottom: 10px;
    }

    &__title {
      font-size: 18px;
      line-height: (29/18);
    }

    &__arrow {
      margin-top: 6px;
      width: 17px;
      height: 17px;
      margin-right: 6px;
    }

    &__desc {
      padding-left: 23px;
      padding-right: 70px;
      font-size: 14px;
    }
  }

  @include media(lg) {
    &__title {
      font-size: 14px;
      line-height: (23/14);
    }

    &__arrow {
      margin-right: 4px;
      width: 10px;
      height: 10px;
    }

    &__desc {
      padding-top: 4px;
      padding-left: 14px;
      padding-right: 0;
      font-size: 12px;
      line-height: (20/12);
    }
  }

  @include media(xl) {
    &__title {
      font-size: 18px;
      line-height: (29/18);
    }

    &__arrow {
      width: 17px;
      height: 17px;
    }

    &__desc {
      padding-top: 16px;
      padding-left: 21px;
      font-size: 14px;
      line-height: (23/14);
    }
  }
}

.dropdown {
  $b: &;  

  &_lg {
    #{$b} {
      &__title {
        font-size: 16px;
        line-height: (25/16);
      }

      &__desc {
        padding-top: 6px;
        line-height: (22/12);
        color: $color-gray-middle;
      }
    }
  }  

  @include media(md) {
    &_lg {
      #{$b} {
        &__title {
          font-size: 18px;
          line-height: (22/18);
        }
      }
    }
  }

  @include media(xl) {
    &_lg {
      #{$b} {
        &__desc {
          max-width: none;
        }
      }
    }
  }
}
</style>
