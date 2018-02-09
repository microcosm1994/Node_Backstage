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
        xAxisList: [],
        monthData: [],
        terraceData: [],
        terraceList: []
      }
    },
    mounted () {
      this.getcount()
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
            this.terraceList = response.data.data[0].terraceList
            console.log(this.terraceList)
            this.$http.get('/api/count/terraceCount').then((response) => {
              if (response.data.status === 0) {
                console.log(response.data)
              }
            })
            this.$http.post('/api/count/monthcount', this.terraceList).then((response) => {
              if (response.data.status === 0) {
                this.monthData = response.data.data
                console.log(response.data)
                this.weekCount()
              }
            })
          }
        })
      },
      weekCount: function () {
        let myChart = this.$echarts.init(document.getElementById('weekCount'))
        // 指定图表的配置项和数据
        let option = {
          title: {
            text: '折线图堆叠'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: []
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '邮件营销',
              type: 'line',
              stack: '总量',
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '联盟广告',
              type: 'line',
              stack: '总量',
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '视频广告',
              type: 'line',
              stack: '总量',
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: '直接访问',
              type: 'line',
              stack: '总量',
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: '搜索引擎',
              type: 'line',
              stack: '总量',
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        }
        let legend = {
          data: this.terraceList
        }
        let series = []
        console.log(legend)
        console.log(series)
        console.log(this.terraceData)
        for (let key in this.terraceData) {
          console.log(this.terraceData[key])
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
