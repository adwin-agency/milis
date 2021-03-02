<template>
  <component
    :is="tag"
    :href="href"
    :type="!href && 'button'"
    class="link"
    @click="onClick"
  >
    <span class="link__icon">
      <Icon name="leaf"/>
    </span>
    {{text}}
  </component>
</template>

<script>
import Icon from './Icon'

export default {
  name: 'Link',
  components: {
    Icon
  },
  props: {
    href: String,
    text: String,
    modal: String,
    modalData: Object
  },
  computed: {
    tag() {
      return this.href ? 'a' : 'button'
    }
  },
  methods: {
    onClick(e) {
      if (this.modal) {
        e.preventDefault()
        this.$store.commit('setModal', this.modal)

        if (this.modalData) {
          this.$store.commit('setModalData', this.modalData)
        }
      }
    }
  }
}
</script>

<style lang="scss">
  .link {
    display: flex;
    align-items: flex-end;
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 16px;
    line-height: (20/16);    
    text-decoration: underline;

    &__icon {
      width: 21px;
      height: 21px;
      margin-right: 10px;
      margin-bottom: 4px;
      fill: $color-green;
    }

    @include media(md) {
      font-size: 18px;
      line-height: (22/18);
    }
  }
</style>
