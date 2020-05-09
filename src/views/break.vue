<template>
  <div class="main">
    <div class="answerBox">
      <!-- <img src="../../static/img/back.png" alt="" class="bgimg"> -->
      <span class="tag">{{list[index]&&list[index].isMultiple?'多选':'单选'}}</span>
      <img src="../../static/img/dtlogo.png" alt class="avatar" />
      <div class="index">{{index+1}}/10</div>
      <div class="ansMain" v-if="!showResult">
        <div class="amTitle">{{list[index]&&list[index].name}}</div>
        <div class="opLisBoxt">
          <ul class="opList">
            <li
              class="option"
              :class="sel.includes(item.id)?'active':''"
              v-for="item in list[index].list"
              @click="selOption(item.id,item.isTrue)"
              :key="item.id"
            >
              <span>{{item.name}}</span>
              <div class="right" v-if="sel.includes(item.id)">
                <img v-if="item.isTrue" src="../../static/img/correct.png" alt class="resIcon" />
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
          <span>{{score}}</span>分
        </div>
        <span class="detail">共答对{{score/10}}道</span>
        <span class="detail">共用时{{totals}}秒</span>
      </div>
       <div class="timeout" v-show="!clicked&&timeEnd&&showNext&&index!=9">时间到 未答题</div>
      <div v-if="!showResult" class="bottomBox">
        <div class="time zbtn" v-show="showTime">{{time}}s</div>
        <div class="next looka zbtn" v-if="showLookBtn" @click="viewScore">查看成绩</div>
        <div class="next zbtn xyt" v-show="showNext&&index!=9" @click="next">下一题
        </div>
      </div>
    </div>
    <van-overlay :show="show">
      <div class="wrapper">
        <div class="block" @click.stop>
          <img src="../../static/img/top.png" alt class="btop" />
          <div class="topText">
            <span class="topText1">填写信息</span>
            <span class="topText2">有机会获得礼物一份</span>
          </div>
          <van-field v-model="form.name" placeholder="姓名" />
          <van-field v-model="form.phone" placeholder="手机号" />
          <van-field v-model="form.email" placeholder="邮箱(选填)" />
          <van-field v-model="form.address" placeholder="收货地址(选填)" />
          <div class="btnBox">
            <div class="drap" @click="show=false">跳过</div>
            <div class="submit" @click="submit">确定</div>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
let startTime = 0,
  endTime = 0;
export default {
  name: "Home",
  data() {
    return {
      sel: [],
      index: 0, //第几题
      showTime: true,
      showNext: false,
      timer: null,
      time: 10,
      list: [],
      showResult: false, //展示答案
      isMultiple: true,
      answerList: [],
      score: 0,
      showLookBtn: false, //查看成
      totals: 0,
      show: false,
      form: {
        name: "",
        phone: "",
        email: "",
        address: ""
      },
      timeEnd:false,
      clicked:false
    };
  },
  mounted() {
    console.log(this.$cookie.get("token"));
     if (this.$cookie.get("token") === null) {
      window.location.href =
        `http://zuitiankeji.com/school-service/api/auth?type=1&url=` +
        window.encodeURIComponent(location.href);
    }else{
      //this.getUserInfo()
    }
    this.getList();
    this.countdown();
    startTime = new Date().getTime();
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    getUserInfo() {
      this.axios.get("/api/getUserInfo").then(res => {
        //this.$toast(data.userName)
        localStorage.setItem("user", JSON.stringify(res.data));
        console.log(res);
      });
    },
    submit() {
      console.log(this.form);
      if (this.form.name == "" || this.form.phone == "") {
        this.$toast.fail("姓名、手机号不能为空");
      } else {
        this.axios
          .post("/api/saveUser", {
            receivaPhone: this.form.phone,
            receivaName: this.form.name,
            receivaEmail: this.form.email,
            receivaAddress: this.form.address
          })
          .then(res => {
            this.show = false;
            console.log(res);
            this.$toast.success(res.message);
          });
      }
    },
    saveScore() {
      this.axios
        .post("/userAnswer/saveAnswer", {
          score: this.score,
          time:this.totals
        })
        .then(res => {
          console.log(res);
        });
    },
    viewScore() {
      this.saveScore();
      this.show = true;
      setTimeout(()=>{
        this.showResult = true;
      },1000)
    },
    countdown() {
      this.timer = setInterval(() => {
        --this.time;
        if (this.time <= 0) {
          this.timeEnd=true
          //时间到 下一题
          this.showTime = false;
          this.time = 10;
          clearInterval(this.timer);
          this.showNext = true;
        }
      }, 1000);
    },
    goBlessing() {
      this.$router.push({ path: "/blessing" });
    },
    getList() {
      this.axios.get("/question/list").then(res => {
        //console.log(res);
        let gkList = [...res.data];
        gkList.forEach(e => {
          var count = 0;
          e.list.forEach(item => {
            if (item.isTrue) {
              count++;
            }
          });
          if (count > 1) {
            e.isMultiple = true;
          } else {
            e.isMultiple = false;
          }
        });
        console.log(gkList);
        this.list = res.data;
      });
    },
    //判断对错 得分
    isArr(arr1, arr2) {
      return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
    },
    next() {
      if (this.index < 9) {
        this.clicked=false
        // var str=''
        // if(this.sel.length>0){
        //     str=this.sel.join(',')
        // }
        // this.answerList.push(str)
        let arr1 = [];
        this.list[this.index].list.forEach(item => {
          item.isTrue && arr1.push(item.id);
        });
        if (this.isArr(arr1, this.sel)) {
          this.score += 10;
          console.log(this.score);
        }
        this.sel = [];
        this.index++;
        this.time = 10;
        this.showTime = true;
        clearInterval(this.timer);
        this.countdown();
        this.showNext = false;
      }
    },
    selOption(id, isTrue) {
      this.clicked=true
      let isMultiple = this.list[this.index].isMultiple;
      console.log(this.score);
      if (!this.showTime) {
        this.showNext = true;
        return;
      }
      if(!isMultiple){
          this.showTime=false
      }
      //this.showTime = false;
      if (!this.sel.includes(id)) {
        if (this.sel.length <= 0) {
          this.sel.push(id);
        } else {
          if (isMultiple) {
            this.sel.push(id);
          }
        }
      }else{
        return
      }
      if (this.index === 9) {
        //最后一题
        let arr1 = [];
        this.list[this.index].list.forEach(item => {
          item.isTrue && arr1.push(item.id);
        });

        if (this.isArr(arr1, this.sel)) {
          this.score += 10;
        }

        endTime = new Date().getTime();
        this.totals = (endTime - startTime) / 1000;
        this.showLookBtn = true;
      } else {
        this.showNext = true;
      }
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
  display: flex;
  flex-direction: column;
  align-items: center;
}
.answerBox {
  position: relative;
  background: url("../../static/img/back.png");
  background-size:100% 100%;
  width: 375px;
  height: 490px;
  margin-top:66px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tag {
  width: 34px;
  height: 18px;
  line-height: 17px;
  background: rgba(255, 221, 217, 1);
  border-radius: 0px 5px 0px 5px;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(255, 37, 14, 1);
  position: absolute;
  right:13px;
  top:12.5px;
  text-align: center;
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
  margin-top: 14px;
  transform: translateX(7px);
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
  line-height: 1.5;
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
  box-shadow: 0 3px 2px #ffb90b;
  border-radius: 20px;
  text-align: center;
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
  position: relative;
}
.timeout{
  position:absolute;
  bottom:124px;
  left:50%;
  transform: translateX(-50%);
  font-size: 14px;
  color: rgba(255, 37, 14, 1);
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
  margin-bottom: 56px;
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
  margin-bottom: 9px;
}
.bottomBox {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  bottom: 60px;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 305px;
  height: 395px;
  background-color: #fff;
  position: relative;
}
.btop {
  width: 305px;
  height: 101px;
}
.btnBox {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 35px;
}
.drap {
  text-align: center;
  line-height: 44px;
  width: 113px;
  height: 44px;
  background: rgba(221, 221, 221, 1);
  border-radius: 22px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  margin-right: 20px;
}
.submit {
  text-align: center;
  line-height: 44px;
  width: 113px;
  height: 44px;
  background: linear-gradient(
    124deg,
    rgba(255, 217, 67, 1),
    rgba(255, 185, 11, 1)
  );
  border-radius: 22px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(125, 73, 9, 1);
}
.topText {
  position: absolute;
  top: 0;
  left: 0;
  width: 305px;
  height: 101px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.topText1 {
  font-size: 22px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  margin-bottom: 10px;
}
.topText2 {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.looka {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(125, 73, 9, 1);
}
.zbtn{
  transform: translateY(-14px);
}
.bgimg{
  position:absolute;
  width:100%;
  height:100%;
  top:0;
  left:0;
  z-index: -1;
  }
  .looka{
    margin-left:10px;
  }
  .xyt{
    margin-left:10px;
  }
</style>>

