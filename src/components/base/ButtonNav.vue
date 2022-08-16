<template>
  <button
    type="button"
    :class="['btn-nav', {'btn-nav_tr': transparent, 'btn-nav_sm': sm, 'btn-nav_xs': xs, 'btn-nav_alt': alt}]"
  >
    <span
      class="btn-nav__icon"
      :class="{'btn-nav__icon_alt': alt, 'btn-nav__icon_rev': prev && alt}"
    >
      <Icon :name="iconName" />
    </span>
  </button>
</template>

<script>
import Icon from './Icon'

export default {
  name: 'ButtonNav',
  components: {
    Icon
  },
  props: {
    prev: Boolean,
    next: Boolean,
    transparent: Boolean,
    sm: Boolean,
    xs: Boolean,
    alt: Boolean
  },
  computed: {
    iconName() {
      return this.alt ? 'angle-right' : this.prev ? 'arrow-left' : 'arrow-right'
    }
  }
}
</script>

<style lang="scss">
.btn-nav {
  $b: &;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  background-color: $color-blue;
  fill: $color-gray;
  transition: background-color 0.3s ease;

  &.swiper-button-disabled {
    cursor: auto;
    background-color: #646a8b;
  }

  &_tr {
    background-color: transparent;
    fill: $color-blue;
    transition: opacity 0.3s ease;

    &.swiper-button-disabled {
      background-color: transparent;
      opacity: 0;
    }
  }

  &_sm {
    width: 40px;
    height: 40px;

    #{$b}__icon {
      width: 18px;
      height: 18px;
    }
  }

  &_xs {
    width: 36px;
    height: 36px;

    #{$b}__icon {
      width: 18px;
      height: 18px;
    }
  }

  &_alt {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.6);
    fill: $color-blue;
    transition: background-color 0.3s ease, fill 0.3s ease;

    &.swiper-button-disabled {
      background-color: rgba(255, 255, 255, 0.3);
    }

    @media (any-hover: hover) {
      &:hover:not(.swiper-button-disabled) {
        background-color: $color-blue;
        fill: #fff;
      }
    }
  }

  &__icon {
    width: 20px;
    height: 20px;

    &_alt {
      width: 20px;
      height: 20px;
    }

    &_rev {
      transform: rotate(180deg);
    }
  }

  @include media(md) {
    width: 52px;
    height: 52px;

    &_sm {
      width: 40px;
      height: 40px;

      #{$b}__icon {
        width: 18px;
        height: 18px;
      }
    }

    &_xs {
      width: 36px;
      height: 36px;

      #{$b}__icon {
        width: 18px;
        height: 18px;
      }
    }

    &_alt {
      width: 44px;
      height: 44px;
    }

    &__icon {
      width: 24px;
      height: 24px;

      &_alt {
        width: 20px;
        height: 20px;
      }
    }
  }

  @include media(lg) {
    width: 60px;
    height: 60px;

    &_sm {
      width: 46px;
      height: 46px;

      #{$b}__icon {
        width: 22px;
        height: 22px;
      }
    }

    &_xs {
      width: 36px;
      height: 36px;

      #{$b}__icon {
        width: 18px;
        height: 18px;
      }
    }

    &_alt {
      width: 44px;
      height: 44px;
    }

    &__icon {
      width: 28px;
      height: 28px;

      &_alt {
        width: 20px;
        height: 20px;
      }
    }
  }

  @include media(xl) {
    &_sm {
      width: 46px;
      height: 46px;

      #{$b}__icon {
        width: 22px;
        height: 22px;
      }
    }

    &_xs {
      width: 40px;
      height: 40px;

      #{$b}__icon {
        width: 22px;
        height: 22px;
      }
    }
  }
}
</style>
