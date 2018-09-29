<template lang="html">
  <div class="release">
    <div class="release_con">
      <div class="release_con_table">
        <el-row>
          <el-col :span="24">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#fff"
              text-color="#333"
              active-text-color="#666666">
              <el-submenu index="1">
                <template slot="title">
                  <!-- <i class="el-icon-location"></i> -->
                  <span style="font-weight:bold;">我是卖家</span>
                </template>
                <el-menu-item index="1-1"  @click="data()" text-color="#ffd04b" style="border-bottom:1px solid #E6E6E6; border-top:1px solid #E6E6E6;">我的求贴</el-menu-item>
                <el-menu-item index="1-2" @click="offer()">求贴意向</el-menu-item>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <!-- <i class="el-icon-location"></i> -->
                  <span style="font-weight:bold;">我是买家</span>
                </template>
                <el-menu-item index="1-2" @click="order()" style="border-bottom:1px solid #E6E6E6; border-top:1px solid #E6E6E6;">我的报价</el-menu-item>
                <el-menu-item index="1-2" @click="jie()" style="border-bottom:1px solid #E6E6E6;">我的接单</el-menu-item>
                <el-menu-item index="1-2" @click="releaseOffer()">发布/修改资源池报价</el-menu-item>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <!-- <i class="el-icon-location"></i> -->
                  <span style="font-weight:bold;">我的订单</span>
                </template>
                <el-menu-item index="1-1" @click="sell()" style="border-bottom:1px solid #E6E6E6; border-top:1px solid #E6E6E6;">我卖出的</el-menu-item>
                <el-menu-item index="1-2" @click="buy()" style="border-bottom:1px solid #E6E6E6;">我买入的</el-menu-item>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <!-- <i class="el-icon-location"></i> -->
                  <span style="font-weight:bold;">设置&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </template>
                <el-menu-item index="1-1" @click="prise()" style="border-bottom:1px solid #E6E6E6; border-top:1px solid #E6E6E6;">企业认证信息</el-menu-item>
                <el-menu-item index="1-2" style="border-bottom:1px solid #E6E6E6;">账户安全</el-menu-item>
                <el-menu-item index="1-3" @click="message()" >我的消息</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <div class="release_con_mes">
        <router-view></router-view>   
      </div>
    </div>
    <Footer :height="minHeight"/>
  </div>
</template>

<script>
import {getCookie} from '@/assets/util'
export default {
	data(){
		return {
      minHeight:'5%'
		}
	},
	methods:{
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    data(){//我的求贴
      this.$router.push('/release/paper')
    },
    message(){//我的消息
      this.$router.push('/release/mes')
    },
    sell(){//用户卖出的票据
        this.$router.push('/release/sellerorder')
    },
    buy(){//用户买入的票据
      this.$router.push('/release/buy')
    },
    offer(){//用户发布的报价
      this.$router.push('/release/intention')
    },
    prise(){//用户企业认证信息
      if(getCookie('isAu')=='true'){
        this.$router.push('/release/prise')
      }else{
        alert("您还未进行认证，已为您跳转到认证页面...");
        this.$router.push('/release/data')
      }
    },
    order(){//买家资源池票据
      this.$router.push('/release/offer')
    },
    jie(){//我的接单
      this.$router.push('/release/Receipt')
    },
    releaseOffer(){  //发布/修改报价
      this.$router.push('/release/template')
    }
	},
  components:{
    Header:resolve=>{
      require(['@/components/header-all'],resolve)
    },
    Footer:resolve=>{
      require(['@/components/footer-all'],resolve)
    }
  }
}
</script>

<style lang="scss" scoped>
.release{
  width: 100%;
  height:auto;
  margin-top: 30px;
  .release_con{
    width: 99%;
    height:100%;
    display: flex;
    .release_con_table{
      height:100%;
      background: white;
      margin-top: 3px;
      box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.2);

    }
    .release_con_mes{
      width: 100%;
      height:100%;
    }
  }
}
</style>
