<template>
  <div class="headers">
    <div class="logo">
      <span style="color:#fed189;">Ea</span>
      <span style="color:#00a0df;">go</span>
    </div>
    <div class="headers-nav">
      <a href="javascript:;">图片素材</a>
      <a href="javascript:;">视频素材</a>
    </div>
    <div class="search">
      <div class="search-select">
        <div class="search-select-text">

        </div>
        <div class="search-select-op">
          <a href="javascript:;">图片</a>
          <a href="javascript:;">视频</a>
        </div>
      </div>
      <div class="search-input">
          <input type="text">
          <div class="search-btn">搜索</div>
        </div>
    </div>
    <div class="person">
      <div class="person-photo">
        <img src="" alt="">
      </div>
      <div class="person-container">
        <div class="person-name">杜波</div>
        <div class="person-nav">
          <a href="javascript:;">个人信息</a>
          <a href="javascript:;">退出</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'headers'
  }
</script>
<style>
  *{
    padding: 0;
    margin: 0;
    text-decoration: none;
    box-sizing: border-box;
  }
  .headers{
    width: 100%;
    min-width: 1200px;
    height: 70px;
    background: #1a2732;
    padding-left: 100px;
    padding-right: 100px;
    position: absolute;
    top:0;
    left: 0;
    z-index: 999;
  }
  .logo{
    display: inline-block;
    vertical-align: middle;
    width: 150px;
    height: 50px;
    position: absolute;
    top:10px;
    left: 15px;
  }
  .logo span{
    line-height: 50px;
    font-size: 34px;
    font-weight: 700;
  }
  .headers-nav{
    margin-left: 30px;
    display: inline-block;
    vertical-align: middle;
    height: 70px;
  }
  .headers-nav a{
    display: inline-block;
    width: 100px;
    height: 70px;
    line-height: 70px;
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    color:#fed189;
  }
  .search{
    display: inline-block;
    vertical-align: middle;
    margin-left: 100px;
    width: 350px;
    height: 30px;
  }
  .search-select{
    display: inline-block;
    vertical-align: top;
    width: 50px;
    height: 100%;
    position: relative;
    cursor: pointer;
  }
  .search-select .search-select-text{
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 30px;
  }
  .search-select .search-select-op{
    position: absolute;
    top: 70px;
    border:1px solid #999999;
    width: 100%;
  }
  .search-select .search-select-op a{
    display: block;
    width: 100%;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
    color:#000000;
  }
  .search-input{
    display: inline-block;
    vertical-align: middle;
    width: 290px;
    height: 30px;
    position: relative;
  }
  .search-input input{
    width: 240px;
    height: 100%;
    border:none;
    outline: none;
    padding-left: 10px;
    border-radius:5px;
  }
  .search-input .search-btn{
    width: 40px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    display: inline-block;
    vertical-align: top;
    background: #0f88eb;
    color:#fff;
    border-radius:5px;
    cursor: pointer;
  }
  .search-input .search-btn:hover{
    background: #00a0df;
  }
  .search-input .search-btn:active{
    background: #0f88eb;
  }
  .person{
    width: 200px;
    height: 70px;
    display: inline-block;
    vertical-align: middle;
    margin-left: 100px;
  }
  .person .person-photo{
    width: 50px;
    height: 50px;
    border-radius:50%;
    background: #ffffff;
    margin-top: 10px;
    display: inline-block;
    vertical-align: top;
  }
  .person .person-photo img{
    width: 100%;
    height: 100%;
  }
  .person .person-container{
    width: 140px;
    height: 70px;
    display: inline-block;
    vertical-align: top;
    position: relative;
  }
  .person .person-container .person-name{
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 70px;
    font-size: 18px;
    color:#fff;
    cursor: pointer;
  }
  .person .person-container .person-nav{
    width: 100%;
    position: absolute;
    top:70px;
    border:1px solid #000;
  }
  .person .person-container .person-nav a{
    display: block;
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 16px;
    color:#000;
  }
  .person .person-container .person-nav a:hover{
    background: #e2e2e2;
  }
</style>
