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
  <ul class="group_list">
    <li
      v-for="(item,index) in capabilityGroupsList"
      :key="index"
      @click="selectGroupList(item,index)"
      @mouseenter="groupListHover(index)"
      @mouseleave="groupListLeave(index)"
    >
      <div
        class="li_list"
        :class="{'select':selectIndex===index}"
      >
        <img
          :src="item.icon"
          alt=""
          :class="{'icon_default':selectIndex!==index && activeIndex!==index}"
        >
        <img
          :src="item.iconSelect"
          alt=""
          class="icon_show"
          :class="{'icon_select':selectIndex===index || activeIndex===index}"
        >
        {{ language==='cn'?item.name:item.nameEn }}
        <span
          class="counts"
          :class="{'select':activeIndex===index}"
        >{{ item.counts }}</span>
      </div>
    </li>
    <div
      class="select_style"
      :class="{'select_style_nobg':hideBg}"
    />
  </ul>
</template>

<script>
export default {
  name: '',
  props: {
    capabilityGroupsList: {
      require: true,
      type: Array,
      default: () => []
    },
    capabilityAllService: {
      require: true,
      type: Array,
      default: () => []
    },
    language: {
      require: true,
      type: String,
      default: ''
    },
    isRefrshPage: {
      require: true,
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      activeIndex: 0,
      selectIndex: 0,
      capabilityServiceList: [],
      clickGroupListNum: 0,
      listBottom: false,
      hideBg: true
    }
  },
  methods: {
    groupListHover (index) {
      if (this.selectIndex !== index) {
        this.hideBg = false
      } else {
        this.hideBg = true
      }
      this.activeIndex = index
      let oDiv = document.getElementsByClassName('select_style')
      oDiv[0].style.top = (58 * index + 5) + 'px'
    },
    groupListLeave (index) {
      this.hideBg = true
      this.activeIndex = -1
      let oDiv = document.getElementsByClassName('select_style')
      oDiv[0].style.top = (58 * this.selectIndex + 5) + 'px'
    },
    selectGroupList (item, index) {
      if (this.selectIndex !== index) {
        this.clickGroupListNum++
        this.$emit('getPageScroll', this.clickGroupListNum, this.listBottom)
        this.listBottom = false
        sessionStorage.setItem('capaSelectListIndex', index)
        this.selectIndex = index
        this.groupListLeave(this.selectIndex)
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
        this.$emit('getCapaServiceList', this.capabilityServiceList)
        this.$parent.filterSefvice('hot')
      }
    }
  }
}
</script>

<style lang="less">
.group_list{
  li{
    height: 58px;
    padding: 5px 0;
    .li_list{
      height: 48px;
      line-height: 48px;
      padding: 0 15px 0 50px;
    }

    font-size: 21px;
    color: #7a6e8a;
    cursor: pointer;
    position: relative;
    z-index: 2;
    img{
      position: absolute;
      top: 18px;
      left: 15px;
    }
    img.icon_default{
      opacity: 1;
      transition: all 1s;
    }
    img.icon_show{
      opacity: 0;
    }
    img.icon_select{
      opacity: 1;
      transition: all 1s;
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
  .li_list.select{
    background: #fdfcff;
    border-radius: 8px;
    color: #380879;
    box-shadow: 0 0 24px 0 rgba(40, 12, 128, 0.24);
    .counts{
      color: #380879;
    }
  }
  .select_style{
    width: 100%;
    height: 48px;
    z-index: 1;
    position: absolute;
    top: 5px;
    left: 0;
    transition: all 0.2s ease;
    background: #fdfcff;
    border-radius: 8px;
    color: #380879;
    box-shadow: 0 0 24px 0 rgba(40, 12, 128, 0.24);
  }
  .select_style.select_style_nobg{
    box-shadow: none;
  }
}
</style>
