<template>
  <div class="add">
    <h1>{{title}}</h1>
    <div class="add-photo">
      <el-upload
        action="/api/picture/upload"
        :headers="headers"
        list-type="picture-card"
        :on-success="uploadsuccess"
        :on-error="uploaderr"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" size="tiny">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
    <div class="add-form">
      <el-form :model="ruleForm" :rules="rules" ref="rules" label-width="100px" class="demo-ruleForm">
        <div class="three">
          <el-form-item label="angle" prop="angle">
            <el-input v-model="ruleForm.angle"></el-input>
          </el-form-item>
        </div>
        <div class="three">
          <el-form-item label="平台" prop="terrace">
            <el-input v-model="ruleForm.terrace"></el-input>
          </el-form-item>
        </div>
        <div class="three">
          <el-form-item label="opeavtor" prop="opeavtor">
            <el-input v-model="ruleForm.opeavtor"></el-input>
          </el-form-item>
        </div>
        <div></div>
        <div class="two">
          <el-form-item label="展示" prop="reveal">
            <el-input v-model="ruleForm.reveal"></el-input>
          </el-form-item>
        </div>
        <div class="two">
          <el-form-item label="点击数" prop="click">
            <el-input v-model="ruleForm.click"></el-input>
          </el-form-item>
        </div>
        <div></div>
        <div class="four">
          <el-form-item label="CTR" prop="CTR">
            <el-input v-model="ruleForm.CTR"></el-input>
          </el-form-item>
        </div>
        <div class="four">
          <el-form-item label="CPC" prop="CPC">
            <el-input v-model="ruleForm.CPC"></el-input>
          </el-form-item>
        </div>
        <div class="four">
          <el-form-item label="CPM" prop="CPM">
            <el-input v-model="ruleForm.CPM"></el-input>
          </el-form-item>
        </div>
        <div class="four">
          <el-form-item label="CR" prop="CR">
            <el-input v-model="ruleForm.CR"></el-input>
          </el-form-item>
        </div>
        <div></div>
        <div class="three">
          <el-form-item label="conversion" prop="conversion">
            <el-input v-model="ruleForm.conversion"></el-input>
          </el-form-item>
        </div>
        <div class="three">
          <el-form-item label="消耗" prop="consume">
            <el-input v-model="ruleForm.consume"></el-input>
          </el-form-item>
        </div>
        <div class="three">
          <el-form-item label="回收" prop="retrieve">
            <el-input v-model="ruleForm.retrieve"></el-input>
          </el-form-item>
        </div>
        <div></div>
        <div class="two">
          <el-form-item label="RI" prop="RI">
            <el-input v-model="ruleForm.RI"></el-input>
          </el-form-item>
        </div>
        <div class="two">
          <el-form-item label="国家" prop="country">
            <el-input v-model="ruleForm.country"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="备注" prop="remarks">
          <el-input type="textarea" v-model="ruleForm.remarks" :autosize="{ minRows: 2, maxRows: 10}"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleForm)">保存</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'add',
    data () {
      return {
        title: '添加素材',
        list: [],
        ruleForm: {
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
          RI: '',
          country: '',
          remarks: ''
        },
        rules: {
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
          RI: [
            { required: true, message: '请输入RI', trigger: 'blur' },
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
        dialogImageUrl: '',
        dialogVisible: false,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    },
    methods: {
      uploadsuccess (response, file, filelist) {
        if (response.status === 200) {
          let data = {
            id: file.uid,
            name: response.data.name,
            url: response.data.url
          }
          this.list.push(data)
        }
      },
      uploaderr (err, file, filelist) {
        if (err) {
          this.$message({
            message: '服务器错误,' + file.name + '上传失败',
            type: 'error'
          })
        }
      },
      handleRemove (file, fileList) {
        let list = this.list
        let removeId = file.uid
        for (let i = 0; i < list.length; i++) {
          if (removeId === list[i].id) {
            list.splice(i, 1)
          }
        }
        this.list = list
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      submitForm (ruleform) {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            let result = {}
            result.sourceName = ruleform.angle
            result.terrace = ruleform.terrace
            result.country = ruleform.country
            result.source = ruleform
            result.list = this.list
            result.titlePage = this.list[0]
            result.user = {
              uname: this.$cookies.get('_name'),
              id: this.$cookies.get('_id')
            }
            this.$http.post('/api/resources/save', result).then((response) => {
              let data = response.data
              if (data.status === 0) {
                this.$confirm('保存成功，接下来你要去哪里？', '提示', {
                  confirmButtonText: '去素材库',
                  cancelButtonText: '继续添加素材',
                  type: 'success'
                }).then(() => {
                  this.$router.push({path: './library'})
                  this.$store.commit('setTitle', '素材库')
                }).catch(() => {
                  this.$router.go(0)
                })
              } else {
                this.$message({
                  message: data.message,
                  type: 'error'
                })
              }
            })
          } else {
            this.$alert('请把所有要求必填的内容填写完成再点击保存', '有必填内容没有输入', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: '请继续填写素材'
                })
              }
            })
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
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
    margin: 0 auto;
  }
  .add-form{
    width: 750px;
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
</style>
