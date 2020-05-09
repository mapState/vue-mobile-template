<template>
  <div class="main">
    <div class="header">
      <img src="../../static/img/logo.png" alt class="logo" />
      <div class="headerRight">
        <div class="hr1">南京工业职业技术学院(本科)</div>
        <div class="hr2">102周年校庆</div>
      </div>
    </div>
    <div class="bgBox">
      <div class="title">答题闯关</div>
      <p class="detail">世纪风华，德业日新。 职教引领，卓哉吾校。 济济群贤，相约云端。</p>
      <span class="count">共有{{count}}次闯关</span>
      <img src="../../static/img/button.png" alt class="btn" @click="goBreak" />
    </div>
    <p class="rule">闯关成绩前500位，将会有精美小礼物奖励，成绩由答题计算得分，答题得分答错不得分成绩相同，时间越短越排前</p>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      count:999
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
  background: url("../../static/img/bga1.png");
  background-size: 100% 100%;
  width: 343px;
  height: 393px;
  margin: 26px auto;
}
.title {
  font-size: 23px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(91, 54, 7, 1);
  position: absolute;
  top: 34px;
  left: 88px;
  transform: rotate(-9deg);
}
.detail {
  position: absolute;
  top: 102px;
  left: 50%;
  transform: rotate(-9deg) translateX(-50%);
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
  transform: rotate(-9deg) translateX(-50%);
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
.rule {
  width: 211px;
  height:48px;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  line-height: 18px;
  margin: 13px auto;
}
</style>>

