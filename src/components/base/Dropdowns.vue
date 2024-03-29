<template>
  <div
    :class="[
      'dropdowns',
      {'dropdowns_products': products},
      {'dropdowns_main': main}
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
      <p class="dropdowns__title" :class="{'disabled': disabled}" @click="onTitleClick(index)">
        <span class="dropdowns__icon">
          <Icon name="leaf-double" />
        </span>
        {{item.title}}
      </p>
      <div class="dropdowns__content" ref="content">
        <p class="dropdowns__desc" v-html="item.desc"></p>
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
    products: Boolean,
    disabled: Boolean,
    main: Boolean
  },
  data() {
    return {
      activeItem: null
    }
  },
  methods: {
    onTitleClick(index) {
      if (this.disabled) {
        return
      }
      
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

  &__item {
    margin-bottom: 18px;

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
    font-size: 16px;
    line-height: (20/12);
    color: $color-blue;
    cursor: pointer;

    &.disabled {
      cursor: auto;
    }
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
    //position: absolute;
    flex-shrink: 0;
    left: -2px;
    top: -6px;
    width: 22px;
    height: 22px;
    fill: $color-green;
    z-index: -1;
    margin-right: 15px;
  }

  &__content {
    height: 0;
    opacity: 0;
    overflow: hidden;
    transition: height .3s ease, opacity .3s ease;
  }

  &__desc {
    padding-top: 10px;
    font-size: 14px;
    line-height: (23/14);

    span {
      color: $color-green;
    }
  }

  @include media(md) {
    &_products {
      #{$b} {
        &__item {
          margin-bottom: 28px;
        }
      }
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
  }

  @include media(lg) {
    &_products {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      #{$b} {
        &__item {
          width: 46%;
        }

        &__title {
          font-size: 18px;
        }

        &__desc {
          font-size: 14px;
        }
      }
    }

    &_main {
      #{$b} {
        &__item {
          margin-bottom: 40px;
        }

        &__title {
          font-size: 16px;
        }
      }
    }

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
      font-size: 12px;
      line-height: (20/12);
    }
  }

  @include media(xl) {
    &_main {
      #{$b} {
        &__item {
          margin-bottom: 60px;
        }
      }
    }

    &__title {
      font-size: 18px;
      line-height: (23/18);
    }

    &__arrow {
      width: 17px;
      height: 17px;
    }

    &__desc {
      padding-top: 16px;
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
