<template>
  <div class="modal-video">
    <div class="modal-video__box">
      <video
        src=""
        class="modal-video__video"
      ></video>
    </div>
    <div
      class="modal-video__close"
      @click="$emit('close')"
    >
      <Icon name="close" />
    </div>
  </div>
</template>

<script>
import Icon from './base/Icon.vue'

export default {
  name: 'ModalVideo',
  components: {
    Icon
  }
}
</script>

<style lang="scss">
.modal-video {
  position: relative;

  &__box {
    max-width: 100%;
    max-height: calc(100% - 30px);
  }

  &__video {
    max-width: 100%;
    max-height: 100%;
  }

  &__close {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
