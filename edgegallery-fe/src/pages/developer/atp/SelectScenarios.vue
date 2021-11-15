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
  <div class="wrapper">
    <div
      class="selectscene"
      :class="{'selectscene-hidden':!isShowScene}"
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
          @click="contributionCase()"
        >
          <el-button
            class="test-light-btn"
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
            class="scenar-content"
          >
            <!-- <img
              :src="getAppIcon(item)"
              alt=""
            > -->
            <img
              :src="item.images"
              alt=""
            >
            <el-button
              class="select-button"
              type="text"
            >
              <img
                src="../../../assets/images/atp/selected.png"
                alt=""
                v-if="item.selected"
                @click="chooseScene(item)"
              >
              <img
                v-else
                src="../../../assets/images/atp/notselected.png"
                alt=""
                @click="chooseScene(item)"
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
                  @click="getCaseList(item)"
                >
                  查看用例
                </el-button>
                <el-button
                  :disabled="item.nameEn === 'EdgeGallery Community Common Scenario'"
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
          :disabled="isCreateSuc"
          class="common-btn curp"
          @click="startTest()"
        >
          开始测试
        </el-button>
      </div>
    </div>
    <TestCaseDetail
      :test-suite-data="testSuiteData"
      :is-test-case="isTestCase"
      class="testcase-detail"
      :class="{'contirbution-case-show': isShowCaseDetail}"
      @setCaseTop="setCaseTop"
    />
    <ContributionCase
      class="contirbution-case"
      :class="{'contirbution-case-show': isShowContributionCase}"
      @setCaseTop="setCaseTop"
    />
  </div>
</template>
<script>
import { Userpage, URL_PREFIX } from '../../../api/atpApi.js'
import { atpTestApi } from '../../../api/developerApi.js'
import TestCaseDetail from './TestCase.vue'
import ContributionCase from './ContributionCase.vue'

export default {
  name: 'SelectScenarios',
  components: {
    ContributionCase, TestCaseDetail
  },
  data () {
    return {
      userName: '',
      sceneData: [],
      datacn: [],
      dataen: [],
      scenarioIdList: [],
      taskId: '',
      testSuiteData: [],
      language: 'cn',
      isTestCase: false,
      activeInfo: -1,
      isShowScene: true,
      isShowContributionCase: false,
      isShowCaseDetail: false,
      applicationId: sessionStorage.getItem('applicationId'),
      isCreateSuc: false
    }
  },
  mounted () {
    // this.getTaskId()
    this.getAllScene()
    this.setDivHeight()
  },
  methods: {
    getTaskId () {
      atpTestApi.submitTest(this.applicationId).then(res => {
        if (res.data) {
          atpTestApi.getTestId(this.applicationId).then(res => {
            console.log(res.data)
            this.taskId = res.data[0].id
            this.isCreateSuc = false
          })
        } else {
          this.$message({
            showClose: true,
            duration: 2000,
            message: '任务创建失败',
            type: 'error'
          })
        }
      })
    },
    setDivHeight () {
      this.$nextTick(() => {
        let screenHeight = document.body.clientHeight
        let oDiv = document.getElementsByClassName('wrapper')[0]
        if (oDiv) {
          oDiv.style.height = (Number(screenHeight) - 80) + 'px'
        }
      })
    },
    setCaseTop (data) {
      if (data === 'close') {
        this.isShowScene = true
        this.isShowContributionCase = false
        this.isShowCaseDetail = false
      }
    },
    hoverList (index) {
      this.activeInfo = index
    },
    contributionCase () {
      this.isShowScene = false
      this.isShowContributionCase = true
    },
    getAllScene () {
      // Userpage.getAllSceneApi().then(res => {
      let res = {
        'total': 5,
        'offset': 0,
        'limit': 12,
        'results': [{
          'id': '4d203111-1111-4f62-aabb-8ebcec357f87',
          'nameCh': '社区通用场景',
          'nameEn': 'EdgeGallery Community Common Scenario',
          'descriptionCh': '适用于社区场景的通用的测试',
          'descriptionEn': 'suite for EdgeGallery community common test',
          'createTime': '2021-10-11T13:02:53.157+0000',
          'images': require('../../../assets/images/atp/edge.png')
        }, {
          'id': 'e71718a5-864a-49e5-855a-5805a5e9f97d',
          'nameCh': 'A运营商',
          'nameEn': 'A Operator',
          'descriptionCh': '适用于A运营商场景的测试',
          'descriptionEn': 'suite for A Operator test scenario',
          'createTime': '2021-10-11T13:02:53.157+0000',
          'images': require('../../../assets/images/atp/A.png')
        }, {
          'id': '6fe8581c-b83f-40c2-8f5b-505478f9e30b',
          'nameCh': 'B运营商',
          'nameEn': 'B Operator',
          'descriptionCh': '适用于B运营商场景的测试',
          'descriptionEn': 'suite for B Operator test scenario',
          'createTime': '2021-10-11T13:02:53.157+0000',
          'images': require('../../../assets/images/atp/B.png')
        }, {
          'id': '96a82e85-d40d-4ce5-beec-2dd1c9a3d41d',
          'nameCh': 'C运营商',
          'nameEn': 'C Operator',
          'descriptionCh': '适用于C运营商场景的测试',
          'descriptionEn': 'suite for C Operator test scenario',
          'createTime': '2021-10-11T13:02:53.157+0000',
          'images': require('../../../assets/images/atp/C.png')
        }]
      }
      // let data = res.data.results
      let data = res.results
      data.forEach(item => {
        if (item.nameEn === 'EdgeGallery Community Common Scenario') {
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
      let scenarioIds = []
      scenarioIds.push(item.id)
      let fd = new FormData()
      fd.append('scenarioIds', scenarioIds)
      Userpage.getSceneCaseApi(fd).then(res => {
        let data = res.data[0].testSuites
        let IsHaveCase = data.some(function (element) {
          return (element.testCases.length !== 0)
        })
        if (IsHaveCase) {
          this.scenarioIdList.push(item.id)
          item.selected = !item.selected
        } else {
          this.$message({
            showClose: true,
            duration: 2000,
            message: this.$t('promptMessage.noCase'),
            type: 'warning'
          })
        }
      })
    },
    getAppIcon (item) {
      return URL_PREFIX + 'files/' + item.id
    },
    getCaseList (item) {
      this.isShowScene = false
      this.isShowCaseDetail = true
      let scenarioIds = []
      scenarioIds.push(item.id)
      let fd = new FormData()
      fd.append('scenarioIds', scenarioIds)
      // Userpage.getSceneCaseApi(fd).then(res => {
      // this.testSuiteData = res.data[0].testSuites
      let res = [{
        'id': '4d203111-1111-4f62-aabb-8ebcec357f87',
        'nameCh': '社区通用场景',
        'nameEn': 'EdgeGallery Community Common Scenario',
        'descriptionCh': '适用于社区场景的通用的测试',
        'descriptionEn': 'suite for EdgeGallery community common test',
        'label': 'EdgeGallery',
        'testSuites': [{
          'id': '522684bd-d6df-4b47-aab8-b43f1b4c19c0',
          'nameCh': '通用遵从性测试',
          'nameEn': 'Common Compliance Test',
          'descriptionCh': '遵从社区APPD标准、ETSI标准对应用包结构进行校验',
          'descriptionEn': 'Validate app package structure according to commnunity and ETSI standard',
          'scenarioIdList': ['4d203111-1111-4f62-aabb-8ebcec357f87'],
          'testCases': [{
            'id': '4d203173-1017-4f62-aabb-8ebcec357f87',
            'nameCh': '容器tgz中chart文件校验',
            'nameEn': 'Container Tgz Chart Validaion',
            'type': 'automatic',
            'descriptionCh': '容器的应用包，在helm模板的.tgz文件中，必须存在chart.yaml文件',
            'descriptionEn': 'There must exist chart.yaml file in .tgz file of helm for container app package',
            'hashCode': '',
            'codeLanguage': 'jar',
            'expectResultCh': '容器应用包的Artifacts/Deployment/Charts目录下的.tgz文件中必须存在chart.yaml文件',
            'expectResultEn': 'There must exist chart.yaml file in .tgz file of Artifacts/Deployment/Charts dir for container app package.',
            'testStepCh': '1.打开csar包 2.打开Artifacts/Deployment/Charts目录下的.tgz文件 3.是否存在chart.yaml文件',
            'testStepEn': '1.open csar package 2.open .tgz file in Artifacts/Deployment/Charts dir 3.validate the existence of chart.yaml file',
            'createTime': '2021-10-11T13:02:53.169+0000',
            'testSuiteIdList': ['522684bd-d6df-4b47-aab8-b43f1b4c19c0']
          }, {
            'id': '4d203173-1028-4f62-aabb-8ebcec357f87',
            'nameCh': 'MEP服务取消注册校验',
            'nameEn': 'Unregister Service To Mep Validation',
            'type': 'automatic',
            'descriptionCh': '向MEP平台取消已注册的服务',
            'descriptionEn': 'unregister service to mep',
            'hashCode': '',
            'codeLanguage': 'jar',
            'expectResultCh': '向MEP取消已注册的服务成功',
            'expectResultEn': 'unregister service to mep successfully.',
            'testStepCh': '1.调用mep服务取消注册接口 2.看接口返回结果',
            'testStepEn': '1.call mep unregister service interface 2.validate response',
            'createTime': '2021-10-11T13:02:53.176+0000',
            'testSuiteIdList': ['6d04da1b-1f36-4295-920a-8074f7f9d942']
          }]
        }, {
          'id': '743abd93-57a3-499d-9591-fa7db86a4778',
          'nameCh': '通用安全性测试',
          'nameEn': 'Common Security Test',
          'descriptionCh': '应用包安全测试',
          'descriptionEn': 'App package security test',
          'scenarioIdList': ['4d203111-1111-4f62-aabb-8ebcec357f87'],
          'testCases': [{
            'id': '4d203173-1009-4f62-aabb-8ebcec357f87',
            'nameCh': '文件目录层深校验',
            'nameEn': 'File Dir Depth Validation',
            'type': 'automatic',
            'descriptionCh': '文件目录层深校验',
            'descriptionEn': 'File Dir Depth Validation',
            'hashCode': '',
            'codeLanguage': 'java',
            'expectResultCh': '应用包包含文件的目录层级不超过10层',
            'expectResultEn': 'The depth of file dir no more than 10',
            'testStepCh': '1.解压应用包 2.遍历文件目录，没有超过10层的文件存在',
            'testStepEn': '1. unzip app package 2. traverse file dir, no file dir depth more than 10',
            'createTime': '2021-10-11T13:02:53.169+0000',
            'testSuiteIdList': ['743abd93-57a3-499d-9591-fa7db86a4778']
          }, {
            'id': '4d203173-1006-4f62-aabb-8ebcec357f87',
            'nameCh': '文件大小校验',
            'nameEn': 'File Size Validation',
            'type': 'automatic',
            'descriptionCh': '应用包大小校验',
            'descriptionEn': 'The size of app package validation',
            'hashCode': '',
            'codeLanguage': 'java',
            'expectResultCh': '应用包大小不超过5G',
            'expectResultEn': 'The size of app package no more than 5G',
            'testStepCh': '应用包大小不超过5G',
            'testStepEn': 'The size of app package no more than 5G',
            'createTime': '2021-10-11T13:02:53.169+0000',
            'testSuiteIdList': ['743abd93-57a3-499d-9591-fa7db86a4778']
          }, {
            'id': '4d203173-1003-4f62-aabb-8ebcec357f87',
            'nameCh': 'mf文件hash值列表校验',
            'nameEn': 'Manifest File Hash List Validation',
            'type': 'automatic',
            'descriptionCh': '.mf文件中，每个文件必须有对应的hash值描述',
            'descriptionEn': 'Every Source file must has Hash field in manifest file',
            'hashCode': '',
            'codeLanguage': 'java',
            'expectResultCh': '.mf文件中每个文件都有对应的hash值描述',
            'expectResultEn': 'Every Source file has Hash field in manifest file',
            'testStepCh': '1.打开csar包 2.打开.mf文件 3.校验每个Source字段对应的文件都有Hash字段的描述',
            'testStepEn': '1.open csar package 2.open .mf file 3.validate every Source file has Hash field in manifest file',
            'createTime': '2021-10-11T13:02:53.169+0000',
            'testSuiteIdList': ['743abd93-57a3-499d-9591-fa7db86a4778']
          }]
        }]
      }]
      this.testSuiteData = res[0].testSuites
      this.isTestCase = this.testSuiteData.every(function (element) {
        return (element.testCases.length === 0)
      })
      // }).catch(() => {
      //   this.$message({
      //     showClose: true,
      //     duration: 2000,
      //     message: this.$t('home.getFail'),
      //     type: 'warning'
      //   })
      // })
    },
    startTest () {
      this.$router.push('/EG/developer/testProcess')
      this.scenarioIdList = []
      this.sceneData.forEach(item => {
        if (item.selected) {
          this.scenarioIdList.push(item.id)
        }
      })
      let fd = new FormData()
      fd.append('scenarioIdList', this.scenarioIdList)
      // Userpage.runTaskApi(this.taskId, fd).then(res => {
      //   this.$router.push({ path: '/EG/developer/testProcess', query: { taskId: this.taskId } })
      // }).catch(() => {
      // })
    }
  }
}
</script>
<style lang="less">
.wrapper{
  padding: 0 15% 0 10%;
  position: relative;
  overflow: hidden;
}
  .selectscene{
    overflow: auto;
    border: 2px solid #b6a4ec;
    border-radius: 16px;
    // background: url('../../../assets/images/div_bg.png');
    box-shadow: 60px 70px 75px rgba(36,20,119,.25);
    position: absolute;
    z-index: 1;
    top: 110px;
    width: 74%;
    height: 580px;
    padding: 30px 40px;
    opacity: 1;
    transition: all .2s;

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
    margin-top: 30px;
    position: relative;
    z-index: 0;
    display: flex;
    flex-wrap: wrap;
    .list {
      box-sizing: border-box;
      width: 25%;
      padding: 0 2%;
      margin-bottom: 30px;
      .scenar-content{
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
      .scenar-content:hover .name{
        white-space: normal;
      }
    }
    @media screen and (max-width: 1240px) {
      .list{
          width: 33%;
      }
    }
  }
  .testbtn{
      position: absolute;
      z-index: 1;
      right: 100px;
      top: 500px;    }
  }
  .selectscene-hidden{
    z-index: -1;
    top: -500px;
    opacity: 0;
    transition: all .2s;
  }
  .testcase-detail{
    position: absolute;
    z-index: -1;
    top: 500px;
    left: 22%;
    width: 55%;
    opacity: 0;
    transition: all .2s linear;
  }
  .contirbution-case{
    position: absolute;
    z-index: -1;
    top: 500px;
    left: 30%;
    width: 40%;
    max-height: 90%;
    overflow: auto;
    opacity: 0;
    transition: all .2s linear;
  }
  .contirbution-case-show{
    z-index: 1;
    top: 110px;
    opacity: 1;
    transition: all .2s;
  }
</style>
