<!--
  -  Copyright 2021 Huawei Technologies Co., Ltd.
  -
  -  Licensed under the Apache License, Version 2.0 (the "License");
  -  you may not use this file except in compliance with the License.
  -  You may obtain a copy of the License at
  -
  -      http://www.apache.org/licenses/LICENSE-2.0
  -
  -  Unless required by applicable law or agreed to in writing, software
  -  distributed under the License is distributed on an "AS IS" BASIS,
  -  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  -  See the License for the specific language governing permissions and
  -  limitations under the License.
  -->
<template>
  <div class="padding_default wrapper">
    <div
      class="selectscene"
      id="selectscene"
    >
      <div class="toptitle">
        <div class="left flex">
          <div class="left-text">
            <img
              src="../../../assets/images/atp/select_scene_icon.png"
              alt=""
              style="margin-right:10px;"
            >
            选择测试场景
          </div>
        </div>
        <div
          class="right"
          @click="contribution()"
        >
          <el-button
            class="dark-button"
            size="small"
          >
            贡献用例
          </el-button>
        </div>
      </div>
      <div class="allscene">
        <div
          class="list"
          v-for="(item,index) in sceneData"
          :key="item.id"
          @mouseenter="hoverList(index)"
          @mouseleave="activeInfo=-1"
        >
          <div
            class="content"
          >
            <!-- <img
              :src="getAppIcon(item)"
              alt=""
            > -->
            <img
              src="../../../assets/images/atp/kp2@2x.png"
              alt=""
              class="sceneimage"
            >
            <el-button
              class="select-button"
              type="text"
            >
              <img
                src="../../../assets/images/atp/selected.png"
                alt=""
                v-if="item.selected"
              >
              <img
                v-else
                src="../../../assets/images/atp/notselected.png"
                alt=""
              >
            </el-button>
            <div class="content-info">
              <p class="name">
                {{ language === 'cn' ? item.nameCh :item.nameEn }}
              </p>
              <span
                class="description"
                :class="{'showall':activeInfo===index}"
              >{{ language === 'cn' ? item.descriptionCh :item.descriptionEn }}</span>
              <div
                class="operation-btn"
                :class="{'btnNone':activeInfo===index}"
              >
                <el-button
                  size="small"
                  class="scenebtn"
                  @click="getDetail(item)"
                  @click.stop="getDetail()"
                >
                  查看用例
                </el-button>
                <el-button
                  :disabled="item.label==='EdgeGallery'"
                  size="small"
                  class="scenebtn"
                  @click="chooseScene(item)"
                >
                  选择场景
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="testbtn rt">
        <el-button
          class="start-button
          curp"
          @click="startTest()"
        >
          开始测试
        </el-button>
      </div>
    </div>
    <!-- case detail -->
    <el-dialog
      :visible.sync="isCaseVisible"
      :title="$t('userpage.caseDetail')"
      width="45%"
    >
      <el-collapse
        :value="opened"
        v-if="!isTestCase"
      >
        <el-collapse-item
          v-for="(item,index) in testSuiteData"
          :key="index"
          :title="language==='cn'?item.nameCh:item.nameEn"
          :name="item.nameEn"
        >
          <el-table
            :data="item.testCases"
            header-cell-class-name="caseHearder"
          >
            <el-table-column
              :label="$t('userpage.name')"
              width="210"
            >
              <template slot-scope="scope">
                {{ language==='cn'?scope.row.nameCh:scope.row.nameEn }}
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('userpage.type')"
              width="120"
            >
              <template slot-scope="scope">
                {{ language==='en'?scope.row.type:scope.row.type==='automatic'?'自动化类型':'手动类型' }}
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('userpage.description')"
            >
              <template slot-scope="scope">
                {{ language==='cn'?scope.row.descriptionCh:scope.row.descriptionEn }}
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
      <span
        v-else
        style="font-size:18px; padding-left: 8px;"
      >{{ this.$t('promptMessage.noCase') }}</span>
      <div
        slot="footer"
      >
        <el-button
          class="dark-button"
          @click="handleClose()"
        >
          {{ $t('common.close') }}
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="isAddCaseVisible"
      :title="$t('userpage.contribution')"
      :close-on-click-modal="false"
      width="45%"
      class="addCasedialog"
    >
      <el-form
        :model="addcaseForm"
        label-width="auto"
        ref="addcaseForm"
        :rules="rules"
      >
        <el-form-item
          :label="$t('testCase.caseName')"
          prop="name"
        >
          <el-input
            width="100px"
            size="small"
            v-model="addcaseForm.name"
            maxlength="64"
          />
        </el-form-item>
        <el-form-item
          :label="$t('testCase.casePurpose')"
          prop="objective"
        >
          <el-input
            v-model="addcaseForm.objective"
            type="textarea"
            autosize
            maxlength="255"
          />
        </el-form-item>
        <el-form-item
          :label="$t('testCase.step')"
          prop="step"
        >
          <el-input
            v-model="addcaseForm.step"
            type="textarea"
            autosize
            maxlength="255"
          />
        </el-form-item>
        <el-form-item
          :label="$t('testCase.expectedResult')"
          prop="expectResult"
        >
          <el-input
            size="small"
            v-model="addcaseForm.expectResult"
            maxlength="255"
          />
        </el-form-item>
        <el-form-item
          :label="$t('testCase.type')"
          prop="type"
        >
          <el-select
            size="small"
            v-model="addcaseForm.type"
            :placeholder="$t('userpage.choose')"
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
          v-if="addcaseForm.type==='script'"
          :label="$t('testCase.import')"
          prop="file"
          ref="import"
        >
          <el-upload
            action=""
            :limit="1"
            :on-exceed="handleExceed"
            :on-change="handleChange"
            :on-remove="handleDelte"
            :file-list="addcaseForm.file"
            :auto-upload="false"
            accept=".zip"
          >
            <el-button
              slot="trigger"
              size="small"
              class="form-button"
            >
              {{ $t('testCase.import') }}
            </el-button>
            <el-tooltip
              style="margin-left:10px;"
              :content="$t('userpage.contentTip')"
              placement="right"
            >
              <em class="el-icon-question" />
            </el-tooltip>
          </el-upload>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          id="upload_package_close"
          @click="cancelClose"
          class="light-button"
          style="margin-right:20px;"
        >
          {{ $t('common.cancel') }}
        </el-button>
        <el-button
          id="upload_package_ipload"
          class="dark-button"
          @click="confirmAddCase()"
        >
          {{ $t('common.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { Userpage, URL_PREFIX } from '../../../api/atpApi.js'

export default {
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
      userName: '',
      sceneData: [],
      datacn: [],
      dataen: [],
      scenarioIdList: [],
      isCaseVisible: false,
      taskId: '',
      testSuiteData: [],
      language: 'cn',
      isAddCaseVisible: false,
      addcaseForm: {
        name: '',
        objective: '',
        step: '',
        expectResult: '',
        type: '',
        file: []
      },
      isTestCase: false,
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
      },
      activeInfo: -1
    }
  },
  computed: {
    opened () {
      return this.testSuiteData.map((testSuite) => {
        return testSuite.nameEn
      })
    }
  },
  mounted () {
    this.getAllScene()
  },
  methods: {
    hoverList (index) {
      this.activeInfo = index
    },
    contribution () {
      if (this.$refs['addcaseForm']) {
        this.$refs['addcaseForm'].resetFields()
      }
      this.isAddCaseVisible = true
    },
    getAllScene () {
      // Userpage.getAllSceneApi().then(res => {
      let data = [
        {
          'id': '25232323',
          nameCh: '社区场景',
          nameEn: 'Edgegallery',
          descriptionCh: '适用于社区测试场景',
          descriptionEn: 'Suitable for China Unicom test scenarios',
          label: 'EdgeGallery'
        },
        {
          'id': '455',
          nameCh: '运营商A',
          nameEn: 'Edgegallery',
          descriptionCh: '适用于XXX测试场景',
          descriptionEn: 'Suitable for China Unicom test scenarios'
        },
        {
          'id': '786',
          nameCh: '运营商B',
          nameEn: 'Edgegallery',
          descriptionCh: '适用于XXX测试场景',
          descriptionEn: 'Suitable for China Unicom test scenarios'
        },
        {
          'id': '58',
          nameCh: '运营商B',
          nameEn: 'Edgegallery',
          descriptionCh: '适用于XXX测试场景',
          descriptionEn: 'Suitable for China Unicom test scenarios'
        }
      ]
      // let data = res.data
      data.forEach(item => {
        if (item.label === 'EdgeGallery') {
          item.selected = true
        } else {
          item.selected = false
        }
      })
      this.sceneData = data
      // }).catch(() => {
      //   this.$message({
      //     showClose: true,
      //     duration: 2000,
      //     message: this.$t('promptMessage.getSceneFail'),
      //     type: 'error'
      //   })
      // })
    },
    chooseScene (item) {
      item.selected = !item.selected
      // let scenarioIds = []
      // scenarioIds.push(item.id)
      // let fd = new FormData()
      // fd.append('scenarioIds', scenarioIds)
      // Userpage.getSceneCaseApi(fd).then(res => {
      //   let data = res.data[0].testSuites
      //   let IsHaveCase = data.some(function (element) {
      //     return (element.testCases.length !== 0)
      //   })
      //   if (IsHaveCase) {
      //     this.scenarioIdList.push(item.id)
      //     item.selected = !item.selected
      //   } else {
      //     this.$message({
      //       showClose: true,
      //       duration: 2000,
      //       message: this.$t('promptMessage.noCase'),
      //       type: 'warning'
      //     })
      //   }
      // })
    },
    getAppIcon (item) {
      return URL_PREFIX + 'files/' + item.id
    },
    handleClose () {
      this.isCaseVisible = false
    },
    getDetail (item) {
      this.isCaseVisible = true
      let scenarioIds = []
      scenarioIds.push(item.id)
      let fd = new FormData()
      fd.append('scenarioIds', scenarioIds)
      Userpage.getSceneCaseApi(fd).then(res => {
        this.testSuiteData = res.data[0].testSuites
        this.isTestCase = this.testSuiteData.every(function (element) {
          return (element.testCases.length === 0)
        })
      }).catch(() => {
        this.$message({
          showClose: true,
          duration: 2000,
          message: this.$t('home.getFail'),
          type: 'warning'
        })
      })
    },
    startTest () {
      this.scenarioIdList = []
      this.sceneData.forEach(item => {
        if (item.selected) {
          this.scenarioIdList.push(item.id)
        }
      })
      let fd = new FormData()
      fd.append('scenarioIdList', this.scenarioIdList)
      Userpage.runTaskApi(this.taskId, fd).then(res => {
        sessionStorage.setItem('taskId', this.taskId)
        this.$router.push({ name: 'atpprocess', query: { taskId: this.taskId } })
      }).catch(() => {
        this.$message({
          showClose: true,
          duration: 2000,
          message: this.$t('promptMessage.runFailed'),
          type: 'error'
        })
      })
    },
    confirmAddCase () {
      this.$refs['addcaseForm'].validate((valid) => {
        if (!valid) {
          return false
        }
        let fd = new FormData()
        let addcaseForm = this.addcaseForm
        fd.append('name', addcaseForm.name)
        fd.append('objective', addcaseForm.objective)
        fd.append('step', addcaseForm.step)
        fd.append('expectResult', addcaseForm.expectResult)
        fd.append('type', addcaseForm.type)
        if (addcaseForm.file.length > 0) {
          fd.append('file', addcaseForm.file[0])
        } else {
          let objFile = new File([], 'kong.java')
          addcaseForm.file.push(objFile)
          fd.append('file', addcaseForm.file[0])
        }
        Userpage.contributionApi(fd).then(res => {
          this.$message({
            showClose: true,
            duration: 2000,
            message: this.$t('promptMessage.submitSuccess'),
            type: 'success'
          })
          this.isAddCaseVisible = false
          this.addcaseForm = {
            name: '',
            objective: '',
            step: '',
            expectResult: '',
            type: '',
            file: []
          }
        }).catch(() => {
          this.cancelClose()
        })
        if (this.addcaseForm.file.length !== 0) {
          this.$refs.import.clearValidate()
        }
      })
    },
    cancelClose () {
      this.isAddCaseVisible = false
      this.addcaseForm = {
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
      this.addcaseForm.file.push(file.raw)
      this.$refs.import.clearValidate()
    },
    handleDelte (file, fileList) {
      this.addcaseForm.file = fileList
    }
  }
}
</script>
<style lang="less">
.wrapper{
  margin: 10% 0;
}
  .selectscene{
    position: relative;
    padding:  30px 0 50px;
    border-radius: 17px;
    display: block;
    border: solid 1px #b768eb;
    border-radius: 5px;
    background-image: url('../../../assets/images/atp/atp_scenarious_bg.png');
    box-shadow: 20px 30px 40px 0 #9896f3;

    .toptitle{
      color: #fff;
      display: flex;
      justify-content: space-between;
      position: relative;
      padding:  0 50px;
      .left{
        font-family: defaultFont, Arial, Helvetica, sans-serif;
        .left-text{
          position: relative;
          z-index: 2;
          padding: 10px 15px 15px 0;
          border-radius: 12px;
          height: 47px;
          width: 100%;
          font-size: 20px;
        }
      }
      .right{
        font-size: 20px;
        cursor: pointer;
        padding-top: 8px;
      }
    }
  .allscene{
    padding: 0 5.3%;
    margin: 30px 0;
    display: flex;
    flex-wrap: wrap;
    .list {
      box-sizing: border-box;
      width: 25%;
      padding: 0 2%;
      margin-bottom: 30px;
      .content{
        box-shadow: 0 0 20px rgba(27, 7, 118, 0.1);
        border-radius: 8px;
        position: relative;
        padding-bottom: 90px;
        img{
          width: 100%;
          display: block;
          height: 160px;
          border-radius: 8px 8px 0 0;
        }
        .select-button{
          position: absolute;
          display: block;
          right: 15px;
          top: 12px;
          width: 24px;
          height: 24px;
          img{
             width: 24px;
            height: 24px;
          }
        }
        .content-info{
          background: #fff;
          border-radius: 8px;
          position: absolute;
          width: 100%;
          bottom: 0px;
          z-index: 2;
          padding: 20px 20px 10px;
          .name{
            font-family: defaultFont, Arial, Helvetica, sans-serif;
            font-size: 18px;
            color: #000;
            margin-bottom: 7px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .description{
            font-family: defaultFontLight,Arial, Helvetica, sans-serif;
            display: block;
            font-size: 14px;
            color: #000;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .description.showall{
             white-space: normal;
          }
          .operation-btn{
            width: 100%;
            max-height: 0px;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-top: 10px;
            transition: all 0.6s ease-in-out;
            .scenebtn{
              color: #fff;
              background-color: #5944C0;
              border-radius: 30px;
            }
            .el-button--small {
              padding: 5px 8px;
            }
          }
          .operation-btn.btnNone{
            max-height: 40px;
            transition: all 0.6s ease-in-out;
          }
        }
      }
      .content:hover .name{
        white-space: normal;
      }
    }
    @media screen and (max-width: 1180px) {
      .list{
          width: 33%;
      }
    }
  }
  .testbtn{
    margin-right: 80px;
    .start-button.el-button{
      border-radius: 12px;
      text-align: center;
      background: #fff;
      color: #5944C0;
      padding: 5px 16px;
    }
  }
  }

  .el-dialog{
    border-radius: 10px;
    background-color: #efefef;
      .el-dialog__header{
        border: none;
        padding: 40px 40px 0;
        border-radius: 10px 10px 0 0;
        .el-dialog__headerbtn{
          display: none;
        }
      }
      .el-dialog__title{
          font-family: defaultFontLight, Arial, Helvetica, sans-serif;
          font-size: 20px !important;
          color: #380879 !important;
      }
      .el-dialog__title::before{
        content: '';
        display:inline-block;
        width:17px;
        height:17px;
        margin-right:20px;
        position: relative;
        top: 2px;
      }
    .el-dialog__body{
      padding: 20px 40px 0 !important;
      .el-collapse {
        padding: 0;
        .el-collapse-item {
          margin-bottom: 15px;
          .el-collapse-item__content{
            padding: 0;
          }
          .el-collapse-item__header{
            font-family: defaultFontLight, Arial, Helvetica, sans-serif;
            border-radius: 10px 10px 0 0;
            height: 35px;
            padding-left: 15px;
            font-size: 18px;
            color: #fff;
            background-color: #9d95c9!important;
          }
          .el-collapse-item__wrap{
            border-radius: 0 0 10px 10px;
          }
          .caseHearder{
            background: #dedae9;
            color: #6d5d83;
            padding: 0 10px;
            height: 35px;
            line-height: 35px;
            font-size: 16px;
            font-weight: normal;
          }
          .has-gutter th{
            border-radius: 0;
          }
          .el-table tr {
            background-color: #f1f2f6;
            height: 37px;
          }
          .el-table td{
            padding: 0 10px;
            color: #6f6084;
            vertical-align: top;
          }
          .el-table__body{
            .cell{
              padding-top: 5px;
            }
          }
        }
      }
        .el-icon-arrow-right:before {
          color: #fff;
        }
        .el-table::before {
            width: 0;
        }
        table th,table td{
          border-bottom: none !important;
          height: 20px;
        }
      }
  }
  .addCasedialog{
    .form-button{
          background-color: #f7f2ff;
          border: 1px solid #380879;
          color: #380879;
          border-radius: 5px;
          box-shadow: 0 5px 5px #deccf9;
        }
  }

</style>
