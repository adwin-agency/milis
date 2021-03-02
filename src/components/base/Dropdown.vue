<template>
  <div :class="['dropdown', {'dropdown_lg': lg}, {'is-active': active}]">
    <span class="dropdown__arrow" v-if="arrow">
      <Icon name="caret-right" />
    </span>
    <div class="dropdown__wrapper">
      <p class="dropdown__title" @click="onTitleClick">{{title}}</p>
      <div class="dropdown__content" ref="content">
        <p class="dropdown__desc">{{desc}}</p>
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
    lg: Boolean,
    arrow: Boolean,
    title: String,
    desc: String
  },
  data: () => ({
    anim: false,
    active: false
  }),
  methods: {
    onTitleClick() {
      if (this.anim) {
        return
      }

      this.anim = true
      this.active = !this.active
      const content = this.$refs.content
      content.style.height = content.scrollHeight + 'px'

      if (!this.active) {
        setTimeout(() => {
          content.style.height = ''
        }, 0)
      }

      setTimeout(() => {
        if (this.active) {
          content.style.height = 'auto'
        }

        this.anim = false
      }, 300)
    }
  }
}
</script>

<style lang="scss">
.dropdown {
  $b: &;

  display: flex;

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

  &__title {
    display: flex;
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
    margin-left: -2px;
    margin-top: 4px;
    
    margin-right: 12px;
    width: 12px;
    height: 12px;
    transition: transform .3s ease;
  }

  &__content {
    height: 0;
    opacity: 0;
    overflow: hidden;
    transition: height .3s ease, opacity .3s ease;
  }

  &__desc {
    padding-top: 16px;
    font-size: 12px;
    line-height: (23/14);
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
      padding-right: 0;
      font-size: 12px;
      line-height: (20/12);
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

    &__title {
      font-size: 18px;
      line-height: (29/18);
    }

    &__arrow {
      width: 17px;
      height: 17px;
    }

    &__desc {
      max-width: 260px;
      padding-top: 16px;
      font-size: 14px;
      line-height: (23/14);
    }
  }
}
</style>
