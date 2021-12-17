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
  <div class="addVm">
    <div
      class="common-div-bg addVm-bg"
      v-if="!customSpecs"
    >
      <el-collapse
        v-model="activeNames"
        class="vmCollapse"
        accordion
      >
        <el-collapse-item
          :title="$t('sandbox.vmInformation')"
          name="1"
        >
          <div class="vm-info">
            <div class="addVm-top-title">
              <p>
                {{ $t('sandbox.vmName') }}
              </p>
              <el-input
                class="common-input"
                v-model="addvmImages.name"
                :placeholder="$t('sandbox.enterVmName')"
              />
            </div>
            <div class="addVm-top-title defaultFontLight">
              <p>{{ $t('common.userName') }}</p>
              <el-input
                class="common-input"
                v-model="addvmImages.vmCertificate.pwdCertificate.username"
                :placeholder="$t('common.enterUserName')"
              />
            </div>
            <div class="addVm-top-title defaultFontLight">
              <p>{{ $t('common.password') }}</p>
              <el-input
                type="password"
                class="common-input"
                show-password
                v-model="addvmImages.vmCertificate.pwdCertificate.password"
                :placeholder="$t('common.enterPassword')"
              />
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item
          :title="$t('sandbox.selectVmflavor')"
          name="2"
        >
          <div class="simulator-info-content">
            <div class="defaultFontLight">
              <div class="flex">
                <el-radio-group
                  class="common-radio"
                  v-model="vmInfo.archType"
                  @change="handleChangeArch"
                >
                  <el-radio-button label="X86" />
                  <el-radio-button label="ARM" />
                </el-radio-group>
                <p
                  class="custom-specs defaultFontLight hoverHands"
                  @click="addSpecForm"
                >
                  {{ $t('sandbox.customSpec') }}
                </p>
              </div>
              <el-table
                :data="vmInfo.vmRegulationList"
                class="common-table vm-table"
              >
                <el-table-column width="35px">
                  <template slot-scope="scope">
                    <el-radio
                      :label="scope.row.id"
                      v-model="addvmImages.flavorId"
                      class="common-radio"
                    />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  :label="$t('common.name')"
                  min-width="25%"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    {{ scope.row.name }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="sence"
                  :label="$t('sandbox.useCase')"
                  min-width="20%"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    {{ scope.row.description }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="cpu"
                  label="CPU"
                  min-width="10%"
                  show-overflow-tooltip
                  :formatter="appendCPUUnit"
                />
                <el-table-column
                  prop="memory"
                  :label="$t('sandbox.memory')"
                  min-width="10%"
                  show-overflow-tooltip
                  :formatter="appendSizeUnit"
                />
                <el-table-column
                  prop="systemDiskSize"
                  :label="$t('sandbox.systemDisk')"
                  min-width="10%"
                  show-overflow-tooltip
                  :formatter="appendSizeUnit"
                />
                <el-table-column
                  prop="dataDiskSize"
                  :label="$t('sandbox.dataDisk')"
                  min-width="10%"
                  show-overflow-tooltip
                  :formatter="appendSizeUnit"
                />
                <el-table-column
                  prop="otherExtraInfo"
                  :label="$t('sandbox.otherCapability')"
                  min-width="15%"
                  show-overflow-tooltip
                />
              </el-table>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item
          :title="$t('sandbox.configureNetworkPorts')"
          name="3"
        >
          <div class="internetInfos">
            <el-table
              class="common-table vm-table"
              :data="vmNetworkList"
            >
              <el-table-column width="35">
                <template slot-scope="scope">
                  <el-checkbox
                    class="common-checkbox"
                    v-model="selectedNetworks"
                    :label="scope.row.name"
                    @change="changeInternet(selectedNetworks)"
                  />
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                width="200px"
                :label="$t('common.name')"
                show-overflow-tooltip
              />
              <el-table-column
                :label="$t('common.describe')"
              >
                <template slot-scope="scope">
                  {{ scope.row.description }}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <el-collapse-item
          :title="$t('sandbox.selectImage')"
          name="4"
        >
          <div class="selectImage-content">
            <div class="selectImage-public defaultFontLight">
              <el-radio
                class="common-radio"
                label="public"
                v-model="vmInfo.imageType"
                @change="changeImageType('public')"
              >
                {{ $t('sandbox.imageType.publicImage') }}
              </el-radio>
              <el-select
                v-model="vmInfo.publicSystemName"
                :placeholder="$t('common.pleaseSelect')"
                @change="changePublicType(vmInfo.publicSystemName)"
                :disabled="vmInfo.imageType === 'private'"
              >
                <el-option
                  v-for="(item,index) in vmInfo.publicSystemType"
                  :key="index"
                  :label="item"
                  :value="item"
                />
              </el-select>
              <el-select
                v-model="vmInfo.publicId"
                :placeholder="$t('common.pleaseSelect')"
                :disabled="vmInfo.imageType === 'private'|| vmInfo.publicSystemName ==''"
              >
                <el-option
                  v-for="(item,index) in vmInfo.publicImageOptions"
                  :key="index"
                  :label="item.systemImage"
                  :value="item.id"
                />
              </el-select>
            </div>
            <div class="selectImage-public defaultFontLight">
              <el-radio
                class="common-radio"
                v-model="vmInfo.imageType"
                label="private"
                @change="changeImageType('private')"
              >
                {{ $t('sandbox.imageType.privateImage') }}
              </el-radio>
              <el-select
                v-model="vmInfo.privateSystemName"
                @change="changePrivateType(vmInfo.privateSystemName)"
                :placeholder="$t('common.pleaseSelect')"
                :disabled="vmInfo.imageType === 'public'"
              >
                <el-option
                  v-for="(item,index) in vmInfo.privateSystemType"
                  :key="index"
                  :label="item"
                  :value="item"
                />
              </el-select>
              <el-select
                v-model="vmInfo.privateId"
                :placeholder="$t('common.pleaseSelect')"
                :disabled="vmInfo.imageType === 'public'|| vmInfo.privateSystemName ==''"
              >
                <el-option
                  v-for="(item,index) in vmInfo.privateImageOptions"
                  :key="index"
                  :label="item.systemImage"
                  :value="item.id"
                />
              </el-select>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item
          :title="$t('sandbox.flavorExtraSpecs')"
          name="5"
        >
          <div
            class="edit-btn clear"
          >
            <span class="title-info">{{ $t('sandbox.enterFlavorExtraSpecs') }}</span>
            <el-button
              id="btn_editVmFlavor"
              class="rt"
              v-if="viewOrEditFlavor === 'preview'"
              @click="clickEdit('flavor')"
            >
              {{ $t('common.edit') }}
            </el-button>
            <el-button
              id="btn_saveVmFlavor"
              class="rt"
              v-else
              @click="clickEdit('flavor')"
            >
              {{ $t('common.save') }}
            </el-button>
          </div>
          <div class="editor-wrapper">
            <mavon-editor
              class="common-mavon-editor"
              v-model="flavorExtraSpecs"
              :toolbars-flag="false"
              :subfield="false"
              :default-open="viewOrEditFlavor"
              :box-shadow="false"
              preview-background="transparent"
            />
          </div>
        </el-collapse-item>
        <el-collapse-item
          :title="$t('sandbox.script')"
          name="6"
        >
          <div class="vm-size">
            <p class="title-info">
              {{ $t('sandbox.useScript') }}
            </p>
            <el-radio-group
              class="common-radio work-radio"
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
                <div
                  class="edit-btn clear"
                >
                  <span class="title-info">{{ $t('sandbox.enterScriptContent') }}</span>
                  <el-button
                    id="btn_editVmScript"
                    class="rt"
                    v-if="viewOrEditContent === 'preview'"
                    @click.stop="clickEdit('content')"
                  >
                    {{ $t('common.edit') }}
                  </el-button>
                  <el-button
                    id="btn_saveVmScript"
                    class="rt"
                    v-else
                    @click.stop="clickEdit('content')"
                  >
                    {{ $t('common.save') }}
                  </el-button>
                </div>
                <mavon-editor
                  class="common-mavon-editor"
                  v-model="userData"
                  :toolbars-flag="false"
                  :subfield="false"
                  :default-open="viewOrEditContent"
                  :box-shadow="false"
                  preview-background="transparent"
                />
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="addVm-btn rt">
        <el-button
          id="btn_cancelAddVm"
          class="common-btn"
          @click="addVmFinish('cancel')"
        >
          {{ $t('normal.cancel') }}
        </el-button>
        <el-button
          id="btn_confirmAddVm"
          class="common-btn"
          @click="addVmFinish('confirm')"
        >
          {{ $t('normal.confirm') }}
        </el-button>
      </div>
    </div>
    <div
      v-else
      class="common-div-bg addVm-bg customSpecs"
    >
      <p class="customSpec-title defaultFontLight">
        <span />
        {{ $t('sandbox.customSpec') }}
      </p>
      <el-form
        :model="custom"
        :rules="customRule"
      >
        <el-form-item
          :label="$t('common.name')"
          prop="name"
        >
          <el-input
            v-model="custom.name"
            class="common-input"
          />
        </el-form-item>
        <el-form-item
          :label="$t('sandbox.useCase')"
          prop="description"
        >
          <el-input
            v-model="custom.description"
            class="common-input"
          />
        </el-form-item>
        <el-form-item
          label="CPU"
          prop="cpu"
        >
          <el-select
            v-model="custom.cpu"
          >
            <el-option
              v-for="item in cpuSpecs"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('sandbox.memory')"
          prop="memory"
        >
          <el-select
            v-model="custom.memory"
          >
            <el-option
              v-for="item in memorySpecs"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('sandbox.systemDisk')"
          prop="systemDiskSize"
        >
          <el-input-number
            v-model="custom.systemDiskSize"
            :min="50"
            :max="100"
          />
          <p class="company">
            GB
          </p>
        </el-form-item>
        <el-form-item
          :label="$t('sandbox.dataDisk')"
          prop="dataDiskSize"
        >
          <el-input-number
            v-model="custom.dataDiskSize"
            :min="10"
            :max="200"
          />
          <p class="company">
            GB
          </p>
        </el-form-item>
        <el-form-item
          :label="$t('sandbox.type')"
          prop="architecture"
        >
          <el-select
            v-model="custom.architecture"
            :placeholder="$t('sandbox.typeTip')"
          >
            <el-option
              v-for="item in architectureSpecs"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="GPU">
          <el-input
            v-model="custom.gpuExtraInfo"
            class="common-input"
          />
        </el-form-item>
        <el-form-item :label="$t('sandbox.otherCapability')">
          <el-input
            v-model="custom.otherExtraInfo"
            class="common-input"
          />
        </el-form-item>
        <el-form-item class="rt specsBtn">
          <el-button
            class="common-btn defaultFontLight"
            @click="cancleSpecks()"
          >
            {{ $t('common.cancel') }}
          </el-button>
          <el-button
            class="common-btn defaultFontLight"
            @click="addSpecks()"
          >
            {{ $t('common.confirm') }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { sandbox } from '../../../../api/developerApi.js'
import { filterArr } from '../../../../tools/common.js'
export default {
  name: 'AddVm',
  props: {
    isAddVmProp: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      language: localStorage.getItem('language'),
      activeNames: ['1'],
      addvmImages: {
        name: '',
        flavorId: '',
        imageId: '',
        vmCertificate: {
          certificateType: 'PASSWORD',
          pwdCertificate: {
            password: '',
            username: ''
          },
          keyPairCertificate: null
        },
        areaZone: 'nova',
        userData: null,
        flavorExtraSpecs: null,
        portList: []
      },
      vmInfo: {
        archType: 'X86',
        publicSystemName: '',
        privateSystemName: '',
        publicSystemType: [],
        publicSystemImage: [],
        publicImageOptions: [],
        privateSystemType: [],
        privateSystemImage: [],
        privateImageOptions: [],
        vmRegulationList: [],
        osNameOptionList: [],
        publicId: '',
        privateId: '',
        imageType: 'public'
      },
      vmNetworkList: [],
      selectedNetworks: [],
      vmSpecs: [],
      queryImage: {
        name: '',
        visibleType: '',
        osType: '',
        status: 'PUBLISHED',
        uploadTimeBegin: '',
        queryCtrl: {
          offset: 0,
          limit: 10,
          sortBy: 'uploadTime',
          sortOrder: 'Desc'
        }
      },
      customSpecs: false,
      imageList: [],
      custom: {
        id: '',
        name: '',
        cpu: 1,
        description: '',
        architecture: '',
        memory: 1,
        dataDiskSize: 10,
        systemDiskSize: 1,
        gpuExtraInfo: '',
        otherExtraInfo: ''
      },
      customRule: {
        name: [
          { required: true }
        ],
        cpu: [
          { required: true }
        ],
        description: [
          { required: true }
        ],
        architecture: [
          { required: true }
        ],
        dataDiskSize: [
          { required: true }
        ],
        systemDiskSize: [
          { required: true }
        ],
        memory: [
          { required: true }
        ]
      },
      cpuSpecs: [{
        value: 1,
        label: '1vCPU'
      }, {
        value: 2,
        label: '2vCPU'
      }, {
        value: 4,
        label: '4vCPU'
      }, {
        value: 8,
        label: '8vCPU'
      }, {
        value: 16,
        label: '16vCPU'
      }],
      memorySpecs: [{
        value: 1,
        label: '1GB'
      }, {
        value: 2,
        label: '2GB'
      }, {
        value: 4,
        label: '4GB'
      }, {
        value: 8,
        label: '8GB'
      }, {
        value: 16,
        label: '16GB'
      }, {
        value: 32,
        label: '32GB'
      }],
      architectureSpecs: [{
        value: 'X86',
        label: 'X86'
      }, {
        value: 'ARM',
        label: 'ARM'
      } ],
      isInjectScript: 'cancel',
      changeResult: false,
      activeScriptEditPanel: '1',
      viewOrEditContent: 'preview',
      viewOrEditParams: 'preview',
      viewOrEditFlavor: 'preview',
      userData: '',
      flavorExtraSpecs: '',
      applicationId: sessionStorage.getItem('applicationId') || '',
      vmId: '',
      isAddVm: this.isAddVmProp
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    },
    isAddVmProp (val) {
      this.isAddVm = val
      this.handleAddVmData(val)
    }
  },
  methods: {
    getVmSpecs () {
      sandbox.getVmspec().then(res => {
        if (res.data && res.data.length <= 0) {
          return
        }
        this.vmSpecs = res.data
        this.filterVmRegulation()
      }).catch(err => {
        console.log(err)
      })
    },
    getInternetType () {
      sandbox.getAllInternetType(this.applicationId).then(res => {
        if (res.data && res.data.length <= 0) {
          return
        }
        this.vmNetworkList = res.data
        this.$emit('getNetWorkList', res.data)
      }).catch(err => {
        console.log(err)
      })
    },
    getVmImageLists () {
      sandbox.getVmImageList(this.queryImage).then(res => {
        if (res.data && res.data.length <= 0) {
          return
        }
        this.imageList = res.data.imageList
        this.imageList.forEach(item => {
          if (item.visibleType === 'public') {
            this.vmInfo.publicSystemType.push(item.osType)
            this.vmInfo.publicSystemImage.push({ systemType: item.osType, systemImage: item.name + '[' + item.osVersion + ' ' + item.osBitType + '(' + item.systemDiskSize + 'GB)]', id: item.id })
          } else {
            this.vmInfo.privateSystemType.push(item.osType)
            this.vmInfo.privateSystemImage.push({ systemType: item.osType, systemImage: item.name + '[' + item.osVersion + ' ' + item.osBitType + '(' + item.systemDiskSize + 'GB)]', id: item.id })
          }
        })
        this.vmInfo.publicSystemType = filterArr(this.vmInfo.publicSystemType)
        this.vmInfo.privateSystemType = filterArr(this.vmInfo.privateSystemType)
      }).catch(err => {
        console.log(err)
      })
    },
    addVmInfo () {
      this.validateInput()
    },
    changeImageType (data) {
      this.vmInfo.imageType = data
      data === 'public' ? this.vmInfo.privateSystemName = '' : this.vmInfo.publicSystemName = ''
      data === 'public' ? this.vmInfo.privateImageOptions = '' : this.vmInfo.publicImageOptions = ''
      data === 'public' ? this.vmInfo.privateId = '' : this.vmInfo.publicId = ''
    },
    validateInput () {
    },
    handleChangeArch () {
      this.filterVmRegulation()
      this.addvmImages.flavorId = -1
    },
    filterVmRegulation () {
      this.vmInfo.vmRegulationList = this.vmSpecs.filter(item => item.architecture === this.vmInfo.archType)
    },
    changePublicType (data) {
      this.vmInfo.publicId = ''
      this.vmInfo.publicImageOptions = []
      sandbox.getScriptByImageId(data).then(res => {
        this.userData = res.data
        this.flavorExtraSpecs = ''
      })
      this.vmInfo.publicSystemImage.forEach(item => {
        if (item.systemType === data) {
          this.vmInfo.publicImageOptions.push(item)
        }
      })
    },
    changePrivateType (data) {
      this.vmInfo.privateId = ''
      this.vmInfo.privateImageOptions = []
      sandbox.getScriptByImageId(data).then(() => {

      })
      this.vmInfo.privateSystemImage.forEach(item => {
        if (item.systemType === data) {
          this.vmInfo.privateImageOptions.push(item)
        }
      })
    },
    appendCPUUnit (row) {
      return row.cpu + 'vCPU'
    },
    appendSizeUnit (row, column, cellValue) {
      return cellValue + 'GB'
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
    },
    changeInternet (data) {
      this.addvmImages.portList = []
      this.vmNetworkList.forEach(item => {
        data.forEach(items => {
          if (item.name === items) {
            this.addvmImages.portList.push({ name: item.name, description: item.description, networkName: item.name, id: item.id })
          }
        })
      })
    },
    addSpecForm () {
      this.customSpecs = true
    },
    addSpecks () {
      let _customs = this.custom.name !== '' && this.custom.description !== '' && this.custom.architecture !== '' && this.custom.dataDiskSize !== '' && this.custom.systemDiskSize !== ''
      if (_customs) {
        sandbox.addCustom(this.custom).then(() => {
          this.$eg_messagebox(this.$t('sandboxPromptInfomation.addCustomSuccess'), 'success')
          this.getVmSpecs()
          this.customSpecs = false
          this.custom = {
            id: '',
            name: '',
            cpu: 1,
            description: '',
            architecture: '',
            memory: 1,
            dataDiskSize: 10,
            systemDiskSize: 1,
            gpuExtraInfo: '',
            otherExtraInfo: ''
          }
        }).catch(() => {
        })
      } else {
        this.$eg_messagebox(this.$t('sandboxPromptInfomation.completeContent'), 'warning')
      }
    },
    cancleSpecks () {
      this.customSpecs = false
      this.custom = {
        id: '',
        name: '',
        cpu: 1,
        description: '',
        architecture: '',
        memory: 1,
        dataDiskSize: 10,
        systemDiskSize: 1,
        gpuExtraInfo: '',
        otherExtraInfo: ''
      }
    },
    addVmFinish (type) {
      let _data = []
      if (type === 'confirm') {
        if (this.changeResult) {
          this.addvmImages.userData = this.userData
          this.addvmImages.flavorExtraSpecs = this.flavorExtraSpecs
        } else {
          this.addvmImages.userData = ''
          this.addvmImages.flavorExtraSpecs = this.flavorExtraSpecs
        }
        if (this.isAddVm) {
          this.vmInfo.publicId === '' ? this.addvmImages.imageId = this.vmInfo.privateId : this.addvmImages.imageId = this.vmInfo.publicId
        }
        let _addVmImagesVal = this.addvmImages.name !== '' && this.addvmImages.imageId !== '' && this.addvmImages.vmCertificate.pwdCertificate.password !== '' && this.addvmImages.vmCertificate.pwdCertificate.username !== '' && this.addvmImages.portList !== ''
        if (_addVmImagesVal) {
          if (this.isAddVm) {
            sandbox.addVmImage(this.applicationId, this.addvmImages).then(() => {
              this.$eg_messagebox(this.$t('sandboxPromptInfomation.addVmSuccess'), 'success')
              _data = this.selectedNetworks
              this.$emit('addVmFinish', _data)
            }).catch(err => {
              console.log(err)
            })
          } else {
            sandbox.editVmDetail(this.applicationId, this.vmId, this.addvmImages).then(() => {
              _data = this.selectedNetworks
              this.$emit('addVmFinish', _data)
            }).catch(err => {
              console.log(err)
            })
          }
        } else {
          this.$eg_messagebox(this.$t('sandboxPromptInfomation.completeContent'), 'warning')
        }
      } else {
        this.$emit('addVmFinish', _data)
      }
    },
    editVmDetail () {
      let _this = this
      this.bus.$on('editVmDetail', function (data) {
        _this.handleVmData(data)
        _this.getVmDetailImage(data.imageId)
      })
    },
    handleVmData (vmDetail) {
      this.addvmImages = vmDetail
      this.vmId = vmDetail.id
      this.selectedNetworks = []
      vmDetail.portList.forEach(item => {
        this.selectedNetworks.push(item.networkName)
      })
    },
    getVmDetailImage (imageId) {
      sandbox.getVmDetailImage(imageId).then(res => {
        if (!res.data) {
          return
        }
        this.vmInfo.imageType = res.data.visibleType
        res.data.visibleType === 'public' ? this.vmInfo.publicSystemName = res.data.osType : this.vmInfo.privateSystemName = res.data.osType
        res.data.visibleType === 'public' ? this.vmInfo.publicId = res.data.osType + ' ' + res.data.osVersion + ' ' + res.data.osBitType + ' (' + res.data.systemDiskSize + 'GB Disk)' : this.vmInfo.privateId = res.data.osType + ' ' + res.data.osVersion + ' ' + res.data.osBitType + ' (' + res.data.systemDiskSize + 'GB Disk)'
        this.addvmImages.imageId = imageId
      })
    },
    handleAddVmData (isAddVm) {
      if (isAddVm) {
        this.addvmImages = {
          name: '',
          flavorId: '',
          imageId: '',
          vmCertificate: {
            certificateType: 'PASSWORD',
            pwdCertificate: {
              password: '',
              username: ''
            },
            keyPairCertificate: null
          },
          areaZone: 'nova',
          userData: null,
          flavorExtraSpecs: null,
          portList: []
        }
        this.vmInfo = {
          archType: 'X86',
          publicSystemName: '',
          privateSystemName: '',
          publicSystemType: [],
          publicSystemImage: [],
          publicImageOptions: [],
          privateSystemType: [],
          privateSystemImage: [],
          privateImageOptions: [],
          vmRegulationList: [],
          osNameOptionList: [],
          publicId: '',
          privateId: '',
          imageType: 'public'
        }
        this.filterVmRegulation()
        this.getInternetType()
        this.getVmImageLists()
      }
    }
  },
  mounted () {
    this.editVmDetail()
    this.handleAddVmData(this.isAddVm)
    this.getVmSpecs()
    this.getInternetType()
    this.getVmImageLists()
  }
}
</script>

<style lang="less">
.addVm{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position:relative;
  padding-top:10px ;
  font-size: 16px;
  animation: delay 0.5s  ease-in-out;
  animation-fill-mode: both;
  p{
    font-weight: lighter !important;
  }
  @keyframes delay {
    0%{
      transform:scale(0.25);
    }
    100%{
      transform:scale(1)
    }
  }
  .addVm-bg{
    position: absolute;
    width: 80%;
    min-width: 1000px;
    padding: 40px;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    .el-collapse-item__header,.el-collapse-item__content{
      font-size: 18px;
      color: #fff;
    }
    .el-collapse-item__content::after{
      display: block;
      content: '';
      clear: both;
    }
    .vm-info{
      margin: 0 0 30px 0px;
      .addVm-top-title{
        float: left;
        width: 33%;
        display: flex;
        margin: 20px 0px;
        p{
          width: 100px;
          line-height: 25px;
          text-align: right;
          margin-right: 10px;
          span{
            color: red;
            line-height: 25px;
          }
        }
        .el-input{
          width: calc(100% - 100px);
        }
        .el-input__inner{
          width: 100%;
          height: 25px;
          background-color: rgba(255, 255, 255, 0.3);
          color: #fff;
          border: none;
        }
      }
    }
    .addVm-btn{
      margin-right: 30px;
    }
  }
  .customSpecs{
    width:777px;
    height:454px;
    .customSpec-title{
      display: flex;
      span{
        background-color: #76E1E9;
        width: 9px;
        height: 9px;
        border-radius: 50%;
        margin: 6px 6px 0 0;
        display: flex;
      }
      margin: 0 0 30px 0;
    }
    .el-form{
      display: flex;
      flex-wrap: wrap;
      width: 690px;
      justify-content: space-between;
      .el-form-item{
        display: flex;
        .el-form-item__content {
          display: flex;
          width: 215px;
          .el-input-number__increase {
            right: 1px;
            height: 30px;
            border:none ;
            background-color: rgba(255,255,255,.45);
          }
          .el-input-number__decrease{
            height: 30px;
            background-color: rgba(255,255,255,.45);
          }
          .el-icon-plus:before {
            position: relative;
            top: -3px;
            color: #4E3494;
          }
          .el-icon-minus:before {
            position: relative;
            top: -3px;
            color: #4E3494;
          }
          .el-input-number .el-input__inner {
            text-align: center;
            background-color: rgba(255,255,255,.45);
            border: none;
            position: relative;
            top: -3px;
          }
        }
        .el-form-item__label{
          width: 123px;
          height: 30px;
          line-height: 30px;
          text-align: right;
          font-family: defaultFontLight,
            Arial,
            Helvetica,
            sans-serif !important;
        }
        .el-select{
          width: 83%;
          .el-input--suffix .el-input__inner {
            background-color: rgba(255,255,255,.45);
            border: none;
          }
          .el-select__caret {
              line-height: 30px;
          }
        }
        .el-input__inner{
          color: #fff;
        }
        .company{
          position: relative;
          left: -74px;
          top: 1px;
          color: fff;
          font-size: 12px;
        }
      }
      .specsBtn{
        position: relative;
        top:60px;
        left: -40px;
      }
    }
  }
  .el-collapse {
    border-top:none;
    border-bottom:none;
    .el-checkbox__label{
      padding-left: 12px;
    }
    .el-link--inner{
      p{
        color: #cfccdb;
      }
    }
    .el-collapse-item__header{
      height: 45px;
      background: none;
      border-bottom:none;
      padding-left: 20px;
      font-size: 22px;
    }
    .el-collapse-item__header:before{
      display: inline-block;
      content: '';
      width: 9px;
      height: 9px;
      background: #43F6AD;
      border-radius: 50%;
      position: relative;
      top: 1px;
      left: -10px;
    }
    .el-collapse-item__header:hover{
      background-color: #5f499d;
      border-radius: 19.5px;
      color: #fff;
    }
    .el-collapse-item__header:hover .el-icon-arrow-right:before{
      background: url('../../../../assets/images/sandbox/addvm_icon_down.png');
    }
    .el-collapse-item__header.is-active{
      border-radius: 19.5px;
      color: #fff;
    }
    .el-collapse-item__header .el-icon-arrow-right:before{
      content: '';
      display: block;
      width: 16px;
      height: 16px;
    }
    .el-collapse-item__header.is-active .el-icon-arrow-right:before{
      background: url('../../../../assets/images/sandbox/addvm_icon_up.png');
      transform: rotate(-90deg);
    }
    .el-collapse-item__arrow{
      margin: 0 16px 0 auto;
    }
    .el-collapse-item__wrap{
      padding: 0 8px;
      background: none;
      border-bottom:none;
      .internetInfos{
        margin-top: 30px;
      }
      .selectImage-content{
        margin-left: 16px;
        margin-top: 22px;
        .selectImage-public{
          display: flex;
          margin-bottom: 20px;
          .el-radio{
            height: 25px;
            line-height: 25px;
            margin-right: 20px;
          }
          .el-radio__input.is-checked + .el-radio__label {
            color: #fff;
          }
          .el-select{
            width: 264px;
            margin-right: 80px;
            .el-input__inner{
              height: 25px !important;
              background-color: rgba(255, 255, 255, 0.3);
              border: none;
              color: #fff;
              font-family: defaultFontLight,
                Arial,
                Helvetica,
                sans-serif !important;
            }
            .el-icon-arrow-up {
              font-size: 16px;
              position: relative;
              line-height: 25px;
            }
          }
        }
      }
      .simulator-info-content{
        .el-radio-group{
          margin: 15px 0 20px 15px;
          .el-radio-button__inner {
            font-size: 16px;
            background: none;
            color: #fff;
            border: none;
            border-bottom:2px solid #4E3494;
          }
          .el-radio-button__orig-radio:checked + .el-radio-button__inner {
            background-color: none;
            border-bottom:2px solid #43F6AD ;
            box-shadow: none;
          }
          .el-radio-button:first-child .el-radio-button__inner,.el-radio-button:last-child .el-radio-button__inner{
            border-radius: 2px;
          }
        }
        .custom-specs{
          position: relative;
          top: 22px;
          left: 16px;
          height: 33px;
          font-size: 14px;
          border-bottom:2px solid #4E3494;
        }
        .custom-specs:hover{
          border-bottom:2px solid #43F6AD;
        }
      }
      .vm-size{
        margin: 10px 0;
        .scriprt-madgin{
          margin-left: 24px;
        }
      }
      .vm-table{
        padding-left: 10px;
        border: 1px solid red;
        thead tr{
          height: 50px;
        }
        th.el-table__cell.is-leaf {
          border-bottom: none;
        }
        td.el-table__cell, .el-table th.el-table__cell.is-leaf {
          border-bottom: 1px solid #4E3494;
        }
      }
      .title-info{
        display: inline-block;
        height: 30px;
        line-height: 30px;
        font-family: defaultFontLight,Arial, Helvetica, sans-serif;
        font-size: 16px;
        padding-left: 15px;
      }
      .work-radio{
        display: block;
        margin: 15px 0 0 15px;
      }
      .edit-btn{
        margin: 15px 0;
        .el-button{
          background: #4e3494;
          border: none;
          border-radius: 35px;
          padding: 8px 24px;
          color: #fff;
        }
      }
    }
    .v-note-wrapper{
      background-color: #4e3494;
    }
    .markdown-body,.auto-textarea-wrapper .auto-textarea-input{
      color: #fff;
      font-size: 14px;
    }
    .markdown-body pre,.hljs{
      background-color: #4e3494;
      color: #fff;
    }
  }
}
</style>
