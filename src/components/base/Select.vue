<template>
  <div
    class="form-select__container"
    :class="[{ 'is-active': activeSelect }, className]"
    :id="id"
  >
    <select :name="name" class="form-select" ref="select">
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
        :selected="initial && initial === option.value"
      >
        {{ option.title }}
      </option>
    </select>
    <span class="form-select__selected-text" v-on:click="open">{{
      selectedTitle
    }}</span>
    <ul class="form-select__list">
      <li
        v-for="(option, index) in options"
        :key="index"
        v-on:click="change(option.title, option.value)"
        class="form-select__item"
      >
        {{ option.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Select",
  props: {
    className: String,
    name: String,
    id: String,
    options: Array,
    initial: String
  },
  data() {
    return {
      selectedTitle: this.initial ? this.options.find(item => item.value === this.initial).title : this.options[0].title,
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
    change(title, value) {
      this.$refs.select.value = value;
      this.activeSelect = !this.activeSelect;
      this.selectedTitle = title;
      this.$emit("changeSelect", { value: value });
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