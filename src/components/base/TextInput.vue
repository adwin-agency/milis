<template>
  <div :class="['text-input', {'text-input_ta': textarea}]">
    <component
      :is="inputTag"
      class="text-input__field"
      :type="type"
      :name="name"
      :value="value"
      autocomplete="off"
      @input="$emit('input', $event.target.value)"
      @focus="onFocus"
      @blur="onBlur"
    />
    <span class="text-input__outline"></span>
    <span
      class="text-input__label"
      :class="{'is-active': activeLabel}"
    >
      {{label}}
    </span>
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    label: String,
    type: String,
    name: String,
    value: String,
    textarea: Boolean
  },
  data() {
    return {
      activeLabel: false
    }
  },
  computed: {
    inputTag() {
      return this.textarea ? 'textarea' : 'input'
    }
  },
  methods: {
    onFocus() {
      this.activeLabel = true
    },
    onBlur() {
      this.activeLabel = !!this.value
    }
  }
}
</script>

<style lang="scss">
.text-input {
  $b: &;

  position: relative;
  font-family: $font-secondary;

  &_ta {
    padding-top: 10px;

    #{$b}__field {
      padding-top: 8px;
      height: 123px;
      resize: none;
    }
  }

  &__field {
    display: block;
    width: 100%;
    height: 55px;
    padding: 16px;
    font-size: 11px;
    line-height: (17/11);
    caret-color: $color-green;
    transition: border-color .3s ease, color .3s ease;

    &:focus {

      & ~ #{$b}__outline {
        border-color: $color-green;
      }

      & ~ #{$b}__label {
        color: $color-green;
      }
    }
  }

  &__outline {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    border: 1px solid $color-gray;
    pointer-events: none;
  }

  &__label {
    position: absolute;
    left: 6px;
    top: 18px;    
    padding: 0 10px;
    font-size: 11px;
    line-height: (17/11);
    color: $color-gray;
    background-color: inherit;
    pointer-events: none;
    transition: color .3s ease, transform .3s ease;

    &.is-active {
      transform: translateY(-27px);
    }
  }
}
</style>
