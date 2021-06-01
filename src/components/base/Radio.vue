<template>
  <div>
    <input
      type="radio"
      :name="name"
      :id="id"
      :class="radioClass"
      :checked="checked"
      :shopid="shopid"
      :value="value"
      @change="$emit('change', value)"
    />
    <label :for="id" :class="labelClass">{{ labelText }}</label>
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
    shopid: String,
    value: String,
  },
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {},
};
</script>

<style lang="scss">
</style>