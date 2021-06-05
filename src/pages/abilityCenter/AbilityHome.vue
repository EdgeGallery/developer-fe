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
      </div>
      <div class="capa_tit_div padding_default">
        <div class="title_top title_left clear">
          <img
            src="../../assets/images/home_tit_capability.png"
            alt=""
          >
        </div>
      </div>
      <!-- 能力列表 -->
      <div class="capa_list_div padding_default clear">
        <div class="filter_div">
          <p
            class="filter_default"
            @click="filterDropDown"
          >
            {{ hotFilter?'最受欢迎':'最新更新' }}
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
            >
              <div
                class="transition-box"
                @click="filterSefvice('hot')"
              >
                最受欢迎
              </div>
              <div
                class="transition-box"
                @click="filterSefvice('new')"
              >
                最新更新
              </div>
            </div>
          </el-collapse-transition>
        </div>
        <!-- 左侧菜单 -->
        <div
          class="list_left lt"
          v-loading="groupLoading"
          ref="meptree"
          :class="{'scroll_top':scrollTop,'list_bottom':listBottom}"
        >
          <ul>
            <li
              v-for="(item,index) in capabilityGroupsList"
              :key="index"
              @click="selectGroupList(item,index)"
              @mouseenter="activeIndex=index"
              @mouseleave="activeIndex=-1"
              :class="{'select':selectIndex===index}"
            >
              <img
                :src="item.icon"
                alt=""
                v-if="selectIndex!==index && activeIndex!==index"
              >
              <img
                :src="item.iconSelect"
                alt=""
                v-if="selectIndex===index || activeIndex===index"
              >
              <span class="icon" />
              {{ item.name }}
              <span
                class="counts"
                :class="{'select':activeIndex===index}"
              >{{ item.counts }}</span>
            </li>
            <!-- <div class="select_style" /> -->
          </ul>
        </div>
        <!-- 右侧列表 -->
        <div
          class="list_right clear rt"
          v-loading="serviceLoading"
          :class="{'scroll_top':scrollTop}"
        >
          <div
            v-for="(item,index) in capabilityServiceList"
            :key="index"
            class="service_list"
            @mouseenter="hoverServiceList(index)"
            @mouseleave="activeInfo=-1"
            @click="viewServiceDetail(item,index)"
          >
            <img
              :src="getImageUrl(item.iconFileId)"
              alt=""
            >
            <div
              class="service_info"
              :class="{'service_hover':activeInfo===index}"
            >
              <p class="tit">
                {{ language==='cn'?item.twoLevelName:item.twoLevelNameEn }}
                <span
                  class="detail"
                  :class="{'show':activeInfo===index}"
                >
                  详情
                </span>
              </p>
              <p
                class="desc"
                :class="{'all':activeInfo===index}"
              >
                {{ language==='cn'?item.description:item.descriptionEn }}
              </p>
            </div>
          </div>
          <p class="button_more">
            <el-button>显示更多</el-button>
          </p>
        </div>
      </div>
      <!-- 服务详情弹框 -->
      <el-dialog
        :visible.sync="dialogVisible"
        :before-close="handleClose"
        :close-on-click-modal="false"
        v-for="(item,index) in serviceDetail"
        :key="index"
      >
        <div
          class="service_detail"
        >
          <p class="title">
            {{ language==='cn'?item.twoLevelName:item.twoLevelNameEn }}
          </p>
          <div class="user_div clear">
            <img
              src="../../assets/images/capa_service_user.jpg"
              alt=""
            >
            <p class="user_info">
              作者: {{ item.author }}
            </p>
            <p>发布时间: {{ item.uploadTime }}</p>
          </div>
          <div class="service_div clear">
            <img
              :src="getImageUrl(item.iconFileId)"
              class="pic"
              alt=""
            >
            <div class="service_right rt">
              <div>
                <p class="service_desc">
                  简介:
                </p>
                <p class="service_desc">
                  {{ language==='cn'?item.description:item.descriptionEn }}
                </p>
              </div>
              <div>
                <p class="service_level clear">
                  <span class="lt">所属分区</span>
                  <span class="level_right rt">{{ language==='cn'?item.oneLevelName:item.oneLevelNameEn }}</span>
                </p>
                <p class="service_level clear">
                  <img
                    src="../../assets/images/capa_service_detail_tag.png"
                    alt=""
                    class="icon lt"
                  >
                  <span class="lt">标签</span>
                  <span class="tag rt">{{ item.type }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="service_footer">
          <el-button @click="serviceDocClick(item)">
            服务文档
          </el-button>
          <el-button @click="amulatorClick(item)">
            在线模拟器
          </el-button>
          <el-button
            v-if="toOnline"
            @click="toOnlineExperience(item)"
          >
            在线体验
            <img
              src="../../assets/images/capa_service_detail_hot.png"
              alt=""
              class="button_hot"
            >
          </el-button>
        </div>
      </el-dialog>

      <!-- 电信标准支持全景图 -->
      <div
        class="panorama padding_default"
        id="panorama"
      >
        <img
          src="../../assets/images/capa_tit_panorama.png"
          alt=""
          class="tit_panorama title_left title_top"
        >
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
import { Api, Workspace } from '../../tools/api.js'
import AbilityBrainMap from './AbilityBrainMap.vue'

export default {
  components: {
    AbilityBrainMap
  },
  data () {
    return {
      userId: sessionStorage.getItem('userId'),
      language: localStorage.getItem('language'),
      groupId: '',
      telecomStandardAbilities: [{
        labelEn: 'ETSI',
        label: 'ETSI',
        index: 0
      }, {
        labelEn: '3GPP',
        label: '3GPP',
        index: 1
      }],
      etsiIndex: -1,
      threeGppIndex: -1,
      showFilter: false,
      dropDown: false,
      activeIndex: 0,
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
      capabilityGroupsList: [],
      capabilityAllService: [],
      capabilityServiceList: [],
      activeInfo: -1,
      dialogVisible: false,
      groupLoading: false,
      serviceLoading: false,
      serviceDetail: [],
      toOnline: false,
      isFirstEnter: true,
      scrollTop: false,
      listBottom: false,
      hotFilter: true
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  },
  methods: {
    filterDropDown () {
      this.showFilter = !this.showFilter
      this.dropDown = !this.dropDown
    },
    filterSefvice (filter) {
      this.capabilityServiceList.forEach(itemService => {
        itemService.uploadTime = itemService.uploadTime.substring(0, 10)
      })
      let length = this.capabilityServiceList.length
      if (length > 0) {
        if (filter === 'hot') {
          this.hotFilter = true
          this.capabilityServiceList.sort(function (a, b) {
            return a.selectCount < b.selectCount ? 1 : -1
          })
        } else if (filter === 'new') {
          this.hotFilter = false
          this.capabilityServiceList.sort(function (a, b) {
            return a.uploadTime < b.uploadTime ? 1 : -1
          })
        }
      }
      this.showFilter = false
      this.dropDown = false
    },
    selectGroupList (item, index) {
      sessionStorage.setItem('capaSelectListIndex', index)
      this.selectIndex = index
      this.capabilityServiceList = []
      if (index === 0) {
        this.capabilityServiceList = this.capabilityAllService
      } else {
        this.capabilityAllService.forEach(itemService => {
          if (item.name === itemService.oneLevelName) {
            this.capabilityServiceList.push(itemService)
          }
        })
      }
      this.filterSefvice('hot')
    },
    hoverServiceList (index) {
      this.activeInfo = index
    },
    // 获取插件图标
    getImageUrl (iconFileId) {
      return Workspace.getIconApi(iconFileId, this.userId)
    },
    viewServiceDetail (item, index) {
      sessionStorage.setItem('capaSelectDetailIndex', index)
      this.dialogVisible = true
      this.serviceDetail = []
      this.serviceDetail.push(item)
      if (item.twoLevelNameEn === 'Location service' || item.twoLevelNameEn === 'AI Image Repair' || item.twoLevelNameEn === 'Edge Detection' || item.twoLevelNameEn === 'Image Cartoonization' || item.twoLevelNameEn === 'Image Coloring' || item.twoLevelNameEn === 'Object Classification' || item.twoLevelNameEn === 'Object Detection') {
        this.toOnline = true
      } else {
        this.toOnline = false
      }
    },
    // 获取左侧一级能力列表
    initAbilities () {
      Api.getCapabilityGroupsApi().then(res => {
        this.capabilityGroupsList = []
        this.etsiIndex = 0
        this.threeGppIndex = 1
        let oneLevelNameEn = []
        let oneLevelNameCn = []
        let groupData = res.data
        this.capabilityAllService = res.data
        this.capabilityServiceList = res.data
        this.filterSefvice('hot')
        this.serviceLoading = false
        let objTemp = {}
        groupData.forEach(item => {
          oneLevelNameEn.push(item.oneLevelNameEn)
          oneLevelNameCn.push(item.oneLevelName)
          if (objTemp[item.oneLevelName]) {
            objTemp[item.oneLevelName]++
          } else {
            objTemp[item.oneLevelName] = 1
          }
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
          if (this.language === 'cn') {
            if (oneLevelNameCn[i] === '平台基础服务') {
              obj.icon = this.capabilityIconList[1].icon
              obj.iconSelect = this.capabilityIconList[1].iconSelect
            } else if (oneLevelNameCn[i] === '电信网络能力') {
              obj.icon = this.capabilityIconList[2].icon
              obj.iconSelect = this.capabilityIconList[2].iconSelect
            } else if (oneLevelNameCn[i] === '昇腾AI能力') {
              obj.icon = this.capabilityIconList[3].icon
              obj.iconSelect = this.capabilityIconList[3].iconSelect
            } else if (oneLevelNameCn[i] === 'AI能力') {
              obj.icon = this.capabilityIconList[4].icon
              obj.iconSelect = this.capabilityIconList[4].iconSelect
            } else if (oneLevelNameCn[i] === '视频处理') {
              obj.icon = this.capabilityIconList[5].icon
              obj.iconSelect = this.capabilityIconList[5].iconSelect
            } else if (oneLevelNameCn[i] === '数据库') {
              obj.icon = this.capabilityIconList[6].icon
              obj.iconSelect = this.capabilityIconList[6].iconSelect
            } else if (oneLevelNameCn[i] === '公共框架') {
              obj.icon = this.capabilityIconList[7].icon
              obj.iconSelect = this.capabilityIconList[7].iconSelect
            } else if (oneLevelNameCn[i] === '3GPP') {
              obj.icon = this.capabilityIconList[7].icon
              obj.iconSelect = this.capabilityIconList[7].iconSelect
            } else if (oneLevelNameCn[i] === 'ETSI') {
              obj.icon = this.capabilityIconList[6].icon
              obj.iconSelect = this.capabilityIconList[6].iconSelect
            } else {
              obj.icon = this.capabilityIconList[0].icon
              obj.iconSelect = this.capabilityIconList[0].iconSelect
            }
            obj.name = oneLevelNameCn[i]
            obj.nameEn = oneLevelNameEn[i]
            this.capabilityGroupsList.push(obj)
          }
        }
        let objfirst = {
          name: '所有',
          nameEn: 'All',
          icon: this.capabilityIconList[0].icon,
          iconSelect: this.capabilityIconList[0].iconSelect,
          counts: this.capabilityAllService.length
        }
        this.capabilityGroupsList.unshift(objfirst)
        if (!this.isFirstEnter) {
          this.selectGroupList(this.capabilityGroupsList[this.selectIndex], this.selectIndex)
          if (sessionStorage.getItem('capaSelectDetailIndex')) {
            this.viewServiceDetail(this.capabilityServiceList[this.selectDetailIndex])
          } else {
            this.dialogVisible = false
          }
        }
      }).catch(() => {
        setTimeout(() => {
          this.groupLoading = false
          this.serviceLoading = false
        }, 2000)
      })
    },
    serviceDocClick (item) {
      this.$router.push({ name: 'serviceDoc', query: { groupId: item.groupId, language: this.$i18n.locale } })
    },
    amulatorClick (item) {
      this.$router.push({ name: 'apiAmulator', query: { groupId: item.groupId, language: this.$i18n.locale } })
    },
    toOnlineExperience (item) {
      Api.getServiceListApi(item.id).then(res => {
        let capabilityDetail = res.data.capabilityDetailList[0]
        if (capabilityDetail.host) {
          let onLineUrl = capabilityDetail.protocol + '://' + capabilityDetail.host + ':' + capabilityDetail.port + '/#/' + item.twoLevelNameEn.replace(/\s*/g, '')
          window.open(onLineUrl, '_blank')
        } else {
          this.$message.warning(this.$t('api.onlineService'))
        }
      })
    },
    handleClose () {
      this.dialogVisible = false
    },
    // 获取树状导航距离顶部高度
    getTreeTop () {
      let treeTop = this.$refs.meptree.getBoundingClientRect().top
      if (treeTop <= 120) {
        this.scrollTop = true
      } else {
        this.scrollTop = false
      }
      const elOffsetTop = document.getElementById('panorama').offsetTop
      const docScrollTop = document.documentElement.scrollTop
      if (elOffsetTop >= docScrollTop && elOffsetTop < (docScrollTop + window.innerHeight)) {
        this.listBottom = true
      } else {
        this.listBottom = false
      }
    }
  },
  beforeMount () {
    this.initAbilities()
    /* window.addEventListener('scroll', this.getTreeTop, true)
    window.onresize = () => {
      return (() => {
        this.getTreeTop()
      })()
    } */
  },
  beforeRouteEnter (to, from, next) {
    next(vm => { // vm为vue的实例,代替this
      let isFromDoc = from.path.indexOf('mecDeveloper/api/mep/serviceDoc')
      let isFromApi = from.path.indexOf('mecDeveloper/api/mep/apiAmulator')
      if (isFromDoc !== -1 || isFromApi !== -1) {
        vm.selectIndex = Number(sessionStorage.getItem('capaSelectListIndex')) || 0
        vm.selectDetailIndex = Number(sessionStorage.getItem('capaSelectDetailIndex')) || 0
        vm.isFirstEnter = false
      }
    })
  }
  /* beforeDestroy () {
    window.removeEventListener('scroll', this.getTreeTop, true)
  } */
}
</script>
<style lang='less'>
.capa_home{
  width: 100%;
  overflow-y: auto;
  top:80px;
  .el-dialog{
    width: 40%;
    min-width: 910px;
    background: #efefef;
    border-radius: 15px;
    .el-dialog__header{
      border-radius: 15px;
      background: #efefef !important;
    }
    .el-icon-close:before{
      font-size: 32px;
      color: #787878 !important;
    }
    .el-dialog__body{
      padding: 10px 0 0 !important;
    }
    .service_footer{
      border-top: 1px solid #7a6e8a;
      padding: 35px 0;
      margin-top: 45px;
      text-align: center;
      .el-button{
        font-size: 18px;
        color: #7a6e8a;
        height: 50px;
        line-height: 34px;
        border: 1px solid #7a6e8a;
        border-radius: 25px;
        padding: 8px 45px;
        background: transparent;
        position: relative;
      }
      .el-button + .el-button {
        margin-left: 25px;
      }
      .button_hot{
        position: absolute;
        right: 0;
        top: 0;
      }
      .el-button:hover{
        background: #fff;
        color: #380879;
        border: 1px solid #fff;
      }
    }
  }
  @media screen and (max-width:1290px){
    .el-dialog{
      width: 60%;
    }
  }
  .service_detail{
    padding: 0 90px;
    .title{
      font-size: 25px;
      color: #380879;
    }
    .user_div{
      margin: 35px 0;
      img{
        float: left;
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
      p{
        float: right;
        width: calc(100% - 60px);
        font-size: 15px;
        color: #7a6e8a;
        height: 25px;
        line-height: 25px;
        padding-left: 15px;
      }
      p.user_info{
        margin-top: 5px;
      }
    }
    .service_div{
      position: relative;
      .pic{
        float: left;
        // width: 55%;
        // max-width: 432px;
        width: 432px;
        height: 252px;
      }
      .service_right{
        width: calc(100% - 432px);
        height: 252px;
        padding-left: 45px;
        font-size: 14px;
        color: #7a6e8a;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .service_desc{
          line-height: 22px;
        }
        .service_level{
          border-top: 1px solid #bdbec0;
          min-height: 50px;
          line-height: 20px;
          padding: 15px 0;
          .icon{
            margin-right: 10px;
          }
          .level_right{
            width: 60%;
            text-align: right;
          }
          .tag{
            font-size: 12px;
            background: #e1dde6;
            border-radius: 10px;
            padding: 3px 6px;
          }
        }
      }
    }
  }
  .topLine{
    height: 430px;
    background: url("../../assets/images/capa_banner_bg.jpg") no-repeat center center;
    user-select: none;
    padding-top: 176px;
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
    @media screen and (max-width:1380px){
      .title{
        letter-spacing: 35px;
        .dots{
          margin-right: 30px;
        }
      }
    }
  }
  .capa_tit_div{
    background: url(/img/home_left_bg.03ff33ec.png) left 85px no-repeat;
    padding-bottom: 107px;
  }
  .capa_list_div{
    position: relative;
    .filter_div{
      position: absolute;
      top: -90px;
      right: 10%;
      z-index: 2000;
      .filter_default{
        background: #fdfcff;
        border-radius: 12px;
        padding: 10px 20px;
        font-size: 16px;
        color: #773fc1;
        // font-weight: bold;
        letter-spacing: 2px;
        cursor: pointer;
        box-shadow: 0 0 24px 0 rgba(40, 12, 128, 0.24);
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
          background: #fff;
          border-radius: 12px;
        }
      }
    }
    .list_left.scroll_top{
      position: fixed;
      top: 120px;
    }
    .list_left.list_bottom{
      position: absolute;
      top: auto;
      bottom: 130px;
    }
    .list_left{
      width: 320px;
      position: relative;
      background: #f1f2f6;
      li{
        height: 48px;
        line-height: 48px;
        padding: 0 15px;
        font-size: 21px;
        color: #7a6e8a;
        cursor: pointer;
        margin-bottom: 10px;
        position: relative;
        z-index: 2;
        img{
          float: left;
          margin: 12px 15px 0 0;
        }
        .counts{
          float: right;
          font-size: 14px;
          color: #7a6e8a;
        }
        .counts.select{
          color: #380879;
        }
      }
      li.select{
        background: #fdfcff;
        border-radius: 8px;
        color: #380879;
        box-shadow: 0 0 24px 0 rgba(40, 12, 128, 0.24);
        .counts{
          color: #380879;
        }
      }
      li:hover{
        background: #fdfcff;
        border-radius: 8px;
        color: #380879;
        box-shadow: 0 0 24px 0 rgba(40, 12, 128, 0.24);
      }
      /* .select_style{
        width: 100%;
        height: 48px;
        z-index: 1;
        position: absolute;
        top: 0;
        left: 0;
        transition: all 0.5s ease;
        background: #fdfcff;
        border-radius: 8px;
        color: #380879;
        box-shadow: 0 0 24px 0 rgba(40, 12, 128, 0.24);
      } */
      /* li:nth-of-type(1):hover .select_style{
        top: 0;
      }
      li:nth-of-type(2):hover .select_style{
        top: 58px;
      } */
    }
    .list_right.scroll_top{
      margin-left: 320px;
    }
    .list_right{
      width: calc(100% - 320px);
      padding-left: 110px;
      // display: flex;
      // flex-wrap: wrap;
      // justify-content: space-between;
      .service_list{
        float: left;
        width: 31%;
        margin: 0 0 3% 2%;
        padding-bottom: 82px;
        border-radius: 12px;
        position: relative;
        cursor: pointer;
        img{
          width: 100%;
          display: block;
          border-radius: 12px 12px 0 0;
        }
        .service_info{
          background: #fff;
          border-radius: 12px;
          position: absolute;
          width: 100%;
          bottom: 0px;
          right: 0;
          z-index: 2;
          padding: 20px;
          color: #535353;
          .tit{
            font-size: 19px;
            margin-bottom: 10px;
            .detail{
              float: right;
              font-size: 14px;
              color: #380879;
              padding: 0 10px;
              border: 1px solid #380879;
              border-radius: 15px;
              position: relative;
              top: -1px;
              opacity: 0;
              // transition: opacity 0.4s linear;
              transition: all 0.3s ease-in-out;
            }
            .detail.show{
              opacity: 1;
              transition: all 0.4s ease-in-out 0.5s;
            }
          }
          .desc{
            font-size: 14px;
            width: 100%;
            max-height: 20px;
            // height: 20px;
            line-height: 20px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            // transition: all 0.6s ease-in-out 0.3s;
            transition: all 0.6s ease-in-out;
          }
          .desc.all{
            max-height: 80px;
            // height: 40px;
            white-space: normal;
            transition: all 0.6s ease-in-out;
          }
        }
      }
      .service_list:hover{
        box-shadow: 0 0 20px 0 rgba(56, 8, 121, 0.14);
      }
      @media screen and (max-width:1450px){
        .service_list{
          width: 48%;
        }
      }
      .button_more{
        float: left;
        width: 100%;
        text-align: center;
        margin: 30px 0 50px;
        .el-button{
          background: transparent;
          border: 1px solid #7a6e8a;
          border-radius: 10px;
          font-size: 26px;
          color: #7a6e8a;
          padding: 8px 30px;
          height: 60px;
          line-height: 44px;
        }
        .el-button:hover{
          background: #fff;
          border: 1px solid #fff;
          color: #380879;
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
    padding-bottom: 90px;
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
    // background-color: #fff;
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
    // background: #FFF;
    height: 520px;
  }
}
</style>
