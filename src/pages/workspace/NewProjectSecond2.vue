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
  <div class="secondstep">
    <p class="capabilityInfo">
      {{ $t('workspace.capabilityInfo1') }}
      <el-link
        type="primary"
        :href="capabilityUrl"
        target="_blank"
      >
        {{ $t('nav.mepApi') }}
      </el-link>
      {{ $t('workspace.capabilityInfo2') }}
    </p>
    <table
      class="tableCapa"
    >
      <caption />
      <tr>
        <th scope="heads" />
        <th scope="heads" />
      </tr>
      <tr>
        <td>
          <el-tree
            :data="tree"
            @node-click="handleNodeClick"
            node-key="id"
            ref="tree"
            highlight-current
            :props="defaultProps"
            accordion
          />
        </td>
        <td style="vertical-align:text-top;">
          <label>{{ $t("workspace.selectedService") }}: </label>
          <span v-if="tags === null || tags.length === 0"> {{ $t("workspace.noService") }}</span>
          <el-tag
            v-for="tag in tags"
            :key="tag.service"
            closable
            @close="handleDeleteTag(tag)"
            style="margin-left: 10px;"
          >
            {{ tag.service }}
          </el-tag>
          <div style="margin-top: 20px">
            <label>{{ $t("workspace.availableService") }}: </label>
            <el-checkbox-group
              style="margin-top: 15px"
              v-model="tags"
            >
              <el-checkbox-button
                v-for="capabilityDetail in capaList.capabilityDetailList"
                :label="capabilityDetail"
                :key="capabilityDetail.service"
                @change="handleClickService()"
              >
                {{ capabilityDetail.service }}
              </el-checkbox-button>
            </el-checkbox-group>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { Workspace } from '../../tools/api.js'
import { Capability } from '../../tools/project_data.js'
export default {
  props: {
    allStepData: {
      type: Object,
      default: () => {}
    }
  },
  name: '',
  data () {
    return {
      groupId: '',
      tree: [],
      tags: [],
      groups: [],
      capability: [],
      secondStepSelect: {
        selectCapabilityId: [],
        capabilitySelected: []
      },
      thirdStepSelection: [],
      capabilityList: [],
      capabilityLoading: true,
      language: localStorage.getItem('language'),
      capaList: {},
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      capabilityUrl: '/#/mecDeveloper/api/mep'
    }
  },
  created () {},
  watch: {
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      this.language = language
      this.checkProjectData(this.groups)
    }
  },
  mounted () {
    this.getCapabilityGroups()
  },
  methods: {
    // 退回到第二步时，保留上一次选择
    buildTree () {
      let oneLevelSet = new Set()
      for (let i in this.groups) {
        if (this.groups[i].oneLevelName !== null && !oneLevelSet.has(this.groups[i].oneLevelName)) {
          let obj = {
            label: '',
            children: []
          }
          obj.label = this.groups[i].oneLevelName
          this.tree.push(obj)
          oneLevelSet.add(this.groups[i].oneLevelName)
        }
      }
      for (let i in this.groups) {
        if (this.groups[i].twoLevelName !== null) {
          let obj2 = {
            label: '',
            groupId: ''
          }
          obj2.label = this.groups[i].twoLevelName
          obj2.groupId = this.groups[i].groupId
          for (let k in this.tree) {
            if (this.tree[k].label === this.groups[i].oneLevelName) {
              this.tree[k].children.push(obj2)
            }
          }
        }
      }
    },
    handleNodeClick (data) {
      if (!data.children) {
        this.groupId = data.groupId
        this.getCapaList()
      }
    },
    handleClickService () {
      this.updateCapabilitySelected()
      this.updateThirdStepSelection()
    },
    handleDeleteTag (tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
      let index = this.tags.indexOf(tag)
      if (index !== -1) {
        this.tags.splice(index, 1)
      }
      this.updateCapabilitySelected()
      this.updateThirdStepSelection()
    },
    async getCapabilityGroups () {
      this.groups = []
      await Workspace.getCapabilityListApi().then(res => {
        this.groups = res.data
      }).catch(err => {
        console.log(err)
      })
      this.checkProjectData(this.groups)
      this.buildTree()
    },
    getCapaList () {
      Workspace.getServiceListApi(this.groupId).then(res => {
        this.capaList = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    emitStepData () {
      this.$emit('getStepData', { data: this.secondStepSelect, step: 'second' })
      this.$emit('getStepData', { data: this.thirdStepSelection, step: 'third' })
    },
    updateCapabilitySelected () {
      let cachedCapabilitySelected = []
      let cachedSelectCapabilityId = []
      for (let tag of this.tags) {
        for (let group of this.groups) {
          if (tag.groupId === group.groupId) {
            cachedCapabilitySelected.push(group)
            cachedSelectCapabilityId.push(group.groupId)
          }
        }
      }
      this.secondStepSelect.capabilitySelected = Array.from(new Set([...cachedCapabilitySelected]))
      this.secondStepSelect.selectCapabilityId = Array.from(new Set([...cachedSelectCapabilityId]))
    },
    updateThirdStepSelection () {
      let cachedThirdStepSelection = []
      for (let tag of this.tags) {
        cachedThirdStepSelection.push(tag)
      }
      this.thirdStepSelection = cachedThirdStepSelection
    },
    // 平台能力和开放能力中英文切换
    checkProjectData (checkArr) {
      checkArr.forEach(itemBe => {
        Capability.forEach(itemFe => {
          if (itemBe.oneLevelName === itemFe.label[1] && this.language === 'cn') {
            itemBe.oneLevelName = itemFe.label[0]
          } else if (itemBe.oneLevelName === itemFe.label[1] && this.language === 'en') {
            itemBe.oneLevelName = itemFe.label[1]
          }
        })
        Capability.forEach(itemFe => {
          if (itemBe.twoLevelName === itemFe.label[1] && this.language === 'cn') {
            itemBe.twoLevelName = itemFe.label[0]
          } else if (itemBe.twoLevelName === itemFe.label[1] && this.language === 'en') {
            itemBe.twoLevelName = itemFe.label[1]
          }
        })
      })
    }
  }
}
</script>

<style lang="less">
.secondstep {
.active {
    background: #fff
  }
  margin-top: 20px;
  .tableCapa{
    width: 100%;
    th{
      display: none;
    }
  }
  .tableCapa,
  td {
    border: 1px solid #ddd;
    border-collapse: collapse;
    padding: 30px 10px;
  }
  .tableCapa td:first-child {
    width: 40%;
    text-align: right;
  }
  .capabilityInfo{
    font-size: 13px;
    line-height: 25px;
    margin-bottom: 15px;
    a{
      margin-top: -2px;
    }
  }
}
</style>
