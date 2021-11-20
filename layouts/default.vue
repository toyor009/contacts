<template lang="pug">
  v-app(dark)
    v-app-bar( fixed app).font-weight-medium.white--text.elevation-4
    v-main
      nuxt
    v-footer(app)
      
</template>

<script>
export default {
  data() {
    return {
      title: ""
    };
  }
};
</script>
