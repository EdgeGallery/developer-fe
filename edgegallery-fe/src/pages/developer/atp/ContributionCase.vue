<template>
  <div
    class="common-div-bg"
    style="padding: 50px 80px"
  >
    <div
      class="case-detail"
    >
      <p class="title-icon">
        贡献测试用例
      </p>
    </div>
    <el-form
      :model="addCaseForm"
      label-width="auto"
      ref="addcaseForm"
      :rules="rules"
      class="contibution-form"
    >
      <el-form-item
        label="用例名称"
        prop="name"
      >
        <el-input
          width="100px"
          size="small"
          v-model="addCaseForm.name"
          maxlength="64"
        />
      </el-form-item>
      <el-form-item
        label="用例目的"
        prop="objective"
      >
        <el-input
          v-model="addCaseForm.objective"
          type="textarea"
          autosize
          maxlength="255"
        />
      </el-form-item>
      <el-form-item
        label="测试步骤"
        prop="step"
      >
        <el-input
          v-model="addCaseForm.step"
          type="textarea"
          autosize
          maxlength="255"
        />
      </el-form-item>
      <el-form-item
        label="预期结果"
        prop="expectResult"
      >
        <el-input
          size="small"
          v-model="addCaseForm.expectResult"
          maxlength="255"
        />
      </el-form-item>
      <el-form-item
        label="贡献类型"
        prop="type"
      >
        <el-select
          size="small"
          v-model="addCaseForm.type"
          placeholder="请选择"
        >
          <el-option
            :label="language==='cn'?'文本':'text'"
            value="text"
          />
          <el-option
            :label="language==='cn'?'脚本':'script'"
            value="script"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="addCaseForm.type==='script'"
        label="用例导入"
        prop="file"
        ref="import"
      >
        <el-upload
          action=""
          :limit="1"
          :on-exceed="handleExceed"
          :on-change="handleChange"
          :on-remove="handleDelte"
          :file-list="addCaseForm.file"
          :auto-upload="false"
          accept=".zip"
        >
          <el-button
            slot="trigger"
            size="small"
            class="form-button"
          >
            上传
          </el-button>
          <el-tooltip
            style="margin-left:10px;"
            content="用例脚本打包成zip包格式上传"
            effect="light"
            placement="right"
          >
            <em class="el-icon-question" />
          </el-tooltip>
        </el-upload>
      </el-form-item>
    </el-form>
    <div
      class="dialog-footer"
    >
      <el-button
        id="upload_package_close"
        @click="closeContributionCase"
        class="common-btn common-dark-btn"
        style="margin-right:20px;"
      >
        {{ $t('common.cancel') }}
      </el-button>
      <el-button
        id="upload_package_ipload"
        class="common-btn"
        @click="confirmAddCase()"
      >
        {{ $t('common.confirm') }}
      </el-button>
    </div>
  </div>
</template>
<script>
import { Userpage } from '../../../api/atpApi.js'

export default {
  name: 'ContributionCase',
  data () {
    const nameEmpty = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('promptMessage.nameEmpty')))
      } else {
        callback()
      }
    }
    const objectiveEmpty = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('promptMessage.objectiveEmpty')))
      } else {
        callback()
      }
    }
    const resultEmpty = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('promptMessage.expectResultEmpty')))
      } else {
        callback()
      }
    }
    const typeEmpty = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('promptMessage.typeEmpty')))
      } else {
        callback()
      }
    }
    const stepEmpty = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('promptMessage.testStepEmpty')))
      } else {
        callback()
      }
    }
    const fileEmpty = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error(this.$t('promptMessage.fileEmpty')))
      } else {
        callback()
      }
    }
    return {
      language: 'cn',
      addCaseForm: {
        name: '',
        objective: '',
        step: '',
        expectResult: '',
        type: '',
        file: []
      },
      rules: {
        name: [
          { required: true, validator: nameEmpty, trigger: 'blur' }
        ],
        objective: [
          { required: true, validator: objectiveEmpty, trigger: 'blur' }
        ],
        step: [
          { required: true, validator: stepEmpty, trigger: 'blur' }
        ],
        expectResult: [
          { required: true, validator: resultEmpty, trigger: 'blur' }
        ],
        type: [
          { required: true, validator: typeEmpty, trigger: 'change' }
        ],
        file: [
          { required: true, validator: fileEmpty, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    confirmAddCase () {
      this.$refs['addcaseForm'].validate((valid) => {
        if (!valid) {
          return false
        }
        let fd = new FormData()
        let _addCaseForm = this.addCaseForm
        fd.append('name', _addCaseForm.name)
        fd.append('objective', _addCaseForm.objective)
        fd.append('step', _addCaseForm.step)
        fd.append('expectResult', _addCaseForm.expectResult)
        fd.append('type', _addCaseForm.type)
        if (_addCaseForm.file.length > 0) {
          fd.append('file', _addCaseForm.file[0])
        } else {
          let _objFile = new File([], 'kong.java')
          _addCaseForm.file.push(_objFile)
          fd.append('file', _addCaseForm.file[0])
        }
        Userpage.contributionApi(fd).then(res => {
          this.$message({
            showClose: true,
            duration: 2000,
            message: this.$t('promptMessage.submitSuccess'),
            type: 'success'
          })
          this.$emit('setCaseTop', 'close')
          this.addCaseForm = {
            name: '',
            objective: '',
            step: '',
            expectResult: '',
            type: '',
            file: []
          }
        }).catch(() => {
          this.closeContributionCase()
        })
        if (this.addCaseForm.file.length !== 0) {
          this.$refs.import.clearValidate()
        }
      })
    },
    closeContributionCase () {
      this.$emit('setCaseTop', 'close')
      this.addCaseForm = {
        name: '',
        objective: '',
        step: '',
        expectResult: '',
        type: '',
        file: []
      }
    },
    handleExceed (file, fileList) {
      if (fileList.length === 1) {
        this.$message.warning(this.$t('promptMessage.onlyOneFile'))
      }
    },
    handleChange (file, fileList) {
      this.addCaseForm.file.push(file.raw)
      this.$refs.import.clearValidate()
    },
    handleDelte (file, fileList) {
      this.addCaseForm.file = fileList
    }
  }
}
</script>
<style lang="less">
  .case-detail{
    position: relative;
    padding-bottom: 20px;
  }
  .contibution-form{
    .el-input__inner,.el-textarea__inner{
      background-color: rgba(255, 255, 255, 0.45);
    }
  }
    .form-button{
      background-color: #f7f2ff;
      border: 1px solid #380879;
      color: #380879;
      border-radius: 25px;
      box-shadow: 0 5px 5px #deccf9;
    }
</style>
