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
        <td>
          <label>已选能力: </label>
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
            <el-checkbox-group
              v-model="tags"
            >
              <el-checkbox-button
                v-for="capabilityDetail in capaList.capabilityDetailList"
                :label="capabilityDetail"
                :key="capabilityDetail"
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

      groups: [
        {
          'groupId': 'c0db376b-ae50-48fc-b9f7-58a609e3ee12',
          'oneLevelName': 'Platform basic services',
          'twoLevelName': 'Service governance',
          'threeLevelName': null,
          'type': 'OPENMEP',
          'description': 'EdgeGallery MEC Service governance API',
          'capabilityDetailList': null
        },
        {
          'groupId': 'a6efaa2c-ad99-432f-9405-e28e90f44f15',
          'oneLevelName': 'Telecom network capabilities',
          'twoLevelName': 'Bandwidth management',
          'threeLevelName': null,
          'type': 'OPENMEP',
          'description': 'Bandwidth management',
          'capabilityDetailList': null
        },
        {
          'groupId': '406593b4-c782-409c-8f46-a6fd5e1f6221',
          'oneLevelName': 'Telecom network capabilities',
          'twoLevelName': 'Location service',
          'threeLevelName': null,
          'type': 'OPENMEP',
          'description': '自定义不规则区域分析API,标准栅格区域分析API,特定人群流动分析API,API区域原子报表分析,匿名历史位置轨',
          'capabilityDetailList': null
        },
        {
          'groupId': '72a1434d-fbb0-459b-9b92-ce1e02a121c2',
          'oneLevelName': 'Telecom network capabilities',
          'twoLevelName': 'UE identity',
          'threeLevelName': null,
          'type': 'OPENMEP',
          'description': 'UE标识',
          'capabilityDetailList': null
        },
        {
          'groupId': 'd8f06d28-390c-4a06-905e-120f56279bbc',
          'oneLevelName': 'Telecom network capabilities',
          'twoLevelName': 'Traffic Rule',
          'threeLevelName': null,
          'type': 'OPENMEP',
          'description': '流量转发',
          'capabilityDetailList': null
        },
        {
          'groupId': 'ab88bc3a-e1c0-4d0d-a4e5-242902f39b12',
          'oneLevelName': 'AI capabilities',
          'twoLevelName': 'Face Recognition',
          'threeLevelName': null,
          'type': 'OPENMEP',
          'description': 'Face Recognition',
          'capabilityDetailList': null
        },
        {
          'groupId': 'b97e4b44-e7b2-4246-9eaa-d5c8ad243114',
          'oneLevelName': 'AI capabilities',
          'twoLevelName': 'Card recognition',
          'threeLevelName': null,
          'type': 'OPENMEP',
          'description': 'Card recognition',
          'capabilityDetailList': null
        },
        {
          'groupId': '3af01bd2-7af7-4523-be4f-01d99d739e30',
          'oneLevelName': 'AI capabilities',
          'twoLevelName': 'Gesture recognition',
          'threeLevelName': null,
          'type': 'OPENMEP',
          'description': 'Card recognition',
          'capabilityDetailList': null
        },
        {
          'groupId': '53be0614-5e3f-41e3-9edb-b6671ba9fe32',
          'oneLevelName': 'Video processing',
          'twoLevelName': 'Encoding decoding',
          'threeLevelName': null,
          'type': 'OPENMEP',
          'description': 'Encoding decoding',
          'capabilityDetailList': null
        },
        {
          'groupId': '293bebd8-a226-4df6-adff-2d4bed7b08d3',
          'oneLevelName': 'DateBase',
          'twoLevelName': 'Data management',
          'threeLevelName': null,
          'type': 'OPENMEP',
          'description': 'Data management',
          'capabilityDetailList': null
        },
        {
          'groupId': '38d54f55-d981-47a3-824b-46f8f81d1091',
          'oneLevelName': 'Public framework',
          'twoLevelName': 'Data management',
          'threeLevelName': null,
          'type': 'OPENMEP',
          'description': 'Data management',
          'capabilityDetailList': null
        },
        {
          'groupId': 'fb9cc991-0025-4971-b89d-00da1b0b518b',
          'oneLevelName': 'Public framework',
          'twoLevelName': 'Message bus',
          'threeLevelName': null,
          'type': 'OPENMEP',
          'description': 'Message bus',
          'capabilityDetailList': null
        },
        {
          'groupId': '4466a11e-c213-40ef-9d28-1907b63b8844',
          'oneLevelName': 'Public framework',
          'twoLevelName': 'Gateway',
          'threeLevelName': null,
          'type': 'OPENMEP',
          'description': 'Gateway',
          'capabilityDetailList': null
        },
        {
          'groupId': '6900a6d2-e134-4ac6-ae9b-2f2c01717c2b',
          'oneLevelName': 'Public framework',
          'twoLevelName': 'Multi-cloud capabilities',
          'threeLevelName': '',
          'type': 'OPENMEP',
          'description': 'Multi-cloud capabilities',
          'capabilityDetailList': null
        }
      ],

      capability: [],
      capabilityEco: [],
      secondStepAll: {
        selectCapabilityId: [],
        capabilitySelected: []
      },
      secondStepSelect: {
        selectCapabilityId: [],
        capabilitySelected: []
      },
      capabilityList: [],
      capabilityEcoList: [],
      selectCapabilityAll: [],
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
  mounted () {
    this.getCapabilityGroups()
    // this.buildTree()
  },
  methods: {
    // 退回到第二步时，保留上一次选择
    buildTree () {
      console.log(this.groups)
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
      console.log(this.tree)
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
      if (!set.has(data)) {
        this.tags.push(data)
      }
    },
    handleDeleteTag (tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
      let index = this.tags.indexOf(tag)
      if (index !== -1) {
        this.tags.splice(index, 1)
      }
    },
    async getCapabilityGroups () {
      this.groups = []
      await Workspace.getCapabilityListApi().then(res => {
        this.groups = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    getCapaList () {
      Workspace.getServiceListApi(this.groupId).then(res => {
        this.capaList = res.data
      }).catch(err => {
        console.log(err)
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
