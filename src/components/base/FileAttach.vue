<template>
  <div class="file-attach">
    <label class="file-attach__label">
      <input
        class="file-attach__input"
        type="file"
        :multiple="multiple"
        accept="image/*"
      >
      <div class="file-attach__icon">
        <Icon name="attach" />
      </div>
      <span
        v-if="!files"
        class="file-attach__title"
      >
        {{multple && limitError ? 'Вы можете загрузить не более 3 файлов' : 'Прикрепить фото эскиза'}}
      </span>
    </label>
    <div
      v-if="files"
      class="file-attach__items"
    >
      <div
        v-for="(file, index) in files"
        :key="index"
        class="file-attach__item"
      >
        <span class="file-attach__name">{{file}}</span>
        <span class="file-attach__remove">
          <Icon name="close" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/base/Icon'

export default {
  name: 'FileAttach',
  components: {
    Icon
  },
  props: {
    multiple: Boolean
  },
  data() {
    return {
      files: null,
      limitError: false
    }
  }
}
</script>

<style lang="scss">
.file-attach {
  display: flex;

  &__label {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  &__input {
    display: none;
  }

  &__icon {
    width: 22px;
    height: 22px;
    fill: $color-blue;
  }

  &__title {
    margin-left: 11px;
    font-family: $font-secondary;
    font-size: 12px;
    line-height: (19/12);
    text-decoration: underline;
    color: $color-blue;
  }

  &__items {
    margin-left: 11px;
  }

  &__item {
    display: flex;
    align-items: center;
    margin-right: 50px;
    font-family: $font-secondary;
    font-size: 12px;
    line-height: (19/12);
    text-decoration: underline;
    color: $color-blue;
  }

  &__remove {
    width: 8px;
    height: 8px;
    margin-top: 2px;
    margin-left: 11px;
    cursor: pointer;
  }
}
</style>
