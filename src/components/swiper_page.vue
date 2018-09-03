<template lang="html">
  <div class="swiper">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide"><img src="../../static/img/banner3.png" alt="" title=""></div>
        <div class="swiper-slide"><img src="../../static/img/banner2.png" alt="" title=""></div>
        <div class="swiper-slide"><img src="../../static/img/banner1.png" alt="" title=""></div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
      <!-- Add Arrows -->
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  mounted(){
  new Swiper('.swiper-container', {
      autoplay: {
      delay: 2000,
      stopOnLastSlide: false,
      disableOnInteraction: true,
    },
      navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      },
    });
  }
}
</script>

<style lang="scss" scoped>
.swiper{
  width:100%;
  height:40%;
  min-height: 550px;
  .swiper-container {
    width: 100%;
    height: 100%;
    z-index: 1;
    }
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    img{
      width: 100%;
      height:100%;
    }
 }
 .swiper-button-next{
   right:15%!important;
 }
 .swiper-button-prev{
   left:15%!important;
 }
}

</style>
