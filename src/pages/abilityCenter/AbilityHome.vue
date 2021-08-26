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
    <div class="capa_home">
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
            :capability-group-stats="capabilityGroupStats"
            :language="language"
            :is-refrsh-page="isRefrshPage"
            :capability-all-service="capabilityAllService"
            @getCapaServiceList="getCapaServiceList"
            ref="groupList"
            v-if="capabilityGroupStats.length>0"
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
// import abilityAPI from './ability.js'
import { Capability } from '../../tools/api.js'
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
      etsiIndex: 0,
      threeGppIndex: 1,
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
      capabilityGroupStats: [],
      capabilityServiceList: [],
      dialogVisible: false,
      groupLoading: true,
      serviceLoading: true,
      isFirstEnter: true,
      scrollTop: false,
      listBottom: false,
      hotFilter: 'hot',
      showNum: 12,
      fromHomeId: 'all',
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
        if (filter === 'hot' && this.hotFilter !== 'hot') {
          this.capabilityServiceList.sort(function (a, b) {
            return a.selectCount < b.selectCount ? 1 : -1
          })
        } else if (filter === 'new' && this.hotFilter !== 'new') {
          this.capabilityServiceList.sort(function (a, b) {
            return a.uploadTime < b.uploadTime ? 1 : -1
          })
        }
        this.hotFilter = filter
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
    initCapabilityGroupStats () {
      let totalCapabilityCount = 0
      Capability.getCapabilityGroupStats().then(result => {
        result.data.forEach(capabilityGroupStat => {
          let obj = {
            id: capabilityGroupStat.id,
            name: capabilityGroupStat.name,
            nameEn: capabilityGroupStat.nameEn,
            icon: this.getIcon(capabilityGroupStat.nameEn),
            iconSelect: this.getIconSelect(capabilityGroupStat.nameEn),
            counts: capabilityGroupStat.capabilityCount
          }
          totalCapabilityCount += obj.counts
          this.capabilityGroupStats.push(obj)
        })
      }).then(() => {
        let objfirst = {
          id: 'all',
          name: '所有',
          nameEn: 'All',
          icon: this.capabilityIconList[0].icon,
          iconSelect: this.capabilityIconList[0].iconSelect,
          counts: totalCapabilityCount
        }
        this.capabilityGroupStats.unshift(objfirst)
        this.groupLoading = false
        this.serviceLoading = false
        this.isFirstEnterPage()
        this.filterSefvice('hot')
      }).catch(() => {
        setTimeout(() => {
          this.groupLoading = false
          this.serviceLoading = false
        }, 2000)
      })
    },
    getIcon (nameEn) {
      if (nameEn === 'Platform services') {
        return this.capabilityIconList[1].icon
      } else if (nameEn === 'Telecom network') {
        return this.capabilityIconList[2].icon
      } else if (nameEn === 'Ascend AI') {
        return this.capabilityIconList[3].icon
      } else if (nameEn === 'AI capabilities') {
        return this.capabilityIconList[4].icon
      } else if (nameEn === 'Video processing') {
        return this.capabilityIconList[5].icon
      } else if (nameEn === 'DateBase') {
        return this.capabilityIconList[6].icon
      } else if (nameEn === 'Public framework') {
        return this.capabilityIconList[7].icon
      }
      return this.capabilityIconList[0].icon
    },
    getIconSelect (nameEn) {
      if (nameEn === 'Platform services') {
        return this.capabilityIconList[1].iconSelect
      }
      if (nameEn === 'Telecom network') {
        return this.capabilityIconList[2].iconSelect
      }
      if (nameEn === 'Ascend AI') {
        return this.capabilityIconList[3].iconSelect
      }
      if (nameEn === 'AI capabilities') {
        return this.capabilityIconList[4].iconSelect
      }
      if (nameEn === 'Video processing') {
        return this.capabilityIconList[5].iconSelect
      }
      if (nameEn === 'DateBase') {
        return this.capabilityIconList[6].iconSelect
      }
      if (nameEn === 'Public framework') {
        return this.capabilityIconList[7].iconSelect
      }
      return this.capabilityIconList[0].iconSelect
    },
    isFirstEnterPage () {
      if (!this.isFirstEnter) {
        this.$nextTick(() => {
          this.$refs.groupList.selectGroupList(this.capabilityGroupStats[this.selectIndex], this.selectIndex)
        })
        if (sessionStorage.getItem('capaSelectDetailIndex')) {
          this.$nextTick(() => {
            this.$refs.serviceList.viewServiceDetail(this.capabilityGroupStats[this.selectDetailIndex])
          })
        } else {
          this.dialogVisible = false
        }
      }
      if (this.fromHomeId) {
        this.$nextTick(() => {
          let capabilityGroupAndIndex = this.getCapabilityGroupAndIndexById(this.fromHomeId)
          this.$refs.groupList.selectGroupList(capabilityGroupAndIndex.capabilityGroup, capabilityGroupAndIndex.index)
        })
      } else {
        this.$nextTick(() => {
          this.$refs.groupList.selectGroupList(this.capabilityGroupStats[0], 0)
        })
      }
    },
    getCapabilityGroupAndIndexById (capabilityGroupId) {
      let index = 0
      for (let capabilityGroup of this.capabilityGroupStats) {
        if (capabilityGroup.id === capabilityGroupId) {
          return { 'capabilityGroup': capabilityGroup, 'index': index }
        }
        index = index + 1
      }
      return { 'capabilityGroup': this.capabilityGroupStats[0], 'index': index }
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
    getPageScroll (clickGroupListNum, listBottom) {
      this.listBottom = listBottom
      if (this.isRefrshPage && clickGroupListNum < 1) {
        document.getElementById('app').scrollIntoView()
      } else {
        document.getElementById('position').scrollIntoView()
      }
    }
  },
  mounted () {
    // this.fromHomeIndex = this.$route.params.index + 1
    this.fromHomeId = this.$route.params.id
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
    // this.initAbilities()
    this.initCapabilityGroupStats()
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
