<template>
  <div class="main">
    <div class="header">
      <img src="../../static/img/logo.png" alt class="logo" />
      <h4 class="title">南京工业职业技术学院(本科)</h4>
      <span class="total">共20102910次祝福</span>
    </div>
    <vue-baberrage :isShow="barrageIsShow" :barrageList="barrageList" :loop="barrageLoop">
      <template v-slot:default="slotProps">
        <img :src="slotProps.item.avatar" alt class="avatar" />
        <span class="dm" @click="lookDm(slotProps.item)">{{slotProps.item.msg}}</span>
      </template>
    </vue-baberrage>
    <div class="footer">
      <div class="write" @click="sendDm">
        <img src="../../static/img/edit.png" alt class="editIcon" />
        <span>写祝福</span>
      </div>
      <div class="fbtn">云合影</div>
      <div class="fbtn" @click="goAnswer">答题闯关</div>
    </div>
    <div class="mask" v-show="showDia" @click="showDia=false"></div>
    <div class="dialog" v-show="showDia">
        <div class="t">dd</div>
    </div>
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
      msg: "祝母校越来越好！",
      barrageIsShow: true,
      currentId: 0,
      barrageLoop: true,
      barrageList: [],
      showDia: false
    };
  },
  mounted() {
    this.addToList();
  },
  methods: {
    addToList() {
      for (let i = 0; i <= 10; i++) {
        this.barrageList.push({
          id: ++this.currentId,
          avatar:
            "https://hbimg.huabanimg.com/245ebe4ab26a7b1cd14d278bff43932506e80cbf234a2-Tb5Sny_fw658/format/webp",
          msg: this.msg + i + "",
          time: i,
          type: MESSAGE_TYPE.NORMAL
        });
      }
    },
    lookDm(data) {
      console.log(data);
    },
    sendDm() {
      this.showDia = true;
    },
    goAnswer() {
      this.$router.push({ path: "/answer" });
    }
  }
};
</script>
<style scoped>
.main {
  background: url("../../static/img/bg1.png");
  background-size: 100% 100%;
  height: 100%;
  position: fixed;
  width: 100%;
  font-size: 16px;
}
.header {
  width: 100%;
  padding-top: 11px;
  padding-left: 13px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}
.logo {
  width: 31px;
  height: 31px;
  margin-right: 7px;
}
.title {
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  text-shadow: 0px 1px 5px rgba(125, 88, 0, 0.23);
  margin-right: 7px;
}
.total {
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(218, 237, 254, 1);
  text-shadow: 0px 1px 5px rgba(125, 88, 0, 0.23);
}
.avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  float: left;
  margin-right: 7px;
}
.dm {
  float: left;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #fff !important;
  position: relative;
  top: 3px;
}
.footer {
  position: fixed;
  bottom: 12px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.write {
  display: flex;
  align-items: center;
  width: 111px;
  height: 44px;
  background: rgba(255, 255, 255, 1);
  border-radius: 22px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(255, 150, 17, 1);
}
.editIcon {
  width: 21px;
  height: 21px;
  margin-left: 21px;
}
.fbtn {
  width: 102px;
  height: 48px;
  background: url("../../static/img/btn.png");
  background-size: 100% 100%;
  text-align: center;
  line-height: 48px;
}
.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.6);
}
.dialog {
  width: 305px;
  height: 488px;
  position: fixed;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  background-color: #fff;
  background: url("../../static/img/dia.png");
  background-size: 100% 100%;
  z-index: 20;
}

</style>
