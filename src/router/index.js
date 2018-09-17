import Vue from 'vue'
import Router from 'vue-router'
import {getCookie} from '@/assets/util'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect:'/page'
    },
    {
      path:'/page',
      name:'Page',
      components:{
        default:resolve=>require(['@/subpage/page'],resolve)
      }
    },

 
    {
      path:'/release',
      name:'Release',
      component:resolve=>require(['@/subpage/release'],resolve),
      children:[
        {
          path:'/release/data',//我的数据
          name:'Data',
          component:resolve=>require(['@/subpage/person_data'],resolve)
        },
        {
        path:'/batch',//批量修改
        name:'Batch',
        component:resolve=>require(['@/subpage/batch'],resolve)
        },
        {
        path:'/invoice',//急速发票
        name:'Invoice',
        component:resolve=>require(['@/subpage/invoice'],resolve)
        },
   
        {
          path:'/release/trad',//平台担保交易
          name:'Trad',
          component:resolve=>require(['@/subpage/platform_trading'],resolve)
        },
        {
          path:'/release/sell',//用户出售的票据
          name:'Sell',
          component:resolve=>require(['@/subpage/person_sell'],resolve)
        },
        {
          path:'/release/buy',//用户买入的票据
          name:'Buy',
          component:resolve=>require(['@/subpage/person_buy'],resolve)
        },
        {
          path:'/release/audit',//用户审核中的票据
          name:'Audit',
          component:resolve=>require(['@/subpage/person_audit'],resolve)
        },






        {
          path:'/release/offer',//用户发布的报价
          name:'ReOffer',
          component:resolve=>require(['@/subpage/person_offer'],resolve),
          children:[
            {
              path:'/release/offer/offerAll',//用户全部报价
              name:'OfferAll',
              component:resolve=>require(['@/subpage/person_offer_all'],resolve)
            },
            {
              path:'/release/offer/offerAccepted',//已被卖家接受的报价
              name:'Accepted',
              component:resolve=>require(['@/subpage/person_offer_accepted'],resolve)
            },
            {
              path:'/release/offer/offerPrices',//报价中
              name:'Prrices',
              component:resolve=>require(['@/subpage/person_offer_prices'],resolve)
            },
            {
              path:'/release/offer/offerCancel',//已失效的报价
              name:'Cancel',
              component:resolve=>require(['@/subpage/person_offer_cancel'],resolve)
            }
          ],
          redirect:'/release/offer/offerAll'
        },






        {
          path:'/release/Receipt',//我的接单
          name:'Receipt',
          component:resolve=>require(['@/subpage/Receipt'],resolve),
          children:[
            {
              path:'/release/Receipt/ReceiptAll',//用户全部报价
              name:'ReceiptAll',
              component:resolve=>require(['@/subpage/Receipt_all'],resolve)
            },
            {
              path:'/release/Receipt/offerPrices',//已被卖家接受的报价
              name:'offerPrices',
              component:resolve=>require(['@/subpage/Receipt_prices'],resolve)
            },
             {
              path:'/release/Receipt/offerCancel',//已被卖家接受的报价
              name:'offerCancel',
              component:resolve=>require(['@/subpage/Receipt_cancel'],resolve)
            },
            {
              path:'/release/Receipt/offerConfirm',//报价中
              name:'offerConfirm',
              component:resolve=>require(['@/subpage/Receipt_confirm'],resolve)
            },
            {
              path:'/release/Receipt/offerInvalid',//已失效的报价
              name:'offerInvalid',
              component:resolve=>require(['@/subpage/Receipt_invalid'],resolve)
            }
          ],
          redirect:'/release/Receipt/ReceiptAll'
        },





        {
          path:'/release/intention',//求贴意向
          name:'Intention',
          component:resolve=>require(['@/subpage/person_intention'],resolve),
          children:[
            {
              path:'/release/intention/all',//全部报价
              name:'IntentionAll',
              component:resolve=>require(['@/subpage/person_intention_all'],resolve)
            },
            {
              path:'/release/intention/confirmed',//待确认的报价
              name:'IntentionConfirmed',
              component:resolve=>require(['@/subpage/person_intention_confirmed'],resolve)
            },
            {
              path:'/release/intention/haveBeen',//已确认的报价
              name:'IntentionHaveBeen',
              component:resolve=>require(['@/subpage/person_intention_haveBeen'],resolve)
            },
            {
              path:'/release/intention/refused',//被拒绝的订单
              name:'IntentionRefused',
              component:resolve=>require(['@/subpage/person_intention_refused'],resolve)
            },
            {
              path:'/release/intention/audit',//审核中订单
              name:'IntentionAudit',
              component:resolve=>require(['@/subpage/person_intention_audit'],resolve)
            }
          ],
          redirect:'/release/intention/all'
        },



        {
          path:'/release/mes',//用户消息
          name:'Mes',
          component:resolve=>require(['@/subpage/person_mes'],resolve)
        },
        {
          path:'/release/pass',//用户修改密码
          name:'Pass',
          component:resolve=>require(['@/subpage/person_pass'],resolve)
        },
        {
          path:'/release/detailed',//买家购买票据详情
          name:'Detailed',
          component:resolve=>require(['@/subpage/person_detailed'],resolve)
        },
        {
          path:'/release/repid',//急速发票
          name:'Repid',
          component:resolve=>require(['@/subpage/release_paper_rapid'],resolve)
        },
        {
          path:'/release/prise',//用户个人企业资料
          name:'Prise',
          component:resolve=>require(['@/subpage/person_prise'],resolve)
        },
        {
          path:'/release/order',//买家资源池
          name:'Order',
          component:resolve=>require(['@/subpage/person_order'],resolve)
        },
        {
          path:'/release/template',//报价模板
          name:'Template',
          component:resolve=>require(['@/subpage/offer_template'],resolve)
        },
        {
          path:'/release/offerde',//买家报价详情
          name:'OfferDe',
          component:resolve=>require(['@/subpage/person_offerDe'],resolve)
        },
        {
          path:'/release/sellerorder',//卖家订单
          name:'SellerOrder',
          component:resolve=>require(['@/subpage/seller_order'],resolve),
          children:[
            {
              path:'/release/sellerorder/haddeal',//已成交订单
              name:'SellerHadDeal',
              component:resolve=>require(['@/subpage/seller_order_haddeal'],resolve)
            },
            {
              path:'/release/sellerorder/cancel',//卖家未成交的订单
              name:'SellerCancelOrder',
              component:resolve=>require(['@/subpage/seller_order_cancel'],resolve)
            }
          ],
          redirect:'/release/sellerorder/haddeal'
        },
        {
          path:'/release/paper',//用户发布的票据
          name:'Paper',
          component:resolve=>require(['@/subpage/person_paper'],resolve),
          children:[
            {
              path:'/release/paper/offerIn',//用户报价中的票据
              name:'OfferIn',
              component:resolve=>require(['@/subpage/person_offerIn'],resolve)
            },
            {
              path:'/release/paper/offerBe',//用户审核中的票据
              name:'OfferBe',
              component:resolve=>require(['@/subpage/person_offerBe'],resolve)
            }
          ],
          redirect:'/release/paper/offerIn'
        },
        {
          path:'/release/choseType',//选择交易
          name:'choseType',
          component:resolve=>require(['@/subpage/person_choseType'],resolve)
        }
      ],
      redirect:'/release/paper'
    },
    {
      path:'/signIn',//注册
      name:'SignIn',
      component:resolve=>require(['@/subpage/signIn'],resolve)
    },
    {
      path:'/signUp',//登录
      name:'SignUp',
      component:resolve=>require(['@/subpage/signUp'],resolve),
      children:[
        {
          path:'/signUp/password',//密码登录
          name:'Password',
          component:resolve=>require(['@/components/password_signup'],resolve)
        },
        {
          path:'/signUp/auth',//验证码登录
          name:'Auth',
          component:resolve=>require(['@/components/auth_signup'],resolve)
        }
      ],
      redirect:'/signUp/password'//默认密码登录
    },
    {
      path:'/releasepa',//发布票据
      name:'ReleasePa',
      component:resolve=>require(['@/subpage/release_paper_A'],resolve)
    },
    {
      path:'/marketpa',//票据市场
      name:'MarketPa',
      component:resolve=>require(['@/subpage/market_paper'],resolve)
    },
    {
      path:'/details',//票据详情
      name:'Details',
      component:resolve=>require(['@/subpage/paper_details'],resolve)
    },
    {
      path:'/offer',//通知买家已报价
      name:'Offer',
      component:resolve=>require(['@/subpage/already_offer'],resolve)
    },
    {
      path:'/nooffer',//通知买家未报价
      name:'NoOffer',
      component:resolve=>require(['@/subpage/no_offer'],resolve)
    },
    {
      path:'/resources',//资源市场
      name:'Resources',
      component:resolve=>require(['@/subpage/market_resources'],resolve)
    }
  ]
});
router.beforeEach((to,from,next)=>{
  //登录权限页面
  const nextRoute=['OfferIn','OfferBe','choseType','SellerCancelOrder','SellerHadDeal','OfferDe','Template',
  'Order','Prise','Repid','Detailed','Pass','Mes','IntentionAudit','IntentionRefused','IntentionHaveBeen',
  'IntentionConfirmed','IntentionAll','Cancel','Prrices','Accepted','OfferAll','Buy','Audit','Sell','Trad',
  'Data','Details','Offer','NoOffer'
];
  if(nextRoute.indexOf(to.name)>-1){
    if(!getCookie('Iud')){
      console.log('Surprise MontherFuck!')
      console.log(window.location.href)
      next('/signUp/password')
    }
  };
  next()
});
router.afterEach((to,from,next) => {
  setTimeout(()=>{
    window.scrollTo(0,0);
  },100)
})
export default router;
