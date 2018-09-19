<template lang="html">
  <div class="market_resources">
    <div class="market_resources_con">
      <p class="resources_title" @click="isAudit">
        <span>批量收票请去我的报价</span><br>
        <span>模版发布收票价格</span>
      </p>
      <div class="market_resources_list">
        <el-row>
          <!-- <el-col :span="3"><div class="market_resources_title">票据类型</div></el-col> -->
          <el-col :span="4"><div class="market_resources_title acceptance">承兑行类型</div></el-col>
          <el-col :span="2"><div class="market_resources_title">期限</div></el-col>
          <el-col :span="2"><div class="market_resources_title">金额</div></el-col>
          <el-col :span="4"><div class="market_resources_title rate">利率</div></el-col>
          <el-col :span="3"><div class="market_resources_title">联系人</div></el-col>
          <el-col :span="3"><div class="market_resources_title">操作</div></el-col>
          <el-col :span="6"><div class="market_resources_title status">备注</div></el-col>
          
        </el-row>

        <el-row class="market_resources_box" v-for="(item,index) in noteList" :key="index" ref="market_resources_box">
          <!--  <el-col :span="3"><div class="market_resources_mes">{{item.billType}}</div></el-col> -->
          <el-col :span="4"><div class="market_resources_mes acceptance">{{item.acceptor}}</div></el-col>
          <el-col :span="2"><div class="market_resources_mes">{{item.timeLimit}}</div></el-col>
          <el-col :span="2"><div class="market_resources_mes">{{item.amountRange}}</div></el-col>
          <el-col :span="4"><div class="market_resources_mes rate" ref="rateL">
            {{item.interest}}{{sy}}
            <router-link to="/signUp" style="color:#f45643;text-decoration:none;" v-show="isLogin">登陆后可见</router-link>
          </div>
            </el-col>
          <el-col :span="3"><div class="market_resources_mes">{{item.contactsName}}</div></el-col>
          <el-col :span="3"><div class="market_resources_mes opera">
            <button type="button" name="button" @click="isReg">我要贴</button>
          </div></el-col>
          <el-col :span="6"><div class="market_resources_mes acceptance">{{item.note}}</div></el-col>
          <!-- <el-col :span="3"><div class="market_resources_mes status">
            <span v-show="item.status=='1'">已成交</span>
            <span v-show="item.status=='2'">收票中</span>
          </div></el-col> -->
          <!-- <div class="led" ref="led"  v-loading="loading">
          </div></el-col>
       
         <div class="led" ref="led"  v-loading="loading">
            <el-row v-for="(itemLed,index) in noteListLed" :key="index">
              <el-col :span="4"><div class="led_mes">{{itemLed.billType}}</div></el-col>
              <el-col :span="4"><div class="led_mes">{{itemLed.acceptor}}</div></el-col>
              <el-col :span="4"><div class="led_mes">{{itemLed.amountRange/10000}}w</div></el-col>
              <el-col :span="4"><div class="led_mes">{{itemLed.interest}}{{sy}}</div></el-col>
              <el-col :span="2"><div class="led_mes">王总</div></el-col>
              <el-col :span="3"><div class="led_mes"></div></el-col>
              <el-col :span="3"><div class="led_mes">

                <button type="button" name="button">我要贴</button>

              </div></el-col>
            </el-row>
          </div>

          </div> -->
          <!-- <p class="paging">
            <el-pagination
              background
              layout="prev, pager, next"
              @next-click="next(index)"
              @prev-click="prev(index)"
              @current-change="current"
              :current-page="pageN"
              :total="pageNum">
            </el-pagination>
          </p> -->

        </el-row>
      </div>
      <div class="market_resources_loadig" v-loading="true" v-show="marketResourcesLoadig">

      </div>
    </div>
  <Footer/>
  </div>
</template>

<script>
import {getCookie} from '@/assets/util'

export default {
  data(){
    return{
      sy:'%',
      isLogin:false,
      noteList:[],
      noteListLed:[],
      layout:0,
      loading:false,
      pageN:null,
      pageNum:10,
      marketResourcesLoadig:true
    }
  },
  components:{
    Footer:resolve=>require(['@/components/footer-all'],resolve)
  },
  methods:{
    getList(){
      this.axios.get(this.oUrl+'/resourceMarket/getAllInfo').then((res)=>{
        this.noteList=res.data;
        console.log(res.data);
        this.marketResourcesLoadig=false;
        if(!getCookie('Iud')){
          for(let v in this.noteList){
            this.noteList[v].interest='';
            this.sy='';
          }
          this.isLogin=true;
        }
      })
    },
    isReg(){
      console.log("123");
      let isAu = getCookie('isAu');//从cookie中获取用户是否认证
      console.log(isAu);
      if(isAu=='true'){
        this.$router.push('/stick');
      }else{
        alert("您还未通过审核，已为您跳转......");
        this.$router.push('/release/data');
      }
    },
    isAudit(){
      console.log("12345");
      let isAu = getCookie('Iud');
      this.axios.get(this.oUrl+"/getCompany?contactsId="+isAu).then((res)=>{
        console.log(res.data);
        if(res.data[0].role == "包装户"){
          this.$router.push("/release/template");
        }else{
          alert("您还未开通此权限！");
          //this.$router.push();
        }
      });
    }
    /*current(index){//页码跳转
      let sta=index*4;
      let Id=getCookie('Iud');
      this.axios.post(this.oUrl+'/resourceMarket/getByBuyerIdOfResoucePool',{
        "buyerId":Id,
        "start":sta,
        "page":4
      },
      {headers:{
        'Content-Type':'application/json'
      }}
      ).then((res)=>{
        this.noteListLed=res.data;
      })
    },
    next(index){//下一页数据
      let _this=this;
      _this.loading=true;
      _this.layout=_this.layout+4;
      let Id=_this.noteList[index].buyerId;
      _this.axios.post(this.oUrl+'/resourceMarket/getByBuyerIdOfResoucePool',{
        "buyerId":Id,
        "start":_this.layout,
        "page":4
      },
      {headers:{
        'Content-Type':'application/json'
      }}
      ).then((res)=>{
        _this.loading=false;
        _this.noteListLed=res.data;
      })
    },
    prev(index){//上一页数据
      let _this=this;
      _this.loading=true;
      _this.layout=_this.layout-4;
      let Id=_this.noteList[index].buyerId;
      _this.axios.post(_this.oUrl+'/resourceMarket/getByBuyerIdOfResoucePool',{
        "buyerId":Id,
        "start":_this.layout,
        "page":4
      },
      {headers:{
        'Content-Type':'application/json'
      }}
      ).then((res)=>{
        _this.loading=false;
        _this.noteListLed=res.data;
      })
    },*/
    /*showTurn(index){
      let _this=this;
      let Id=_this.noteList[index].buyerId;
      if(!getCookie('Iud')){
        _this.$router.push('/signUp/password')
      }else{
        _this.axios.post(this.oUrl+'/resourceMarket/getByBuyerIdOfResoucePool',{
          "buyerId":Id,
          "start":_this.layout,
          "page":4
        },
        {headers:{
          'Content-Type':'application/json'
        }}
        )
      }
    },
    hideTurn(index){
      let _this=this;
      _this.$refs.market_resources_box[index].$el.style.height='40px';
      _this.$refs.showTurn[index].style.display='block';
      _this.$refs.hideTurn[index].style.display='none';
    },*/
    
  },
  created(){
    this.getList()
  }
}
</script>

<style lang="scss">
.market_resources{
  width: 100%;
  height:100%;
  .market_resources_con{
    width: 80%;
    margin:0 auto;
    height:100%;
    padding-top:3%;
    .resources_title{
      width: 15%;
      min-height: 70px;
      background-color: rgba(255,71,46,1);
      color:white;
      border-radius:8px;
      cursor:pointer;
      font-size: 15px;
      padding-top:1.2%;
      box-sizing: border-box;
      min-width: 180px;
      float:right;
      margin-right:30px;   
    }
    .market_resources_list{
        width: 100%;
        margin: 0 auto;
        margin-top: 6%;
      .market_resources_box{
        transition: all .5s;
        position: relative;
        overflow: hidden;
        .paging{
          width: 100%;
          height:40px;
          position: absolute;
          top:200px;
          line-height: 40px;
          .el-pagination{
            text-align: right;
            padding-top:6px;
          }
        }
      }
      .market_resources_box:nth-of-type(even){
        background: #f7f7f7;
      }
      .market_resources_title{
        min-height: 40px;
        line-height: 40px;
        background: #f45643;
        color:white;
      }
      .market_resources_mes{
        min-height: 40px;
        line-height: 40px;
        font-size: 14px;
        text-align: center;
        position: relative;
        button{
          min-width:74px;
          min-height: 30px;
          background: linear-gradient(180deg,rgba(255,125,91,1),rgba(255,71,46,1));;
          border-radius:5px;
          color:white;
        }
      }
      .led{
        width: 100%;
        height:160px;
        min-height: 160px;
        display: none;
        background: #e4eff9;
        margin-top:40px;
        .led_mes{
          min-height:40px;
          line-height: 40px;
          font-size: 14px;
          button{
            min-width:74px;
            min-height: 30px;
            background: linear-gradient(180deg,rgba(255,125,91,1),rgba(255,71,46,1));;
            border-radius:5px;
            color:white;
          }
        }
      }
      .opera{
        position: relative;
        button{
          position: absolute;
          left:50%;
          margin-left:-37px;
          top:12%;
        }
      }

    }
  }
  .market_resources_loadig{
    width: 100%;
    height:50%;
  }
}
</style>
