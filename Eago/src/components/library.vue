<template>
  <div calss="library">
    <h1>{{this.mytitle}}</h1>
    <div class="library-container">
      <el-table
        :data="this.mysource"
        :row-class-name="tableRowClassName"
        style="width: 100%;">
        <!--展开行-->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="备注">
                <span>{{ props.row.source.remarks }}</span>
              </el-form-item>
              <!--<el-form-item label="上传账号">-->
                <!--<span>{{ props.row.user.uname }}</span>-->
              <!--</el-form-item>-->
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="类型"
          width="50">
          <template slot-scope="scope">
            <i class="el-icon-picture-outline" v-if="scope.row.type === 'image'"></i>
            <i class="video-icon" v-if="scope.row.type === 'video'"></i>
          </template>
        </el-table-column>
        <!--日期-->
        <el-table-column
          label="日期"
          width="115">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.date | datetostring}}</span>
          </template>
        </el-table-column>
        <!--缩略图-->
        <el-table-column
          label="缩略图"
          width="120">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top" v-if="scope.row.type === 'image'">
              <p>图片名字: {{ scope.row.titlePage.name }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-button type="text" @click="centerDialogVisible = true">
                    <div class="source-photo" @click="getpic(scope.row.titlePage.url, scope.row.titlePage.name, scope.row.titlePage.id, scope.row.type, $event)">
                      <img :src="scope.row.titlePage.url" alt="">
                    </div>
                  </el-button>
                </div>
            </el-popover>
            <el-popover trigger="hover" placement="top" v-if="scope.row.type === 'video'">
              <p>视频名称: {{ scope.row.titlePage.name }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-button type="text" @click="centerDialogVisible = true">
                    <div class="source-photo" @click="getpic(scope.row.titlePage.url, scope.row.titlePage.name, scope.row.titlePage.id,scope.row.type, $event)">
                      <video width="100%" class="video-titlePage" :src="scope.row.titlePage.url" alt=""></video>
                    </div>
                  </el-button>
                </div>
            </el-popover>
          </template>
        </el-table-column>
        <!--angle-->
        <el-table-column
          label="angle">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.source.angle }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="昵称">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.user.nickname }}</span>
          </template>
        </el-table-column>
        <!--平台-->
        <el-table-column
          label="平台">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.source.terrace }}</span>
          </template>
        </el-table-column>
        <!--opeavtor-->
        <el-table-column
          label="opeavtor"
          width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.source.opeavtor }}</span>
          </template>
        </el-table-column>
        <!--展示-->
        <el-table-column
          label="展示"
          width="80">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.source.reveal }}</span>
          </template>
        </el-table-column>
        <!--点击数-->
        <el-table-column
          label="点击数"
          width="80">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.source.click }}</span>
          </template>
        </el-table-column>
        <!--CTR-->
        <el-table-column
          label="CTR"
          width="60">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.source.CTR }}</span>
          </template>
        </el-table-column>
        <!--CPC-->
        <el-table-column
          label="CPC"
          width="60">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.source.CPC }}</span>
          </template>
        </el-table-column>
        <!--CPM-->
        <el-table-column
          label="CPM"
          width="60">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.source.CPM }}</span>
          </template>
        </el-table-column>
        <!--conversion-->
        <el-table-column
          label="conversion"
          width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.source.conversion }}</span>
          </template>
        </el-table-column>
        <!--CR-->
        <el-table-column
          label="CR"
          width="60">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.source.CR }}</span>
          </template>
        </el-table-column>
        <!--消耗-->
        <el-table-column
          label="消耗"
          width="80">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.source.consume }}</span>
          </template>
        </el-table-column>
        <!--回收-->
        <el-table-column
          label="回收"
          width="80">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.source.retrieve }}</span>
          </template>
        </el-table-column>
        <!--ROI-->
        <el-table-column
          label="ROI"
          width="60">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.source.ROI }}</span>
          </template>
        </el-table-column>
        <!--国家-->
        <el-table-column
          label="国家"
          width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.source.country }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
        width="160">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="getdetailed(scope.$index, scope.row), outerVisible = true">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="del(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.mysourceCount">
      </el-pagination>
      <div class="picture-modal">
        <el-dialog
          :title="this.picdetailed.name"
          :visible.sync="centerDialogVisible"
          width="40%"
          center>
          <img :src="this.picdetailed.url" alt="" v-if="this.picdetailed.type === 'image'">
          <video width="100%" :src="this.picdetailed.url" controls v-if="this.picdetailed.type === 'video'"></video>
          <!--<span slot="footer" class="dialog-footer">-->
    <!--<el-button @click="centerDialogVisible = false">取 消</el-button>-->
    <!--<el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>-->
  <!--</span>-->
        </el-dialog>
      </div>
    </div>
    <div class="source-modal">
      <el-dialog
        title="修改素材"
        :visible.sync="outerVisible"
        width="50%"
        center>
        <div class="update-form">
          <el-form :model="sourceModal" :rules="sourceModalRule" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <div class="three">
              <el-form-item label="angle" prop="angle">
                <el-input v-model="sourceModal.angle"></el-input>
              </el-form-item>
            </div>
            <div class="three">
              <el-form-item label="平台" prop="terrace">
                <el-input v-model="sourceModal.terrace"></el-input>
              </el-form-item>
            </div>
            <div class="three">
              <el-form-item label="opeavtor" prop="opeavtor">
                <el-input v-model="sourceModal.opeavtor"></el-input>
              </el-form-item>
            </div>
            <div></div>
            <div class="two">
              <el-form-item label="展示" prop="reveal">
                <el-input v-model="sourceModal.reveal"></el-input>
              </el-form-item>
            </div>
            <div class="two">
              <el-form-item label="点击数" prop="click">
                <el-input v-model="sourceModal.click"></el-input>
              </el-form-item>
            </div>
            <div></div>
            <div class="four">
              <el-form-item label="CTR" prop="CTR">
                <el-input v-model="sourceModal.CTR"></el-input>
              </el-form-item>
            </div>
            <div class="four">
              <el-form-item label="CPC" prop="CPC">
                <el-input v-model="sourceModal.CPC"></el-input>
              </el-form-item>
            </div>
            <div class="four">
              <el-form-item label="CPM" prop="CPM">
                <el-input v-model="sourceModal.CPM"></el-input>
              </el-form-item>
            </div>
            <div class="four">
              <el-form-item label="CR" prop="CR">
                <el-input v-model="sourceModal.CR"></el-input>
              </el-form-item>
            </div>
            <div></div>
            <div class="three">
              <el-form-item label="conversion" prop="conversion">
                <el-input v-model="sourceModal.conversion"></el-input>
              </el-form-item>
            </div>
            <div class="three">
              <el-form-item label="消耗" prop="consume">
                <el-input v-model="sourceModal.consume"></el-input>
              </el-form-item>
            </div>
            <div class="three">
              <el-form-item label="回收" prop="retrieve">
                <el-input v-model="sourceModal.retrieve"></el-input>
              </el-form-item>
            </div>
            <div></div>
            <div class="two">
              <el-form-item label="ROI" prop="ROI">
                <el-input v-model="sourceModal.ROI"></el-input>
              </el-form-item>
            </div>
            <div class="two">
              <el-form-item label="国家" prop="country">
                <el-input v-model="sourceModal.country"></el-input>
              </el-form-item>
            </div>
            <el-form-item label="备注" prop="remarks">
              <el-input type="textarea" v-model="sourceModal.remarks" :autosize="{ minRows: 2, maxRows: 10}"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="update">保 存</el-button>
          <el-button type="primary" @click="outerVisible = false">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'library',
    data () {
      return {
        sourceIndex: '',
        sourceModalId: '',
        sourceModalName: '',
        sourceModal: {
          angle: '',
          terrace: '',
          opeavtor: '',
          reveal: '',
          click: '',
          CTR: '',
          CPC: '',
          CPM: '',
          conversion: '',
          CR: '',
          consume: '',
          retrieve: '',
          ROI: '',
          country: '',
          remarks: ''
        },
        sourceModalRule: {
          angle: [
            { required: true, message: '请输入angle', trigger: 'blur' },
            { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
          ],
          terrace: [
            { required: true, message: '请输入terrace', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ],
          opeavtor: [
            { required: true, message: '请输入opeavtor', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ],
          reveal: [
            { required: true, message: '请输入展示', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ],
          click: [
            { required: true, message: '请输入点击数', trigger: 'blur' },
            { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
          ],
          CTR: [
            { required: true, message: '请输入CTR', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ],
          CPC: [
            { required: true, message: '请输入CPC', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ],
          CPM: [
            { required: true, message: '请输入CPM', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ],
          conversion: [
            { required: true, message: '请输入conversion', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ],
          CR: [
            { required: true, message: '请输入CR', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ],
          consume: [
            { required: true, message: '请输入消耗', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ],
          retrieve: [
            { required: true, message: '请输入回收', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ],
          ROI: [
            { required: true, message: '请输入ROI', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ],
          country: [
            { required: true, message: '请输入国家', trigger: 'blur' },
            { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
          ],
          remarks: [
            { required: true, message: '请填写备注', trigger: 'blur' }
          ]
        },
        picdetailed: {},
        updateChange: false,
        outerVisible: false,
        centerDialogVisible: false,
        currentPage: 1,
        pageSize: 10
      }
    },
    mounted () {
      this.getAll(this.currentPage, this.pageSize)
    },
    computed: {
      mytitle () {
        return this.$store.state.title
      },
      mysource () {
        return this.$store.state.source
      },
      mysourceCount () {
        return this.$store.state.sourceCount
      }
    },
    methods: {
//      隔行变色
      tableRowClassName: function ({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row'
        } else if (rowIndex === 3) {
          return 'success-row'
        }
        return ''
      },
      getAll: function (page, size) {
        this.$http.get('/api/resources/all?page=' + page + '&size=' + size).then((response) => {
          let data = response.data
          if (data.status === 0) {
            this.$store.commit('sourceCount', data.count)
            this.$store.commit('source', data.data)
            this.$store.commit('setTitle', '素材库')
          } else {
            this.$message({
              message: data.message,
              type: 'error'
            })
          }
        })
      },
      getdetailed: function (index, row) {
        this.sourceIndex = index
        this.sourceModalId = row._id
        this.sourceModalName = row.user.username
        this.sourceModal.angle = row.source.angle
        this.sourceModal.terrace = row.source.terrace
        this.sourceModal.opeavtor = row.source.opeavtor
        this.sourceModal.reveal = row.source.reveal
        this.sourceModal.click = row.source.click
        this.sourceModal.CTR = row.source.CTR
        this.sourceModal.CPC = row.source.CPC
        this.sourceModal.CPM = row.source.CPM
        this.sourceModal.conversion = row.source.conversion
        this.sourceModal.CR = row.source.CR
        this.sourceModal.consume = row.source.consume
        this.sourceModal.retrieve = row.source.retrieve
        this.sourceModal.ROI = row.source.ROI
        this.sourceModal.remarks = row.source.remarks
        this.sourceModal.country = row.source.country
      },
      getpic: function (url, name, id, type) {
        let list = {}
        list.url = url
        list.name = name
        list.id = id
        list.type = type
        this.picdetailed = list
        console.log(this.picdetailed)
      },
      update: function () {
        let username = this.$cookies.get('_name')
        if (username !== this.sourceModalName) {
          this.$message({
            message: '没有修改权限，请联系上传者修改',
            type: 'error'
          })
          return false
        }
        let data = {}
        data._id = this.sourceModalId
        data.source = this.sourceModal
        this.$http.put('/api/picture/update', data).then((response) => {
          if (response.data.status === 0) {
            let source = this.mysource
            source[this.sourceIndex].source = response.data.data.source
            this.$store.commit('source', source)
            this.$message({
              message: response.data.message,
              type: 'success'
            })
          } else {
            this.$message({
              message: response.data.message,
              type: 'error'
            })
          }
        })
      },
      del: function (index, row) {
        this.sourceModalName = row.user.username
//        let source = this.mysource
//        console.log(source)
//        return false
        let username = this.$cookies.get('_name')
        if (username !== this.sourceModalName) {
          this.$message({
            message: '没有修改权限，请联系上传者修改',
            type: 'error'
          })
          return false
        }
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get('/api/picture/del?_id=' + row._id).then((response) => {
            if (response.data.status === 0) {
              for (let i = 0; i < this.mysource.length; i++) {
                if (row._id === this.mysource[i]._id) {
                  this.mysource.splice(i, 1)
                }
              }
              this.$message({
                message: '已删除!'
              })
            } else {
              this.$message({
                message: response.data.message,
                type: 'error'
              })
            }
          })
        }).catch(() => {})
      },
      handleSizeChange (size) {
        if (this.mytitle === '素材库') {
          this.pageSize = size
          this.$store.commit('page', {page: this.currentPage, size: this.pageSize})
          this.getAll(this.currentPage, this.pageSize)
        } else {
          this.$http.get('/api/resources/find?' + this.value + '=' + this.searchText + '&page=' + this.currentPage + '&size=' + this.getpage.size).then((response) => {
            if (response.data.status === 0) {
              this.$store.commit('sourceCount', response.data.count)
              this.$store.commit('source', response.data.data)
              this.$store.commit('setTitle', '搜索结果')
//              this.$router.push({path: './library'})
              this.searchText = ''
            } else {
              this.$alert(response.data.message, '搜索结果提醒', {
                confirmButtonText: '确定'
              })
            }
          })
        }
      },
      handleCurrentChange (page) {
        if (this.mytitle === '素材库') {
          this.currentPage = page
          this.$store.commit('page', {page: this.currentPage, size: this.pageSize})
          this.getAll(this.currentPage, this.pageSize)
        } else {
          this.$http.get('/api/resources/find?' + this.value + '=' + this.searchText + '&page=' + this.currentPage + '&size=' + this.getpage.size).then((response) => {
            if (response.data.status === 0) {
              this.$store.commit('sourceCount', response.data.count)
              this.$store.commit('source', response.data.data)
              this.$store.commit('setTitle', '搜索结果')
//              this.$router.push({path: './library'})
              this.searchText = ''
            } else {
              this.$alert(response.data.message, '搜索结果提醒', {
                confirmButtonText: '确定'
              })
            }
          })
        }
      }
    }
  }
</script>
<style>
  .library{
    padding-top: 200px;
  }
  .library-container{
    width: 100%;
    min-width: 1000px;
    padding: 20px;
  }
  .library-container .cell{
    text-align: center;
  }
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .source{
    width: 200px;
    border-radius:5px;
    display: inline-block;
    vertical-align: top;
    margin-left: 20px;
  }
  .source-photo{
    width: 120px;
    cursor: pointer;
  }
  .source-photo img{
    width: 100%;
  }
  .source-modal-picture{
    width: 200px;
    display: inline-block;
    vertical-align: middle;
  }
  .source-modal-detailed{
    width: 50%;
    margin: 0 auto;
  }
  .source-modal-detailed .el-input{
    margin-top: 20px;
  }
  .el-input.is-disabled .el-input__inner{
    color:#000;
  }
  .update-btn{
    width: 74px;
    height: 40px;
    margin: 0;
    border-radius: 3px;
    background: #fff;
    color:#606266;
    font-size:14px;
    font-weight: 500;
    border:1px solid #dcdfe6;
    line-height:1;
  }
  .update-btn:hover{
    color: #409EFF;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
  .update-btn:active{
    color: #3a8ee6;
    border-color: #3a8ee6;
    outline: 0;
  }
  button, .el-button, .el-dialog__headerbtn,.el-message-box__headerbtn{
    width: auto;
    height: auto;
    margin: 0;
  }
  .el-dialog__headerbtn, .el-dialog__headerbtn:hover{
    margin: 0;
    background: none;
  }
  .source-modal-picture button,.source-modal-picture button:hover,.source-modal-picture button:active,.source-modal-picture button:focus{
    background: none;
    border: none;
  }
  .source-modal-picture img{
    width: 100%;
  }
  /*.el-dialog{*/
    /*width: 70%;*/
  /*}*/
  .el-dialog__body img{
    width: 100%;
  }
  .update-form{
    width: 100%;
    max-width: 750px;
    margin: 0px auto;
    margin-top: 50px;
  }
  .two{
    width: 370px;
    display: inline-block;
    vertical-align: top;
  }
  .three{
    width: 245px;
    display: inline-block;
    vertical-align: top;
  }
  .four{
    width: 182px;
    display: inline-block;
    vertical-align: top;
  }
  .video-icon{
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url(../../static/img/video.svg) no-repeat;
    background-size:100% 100%;
  }
</style>
