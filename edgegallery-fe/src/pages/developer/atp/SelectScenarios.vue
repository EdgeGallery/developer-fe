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
      class="selectscene common-div-bg"
      :class="{'selectscene-hidden':!isShowScene}"
      id="selectscene"
    >
      <div class="toptitle">
        <div class="left flex">
          <div class="left-text common-dlg-title">
            {{ $t('testCase.provideTestScenario') }}
          </div>
        </div>
        <div
          class="right"
          @click="contributionCase()"
        >
          <el-button
            class="common-btn"
          >
            {{ $t('testCase.contributionCase') }}
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
            <img
              :src="getAppIcon(item)"
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
                  {{ $t('testCase.viewCase') }}
                </el-button>
                <el-button
                  :disabled="item.nameEn === 'EdgeGallery Community Common Scenario'"
                  size="small"
                  class="scenebtn"
                  @click="chooseScene(item)"
                >
                  {{ $t('testCase.selectScenes') }}
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="testbtn rt">
        <el-button
          :disabled="isCreateSuc || userName==='guest'"
          class="common-btn curp"
          @click="startTest()"
        >
          {{ $t('testCase.startTest') }}
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
import { atpApi, URL_PREFIX_ATP } from '../../../api/atpApi.js'
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
      userName: sessionStorage.getItem('userName'),
      sceneData: [],
      datacn: [],
      dataen: [],
      scenarioIdList: [],
      taskId: '',
      testSuiteData: [],
      language: localStorage.getItem('language') || 'cn',
      isTestCase: false,
      activeInfo: -1,
      isShowScene: true,
      isShowContributionCase: false,
      isShowCaseDetail: false,
      applicationId: sessionStorage.getItem('applicationId'),
      isCreateSuc: true
    }
  },
  mounted () {
    this.getTaskId()
    this.getAllScene()
    this.setDivHeight()
  },
  methods: {
    getTaskId () {
      atpTestApi.submitTest(this.applicationId).then(res => {
        if (res.data) {
          atpTestApi.getTestId(this.applicationId).then(response => {
            this.taskId = response.data[0].id
            this.isCreateSuc = false
          })
        } else {
          this.$message.warning(this.$t('atpPromptMessage.creattaskFail'))
        }
      }).catch(() => {
        this.$message.warning(this.$t('atpPromptMessage.creattaskFail'))
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
      atpApi.getAllSceneApi().then(res => {
        let data = res.data.results
        data.forEach(item => {
          if (item.nameEn === 'EdgeGallery Community Common Scenario') {
            item.selected = true
          } else {
            item.selected = false
          }
        })
        this.sceneData = data
      }).catch(() => {
        this.$message({
          showClose: true,
          duration: 2000,
          message: this.$t('atpPromptMessage.getSceneFail'),
          type: 'error'
        })
      })
    },
    chooseScene (item) {
      let scenarioIds = []
      scenarioIds.push(item.id)
      let fd = new FormData()
      fd.append('scenarioIds', scenarioIds)
      atpApi.getSceneCaseApi(fd).then(res => {
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
            message: this.$t('atpPromptMessage.noCase'),
            type: 'warning'
          })
        }
      })
    },
    getAppIcon (item) {
      return URL_PREFIX_ATP + 'files/' + item.id
    },
    getCaseList (item) {
      this.isShowScene = false
      this.isShowCaseDetail = true
      let scenarioIds = []
      scenarioIds.push(item.id)
      let fd = new FormData()
      fd.append('scenarioIds', scenarioIds)
      atpApi.getSceneCaseApi(fd).then(res => {
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
      atpApi.runTaskApi(this.taskId, fd).then(res => {
        this.$router.push({ path: '/EG/developer/testProcess', query: { taskId: this.taskId } })
      })
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
      this.getAllScene()
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
    border-radius: 16px;
    position: absolute;
    z-index: 1;
    top: 50px;
    width: 74%;
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
          margin-bottom: 0;
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
        background-color: #ffffff;
        .sceneimage{
          width: 100%;
          height: 138px;
          text-align: center;
          display: block;
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
          background: #4E3494;
          border-radius: 0 0 8px 8px;
          position: absolute;
          width: 100%;
          bottom: 0px;
          z-index: 2;
          padding: 20px 20px 10px;
          .name{
            font-family: defaultFont, Arial, Helvetica, sans-serif;
            font-size: 18px;
            color: #fff;
            margin-bottom: 7px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .description{
            font-family: defaultFontLight,Arial, Helvetica, sans-serif;
            display: block;
            font-size: 16px;
            color: #fff;
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
              color: #5944C0;
              background-color: #fff;
              border-radius: 30px;
            }
            .el-button--small {
              padding: 2px;
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
      bottom: 50px;
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
    top: 40px;
    opacity: 1;
    transition: all .2s;
  }
</style>
