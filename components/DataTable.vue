<template lang="pug">
  v-data-table(
    :headers="headers"
    :items="items"
    item-key="email"
    dense
  ).elevation-1.mt-10
</template>

<script>
export default {
  props: ["headers", "items"],
  data() {
    return {};
  }
};
</script>

<style lang="sass" scoped>
.v-data-table
  max-width: 100%
</style>
