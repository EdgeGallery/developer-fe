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
  <div class="formdetail">
    <el-form
      disabled
      :model="form"
      ref="form"
      label-position="right"
      class="clear"
    >
      <el-form-item
        :label="$t('workspace.appName')"
        :label-width="formLabelWidth"
        prop="name"
      >
        <el-input
          id="projectName"
          v-model="form.name"
        />
      </el-form-item>
      <el-form-item
        :label="$t('workspace.version')"
        :label-width="formLabelWidth"
        prop="version"
      >
        <el-input
          id="projectVersion"
          v-model="form.version"
        />
      </el-form-item>
      <el-form-item
        :label="$t('workspace.provider')"
        :label-width="formLabelWidth"
        prop="provider"
      >
        <el-input
          id="projectProvider"
          v-model="form.provider"
        />
      </el-form-item>
      <el-form-item
        :label="$t('workspace.deployType')"
        :label-width="formLabelWidth"
        prop="deployPlatform"
        class="f50 deployType"
      >
        <el-radio
          v-model="form.deployPlatform"
          label="KUBERNETES"
          class="work-radio"
        >
          <em class="dockerDeploy" />
          {{ $t('workspace.containerImage') }}
        </el-radio>
        <el-radio
          v-model="form.deployPlatform"
          label="VIRTUALMACHINE"
          class="work-radio"
        >
          <em class="vmDeploy" />
          {{ $t('workspace.vmImage') }}
        </el-radio>
      </el-form-item>
      <el-form-item
        :label="$t('workspace.architecture')"
        :label-width="formLabelWidth"
        prop="platform"
        class="f50"
      >
        <el-input
          id="projectPlatform"
          v-model="form.platform"
        />
      </el-form-item>
      <el-form-item
        :label="$t('workspace.industry')"
        :label-width="formLabelWidth"
        prop="industry"
        class="f50"
      >
        <el-input
          id="projectIndustry"
          v-model="form.industry"
        />
      </el-form-item>
      <el-form-item
        :label="$t('test.testApp.type')"
        :label-width="formLabelWidth"
        prop="type"
        class="f50"
      >
        <el-input
          id="projectTestAppType"
          v-model="form.type"
        />
      </el-form-item>
      <el-form-item
        :label="$t('workspace.icon')"
        :label-width="formLabelWidth"
        prop="logoFileList"
        class="icon"
      >
        <div class="default-icon">
          <div
            class="box"

            :key="item"
          >
            <img
              :src="IconfileIdSrc"
              alt=""
            >
            <em
              class="el-icon-success"
              :class="{ active: form.defaultActive === index }"
            />
          </div>
        </div>
      </el-form-item>
      <el-form-item
        :label="$t('test.testApp.description')"
        :label-width="formLabelWidth"
        prop="description"
      >
        <el-input
          id="projectDescription"
          type="textarea"
          v-model="form.description"
          :placeholder="$t('test.testApp.description')"
          :rows="3"
          maxlength="1024"
          show-word-limit
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Industry, Type, Architecture } from '../../tools/project_data.js'
import { Workspace } from '../../tools/api.js'
import { PROXY_PREFIX_CURRENTSERVER } from '../../tools/constant.js'
export default {
  name: '',
  props: {
    projectDetailData: {
      type: Object,
      required: true
    }

  },
  data () {
    return {
      form: {
        name: '',
        version: '',
        provider: '',
        industry: '',
        type: '',
        platform: '',
        appIcon: '',
        iconFileId: '',
        description: '',
        status: 'ONLINE',
        base64Session: false,
        defaultActive: '',
        deployPlatform: '',
        dependent: ''
      },
      IconfileIdSrc: '',
      userId: sessionStorage.getItem('userId'),
      projectId: sessionStorage.getItem('mecDetailID'),
      depPlatform: '',
      industryOptions: Industry,
      typeOptions: Type,
      architectureOptions: Architecture,
      value: 0,
      showErr: false,
      formLabelWidth: '95px',
      language: localStorage.getItem('language'),
      uploadIcon: false

    }
  },

  methods: {
    changeDataLanguage () {
      let language = localStorage.getItem('language')
      this.language = language
    },

    getlistData () {
      this.form.name = this.projectDetailData.name
      this.form.version = this.projectDetailData.version
      this.form.provider = this.projectDetailData.provider
      this.form.industry = this.projectDetailData.industry
      this.form.type = this.projectDetailData.type
      this.form.platform = this.projectDetailData.platform
      this.form.deployType = this.projectDetailData.deployType
      this.form.createDate = this.projectDetailData.createDate
      this.form.deployPlatform = this.projectDetailData.deployType
      this.form.description = this.projectDetailData.description
      this.form.iconFileId = this.projectDetailData.iconFileId
      let iconUrl = this.getIcon(this.form.iconFileId)
      let currUrl = window.location.origin + PROXY_PREFIX_CURRENTSERVER
      this.IconfileIdSrc = currUrl + iconUrl
    },
    getIcon (fileId) {
      return Workspace.getIconApi(fileId, this.userId)
    },
    checkProjectData () {
      Industry.forEach(itemFe => {
        if (this.language === 'cn') {
          if (this.form.industry === itemFe.label[1]) {
            this.form.industry = itemFe.label[0]
          }
        } else {
          if (this.form.industry === itemFe.label[0]) {
            this.form.industry = itemFe.label[1]
          }
        }
      })
      Type.forEach(itemFe => {
        if (this.language === 'cn') {
          if (this.form.type === itemFe.label[1]) {
            this.form.type = itemFe.label[0]
          }
        } else {
          if (this.form.type === itemFe.label[0]) {
            this.form.type = itemFe.label[1]
          }
        }
      })
    },

    // Adjust width when language changes
    editWidth () {
      let selectWidth = document.getElementsByClassName('el-form-item__content')
      if (this.language === 'cn') {
        this.formLabelWidth = '95px'
        selectWidth.forEach(item => {
          item.style.width = 'calc(100% - 95px)'
        })
      } else {
        this.formLabelWidth = '140px'
        selectWidth.forEach(item => {
          item.style.width = 'calc(100% - 140px)'
        })
      }
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.changeDataLanguage()
      this.editWidth()
      this.$refs['form'].fields.forEach(item => {
        if (item.validateState === 'error') {
          this.$refs['form'].validateField(item.labelFor)
        }
      })
      this.checkProjectData()
    }
  },
  mounted () {
    this.getlistData()
    this.editWidth()
  }
}
</script>
