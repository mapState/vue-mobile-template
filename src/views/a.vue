<template>
  <div class="main">
    <img src="../../static/img/aswerBg.png" alt="" class="img">
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
 background-color: #000;
}
.img{
  width:345px;
  height: 470px;
}

</style>>

