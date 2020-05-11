<template>
  <div class="main">
    <div class="header">
      <img src="../../static/img/logo.png" alt class="logo" />
      <div class="headerRight">
        <div class="hr1">南京工业职业技术学院(本科)</div>
        <div class="hr2">建校102周年云校庆</div>
      </div>
    </div>
    <div class="bgBox">
      <!-- <div class="title">答题闯关</div> -->
      <!-- <p class="detail">世纪风华，德业日新 职教引领，卓哉吾校 济济群贤，相约云端</p> -->
      <span class="count">共有{{count}}次闯关</span>
      <img src="../../static/img/misson complete.png" alt class="btn" @click="goBreak" />
    </div>
    <img src="../../static/img/word.png" alt="" class="rule">
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      count:0
    };
  },
  mounted() {
    this.getNum()
     if (this.$cookie.get("token") === null) {
      window.location.href =
        `http://zuitiankeji.com/school-service/api/auth?type=1&url=` +
        window.encodeURIComponent(location.href);
    }else{
        this.getUserInfo()
    }
  },
  methods: {
    getNum(){
        this.axios.get("/question/getAnswerCount").then(res => {
        this.count=res.data
      });
    },
    goBlessing() {
      this.$router.push({ path: "/answer" });
    },
    goBreak() {
      this.$router.push({ path: "/break" });
    },
    getUserInfo() {
      this.axios.get("/api/getUserInfo").then(res => {
        //this.$toast(data.userName)
        localStorage.setItem("user", JSON.stringify(res.data));
        console.log(res);
      });
    },
  }
};
</script>
<style scoped>
.main {
  background: url("../../static/img/bga.png");
  background-size: 100% 100%;
  height: 100%;
  position: fixed;
  width: 100%;
}
.header {
  display: flex;
  align-items: center;
  padding-top: 17px;
  padding-left: 16px;
  box-sizing: border-box;
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
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.bgBox {
  position: relative;
  background: url("../../static/img/one.png");
  background-size: 100% 100%;
  width: 295px;
  height: 384px;
  margin: 26px auto;
  transform: rotate(-9deg);
}
.title {
  font-size: 23px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(91, 54, 7, 1);
  position: absolute;
  top: 34px;
  left: 88px;
  /* transform: rotate(-9deg); */
}
.detail {
  position: absolute;
  top: 102px;
  left: 50%;
  transform: translateX(-50%);
  width: 187px;
  height: 105px;
  font-size: 18px;
  line-height: 30px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(247, 101, 54, 0.6);
}
.count {
  position: absolute;
  bottom: 112px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(157, 103, 14, 1);
  line-height: 35px;
}
.btn {
  width: 200px;
  height: 78px;
  position: absolute;
  bottom: 38px;
  left: 50%;
  transform: translateX(-50%);
}
/* .rule{
  width: 212px;
  text-align-last: justify;
    -moz-text-align-last: justify ;
    text-align: justify;
    text-justify: distribute-all-lines; 
    display: block; 
} */
.rule {
  width: 212px;
  height:48px;
  display: block;
  margin: 14px auto;
}
</style>>

