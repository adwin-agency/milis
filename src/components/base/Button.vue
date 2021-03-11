<template>
  <component
    :is="tag"
    :href="href"
    :type="!href && 'button'"
    :class="classNames"
    @click="onClick"
  >
    <span class="btn__text">
      <slot></slot>
    </span>
    <span v-if="arrow" class="btn__arrow">
      <Icon name="arrow-right"/>
    </span>
    <span v-if="icon" class="btn__icon">
      <Icon :name="icon"/>
    </span>
  </component>
</template>

<script>
import Icon from './Icon'

export default {
  name: 'Button',
  components: {
    Icon
  },
  props: {
    href: String,
    arrow: Boolean,
    icon: String,
    send: Boolean,
    small: Boolean,
    underline: Boolean,
    blue: Boolean,
    square: Boolean,
    modal: String,
    modalData: Object
  },
  computed: {
    tag() {
      return this.href ? 'a' : 'button'
    },
    classNames() {
      return [
        'btn',
        {'btn_send': this.send},
        {'btn_sm': this.small},
        {'btn_u': this.underline},
        {'btn_blue': this.blue},
        {'btn_arrow': this.arrow},
        {'btn_square': this.square}
      ]
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
.btn {
  $b: &;

  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  padding: 17px 7px;
  font-size: 14px;
  line-height: (16/14);
  color: $color-white;
  background: $btn-gradient-green;
  background-position: left;
  background-size: 200% 100%;
  transition: background-position .3s ease, color .3s ease, opacity .3s ease;

  &:hover {
    background-position: right;
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &_blue {
    background-image: $btn-gradient-blue;
  }

  &_arrow {
    &:hover {
      background-position: left;
    }

    #{$b}__text {
      padding-left: 10px;
    }
  }

  &_u {
    text-decoration: underline;
  }

  &_send {
    height: 55px;
    padding: 12px;
    font-size: 11px;
    line-height: (17/11);
  }

  &_square {
    width: 172px;
    height: 133px;
    padding: 30px;
    line-height: (22/14);
  }

  &__arrow {
    position: relative;
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    margin: -18px 0;
    margin-left: 34px;
    fill: currentColor;
    transition: transform .3s ease;
    z-index: 1;
  }

  &__icon {  
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    margin: -10px 0;
    margin-left: 8px;
    margin-right: -16px;
  }

  @include media(md) {
    padding: 22px 40px;

    &:hover {
      #{$b}__arrow {
        transform: translateX(23px);
      }
    }

    &_sm {
      padding: 18px;
      font-size: 12px;
      line-height: (14/12);
    }

    &_send {
      padding: 12px;
    }
  }
}
</style>
