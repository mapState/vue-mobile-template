<template>
  <div class="main">
    <div class="answerBox">
      <span class="tag">多选</span>
      <img
        src="https://hbimg.huabanimg.com/2932c0b77cee341f75c87cada39e3177b34489c0118b8-g9qJzZ_fw658/format/webp"
        alt
        class="avatar"
      />
      <div class="index">1/20</div>
      <div class="ansMain" v-if="!showResult">
        <div class="amTitle">1、母校一贯的宗旨是什么？</div>
        <div class="opLisBoxt">
          <ul class="opList">
            <li class="option" v-for="(item,index) in 6" @click="selOption(index)" :key="index">
              <span>自强不息，厚德载物</span>
              <div class="right">
                <img v-if="true" src="../../static/img/correct.png" alt class="resIcon" />
                <img v-else src="../../static/img/error.png" alt class="resIcon" />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="result" v-if="showResult">
        <div class="resultTop">
          <span>最终成绩单</span>
        </div>
        <div class="score">
          <span>99</span>分
        </div>
        <span class="detail">共答对99道</span>
        <span class="detail">共用时60秒</span>
      </div>
      <div v-if="!showResult">
        <div class="lookBtn" v-if="index==20" @click="showResult=true">查看成绩</div>
        <div class="time" v-show="showTime">{{time}}s</div>
        <div class="next" v-show="!showTime">下一题</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      sel: [1, 2, 3],
      index: 2,
      showTime: true,
      timer: null,
      time: 10,
      list: 2,
      showResult: false //展示答案
    };
  },
  mounted() {
    this.getList();
    this.countdown();
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    countdown() {
      this.timer = setInterval(() => {
        --this.time;
        if (this.time <= 0) {
          //时间到 下一题
          this.time = 10;
          //直接下一题
        }
      }, 1000);
    },
    goBlessing() {
      this.$router.push({ path: "/blessing" });
    },
    getList() {
      this.axios.get("/question/list").then(res => {
        console.log(res);
      });
    },
    selOption(index) {
      console.log(index);
      this.showTime = false;
    }
  }
};
</script>
<style scoped>
.main {
  background: url("../../static/img/breakBg.png");
  background-size: 100% 100%;
  height: 100%;
  position: fixed;
  width: 100%;
}
.answerBox {
  position: relative;
  background: url("../../static/img/aswerBg.png");
  background-size: cover;
  width: 368px;
  height: 460px;
  margin: 66px auto;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tag {
  width: 31px;
  height: 17px;
  line-height: 17px;
  background: rgba(255, 221, 217, 1);
  border-radius: 0px 5px 0px 5px;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(255, 37, 14, 1);
  position: absolute;
  top: 14px;
  right: 15px;
  text-align: right;
}
.avatar {
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 1);
  border: 4px solid #fff;
  box-sizing: border-box;
  border-radius: 50%;
  margin-top: -12px;
}
.index {
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(147, 134, 117, 1);
  margin-top: 12px;
}
.ansMain {
  width: 257px;
}
.amTitle {
  width: 257px;
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(93, 76, 56, 1);
  margin-top: 20px;
  margin-bottom: 23px;
}
.opLisBoxt {
  width: 257px;
  height: 240px;
  overflow: hidden;
  overflow-y: scroll;
}
.opList {
  width: 257px;
  /* overflow-y: scroll; */
}
.option {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 11px 0;
  padding-left: 18px;
  background: rgba(252, 243, 232, 1);
  border-radius: 5px;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(127, 70, 17, 1);
  margin-bottom: 11px;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.active {
  background: rgba(253, 219, 178, 1);
  color: rgba(127, 70, 17, 1);
}
.right {
  width: 22px;
  height: 22px;
  position: absolute;
  right: 15px;
}
.resIcon {
  width: 22px;
  height: 22px;
}
.lookBtn {
  width: 112px;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(125, 73, 9, 1);
  background: linear-gradient(
    124deg,
    rgba(255, 217, 67, 1),
    rgba(255, 185, 11, 1)
  );
  border-radius: 20px;
  text-align: center;
  margin-top: 16px;
}
.time {
  width: 112px;
  height: 40px;
  background: url("../../static/img/count.png");
  background-size: 100% 100%;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  text-align: center;
  line-height: 40px;
  margin-top: 16px;
}
.next {
  width: 112px;
  height: 40px;
  background: url("../../static/img/next.png");
  background-size: 100% 100%;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  text-align: center;
  line-height: 40px;
  margin-top: 16px;
}
.result {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.resultTop {
  margin-top: 70px;
  background: url("../../static/img/result.png");
  background-size: 100% 100%;
  width: 160px;
  height: 40px;
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  text-align: center;
}
.resultTop > span {
  position: relative;
  top: 9px;
}
.score {
  margin-top: 50px;
  margin-bottom:56px;
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(220, 42, 23, 1);
}
.score > span {
  font-size: 78px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(220, 42, 23, 1);
}
.detail {
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(220, 42, 23, 1);
  margin-bottom:9px;
}
</style>>

