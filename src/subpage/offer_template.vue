<!-- 报价模板 -->
<template lang="html">
  <div class="content_w1">
    <div class="content_w1_title">
      <span>发布/修改资源池报价</span>
    </div>
    <table>
      <tr class="style_w">
        <td>票面金额</td>
        <td>期限</td>
        <td>国有+国股</td>
        <td>大商</td>
        <td>授信城商</td>
        <td>村镇银行</td>
        <td>操作</td>
        <td>选中资源市场预览显示</td>
      </tr>
      <tr class="style-w1">
        <td>10w-50w</td>
        <td>3个月以下</td>
        <td>4.5%</td>
        <td></td>
        <td></td>
        <td></td>
        <td>修改报价</td>
        <td style="color: #F15749;">○置顶首页显示</td>
      </tr>
      <tr class="style-w1">
        <td>10w-50w</td>
        <td>3个月以下</td>
        <td></td>
        <td>5.34%</td>
        <td></td>
        <td></td>
        <td>修改报价</td>
        <td>○置顶首页显示</td>
      </tr>
      <tr class="style-w1">
        <td>10w-50w</td>
        <td>3个月以下</td>
        <td></td>
        <td></td>
        <td>3.7%</td>
        <td></td>
        <td>修改报价</td>
        <td>○置顶首页显示</td>
      </tr>
      <tr class="style-w1">
        <td>10w-50w</td>
        <td>3个月以下</td>
        <td></td>
        <td></td>
        <td></td>
        <td>3.54%</td>
        <td>修改报价</td>
        <td>○置顶首页显示</td>
      </tr>
      <tr class="style-w1">
        <td>10w-50w</td>
        <td>3个月以下</td>
        <td></td>
        <td></td>
        <td>2.67%</td>
        <td></td>
        <td>增加报价</td>
        <td>○置顶首页显示</td>
      </tr>
       <div class="bottom_w">
                    <p style="float:left;">备注：详细价格联系方式详谈</p>
                    <button class="btn-w_w">修改备注</button>
                </div>

    </table>
  </div>
</template>

<script>
import {getCookie} from '@/assets/util'
export default {
  data(){
    return{
      templateShow:false
    }
  },
  methods:{
    showOper(){
      this.templateShow=true;
      this.$refs.template_oper.style.display="block"
      setTimeout(()=>{
        this.$refs.template_oper.style.top="30%";
        this.$refs.template_oper.style.opacity="1";
      },200)
    },
    hideTemplate(){
      setTimeout(()=>{
        this.$refs.template_oper.style.display="none";
        this.templateShow=false;
      },300)
      this.$refs.template_oper.style.top="15%";
      this.$refs.template_oper.style.opacity="0";
    },
    postList(){
      let _this=this;
      let Id=getCookie('Iud');
      let amount=_this.$refs.amount.value;
      let date=_this.$refs.date.value;
      let cun=_this.$refs.interestCun.value;//国股利率
      let city=_this.$refs.interestCity.value;//城商利率
      let di=_this.$refs.interestDi.value;//电商利率
      let towns=_this.$refs.interestTowns.value;//村镇银行利率
      if(amount==''||date==''||cun==''||city==''||di==''||towns==''){
        alert('请先完善报价信息！')
      }else{
        _this.axios.post(_this.oUrl+'/resourceMarket/add',{
          "resourceMarketInfo":{
            "orderId":"ewrewrwwewr11were2654",
            "buyerId":Id,
            "amountRange":amount,
            "timeLimit":date,
            "type1":cun,
            "type2":city,
            "type3":di,
            "type4":towns,
            "billType":"电银",
            "priority":"2",
            "updateDate":"2018-08-20",
            "note":"Surprise MontherFuck!"
          }
        },
        {headers:{
          'Content-Type':'application/json'
        }}
        ).then((res)=>{
            console.log(res)
          })
      }
    }
  }
}
</script>




  <!---->

<!--</style>-->

<style type="text/css">
  .content_w1{
    width: 99%;
    height: 487px;
    background: rgba(255,255,255,1);
    -webkit-box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.2);
    box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.2);
    /*border: 1px solid black;*/
    margin: 0 auto;
    position: relative;
    margin-left: 13px;
    margin-top: 14px;
    min-width: 1189px;
  }
  .content_w1_title{
    height: 61px;
    border-bottom:3px solid rgba(252,213,208);

  }
  .content_w1_title span{
    width:190px;
    height:61px;
    font-size: 16px;
    font-family:"微软雅黑";
    font-weight:bold;
    color:rgba(255,255,255,1);
    /*line-height:26px;*/
    display: block;
    background: rgba(243,86,67,1);
    line-height: 61px;
  }
  .content_w1 table{
    margin-top: 13px;
    width: 100%;
    height: 100px;
    /*border: 1px solid black;*/
    border-collapse: collapse;
    /*background: #F15749;*/

  }
  .content_w1 .style_w{
    color: #fff;
    background: #F15749;
    height: 50px;
  }

  tr:nth-child(2n){
    height: 60px;
    background: #fff;
  }
  /* 单行颜色 */
  tr:nth-child(2n+1){
    height: 60px;
    background:  #EFF8FF;
  }
  .bottom_w{
    position: absolute;
    bottom: 0px;
    background: #FFFDEF;
    width: 745px;
    line-height: 50px;
    color: #333333;
    font-size: 14px;
    font-weight: bold;
    padding: 0 15px;
    width:100%;

  }
  .btn-w_w{
    float: right;
    width: 140px;
    height: 40px;
    -webkit-box-shadow: 0px 2px 4px 0px rgba(241,87,73,0.5);
    box-shadow: 0px 2px 4px 0px rgba(241,87,73,0.5);
    border-radius: 3px;
    margin-top: 20px;
    background: #F15749;
    position: relative;
    top: -8px;
    left: -9px;
    color: #fff;
  }

</style>
