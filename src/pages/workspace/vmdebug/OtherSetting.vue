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
  <div class="other_set">
    <div class="top">
      <p class="clear">
        <span>ak</span><el-input
          size="mini"
          v-model="ak"
        />
      </p>
      <p class="clear">
        <span>sk</span><el-input
          size="mini"
          v-model="sk"
        />
      </p>
      <p>
        {{ $t('workspace.deployDebugVm.flavorExtraSpecs') }}
        <el-link
          class="edit"
          :underline="false"
          @click.stop="clickEdit('flavor')"
        >
          {{ $t('common.edit') }}
        </el-link>
      </p>
      <mavon-editor
        v-model="sourceFlavor"
        :toolbars-flag="false"
        :subfield="false"
        :default-open="viewOrEditFlavor"
        :box-shadow="false"
        preview-background="#ffffff"
        class="mavon_editor"
      />
      <div class="select_div">
        {{ $t('workspace.deployDebugVm.useScript') }}
        <el-radio-group
          v-model="selectScript"
          @change="changeSelect"
        >
          <el-radio label="select">
            true
          </el-radio>
          <el-radio label="cancel">
            false
          </el-radio>
        </el-radio-group>
      </div>
    </div>
    <div
      class="script_div"
      v-if="changeResult"
    >
      <el-collapse
        v-model="activeName"
        accordion
      >
        <el-collapse-item name="1">
          <template slot="title">
            contents
            <el-link
              class="edit"
              :underline="false"
              @click.stop="clickEdit('content')"
            >
              {{ $t('common.edit') }}
            </el-link>
          </template>
          <mavon-editor
            v-model="sourceContent"
            :toolbars-flag="false"
            :subfield="false"
            :default-open="viewOrEditContent"
            :box-shadow="false"
            preview-background="#ffffff"
            class="mavon_editor"
          />
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title">
            params
            <el-link
              class="edit"
              :underline="false"
              @click.stop="clickEdit('params')"
            >
              {{ $t('common.edit') }}
            </el-link>
          </template>
          <mavon-editor
            v-model="sourceParams"
            :toolbars-flag="false"
            :subfield="false"
            :default-open="viewOrEditParams"
            :box-shadow="false"
            preview-background="#ffffff"
            class="mavon_editor"
          />
        </el-collapse-item>
      </el-collapse>
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
      selectScript: 'select',
      changeResult: true,
      activeName: '1',
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
      /* if (isNext) {
        canNext = this.validateInput()
      } */
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
      console.log(data)
      this.$emit('getStepData', { step: 'otherSetting', data, canNext })
    },
    changeSelect (val) {
      if (val === 'select') {
        this.changeResult = true
      } else if (val === 'cancel') {
        this.changeResult = false
      }
    },
    clickEdit (name) {
      if (name === 'content') {
        this.viewOrEditContent = 'edit'
      } else if (name === 'params') {
        this.viewOrEditParams = 'edit'
      } else if (name === 'flavor') {
        this.viewOrEditFlavor = 'edit'
      }
    }
  },
  created () {
  },
  mounted () {
    this.getScriptData()
  }
}
</script>

<style lang="less">
.other_set{
  padding: 10px 5% 0;
  .v-note-wrapper{
    width: 100%;
  }
  .top{
    p{
      margin-bottom: 10px;
      span{
        float: left;
        width: 30px;
        height: 28px;
        line-height: 28px;
      }
      .el-input{
        width: calc(100% - 30px);
        float: left;
      }
      .edit{
        float: right;
      }
    }
    .select_div{
      padding: 20px 0;
    }
    .el-radio-group{
      margin-left: 20px;
      .el-radio{
        margin-right: 20px;
      }
    }
    .mavon_editor{
      min-height: 120px;
      max-height: 300px;
      overflow: auto;
    }
  }
  .el-collapse {
    .mavon_editor{
     height: 300px;
     overflow: auto;
    }
  }
  .el-collapse-item__header{
    font-size: 14px;
    position: relative;
    padding-left: 30px;
    .edit{
      position: absolute;
      right: 0;
    }
    .el-collapse-item__arrow{
      position: absolute;
      left: 0;
    }
  }
  .text_div{
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }
}
</style>
