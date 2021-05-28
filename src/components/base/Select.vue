<template>
  <div
    class="form-select__container"
    :class="[{ 'is-active': activeSelect }, className]"
    :id="id"
  >
    <select :name="name" class="form-select" ref="select">
      <option v-for="option in options" :key="option.id" :value="option">
        {{ option }}
      </option>
    </select>
    <span class="form-select__selected-text" v-on:click="open">{{
      selected
    }}</span>
    <ul class="form-select__list">
      <li
        v-for="option in options"
        :key="option.id"
        v-on:click="change(option)"
        class="form-select__item"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Select",
  components: {},
  props: {
    className: String,
    name: String,
    id: String,
    options: Array,
  },
  data() {
    return {
      selected: this.options[0],
      activeSelect: false,
      //id: this.id,
    };
  },
  created() {
    document.body.addEventListener("click", (e) => {
      if (!e.target.closest("#" + this.id)) {
        this.activeSelect = false;
      }
    });
  },
  methods: {
    open() {
      this.activeSelect = !this.activeSelect;
    },
    change(option) {
      this.$refs.select.value = option;
      this.activeSelect = !this.activeSelect;
      this.selected = option;
    },
  },
};
</script>

<style lang="scss">
.form-select {
  display: none;

  &__container {
    position: relative;
    width: 100%;
  }
  &__list {
    position: absolute;
    z-index: 2;
    display: none;
    width: 100%;
    right: 0px;
    background-color: white;
    border: 1px solid #0cd725;
    padding: 0 28px;
  }
  &__item:first-child {
    display: none;
  }
  &__item {
    height: 47px;
    display: flex;
    align-items: center;
    color: #acacac;
    cursor: pointer;
    &:hover {
      color: #303864;
    }
  }
  &__selected-text {
    display: flex;
    width: 100%;
    background-color: white;
    height: 55px;
    border: 1px solid #acacac;
    padding: 0 25px;
    color: #acacac;
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    &:after {
      content: "";
      position: absolute;
      right: 25px;
      top: 25px;
      border-top: 6px solid #303864;
      border-right: 5px solid transparent;
      border-left: 5px solid transparent;
    }
  }
  &__container.is-active &__selected-text {
    border-color: #0cd725;
  }
  &__container.is-active &__list {
    display: block;
  }
}
</style>