<template>
  <div class="main">
    <div class="header">
      <img src="../../static/img/logo.png" alt class="logo" />
      <div class="headerRight">
        <div class="hr1">南京工业职业技术学院(本科)</div>
        <div class="hr2">1918-2020建校102周年</div>
      </div>
    </div>
    <span class="total">共有{{count}}次祝福</span>
    <div @click="goBlessing" class="btn">参与祝福</div>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
        count:''
    };
  },
  mounted() {
    this.getCount()
    if (this.$cookie.get("token") === null) {
      window.location.href =
        `http://zuitiankeji.com/school-service/api/auth?type=1&url=` +
        window.encodeURIComponent(location.href);
    }else{
        this.getUserInfo()
    }
  },
  methods: {
    goBlessing() {
      this.$router.push({ path: "/blessing"});
    },
    getUserInfo() {
      this.axios.get("/api/getUserInfo").then(res => {
          console.log(res);
          //this.id=res.data.id
      });
    },
    //获取祝福次数
    getCount() {
      this.axios.get("/question/getMessageCount").then(res => {
        this.count=res.data
        console.log(res);
      });
    },
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
.header {
  display: flex;
  align-items: center;
  position:absolute;
  top:20px;
  left:15px;
}
.logo {
  width: 31px;
  height: 31px;
  margin-right: 10px;
}
.headerRight {
  height: 31px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.hr1 {
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
}
.hr2 {
  font-size:12px;
  font-family:PingFang SC;
  font-weight:400;
  color:rgba(255,255,255,1);
}
.total {
  position: absolute;
  bottom: 144px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.btn {
  position: absolute;
  bottom: 75px;
  left: 50%;
  transform: translateX(-50%);
  width: 173px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  text-shadow: 0px 1px 3px rgba(130, 92, 11, 0.53);
  background: linear-gradient(
    124deg,
    rgba(255, 217, 67, 1),
    rgba(243, 228, 61, 1)
  );
  box-shadow: 0px 4px 13px 0px rgba(14, 109, 57, 0.35);
  border-radius: 22px;
}
</style>>

