<!-- 通知买家未报价 -->
<template lang="html">
  <div class="no_offer">
    <div class="no_offer_con">
      <ul>
        <li>
          <span>上海****有限公司</span>
          <span>姚先生</span>
          <span>13900034455</span>
        </li>
        <li>
          <span>上海****有限公司</span>
          <span>姚先生</span>
          <span>13900034455</span>
        </li>
        <li>
          <span>上海****有限公司</span>
          <span>姚先生</span>
          <span>13900034455</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.no_offer{
  width: 100%;
  height:100%;
  .no_offer_con{
    width:40%;
    height:100%;
    margin: 0 auto;
    min-width: 767px;
    padding-top:3%;
    ul{
      width: 100%;
      height:auto;
      li{
        display: flex;
        justify-content: space-around;
        margin-bottom: 2.5%;
      }
    }
  }
}
</style>
