<template>
  <div class="main-preview">
    <RouterLink
      class="main-preview__btn"
      :to="{name: 'catalog'}"
      @click.native="onBtnClick"
    >
      Перейти к каталогу
      <Icon
        class="main-preview__btn-icon"
        name="arrow-right"
      />
    </RouterLink>
  </div>
</template>

<script>
import Icon from './base/Icon.vue'
export default {
  name: 'MainPreview',
  components: {
    Icon
  },
  methods: {
    onBtnClick() {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ 'event': 'main_catalog' })
    }
  }
}
</script>

<style lang="scss">
.main-preview {
  $b: &;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  height: 166px;
  background-image: url(/assets/img/main-preview-2.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;

  &__btn {
    display: flex;
    align-items: center;
    padding: 16px;
    font-family: $font-secondary;
    font-weight: 700;
    font-size: 16px;
    background-color: $color-green;
    color: #fff;
    fill: currentColor;

    &:hover {
      #{$b} {
        &__btn-icon {
          transform: translateX(10px);
        }
      }
    }

    &-icon {
      width: 26px;
      height: 26px;
      margin-left: 10px;
      transition: transform 0.3s ease;
    }
  }

  @include media(sm) {
    background-image: url(/assets/img/main-preview-2-sm.jpg);
  }

  @include media(lg) {
    height: 278px;

    &__btn {
      padding: 32px 58px;
      font-size: 22px;
    }
  }

  @include media(xl) {
    height: 388px;
    background-image: url(/assets/img/main-preview-2-xl.jpg);

    &__btn {
      padding: 52px 90px;
      font-size: 28px;

      &-icon {
        margin-left: 20px;
      }
    }
  }
}
</style>