<template>
  <div class="eago">
    <div class="eago-container">
      <div class="eago-box">
        <div class="eago-subBox">
          <span class="blue"><i class="group"></i></span>
        </div>
        <div class="eago-subBox">
          <span class="red"><i class="people"></i></span>
        </div>
        <div class="eago-subBox">
          <span class="green"><i class="manage"></i></span>
        </div>
        <div class="eago-subBox">
          <span class="yellow"><i class="workbench"></i></span>
        </div>
      </div>
      <div class="eago-box">
        <div id=""></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'eago',
    data () {
      return {
        title: 'eago'
      }
    },
    mounted () {
      this.geteago()
    },
    methods: {
      geteago: function () {
        console.log(1)
      }
    }
  }
</script>
<style>
  * {
    box-sizing: border-box;
  }
  .eago{
    padding-top: 0px;
  }
  .eago-box{
    width: 80%;
    margin: 30px auto;
    text-align: center;
    padding: 24px;
  }
  .eago-subBox{
    width: 20%;
    min-width: 150px;
    height: 100px;
    display: inline-block;
    vertical-align: top;
    border-radius:4px;
    background: #fff;
    margin-left: 20px;
    margin-right: 20px;
    box-shadow: 0 0 15px #999999;
    position: relative;
    padding-left:5%;
    overflow: hidden;
  }
  .eago-subBox span{
    position: absolute;
    width: 40%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .group{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    display: block;
    width: 60%;
    height: 60%;
    background: url(../../static/img/group.svg) no-repeat;
    background-size: 100% 100%;
  }
  .people{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    display: block;
    width: 60%;
    height: 60%;
    background: url(../../static/img/people.svg) no-repeat;
    background-size: 100% 100%;
  }
  .manage{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    display: block;
    width: 60%;
    height: 60%;
    background: url(../../static/img/manage.svg) no-repeat;
    background-size: 100% 100%;
  }
  .workbench{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    display: block;
    width: 60%;
    height: 60%;
    background: url(../../static/img/workbench.svg) no-repeat;
    background-size: 100% 100%;
  }
  .blue{
    background: #02C1EB;
  }
  .red{
    background: #D94A3A;
  }
  .green{
    background: #00A65E;
  }
  .yellow{
    background: #F49D12;
  }
</style>
