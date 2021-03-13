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
  <div class="ability-switch-tabs">
    <a
      class="ability-switch-tab"
      v-for="item in abilityItems"
      :key="item.index"
      :id="item.index"
      @click="handleClick"
      :class="{ 'active': activeIndex === item.index, 'widthWithFiveItems': !isTelecomAbilityPortals, 'widthWightTwoItems': isTelecomAbilityPortals, 'tabPadding30': tabPadding30((item.abilityRealName)), 'tabPadding14': tabPadding14((item.abilityRealName))}"
    ><em
      class="ability-switch-tab-icon"
      :style="{ height: imageHeight(item.abilityRealName) + 'px', width: imageWidth(item.abilityRealName) + 'px' }"
    ><img
      :src="item.abilityIconSrc"
      :style="{ height: imageHeight(item.abilityRealName) + 'px', width: imageWidth(item.abilityRealName) + 'px' }"
      alt=""
    ></em><span class="ability-switch-tab-title">{{ item.abilityName }}</span>
    </a>
  </div>
</template>

<script>
export default {
  name: 'AbilityPortal',
  components: {},
  props: {
    isTelecomAbilityPortals: {
      type: Boolean,
      default: false
    },
    abilityLineNo: {
      type: Number,
      default: 1
    },
    abilities: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      activeIndex: 0
    }
  },
  computed: {
    abilityItems () {
      return this.getAbilitys(0)
    },
    imageWidth (abilityRealName) {
      if (abilityRealName.indexOf('Ascend') > -1 || abilityRealName.indexOf('昇腾AI能力') > -1) {
        return 90
      } else {
        return abilityRealName.indexOf('ETSI') > -1 || abilityRealName.indexOf('3GPP') > -1 ? 64 : 32
      }
    },
    imageHeight (abilityRealName) {
      if (abilityRealName.indexOf('Ascend') > -1 || abilityRealName.indexOf('昇腾AI能力') > -1) {
        return 64
      } else {
        return abilityRealName.indexOf('ETSI') > -1 || abilityRealName.indexOf('3GPP') > -1 ? 64 : 32
      }
    },
    tabPadding30 () {
      return function (abilityRealName) {
        return !(abilityRealName.indexOf('ETSI') > -1 || abilityRealName.indexOf('3GPP') > -1 || abilityRealName.indexOf('Ascend') > -1 || abilityRealName.indexOf('昇腾AI能力') > -1)
      }
    },
    tabPadding14 () {
      return function (abilityRealName) {
        return abilityRealName.indexOf('ETSI') > -1 || abilityRealName.indexOf('3GPP') > -1 || abilityRealName.indexOf('Ascend' || abilityRealName.indexOf('昇腾AI能力') > -1) > -1
      }
    }
  },
  watch: {
  },
  methods: {
    handleClick (ele) {
      this.$emit('updateAbilityInstru', parseInt(ele.currentTarget.id))
      this.activeIndex = parseInt(ele.currentTarget.id)
    },
    getAbilitys (selId) {
      const abilityIcons = {
        'Platform-basic-services': 'https://img.icons8.com/windows/32/4a90e2/foundation.png',
        'Telecom-network-capabilities': 'https://img.icons8.com/windows/32/4a90e2/network.png',
        'AI-capabilities': 'https://img.icons8.com/windows/32/4a90e2/artificial-intelligence.png',
        'Video-processing': 'https://img.icons8.com/windows/32/4a90e2/video-editing.png',
        'DateBase': 'https://img.icons8.com/windows/32/4a90e2/database.png',
        'Public-framework': 'https://img.icons8.com/windows/32/4a90e2/product-architecture.png',
        'ETSI': 'https://www.etsi.org/templates/etsi/img/logo.svg',
        '3GPP': 'https://www.3gpp.org/templates/3gpp-home/images/logo-Transparent.png',
        'Popular-Service': 'https://img.icons8.com/windows/32/4a90e2/hotjar.png',
        'Ascend-AI': 'https://r.huaweistatic.com/s/ascendstatic/lst/header/header-logo.png'
      }
      const abilityDefaultIcons = 'https://img.icons8.com/ios/50/4a90e2/services--v1.png'
      let abilitiesTmp = []
      this.abilities.forEach(ele => {
        let abilit = JSON.parse(JSON.stringify(ele))
        let iconKey = abilit.labelEn.replaceAll(' ', '-')
        abilitiesTmp.push({
          abilityIconSrc: abilityIcons[iconKey] ? abilityIcons[iconKey] : abilityDefaultIcons,
          abilityName: (abilit.labelEn.indexOf('ETSI') > -1 || abilit.labelEn.indexOf('3GPP') > -1 || abilit.labelEn.indexOf('Ascend') > -1) ? '' : (this.$i18n.locale === 'en' ? abilit.labelEn : abilit.label),
          abilityRealName: this.$i18n.locale === 'en' ? abilit.labelEn : abilit.label,
          index: abilit.index,
          isActive: abilit.index === selId
        })
      })
      return abilitiesTmp
    }
  }
}
</script>
<style lang='less' scoped>
.widthWithFiveItems {
  width: calc(100% / 5)
}
.widthWightTwoItems {
  width: calc(100% / 2)
}
.tabPadding30{
  padding: 30px 0;
}
.tabPadding14{
  padding: 14px 0;
}
.ability-switch-tab{
  line-height: 1.5;
  font-size: 0;
  background-color: transparent;
  text-decoration: none;
  color: #006eff;
  margin: 0;
  display: inline-block;
  text-align: center;
  border: 1px solid #E5E8ED;
  box-sizing: border-box;
  cursor: pointer;
  border-left: 1px solid #E5E8ED;
  .ability-switch-tab-icon{
    line-height: 1.5;
    font-size: 0;
    color: #006eff;
    text-align: center;
    cursor: pointer;
    font-weight: 400;
    font-style: normal;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: middle;
    // width: 30px;
    // height: 30px;
  }
  .ability-switch-tab-title{
    text-align: center;
    cursor: pointer;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: middle;
    font-size: 20px;
    color: #333;
    line-height: 28px;
    margin-left: 8px;
  }
}
.ability-switch-tab:hover .ability-switch-tab-title {
  color: #00A4FF;
}
.active .ability-switch-tab-title {
  color: #00A4FF;
}
</style>
