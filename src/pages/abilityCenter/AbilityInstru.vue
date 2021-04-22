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
  <div class="instru-container list-4">
    <div class="instru-arrows-wrap">
      <em
        class="instru-arrows"
        :class="uperArrowStyle"
      />
    </div>
    <div class="instru-container-inner">
      <div
        class="instru"
        v-for="item in instru"
        :key="item.id"
      >
        <span class="instru-title">
          {{ item.appName }}
        </span>
        <p class="instru-desc">
          {{ item.appInstru }}
        </p>
        <div class="instru-link">
          <span
            class="doc-link"
            @click="serviceDocClick"
            :id="item.id"
          >
            {{ $t('api.serviceDoc') }}
          </span>
          <span
            class="mulator-link"
            @click="amulatorClick(item)"
            :id="item.id"
          >
            {{ $t('api.onlineEmulator') }}
          </span>
          <span
            class="exp-link"
            v-if="item.appNameEn === 'Location service' || item.appNameEn === 'AI Image Repair' || item.appNameEn === 'Edge Detection' || item.appNameEn === 'Image Cartoonization' || item.appNameEn === 'Image Coloring' || item.appNameEn === 'Object Classification' || item.appNameEn === 'Object Detection'"
            @click="toOnlineExperience(item)"
            :id="item.id"
          >
            {{ $t('api.onlineExperience') }}
            <span class="exp-icon" />
          </span>
        </div>
      </div>
    </div>
    <div class="instru-arrows-wrap">
      <em
        class="instru-arrows down"
        :class="belowArrowStyle"
      />
    </div>
  </div>
</template>

<script>
import ability from './ability'
import { Api } from '../../tools/api.js'
export default {
  components: {},
  props: {
    parentTabIndex: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      onLineUrl: '',
      hasService: true
    }
  },
  computed: {
    instru () {
      return this.getInstru(this.parentTabIndex)
    },
    uperArrowStyle: function () {
      return {
        first: this.parentTabIndex === 0,
        second: this.parentTabIndex === 1,
        third: this.parentTabIndex === 2,
        fourth: this.parentTabIndex === 3,
        fifth: this.parentTabIndex === 4,
        isShow: this.parentTabIndex <= 4,
        noShow: this.parentTabIndex > 4
      }
    },
    belowArrowStyle: function () {
      return {
        first: (this.parentTabIndex) % 5 === 0,
        second: (this.parentTabIndex) % 5 === 1,
        third: (this.parentTabIndex) % 5 === 2,
        fourth: (this.parentTabIndex) % 5 === 3,
        fifth: (this.parentTabIndex) % 5 === 4,
        isShow: this.parentTabIndex > 4,
        noShow: this.parentTabIndex <= 4
      }
    }
  },
  watch: {
  },
  methods: {
    getInstru (selIndex) {
      let subAbility = ability.getSecondLevelAbilitys(selIndex)
      let temp = []
      for (let item of subAbility) {
        temp.push({
          id: item.groupId,
          appName: this.$i18n.locale === 'en' ? item.labelEn : item.label,
          appNameKey: item.key,
          appNameEn: item.labelEn,
          appInstru: this.$i18n.locale === 'en' ? item.descriptionEn : item.description,
          docRouterIndex: '',
          apiRouterIndex: ''
        })
      }
      return temp
    },
    serviceDocClick (event) {
      this.$router.push({ name: 'serviceDoc', query: { groupId: event.currentTarget.id, language: this.$i18n.locale } })
    },
    amulatorClick (item) {
      this.$router.push({ name: 'apiAmulator', query: { groupId: item.id, language: this.$i18n.locale } })
    },
    toOnlineExperience (item) {
      Api.getServiceListApi(item.id).then(res => {
        let capabilityDetail = res.data.capabilityDetailList[0]
        if (capabilityDetail.host) {
          this.onLineUrl = capabilityDetail.protocol + '://' + capabilityDetail.host + ':' + capabilityDetail.port
          this.hasService = true
        } else {
          this.hasService = false
        }
        if (this.hasService) {
          let routeUrl = this.onLineUrl + '/#/' + item.appNameEn.replace(/\s*/g, '')
          window.open(routeUrl, '_blank')
        } else {
          this.$message.warning(this.$t('api.onlineService'))
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
.first {
  left: calc(10%)!important;
}
.second {
  left: calc(30%)!important;
}
.third {
  left: calc(50%)!important;
}
.fourth {
  left: calc(70%)!important;
}
.fifth {
  left: calc(90%)!important;
}
.isShow{
  display: block;
}
.noShow{
  display:none;
}
.instru-container {
  margin-top: 20px;
  background: #f5f7fa;
  border: 1px solid #e5e8ed;
  box-shadow: 0 2px 4px 0 rgba(3, 27, 78, 0.06);
  box-sizing: border-box;
}
.instru-arrows-wrap {
  position: relative;
  z-index: 5;
}
.instru-container-inner {
  margin: -1px -2px -1px -1px;
  font-size: 0;
}
.instru.active,
.instru:hover {
  background: #fff;
  border: 1px solid #e5e8ed;
  box-shadow: 0 2px 8px 0 rgba(3, 27, 78, 0.12);
}
.instru-link{
  float: right;
  font-size: 14px;
  .doc-link{
    border-right: 1px solid #ddd;
    padding-right: 5px;
    color: #00a4ff;
    cursor: pointer;
  }
  .mulator-link{
    padding-left: 5px;
    color: #00a4ff;
    cursor: pointer;
  }
  .exp-link{
    padding-left: 5px;
    color: #f30a0a;
    cursor: pointer;
    border-left: 1px solid #ddd;
  }
  .exp-icon{
    display: inline-block;
    position: relative;
    top: -4px;
    right: 7px;
    height: 21px;
    width: 18px;
    background: url('../../assets/images/hot.png') center no-repeat;
    background-size: contain;
  }
}
@media screen and (min-width: 769px) {
  .instru-arrows {
    position: absolute;
    width: 24px;
    height: 16px;
    left: 100px;
    top: -16px;
    background-image: url(https://imgcache.qq.com/open_proj/proj_qcloud_v2/platform/special/ai-platform/css/sprite/ai-platform-media29-20209221151.png);
    background-size: cover;
    background-position: 0px 0px;
  }
  .down {
    transform: rotateX(180deg);
    top: 0px;
  }
  .instru-container.list-4 .instru {
    width: 25%;
  }
  .instru {
    display: inline-block;
    vertical-align: top;
    border: 1px solid transparent;
    padding: 20px;
    box-sizing: border-box;
  }
  .instru-title {
    font-size: 16px;
    color: #000;
    line-height: 26px;
    font-weight: 400;
  }
  .instru-desc {
    font-size: 14px;
    color: #999;
    line-height: 24px;
    margin-top: 8px;
  }
}
</style>
