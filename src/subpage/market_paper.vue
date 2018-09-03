<template lang="html">
  <div class="market_paper">
  <div class="market_paper_con">
    <p>
      <span>票据类型:</span>
      <span class="option" :class="{markAc:color==1}" @click="infinite()">不限</span>
      <span class="option" :class="{markAc:color==2}" @click="silver()">纸银</span>
      <span class="option" :class="{markAc:color==3}" @click="electric()">电银</span>
      <span class="option" :class="{markAc:color==4}" @click="makers()">纸商</span>
      <span class="option" :class="{markAc:color==5}" @click="electricity()">电商</span>
    <p>
      <span>票据金额:</span>
      <span class="option" :class="{markAc:colorTwo==1}" @click="infiniteAmount()">不限</span>
      <span class="option" :class="{markAc:colorTwo==2}" @click="thanOne()">小于100万</span>
      <span class="option" :class="{markAc:colorTwo==3}" @click="thanFive()">100万-500万</span>
      <span class="option" :class="{markAc:colorTwo==4}" @click="aboveFive()">500万以上</span>
    </p>
    <p>
      <span>到期期限:</span>
      <span class="option" :class="{markAc:colorThr==1}" @click="infiniteDate()">不限</span>
      <span class="option" :class="{markAc:colorThr==2}" @click="silverDay()">小于30天</span>
      <span class="option" :class="{markAc:colorThr==3}" @click="thanDay()">1-3个月</span>
      <span class="option" :class="{markAc:colorThr==4}" @click="thanThe()">3-6个月</span>
      <span class="option" :class="{markAc:colorThr==5}" @click="thanSix()">6个月以上</span>
    </p>
    <div class="market_paper_table_title">
      <el-row>
        <el-col :span="4"><div class="table time">票据类型</div></el-col>
        <el-col :span="3"><div class="table type">兑换方</div></el-col>
        <el-col :span="3"><div class="table acce">金额</div></el-col>
        <el-col :span="3"><div class="table amount">到期日</div></el-col>
        <el-col :span="2"><div class="table data">剩余天数</div></el-col>
        <el-col :span="2"><div class="table status">状态</div></el-col>
        <el-col :span="4"><div class="table status">已有报价数</div></el-col>
        <el-col :span="3"><div class="table status">操作</div></el-col>
      </el-row>
    </div>
    <div class="market_paper_table">
      <el-row v-for="(item,index) in noteList" :key="index" class="aa">
        <el-col :span="4"><div class="table time">{{item.billType}}</div></el-col>
        <el-col :span="3"><div class="table type" ref="acceptor">{{item.acceptor}}</div></el-col>
        <el-col :span="3"><div class="table acce">{{item.amount}}</div></el-col>
        <el-col :span="3"><div class="table amount">{{item.maturity}}</div></el-col>
        <el-col :span="2"><div class="table data"></div></el-col>
        <el-col :span="2"><div class="table status">{{item.status}}</div></el-col>
        <el-col :span="4"><div class="table status">0</div></el-col>
        <el-col :span="3"><div class="table status">
          <span style="color:#089e0b;cursor:pointer;" @click="SeeDetails(index)">查看>></span>
          </div></el-col>
      </el-row>
    </div>
  </div>
  <p class="paging_paper">
    <el-pagination
      background
      layout="prev, pager, next"
      @next-click="nextPaper()"
      @prev-click="prevPaper()"
      @current-change="currentPaper"
      :total="pagePaper">
    </el-pagination>
    </p>
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
      starterPaper:0,
      pagePaper:10
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
      this.screening();
    },
    silver(){//纸银
      this.color=2;
      this.billType=1;
      this.screening();
    },
    electric(){//电银
      this.color=3;
      this.billType=2;
      this.screening();
    },
    makers(){//纸商
      this.color=4;
      this.billType=3;
      this.screening();
    },
    electricity(){//电银
      this.color=5;
      this.billType=4;
      this.screening();
    },
    infiniteAmount(){//价格不限
      this.colorTwo=1;
      this.amount=0;
      this.screening();
    },
    thanOne(){//小于100万
      this.colorTwo=2;
      this.amount=1;
      this.screening();
    },
    thanFive(){//小于500万
      this.colorTwo=3;
      this.amount=2;
      this.screening();
    },
    aboveFive(){//500万以上
      this.colorTwo=4;
      this.amount=3;
      this.screening();
    },
    infiniteDate(){//不限日期
      this.colorThr=1;
      this.date=0;
      this.screening();
    },
    silverDay(){//小于30天
      this.colorThr=2;
      this.date=1;
      this.screening();
    },
    thanDay(){//1-3个月
      this.colorThr=3;
      this.date=2;
      this.screening();
    },
    thanThe(){//3-6个月
      this.colorThr=4;
      this.date=3;
      this.screening();
    },
    thanSix(){//6个月以上
      this.colorThr=5;
      this.date=4;
      this.screening();
    },
    screening(){
      let _this=this;
      _this.axios.post(_this.oUrl+'/bills/filterbill',{
        "billType":_this.billType,
      	"amountType":_this.amount,
      	"maturityType":_this.date,
      	"starter":0,
      	"number":10
      },
      {headers:{
        'Content-Type':'application/json'
      }}
      ).then((res)=>{
        _this.noteList=res.data;
      })
    },
    getList(){
      let _this=this;
      _this.axios.post(_this.oUrl+'/bills/filterbill',{
        "billType":_this.billType,
      	"amountType":_this.amount,
      	"maturityType":_this.date,
      	"starter":_this.starterPaper,
      	"number":10
      },
      {headers:{
        'Content-Type':'application/json'
      }}
      ).then((res)=>{
          _this.noteList=res.data;
          if(res.data.length>10){
            _this.pagePaper=res.data.length
          }
        })
    },
    SeeDetails(index){  //查看详情
      let bill=this.noteList[index].billNumber;
      this.$router.push({
        name:'Details',
        query:{
          bills:bill
        }
      })
    },
    currentPaper(index){
      let _this=this;
      console.log(typeof(index))
      if(index==1){
        _this.starterPaper=_this.starterPaper-10;
      }else{
        _this.starterPaper=index*10;
      }
      _this.postPaper()
    },
    postPaper(){
      let _this=this;
      _this.axios.post(this.oUrl+'/bills/filterbill',{
        "billType":_this.billType,
        "amountType":_this.amount,
        "maturityType":_this.date,
        "starter":_this.starterPaper,
        "number":10
      },
      {headers:{
        'Content-Type':'application/json'
      }}
      ).then((res)=>{
        this.noteList=res.data
      })
    },
    nextPaper(){  //下一页
      let _this=this;
      _this.starterPaper=_this.starterPaper+10;
      _this.postPaper()
    },
    prevPaper(){  //上一页
      let _this=this;
      _this.starterPaper=_this.starterPaper-10;
      console.log(_this.starterPaper)
      _this.postPaper()
    },
    acceptor(){//字符超过长度省略
      for (let v in this.$refs.acceptor){
        let than=this.$refs.acceptor[v].innerText
        if(than.length>8){
          this.$refs.acceptor[v].innerText=this.$refs.acceptor[v].innerText.substring(0,10)+'...'
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
    width: 70%;
    height:774px;
    margin:0 auto;
    padding-top:6%;
    p{
      width: 100%;
      text-align: left;
      padding-left:20%;
      margin-bottom: 2%;
      min-width: 1166px;
      .option{
        font-size: 15px;
        margin-left: 5%;
        cursor:pointer;
        padding:.3% 1.1% .3% 1.1%;
        border-radius: 5px;
      }
    }
    .market_paper_table_title{
      width: 100%;
      height:40px;
      background: #f2f6f9;
      font-weight: bold;
      .table{
        min-height: 40px;
        line-height: 40px;
      }
    }
    .market_paper_table{
      width: 100%;
      height:42px;
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
</style>
