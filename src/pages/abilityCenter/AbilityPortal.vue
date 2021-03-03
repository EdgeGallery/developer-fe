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
      :class="{ 'active': activeIndex === item.index, 'widthWithFiveItems': !isTelecomAbilityPortals, 'widthWightTwoItems': isTelecomAbilityPortals }"
    ><em
      class="ability-switch-tab-icon"
    ><img
      :src="item.abilityIconSrc"
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
      const abilityIcons = [
        'https://img.icons8.com/windows/32/4a90e2/hotjar.png',
        'https://img.icons8.com/windows/32/4a90e2/foundation.png',
        'https://img.icons8.com/windows/32/4a90e2/network.png',
        'https://img.icons8.com/windows/32/4a90e2/artificial-intelligence.png',
        'https://img.icons8.com/windows/32/4a90e2/video-editing.png',
        'https://img.icons8.com/windows/32/4a90e2/database.png',
        'https://img.icons8.com/windows/32/4a90e2/product-architecture.png'
      ]
      let abilitiesTmp = []
      this.abilities.forEach(ele => {
        let abilit = JSON.parse(JSON.stringify(ele))
        abilitiesTmp.push({
          abilityIconSrc: this.isTelecomAbilityPortals ? '' : abilityIcons[abilit.index],
          abilityName: this.$i18n.locale === 'en' ? abilit.labelEn : abilit.label,
          index: abilit.index,
          isActive: abilit.index === selId
        })
      })
      return abilitiesTmp
    }
  },
  created () {},
  mounted () {},
  beforeCreate () {},
  beforeMount () {
  },
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
  activated () {}
}
</script>
<style lang='less' scoped>
.widthWithFiveItems {
  width: calc(100% / 5)
}
.widthWightTwoItems {
  width: calc(100% / 2)
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
  padding: 30px 0;
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
    width: 30px;
    height: 30px;
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
