<template>
  <div
    :class="[
      'text-input',
      { 'text-input_ta': textarea },
      { 'text-input_sm': small },
      { 'is-error': error },
    ]"
  >
    <component
      :is="inputTag"
      class="text-input__field"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      autocomplete="off"
      @input="test"
      @focus="onFocus"
      @blur="onBlur"
      :prefix="prefix"
      v-model="inputText"
      ref="input"
    />
    <span class="text-input__outline"></span>
    <span class="text-input__label" :class="{ 'is-active': activeLabel }">
      {{ label }}
    </span>
  </div>
</template>

<script>
export default {
  name: "TextInputContract",

  props: {
    label: String,
    type: String,
    name: String,
    placeholder: String,
    textarea: Boolean,
    small: Boolean,
    prefix: Array,
  },
  created() {},

  data() {
    return {
      activeLabel: false,
      inputText: "",
      error: false,
    };
  },
  computed: {
    inputTag() {
      return this.textarea ? "textarea" : "input";
    },
  },
  watch: {
    prefix() {
      this.$refs.input.value = "";
    },
  },
  methods: {
    test(e) {
      this.error = true;
      let val = e.target.value;
      if (this.name == "contract-l") {
        this.$refs.input.value = val.toUpperCase();
        let mask = /^[A-zА-яЁё]*$/i.test(val);
        if (!mask) {
          val = val.substring(0, val.length - 1);
          this.$refs.input.value = val;
        }
        if (this.prefix.includes(this.$refs.input.value.toUpperCase())) {
          this.$emit("inputChar", {
            mask: true,
            value: this.$refs.input.value,
          });
          this.error = false;
        } else {
          this.$emit("inputChar", { mask: false });
        }
      } else {
        let firstSymb = val[0] != "-" && val[0] != "_";
        let lastSymb = val[val.length - 1] != "-" && val[val.length - 1] != "_";
        let mask = /^[0-9_-]*$/i.test(val);
        if (!mask) {
          val = val.substring(0, val.length - 1);
          this.$refs.input.value = val;
        }

        if (firstSymb && lastSymb && val.length >= 2) {
          this.$emit("inputNum", { mask: true, value: this.$refs.input.value });
          this.error = false;
        } else {
          this.$emit("inputNum", { mask: false });
        }
      }
    },
    onFocus() {
      this.activeLabel = true;
    },
    onBlur(e) {
      this.activeLabel = !!e.target.value;
    },
  },
};
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

  &_sm {
    #{$b}__field {
      height: 36px;
      padding: 8px 16px;
    }
    #{$b}__label {
      top: 6px;

      &.is-active {
        transform: translateY(-18px);
      }
    }
  }

  &__field {
    display: block;
    width: 100%;
    height: 55px;
    padding: 16px;
    font-size: 14px;
    line-height: (17/11);
    caret-color: $color-green;

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
    border: 1px solid $color-gray-middle;
    pointer-events: none;
    transition: border-color 0.3s ease;
  }

  &__label {
    position: absolute;
    left: 6px;
    top: 15px;
    padding: 0 10px;
    font-size: 14px;
    line-height: (17/11);
    color: $color-gray-middle;
    background-color: inherit;
    pointer-events: none;
    transition: color 0.3s ease, transform 0.3s ease;

    &.is-active {
      transform: translateY(-27px);
    }
  }

  &.is-error {
    #{$b} {
      &__outline {
        border-color: $color-red;
      }

      &__label {
        color: $color-red;
      }
    }
  }
}
</style>
