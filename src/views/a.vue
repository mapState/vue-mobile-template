<template>
  <div class="main">
    <div class="imgBox">
      <img src="../../static/img/back.png" alt="" class="img">
      <div class="dd">dd </div>
    </div>
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
 
}
.imgBox{
 width:306px;
  height:459px;
  position: relative;
}
.img{
  width:306px;
  height:459px;
  position: absolute;
  left:0;
  top:0;
}
.dd{
  position: absolute;
  right:0;
  top:0;
}

</style>>

