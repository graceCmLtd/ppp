<!-- 求贴意向 -->
<template lang="html">
  <div class="person_center">
    <div class="person_center_pic">
      <img src="../../static/img/tie.png" alt="">
    </div>
    <div class="person_center_con">
      <div class="person_center_title_external">
        <div class="person_center_title">
          <el-row>
            <el-col :span="4">
              <router-link to="/release/orderws/all"
                           tag="div" class="center_title"
                           @click.native="centerAll()"
                           :class="{centerAc:color==1}"
              >全部订单
                <span class="person_center_triangle"></span>
              </router-link>
            </el-col>
            <el-col :span="4">
              <router-link to="/release/orderws/confirmed"
                           tag="div" class="center_title confirmed"
                           @click.native="centerConFirmed()"
                           :class="{centerAc:color==2}"
              >待支付
                
                <span class="person_center_triangle"></span>
              </router-link>
            </el-col>
            <el-col :span="4">
              <router-link to="/release/orderws/refused"
                           tag="div" class="center_title rejected"
                           @click.native="centerRefused()"
                           :class="{centerAc:color==4}"
              >待卖家背书
                
                <span class="person_center_triangle" ref="person_center_triangle_c"></span>
              </router-link>
            </el-col>

            <el-col :span="4">
              <router-link to="/release/orderws/audit"
                           tag="div" class="center_title"
                           @click.native="centerAudit()"
                           :class="{centerAc:color==5}"
              >待签收
                
                <span class="person_center_triangle" ref="person_center_triangle_s"></span>
              </router-link>
            </el-col>

            <el-col :span="4">
              <router-link to="/release/orderws/completes"
                           tag="div" class="center_title"
                           @click.native="centerCompletes()"
                           :class="{centerAc:color==6}"
              >已完成
                
                <span class="person_center_triangle" ref="person_center_triangle_d"></span>
              </router-link>
            </el-col>

           <el-col :span="4">
              <router-link to="/release/orderws/invalids"
                           tag="div" class="center_title"
                           @click.native="centerInvalids()"
                           :class="{centerAc:color==7}"
              >已失效
                
                <span class="person_center_triangle" ref="person_center_triangle_f"></span>
              </router-link>
            </el-col>

          </el-row>
        </div>
      </div>
      <div class="person_center_view">
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
      centerAll(){
        this.color=1;
      },
      centerConFirmed(){
        this.color=2;
      },
      centerHaveBeen(){
        this.color=3;
        this.$refs.person_center_triangle_c.style.top='-134.5%';
        this.$refs.person_center_triangle_c.style.right='-6%'
      },
      centerRefused(){
        this.color=4;
        this.$refs.person_center_triangle_c.style.top='-134.5%';
        this.$refs.person_center_triangle_c.style.right='-7%'
      },
      centerAudit(){
        this.color=5;
        this.$refs.person_center_triangle_s.style.right='-9%'
      },
      centerCompletes(){
        this.color=6;
        this.$refs.person_center_triangle_d.style.right='-11%'
      },
      centerInvalids(){
        this.color=7;
        this.$refs.person_center_triangle_f.style.right='-13%'
      }
    }
  }
</script>

<style lang="scss" scoped>
  body{
    background:#eee;
  }
  .centerAc{
    background: #F15749;
    color:white;
    .person_center_add{
      width: 100%;
      height:14px;
      background: #F15749;
      position: absolute;
      top: -39%;
      left:0;
    }
    .person_center_triangle{
      width:0;
      height:0;
      border-width:0 10px 10px;
      border-style:solid;
      border-color:transparent transparent #AF2600;
      margin:40px auto;
      position: absolute;
      top: -136%;
      right: -7.5%;
      transform:rotate(-135deg);
    }
  }
  .person_center{
    width: 100%;
    height:100%;
    .person_center_pic{
      width: 100%;
      height: 8%;
      text-align: left;

      img{
        width: 100%;
        height: 80px;
      }
    }
    .person_center_con{
      margin-left:1%;
      margin-top:3%;
      // min-height: 500px;
      background: #fff;
      box-shadow:0px 2px 10px 0px rgba(0,0,0,0.2);
      .person_center_title_external{
        width: 100%;
        height:50px;
        position: relative;
        .person_center_title{
          position: absolute;
          bottom:-1px;
          border-bottom:3px solid #F15749;
          width: 49%;
          .center_title{
            min-height: 36px;
            line-height: 36px;
            cursor:pointer;
            position: relative;
            /*background: #F15749;*/
            /*color: #fff;*/
          }
        }
      }
    }
  }
  /*.content{*/
  /*width:125%;*/
  /*height:100%;*/
  /*border:1px solid black;*/
  /*background:#fff;*/
  /*margin: 0 auto;*/

  /*}*/
</style>
