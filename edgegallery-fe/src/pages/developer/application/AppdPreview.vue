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
  <div class="appd-preview">
    <div class="common-div-bg appd-preview-warraper">
      <h3 class="rules-title">
        应用包详情
      </h3>
      <el-row>
        <el-col
          :span="8"
          class="file-list"
        >
          <el-tree
            class="appd-tree"
            :data="appPageListData"
            default-expand-all
            node-key="id"
            ref="tree"
            highlight-current
            :props="defaultProps"
            @node-click="getFileDetail"
          />
        </el-col>
        <el-col :span="16">
          <div class="file-desc">
            2
            <mavon-editor
              v-model="markdownSource"
              :toolbars-flag="false"
              :editable="false"
              :subfield="false"
              default-open="preview"
              :box-shadow="false"
              preview-background="#ffffff"
            />
          </div>
        </el-col>
      </el-row>
      <div class="btn-container appdPreviewBtn">
        <el-button class="common-btn">
          {{ $t("common.confirm") }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppdPreview',
  components: {},
  data () {
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      appPageListData: [],
      fileType: '',
      fileContent: '',
      projectId: sessionStorage.getItem('mecDetailID'),
      csarId: sessionStorage.getItem('csarId'),
      markdownSource: ''
    }
  },
  methods: {
    getAppPackageList () {
      let res = {
        name: null,
        id: null,
        children: [
          {
            name: 'Image',
            id: 'Image',
            children: [
              {
                name: 'SwImageDesc.json',
                id: 'SwImageDesc.json',
                children: null,
                parent: false
              }
            ],
            parent: true
          },
          {
            name: 'APPD',
            id: 'APPD',
            children: [
              {
                name: 'MainServiceTemplate.zip',
                id: 'MainServiceTemplate.zip',
                children: null,
                parent: false
              }
            ],
            parent: true
          },
          {
            name: 'monitor33d2aa71.mf',
            id: 'monitor33d2aa71.mf',
            children: null,
            parent: false
          },
          {
            name: 'TOSCA-Metadata',
            id: 'TOSCA-Metadata',
            children: [
              {
                name: 'TOSCA.meta',
                id: 'TOSCA.meta',
                children: null,
                parent: false
              }
            ],
            parent: true
          }
        ],
        parent: true
      }
      if (res.children) {
        this.appPageListData = res.children
        let APPD = {}
        this.appPageListData.forEach((item, index) => {
          if (item.name === 'APPD') {
            APPD = item
            this.appPageListData.splice(index, 1)
          }
        })
        this.appPageListData.unshift(APPD)
        if (this.appPageListData.length > 0) {
          this.$nextTick(function () {
            const firstNode = document.querySelector(
              '.appd-tree .el-tree-node .el-tree-node__children .el-tree-node .el-tree-node__children .el-tree-node .el-tree-node__content'
            )
            firstNode.click()
          })
        }
      }
    }
  },
  mounted () {
    this.getAppPackageList()
  }
}
</script>

<style lang="less">
.appd-preview {
  background: transparent;
  height: 90%;
  .appd-preview-warraper::-webkit-scrollbar {
    display: none;
  }
  .appd-preview-warraper {
    width: 75%;
    background: url("../../../assets/images/app_pacakage_build_bg.png") center;
    background-size: cover;
    border-radius: 16px;
    margin: 51px auto;
    padding: 40px 40px 40px 40px;
    .rules-title:before {
      margin-right: 7px;
      background-color: #76e1e9;
    }
    .el-row {
      .el-tree {
        background-color: transparent;
        color: #ffffff;
        .el-tree__empty-text {
          color: #ffffff;
        }
        .el-tree-node__content {
          height: 35px;
          line-height: 35px;
        }
        .el-tree-node__content:hover {
          background-color: transparent;
        }
      }
      .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
        background-color: transparent !important;
      }
    }
    .appdPreviewBtn {
      margin: 41px 0px 0 0;
      .el-button {
        border-radius: 12px;
        font-size: 14px;
        line-height: 19px;
        padding: 3px 32px;
      }
      .el-button + .el-button {
        margin-left: 60px;
      }
    }
  }
}
</style>
