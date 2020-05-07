<template>
  <div class="main">
   
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    goBlessing() {
      this.$router.push({ path: "/blessing" });
    }
  }
};
</script>
<style scoped>
.main {
  background: url('../../static/img/bg.png');
  background-size: 100% 100%;
  height: 100%;
  position: fixed;
  width: 100%;
}

</style>>

