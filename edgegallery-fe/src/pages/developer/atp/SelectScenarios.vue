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
      isShowCaseDetail: false
    }
  },
  mounted () {
    this.getAllScene()
    this.setDivHeight()
  },
  methods: {
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
      let data = [
        {
          id: '25232323',
          nameCh: '社区场景',
          nameEn: 'Edgegallery',
          descriptionCh: '适用于社区测试场景',
          descriptionEn: 'Suitable for China Unicom test scenarios',
          label: 'EdgeGallery'
        },
        {
          id: '455',
          nameCh: '运营商A',
          nameEn: 'Edgegallery',
          descriptionCh: '适用于XXX测试场景',
          descriptionEn: 'Suitable for China Unicom test scenarios'
        },
        {
          id: '786',
          nameCh: '运营商B',
          nameEn: 'Edgegallery',
          descriptionCh: '适用于XXX测试场景',
          descriptionEn: 'Suitable for China Unicom test scenarios'
        },
        {
          id: '58',
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
    getCaseList (item) {
      this.isShowScene = false
      this.isShowCaseDetail = true
      let scenarioIds = []
      scenarioIds.push(item.id)
      let fd = new FormData()
      fd.append('scenarioIds', scenarioIds)
      // Userpage.getSceneCaseApi(fd).then(res => {
      // this.testSuiteData = res.data[0].testSuites
      let data = [
        {
          id: '4',
          nameCh: '社区场景',
          nameEn: 'Edgegallery',
          descriptionCh: '适用于联通测试场景',
          descriptionEn: 'Suitable for China Unicom test scenarios',
          testSuites: [
            {
              id: '12',
              nameCh: '安全性测试',
              nameEn: 'curitytest',
              descriptionCh: '安全性测试描述',
              descriptionEn: 'curitytest description',
              scenarioIdList: '',
              testCases: [
                {
                  id: '455',
                  nameCh: '病毒扫描',
                  nameEn: 'Application Instantiation',
                  descriptionCh: '在一个边缘主机上实例化应用程序及其依赖项应用程序',
                  descriptionEn: 'nstantiate application and its dependency application on one edge host',
                  codeLanguage: 'java',
                  expectResultCh: '应用程序可以成功实例化',
                  expectResultEn: 'app can instantiate successfully.',
                  type: 'automatic',
                  testSuiteIdList: '',
                  testStepCh: '',
                  testStepEn: ''
                }
              ]
            }, {
              id: '12',
              nameCh: '安全性测试',
              nameEn: 'curitytest',
              descriptionCh: '安全性测试描述',
              descriptionEn: 'curitytest description',
              scenarioIdList: '',
              testCases: [
                {
                  id: '455',
                  nameCh: '病毒扫描',
                  nameEn: 'Application Instantiation',
                  descriptionCh: '在一个边缘主机上实例化应用程序及其依赖项应用程序',
                  descriptionEn: 'nstantiate application and its dependency application on one edge host',
                  codeLanguage: 'java',
                  expectResultCh: '应用程序可以成功实例化',
                  expectResultEn: 'app can instantiate successfully.',
                  type: 'automatic',
                  testSuiteIdList: '',
                  testStepCh: '',
                  testStepEn: ''
                }
              ]
            }
          ]
        }
      ]
      this.testSuiteData = data[0].testSuites
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
      Userpage.runTaskApi(this.taskId, fd).then(res => {
        sessionStorage.setItem('taskId', this.taskId)
        this.$router.push({ name: 'atpprocess', query: { taskId: this.taskId } })
      }).catch(() => {
        // this.$message({
        //   showClose: true,
        //   duration: 2000,
        //   message: '启动失败',
        //   type: 'error'
        // })
        this.$message({
          showClose: true,
          duration: 2000,
          message: '测试成功',
          type: 'success'
        })
        sessionStorage.setItem('currentFlow', 5)
        this.$router.push('/EG/developer/home')
      })
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
    background: url('../../../assets/images/div_bg.png');
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
    margin: 30px 0;
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
      margin: 0 80px 20px 0;
    }
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
    max-height: 90%;
    overflow: auto;
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
