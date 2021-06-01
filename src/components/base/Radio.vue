<template>
  <div>
    <input
      type="radio"
      :name="name"
      :id="id"
      :class="radioClass"
      :checked="checked"
      :availible="availible"
      :shopid="shopid"
      :value="value"
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
    shopid: String,
    value: String,
  },
  data() {
    return {};
  },
  created() {
    if (this.availible && this.checked) {
      this.$emit("updatePay", { availible: true, prefix: this.value });
    } else if (!this.availible && this.checked) {
      this.$emit("updatePay", { availible: false, prefix: this.value });
    }
  },
  computed: {},
  methods: {
    checkPay() {
      this.$emit("updatePay", {
        availible: this.availible,
        prefix: this.value,
      });
    },
  },
};
</script>

<style lang="scss">
</style>