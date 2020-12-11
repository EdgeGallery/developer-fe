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
          <label>已选服务: </label>
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
            <label>可选服务: </label>
            <el-checkbox-group
              style="margin-top: 15px"
              v-model="tags"
            >
              <el-checkbox-button
                v-for="capabilityDetail in capaList.capabilityDetailList"
                :label="capabilityDetail"
                :key="capabilityDetail.service"
                @change="handleClickService(capabilityDetail)"
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
import { Capability, Type } from '../../tools/project_data.js'
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
      capaList: {
        'groupId': 'ab88bc3a-e1c0-4d0d-a4e5-242902f39b12',
        'oneLevelName': 'AI capabilities',
        'twoLevelName': 'Face Recognition',
        'threeLevelName': null,
        'type': 'OPENMEP',
        'description': 'Face Recognition',
        'capabilityDetailList': [
          {
            'detailId': '8d93cb64-e9ff-468f-a5b1-160efa5c4f05',
            'groupId': 'ab88bc3a-e1c0-4d0d-a4e5-242902f39b12',
            'service': 'Face Recognition service plus',
            'version': 'v1',
            'description': 'Face Recognition',
            'provider': 'Huawei',
            'apiFileId': '7dd477d8-bcc0-4e2a-a48d-2b587a30026a',
            'guideFileId': 'b8b5d055-1024-4ea8-8439-64de19875834',
            'uploadTime': '2020-11-19T16:00:00.000+0000',
            'port': 0,
            'host': 'face-recognition-plus',
            'protocol': 'http',
            'appId': null,
            'packageId': null,
            'userId': 'admin'
          },
          {
            'detailId': '6f250fc0-0961-470f-bf17-e9bba8e56c12',
            'groupId': 'ab88bc3a-e1c0-4d0d-a4e5-242902f39b12',
            'service': 'Face Recognition service',
            'version': 'v1',
            'description': 'Face Recognition',
            'provider': 'Huawei',
            'apiFileId': 'd0f8fa57-2f4c-4182-be33-0a508964d04a',
            'guideFileId': '10d8a909-742a-433f-8f7a-5c7667adf825',
            'uploadTime': '2020-11-19T16:00:00.000+0000',
            'port': 0,
            'host': 'face-recognition',
            'protocol': 'http',
            'appId': null,
            'packageId': null,
            'userId': 'admin'
          }
        ]
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created () {},
  watch: {
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      this.language = language
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
    handleClickService (data) {
      let set = new Set()
      for (let i in this.tags) {
        set.add(this.tags[i])
      }
      if (!set.has(data) && data.service !== null) {
        this.tags.push(data)
      }
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
      this.buildTree()
      this.checkProjectData(this.groups)
    },
    getCapaList () {
      Workspace.getServiceListApi(this.groupId).then(res => {
        this.capaList = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    emitStepData () {
      console.log('before send to parent' + this.secondStepSelect)
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
      console.log('after updated!' + this.secondStepSelect)
    },
    updateThirdStepSelection () {
      let cachedThirdStepSelection = []
      for (let tag of this.tags) {
        cachedThirdStepSelection.push(tag)
      }
      this.thirdStepSelection = cachedThirdStepSelection
      console.log(this.thirdStepSelection)
    },
    // 平台能力和开放能力中英文切换
    checkProjectData (checkArr) {
      checkArr.forEach(itemBe => {
        Capability.forEach(itemFe => {
          if (itemBe.name === itemFe.label[1] && this.language === 'cn') {
            itemBe.name = itemFe.label[0]
          } else if (itemBe.name === itemFe.label[1] && this.language === 'en') {
            itemBe.name = itemFe.label[1]
          }
        })
        Type.forEach(itemFe => {
          if (itemBe.name === itemFe.label[1] && this.language === 'cn') {
            itemBe.name = itemFe.label[0]
          } else if (itemBe.name === itemFe.label[1] && this.language === 'en') {
            itemBe.name = itemFe.label[1]
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
}
</style>
