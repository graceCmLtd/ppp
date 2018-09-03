<template lang="html">
  <div class="page" ref="page">
    <Swiper/>
    <div class="page_con">
      <router-link to="/release" tag="p" class="page_release">
        <img src="../../static/img/page_button_top.png" alt="">
      </router-link>
      <div class="page_title_f">          <!--票据行情标题 -->
        <img src="../../static/img/page_title1.png" alt="">
      </div>
      <div class="page_options">
        <ul class="list">
          <li @mouseenter="Be()" @mouseleave="Af()">
            <img src="../../static/img/calculatorBe.png" ref="CaBe" class="Be" alt="" style="width:50%;height:50%;margin-right:25%;" >
            <img src="../../static/img/calculator.png" ref="CaAf" title="" class="Af" alt="" style="width:50%;height:50%;display:none;" />
          </li>
          <li><p>法&nbsp;务</p><p>咨&nbsp;询</p></li>
          <li @click="backTop()"><p>回&nbsp;到</p><p>顶&nbsp;部</p></li>
        </ul>
      </div>
      <div class="page_table">
        <el-row>
          <el-col :span="4"><div class="table time">成交时间</div></el-col>
          <el-col :span="3"><div class="table type">票据类型</div></el-col>
          <el-col :span="8"><div class="table acce">承兑人</div></el-col>
          <el-col :span="4"><div class="table amount">票据金额</div></el-col>
          <el-col :span="3"><div class="table data">到期日</div></el-col>
          <el-col :span="2"><div class="table status">状态</div></el-col>
        </el-row>
      </div>
      <div class="page_table_mes">
        <el-row v-for="(item,index) in roteList" :key="index" class="page_mark_title">
          <el-col :span="4"><div class="tableMes time">{{item.releaseDate}}</div></el-col>
          <el-col :span="3"><div class="tableMes type">
            <span style="color:#ff823f;" v-show="item.billType=='纸银'">银票</span>
            <span style="color:#3d83c8;" v-show="item.billType=='国票'">国票</span>
          </div></el-col>
          <el-col :span="8"><div class="tableMes acce">{{item.acceptor}}</div></el-col>
          <el-col :span="4"><div class="tableMes amount">{{item.amount/10000}}w</div></el-col>
          <el-col :span="3"><div class="tableMes data">{{item.releaseDate}}</div></el-col>
          <el-col :span="2"><div class="tableMes status">{{item.status}}</div></el-col>
        </el-row>
      </div>
      <p class="page_opera_one">
        <router-link to="/marketpa" tag="button">查看更多>></router-link>
        </p>
      <div class="page_title_l">      <!--实时利率标题 -->
        <img src="../../static/img/page_title2.png" alt="">
        </div>
      <div class="page_table">
        <el-row>
          <el-col :span="4"><div class="table time">票据类型</div></el-col>
          <el-col :span="4"><div class="table type">承兑方</div></el-col>
          <el-col :span="4"><div class="table acce">金额</div></el-col>
          <el-col :span="4"><div class="table amount">利率</div></el-col>
          <el-col :span="4"><div class="table data">联系人</div></el-col>
          <el-col :span="4"><div class="table status">状态</div></el-col>
        </el-row>
      </div>
      <div class="page_table_mes">
        <el-row v-for="(item,index) in roteListLimit" :key="index" class="page_mark_title">
          <el-col :span="4"><div class="tableMes time">
            <span style="color:#ff823f;" v-show="item.billType=='电银'">电银</span>
            <span style="color:#3d83c8;" v-show="item.billType=='纸银'">纸银</span>
          </div></el-col>
          <el-col :span="4"><div class="tableMes type">
            {{item.acceptor}}
          </div></el-col>
          <el-col :span="4"><div class="tableMes acce">{{item.amountRange/10000}}w</div></el-col>
          <el-col :span="4"><div class="tableMes amount">{{item.interest}}%</div></el-col>
          <el-col :span="4"><div class="tableMes data">{{item.note}}</div></el-col>
          <el-col :span="4"><div class="tableMes status">
            <button type="button" name="button">收票中</button>
          </div></el-col>
        </el-row>
      </div>
      <p class="page_opera_one">
        <router-link to="/resources" tag="button">查看更多>></router-link>
        </p>
    </div>
    <PageBot/>

    <Footer :height="minHeight"/>
  </div>
</template>

<script>
export default {
  data(){
    return{
      minHeight:'10%',
      roteList:[],
      roteListLimit:[]
    }
  },
  components:{
    Header:resolve=>{
      require(['@/components/header-all'],resolve)
    },
    Swiper:resolve=>{
      require(['@/components/swiper_page'],resolve)
    },
    Footer:resolve=>{
      require(['@/components/footer-all'],resolve)
    },
    PageBot:resolve=>{
      require(['@/subpage/page_bot'],resolve)
    }
  },
  methods:{
    Be(){
      let _this=this;
      _this.$refs.CaBe.style.display='none';
      _this.$refs.CaAf.style.display='block';
    },
    Af(){
      let _this=this;
      _this.$refs.CaBe.style.display='block';
      _this.$refs.CaAf.style.display='none';
    },
    backTop(){
      document.documentElement.scrollTop-=150;
      if (document.documentElement.scrollTop>0) {
        var c=setTimeout(()=>this.backTop(150),16);
      }else {
        clearTimeout(c);
      }
    },
    getListTop(){//票据列表
      let _this=this;
      _this.axios.post(_this.oUrl+'/bills/filterbill',{
        "billType":0,
        "amountType":0,
        "maturityType":0,
        "starter":0,
        "number":10
      },
      {
        headers:{
          'Content-Type':'application/json'
        }
      }
      ).then((res)=>{
        _this.roteList=res.data;
      })
    },
    getListBot(){//资源列表
      let _this=this;
      _this.axios.post(_this.oUrl+'/resourceMarket/getPriorityItem').then((res)=>{
        console.log(res)
        _this.roteListLimit=res.data;
      })
    }
  },
  created(){
    this.getListTop();
    this.getListBot()
  }
}
</script>

<style lang="scss" scoped>
.page{
  width: 100%;
  height:100%;
  min-width: 1378px;
  .page_con{
    width: 70%;
    height:auto;
    margin:0 auto;
    position:relative;
    z-index: 5;
    .page_release{
      width: 300px;
      height:142px;
      min-height: 98px;
      background: #f45643;
      text-align: center;
      position: absolute;
      top:-40px;
      color:white;
      font-size: 18px;
      cursor:pointer;
      background: url('../../static/img/page_button_bot.png');
      background-size: 100% 100%;
    }
    .page_release:hover{
      img{
        transition:all .1s;
        transform: translate(-4px,4.2px);
      }
    }
    .page_title_f{
      font-size: 30px;
      width: 100%;
      height:276px;
      min-height: 276px;
      img{
        width: 100%;
        height:100%;
      }
    }
    .page_table{
      width: 100%;
      .table{
        min-height: 40px;
        background: #f45643;
        text-align: center;
        line-height: 40px;
        color:white;
      }
    }
    .page_table_mes{
      width: 100%;
      font-size: 14px;
      .page_mark_title:nth-of-type(even){
        background:#f7f7f7;
      }
      .page_mark_title:hover{
        // background: #fffbee;
        box-shadow: 0 0 15px rgba(0,0,0,.2);
        z-index: 1;

      }
      .tableMes{
        min-height: 40px;
        line-height: 40px;
        margin-bottom:2px;
      }
      .status{
        button{
          width: 40%;
          min-height: 28px;
          border-radius:8px;
          background: #ff6600;
          color:white;
        }
      }
    }
    .page_opera_one{
      width: 100%;
      height:34px;
      margin-top:28px;
      min-height: 34px;
      button{
        width: 11%;
        height:100%;
        background: #ff6600;
        border-radius: 18px;
        color:white;
      }
    }
    .page_title_l{
      width: 100%;
      height:276px;
      min-height: 220px;
      margin-top:10px;
      img{
        width: 100%;
        height:100%;
      }
    }

    .page_options{
      width: 4%;
      height:25%;
      background: #f7f7f7;
      position: fixed;
      right:5vh;
      top:40vh;
      min-height: 208px;
      min-width: 70px;
      z-index:20;
      .list{
        width: 100%;
        height:100%;
        display: flex;
        flex-direction:column;
        li{
          width: 100%;
          height:33.33%;
          line-height: 62px;
          cursor:pointer;
          border-bottom:1px solid white;
          box-sizing: border-box;
          overflow: hidden;
          p{
            height:50%;
            color:#ff4200;
            font-weight: bold;
            font-size: 24px;
            margin-top: -11%;
          }
          img{
            margin-top: 24%;
            margin-left:25%;
          }
        }
        li:hover{
          background: #ff4200;
          p{
            color:white;
          }
        }
      }
    }
  }
}
</style>
