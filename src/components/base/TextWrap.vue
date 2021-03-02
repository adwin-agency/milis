<template>
  <div class="text-wrap">
    <p class="text-wrap__content" :class="{'is-expanded': expanded}">
      <slot></slot>
    </p>
    <span class="text-wrap__expand" @click="onExpandClick">Развернуть</span>
  </div>
</template>

<script>
export default {
  name: 'TextWrap',
  data() {
    return {
      expanded: false
    }
  },
  methods: {
    onExpandClick() {
      this.expanded = true
    }
  }
}
</script>

<style lang="scss">
.text-wrap {
  $b: &;

  &__content {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;

    &.is-expanded {
      -webkit-line-clamp: initial;

      & + #{$b}__expand {
        display: none;
      }
    }
  }

  &__expand {
    display: none;
    margin-top: 10px;
    text-decoration: underline;
    color: $color-blue;
    cursor: pointer;

    @supports (-webkit-line-clamp: 4) {
      display: inline-block;
    }
  }
}
</style>
