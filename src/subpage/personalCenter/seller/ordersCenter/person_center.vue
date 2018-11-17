<!-- 订单中心 -->
<template lang="html">
  <div class="person_center">
    <div class="person_center_pic">
      <img src="../../../../../static/img/tie.png" alt="">
    </div>
    <div class="person_center_con">
      <div class="person_center_title_external">
        <div class="person_center_title">
          <el-row>
            <el-col :span="4">
              <router-link to="/release/center/all"
                           tag="div" class="center_title"
                           @click.native="centerAll()"
                           :class="{centerAc:color==1}"
              >全部订单({{count1}})
                <span class="person_center_triangle"></span>
              </router-link>
            </el-col>
            <el-col :span="4">
              <router-link to="/release/center/confirmed"
                           tag="div" class="center_title confirmed"
                           @click.native="centerConFirmed()"
                           :class="{centerAc:color==2}"
              >待买家支付({{count2}})
                
                <span class="person_center_triangle"></span>
              </router-link>
            </el-col>
            <el-col :span="4">
              <router-link to="/release/center/refused"
                           tag="div" class="center_title rejected"
                           @click.native="centerRefused()"
                           :class="{centerAc:color==4}"
              >待背书({{count3}})
                
                <span class="person_center_triangle" ref="person_center_triangle_c"></span>
              </router-link>
            </el-col>

            <el-col :span="4">
              <router-link to="/release/center/audit"
                           tag="div" class="center_title"
                           @click.native="centerAudit()"
                           :class="{centerAc:color==5}"
              >待买家签收({{count4}})
                
                <span class="person_center_triangle" ref="person_center_triangle_s"></span>
              </router-link>
            </el-col>

            <el-col :span="4">
              <router-link to="/release/center/completes"
                           tag="div" class="center_title"
                           @click.native="centerCompletes()"
                           :class="{centerAc:color==6}"
              >已完成({{count5}})
                
                <span class="person_center_triangle" ref="person_center_triangle_d"></span>
              </router-link>
            </el-col>

           <el-col :span="4">
              <router-link to="/release/center/invalids"
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
        timer:''
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
        // this.$refs.person_center_triangle_c.style.top='-134.5%';
        // this.$refs.person_center_triangle_c.style.right='-7%'
      },
      centerAudit(){
        this.color=5;
        // this.$refs.person_center_triangle_s.style.right='-9%'
      },
      centerCompletes(){
        this.color=6;
        // this.$refs.person_center_triangle_d.style.right='-11%'
      },
      centerInvalids(){
        this.color=7;
        //this.$refs.person_center_triangle_f.style.right='-13%'
      },
      getItemCount(){
        let _this = this;
        let Id = getCookie('Iud');
        _this.axios.post(this.oUrl+'/transaction/getCountByIntentionStatus',{
            "uuid":Id,
            "role":"seller",
            "filter_str":["已接单,待支付","已支付,待背书","已背书,待签收","已签收","已失效"]
          },
          {headers:{
              'Content-Type':'application/json',
          'Authorization':getCookie('Too')
            }}
        ).then((res)=>{
          //alert(res.data)
          var count1 = 0,count2 = 0,count3 = 0,count4 = 0,count5 = 0,count6 = 0;
          if(res.data.length > 0){
            for(var i = 0;i<res.data.length;i++){
                if(res.data[i].intentionStatus === "已接单,待支付"){
                  count2 = res.data[i].count;
                }
                if(res.data[i].intentionStatus === "已支付,待背书"){
                  count3 = res.data[i].count;
                }
                if(res.data[i].intentionStatus === "已背书,待签收"){
                  count4 = res.data[i].count;
                }
                if(res.data[i].intentionStatus === "已签收"){
                  count5 = res.data[i].count;
                }
                if(res.data[i].intentionStatus === "已失效"){
                  count6 = res.data[i].count;
                }
                count1 += res.data[i].count;
            }
            this.count1 = count1;
            this.count2 = count2;
            this.count3 = count3;
            this.count4 = count4;
            this.count5 = count5;
            this.count6 = count6;
          }
        });
      }
    },
    created(){
      if (this.$route.path == "/release/center/all") {
        this.color = 1
      }else if(this.$route.path =="/release/center/confirmed"){
        this.color =2
      }else if(this.$route.path == "/release/center/refused"){
        this.color =4
      }else if(this.$route.path ==  "/release/center/audit"){
        this.color = 5
      }else if(this.$route.path == "/release/center/completes"){
        this.color = 6
      }else if(this.$route.path == "/release/center/invalids"){
        this.color = 7
      }
      this.getItemCount();
      this.timer = setInterval(this.getItemCount, 2000);
    },
    watch:{
      '$route' (to, from){
        if (this.$route.path == "/release/center/all") {
          this.color = 1
        }else if(this.$route.path =="/release/center/confirmed"){
          this.color =2
        }else if(this.$route.path == "/release/center/refused"){
          this.color =4
        }else if(this.$route.path ==  "/release/center/audit"){
          this.color = 5
        }else if(this.$route.path == "/release/center/completes"){
          this.color = 6
        }else if(this.$route.path == "/release/center/invalids"){
          this.color = 7
        }
      } 
    },
    beforeDestroy() {
      console.log("ssfff1111");
        clearInterval(this.timer);
        console.log("vvxxzzz11");
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
      font-size: 16px;
      font-weight: bold;
      line-height:40px;
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
      border-width:0 7px 7px;
      border-style:solid;
      border-color:transparent transparent #AF2600;
      margin:40px auto;
      position: absolute;
      top: -69%;
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
      margin-left:0.5%;
      margin-top:0.8%;
      // min-height: 500px;
      background: #fff;
      box-shadow:0px 2px 10px 0px rgba(0,0,0,0.2);
      .person_center_title_external{
        width: 100%;
        height:50px;
        position: relative;
        .person_center_title{
          position: absolute;
          bottom:2px;
          border-bottom:3px solid #F15749;
          width: 61%;
          .center_title{
            min-height: 53px;
            line-height:53px;
            cursor:pointer;
            position: relative;
            bottom: -1px;
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
