<template>
  <div class="main">
    <div class="header">
      <img src="../../static/img/logo.png" alt class="logo" />
      <h4 class="title">南京工业职业技术学院(本科)</h4>
      <span class="total">共{{total}}次祝福</span>
    </div>
     <vue-baberrage 
      :isShow= "barrageIsShow"
      :barrageList = "barrageList"
      :loop = "barrageLoop"
      :boxHeight="421"
      :lanesCount="10"
      >
        <template v-slot:default="slotProps">
          <img :src="slotProps.item.userImage" alt class="avatar" />
          <span class="dm" :class="{'red':slotProps.item.isMy}" @click="lookDm(slotProps.item.id)">{{slotProps.item.msg}}</span>
        </template>
    </vue-baberrage>
    <div class="footer">
      <div class="write" @click="sendDm">
        <img src="../../static/img/edit.png" alt class="editIcon" />
        <span>写祝福</span>
      </div>
    </div>
    <div class="mask" v-show="showDia" @click="showDia=false"></div>
    <div class="dialog" v-show="showDia">
          <div class="diaMain">
              <div class="selBox">
                <select v-model="form.type">
                  <option value="" disabled selected hidden>请选择身份</option>
                  <option value="0">系统</option>
                  <option value="1">学子</option>
                  <option value="2">教工</option>
                  <option value="3">游客</option>
                </select>
              </div>
              <input type="text" v-model="form.joinYear" class="input" placeholder="请填写入学/入职年份">
              <input type="text" v-model="form.joinDepartment" class="input" placeholder="请填写院系/部门">
              <input type="text" v-model="form.userName" class="input" placeholder="请填写姓名">
              <textarea  class="textarea" placeholder="请填写您的祝福语" v-model="form.messageContent"  maxlength="50">    
              </textarea>
              <!-- maxlength="50" -->
              <div class="sendBtn" @click="sengMessage">
                  送出祝福
              </div>
          </div>
    </div>
    <van-overlay :show="showDma" @click="showDma = false">
        <div class="wrapper">
          <div class="block">
              <div class="detailTop">
                  <img :src="selDm.userImage" alt="">
                  <div class="dtopText">
                      <span class="dtopText1">{{selDm.userName}}</span>
                      <span class="dtopText2">{{selDm.createDate}}</span>
                  </div>
              </div>
              <p class="detailMiddle">{{selDm.messageContent}}</p>
              <p class="detailBottom">{{selDm.type===0?'系统':(selDm.type===1?'学子':(selDm.type===2?'教工':'游客'))}} {{selDm.user.receiveName}} {{selDm.user.joinDepartment}} {{selDm.user.joinYear}}</p>
          </div>
        </div>
    </van-overlay>
  </div>
</template>
<script>
/**
 * vue-baberrage 文档
 * https://github.com/superhos/vue-baberrage/blob/master/docs/zh/README.md#plugin-options
 */
import { MESSAGE_TYPE } from "vue-baberrage";
let count=0;
export default {
  name: "Home",
  data() {
    return {
      msg: "祝母校越来越好！",
      barrageIsShow: true,
      currentId: 0,
      barrageLoop: false,
      barrageList: [],
      list:[],
      showDia: false,
      showDma:false,
      form:{
        type:'',
        joinYear:'',
        joinDepartment:'',
        userName:'',
        messageContent:'',
        messageType:1,
        id:''
      },
      pageNo:1,
      pageSize:10,
      total:'',
      selDm:{
        type:3,
        user:{
          receiveName:'',
          joinDepartment:'',
          joinDepartment:'',
          joinYear:''
        }
      },
      disableSend:false,
      timer:null,
    };
  },
  mounted() {
    this.getCount()
    //this.getUserInfo()
    this.getListByTime()
    if (this.$cookie.get("token") === null) {
      window.location.href =
        `http://zuitiankeji.com/school-service/api/auth?type=1&url=` +
        window.encodeURIComponent(location.href);
    }else{
      this.getUserInfo()
    }
  },
  methods: {
    getListByTime(){
        this.getMessage()
        this.timer=setTimeout(this.getListByTime,3000)
    },
    addToList() {
      for (let i = 0; i <= 10; i++) {
        this.barrageList.push({
          id: ++this.currentId,
          userImage:
            "https://hbimg.huabanimg.com/43fae7ad563ed61814c76bbe1cc373e7ff61000e2cd1f-DC5YBB_fw658/format/webp",
          msg: this.msg + i + "22222",
          time: 5,
          type: MESSAGE_TYPE.NORMAL
        });
      }
      console.log(this.barrageList)
    },
    //获取祝福数据列表
    getMessage(){
        this.axios.get("/leaveMessage/list",{
          params:{
            messageType:1,
            pageNo:this.pageNo,
            pageSize:this.pageSize
          }
        }).then(res => {
          console.log(res)
          let list=[...res.data]
          if(res.data.length>0){
              list.forEach((item,index) => {
                  item.msg=item.messageContent
                  item.time=2
                  item.type=MESSAGE_TYPE.NORMAL
                  console.log(item)
                  this.list.push(item)
                  this.barrageList.push(item)
              });
              this.pageNo++
              // this.barrageList.push(...list)
              console.log(this.barrageList)
          }else{
            clearTimeout(this.timer)
          }
          console.log(this.barrageList)
        });
    },
    //获取祝福数据 单个
    getMessageById(id){
        this.axios.get("/leaveMessage/list",{
          params:{
            id
          }
        }).then(res => {
          console.log(res)
           this.selDm=res.data[0]
          this.showDma=true
        });
    },
    //发送祝福
    sengMessage(){
      console.log(this.form)
      let {messageContent,joinDepartment,joinYear,type}=this.form
      if(messageContent===''){
        this.$toast('请认真填写祝福')
          return
      }
      this.disableSend=true
      this.form.type=this.form.type-0
      this.axios.post("/leaveMessage/saveMessage",this.form).then(res => {
          console.log(res.data)
          let dm={...res.data}
          dm.msg=dm.messageContent
          dm.time=2
          dm.type=MESSAGE_TYPE.NORMAL
          dm.isMy=true
          this.barrageList.push(dm)
          this.total++
          this.$toast.success(res.message)
          this.showDia=false
          this.disableSend=false
      }).catch(()=>{
          this.disableSend=false
      });
    },
    lookDm(id) {
      this.getMessageById(id)
    },
    sendDm() {
      this.showDia = true;

    },
    goAnswer() {
      this.$router.push({ path: "/answer" });
    },
     getUserInfo() {
      this.axios.get("/api/getUserInfo").then(res => {
        //this.$toast(data.userName)
        this.form.id=res.data.id
        console.log(res.data);
      });
    },
    getCount() {
      this.axios.get("/question/getMessageCount").then(res => {
        this.total=res.data
        console.log(res);
      });
    },
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
.baberBox{
  height: 410px;
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
  width:100%;
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
    height: 274px;
    background: url("../../static/img/xqBg.png");
    background-size: 100% 100%;
  }
  .detailTop{
    margin-top:90px;
    margin-left: 32px;
    display: flex;

  }
  .detailTop > img{
    width:31px;
    height:31px;
    border-radius:50%;
    margin-right: 8px;
  }
  .dtopText{
    height: 31px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .dtopText1{
    font-size:15px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(127,70,17,1);
  }
  .dtopText2{
    font-size:12px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(127,70,17,1);
  }
  .detailMiddle{
    width:238px;
    min-height: 39px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    margin: 38px auto;
    margin-bottom:0;
    font-size:14px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(0,0,0,1);
    line-height:24px;
  }
  .detailBottom{
    font-size:12px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(127,70,17,1);
    text-align: center;
    margin-top:24px;
  }
  .red{
    color: rgba(255, 150, 17, 1) !important;
  }
  .stage{
     width: 100%;
    height: 100%;
    position: relative;
  }
</style>
