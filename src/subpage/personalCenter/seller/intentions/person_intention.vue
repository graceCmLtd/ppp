<!-- 求贴意向 -->
<template lang="html">
  <div class="person_intention">
    <div class="person_intention_pic">
      <img src="../../../../../static/img/tie.png" alt="">
    </div>
    <div class="person_intention_con">
      <div class="person_intention_title_external">
        <div class="person_intention_title">
          <el-row>
            <el-col :span="5">
              <router-link to="/release/intention/all"
                           tag="div" class="intention_title"
                           @click.native="intentionAll()"
                           :class="{intentionAc:color==1}"
              >全部
                <span class="person_intention_triangle"></span>
              </router-link>
            </el-col>
            <el-col :span="5">
              <router-link to="/release/intention/confirmed"
                           tag="div" class="intention_title confirmed"
                           @click.native="intentionConFirmed()"
                           :class="{intentionAc:color==2}"
              >待买家接单
                
                <span class="person_intention_triangle"></span>
              </router-link>
            </el-col>
            <el-col :span="5">
              <router-link to="/release/intention/refused"
                           tag="div" class="intention_title rejected"
                           @click.native="IntentionRefused()"
                           :class="{intentionAc:color==4}"
              >已拒绝/失效
                
                <span class="person_intention_triangle" ref="person_intention_triangle_c"></span>
              </router-link>
            </el-col>
            <el-col :span="4">
              <router-link to="/release/intention/audit"
                           tag="div" class="intention_title"
                           @click.native="IntentionAudit()"
                           :class="{intentionAc:color==5}"
              >审核中
                
                <span class="person_intention_triangle" ref="person_intention_triangle_s"></span>
              </router-link>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="person_intention_view">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        color:1
      }
    },
    methods:{
      intentionAll(){
        this.color=1;
      },
      intentionConFirmed(){
        this.color=2;
      },
      // intentionHaveBeen(){
      //   this.color=3;
      //   this.$refs.person_intention_triangle_c.style.top='-134.5%';
      //   this.$refs.person_intention_triangle_c.style.right='-6%'
      // },
      IntentionRefused(){
        this.color=4;
        // this.$refs.person_intention_triangle_c.style.top='-134.5%';
        // this.$refs.person_intention_triangle_c.style.right='-7%'
      },
      IntentionAudit(){
        this.color=5;
        this.$refs.person_intention_triangle_s.style.right='-7%'
      }
    },
    created(){
      if (this.$route.path == "/release/intention/all") {
        this.color = 1
      }else if(this.$route.path =="/release/intention/confirmed"){
        this.color =2
      }else if(this.$route.path == "/release/intention/refused"){
        this.color =4
      }else if(this.$route.path ==  "/release/intention/audit"){
        this.color = 5
      }   
    }
  }
</script>

<style lang="scss" scoped>
  body{
    background:#eee;
  }
  .intentionAc{
    background: #F15749;
    color:white;
    font-size: 16px;
    font-weight: bold;
    line-height:40px;
    .person_intention_add{
      width: 100%;
      height:14px;
      background: #F15749;
      position: absolute;
      top: -39%;
      left:0;
    }
    .person_intention_triangle{
      width: 0;
      height: 0;
      border-width: 0 7px 7px;
      border-style: solid;
      border-color: transparent transparent #AF2600;
      margin: 40px auto;
      position: absolute;
      top: -69%;
      right: -7.5%;
      -webkit-transform: rotate(-135deg);
      transform: rotate(-135deg);
    }
  }
  .person_intention{
    width: 100%;
    height:100%;
    .person_intention_pic{
      width: 100%;
      height: 8%;
      text-align: left;

      img{
        width: 100%;
        height: 80px;
      }
    }
    .person_intention_con{
 
       margin-left: 0.5%;
       margin-top: 0.8%;
      // min-height: 500px;
      background: #fff;
      box-shadow:0px 2px 10px 0px rgba(0,0,0,0.2);
      .person_intention_title_external{
        width: 100%;
        height:50px;
        border-bottom:3px solid #F15749;
        position: relative;
        .person_intention_title{
          position: absolute;
          bottom: 2px;
          width: 49%;
          .intention_title{
            min-height: 53px;
            line-height: 53px;
            cursor: pointer;
            position: relative;
            width: 130px;
            bottom: -2px;
          }
        }
      }
    }
  }
</style>
