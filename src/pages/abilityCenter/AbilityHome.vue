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
      class="home"
    >
      <div class="topLine">
        <div class="title">
          <p>{{ $t('api.capabilitieTitle') }}</p>
        </div>
      </div>
      <div class="centerLine">
        <div class="inner">
          <div class="inner-hd">
            <h2 class="inner-hd-title">
              {{ $t('api.capabilitieOneTip') }}
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
      <div class="centerLine">
        <div class="inner">
          <div class="inner-hd">
            <h2 class="inner-hd-title">
              {{ $t('api.telecomStandardCapabilitieTitle') }}
            </h2>
          </div>
          <div class="inner-bd">
            <ability-portal
              :is-telecom-ability-portals="true"
              :abilities="telecomStandardAbilities"
              @updateAbilityInstru="updateTelecomStandardPanorama"
            />
            <ability-brain-map :parent-tab-index="telecomCurrentSelTabIndex" />
          </div>
        </div>
      </div>
      <div class="bottomLine">
        <div class="inner">
          <div class="inner-hd">
            <h2 class="inner-hd-title">
              {{ $t('api.capabilitieTwoTip') }}
            </h2>
          </div>
          <div class="inner-bd">
            <practice-portal />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AbilityInstru from './AbilityInstru.vue'
import AbilityPortal from './AbilityPortal.vue'
import PracticePortal from './PracticePortal.vue'
import abilityAPI from './ability.js'
import { Api } from '../../tools/api.js'
import AbilityBrainMap from './AbilityBrainMap.vue'

export default {
  components: {
    AbilityPortal,
    AbilityInstru,
    PracticePortal,
    AbilityBrainMap
  },
  data () {
    return {
      currentSelTabIndex: -1,
      groupId: '',
      firstLineAbilities: [],
      secondLineAbilities: [],
      telecomStandardAbilities: [{
        labelEn: 'ETSI',
        label: 'ETSI',
        index: 0
      }, {
        labelEn: '3GPP',
        label: '3GPP',
        index: 1
      }],
      telecomCurrentSelTabIndex: -1
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 更新全景图
    updateTelecomStandardPanorama (clickIndex) {
      this.telecomCurrentSelTabIndex = clickIndex
    },
    updateAbilityInstru (clickIndex) {
      this.currentSelTabIndex = clickIndex
      // 更新active的对象
    },
    initAbilities () {
      Api.getCapabilityGroupsApi()
        .then(res => {
          let groupDataFromServer = res.data
          let allAbilitys = abilityAPI.initAbilities(groupDataFromServer, this.$i18n.locale)
          this.firstLineAbilities = allAbilitys.slice(0, 5)
          this.secondLineAbilities = allAbilitys.slice(5, 10)
          this.currentSelTabIndex = 0
          this.telecomCurrentSelTabIndex = 0
        })
    }
  },
  beforeMount () {
    this.initAbilities()
  }
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
