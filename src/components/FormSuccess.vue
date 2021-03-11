<template>
  <div :class="['form-success', {'form-success_small': small}]">
    <div class="form-success__icon">
      <Icon name="check-circle" />
    </div>
    <p class="form-success__title">{{title}}</p>
    <p class="form-success__desc">{{desc}}</p>
    <RouterLink
      v-if="link"
      class="form-success__link"
      :to="{name: link.path}"
    >
      {{link.title}}
    </RouterLink>
  </div>
</template>

<script>
import Icon from '@/components/base/Icon'

export default {
  name: 'FormSuccess',
  components: {
    Icon
  },
  props: {
    small: Boolean,
    title: String,
    desc: String,
    link: Object
  }
}
</script>

<style lang="scss">
.form-success {
  $b: &;

  text-align: center;
  font-family: $font-secondary;
  opacity: 0;
  transition: opacity .5s ease .5s;

  &_small {
    #{$b} {
      &__icon {
        width: 40px;
        height: 40px;
      }

      &__title {
        margin-top: 0;
        font-size: 18px;
      }
    }
  }

  &.is-active {
    opacity: 1;

    #{$b} {
      &__icon {
        transform: none;
      }
    }
  }

  &__icon {
    display: inline-block;
    width: 58px;
    height: 58px;
    transform: scale(0);
    transition: transform .3s cubic-bezier(0.25, 0.1, 0.25, 1.5) .5s;
  }

  &__title {
    margin-top: 20px;    
    font-size: 22px;
    line-height: (33/24);
    color: $color-blue;
    white-space: pre-line;
  }

  &__desc {
    margin-top: 6px;
    font-size: 12px;
    line-height: (25/14);
    color: $color-gray-middle;
    white-space: pre-line;
  }

  &__link {
    display: inline-block;
    margin-top: 21px;
    font-size: 14px;
    line-height: (19/14);
    color: $color-green;
  }

  @include media(xs) {
    &__title {
      font-size: 24px;
    }

    &__desc {
      font-size: 14px;
    }
  }

  @include media(md) {
    &_small {
      display: flex;
      align-items: center;

      #{$b} {
        &__title {
          margin-top: 0;
          margin-left: 18px;
        }
      }
    }
  }
}
</style>
