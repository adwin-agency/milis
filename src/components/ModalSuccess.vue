<template>
  <div class="modal-success">
    <div class="modal-success__icon">
      <Icon name="check-circle" />
    </div>
    <p class="modal-success__title">Ваша заявка <br>успешно отправлена!</p>
    <p class="modal-success__desc">Мы свяжимся с Вами в ближайшее время, <br>для подтверждения заявки</p>
    <RouterLink
      class="modal-success__link"
      :to="{name: 'catalog'}"
    >
      Посмотреть похожиее кухни
    </RouterLink>
  </div>
</template>

<script>
import Icon from '@/components/base/Icon'

export default {
  name: 'ModalSuccess',
  components: {
    Icon
  }
}
</script>

<style lang="scss">
.modal-success {
  $b: &;

  text-align: center;
  font-family: $font-secondary;
  opacity: 0;
  transition: opacity .5s ease;

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
    transition: transform .3s cubic-bezier(0.25, 0.1, 0.25, 1.5);
    transition-delay: inherit;
  }

  &__title {
    margin-top: 20px;    
    font-size: 22px;
    line-height: (33/24);
    color: $color-blue;
  }

  &__desc {
    margin-top: 6px;
    font-size: 12px;
    line-height: (25/14);
    color: $color-gray-middle;
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
}
</style>
