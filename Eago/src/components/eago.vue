<template>
  <div class="eago">
    <div class="eago-container">
      <div class="eago-box">
        <div class="eago-subBox user">
          <span class="red"><i class="people"></i></span>
          <p style="color:#323A45;font-weight: 500;">{{getuser.nickname}}您好</p>
        </div>
        <div class="eago-subBox">
          <span class="blue"><i class="group"></i></span>
        </div>
        <div class="eago-subBox">
          <span class="green"><i class="manage"></i></span>
        </div>
        <div class="eago-subBox">
          <span class="yellow"><i class="workbench"></i></span>
        </div>
      </div>
      <div class="eago-box" style="">
        <el-container>
          <el-container>
            <el-aside width="70%">
              <div id="weekCount" class="weekCount-box"></div>
            </el-aside>
            <el-main>
              <div class="weekCount-line"></div>
            </el-main>
          </el-container>
          <el-footer height="100px">
            <div class="week-footer">
asdasdasd
            </div>
          </el-footer>
        </el-container>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'eago',
    data () {
      return {
        title: 'eago',
        accountList: [],
        usernameList: [],
        xAxisList: []
      }
    },
    mounted () {
      this.getcount()
      this.weekCount()
    },
    computed: {
      getuser () {
        return this.$store.state.user
      },
      getangleList () {
        return this.$store.state.angleList
      },
      getterraceList () {
        return this.$store.state.terraceList
      },
      getcountryList () {
        return this.$store.state.countryList
      }
    },
    methods: {
      getcount: function () {
        this.$http.get('/api/seting/getconfig').then((response) => {
          if (response.data.status === 0) {
            this.$http.get('/api/count/terraceCount').then((response) => {
              if (response.data.status === 0) {
                console.log(response.data)
              }
            })
            this.$http.get('/api/count/monthcount').then((response) => {
              if (response.data.status === 0) {
                console.log(response.data)
              }
            })
          }
        })
      },
      weekCount: function () {
        let myChart = this.$echarts.init(document.getElementById('weekCount'))
        // 指定图表的配置项和数据
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他']
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              selectedMode: 'single',
              radius: [0, '30%'],

              label: {
                normal: {
                  position: 'inner'
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                {value: 335, name: '直达', selected: true},
                {value: 679, name: '营销广告'},
                {value: 1548, name: '搜索引擎'}
              ]
            },
            {
              name: '访问来源',
              type: 'pie',
              radius: ['40%', '55%'],
              label: {
                normal: {
                  formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                  backgroundColor: '#eee',
                  borderColor: '#aaa',
                  borderWidth: 1,
                  borderRadius: 4,
                  // shadowBlur:3,
                  // shadowOffsetX: 2,
                  // shadowOffsetY: 2,
                  // shadowColor: '#999',
                  // padding: [0, 7],
                  rich: {
                    a: {
                      color: '#999',
                      lineHeight: 22,
                      align: 'center'
                    },
                    abg: {
                      backgroundColor: '#333',
                      width: '100%',
                      align: 'right',
                      height: 22,
                      borderRadius: [4, 4, 0, 0]
                    },
                    hr: {
                      borderColor: '#aaa',
                      width: '100%',
                      borderWidth: 0.5,
                      height: 0
                    },
                    b: {
                      fontSize: 16,
                      lineHeight: 33
                    },
                    per: {
                      color: '#eee',
                      backgroundColor: '#334455',
                      padding: [2, 4],
                      borderRadius: 2
                    }
                  }
                }
              },
              data: [
                {value: 335, name: '直达'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1048, name: '百度'},
                {value: 251, name: '谷歌'},
                {value: 147, name: '必应'},
                {value: 102, name: '其他'}
              ]
            }
          ]
        }
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option)
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
    width: 100%;
    min-width: 1180px;
    margin: 30px auto;
    text-align: center;
    padding: 24px;
  }
  .eago-subBox{
    width: 15%;
    min-width: 150px;
    height: 100px;
    display: inline-block;
    vertical-align: top;
    border-radius:4px;
    background: #fff;
    margin: 0px 30px 0px 30px;
    box-shadow: 0 0 15px #999999;
    position: relative;
    padding-left:8%;
    overflow: hidden;
  }
  .eago-subBox span{
    position: absolute;
    width: 40%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .eago-subBox.user{
    width: 25%;
    min-width:200px;
    margin-left: 0;
    padding-left: 8%;
  }
  .eago-subBox.user span{
    width: 33%;
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
  .el-main,.el-footer{
    padding: 0;
  }
  .weekCount-box{
    width: 100%;
    height: 300px;
    background: #02C1EB;
    padding-right: 10px;
  }
  .weekCount-line{
    width: 100%;
    height: 100%;
    background: #D94A3A;
  }
  .week-footer{
    width: 100%;
    height: 100%;
    background: #F49D12;
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
