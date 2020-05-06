<template>
  <div class="home">
    <vue-baberrage :isShow="barrageIsShow" :barrageList="barrageList" :loop="barrageLoop">
      <template v-slot:default="slotProps">
        <span style="color: #f60">{{slotProps.item.msg}}</span>
      </template>
    </vue-baberrage>
  </div>
</template>
<script>
/**
 * vue-baberrage 文档
 * https://github.com/superhos/vue-baberrage/blob/master/docs/zh/README.md#plugin-options
 */
import { MESSAGE_TYPE } from "vue-baberrage";
export default {
  name: "Home",
  data() {
    return {
      msg: "Hello vue-baberrage",
      barrageIsShow: true,
      currentId: 0,
      barrageLoop: true,
      barrageList: []
    };
  },
  mounted() {
    this.addToList();
  },
  methods: {
    addToList() {
      for (let i = 0; i <= 100; i++) {
        this.barrageList.push({
          id: ++this.currentId,
          avatar:
            "https://hbimg.huabanimg.com/f217037368b35201aa8344e79e4c193591af7c574a0bb-WwKqvG_fw658/format/webp",
          msg: this.msg + i + "",
          time: i % 10,
          type: MESSAGE_TYPE.NORMAL
        });
      }
    }
  }
};
</script>
<style>
</style>
