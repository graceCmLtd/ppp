<template lang="html">
  <div class="market_paper">
  <div class="market_paper_con">
    <div style=" margin-left:100px; ">
        <p>
          <span style="font-weight:bold;">票据类型:</span>
          <span class="option" :class="{markAc:color==1}" @click="infinite()">不限</span>
          <span class="option" :class="{markAc:color==2}" @click="silver()">纸银</span>
          <span class="option" :class="{markAc:color==3}" @click="electric()">电银</span>
          <span class="option" :class="{markAc:color==4}" @click="makers()">纸商</span>
          <span class="option" :class="{markAc:color==5}" @click="electricity()">电商</span>
        <p>
          <span style="font-weight:bold;">票据金额:</span>
          <span class="option" :class="{markAc:colorTwo==1}" @click="infiniteAmount()">不限</span>
          <span class="option" :class="{markAc:colorTwo==2}" @click="thanOne()">小于100万</span>
          <span class="option" :class="{markAc:colorTwo==3}" @click="thanFive()">100万-500万</span>
          <span class="option" :class="{markAc:colorTwo==4}" @click="aboveFive()">500万以上</span>
        </p>
        <p>
          <span style="font-weight:bold;">到期期限:</span>
          <span class="option" :class="{markAc:colorThr==1}" @click="infiniteDate()">不限</span>
          <span class="option" :class="{markAc:colorThr==2}" @click="silverDay()">小于30天</span>
          <span class="option" :class="{markAc:colorThr==3}" @click="thanDay()">1-3个月</span>
          <span class="option" :class="{markAc:colorThr==4}" @click="thanThe()">3-6个月</span>
          <span class="option" :class="{markAc:colorThr==5}" @click="thanSix()">6个月以上</span>
        </p>
</div>
  <div class="pager_w_table">
      <div class="market_paper_table_title">
        <el-row>
          <el-col :span="4"><div class="table time">票据类型</div></el-col>
          <el-col :span="5"><div class="table type" style="text-align:left;">兑换方</div></el-col>
          <el-col :span="3"><div class="table acce">金额</div></el-col>
          <el-col :span="3"><div class="table amount">到期日</div></el-col>
          <el-col :span="2"><div class="table data">剩余天数</div></el-col>
          <el-col :span="2"><div class="table status">状态</div></el-col>
          <el-col :span="2"><div class="table status">已有报价数</div></el-col>
          <el-col :span="3"><div class="table status">操作</div></el-col>
        </el-row>
      </div>
      <div class="market_paper_table" >
        <el-row v-for="(item,index) in noteList" :key="index" class="aa">
          <el-col :span="4"><div class="table time">{{item.billType}}</div></el-col>
          <el-col :span="5"><div class="table type" style="text-align:left;" ref="acceptor">{{item.acceptor}}</div></el-col>
          <el-col :span="3"><div class="table acce">{{item.amount}}</div></el-col>
          <el-col :span="3"><div class="table amount">{{item.maturity}}</div></el-col>
          <el-col :span="2"><div class="table data">{{item.remain_days}}天</div></el-col>
          <el-col :span="2"><div class="table status">{{item.quoteStatus}}</div></el-col>
          <el-col :span="2"><div class="table status">{{item.count}}</div></el-col>
          <el-col :span="3"><div class="table status">
            <span style="color:#089e0b;cursor:pointer;" @click="SeeDetails(index)">查看>></span>
            </div></el-col>
        </el-row>
      </div>
      <div class="block" v-if="showPaginate">
        <el-pagination
          background
          layout="prev,pager, next"
          :total="total"
          :page-size="pageSize"
          @current-change="current_change">

        </el-pagination>
    </div>
  </div>
  </div>
    
  <Footer :height="minHeight"/>
  </div>
</template>

<script>
export default {
  data(){
    return{
      noteList:[],
      bill:null,
      color:1,
      colorTwo:1,
      colorThr:1,
      billType:'',
      amount:'',
      date:'',
      minHeight:'10%',
      pageP:null,
      pageSize : 10,
      currentPage : 1,
      total : 0,
      showPaginate : true
    }
  },
  components:{
    Footer:resolve=>{
      require(['@/components/footer-all'],resolve)
    }
  },
  methods:{
    infinite(){//类型不限
      this.color=1;
      this.billType=0;
      this.getList();
    },
    silver(){//纸银
      this.color=2;
      this.billType=1;
      this.getList();
    },
    electric(){//电银
      this.color=3;
      this.billType=2;
      this.getList();
    },
    makers(){//纸商
      this.color=4;
      this.billType=3;
      this.getList();
    },
    electricity(){//电银
      this.color=5;
      this.billType=4;
      this.getList();
    },
    infiniteAmount(){//价格不限
      this.colorTwo=1;
      this.amount=0;
      this.getList();
    },
    thanOne(){//小于100万
      this.colorTwo=2;
      this.amount=1;
      this.getList();
    },
    thanFive(){//小于500万
      this.colorTwo=3;
      this.amount=2;
      this.getList();
    },
    aboveFive(){//500万以上
      this.colorTwo=4;
      this.amount=3;
      this.getList();
    },
    infiniteDate(){//不限日期
      this.colorThr=1;
      this.date=0;
      this.getList();
    },
    silverDay(){//小于30天
      this.colorThr=2;
      this.date=1;
      this.getList();
    },
    thanDay(){//1-3个月
      this.colorThr=3;
      this.date=2;
      this.getList();
    },
    thanThe(){//3-6个月
      this.colorThr=4;
      this.date=3;
      this.getList();
    },
    thanSix(){//6个月以上
      this.colorThr=5;
      this.date=4;
      this.getList();
    },
    
    getList(){
      let _this=this;
      _this.axios.post(_this.oUrl+'/bills/filterbill',{
        "billType":_this.billType,
      	"amountType":_this.amount,
      	"maturityType":_this.date,
      	"starter":(_this.currentPage-1)*_this.pageSize,
      	"number":_this.pageSize
      },
      {headers:{
        'Content-Type':'application/json'
      }}
      ).then((res)=>{
        console.log("票据市场 ")
        console.log(res)
          _this.noteList=res.data.list;
          if(res.data.count != 'null')
            _this.total = res.data.count;
          else
            _this.res.data.count = false;
        })
    },
    current_change(currentPage){
      this.currentPage = currentPage;
      this.getList();
    },
    SeeDetails(index){  //查看详情
      let bill=this.noteList[index].billNumber
      this.$router.push({
        name:'Details',
        query:{
          bills:bill
        }
      })
    },
    acceptor(){//字符超过长度省略
      for (let v in this.$refs.acceptor){
        let than=this.$refs.acceptor[v].innerText
        if(than.length>8){
          this.$refs.acceptor[v].innerText=this.$refs.acceptor[v].innerText.substring(0,15)+''
        }
      }
    }

  },
  created(){
    this.getList()
  },
  updated(){
    this.acceptor()
  }
}
</script>

<style lang="scss" scoped>
.markAc{
  background: #f15749;
  color:white;
}
.market_paper{
  width: 100%;
  height:100%;
  .market_paper_con{
    width: 80%;
    height:774px;
    margin:0 auto;
    padding-top: 4%;
    p{
      width: 100%;
      text-align: left;
      margin-bottom: 2%;
    
      .option{
        font-size: 15px;
        margin-left: 5%;
        cursor:pointer;
        padding:.3% 1.1% .3% 1.1%;
        border-radius: 5px;
      }
    }
  .pager_w_table{
     background:rgba(255,255,255,1);
     box-shadow:0px 2px 10px 0px rgba(0,0,0,0.2);
    .market_paper_table_title{
      width: 100%;
      height: 40px;
      background: #F15749;
      font-weight: bold;
      color: #fff;

      .table{
        min-height: 40px;
        line-height: 40px;
      }
    }
    .market_paper_table{
      width: 100%;
      font-size: 14px;

      .table{
        min-height: 42px;
        line-height: 40px;
      }
      .aa:nth-of-type(even){
         background:#f7f7f7;
       }
    }
  }
 }
}
</style>
