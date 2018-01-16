<template>
  <div class="home">
    <headers></headers>
    <div class="home-container">
      <div class="home-sidebar">
        <ul>
          <li>
            <a href="javascript:;">
              <router-link to="/library">素材库</router-link>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <router-link to="/add">添加素材</router-link>
            </a>
          </li>
        </ul>
      </div>
      <div class="home-route">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  import Router from 'vue-router'
  import headers from './head'
  import add from './add'
  import library from './library'

  const router = new Router({
    routes: [
      {
        path: '/add',
        name: 'add',
        component: add
      },
      {
        path: '/library',
        name: 'library',
        component: library
      }
    ]
  })
  export default {
    name: 'home',
    router,
    components: { headers },
    data () {
      return {
        title: 'home'
      }
    }
  }
</script>
<style>
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html,body{
    height: 100%;
    background: #F5F5F5;
  }
  .home{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .home-container{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    padding-top: 70px;
  }
  .home-sidebar{
    width: 180px;
    height: 100%;
    position: absolute;
    left: 0;
    top:0px;
    background: #394a59;
    padding-top: 70px;
  }
  .home-sidebar ul{
    width: 100%;
    height: 100%;
  }
  .home-sidebar ul li{
    width: 100%;
    height: 70px;
  }
  .home-sidebar ul li a{
    display: block;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 70px;
    color:#fff;
    font-size: 18px;
  }
  .home-sidebar ul li a:hover{
    background: #2e3b46;
  }
  .home-route{
    width: 100%;
    padding-left: 180px;
  }
</style>
