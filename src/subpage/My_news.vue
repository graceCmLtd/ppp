<!-- 首页下 -->
<template lang="html">
  <div class="news_all">
  	<div class="news_first">
  		<span>全部消息（<i>{{unreadCount}}</i>/<i>{{total}}</i>）</span>
  		<span @click="updateFlag()">全部标记为已读</span>
  	</div>
  	<div class="news_content">
  	   <div class="" v-for="(item,index) in msgList" :key="index">
  		 <div class="news_content1" style="background:red;">
  		 	<p>
  		 		<i v-if="item.flag === 0">·</i>
  		 		<span class="items">「{{item.msgType}}消息」</span> 
  		 	  <span class="names" v-if="item.flag === 0">{{msgName}}</span>
          <span class="names" v-if="item.flag === 1">已读</span>
  		 		<span class="time">{{item.msgTime}}</span>
          <span style="float:right; color:#979797;"  @click="delItem(index,item)">x</span>
  		 	</p>
  		 	<p class="details">{{item.msgContent}}</p>
        
  		 </div>
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
      <!-- <div class="news_content1">
        <p>
          <i>·</i>
          <span class="items">「系统」</span> 
          <span class="names">您的提交的公司信息已经通过审核</span>
          <span class="time">10月19日 15:32</span>
          <span style="float:right; color:#979797;">x</span>
        </p>
        <p class="details">你的票据38258**7628已经审核,可以点击前往查看详情。</p>
       </div>
        <div class="news_content1">
          <p>
            
            <span class="items">「系统」</span> 
            <span class="names">您的提交的公司信息已经通过审核</span>
            <span class="time">10月19日 15:32</span>
            <span style="float:right; color:#979797;">x</span>
          </p>
          <p class="details">你的票据38258**7628已经审核,可以点击前往查看详情。</p>
       </div>
       <div><p>{{msg.msgContent}}</p></div>
  	   </div> -->
  	</div>
  </div>

</template>


<script>
import {getCookie} from '@/assets/util'
export default {	
	data(){
		return{
		 msgList:[],
      index:0,
      msgName:'',
      showSign : false,
      unreadCount:0,
      total:0,
      currentPage:1,
      pageSize:8,
      showPaginate : true
		}
	},
    methods:{
    // 删除
        delItem: function(index,item){
          console.log(item)
          var list = []
          list.push(item);
          list.push(1)
          console.log(list)
          //this.msgList.splice(index,1);
      },
      getMsgList(){
        let _this = this;
        let receiverId = getCookie("Iud");
        console.log('--'+receiverId);
        _this.axios.get(_this.oUrl+'/msg/getUserMsg?receiverId='+receiverId+'&currentPage='+this.currentPage+'&pageSize='+this.pageSize).then((res)=>{
            console.log(res.data);
            for(var i=0;i<res.data.length;i++){
              if(res.data[i].msgType === '系统'){
                _this.msgName = '您有新的系统消息'
              }else if(res.data[i].msgType === '交易'){
                _this.msgName = '您有新的交易消息'
              }
              if(res.data[i].flag === 0 ){
                  _this.unreadCount += 1;
              }

            }
            _this.msgList = res.data;
        });
        _this.axios.get(_this.oUrl+'/msg/getMsgCount?receiverId='+receiverId).then((res)=>{
            if(res.data !== '')
              _this.total = res.data;
        });
      },
      current_change(currentPage){
        this.currentPage = currentPage;
        this.getMsgList();
      },
      updateFlag(){
        console.log("1213");
        let receiverId = getCookie("Iud");
        this.axios.post(this.oUrl+'/msg/updateFlag',{"receiverId":receiverId,"flag":1}).then((res)=>{
            console.log(res.data);
            if(res.data.status === "success"){
                this.$router.go(0);
            }
        });
      }
    },
    created(){
      this.getMsgList();
    },
    
}
</script>

<style lang="scss" scoped>
.news_all{
	width: 100%;
	height:100%;
	.news_first{
		margin-top: 20px;
		width: 70%;
		margin: 0 auto;
		height: 30px;
		margin-top: 60px;
		color:#000;
		font-size: 16px;
		font-weight: bold;
		letter-spacing:1px;
		span:nth-child(1){
			float: left;
		}
		span:nth-child(2){
			float: right;
		}
		i{
			font-style: normal;
			color: #F15749;
		}
	}
	.news_content{
		width: 70%;
		margin: 0 auto;
		background:#FFFFFF;
    box-shadow:0px 2px 4px 0px rgba(0,0,0,0.2);
    color: #000;
    .news_content1{
    	margin: 0 auto;
    	width: 80%;
      height:80px;
    	border-bottom: 1px solid #f3f3f3;
    	font-weight: bold;
    	line-height: 30px;
      text-align:left;
    	i{
    		font-style: normal;
    		color: #F15749;	
    		font-size: 30px;
    	}
    	.items{
    		color: #000;
    		font-size:16px;
    	}
    	.names{
    		color: #F15749;
    		font-size:14px;
    	}
    	.time{
    		font-size: 12px;
    		color: #666;
    		margin-left: 25px;
    		font-weight:normal;
    	}
    	.details{
    		font-size: 14px;
    		color: #333;
        text-indent:52px;
    	}
    }
    .news_content1:hover{
    	background:rgba(241,87,73,0.1);
    	cursor: pointer;
       }
	   }
  }
</style>
