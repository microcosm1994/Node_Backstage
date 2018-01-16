<template>
  <div class="add">
    <h1>{{title}}</h1>
    <div class="add-photo">

    </div>
    <div class="add-name add-input">
      <span>素材名称</span>
      <input type="text" v-model="sourceName" placeholder="请输入素材名称">
    </div>
    <div class="add-des add-input">
      <span>素材描述</span>
      <input type="text" v-model="des" placeholder="请输入素材描述信息">
    </div>
    <div class="add-country add-input">
      <span>素材国家</span>
      <input type="text" v-model="country" placeholder="请输入素材所属国家">
    </div>
    <button @click="save()">保存</button>
  </div>
</template>
<script>
  export default {
    name: 'add',
    data () {
      return {
        title: '添加素材',
        sourceName: '',
        des: '',
        country: ''
      }
    },
    methods: {
      save: function () {
        console.log(this.name);
      }
    }
  }
</script>
<style>
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .add{
    width: 100%;
    height: 100%;
    min-width: 1200px;
  }
  .add-photo{
    width: 750px;
    height: 200px;
    background: rgba(0,0,0,0.8);
    margin: 0 auto;
  }
  .add-input{
    height: 50px;
    margin: 0 auto;
    margin-top: 30px;
  }
  .add-input span{
    display: inline-block;
    height: 50px;
    line-height: 50px;
    font-size: 24px;
    font-weight: 500;
  }
  .add-input input{
    width: 450px;
    height: 50px;
    margin-left: 20px;
    padding-left: 10px;
    font-size: 20px;
  }
  button{
    width: 320px;
    border:none;
    outline: none;
    background: #0f88eb;
    color:#fff;
    height: 50px;
    border-radius:5px;
    font-size: 24px;
    margin: 50px auto;
    cursor: pointer;
  }
  button:hover{
    background: #00a0df;
  }
  button:active{
    background: #0f88eb;
  }
</style>
