<!--
  -  Copyright 2020-2021 Huawei Technologies Co., Ltd.
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
            :load="loadNode"
            accordion
            class="capability_tree"
            lazy
          />
        </td>
        <td style="vertical-align:text-top;">
          <div class="upper-ability">
            <label>{{ $t("workspace.selectedService") }}: </label>
            <span v-if="tags === null || tags.length === 0"> {{ $t("workspace.noService") }}</span>
            <el-tag
              v-for="tag in tags"
              :key="tag.service"
              closable
              @close="handleDeleteTag(tag)"
              style="margin-left: 10px;"
            >
              {{ tag.label }}
            </el-tag>
          </div>
          <div class="service_div">
            <label>{{ $t("workspace.availableService") }}: </label>
            <el-checkbox-group
              style="margin-top: 15px"
              v-model="tags"
            >
              <el-checkbox
                v-for="capa in capaList"
                :label="capa"
                :key="capa.id"
                @change="handleClickService()"
              >
                <el-card>
                  <div>
                    <span class="service-title">{{ language==='cn'?capa.nameEn : capa.name }}</span>
                    <p class="service-desc">
                      {{ language==='cn'?capa.description : capa.descriptionEn }}
                    </p>
                  </div>
                </el-card>
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { Capability } from '../../tools/api.js'
export default {
  props: {
    allStepData: {
      type: Object,
      required: true
    }
  },
  name: '',
  data () {
    return {
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
        label: 'label',
        isLeaf: 'leaf'
      },
      capabilityUrl: '/#/mecDeveloper/api/mep'
    }
  },
  watch: {
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      this.language = language
    }
  },
  mounted () {
    this.$nextTick(function () {
      const firstNode = document.querySelector('.capability_tree .el-tree-node .el-tree-node__children .el-tree-node .el-tree-node__content')
      firstNode.click()
    })
  },
  methods: {
    loadNode (node, resolve) {
      if (node.level === 0) {
        Capability.getAllCapabilityGroup().then(result => {
          let groups = result.data
          groups.forEach(group => {
            group.label = this.language === 'en' ? group.nameEn : group.name
            group.leaf = false
            group.showCheckbox = false
          })
          resolve(groups)
        })
      }
      if (node.level > 1) return resolve([])

      if (node.level === 1) {
        let groupId = node.data.id
        Capability.getCapabilityByGroupId(groupId).then(result => {
          let capabilities = result.data
          this.capaList = capabilities
          capabilities.forEach(capa => {
            capa.label = this.language === 'en' ? this.capa.nameEn : capa.name
            capa.leaf = true
            capa.showCheckbox = true
          })
          resolve(capabilities)
        })
      }
    },
    buildTree () {
      this.groups.forEach(group => {
        group.label = this.language === 'en' ? group.nameEn : group.name
        group.leaf = false
        this.tree.push(group)
      })

      if (this.tree.length > 0) {
        this.$nextTick(function () {
          const firstNode = document.querySelector('.capability_tree .el-tree-node .el-tree-node__children .el-tree-node .el-tree-node__content')
          firstNode.click()
        })
      }
    },
    handleNodeClick (data) {
      if (!data.children) {
        // this.getCapaList(data)
      }
    },
    handleClickService (capa) {
      this.updateCapabilitySelected()
      this.updateThirdStepSelection()
    },
    handleDeleteTag (tag) {
      let index = this.tags.indexOf(tag)
      if (index !== -1) {
        this.tags.splice(index, 1)
      }
      this.updateCapabilitySelected()
      this.updateThirdStepSelection()
    },
    async getCapabilityGroups () {
      this.groups = []
      await Capability.getAllCapabilityGroup().then(res => {
        this.groups = res.data
        this.buildTree()
      }).catch(err => {
        console.log(err)
      })
    },
    getCapaList (group) {
      Capability.getCapabilityByGroupId(group.id).then(res => {
        this.capaList = res.data
        this.capaList.forEach(capa => {
          capa.label = this.language === 'en' ? this.capa.nameEn : capa.name
          capa.leaf = true
        })
        group.children = this.capaList
      }).catch(err => {
        console.log(err)
      })
    },
    emitStepData () {
      this.$emit('getFormData', { data: this.secondStepSelect, step: 'second' })
      this.$emit('getFormData', { data: this.thirdStepSelection, step: 'third' })
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
    }
  }
}
</script>

<style lang="less">

.upper-ability {
  min-height:35px;
}
.service-title {
    font-size: 16px;
    color: #000;
    line-height: 26px;
    font-weight: 400;
  }
  .service-desc {
    font-size: 14px;
    color: #999;
    line-height: 24px;
    margin-top: 8px;
  }
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
  .tableCapa td:last-child {
    width: 60%;
    .service_div{
      margin-top: 20px;
      .el-button, .el-checkbox{
        word-wrap: break-word;
        white-space: normal;
      }
      .el-checkbox{
        display: flex;
        align-items: center;
        margin-bottom: 10px;
      }
      .el-checkbox:hover,.el-checkbox.is-checked{
        .el-card{
          border: 1px solid #bcceff;
        }
      }
    }
  }
  .capability_tree{
    height: 336px;
    overflow-y: auto;
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
