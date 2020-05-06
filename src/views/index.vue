<template>
  <div class="home">

     <div @click="goBlessing" class='btn'>参与祝福</div>
  </div>
</template>
<script>
import { MESSAGE_TYPE } from "vue-baberrage";
export default {
  name: "Home",
  data() {
    return {
      
    };
  },
  mounted() {
    
  },
  methods: {
    goBlessing(){
      this.$router.push({path:'/blessing'})
    }
  }
};
</script>
<style scoped>
  .btn{
    position: absolute;
    bottom:20px;
    left:50%;
    transform: translateX(-50%);
  }
</style>>

