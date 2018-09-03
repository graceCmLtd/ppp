<!-- 用户修改密码 -->
<template lang="html">
  <div class="person_pass">
    <p>&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      现密码：<input type="password" value=""/></p>
    <p>
      &nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;新密码：<input type="password" value=""/></p>
    <p>从新输入新密码：<input type="password" value=""/></p>
    <p><button type="button">确定</button></p>
  </div>
</template>
<script>
export default {

}
</script>

<style lang="scss" scoped>
.person_pass{
  width: 100%;
  height:100%;
  padding-top:5%;
  p{
    width: 100%;
    text-align: center;
    margin-bottom: 2%;
    input{
      width: 22%;
      height:20px;
      border:1px solid #ccc;
    }
    button{
      width: 300px;
      height:30px;
      background:linear-gradient(180deg,rgba(255,121,86,1),rgba(254,68,43,1));
      border-radius:7px;
      color:white;
    }
  }
}
</style>
