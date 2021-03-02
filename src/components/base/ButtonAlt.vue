<template>
  <component
    :is="tag"
    :href="href"
    :type="!href && 'button'"
    :class="['btn-alt', {'btn-alt_exp': expand}, {'btn-alt_sh': shadow}]"
    ref="button"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @click="onClick"
  >
    <span v-if="icon" class="btn-alt__icon">
      <Icon :name="icon"/>
    </span>
    <span v-if="text" v-html="text" class="btn-alt__text"></span>
  </component>
</template>

<script>
import Icon from './Icon'

export default {
  name: 'ButtonAlt',
  components: {
    Icon
  },
  props: {
    href: String,
    icon: String,
    text: String,
    expand: Boolean,
    shadow: Boolean,
    modal: String,
    modalData: Object
  },
  computed: {
    tag() {
      return this.href ? 'a' : 'button'
    }
  },
  methods: {
    onMouseEnter() {
      if (this.expand) {
        this.$refs.button.style.width = this.$refs.button.scrollWidth + 'px'
      }
    },
    onMouseLeave() {
      if (this.expand) {
        this.$refs.button.style.width = ''
      }
    },
    onClick(e) {
      if (this.modal && this.modalData) {
        e.preventDefault()
        this.$store.commit('setModal', this.modal)
        this.$store.commit('setModalData', this.modalData)
      }
    }
  }
}
</script>

<style lang="scss">
.btn-alt {
  $b: &;

  display: inline-flex;
  align-items: center;
  min-height: 35px;
  padding: 9px;
  border-radius: 48px;
  text-align: left;
  font-family: $font-secondary;
  font-size: 12px;
  line-height: (15/12);
  text-decoration: underline;
  color: $color-blue;
  background-color: $color-white;
  transition: box-shadow .3s ease;

  &_exp {
    width: 48px;
    overflow: hidden;
    transition: width .3s ease;

    #{$b}__icon {
      margin-left: 0;
    }

    #{$b}__text {
      opacity: 0;
      transition: opacity .3s ease;
    }

    &:hover {
      #{$b}__text {
        opacity: 1;
      }
    }
  }

  &_sh {
    box-shadow: 0px 1px 8px 2px #EEEEEE;
  }

  &__icon {
    flex-shrink: 0;
    width: 30px;
    height: 30px;
    margin-right: 6px;
    fill: currentColor;
  }

  &__text {
    padding-right: 22px;

    &:only-child {
      padding: 0 15px;
    }
  }

  @include media(md) {
    min-height: 40px;

    &__text:only-child {
      padding: 0 26px;
    }
  }

  @include media(lg) {
    min-height: 43px;

    &__text:only-child {
      padding: 0 32px;
    }
  }
}
</style>
