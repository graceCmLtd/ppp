<!-- 首页下 -->
<template lang="html">
  <div class="news_all">
  	<div class="news_first">
  		<span>全部消息（<i>7</i>/<i>13</i>）</span>
  		<span>全部标记为已读</span>
  	</div>
  	<div class="news_content">
  	   <div class="" v-for="(item,index) in msgList" :key="index">
  		 <div class="news_content1">
  		 	<p>
  		 		<i>·</i>
  		 		<span class="items">「{{item.msgType}}」</span> 
  		 	  <span class="names">您的提交的公司信息已经通过审核</span>
  		 		<span class="time">10月19日 15:32</span>
          <span style="float:right; color:#979797;"  @click="delItem(index)">x</span>
  		 	</p>
  		 	<p class="details">{{item.msgContent}}</p>
        
  		 </div>
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
      msg:''
		}
	},
    methods:{
    // 删除
        delItem: function(index){
          this.msgList.splice(index,1);
      },
      receive(){
        let Id = getCookie('Iud');
        console.log(Id);
        var _this = this;
        if(typeof GoEasy !== 'undefined'){ 
          var goEasy = new GoEasy({
            appkey:'BC-a9752c0d240f407298d5346075fb6de4',
            onConnected:function(){ 
                console.log("Connect to GoEasy success."); 
            } , 
            onDisconnected:function(){ 
                console.log("Disconnect to GoEasy server."); 
            } , 
            onConnectFailed:function(error){ 
                console.log("Connect to GoEasy failed, error code: "+ error.code+" Error message: "+ error.content); 
            } 
          });
        }
        console.log("vvvvvvvv")
        //console.log(goEasy.subscribe)
        goEasy.subscribe({
            channel: Id,
        onMessage: function (message) {
              alert("Channel:" + message.channel + " content:" + message.content);
              console.log("wwwsssss");
              _this.msgList.push(JSON.parse(message.content));
              console.log('cds'+_this.msg);
        }
        });
        console.log("end")
      }
    },
    created(){
      this.receive();
    }
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
    		font-size: 20px;
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
