<template>
  <div>
    <input
      type="radio"
      :name="name"
      :id="id"
      :class="radioClass"
      :checked="checked"
      :availible="availible"
    />
    <label :for="id" :class="labelClass" @click="checkPay">{{
      labelText
    }}</label>
  </div>
</template>

<script>
export default {
  name: "Radio",
  components: {},
  props: {
    labelText: String,
    name: String,
    id: String,
    labelClass: String,
    radioClass: String,
    checked: Boolean,
    availible: Boolean,
  },
  data() {
    return {};
  },
  created() {
    if (this.availible && this.checked) {
      this.$emit("updatePay", { availible: true });
    }
  },
  methods: {
    checkPay() {
      this.$emit("updatePay", { availible: this.availible });
    },
  },
};
</script>

<style lang="scss">
</style>