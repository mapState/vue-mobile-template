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
      <!-- <div class="fbtn">云合影</div>
      <div class="fbtn" @click="goAnswer">答题闯关</div> -->
    </div>
    <div class="mask" v-show="showDia" @click="showDia=false"></div>
    <div class="dialog" v-show="showDia">
          <div class="diaMain">
              <div class="selBox">
                <select v-model="form.ids">
                  <option value="" disabled selected hidden>请选择身份</option>
                  <option value ="saab">Saab</option>
                  <option value="opel">Opel</option>
                  <option value="audi">Audi</option>
              </select>
              </div>
              <div class="selBox">
                <select  v-model="form.time">
                  <option value="" disabled selected hidden>入学/入职年份</option>
                  <option value ="saab">Saab</option>
                  <option value="opel">Opel</option>
                  <option value="audi">Audi</option>
              </select>
              </div>
              <input type="text" v-model="form.section" class="input" placeholder="请填写院系/部门">
              <input type="text" v-model="form.name" class="input" placeholder="请填写姓名">
              <textarea  class="textarea" placeholder="请填写您的祝福语" v-model="form.message"  maxlength="30">    
              </textarea>
              <!-- maxlength="50" -->
              <div class="sendBtn">
                  送出祝福
              </div>
          </div>
        </div>
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
      showDia: false,
      showDm:false,
      form:{
        ids:'',
        time:'',
        section:'',
        name:'',
        message:''
      }
    };
  },
  mounted() {
    //this.getMessage()
    //this.sengMessage()
    //this.addToList();
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
    //获取祝福数据
    getMessage(){
        this.axios.get("/api/getNo").then(res => {
          console.log(res)
        });
    },
    //发送祝福
    sengMessage(){
      this.axios.post("/api/saveMessage",{
        messageContent:'hh',
        userImage:'https://hbimg.huabanimg.com/8970d15467295cef30ed669edf956da4e1c3568719739-QSSTBq_fw658/format/webp'
      }).then(res => {
          console.log(res)
        });
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
  justify-content: center;
  width:305px;
  height:44px;
  background: rgba(255, 255, 255, 1);
  border-radius: 22px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(255, 150, 17, 1);
  margin-bottom: 11px;
}
.editIcon {
  width: 21px;
  height: 21px;
}
.fbtn {
  width: 102px;
  height: 48px;
  background: url("../../static/img/btn.png");
  background-size: 100% 100%;
  text-align: center;
  line-height: 48px;
  font-size:16px;
  font-family:PingFang SC;
  font-weight:bold;
  color:rgba(255,255,255,1);
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
.diaMain{
  margin:90px auto;
  width:250px;
  height: 300px;
}
.selBox{
  border-bottom:1px solid #8F735D;
  margin-bottom:10px;
}
select{
  width:100%;
  padding:9px 0;
  border:none;
  font-size:14px;
  color:#7F4611;
}
input::-webkit-input-placeholder{ 
  color:#7F4611;
  font-size:14px;
}
.input{
    width:250px;
    border:none;
    border-bottom:1px solid #8F735D;
    padding:9px 0;
    font-size:14px;
    margin-bottom:10px;
}
.textarea{
  font-size:14px;
  width:250px;
  height: 50px;
  border:none;
  border-bottom:1px solid #8F735D;
}
 textarea::-webkit-input-placeholder {
        /* WebKit browsers */
        color: #7F4611;
    }
    textarea:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #7F4611;
    }
    textarea::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #7F4611;
    }
    textarea::-ms-input-placeholder {
        /* Internet Explorer 10+ */
        color: #7F4611;
    }
    .sendBtn{
      margin-top: 33px;
      text-align: center;
      line-height:44px;
      width:250px;
      height:44px;
      background:linear-gradient(124deg,rgba(255,150,17,1),rgba(255,181,5,1));
      border-radius:5px;
      font-size:16px;
      font-family:PingFang SC;
      font-weight:bold;
      color:rgba(255,255,255,1);
    }

    .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 305px;
    height: 270px;
    background: url("../../static/img/xqBg.png");
    background-size: 100% 100%;
  }
</style>
