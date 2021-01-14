<!--
  -  Copyright 2020 Huawei Technologies Co., Ltd.
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
      v-if="contentId === 'mep-NEW'"
      class="home"
    >
      <div class="topLine">
        <div class="title">
          <p>丰富的边缘能力随心选择 | 极致的5G体验触手可及</p>
        </div>
      </div>
      <div class="centerLine">
        <div class="inner">
          <div class="inner-hd">
            <h2 class="inner-hd-title">
              EdgeGallery服务全景图
            </h2>
          </div>
          <div class="inner-bd">
            <ability-portal
              :ability-line-no="1"
              :abilities="firstLineAbilities"
              @updateAbilityInstru="updateAbilityInstru"
            />
            <ability-instru
              :parent-tab-index="currentSelTabIndex"
              @showServiceDoc="showServiceDoc"
              @showAmulator="showAmulator"
            />
            <ability-portal
              :ability-line-no="2"
              :abilities="secondLineAbilities"
              @updateAbilityInstru="updateAbilityInstru"
              style="margin-top: 20px"
            />
          </div>
        </div>
      </div>
      <div class="bottomLine">
        <div class="inner">
          <div class="inner-hd">
            <h2 class="inner-hd-title">
              开发者实践专区
            </h2>
          </div>
          <div class="inner-bd">
            <practice-portal />
          </div>
        </div>
      </div>
    </div>
    <service-doc
      v-else-if="contentId === 'serviceDoc'"
      :group-id="groupId"
      @showAbilityHomePage="showAbilityHomePage"
    />
    <api-amulator
      v-else-if="contentId === 'apiAmulator'"
      :group-id="groupId"
      @showAbilityHomePage="showAbilityHomePage"
    />
  </div>
</template>

<script>
import AbilityInstru from './AbilityInstru.vue'
import AbilityPortal from './AbilityPortal.vue'
import ApiAmulator from './ApiAmulator.vue'
import PracticePortal from './PracticePortal.vue'
import ServiceDoc from './ServiceDoc.vue'
import abilityAPI from './ability.js'
import { Api } from '../../tools/api.js'

export default {
  components: {
    AbilityPortal,
    AbilityInstru,
    PracticePortal,
    ServiceDoc,
    ApiAmulator
  },
  data () {
    return {
      currentSelTabIndex: -1,
      contentId: 'mep-NEW', // 可取值 mep-NEW，serviceDoc，apiAmulator
      groupId: '',
      firstLineAbilities: [],
      secondLineAbilities: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    updateAbilityInstru (clickIndex) {
      this.currentSelTabIndex = clickIndex
      // 更新active的对象
    },
    showAbilityHomePage () {
      this.contentId = 'mep-NEW'
      this.groupId = ''
    },
    showServiceDoc (groupId) {
      this.contentId = 'serviceDoc'
      this.groupId = groupId
    },
    showAmulator (groupId) {
      this.contentId = 'apiAmulator'
      this.groupId = groupId
    },
    initAbilities () {
      Api.getCapabilityGroupsApi()
        .then(res => {
          let groupDataFromServer = res.data
          let allAbilitys = abilityAPI.initAbilities(groupDataFromServer, 'cn')
          this.firstLineAbilities = allAbilitys.slice(0, 5)
          this.secondLineAbilities = allAbilitys.slice(5, 10)
          this.currentSelTabIndex = 0
        })
    }
  },
  created () {
  },
  mounted () {
  },
  beforeCreate () {},
  beforeMount () {
    this.initAbilities()
  },
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
  activated () {}
}
</script>
<style lang='less' scoped>
.home{
  position: absolute;
  width: 100%;
  left: 0;
  height: calc(100% - 65px);
  overflow-y: auto;
  top:65px;
  .topLine{
    height: 300px;
    background: url("../../assets/images/banner.png") no-repeat center center #222a3f;
    user-select: none;
    .title {
      color: #fff;
      padding: 65px 0 0 200px;
      p {
        margin-left: 0px;
        margin-top: 20px;
        font-size: 30px;
        line-height: 30px;
      }
    }
  }
  .centerLine{
    padding: 45px 10px 50px;
    background-color: #fff;
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
    background: #FFF;
    padding: 0px 10px 50px;
  }
}
</style>
