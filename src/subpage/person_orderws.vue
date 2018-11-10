<!-- 我是买家 订单中心 -->
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
              >全部订单({{count1}})
                <span class="person_center_triangle"></span>
              </router-link>
            </el-col>
            <el-col :span="4">
              <router-link to="/release/orderws/confirmed"
                           tag="div" class="center_title confirmed"
                           @click.native="centerConFirmed()"
                           :class="{centerAc:color==2}"
              >待支付({{count2}})
                
                <span class="person_center_triangle"></span>
              </router-link>
            </el-col>
            <el-col :span="4">
              <router-link to="/release/orderws/refused"
                           tag="div" class="center_title rejected"
                           @click.native="centerRefused()"
                           :class="{centerAc:color==4}"
              >待卖家背书({{count3}})
                
                <span class="person_center_triangle" ref="person_center_triangle_c"></span>
              </router-link>
            </el-col>

            <el-col :span="4">
              <router-link to="/release/orderws/audit"
                           tag="div" class="center_title"
                           @click.native="centerAudit()"
                           :class="{centerAc:color==5}"
              >待签收({{count4}})
                
                <span class="person_center_triangle" ref="person_center_triangle_s"></span>
              </router-link>
            </el-col>

            <el-col :span="4">
              <router-link to="/release/orderws/completes"
                           tag="div" class="center_title"
                           @click.native="centerCompletes()"
                           :class="{centerAc:color==6}"
              >已完成({{count5}})
                
                <span class="person_center_triangle" ref="person_center_triangle_d"></span>
              </router-link>
            </el-col>

           <el-col :span="4">
              <router-link to="/release/orderws/invalids"
                           tag="div" class="center_title"
                           @click.native="centerInvalids()"
                           :class="{centerAc:color==7}"
              >已失效({{count6}})
                
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
  import {getCookie} from '@/assets/util'
  export default {
    data(){
      return{
        color:1,
        count1:0,
        count2:0,
        count3:0,
        count4:0,
        count5:0,
        count6:0,
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
      },
      centerInvalids(){
        this.color=7;
        this.$refs.person_center_triangle_f.style.right='-13%'
      },
      getItemCount(){
        let _this = this;
        let Id = getCookie('Iud');
        _this.axios.post(this.oUrl+'/transaction/getCountByIntentionStatus',{
            "uuid":Id,
            "role":"buyer",
            "filter_str":["已接单,待支付","已支付,待背书","已背书,待签收","已签收","已失效"]
          },
          {headers:{
              'Content-Type':'application/json'
            }}
        ).then((res)=>{
          //alert(res.data)
          if(res.data.length > 0){
            for(var i = 0;i<res.data.length;i++){
                if(res.data[i].intentionStatus === "已接单,待支付"){
                  this.count2 = res.data[i].count;
                }
                if(res.data[i].intentionStatus === "已支付,待背书"){
                  this.count3 = res.data[i].count;
                }
                if(res.data[i].intentionStatus === "已背书,待签收"){
                  this.count4 = res.data[i].count;
                }
                if(res.data[i].intentionStatus === "已签收"){
                  this.count5 = res.data[i].count;
                }
                if(res.data[i].intentionStatus === "已失效"){
                  this.count6 = res.data[i].count;
                }
                this.count1 += res.data[i].count;
            }
          }
        });
      }
    },
    created(){
      if (this.$route.path == "/release/orderws/all") {
        this.color = 1
      }else if(this.$route.path =="/release/orderws/confirmed"){
        this.color =2
      }else if(this.$route.path == "/release/orderws/refused"){
        this.color =4
      }else if(this.$route.path ==  "/release/orderws/audit"){
        this.color = 5
      }else if(this.$route.path == "/release/orderws/completes"){
        this.color = 6
      }else if(this.$route.path == "/release/orderws/invalids"){
        this.color = 7
      }
      this.getItemCount();
    },
    watch:{
      '$route' (to, from){
        if (this.$route.path == "/release/orderws/all") {
          this.color = 1
        }else if(this.$route.path =="/release/orderws/confirmed"){
          this.color =2
        }else if(this.$route.path == "/release/orderws/refused"){
          this.color =4
        }else if(this.$route.path ==  "/release/orderws/audit"){
          this.color = 5
        }else if(this.$route.path == "/release/orderws/completes"){
          this.color = 6
        }else if(this.$route.path == "/release/orderws/invalids"){
          this.color = 7
        }
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
      top: -135%;
      right: -9.5%;
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
          width: 61%;
          .center_title{
            min-height: 36px;
            line-height: 36px;
            cursor:pointer;
            position: relative;
            /*background: #F15749;*/
            /*color: #fff;*/
            width:130px;
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
