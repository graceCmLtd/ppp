<template lang="html">
  <div class="footside">
    <div class="footside_con">
      <div class="footside_con_table">
        <el-row>
          <el-col :span="24">
            <el-menu
              :default-active="getDirectory()"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background="#fff"
              active-background-color="red"
              text-color="gray"
              active-text-color="#333333">
              <el-menu-item index="/footside/about"  @click="about()" text-color="#ffd04b"  style="border-bottom:1px solid #E6E6E6; border-top:1px solid #E6E6E6;">关于我们</el-menu-item>
              <el-menu-item index="/footside/help" @click="help()" style="border-bottom:1px solid #E6E6E6;">帮助中心</el-menu-item>
              <el-menu-item index="/footside/clause" @click="clause()"  style="border-bottom:1px solid #E6E6E6;">碰碰票服务条款及说明</el-menu-item>
              <el-menu-item index="/footside/security" @click="security()" style="border-bottom:1px solid #E6E6E6;">安全保障</el-menu-item>
              <el-menu-item index="/footside/cooperation" @click="cooperation()">合作专区</el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <div class="footside_con_mes">
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
    getDirectory(){
      let thePath = this.$route.path;
      console.log(thePath.substr(0,thePath.lastIndexOf("/")+1))
      return thePath.substr(0,thePath.lastIndexOf("/")+1)
    },
    handleClose(key, keyPath) {
    },
    about(){//关于我们
      this.$router.push('/footside/about')
      // this.getindex();
    },
    help(){//帮助中心
      this.$router.push('/footside/help')
    },
    clause(){//碰碰票服务条款及说明
        this.$router.push('/footside/clause')
    },
    security(){//安全保障
        this.$router.push('/footside/security')
    },
    cooperation(){//合作专区
       this.$router.push('/footside/cooperation')
    },
  },
  components:{
    Header:resolve=>{
      require(['@/components/header-all'],resolve)
    },
    Footer:resolve=>{
      require(['@/components/footer-all'],resolve)
    }
  },
}
</script>

<style lang="scss" scoped>
.footside{
  width: 100%;
  height:auto;
  margin-top: 30px;
  .footside_con{
    width: 80%;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin: 0 auto;
    .footside_con_table{
      height:100%;
      background: white;
      margin-top: 30px;
      box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.2);

    }
    .footside_con_mes{
      width: 100%;
      height:100%;
    }
  }
}
</style>