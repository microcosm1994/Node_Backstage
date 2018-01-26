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
      <el-input placeholder="请输入查找内容" v-model="searchText" class="input-with-select">
        <el-select v-model="value" slot="prepend" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="getsearch"></el-button>
      </el-input>
    </div>
    <div class="person">
      <div class="person-photo">
        <img src="" alt="">
      </div>
      <div class="person-container">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="person">个人信息</el-dropdown-item>
            <el-dropdown-item command="out">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'headers',
    data () {
      return {
        searchText: '',
        options: [{
          value: '选项1',
          label: '名称'
        }, {
          value: '选项2',
          label: '国家'
        }],
        value: ''
      }
    },
    mounted () {},
    methods: {
      getsearch: function () {
        this.$store.commit('search_text', this.searchText)
        if (this.value === '') {
          this.$alert('请选择查找方式', '搜索提醒', {
            confirmButtonText: '确定'
          })
          return false
        }
        if (this.searchText === '') {
          this.$alert('请输入查找内容', '搜索提醒', {
            confirmButtonText: '确定'
          })
          return false
        }
        if (this.value === '选项1') {
          this.$http.get('/api/resources/find?sourceName=' + this.searchText).then((response) => {
            if (response.data.status === 0) {
              this.$store.commit('search_result', response.data.data)
              this.$store.commit('setTitle', '搜索结果')
              this.$router.push({path: './library'})
              this.searchText = ''
            } else {
              this.$alert(response.data.message, '搜索结果提醒', {
                confirmButtonText: '确定'
              })
            }
          })
        } else {
          this.$http.get('/api/resources/find?country=' + this.searchText).then((response) => {
            if (response.data.status === 0) {
              this.$store.commit('search_result', response.data.data)
              this.$store.commit('setTitle', '搜索结果')
              this.$router.push({path: './library'})
              this.searchText = ''
            } else {
              this.$alert(response.data.message, '搜索结果提醒', {
                confirmButtonText: '确定'
              })
            }
          })
        }
      },
      handleCommand (command) {
        if (command === 'person') {
          console.log(1)
        }
        if (command === 'out') {
          console.log(2)
        }
      }
    }
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
  }

  .search .el-input__inner{
    width: 90px;
  }
  .input-with-select>.el-input__inner{
    width: 200px !important;
  }
  .el-scrollbar{
    text-align: center;
  }
  .el-select-dropdown .popper__arrow{
    left: 90px !important;
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
  .person .person-container .el-dropdown-link{
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 70px;
    font-size: 16px;
    color:#fff;
    cursor: pointer;
  }
  .el-dropdown-menu .popper__arrow{
   left: 34px !important;
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
