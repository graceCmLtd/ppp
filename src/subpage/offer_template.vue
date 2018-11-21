<!-- 发布资源池报价 -->
<template lang="html">
  <div class="content">
    <div class="content_w1_title" style="margin-top:20px;">
      <span>发布/修改资源池报价</span>
    </div>

    <!-- 导航内容 -->
    <div class="person_offer_all">
      <div class="offer_mes">
        <el-row>
          <el-col :span="3"><div class="mes_title">票面金额</div></el-col>
          <el-col :span="4"><div class="mes_title">期限</div></el-col>
          <el-col :span="3"><div class="mes_title">国有+国股</div></el-col>
          <el-col :span="3"><div class="mes_title">大商</div></el-col>
          <el-col :span="3"><div class="mes_title">授信城商</div></el-col>
          <el-col :span="3"><div class="mes_title">村镇银行</div></el-col>
          <el-col :span="5"><div class="mes_title">操作</div></el-col>
        </el-row>
      </div>
    </div>
    <!-- 内容 -->
     <div class="color_w" v-for="(item,index) in noteList" :key="index">
        <el-row style="height:77px; line-height:77px;" >
          <el-col :span="3"><div class="mes">{{item.amountRange}}</div></el-col>
          <el-col :span="4"><div class="mes bank" ref="person_offer_all_bank"                                
          >{{item.timeLimit}}</div></el-col>
          <el-col :span="3" ><div class="mes"v-if="!item.type1">-</div>
            <div v-else>{{item.type1}}</div></el-col>
          <el-col :span="3" ><div class="mes"v-if="!item.type2 ">-</div>
          <div v-else>{{item.type2}}</div></el-col>
          <el-col :span="3" ><div class="mes"v-if="!item.type3 ">-</div>
          <div v-else>{{item.type3}}</div></el-col>
          <el-col :span="3" ><div class="mes" v-if="!item.type4">-</div>
          <div v-else>{{item.type4}}</div></el-col>

          <el-col :span="5"><div class="mes pula" style="position:relative;">
            <p class="xs_w" style="position:absolute;right: 20px;top:10px;">
              <a style="background: #F15749;cursor: pointer;" @click="dialogUpdateQuote(index)" >修改</a>
              <a style="background: #53C0FF;cursor: pointer;" @click="dialogDeleteQuote( index )">删除</a>

            </p>
          </div></el-col>
        </el-row>
   
 <!-- update form 修改报价 -->
        <el-dialog title="修改资源池报价" :visible.sync="dialogUpdateFormVisible">
          <el-form :inline = "true" :model="updateForm">
            <el-form-item label="票面金额"  :label-width="formLabelWidth">
              <el-select v-model="updateForm.amountRange" disabled placeholder="请选择票面金额范围">
                <el-option label="10-49.9w" value="10-49.9w"></el-option>
                <el-option label="50-99.9w" value="50-99.9w"></el-option>
                <el-option label="100-300w" value="100-300w"></el-option>
                <el-option label="300w+" value="300w+"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="期限" :label-width="formLabelWidth">
              <el-select v-model="updateForm.timeLimit" disabled placeholder="请选择期限">
                <el-option label="3个月以下" value="3个月以下"></el-option>
                <el-option label="3-6个月" value="3-6个月"></el-option>
                <el-option label="6个月以上" value="6个月以上"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="国有+国股" :label-width="formLabelWidth"  >
              <el-input v-model="updateForm.type1"  placeholder="利率 / 利率+每十万加" ></el-input>
            </el-form-item>
            <el-form-item label="每十万加" :label-width="formLabelWidth"  >
              <el-input v-model="updateForm.money1"  placeholder="每十万加(元)" ></el-input>
            </el-form-item>
            <el-form-item label="大商" :label-width="formLabelWidth">
              <el-input v-model="updateForm.type2"  placeholder="利率 / 利率+每十万加"></el-input>
            </el-form-item>
            <el-form-item label="每十万加" :label-width="formLabelWidth"  >
              <el-input v-model="updateForm.money2"  placeholder="每十万加(元)" ></el-input>
            </el-form-item>
            <el-form-item label="授信城商" :label-width="formLabelWidth">
              <el-input v-model="updateForm.type3"  placeholder="利率 / 利率+每十万加"></el-input>
            </el-form-item>
            <el-form-item label="每十万加" :label-width="formLabelWidth"  >
              <el-input v-model="updateForm.money3"  placeholder="每十万加(元)" ></el-input>
            </el-form-item>
            <el-form-item label="村镇银行" :label-width="formLabelWidth">
              <el-input v-model="updateForm.type4"  placeholder="利率 / 利率+每十万加"></el-input>
            </el-form-item>
            <el-form-item label="每十万加" :label-width="formLabelWidth"  >
              <el-input v-model="updateForm.money4"  placeholder="每十万加(元)" ></el-input>
            </el-form-item>
            
          </el-form>
          <div slot="footer" class="dialog-footer" style="text-align:center;">
            <el-button type="primary" @click="dialogUpdateQuoteSubmit" style="background:#F15749; border:none; width:130px;">确认修改</el-button>
            <el-button @click="dialogUpdateFormVisible = false" style="background:#E4E4E4; border:none; width:130px;">取 消</el-button>
          </div>
        </el-dialog>

  <!-- 删除报价 -->
          <el-dialog
            title="删除报价"
            :visible.sync="dialogDeleteVisible"
            width="30%"
            :before-close="handleClose">
            <span>确定删除该条报价？</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogDeleteVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogDeleteQuoteSubmit" >确 定</el-button>
            </span>
          </el-dialog>


      </div>
<!-- add form 增加报价 -->
        <el-dialog title="增加资源池报价" :visible.sync="dialogAddFormVisible">
          <el-form :inline = "true" :model="addForm">
            <el-form-item label="票面金额" :label-width="formLabelWidth">
              <el-select v-model="addForm.amountRange" placeholder="请选择票面金额范围">
                <el-option label="10-49.9w" value="10-49.9w"></el-option>
                <el-option label="50-99.9w" value="50-99.9w"></el-option>
                <el-option label="100-300w" value="100-300w"></el-option>
                <el-option label="300w+" value="300w+"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="期限" :label-width="formLabelWidth">
              <el-select v-model="addForm.timeLimit" placeholder="请选择期限">
                <el-option label="3个月以下" value="3个月以下"></el-option>
                <el-option label="3-6个月" value="3-6个月"></el-option>
                <el-option label="6个月以上" value="6个月以上"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="国有+国股" :label-width="formLabelWidth"  >
              <el-input v-model="addForm.type1"  placeholder="利率%" ></el-input>
            </el-form-item>
            <el-form-item label="每十万加" :label-width="formLabelWidth"  >
              <el-input v-model="addForm.money1"  placeholder="每十万加(元)" ></el-input>
            </el-form-item>
            <el-form-item label="大商" :label-width="formLabelWidth">
              <el-input v-model="addForm.type2"  placeholder="利率%"></el-input>
            </el-form-item>
            <el-form-item label="每十万加" :label-width="formLabelWidth"  >
              <el-input v-model="addForm.money2"  placeholder="每十万加(元)" ></el-input>
            </el-form-item>
            <el-form-item label="授信城商" :label-width="formLabelWidth">
              <el-input v-model="addForm.type3" placeholder="利率%"></el-input>
            </el-form-item>
            <el-form-item label="每十万加" :label-width="formLabelWidth"  >
              <el-input v-model="addForm.money3"  placeholder="每十万加(元)" ></el-input>
            </el-form-item>
            <el-form-item label="村镇银行" :label-width="formLabelWidth">
              <el-input v-model="addForm.type4"  placeholder="利率%"></el-input>
            </el-form-item>
            <el-form-item label="每十万加" :label-width="formLabelWidth"  >
              <el-input v-model="addForm.money4"  placeholder="每十万加(元)" ></el-input>
            </el-form-item>
            
          </el-form>
          <div slot="footer" class="dialog-footer" style="text-align:center;">
            <el-button type="primary" @click="addFormSubmit" style="background:#F15749; border:none; width:130px;">确认增加</el-button>
            <el-button @click="addFormCancle"  style="background:#E4E4E4; border:none; width:130px;">取 消</el-button>
          </div>
        </el-dialog>


    <div class="add_w">
      <span style="cursor: pointer;">
        <a @click="dialogAddFormVisible = true" >增加报价</a>
      </span>
    </div>


    <div class="edit_w">
      <!-- <a class="note_w">默认备注：{{noteInfo}}</a> -->
      <!-- <textarea>默认备注：{{noteInfo}}</textarea> -->

      <a class="edit_wq" @click="dialogEditNoteVisible =  true">编辑备注</a>
      <div style="color:#333; border:1px solid #ccc; font-size:13px; height:auto; width:500px; z-index:99; line-height:30px;" >默认备注：{{noteInfo}}</div>
    </div>

    <el-dialog  title="修改备注信息"  :visible.sync="dialogEditNoteVisible" width="30%">
            <el-input type="textarea" v-model="noteInfo"></el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogEditNoteVisible = false">取 消</el-button>
              <el-button type="primary" @click="editeNoteSubmit" >确 定</el-button>
            </span>
          </el-dialog>
    <div class="block" v-if="showPaginate">
        <el-pagination
          background
          layout="prev,pager, next"
          :total="total"
          :page-size="pageSize"
          @current-change="current_change">


        </el-pagination>
      </div>
    <div class="bottom_foot">
      <router-link to="/resources">
         <a>回到资源市场</a>
      </router-link>
        <!-- <a>查看我的资源池报价</a> -->
    </div>
  </div>
</template>
<script>
  import {getCookie} from '@/assets/util'
  export default {
    data(){
      return{
        pageSize : 10,
        currentPage : 1,
        total : 0,
        showPaginate : true,
        noteList:[],
        //list : [],
        day:null,
        linka:"tencent://message/?uin=11577851&Site=pengpengpiao.cn&Menu=yes",
        current_index:'',
        remain_days:null,
        pic : '',
        dialogDeleteVisible: false,
        dialogAddFormVisible: false,
        dialogUpdateFormVisible:false,
        dialogEditNoteVisible:false,
        noteInfo:'',
        addForm:{
          amountRange:'',
          timeLimit:'',
          type1:'',
          type2:'',
          type3:'',
          type4:''
        },
        updateForm: {
          orderId:'',
          amountRange:'',
          timeLimit:'',
          type1:null,
          type2:null,
          type3:null,
          type4:null,
          money1:0,
          money2:0,
          money3:0,
          money4:0,
        },
        formLabelWidth: '120px'
      }
    },
    methods:{
       handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      getReceiptAll(){
        let Id=getCookie('Iud');
        console.log(Id)
        /*this.axios.get(this.oUrl+'/resourceMarket/getByBuyerId',{params:{buyerId:Id,pageSize:this.pageSize,currentPage:this.currentPage},headers:{'Authorization':getCookie('Too')}}).then((res)=>{
          let _this=this;
          console.log(res.data);
          _this.noteList=res.data;
          //_this.noteInfo = res.data[0].note;
        });*/
        this.fetch.httpGet({
          url:'/resourceMarket/getByBuyerId',
          params:{
            buyerId:Id,pageSize:this.pageSize,
            currentPage:this.currentPage
          }
        }).then((res)=>{
          let _this=this;
          console.log(res.data);
          _this.noteList=res.data;
          //_this.noteInfo = res.data[0].note;
        })
        
        this.fetch.httpGet(
          {
            url:'/resourceMarket/getCountByBuyerId',
            params:{
              buyerId:Id
            },
          }
        ).then((res)=>{
            if(res.data != '')
              this.total = res.data;
            else
              this.showPaginate = false;
        });
      },
      current_change(currentPage){
          this.currentPage = currentPage;
          this.getReceiptAll();
      },
      linkToA(index){
        /*<a href="'tencent://message/?uin='+{{item.contactsQQ}}+'&Site=pengpengpiao.cn&Menu=yes'" style="text-decoration:none">{{item.contactsQQ}}qq咨询</a>*/
        let _this=this;
        let Id=getCookie('Iud');
        _this.linka = "tencent://message/?uin="+_this.noteList[index].contactsQQ+"&Site=pengpengpiao.cn&Menu=yes"
        //alert(index)
      },
      turnPlace(index){
        let _this=this;
        let billNum=_this.noteList[index].billNumber;
        _this.$router.push({
          name:'Detailed',
          query:{
            bills:billNum
          }
        })
      },
      addFormSubmit(){
          let Id = getCookie("Iud");
          this.dialogAddFormVisible = false;
          let type1 = this.addForm.type1+"% + "+this.addForm.money1;
          let type2 = this.addForm.type2+"% + "+this.addForm.money2;
          let type3 = this.addForm.type3+"% + "+this.addForm.money3;
          let type4 = this.addForm.type4+"% + "+this.addForm.money4;
          console.log(type1+"="+type2+"="+type3+"="+type4);
          //alert(this.addForm.amountRange)
          if (this.addForm.amountRange == '' && this.addForm.timeLimit == '' &&(this.addForm.type1==''||this.addForm.type2==''||this.addForm.type3==''||this.addForm.type4=='')) {
            alert("金额、期限必填，四种类型至少填写一种")
          }else{
              this.fetch.httpPost({
                url:'/resourceMarket/add',
                data:{
                  "resourceMarketInfo":{
                    "buyerId":Id,
                    "amountRange":this.addForm.amountRange,
                    "timeLimit":this.addForm.timeLimit,
                    "type1":type1,
                    "type2":type2,
                    "type3":type3,
                    "type4":type4,
                    "billType":"电银",
                    "priority":"2",
                    "updateDate":this.getNowTime(),
                    "note":"实际交易价格"
                  }
                }
              }).then((res)=>{
              console.log("addForm 返回值");
              console.log(res);
              if (res.data.status == 'fail') {
                alert(res.data.errorMsg)
              }
              this.getReceiptAll();
            })
          }
      },
      dialogUpdateQuote(index){
        this.dialogUpdateFormVisible = true;
        this.updateForm.orderId = this.noteList[index].orderId;
        this.updateForm.amountRange = this.noteList[index].amountRange;
        this.updateForm.timeLimit = this.noteList[index].timeLimit;
        this.updateForm.type1 = this.noteList[index].type1.split('% + ')[0];
        this.updateForm.type2 = this.noteList[index].type2.split('% + ')[0];
        this.updateForm.type3 = this.noteList[index].type3.split('% + ')[0];
        this.updateForm.type4 = this.noteList[index].type4.split('% + ')[0];
        this.updateForm.money1 = this.noteList[index].type1.split('% + ')[1];
        this.updateForm.money2 = this.noteList[index].type2.split('% + ')[1];
        this.updateForm.money3 = this.noteList[index].type3.split('% + ')[1];
        this.updateForm.money4 = this.noteList[index].type4.split('% + ')[1];
        
      },
      dialogUpdateQuoteSubmit(){
          this.dialogUpdateFormVisible = false;
          let Id = getCookie("Iud");
          let type1 = this.updateForm.type1+"% + "+this.updateForm.money1;
          let type2 = this.updateForm.type2+"% + "+this.updateForm.money2;
          let type3 = this.updateForm.type3+"% + "+this.updateForm.money3;
          let type4 = this.updateForm.type4+"% + "+this.updateForm.money4;
          console.log(this.updateForm.orderId);
          this.fetch.myPost('/resourceMarket/updateByOrderId',{
                "orderId":this.updateForm.orderId,
                "buyerId":Id,
                "amountRange":this.updateForm.amountRange,
                "timeLimit":this.updateForm.timeLimit,
                "type1":type1,
                "type2":type2,
                "type3":type3,
                "type4":type4,
                "billType":"电银",
                "priority":"2",
                "updateDate":this.getNowTime(),
                "note":"实际交易价格"
              },
              {headers:{
                  'Content-Type':'application/json',
          'Authorization':getCookie('Too')
                }}
            ).then((res)=>{
              console.log("update quote pool")
              console.log(res);
              if (res.data.status == 'fail') {
                alert(res.data.errorMsg)
              }
              this.getReceiptAll();
            })
      },
      updateFormCancle(){
        this.dialogUpdateFormVisible = false;
        this.updateForm.orderId = '';
        this.updateForm.amountRange = '';
        this.updateForm.timeLimit = '';
        this.updateForm.type1 = '';
        this.updateForm.type2 = '';
        this.updateForm.type3 = '';
        this.updateForm.type4 = '';
      },
      dialogDeleteQuote(index){
        this.dialogDeleteVisible = true;
        this.current_index = index
      },
      dialogDeleteQuoteSubmit(){
        let index = this.current_index;
        this.dialogDeleteVisible = false;
        console.log("dialogDeleteQuoteSubmit")
        this.fetch.httpGet({
          url:'/resourceMarket/deleteByOrderId',
          params:{
            orderId:this.noteList[index].orderId
          }
        }).then((res)=>{
          let _this=this;
          console.log("delete the quote ")

          this.getReceiptAll();
        })
      },
      addFormCancle(){
      this.dialogAddFormVisible = false;
      this.addForm.amountRange = '';
      this.addForm.timeLimit = '';
      this.addForm.type1 = '';
      this.addForm.type2 = '';
      this.addForm.type3 = '';
      this.addForm.type4 = ''
    },
    editeNoteSubmit(){
      this.dialogEditNoteVisible = false;
      //alert(this.noteInfo)
      let Id = getCookie("Iud");
      this.fetch.myPost('/resourceMarket/updateNoteByUserId',{
                "buyerId":Id,
                "note":this.noteInfo
              },
              {headers:{
                  'Content-Type':'application/json',
          'Authorization':getCookie('Too')
                }}
            ).then((res)=>{
              console.log("update note ")
              console.log(res);
              //this.getReceiptAll();
            })
    },
    getNowTime(){//获取当前时间,赋值给updateDate，用于资源市场的排序
          var now = new Date();   
          var year = now.getFullYear(); //得到年份    
          var month = now.getMonth()+1;//得到月份   
          var date = now.getDate();//得到日期   
          var day = now.getDay();//得到周几   
          var hour = now.getHours();//得到小时    
          var minu = now.getMinutes();//得到分钟    
          var sec = now.getSeconds();//得到秒    
          if (month < 10) month = "0" + month;    
          if (date < 10) date = "0" + date;   
          if (hour < 10) hour = "0" + hour;   
          if (minu < 10) minu = "0" + minu;   
          if (sec < 10) sec = "0" + sec;    
          var currentDate = "";
          currentDate = year + "-" + month + "-" + date+ " " + hour + ":" + minu + ":" + sec;
          return currentDate;
    }

    /*end of methods*/
    },
    
    mounted(){
      this.getReceiptAll();
    }
  }
</script>
<style lang="scss" scoped>
.xs_w{
  height:77px;
  line-height:77px;
  a{
    width: 93px;
    height: 38px;
    border-radius: 4px;
    color: #fff;
    display: inline-block;
    margin-top: 19px;
    line-height:38px;
  }
}
.color_w:nth-of-type(odd){ background:#FFFFFF;}
.color_w:nth-of-type(even){ background:#EFF8FF;}
.color_w:hover{
        background: #fffbee;
        box-shadow: 0 0 15px rgba(0,0,0,.2);
        z-index: 1;
}
  .content{
    width: 99%;
    height:100%;
    margin-left: 1%;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 10px 0px rgba(0,0,0,0.2);
    .content_w1_title{
      height: 61px;
      border-bottom:3px solid #F15749;
      span{
        width:190px;
        height:61px;
        font-size: 16px;
        font-family:"微软雅黑";
        font-weight:bold;
        color:#fff;
        /*line-height:26px;*/
        display: block;
        background: #F15749;
        line-height: 61px;
      }
   } 
  .person_offer_all{
    width: 100%;
    height:100%;
    .offer_mes{
      margin-left: 0%;
      margin-top: 1%;
      .mes_title{
        background: #F15749;
        min-width: 36px;
        line-height: 50px;
        font-weight: bold;
        color: #fff;
      }
      .lineHeight{
        line-height: 35px!important;
        font-size: 13px!important;
      }
      .bank{
        border-left:1px solid #ccc;
        border-right:1px solid #ccc;
      }
      .date{
        border-left:1px solid #ccc;
        border-right:1px solid #ccc;
      }
      .amount{
        border-left:1px solid #ccc;
        border-right:1px solid #ccc;
      }
      .mes{
        margin-top:8px;
        margin-bottom:8px;
        min-height: 70px;
        line-height: 70px;
        font-size: 14px;
      }
      .opera{
        border-left:1px solid #ccc;
      }
      .mes_chose{
        display: flex;
        flex-direction: column;
        margin-top:8px;
        margin-bottom:8px;
        .rate{
          width: 100%;
          height:50%;
          margin-top: -3px;
          p{
            width: 100%;
            text-align: center;
            border-bottom:1px solid #ccc;
            height:100%;
            line-height: 35px;
            font-size: 14px;
          }
        }
      }
      .operaMes{
        border-left:1px solid #ccc;
        line-height: 0;
        display: flex;
        flex-direction: column;
        p{
          width: 100%;
          height:35px;
          line-height: 35px;
          button{
            min-width: 60px;
            height:30px;
            border-radius: 3px;
            background: #F15749;
            color:white;
          }
        }
        p:nth-child(2){
          button{
            background: white;
            border:1px solid #F15749;
            color:#F15749;

          }
        }
      }
      .mes_bot{
        min-height: 36px;
        line-height: 36px;
        font-size: 14px;
        position: relative;
        background: #EFF8FF;
        p{
          width: 60%;
          margin: 0 auto;
          display: flex;
          justify-content: space-around;
          button{
            width:105px;
            height:30px;
            border-radius:3px;
            background: #F15749;
            color:white;
            position: absolute;
            right:2%;
            top:12%;
          }
        }
      }

    }

  }
}
.add_w{
  width:100%;
  height:77px;
  background:#EFF8FF;
  text-align: right;
  line-height:77px;
  padding:0 40px;
  span{
    width:120px;
    height:50px;
    background:rgba(83,192,255,1);
    box-shadow:0px 2px 4px 0px rgba(83,192,255,0.4);
    border-radius:4px 3px 3px 3px;
    color:#fff;
    line-height:50px;
    text-align:center;
  }
}
.edit_w{
  width:100%;
  height:77px;
  background:#FFFDEF;
  line-height:77px;
  margin: 0 auto;

  .note_w{
   width:280px;
    font-size:16px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color: #333333;
    float:left;
  }
  .edit_wq{
    width:120px;
    height:50px;
    background:rgba(83,192,255,1);
    border-radius:4px 3px 3px 3px;
    color:#fff;
    line-height:50px;
    float:right;
    margin-right: 36px;
    margin-top: 10px;
    background:#F15749;
    cursor: pointer;

  }
}
.bottom_foot{
  height:77px;
  line-height:77px;
  a{
    width:210px;
    height:50px;
    background:rgba(241,87,73,1);
    box-shadow:0px 2px 10px 0px rgba(241,87,73,0.5);
    border-radius:4px;
    color:#fff;
    display:inline-block;
    line-height:50px;
    margin:0 20px;
  }
}
</style>
