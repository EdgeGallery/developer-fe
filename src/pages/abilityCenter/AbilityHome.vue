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
  <div>
    <div
      class="capa_home"
    >
      <div class="topLine">
        <div
          class="title"
          :class="{'tit_en':language==='en'}"
        >
          <span>{{ $t('api.capabilitieTitle') }}</span>
          <span class="dots" />
          <span>{{ $t('api.capabilitieTitle2') }}</span>
        </div>
        <div id="position" />
      </div>
      <div
        class="padding_default"
        id="capa_tit_div"
      >
        <div class="title_top title_left defaultFontBlod clear">
          {{ $t('workspace.platformCapabilities') }}
          <span class="line_bot1" />
        </div>
      </div>
      <!-- Ability list -->
      <div class="capa_list_div padding_default clear">
        <div class="filter_div">
          <p
            class="filter_default"
            :class="{'filter_default_en':language==='en'}"
            @mouseenter="filterDropDown"
            @mouseleave="filterDropUp"
          >
            {{ hotFilter==='hot'?$t('api.mostPopular'):$t('api.latestUpdate') }}
            <img
              src="../../assets/images/capa_filter_icon.png"
              alt=""
              class="filter_icon"
              :class="{'filter_down':dropDown}"
            >
          </p>
          <el-collapse-transition>
            <div
              v-show="showFilter"
              class="down_div"
              :class="{'down_div_en':language==='en'}"
              @mouseenter="filterDropDown"
              @mouseleave="filterDropUp"
            >
              <div
                class="transition-box"
                @click="filterSefvice('hot')"
              >
                {{ $t('api.mostPopular') }}
              </div>
              <div
                class="transition-box"
                @click="filterSefvice('new')"
              >
                {{ $t('api.latestUpdate') }}
              </div>
            </div>
          </el-collapse-transition>
        </div>
        <!-- Left menu -->
        <div
          class="list_left lt"
          v-loading="groupLoading"
          ref="meptree"
          :class="{'scroll_top':scrollTop,'list_bottom':listBottom && capabilityServiceList.length>=4}"
        >
          <CapabilityGroupList
            :capability-groups-list="capabilityGroupsList"
            :language="language"
            :is-refrsh-page="isRefrshPage"
            :capability-all-service="capabilityAllService"
            @getCapaServiceList="getCapaServiceList"
            ref="groupList"
            v-if="capabilityGroupsList.length>0"
            @getPageScroll="getPageScroll"
          />
        </div>
        <!-- List on the right -->
        <div
          class="list_right clear rt"
          v-loading="serviceLoading"
          :class="{'scroll_top':scrollTop}"
          ref="rightService"
        >
          <CapabilityServiceList
            :capability-service-list="capabilityServiceList"
            :language="language"
            :show-num="showNum"
            ref="serviceList"
            :user-id="userId"
            v-if="capabilityServiceList.length>0"
          />
          <p
            class="button_more"
            v-if="showNum<capabilityServiceList.length"
          >
            <el-button
              class="linearGradient"
              @click="showMore()"
            >
              {{ $t('api.showMore') }}
            </el-button>
          </p>
        </div>
      </div>
      <!-- Telecom standards support panorama -->
      <div
        class="panorama padding_default"
        id="panorama"
      >
        <div class="tit_panorama title_top title_left defaultFontBlod">
          {{ $t('capabilityCenter.telecomStandards') }}
          <span class="line_bot1" />
        </div>
        <p class="title title_left">
          <span class="dots" />ETSI
        </p>
        <ability-brain-map
          :parent-tab-index="etsiIndex"
          container-id="etsi-container"
        />
        <p class="title title_left">
          <span class="dots" />3GPP
        </p>
        <ability-brain-map
          :parent-tab-index="threeGppIndex"
          container-id="threegpp-container"
        />
      </div>
    </div>
  </div>
</template>

<script>
import abilityAPI from './ability.js'
import { Api } from '../../tools/api.js'
import AbilityBrainMap from './AbilityBrainMap.vue'
import CapabilityGroupList from './CapabilityGroupList.vue'
import CapabilityServiceList from './CapabilityServiceList.vue'

export default {
  components: {
    AbilityBrainMap,
    CapabilityGroupList,
    CapabilityServiceList
  },
  data () {
    return {
      userId: sessionStorage.getItem('userId'),
      language: localStorage.getItem('language'),
      etsiIndex: -1,
      threeGppIndex: -1,
      showFilter: false,
      dropDown: false,
      selectIndex: 0,
      selectDetailIndex: 0,
      capabilityIconList: [
        {
          icon: require('../../assets/images/capalist_icon1_default.png'),
          iconSelect: require('../../assets/images/capalist_icon1_select.png')
        },
        {
          icon: require('../../assets/images/capalist_icon2_default.png'),
          iconSelect: require('../../assets/images/capalist_icon2_select.png')
        },
        {
          icon: require('../../assets/images/capalist_icon3_default.png'),
          iconSelect: require('../../assets/images/capalist_icon3_select.png')
        },
        {
          icon: require('../../assets/images/capalist_icon4_default.png'),
          iconSelect: require('../../assets/images/capalist_icon4_select.png')
        },
        {
          icon: require('../../assets/images/capalist_icon5_default.png'),
          iconSelect: require('../../assets/images/capalist_icon5_select.png')
        },
        {
          icon: require('../../assets/images/capalist_icon6_default.png'),
          iconSelect: require('../../assets/images/capalist_icon6_select.png')
        },
        {
          icon: require('../../assets/images/capalist_icon7_default.png'),
          iconSelect: require('../../assets/images/capalist_icon7_select.png')
        },
        {
          icon: require('../../assets/images/capalist_icon8_default.png'),
          iconSelect: require('../../assets/images/capalist_icon8_select.png')
        }
      ],
      capabilityAllService: [],
      capabilityGroupsList: [],
      capabilityServiceList: [],
      dialogVisible: false,
      groupLoading: true,
      serviceLoading: true,
      isFirstEnter: true,
      scrollTop: false,
      listBottom: false,
      hotFilter: 'hot',
      showNum: 12,
      fromHomeIndex: 0,
      isRefrshPage: true,
      screenHeight: document.body.clientHeight,
      timer: false
    }
  },
  watch: {
    screenHeight (val) {
      if (!this.timer) {
        this.screenHeight = val
        this.timer = true
        setTimeout(function () {
          this.timer = false
        }, 400)
        this.setDivHeight(this.screenHeight)
      }
    },
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  },
  methods: {
    filterDropDown () {
      this.showFilter = true
      this.dropDown = true
    },
    filterDropUp () {
      this.showFilter = false
      this.dropDown = false
    },
    filterSefvice (filter) {
      let length = this.capabilityServiceList.length
      if (length > 0) {
        this.hotFilter = filter
        if (filter === 'hot') {
          this.capabilityServiceList.sort(function (a, b) {
            return a.selectCount < b.selectCount ? 1 : -1
          })
        } else if (filter === 'new') {
          this.capabilityServiceList.sort(function (a, b) {
            return a.uploadTime < b.uploadTime ? 1 : -1
          })
        }
      }
      this.showFilter = false
      this.dropDown = false
    },
    getCapaServiceList (data) {
      this.capabilityServiceList = data
    },
    showMore () {
      this.showNum += 12
    },
    // Get all services
    initAbilities () {
      Api.getCapabilityGroupsApi()
        .then(res => {
          abilityAPI.initAbilities(res.data, this.$i18n.locale)
          this.capabilityGroupsList = []
          this.etsiIndex = 0
          this.threeGppIndex = 1
          let oneLevelNameEn = []
          let oneLevelNameCn = []
          let groupData = res.data
          this.capabilityAllService = []
          this.capabilityServiceList = []
          this.serviceLoading = false
          let objTemp = {}
          groupData.forEach(item => {
            if (item.oneLevelName !== 'ETSI' && item.oneLevelName !== '3GPP') {
              oneLevelNameEn.push(item.oneLevelNameEn)
              oneLevelNameCn.push(item.oneLevelName)
              this.capabilityAllService.push(item)
              this.capabilityServiceList.push(item)
              this.capabilityServiceList.forEach(itemService => {
                itemService.uploadTime = this.dateChange(itemService.uploadTime)
              })
            }
            if (objTemp[item.oneLevelName]) {
              objTemp[item.oneLevelName]++
            } else {
              objTemp[item.oneLevelName] = 1
            }
          })
          this.capabilityServiceList.sort(function (a, b) {
            return a.uploadTime > b.uploadTime ? 1 : -1
          })
          oneLevelNameEn = Array.from(new Set(oneLevelNameEn))
          oneLevelNameCn = Array.from(new Set(oneLevelNameCn))
          let length = oneLevelNameEn.length
          this.groupLoading = false
          for (let i = 0; i < length; i++) {
            let obj = {
              name: '',
              nameEn: '',
              icon: '',
              iconSelect: '',
              counts: 0
            }
            for (let key in objTemp) {
              if (key === oneLevelNameCn[i]) {
                obj.counts = objTemp[key]
              }
            }
            this.handleOneLevelName(oneLevelNameEn, i, obj)
            obj.name = oneLevelNameCn[i]
            obj.nameEn = oneLevelNameEn[i]
            this.capabilityGroupsList.push(obj)
          }
          let objfirst = {
            name: '所有',
            nameEn: 'All',
            icon: this.capabilityIconList[0].icon,
            iconSelect: this.capabilityIconList[0].iconSelect,
            counts: this.capabilityAllService.length
          }
          this.capabilityGroupsList.unshift(objfirst)
          this.isFirstEnterPage()
          this.filterSefvice('hot')
        }).catch(() => {
          setTimeout(() => {
            this.groupLoading = false
            this.serviceLoading = false
          }, 2000)
        })
    },
    handleOneLevelName (oneLevelNameEn, i, obj) {
      if (oneLevelNameEn[i] === 'Platform services') {
        obj.icon = this.capabilityIconList[1].icon
        obj.iconSelect = this.capabilityIconList[1].iconSelect
      } else if (oneLevelNameEn[i] === 'Telecom network') {
        obj.icon = this.capabilityIconList[2].icon
        obj.iconSelect = this.capabilityIconList[2].iconSelect
      } else if (oneLevelNameEn[i] === 'Ascend AI') {
        obj.icon = this.capabilityIconList[3].icon
        obj.iconSelect = this.capabilityIconList[3].iconSelect
      } else if (oneLevelNameEn[i] === 'AI capabilities') {
        obj.icon = this.capabilityIconList[4].icon
        obj.iconSelect = this.capabilityIconList[4].iconSelect
      } else if (oneLevelNameEn[i] === 'Video processing') {
        obj.icon = this.capabilityIconList[5].icon
        obj.iconSelect = this.capabilityIconList[5].iconSelect
      } else if (oneLevelNameEn[i] === 'DateBase') {
        obj.icon = this.capabilityIconList[6].icon
        obj.iconSelect = this.capabilityIconList[6].iconSelect
      } else if (oneLevelNameEn[i] === 'Public framework') {
        obj.icon = this.capabilityIconList[7].icon
        obj.iconSelect = this.capabilityIconList[7].iconSelect
      } else {
        obj.icon = this.capabilityIconList[0].icon
        obj.iconSelect = this.capabilityIconList[0].iconSelect
      }
    },
    isFirstEnterPage () {
      if (!this.isFirstEnter) {
        this.$nextTick(() => {
          this.$refs.groupList.selectGroupList(this.capabilityGroupsList[this.selectIndex], this.selectIndex)
        })
        if (sessionStorage.getItem('capaSelectDetailIndex')) {
          this.$nextTick(() => {
            this.$refs.serviceList.viewServiceDetail(this.capabilityServiceList[this.selectDetailIndex])
          })
        } else {
          this.dialogVisible = false
        }
      }
      if (this.fromHomeIndex) {
        this.$nextTick(() => {
          this.$refs.groupList.selectGroupList(this.capabilityGroupsList[this.fromHomeIndex], this.fromHomeIndex)
        })
      } else {
        this.$nextTick(() => {
          this.$refs.groupList.selectGroupList(this.capabilityGroupsList[0], 0)
        })
      }
    },
    handleClose () {
      this.dialogVisible = false
    },
    getTreeTop () {
      let treeTop = this.$refs.meptree.getBoundingClientRect().top
      let rightTop = this.$refs.rightService.getBoundingClientRect().top
      const elOffsetTop = document.getElementById('panorama').offsetTop
      const docScrollTop = document.documentElement.scrollTop
      let scrollBottom = (elOffsetTop >= docScrollTop) && elOffsetTop < (docScrollTop + window.innerHeight)
      if (rightTop > 194 || treeTop < 120) {
        this.scrollTop = false
      } else {
        this.scrollTop = true
      }

      if (scrollBottom) {
        this.listBottom = true
        this.scrollTop = false
      } else {
        this.listBottom = false
      }
    },
    setDivHeight (screenHeight) {
      this.$nextTick(() => {
        let oDiv = document.getElementsByClassName('capa_list_div')
        if (oDiv[0]) {
          oDiv[0].style.minHeight = (Number(screenHeight) - 210) + 'px'
        }
      })
    },
    dateChange (time) {
      if (time) {
        let date = new Date(Date.parse(time))
        let Y = date.getFullYear()
        let M = date.getMonth() + 1
        let D = date.getDate()
        let H = date.getHours()
        let m = date.getMinutes()
        let s = date.getSeconds()
        return Y + '-' +
      (M > 9 ? M : ('0' + M)) + '-' +
      (D > 9 ? D : ('0' + D)) + ' ' +
      (H > 9 ? H : ('0' + H)) + ':' +
      (m > 9 ? m : ('0' + m)) + ':' +
      (s > 9 ? s : ('0' + s))
      }
    },
    getPageScroll (clickGroupListNum, listBottom) {
      this.listBottom = listBottom
      console.log(clickGroupListNum)
      if (this.isRefrshPage && clickGroupListNum < 1) {
        document.getElementById('app').scrollIntoView()
      } else {
        document.getElementById('position').scrollIntoView()
      }
    }
  },
  mounted () {
    this.fromHomeIndex = this.$route.params.index + 1
    this.listBottom = false
    this.setDivHeight(this.screenHeight)
    // Listen to the window size change
    window.onresize = () => {
      return (() => {
        this.screenHeight = document.body.clientHeight
        this.setDivHeight(this.screenHeight)
      })()
    }
  },
  beforeMount () {
    this.initAbilities()
    window.addEventListener('scroll', this.getTreeTop, true)
    window.onresize = () => {
      return (() => {
        this.getTreeTop()
      })()
    }
  },
  beforeRouteEnter (to, from, next) {
    // vm is an instance of vue, instead of this
    next(vm => {
      let fromHome = sessionStorage.getItem('fromHome')
      if (fromHome === 'home') {
        vm.isRefrshPage = false
      } else {
        vm.isRefrshPage = true
      }
      let isFromDoc = from.path.indexOf('mecDeveloper/api/mep/serviceDoc')
      let isFromApi = from.path.indexOf('mecDeveloper/api/mep/apiAmulator')
      if (isFromDoc !== -1 || isFromApi !== -1) {
        vm.selectIndex = Number(sessionStorage.getItem('capaSelectListIndex')) || 0
        vm.selectDetailIndex = Number(sessionStorage.getItem('capaSelectDetailIndex')) || 0
        vm.isFirstEnter = false
      }
    })
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.getTreeTop, true)
  }
}
</script>
<style lang='less'>
.capa_home{
  width: 100%;
  overflow-y: auto;
  top:80px;
  #capa_tit_div{
    position: relative;
  }
  .topLine{
    height: 430px;
    background: url("../../assets/images/capa_banner_bg.jpg") no-repeat center center;
    user-select: none;
    padding-top: 176px;
    position: relative;
    .title {
      width: 100%;
      text-align: center;
      height: 55px;
      line-height: 55px;
      color: #fff;
      font-size: 34px;
      letter-spacing: 45px;
      padding-left: 45px;
      .dots{
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #fff;
        margin-right: 40px;
        position: relative;
        top: -5px;
      }
      p {
        margin-left: 0px;
        margin-top: 20px;
        font-size: 30px;
        line-height: 30px;
      }
    }
    .title.tit_en{
      letter-spacing: 0;
      padding-left: 0;
      font-size: 32px;
      .dots{
        margin: 0 20px;
      }
    }
    #position{
      position: absolute;
      bottom: 80px;
    }
    @media screen and (max-width:1380px){
      .title{
        letter-spacing: 35px;
        .dots{
          margin-right: 30px;
        }
      }
    }
  }
  .capa_list_div{
    position: relative;
    min-height: 470px;
    .filter_div{
      position: absolute;
      top: -90px;
      right: 13%;
      z-index: 1998;
      .filter_default{
        background: #fdfcff;
        border-radius: 12px;
        padding: 10px 20px;
        font-size: 16px;
        color: #773fc1;
        letter-spacing: 2px;
        cursor: pointer;
        box-shadow: 0 6px 24px -9px rgba(40, 12, 128, 0.24);
        position: relative;
        z-index: 2;
        .filter_icon{
          position: relative;
          top: -2px;
          margin-left: 10px;
          transition: all 0.5s;
        }
        .filter_icon.filter_down{
          transform:rotate(180deg);
        }
      }
      .filter_default_en{
        letter-spacing: 0;
      }
      .down_div{
        border-radius: 12px;
        background: #fdfcff;
        box-shadow: 0 0 24px 0 rgba(40, 12, 128, 0.24);
        position: relative;
        z-index: 1;
        margin-top: 5px;
        .transition-box{
          height: 33px;
          line-height: 33px;
          text-align: center;
          font-size: 16px;
          color: #773fc1;
          letter-spacing: 2px;
          border-bottom: 1px solid #f0f0f0;
          cursor: pointer;
        }
        .transition-box:last-child{
          border-bottom: none;
        }
        .transition-box:hover{
          background: #ab87db;
          color: #fff;
          border-radius: 12px;
        }
      }
      .down_div_en{
        letter-spacing: 0;
      }
    }
    .list_left.scroll_top{
      position: fixed;
      bottom: 200px;
    }
    .list_left.list_bottom{
      position: absolute;
      top: auto;
      bottom: 200px;
    }
    .list_left.small_screen{
      position: fixed;
      bottom: 20px;
      display: flex;
      flex-direction: column;
      overflow: auto;
    }
    .list_left{
      width: 300px;
      position: relative;
    }
    .list_right.scroll_top{
      margin-left: 300px;
    }
    .list_right{
      width: calc(100% - 300px);
      padding-left: 110px;
      .button_more{
        float: left;
        width: 100%;
        text-align: center;
        margin: 30px 0 80px;
        .el-button{
          border-radius: 10px;
          font-size: 20px;
          color: #fff;
          padding: 8px 30px;
          height: 46px;
          line-height: 26px;
          position: relative;
        }
      }
    }
    @media screen and (max-width:1380px){
      .filter_div{
        right: 56px;
      }
    }
  }
  .panorama{
    background: #fff;
    .tit_panorama{
      display: block;
    }
    .title{
      font-size: 36px;
      color: #7a6e8a;
      margin-top: 110px;
      padding-left: 35px;
      .dots{
        float: left;
        width: 12px;
        height: 12px;
        background: #7a6e8a;
        border-radius: 50%;
        margin: 16px 10px 0 0;
      }
    }
  }
  .centerLine{
    padding: 45px 10px 50px;
  }
  .inner{
    margin: 0 auto;
    width: 100%;
    max-width: 1200px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    padding: 0 10px;
    .inner-hd{
      margin-bottom: 30px;
      .inner-hd-title{
        text-align: center;
        font-size: 24px;
        color:#000;
        font-weight: 400;
        line-height: 48px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-font-smoothing: antialiased
      }
    }
  }
  .bottomLine{
    height: 520px;
  }
}
</style>
