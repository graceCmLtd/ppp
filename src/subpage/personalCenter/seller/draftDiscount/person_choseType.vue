<!-- 选择交易 -->
<template lang="html">
  <div class="person_choseType">
      <div class="choseType_payMes">
        <div class="mes_lefts">
            <p class="choseType_company">{{billData.acceptor}}</p>
            <p><i>票据类型：</i>&nbsp;&nbsp;&nbsp;<span>{{billType}}</span></p>
            <p><i>汇票到期日：</i>&nbsp;&nbsp;&nbsp;<span>{{releaseDate}}(剩{{billData.remain_days}}天)</span></p>
            <p><i>票面金额：</i>&nbsp;&nbsp;&nbsp;<span>{{formatNumToStr(billAmount)}}</span></p>
            <p><i>出票日期：</i>&nbsp;&nbsp;&nbsp;<span>{{maturityDay}}</span></p>
        </div>
        <div class="mes_rights">
          <p><i>贴现利率：</i>&nbsp;&nbsp;&nbsp;<span>{{billData.interest}}</span>%</p>
          <p><i>每10w加：</i>&nbsp;&nbsp;&nbsp;<span>{{billData.xPerLakh}}</span></p>
          <p><i>实收金额：</i>&nbsp;&nbsp;&nbsp;<span>{{formatNumToStr(billData.real_money)}}</span></p>
          <p><i>联系人：</i>&nbsp;&nbsp;&nbsp;<span>{{billData.companyName}}</span></p>
          <p><i>联系电话：</i>&nbsp;&nbsp;&nbsp;<span>{{billData.contactsPhone}}</span></p>
      </div>
</div>
    <!-- <p>期望利率：&nbsp;&nbsp;&nbsp;<span>10</span>%</p> -->
    <p class="pic_title">
      <span>汇票图片</span>
    </p>
    <div class="paper_pic">
      <img :class="{'active':isChoose}"  src="../../../../../static/img/banner2.jpg" alt="" ref="choseTypePic" @click="imgScc">
    </div>
    <!-- <div style="float:left; margin-left:31%;margin-top:15px;">交易方式： 三方担保支付</div> -->
    <p class="pic_title">
      <span>收款账户</span>
    </p>
    <div class="choseType_payMes">
      <div class="mes_left">
        <ul>
            <li><i>交易方式：</i> 担保支付</li>
            <li><i>户名：</i><span>{{billData.companyName}}</span></li>
            <li><i>开户行：</i><span>{{billData.bankName}}</span></li>
            <li><i>账号：</i><span>{{billData.bankAccount}}</span></li>
        </ul>
      </div>
    </div>
    <p class="choseType_alt">
      担保费万分之5，比如每10万收费50元，每100万收费500元，5000封顶
    </p>
    <p class="choseType_agreement"  >
      <input type="radio" name="" value="" checked="checked" @click="radioA()" v-show="TypeAgShowT">
      <input type="radio" name="" value="" :checked="checkedB" @click="radioB()" v-show="TypeAgShowB">
      <span  @click="open">接受担保交易条款</span>
    </p>
    <p class="choseType_turn">
      <button type="button" name="button" @click="palceThink()">提交意向</button>
    </p>
  </div>
</template>

<script>
import {getCookie} from '@/assets/util'
export default {
  data(){
    return{
      TypeAgShowT:false,
      TypeAgShowB:true,
      checkedB:false,
      billType:null,
      releaseDate:null,
      billAmount:null,
      maturityDay:null,
      remain_days:'',
      billN:null,
      billData:[],
      quoterId:'',
      orderId:null,
      isChoose:false,
      acceptor:'',
      preRealMoney:0
    }
  },
  methods:{
    radioA(){
      this.TypeAgShowT=false;
      this.checkedB=false;
      this.TypeAgShowB=true;
    },
    radioB(){
      this.TypeAgShowT=true;
      this.checkedB=false;
      this.TypeAgShowB=false;
    },
    palceThink(){
      let _this=this;
      if(!this.TypeAgShowT){
        alert('请先接收担保交易条款')
      }else{
        /*_this.fetch.myPost('/quote/submitIntention',{
          "billNumber":_this.billN,
          "quoteStatus":'卖家确认'
        },
        {headers:{
          'Content-Type':'application/json'
        }}
      ).then((res)=>{
        //console.log(res)
        window.history.back()
      })*/
      /*sop1 买家操作1 提交意向，等待买家接单*/
      //console.log(_this.orderId);
      //console.log("quoterId ........")
      //console.log(_this.quoterId)
      //console.log(getCookie('Iud'))
      _this.fetch.myPost('/transaction/updateIntentionStatus',{
            "operate":"sop1",
            "InvalidateBody":{
              "billNumber":_this.billN,
              "quoterId":_this.quoterId,
              "quoteStatus":"已报价,待接受"
            },
            "validateBody":{
              "billNumber":_this.billN,
              "quoterId":_this.quoterId,
              "quoteStatus":"报价完成,进入意向"
            },
            "transactionBody":{
              "quoterId":_this.quoterId,
              "orderId":_this.orderId,
              "preRealMoney":_this.preRealMoney,
              "intentionStatus":"待接单"
            },
            "message":{
                  "msgType":"交易",
                  "senderId":getCookie("Iud"),
                  "receiverId":_this.quoterId,
                  "msgContent":"您有新的意向信息,票号后四位("+_this.billN.substring(_this.billN.length-4)+")承兑银行："+_this.acceptor+"的报价已被接受，请到我的接单页面待接单查看",
                  "flag":"0",
                  "path":"/release/Receipt/offerCancel"
                }
          },
        {headers:{
          'Content-Type':'application/json',
          'Authorization':getCookie('Too')
        }}
      ).then((res)=>{
        //console.log(res)
        window.history.back()
      })

      }
    },
    formatNumToStr(num){
        return this.util.formatNumberToStr(num)
      },
    receiveBills(){
      let _this=this;
      let bill=this.$route.query.bills
      //this.billData = this.$route.query.noteL;
      var object = this.$route.query.noteL;
      if(object instanceof Object){
        window.localStorage.setItem('item',JSON.stringify(object));
      }
      this.billData = JSON.parse(window.localStorage.getItem('item'));
      this.preRealMoney = this.billData.real_money
      this.billData.real_money = Number((this.billData.real_money-(this.billData.real_money*5/10000))/10000).toFixed(2);
      this.acceptor = this.billData.acceptor;
      //console.log("billData")
      //console.log(this.billData)
      _this.billN=this.$route.query.bills;
      _this.quoterId = this.$route.query.quoterId;
      _this.fetch.httpGet({
        url:'/bills/getbill',
        params:{
          billNumber:bill
        }
      }).then((res)=>{
        //console.log("获取票据信息")
        //console.log(res)
        //_this.billData = res.data[0];
        _this.billType=res.data[0].billType;
        _this.releaseDate=res.data[0].releaseDate;
        _this.billAmount=res.data[0].amount;
        _this.maturityDay=res.data[0].maturity;
        _this.fetch.httpGet({
          url:'/bills/getBillPics',
          params:{
            billNumber:bill
          }
        }).then((res)=>{
          //console.log(res)
          _this.$refs.choseTypePic.src=res.data[0].pic1;
        });
        _this.fetch.httpGet({
          url:'/transaction/getOrderId',
          params:{
            billNumber:bill
          }
        }).then((res)=>{
          //console.log(res.data);
            if(res.data.length > 0)
              _this.orderId = res.data[0].transactionType;
        });
      })
    },

    open(){
        this.$alert(
          '<div id="aaa"><p>您正在访问碰碰票(www.pengpengpiao.com，以下简称“碰碰票”)，碰碰票由格熙（海南）区块链科技有限公司运营，我们依照以下服务条款向您提供本服务条款涉及的相关服务。请您使用碰碰票前仔细阅读本服务条款。若要继续访问和使用碰碰票，您必须不加修改地完全接受本网站的服务声明中所包含的各项条款、政策以及指南，并同意碰碰票即时刊登的通告，并且遵守中国政府有关互联网的相关法律政策，以及遵守本网站制定的各项规定与规则。</p><p>您一旦使用碰碰票的服务，即视为您已了解并完全同意本服务条款各项内容，包括碰碰票对服务条款随时做的任何修改。除非另有规定，否则任何变更或修改将在修订内容于碰碰票发布之时立即生效，您对碰碰票的使用将表明您接受此变更或修改。如您不同意本服务协议及/或随时对其的修改、及/或法律声明，您可以停止访问碰碰票并放弃选择碰碰票提供的服务。</p><p><p>一.服务内容</p>1.1 碰碰票的具体服务内容由碰碰票根据实际情况提供，包括票据询价撮合系统和电子票据在线交易系统。票据撮合系统提供的内容（包括但不限于用户的单位名称、联系人、联系信息、业务产品的描述和说明、相关图片、相关业务收费等）的信息均由用户在线提交或者用户授权碰碰票工作人员提交发布，相关用户依法应对其发布的任何信息承担全部责任，碰碰票对此类信息的准确性、完整性、合法性或真实性均不承担任何责任。用户在使用电子票据在线交易系统进行交易时，用户授权碰碰票通过电子商业汇票系统查询标的票据的票面信息、背书记录、影像等相关信息，详细使用规则参考《碰碰票票据权利转让协议》。此外，除碰碰票特殊说明外，碰碰票对使用或提供本网站信息的商业活动及其风险不承担任何责任。碰碰票对提供的服务拥有最终解释权。</p><p>1.2 碰碰票保留根据实际情况随时调整碰碰票平台提供服务种类、形式。碰碰票不承担因业务调整给用户造成的损失。碰碰票保留变更、中断或终止部分网络服务的权利。</p><p>1.3 碰碰票在碰碰票上向其用户提供相关网络服务，与相关网络服务有关的设备（如个人电脑及其他与接入互联网或移动网有关的装置）及所需费用（如接入互联网而支付的电话费以上网费）均由用户自行负担。</p><p>二、内容使用权</p><p>2.1 我们鼓励用户充分利用碰碰票平台自由地张贴和共享他们自己的信息。您可以自由张贴从个人主页或其他网站复制的图片等内容，但这些内容必须属于公共领域或者您拥有这些内容的所有权或使用权。</p><p>2.2 用户不得在自己的个人主页或社区中张贴他人享有版权保护的内容。</p><p>2.3 碰碰票对用户提供内容使用权参见第七条知识产品的相关规定。</p><p>2.4 碰碰票针对网站上的特定服务收费。若用户所使用的服务需收取费用，用户有权决定是否使用并接受该收费服务。碰碰票上的收费服务以人民币计价，定价上可能随时调整。我们将以网站公告的方式，来通知用户收费政策的变更。本网站也可选择在促销或新服务推出时，暂时调整我们的费用，该调整于我们公布促销或新服务时起开始生效，付费服务是在系统接收到用户的付款后才开始。付费服务功能一旦开始，用户不得以任何理由要求减少时间或退款，若因个人行为（如:自行删除）或发布信息内容违反碰碰票公约（公约以付费实际发生时的公约为准）而被转移类目或被删除，碰碰票将不予退款。碰碰票因网站自身需要进行改版的，若涉及付费产品的实质性变化，包括但不限于产品取消、服务内容发生增加或减少、登载页面变更、发布城市变更的，碰碰票可提前终止服务并将客户已付款但未履行服务部分款项退还客户。此种情况不视为碰碰票违约。</p><p>三、注册信息和隐私保护</p><p>3.1 用户在申请使用碰碰票服务时，必须提供真实的个人资料，并不断更新注册资料。如果因注册信息不真实而引起的问题及其后果，碰碰票不承担任何责任。倘若碰碰票发现用户注册资料是虚假、不准确或不完整的，则可自行决定终止该用户的帐号</p><p>3.2用户注册成功后，碰碰票提供用户一个用户帐号及相应的密码，该用户帐号和密码由用户自行负责保管。用户应当对以其用帐号进行的所有活动和事件负法律责任。</p><p>3.3因黑客行为、计算机病毒侵入或发作或您保管疏忽致使帐号、密码被他人非法使用、盗用、篡改的或丢失的，碰碰票不承担责任。如果您发现任何非法使用用户帐号或安全漏洞的情况，请立即与碰碰票联系，一旦核实采纳，碰碰票将酌情给予奖励。</p><p>3.4保护用户隐私是碰碰票的重点原则，碰碰票通过技术手段、提供隐私保护服务、强化内部管理等办法充分保护用户的个人资料安全。</p><p>3.5 用户不可以通过自动方式创建帐户，也不可以对帐户使用自动系统执行操作，否则，碰碰票可自行决定终止该用户账号。</p><p>3.6 碰碰票保证不对外公开或第三方提供用户注册的个人资料，及用户在使用服务时存储的非公开内容，但下列情况除外：<p>（1）事先获得用户的授权；</p><p>（2）按照相关司法机构或政府主管部门的要求；</p><p>（3）只有透露您的资料才能提供您所要求的产品和服务；</p><p>（4）以维护碰碰票合法权益之目的；</p><p>（5）维护社会公正利益；</p><p>（6）符合其他合法要求；</p><p>（7）由于与本网站链接的其他网站所造成用户资料泄漏及由此导致的任何法律争议和后果。</p></p><p>3.7 6个月未登录的帐号，碰碰票保留关闭的权利。</p><p>四．社区准则</p><p>4.1 用户在使用碰碰票服务过程中，必须遵循国家的相关法律法规，不通过本网站发布、上传、散播、分发、存储、创建或以其它方式公开以下各项：<p>（1）反对宪法所确定的基本原则的；</p><p>（2）危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</p><p>（3）损害国家荣誉和利益的；</p><p>（4）煽动民族仇恨、民族歧视，破坏民族团结的；</p><p>（5）破坏国家宗教政策，宣扬邪教和封建迷信的；</p><p>（6）散布谣言，扰乱社会秩序，破坏社会稳定的；</p><p>（7）散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的、欺诈性的或以其它令人反感的讯息、数据、信息、文本、音乐、声音、照片、图形、代码或其它材料（"内容"）；</p><p>（8）侮辱或者诽谤他人，侵害他人合法权益的；</p><p>（9）其他违反宪法和法律、行政法规或规章制度的；</p><p>（10）可能侵犯他人的专利、商标、商业秘密、版权或其它知识产权或专有权利的内容；</p><p>（11）假冒任何人或实体或以其它方式歪曲您与任何人或实体之关联性的内容；</p><p>（12）未经请求而擅自提供的促销信息、政治活动、广告或意见征集；</p><p>（13）任何第三方的私人信息，包括但不限于地址、电话号码、电子邮件地址、身份证号以及信用卡卡号；</p><p>（14）病毒、不可靠数据或其它有害的、破坏性的或危害性的文件；</p><p>（15）与内容所在的互动区域的话题不相关的内容；</p><p>（16）依碰碰票的自行判断，足以令人反感的内容，或者限制或妨碍他人使用或享受互动区域或本网站的内容，或者可能使碰碰票其关联方或用户遭致任何类型损害或责任的内容；</p><p>（17）包含法律或行政法规禁止内容的内容</p></p><p>4.2 用户不得利用本站的服务从事下列危害计算机信息网络安全的活动：<p>（1）未经允许，进入计算机信息网络或者使用计算机信息网络资源；</p><p>（2）未经允许，对计算机信息网络功能进行删除、修改或者增加；</p><p>（3）未经允许，对进入计算机信息网络中存储、处理或者传输的数据和应用程序进行删除、修改或者增加；</p><p>（4）故意制作、传播计算机病毒等破坏性程序；</p><p>（5）其他危害计算机信息网络安全的行为。</p></p><p>4.3 碰碰票保留经自行裁决和判断而过滤、编辑或移除任何上述内容的权利。</p><p>4.4 碰碰票对用户或任何第三方发布、存储或上传的任何内容或其任何损失或损害，均不负责也不承担责任，对用户可能遇到的任何错误、中伤、诽谤、诬蔑、不作为、谬误、淫秽、色情或亵渎，碰碰票也不承担责任。作为网络服务的提供者，碰碰票对其用户在任何论坛、个人主页或其它互动区域提供的任何陈述、声明或内容均不承担责任。碰碰票保留在任何时候为任何理由而不经通知地移除、筛查或编辑本网站上发布或存储的任何内容的权利，且其具有绝对的裁量权如此行为，您须自行负责备份和替换在本网站发布或存储的任何内容，成本和费用自理。</p><p>4.5 违反上述规定使用互动区域或本网站其它部分的，将构成对本网站条款的违反，并且除其它结果外，还可能导致您使用互动区域和／或本网站的权利的终止或中止。为了配合政府的合法要求、传票或法院指令，为了保护碰碰票的系统和客户，或者为了确保碰碰票业务和系统的完整与操作，碰碰票可能获取和披露其认为必要或恰当的任何信息，包括但不限于用户的个人信息（即：姓名、电子邮箱地址，等等）、IP地址和流量信息、使用历史以及发布内容。碰碰票对任何此等信息的披露权应优先于碰碰票隐私政策的任何规定。</p><p>4.6 除非与碰碰票单独签订合同，否则不得将碰碰票上的任何信息用于商业目的。</p><p>4.7 碰碰票仅供以机构为载体的用户使用。</p><p>4.8 用户须对自己在使用碰碰票服务过程中的行为承担法律责任。若用户为限制行为能力或无行为能力者，用户的法定监护人应承担相应的法律责任。</p><p>4.9 用户影响系统总体稳定性或完整性的操作可能会被暂停或终止，直到问题得到解决。</p><p>五．免责声明</p><p>5.1 互联网是一个开放平台，用户将文章或照片等个人资料上传到互联网上，有可能会被其他组织或个人复制、转载、擅改或做其它非法用途，用户必须充分意识此类风险的存在。用户明确同意，其使用碰碰票服务所存在的风险将完全由其自己承担；因其使用碰碰票服务而产生的一切后果也由其自己承担，碰碰票对用户不承担任何责任。</p><p>5.2 碰碰票对任何他人的违反道德的或非法的内容或行为或对他人权利（包括但不限于知识产权）的侵犯不承担责任；并对任何第三方通过碰碰票发送服务或在服务中包含的任何内容不承担责任。</p><p>5.3 碰碰票对用户不提供以下保证：包括但不限于不保证服务一定能满足用户的要求；也不保证服务不会中断；对服务的及时性、安全性、准确性也都不作保证。对于因不可抗力或任何非碰碰票原因造成的网络服务中断或其他缺陷，碰碰票不承担任何责任。</p><p>5.4 用户明确同意，其使用碰碰票服务所存在的风险及产生的一切后果由其自己承担。</p><p>5.5 任何情况下，因使用碰碰票而引起或与使用碰碰票有关的碰碰票的责任总额，无论是基于合同、保证、侵权（包括主动、被动或推定过失）、产品责任、严格责任或其它理论，均不得超过您因访问或使用本网站而向碰碰票支付的任何报酬（如果有的话）。</p><p>六．服务变更、中断或终止</p><p>6.1 如因系统维护或升级的需要而需暂停网络服务、服务功能的调整，碰碰票将尽可能在网站上进行通告。由于用户未能及时流量通告信息而造成的损失，碰碰票不承担任何责任。</p><p>6.2 用户同意，碰碰票可自行决定变更提供服务的内容，碰碰票可自行决定授权第三方向用户提供原本由碰碰票提供的服务，不需向用户承担任何因变更服务所产生的责任。</p><p>6.3 如发生下列任何一种情形，碰碰票有权单方面中断或终止向用户提供服务而无需通知用户，无需对用户或第三方承担任何责任：<p>（1）用户提供的个人资料不真实；</p><p>（2）用户违反本服务条款；</p><p>（3）未经碰碰票同意，将碰碰票平台用于商业目的。</p></p><p>6.4 用户可随时根据需要通知碰碰票终止提供服务，用户服务终止后，用户使用服务的权利同时终止。自用户终止之日起，碰碰票不再向用户承担任何责任。</p><p>七．知识产权</p><p>7.1 用户作如下声明和保证：<p>（1）对于发布或以其它方式传播的内容，拥有并掌控着所有的权利，或者您以其它方式拥有在碰碰票发布和传播此等内容的合法权利；</p><p>（2）此等内容是合法的、真实的、准确的、非误导性的；</p><p>（3）使用和发布此等内容或以其它方式传播此等内容不违反本服务条款，也不侵犯任何人或实体的任何权利或造成对任何人或实体的伤害。</p></p><p>7.2 除权利人外，其他任何人未经权利人事先书面同意，不能擅自复制、传播这些内容，或用于其他任何商业目的，所有这些资料或资料的任何部分仅可作为个人或非商业用途而保存在某台计算机内。否则，碰碰票及或权利人将追究侵权者法律责任。</p><p>7.3 若用户向碰碰票发布或传播内容，或通过本网站发布或传播内容，用户在保留精神权利情况下，用户特此同意：<p>（1）向碰碰票及其关联方在免转让费的基础上转让如下权利，即：可使用、复制、修改、改编、翻译、传播、发表此等内容，从此等内容创建派生作品，以及在全世界范围内通过任何媒介（现在已知的或今后发明的）公开展示和表演此等内容；</p><p>（2）授予碰碰票及其关联方和再许可人一项权利，可依他们的选择而使用用户有关此等内容而提交的名称；</p><p>（3）用户进一步授予碰碰票以下权利，即：对因违反本服务条款而侵犯您，或者碰碰票就内容享有的权利的任何人或实体，将按法律追究其责任。</p></p><p>7.4 用户提交的内容、图片等将被视为非保密的，碰碰票无义务将此等内容作为专有信息对待。在不限制前述规定的前提下，碰碰票保留以其认为适当的方式使用内容的权利，包括但不限于删除、编辑、更改、不予采纳或拒绝发布。碰碰票无义务就您提交的内容而向您付款；一旦内容已向碰碰票提交，碰碰票也不向您提供对在碰碰票展示内容进行编辑、删除或作其它修改的机会。</p><p>7.5 如有著作权人发现用户在碰碰票发表的内容侵犯其著作权，并依相关法律、行政法规的规定向碰碰票发出书面通知的，碰碰票有权在不事先通知用户的情况下自行移除相关内容，并依法保留相关数据。用户不得就该种移除行为向碰碰票主张任何赔偿。</p><p>7.6 若用户对7.5条指向内容依法享有发表权，可以向碰碰票及7.5条指向之著作权人一并发出说明被移除内容不侵犯其著作权的书面通知，通知包含如下内容：明确的身份证明、住址、联系方式；被移除内容的合法性证明；被移除内容在互联网上的位置；通知内容的真实性声明。碰碰票收到该通知后，碰碰票有权决定是否恢复被移除内容。</p><p>7.7 碰碰票在此提示用户及著作权人：7.5、7.6书面通知的陈述失实，权利通知提交者将承担对由此造成的全部法律责任（包括但不限于赔偿各种费用及律师费）。</p><p>八．服务条款的完善和修改</p><p>8.1 碰碰票有权根据互联网的发展和中华人民共和国有关法律、法规的变化，不时地完善和修改碰碰票服务条款。</p><p>8.2 碰碰票保留随时修改服务条款的权利，用户在使用碰碰票平台服务时，有必要对最新的碰碰票服务条款进行仔细阅读和重新确认，当发生有关争议时，请以最新的服务条款为准。</p><p>九．特别约定</p><p>9.1 用户使用本服务的行为若有任何违反国家法律法规或侵犯任何第三方的合法权益的情形时，碰碰票有权直接删除该等违反规定之信息，并可以暂停或终止向该用户提供服务。</p><p>9.2 若用户利用本服务从事任何违法或侵权行为，由用户自行承担全部，因此给碰碰票或任何第三方造成任何损失，用户应负责全额赔偿。并尽力使碰碰票免受损害。</p><p>9.3 所有发给用户的通告或通知都可以通过重要页面的公告、通告、电子邮件以及常规信件的形式传送。</p><p>9.4 本服务条款之效力、解释、执行均适用中华人民共和国法律。</p><p>9.5 如发生争议，如双方就本协议内容或其执行发生任何争议，双方应尽量友好协商解决；协商不成时，任何一方均可向碰碰票所在地的人民法院提起诉讼。</p><p>9.6 本服务条款中的标题仅为方便而设，在解释本服务条款时应被忽略。本服务条款最终解释权归碰碰票所有</p></div>',
          '碰碰票服务条款及说明',
          { dangerouslyUseHTMLString: true });
      },
    imgScc:function () {                     
      this.isChoose = !this.isChoose     
     },
  },
  mounted(){
    this.receiveBills()
  },
}
</script>

<style lang="scss" scoped>
.person_choseType{
  width: 100%;
  height:auto;
  padding-left:10%;
  padding-top:6%;
  p{
    text-align: left;
    font-size: 14px;
    margin-bottom:2%;
  }
  .choseType_company{
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 3%;
  }
  .pic_title{
    width: 80%;
    margin-top:5%;
    border-bottom:1px solid #ccc;
    span{
      padding-bottom:.5%;
      border-bottom:4px solid rgba(254,68,43,1);
      font-size: 16px;
      font-weight: bold;
      color:rgba(254,68,43,1);
    }
  }
  .paper_pic{
    width: 80%;
    min-height: 336px;
    position: relative; 
    text-align: center;
    cursor: pointer;
    img{
      width: 750px;
      height:460px;
      transform: scale(1);          
      transition: all ease 0.5s; 
    }
    img.active {     
       transform: scale(1.5);    
       position: absolute;          
       z-index: 100;
       left:-3%;
      }  
  }
  .choseType_payMes{
    width: 80%;
    height: 180px;
    min-height: 180px;
    display: flex;
    .mes_left{
      width: 50%;
      height:100%;
      i{
        font-weight:bold;
        font-style:normal
      }
      ul{
        width: 100%;
        padding-top:5%;
        li{
          text-align: left;
          font-size: 14px;
          margin-bottom: 3%;
          padding-left:17%;
        }
      }
    }
    .mes_lefts{
      width: 50%;
      height:100%;
      margin-top: -26px;
      i{
        font-weight:bold;
        font-style:normal
      }
    }
    .mes_right{
      width: 50%;
      height:100%;
      ul{
        width: 100%;
        padding-top:10%;
        li{
          text-align: left;
          font-size: 14px;
          margin-bottom: 3%;
          padding-left:17%;
        }
      }
    }
    .mes_rights{
      width: 50%;
      height:100%;
        i{
        font-weight:bold;
        font-style:normal
      }
    }
  }
  .choseType_alt{
    width: 80%;
    text-align: center;
    color:red;  
  }
  .choseType_agreement{
    width: 80%;
    text-align: 80%;
    text-align: center;
    position: relative;
    cursor: pointer;
    input{
      width: 15px;
      height:15px;
      position: absolute;
      left:41%;
    }
  }
  .choseType_agreement span:hover{
    color:red;
    text-decoration:underline;
  }
  .choseType_turn{
    width: 80%;
    text-align:center;
    button{
      width: 40%;
      min-height: 30px;
      background: linear-gradient(180deg,rgba(255,121,86,1),rgba(254,68,43,1));
      border-radius:5px;
      color:white;
      background: #F15749;
    }
  }
}
</style>
