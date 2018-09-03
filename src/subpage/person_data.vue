<template lang="html">
  <div class="person_data">
    <div class="person_data_process">
      <img src="../../static/img/process.png" alt="">
    </div>
    <p class="person_data_company">
      <span>企业信息</span>
    </p>
    <div class="company_mes">
      <p style="">
        <span>&nbsp;&nbsp;&nbsp;&nbsp;公司名称&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" value="" ref="companyName"/></span>
      </p>
      <p class="">
        <span>联系人姓名&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" value="" ref="contactName"/></span>
      </p>
      <p class="">
        <span>联系人电话&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" value="" ref="contactPhone"/></span>
      </p>
      <p class="">
        <span>联系人邮箱&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" value="" ref="contactEmail"/></span>
      </p>
    </div>
    <p class="person_data_company">
      <span>上传营业执照</span>
    </p>
    <div class="company_license">
      <div class="reprod">
        <img src="../../static/img/pic_icon.png" alt="">
        <p>点击上传营业执照</p>
        <input type="file" name="" accept="image/jpg" value="" @change="upLoadBusiness">
        <img src="" alt=""  class="showPic"  ref="Business">
      </div>
    </div>
    <p class="person_data_company">
      <span>对公银行账户</span>
      </p>
    <div class="company_mes">
      <p>
        <span>账户名称&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" value="" ref="bankId"></span>
        </p>
      <p class="">
        <span>开户银行&nbsp;&nbsp;&nbsp;
          <!-- <el-cascader
            :options="options"
            :value="valueCom"
            separator="/"
            change-on-select
          ></el-cascader> -->
          <input type="text" name="" value="" ref="bankName" />
        </span>
      </p>
      <p class="">
        <span>开户地址&nbsp;&nbsp;&nbsp;
          <!-- <el-cascader
            :options="options"
            :value="valueCom"
            separator="/"
            change-on-select
          ></el-cascader> -->
          <input type="text" name="" value="" ref="bankAddress" />
        </span>
      </p>
      <p class="">
        <span>银行账号&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" value="" ref="bankNumber"/></span>
      </p>
    </div>
    <p class="person_data_company">
      <span>设置联系QQ</span>
      </p>
    <div class="company_mes">
      <p>
        <span>请输入QQ号码&nbsp;&nbsp;<input type="text" value="" ref="QQ"/></span>
      </p>
    </div>
    <p class="saveMes">
      <button type="button" name="button" @click="submitCom()">确认</button>
      </p>
  </div>
</template>

<script>
import {getCookie} from '@/assets/util'
export default {
  data(){
    return{
      options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
            }, {
              value: 'daohang',
              label: '导航',
              children: [{
                value: 'cexiangdaohang',
                label: '侧向导航'
              }, {
                value: 'dingbudaohang',
                label: '顶部导航'
              }]
            }]
          }, {
            value: 'zujian',
            label: '组件',
            children: [{
              value: 'basic',
              label: 'Basic',
              children: [{
                value: 'layout',
                label: 'Layout 布局'
              }, {
                value: 'color',
                label: 'Color 色彩'
              }, {
                value: 'typography',
                label: 'Typography 字体'
              }, {
                value: 'icon',
                label: 'Icon 图标'
              }, {
                value: 'button',
                label: 'Button 按钮'
              }]
            }, {
              value: 'form',
              label: 'Form',
              children: [{
                value: 'radio',
                label: 'Radio 单选框'
              }, {
                value: 'checkbox',
                label: 'Checkbox 多选框'
              }, {
                value: 'input',
                label: 'Input 输入框'
              }, {
                value: 'input-number',
                label: 'InputNumber 计数器'
              }, {
                value: 'select',
                label: 'Select 选择器'
              }, {
                value: 'cascader',
                label: 'Cascader 级联选择器'
              }, {
                value: 'switch',
                label: 'Switch 开关'
              }, {
                value: 'slider',
                label: 'Slider 滑块'
              }, {
                value: 'time-picker',
                label: 'TimePicker 时间选择器'
              }, {
                value: 'date-picker',
                label: 'DatePicker 日期选择器'
              }, {
                value: 'datetime-picker',
                label: 'DateTimePicker 日期时间选择器'
              }, {
                value: 'upload',
                label: 'Upload 上传'
              }, {
                value: 'rate',
                label: 'Rate 评分'
              }, {
                value: 'form',
                label: 'Form 表单'
              }]
            }, {
              value: 'data',
              label: 'Data',
              children: [{
                value: 'table',
                label: 'Table 表格'
              }, {
                value: 'tag',
                label: 'Tag 标签'
              }, {
                value: 'progress',
                label: 'Progress 进度条'
              }, {
                value: 'tree',
                label: 'Tree 树形控件'
              }, {
                value: 'pagination',
                label: 'Pagination 分页'
              }, {
                value: 'badge',
                label: 'Badge 标记'
              }]
            }, {
              value: 'notice',
              label: 'Notice',
              children: [{
                value: 'alert',
                label: 'Alert 警告'
              }, {
                value: 'loading',
                label: 'Loading 加载'
              }, {
                value: 'message',
                label: 'Message 消息提示'
              }, {
                value: 'message-box',
                label: 'MessageBox 弹框'
              }, {
                value: 'notification',
                label: 'Notification 通知'
              }]
            }, {
              value: 'navigation',
              label: 'Navigation',
              children: [{
                value: 'menu',
                label: 'NavMenu 导航菜单'
              }, {
                value: 'tabs',
                label: 'Tabs 标签页'
              }, {
                value: 'breadcrumb',
                label: 'Breadcrumb 面包屑'
              }, {
                value: 'dropdown',
                label: 'Dropdown 下拉菜单'
              }, {
                value: 'steps',
                label: 'Steps 步骤条'
              }]
            }, {
              value: 'others',
              label: 'Others',
              children: [{
                value: 'dialog',
                label: 'Dialog 对话框'
              }, {
                value: 'tooltip',
                label: 'Tooltip 文字提示'
              }, {
                value: 'popover',
                label: 'Popover 弹出框'
              }, {
                value: 'card',
                label: 'Card 卡片'
              }, {
                value: 'carousel',
                label: 'Carousel 走马灯'
              }, {
                value: 'collapse',
                label: 'Collapse 折叠面板'
              }]
            }]
          }, {
            value: 'ziyuan',
            label: '资源',
            children: [{
              value: 'axure',
              label: 'Axure Components'
            }, {
              value: 'sketch',
              label: 'Sketch Templates'
            }, {
              value: 'jiaohu',
              label: '组件交互文档'
            }]
          }],
      valueCom:null
    }
  },
  methods:{
    upLoadBusiness(e){
      let _this=this;
      if (e.target.files[0]) {
      let file = e.target.files[0]
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function() {
        img.src = this.result
      }
      let img = new Image,
        width = 1024, //image resize   压缩后的宽
        quality = 0.8, //image quality  压缩质量
        canvas = document.createElement("canvas"),
        drawer = canvas.getContext("2d");
        img.onload = function() {
          canvas.width = width;
          canvas.height = width * (img.height / img.width);
          drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
          let base64 = canvas.toDataURL("image/jpeg", quality); //压缩后的base64图片
          _this.$refs.Business.src=base64;
          window.localStorage.setItem('Business',base64);
        }
      }
    },
    submitCom(){
      let _this=this;
      let comName=_this.$refs.companyName.value;//公司名称
      let contactName=_this.$refs.contactName.value;//联系人姓名
      let contactPhone=_this.$refs.contactPhone.value;//联系人电话
      let contactEmail=_this.$refs.contactEmail.value;//联系人邮箱
      let bankId=_this.$refs.bankId.value;//银行账户名称
      let banNumber=_this.$refs.bankId.value;//银行账号
      let bankName=_this.$refs.bankName.value;//银行名称
      let bankRess=_this.$refs.bankAddress.value;//开户地址
      let qq=_this.$refs.QQ.value;//联系人QQ
      let busPic=window.localStorage.getItem('Business');//营业执照
      let id=getCookie('Iud');
      if(comName==''||contactName==''||contactPhone==''||contactEmail==''||bankId==''||banNumber==''||qq==''){
        alert('请先完善公司信息! ')
      }else if(busPic==''){
        alert('请先上传营业执照！')
      }else{
        _this.axios.post(this.oUrl+'/addCompany',{
          "companyInfo":{
          	"companyName":comName,
          	"contactsId":id,
          	"contactsPhone":contactPhone,
          	"contactsEmail":contactEmail,
          	"contactsQQ":qq,
          	"bankAccountName":bankId,
          	"bankAccount":banNumber,
            'banName':bankName,
          	"updateDate":"2008-12-29",
          	"signUpAddr":bankRess,
            'picId':123
          },
          "companyPics":{
          	"picContent":busPic,
          	"updateDate":"2018-08-02",
          	"contactsId":id
          	}
        },{
          headers:{
            'Content-Type':'application/json'
          }
        }
      ).then((res)=>{
        console.log(res)
        window.localStorage.clear()
      })
      }
    }
  }
}
</script>

<style lang="scss">
.person_data{
  width: 100%;
  height:100%;
  .person_data_process{
    width: 100%;
    height:25%;
    img{
      width: 100%;
      height:100%;
    }
  }
  .person_data_company{
    width: 82%;
    border-bottom:1px solid #999;
    margin-left: 18%;
    text-align: left;
    span{
      padding-bottom:1%;
      border-bottom: 4px solid #FF452C;
      font-weight: bold;
      font-size: 16px;
      color:#FF452C;
      letter-spacing:2px;
    }
  }
  .company_mes{
    width: 82%;
    height:auto;
    padding-top:7%;
    padding-bottom:7%;
    margin-left: 18%;
    text-align: center;
    .el-input--suffix{
      width: 262px!important;
      margin-right: 5px;
    }
    .el-input__inner{
      height:30px;
      border-radius: 0;
      width: 261px;
    }
    p{
      width: 100%;
      text-align: center;
      color:#333333;
      margin-bottom: 2%;
      input{
        border:1px solid #979797;
        height:24px;
        width: 260px;
      }
      select{
        border:1px solid #979797;
        height:30px;
        width: 260px;
        margin-left:-2%;
      }
    }
  }
  .company_license{
    width: 82%;
    margin-left: 18%;
    height:378px;
    text-align: center;
    position: relative;
    .reprod{
      width: 60%;
      height:75%;
      min-width: 390px;
      position: absolute;
      left:50%;
      margin-left: -30%;
      top:55%;
      margin-top:-18%;
      border:1px solid #ccc;
      line-height: 210px;
      .showPic{
        width: 100%;
        height:100%;
        position: absolute;
        top:0;
        left:0;
      }
      img{
        width: 20%;
        height:25%;
        position: absolute;
        top:25%;
        left:40%;
      }
      p{
        position: absolute;
        top:30%;
        left:36%;
        color:#999;
      }
      input{
        width: 100%;
        height:100%;
        position: absolute;
        left:0;
        top:0;
        background: red;
        cursor:pointer;
        opacity: 0;
        z-index: 1;
      }
    }
  }
  .saveMes{
    width: 82%;
    height:28px;
    margin-left: 18%;
    text-align: center;
    margin-bottom:5%;;
    button{
      width: 60%;
      height:100%;
      background: #FF452C;
      font-size: 14px;
      color:white;
      border-radius: 5px;
    }
  }
}
</style>
