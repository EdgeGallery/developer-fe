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
  <div class="other-setting container-4 work-div">
    <div class="select-script">
      <div class="work-title">
        {{ $t('workspace.deployDebugVm.script') }}
      </div>
      <div class="select-script-content">
        <div class="work-p">
          {{ $t('workspace.deployDebugVm.useScript') }}
        </div>
        <el-radio-group
          class="work-radio"
          v-model="isInjectScript"
          @change="handleSelectInjectScript"
        >
          <el-radio label="select">
            true
          </el-radio>
          <el-radio label="cancel">
            false
          </el-radio>
        </el-radio-group>
        <div
          class="script-div"
          v-if="changeResult"
        >
          <div class="script-content">
            <el-collapse
              v-model="activeScriptEditPanel"
              accordion
            >
              <el-collapse-item
                name="1"
                title="contents"
              >
                <template slot="title">
                  contents
                  <el-link
                    class="edit"
                    :underline="false"
                    @click.stop="clickEdit('content')"
                  >
                    <p v-if="viewOrEditContent === 'preview'">
                      {{ $t('common.edit') }}
                    </p>
                    <p v-else>
                      {{ $t('common.save') }}
                    </p>
                  </el-link>
                </template>
                <mavon-editor
                  v-model="sourceContent"
                  :toolbars-flag="false"
                  :subfield="false"
                  :default-open="viewOrEditContent"
                  :box-shadow="false"
                  preview-background="transparent"
                />
              </el-collapse-item>
              <el-collapse-item
                name="2"
                title="params"
              >
                <template slot="title">
                  params
                  <el-link
                    class="edit"
                    :underline="false"
                    @click.stop="clickEdit('params')"
                  >
                    <p v-if="viewOrEditParams === 'preview'">
                      {{ $t('common.edit') }}
                    </p>
                    <p v-else>
                      {{ $t('common.save') }}
                    </p>
                  </el-link>
                </template>
                <mavon-editor
                  v-model="sourceParams"
                  :toolbars-flag="false"
                  :subfield="false"
                  :default-open="viewOrEditParams"
                  :box-shadow="false"
                  preview-background="transparent"
                />
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </div>
    </div>
    <div class="select-key">
      <div class="work-title">
        {{ $t('workspace.deployDebugVm.akTitle') }}
      </div>
      <div class="select-key-content">
        <el-row
          :gutter="24"
          class="work-input"
        >
          <el-col :span="1">
            <div class="work-p input-label">
              AK
            </div>
          </el-col>
          <el-col :span="9">
            <el-input v-model="ak" />
          </el-col>
          <el-col
            :span="1"
            :offset="4"
          >
            <div class="work-p input-label">
              SK
            </div>
          </el-col>
          <el-col :span="9">
            <el-input v-model="sk" />
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="select-host-config">
      <div class="work-title">
        {{ $t('workspace.deployDebugVm.flavorExtraSpecs') }}
      </div>
      <div class="select-host-config-content">
        <div class="host-main-config">
          <div
            class="item-right"
            @click="clickEdit('flavor')"
          >
            <p v-if="viewOrEditFlavor === 'preview'">
              {{ $t('common.edit') }}
            </p>
            <p v-else>
              {{ $t('common.save') }}
            </p>
          </div>
        </div>
        <div class="editor-wrapper">
          <mavon-editor
            class="editor"
            v-model="sourceFlavor"
            :toolbars-flag="false"
            :subfield="false"
            :default-open="viewOrEditFlavor"
            :box-shadow="false"
            preview-background="#ffffff"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    vmConfigData: {
      required: true,
      type: Object
    },
    allStepData: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      ak: '',
      sk: '',
      isInjectScript: 'cancel',
      changeResult: false,
      activeScriptEditPanel: '1',
      sourceContent: '',
      contentDefaultData: '',
      viewOrEditContent: 'preview',
      sourceParams: '',
      paramsDefaultData: '',
      viewOrEditParams: 'preview',
      sourceFlavor: '',
      FlavorDefaultData: '',
      viewOrEditFlavor: 'preview'
    }
  },
  methods: {
    getScriptData () {
      let vmSystem = this.vmConfigData.vmSystemList.find(item => item.systemId === this.allStepData.specSetting.selectedSystemId)
      let selectSystem = vmSystem.operateSystem
      this.vmConfigData.vmUserDataList.forEach(item => {
        if (item.operateSystem === selectSystem) {
          this.flavorDefaultData = item.flavorExtraSpecs
          this.sourceFlavor = '```shell\r\n' + item.flavorExtraSpecs.replace(/\\r\\n/g, '\n') + '\r\n```'
          this.contentDefaultData = item.contents
          this.sourceContent = '```shell\r\n' + item.contents.replace(/\\r\\n/g, '\n') + '\r\n```'
          this.paramsDefaultData = item.params
          this.sourceParams = '```shell\r\n' + item.params.replace(/\\r\\n/g, '\n') + '\r\n```'
        }
      })
    },
    emitStepData (isNext) {
      let canNext = true
      let data = {}
      if (this.changeResult) {
        data = {
          'ak': this.ak,
          'sk': this.sk,
          'flavorExtraSpecs': this.sourceFlavor,
          'contents': this.sourceContent,
          'params': this.sourceParams,
          'temp': this.changeResult
        }
      } else {
        data = {
          'ak': this.ak,
          'sk': this.sk,
          'flavorExtraSpecs': this.sourceFlavor,
          'contents': '',
          'params': '',
          'temp': this.changeResult
        }
      }
      data.flavorExtraSpecs = data.flavorExtraSpecs.replace(/\n/g, '\\r\\n')
      data.contents = data.contents.replace(/\n/g, '\\r\\n')
      data.params = data.params.replace(/\n/g, '\\r\\n')
      let flavorTemp = data.flavorExtraSpecs
      let contentTemp = data.contents
      let paramsTemp = data.params
      data.flavorExtraSpecs = flavorTemp.substring(13, (flavorTemp.length - 8))
      data.contents = contentTemp.substring(13, (contentTemp.length - 8))
      data.params = paramsTemp.substring(13, (paramsTemp.length - 8))

      if (this.flavorDefaultData !== data.flavorExtraSpecs) {
        data.flavorExtraSpecs = flavorTemp.substring(12, (flavorTemp.length - 7))
      }
      if (this.contentDefaultData !== data.contents) {
        data.contents = contentTemp.substring(12, (contentTemp.length - 7))
      }
      if (this.paramsDefaultData !== data.params) {
        data.params = paramsTemp.substring(12, (paramsTemp.length - 7))
      }
      this.$emit('getStepData', { step: 'otherSetting', data, canNext })
    },
    handleSelectInjectScript (val) {
      if (val === 'select') {
        this.changeResult = true
      } else if (val === 'cancel') {
        this.changeResult = false
      }
    },
    clickEdit (name) {
      if (name === 'content') {
        if (this.viewOrEditContent === 'edit') {
          this.viewOrEditContent = 'preview'
        } else {
          this.viewOrEditContent = 'edit'
        }
      } else if (name === 'params') {
        if (this.viewOrEditParams === 'edit') {
          this.viewOrEditParams = 'preview'
        } else {
          this.viewOrEditParams = 'edit'
        }
      } else if (name === 'flavor') {
        if (this.viewOrEditFlavor === 'edit') {
          this.viewOrEditFlavor = 'preview'
        } else {
          this.viewOrEditFlavor = 'edit'
        }
      }
    }
  },
  mounted () {
    this.getScriptData()
  }
}
</script>

<style lang="less">
.container-4 {
  padding: 46px 100px 46px 39px;

  .select-script-content {
    margin-left: 53px;
    margin-top: 20px;

    .work-radio {
      margin-top: 15px;
    }

    .script-div {
      margin-top: 20px;
      font-family: defaultFontLight, Arial, Helvetica, sans-serif;

      .el-collapse-item__header {
        position: relative;
        padding-left: 30px;
        background-color: transparent;
        color: #380879;
        font-size: 16px;
        border-top: solid 1px #c3bde5;
        border-bottom: solid 1px #c3bde5;

        .edit{
          position: absolute;
          right: 0;
          color: #4a2983;
        }

        .el-collapse-item__arrow {
          position: absolute;
          left: 0;
        }
      }

      .el-collapse-item__wrap {
        background-color: transparent;
      }

      .v-note-wrapper {
        background-color: transparent;
      }

      .markdown-body {
        background-color: transparent;
      }

      .markdown-body pre {
        padding: 0px;
        background-color: transparent;
      }

      .hljs {
        background-color: transparent;
      }
    }
    .v-note-wrapper {
      min-height: 100px;
      max-height: 300px;
      background-color: transparent;
    }
  }

  .select-key {
    margin-top: 50px;

    .select-key-content {
      margin-left: 53px;
      margin-top: 30px;

      .host-main-config {
        position: relative;

        .work-p {
          float: left;
        }

        .work-p.input-label {
          float: right;
          margin-top: 3px;
        }
      }
    }
  }

  .select-host-config {
    margin-top: 50px;

    .select-host-config-content {
      margin-left: 53px;
      margin-top: 20px;
    }

    .host-main-config::after {
        content: '';
        display: block;
        clear: both;
      }

      .editor-wrapper {
        background-color: white;
        border-radius: 10px;
        padding: 10px;
      }

      .v-note-wrapper {
        min-height: 100px;
      }

      .item-right {
        display: block;
        float: right;
        border-radius: 5px;
        margin-bottom: 10px;
        padding: 3px 10px;
        font-family: defaultFontLight, Arial, Helvetica, sans-serif;
        color: #FFF;
        background-color: #8278b7;
      }

      .item-right:hover {
        cursor: pointer;
      }

      .markdown-body .highlight pre, .markdown-body pre {
        background-color: transparent;
        padding: 0;
      }

      .hljs {
        background-color: transparent;
      }

      .markdown-body pre code {
        font-family: defaultFontLight, Arial, Helvetica, sans-serif;
        font-size: 14px;
      }

      .content-input-wrapper {
        padding: 8px;
      }
  }
}
</style>
