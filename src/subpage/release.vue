<template lang="html">
  <div class="release">
    <!-- <Header/> -->
    <div class="release_con">
      <div class="release_con_table">
        <el-row>
          <el-col :span="24">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#fff">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>我是买家</span>
                </template>
                <el-menu-item index="1-1"  @click="data()" text-color="#ffd04b">我的求贴</el-menu-item>
                <el-menu-item index="1-2" @click="offer()">求贴意向</el-menu-item>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>我是卖家</span>
                </template>
                <el-menu-item index="1-2" @click="order()">我的报价</el-menu-item>
                <el-menu-item index="1-2">我的接单</el-menu-item>
                <el-menu-item index="1-2" @click="releaseOffer()">发布/修改资源池报价</el-menu-item>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>我的订单</span>
                </template>
                <el-menu-item index="1-1" @click="sell()">我卖出的</el-menu-item>
                <el-menu-item index="1-2" @click="buy()">我买入的</el-menu-item>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>设置&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </template>
                <el-menu-item index="1-1" @click="prise()">企业认证信息</el-menu-item>
                <el-menu-item index="1-2">账户安全</el-menu-item>
                <el-menu-item index="1-3" @click="message()">我的消息</el-menu-item>
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
      if(getCookie('isAu')=='false'){
        this.$router.push('/release/data')
      }else{
        this.$router.push('/release/prise')
      }
    },
    order(){//买家资源池票据
      this.$router.push('/release/offer')
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
  min-width: 1378px;
  .release_con{
    width: 70%;
    height:100%;
    margin-left: 15%;
    display: flex;
    .release_con_table{
      width: 22%;
      height:100%;
      background: white;
    }
    .release_con_mes{
      width: 70%;
      height:100%;
    }
  }
}
</style>
