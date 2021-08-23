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
  <div class="configVisual">
    <!-- Add Pod -->
    <div class="pod-wrapper">
      <div class="add-btn-wrapper outer">
        <el-button
          class="add-btn"
          type="primary"
          @click="addPod"
        >
          <i class="el-icon-circle-plus-outline" /><span>Pod</span>
        </el-button>
      </div>
      <div
        class="pod-content work-div"
        v-for="(itemPod,indexPod) in podData"
        :key="'pod-'+ indexPod"
      >
        <div class="pod-content-basic">
          <div class="pod-content-basic__header">
            <div class="title">
              {{ $t('workspace.visualConfig.podBasicInfo') }}
            </div>
            <el-button
              class="delete"
              type="text"
              @click="deletePod(indexPod)"
              v-if="podData.length>1"
            >
              {{ $t('devTools.delete') }}
            </el-button>
          </div>
          <el-form
            class="pod-content-basic__body work-input"
            label-width="110px"
            size="small"
            :inline="true"
            :model="itemPod.metadata"
          >
            <el-form-item
              label="pod Name"
              class="required"
            >
              <el-input
                v-model="itemPod.metadata.name"
                placeholder=""
                @blur="checkInputName(itemPod.metadata)"
              />
              <p
                class="errInfo"
                v-show="itemPod.metadata.showName"
              >
                {{ $t('workspace.visualConfig.podNameVerify') }}
              </p>
            </el-form-item>
            <el-form-item
              label="apiVersion"
            >
              <el-input
                v-model="itemPod.apiVersion"
                placeholder="v1"
                :disabled="true"
              />
            </el-form-item>
            <el-form-item
              label="namespace"
            >
              <el-input
                v-model="itemPod.metadata.namespace"
                placeholder="default"
                :disabled="true"
              />
            </el-form-item>
            <el-form-item
              label="kind"
            >
              <el-input
                v-model="itemPod.kind"
                placeholder="Pod"
                :disabled="true"
              />
            </el-form-item>
          </el-form>
        </div>
        <div class="pod-content-container">
          <div class="add-btn-wrapper">
            <el-button
              class="add-btn"
              type="primary"
              @click="addContainer(indexPod)"
            >
              <i class="el-icon-circle-plus-outline" /><span>{{ $t('workspace.visualConfig.workContainer') }}</span>
            </el-button>
          </div>
          <div
            class="pod-content-container-item"
            v-for="(itemContainer,indexContainer) in itemPod.spec.containers"
            :key="indexContainer"
          >
            <div class="pod-content-container-item__header">
              <div class="title">
                {{ $t('workspace.visualConfig.workContainer') }}
              </div>
              <el-button
                class="delete"
                type="text"
                @click="deleteContainer(indexPod,indexContainer)"
                v-if="itemPod.spec.containers.length>1"
              >
                {{ $t('devTools.delete') }}
              </el-button>
            </div>
            <div class="pod-content-container-item__body">
              <el-form
                class="work-input"
                label-width="110px"
                size="small"
                :model="itemContainer"
                :inline="true"
              >
                <el-form-item
                  :label="$t('workspace.containerName')"
                  class="required"
                  :class="{'span_left_en':language==='en'}"
                >
                  <el-input
                    v-model="itemContainer.name"
                    :placeholder="$t('common.input')+$t('workspace.containerName')"
                    @blur="checkInputName(itemContainer)"
                  />
                  <p
                    class="errInfo"
                    v-show="itemContainer.showName"
                  >
                    {{ $t('workspace.visualConfig.containerNameVerify') }}
                  </p>
                </el-form-item>
                <el-form-item
                  :label="$t('workspace.configYaml.imageInfo')"
                  class="required"
                  :class="{'span_left_en':language==='en'}"
                >
                  <el-input
                    v-model="itemContainer.image"
                    placeholder="imageName:version"
                    @blur="checkInputImage(itemContainer)"
                  />
                  <p
                    class="errInfo"
                    v-show="itemContainer.showImage"
                  >
                    {{ $t('workspace.visualConfig.imageInfoVerify') }}
                  </p>
                </el-form-item>
                <el-form-item
                  :label="$t('workspace.visualConfig.pullStrategy')"
                  class="required"
                  :class="{'span_left_en':language==='en'}"
                >
                  <el-select
                    v-model="itemContainer.imagePullPolicy"
                  >
                    <el-option
                      v-for="itemPullPolicy in optionsPullPolicy"
                      :key="itemPullPolicy.value"
                      :label="itemPullPolicy.label"
                      :value="itemPullPolicy.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  :label="$t('workspace.visualConfig.internalPort')"
                  class="required"
                  :class="{'span_left_en':language==='en'}"
                >
                  <el-input
                    v-model.number="itemContainer.ports[0].containerPort"
                    placeholder="1-65535"
                    @blur="checkInputInPort(itemContainer.ports[0])"
                  />
                  <p
                    class="errInfo"
                    v-show="itemContainer.ports[0].showInPort"
                  >
                    {{ $t('workspace.visualConfig.internalPortVerify') }}
                  </p>
                </el-form-item>
                <el-form-item
                  :label="$t('workspace.visualConfig.envVariable')"
                  class="env_item"
                  :class="{'span_left_en':language==='en'}"
                >
                  <div v-show="showEnv">
                    <div
                      v-for="(itemEnv,indexEnv) in itemContainer.env"
                      :key="indexEnv"
                      class="pod-content-container__item-envs"
                    >
                      <el-input
                        class="variable-name"
                        v-model="itemEnv.name"
                        :placeholder="$t('workspace.visualConfig.variableName')"
                      />
                      <span class="equal">=</span>
                      <el-input
                        class="variable-value"
                        v-model="itemEnv.value"
                        :placeholder="$t('workspace.visualConfig.variableValue')"
                      />
                      <p
                        class="deleteLine"
                      >
                        <el-button
                          type="text"
                          class="delete-variable-button"
                          @click="deletePodEnv(indexPod,indexContainer,indexEnv)"
                        >
                          {{ $t('devTools.delete') }}
                        </el-button>
                      </p>
                    </div>
                  </div>
                  <el-button
                    class="add-envs-variable-button"
                    type="primary"
                    @click="addPodEnv(indexPod,indexContainer)"
                  >
                    {{ $t('workspace.add') }}
                  </el-button>
                </el-form-item>
                <el-form-item
                  :label="$t('workspace.visualConfig.commandLine')"
                  :class="{'span_left_en':language==='en'}"
                >
                  <el-input
                    v-model="itemContainer.command"
                    placeholder="eg(normal linux cmd line)：tail -f xxxx/xxxx.log"
                  />
                </el-form-item>
                <div
                  class="resources-wrapper"
                >
                  <div class="resources-wrapper__header">
                    <div class="resources-wrapper__header-title">
                      {{ $t('workspace.containerResource') }}
                    </div>
                    <div
                      class="resources-wrapper__header-arrow"
                      @click="changeResourceDisplayStatus(itemContainer)"
                    >
                      <i
                        class="el-icon-arrow-down"
                        :class="[itemContainer.showResource ? 'up': 'down']"
                      />
                    </div>
                  </div>
                  <transition name="slide-fade">
                    <el-row
                      v-show="itemContainer.showResource"
                      class="resources-wrapper__body"
                      :gutter="24"
                    >
                      <div class="resources-wrapper__item">
                        <p class="resources-wrapper__item-title">
                          limits
                        </p>
                        <div class="resources-wrapper__item-content">
                          <el-col :span="12">
                            <p class="resources-item__label">
                              memory
                            </p>
                            <el-input
                              size="small"
                              class="resources-item__input"
                              v-model="itemContainer.resources.limits.memory"
                              placeholder="100Mi"
                            />
                          </el-col>
                          <el-col :span="12">
                            <p class="resources-item__label">
                              cpu
                            </p>
                            <el-input
                              size="small"
                              class="resources-item__input"
                              v-model="itemContainer.resources.limits.cpu"
                              placeholder="1"
                            />
                          </el-col>
                        </div>
                      </div>
                      <div class="resources-wrapper__item">
                        <p class="resources-wrapper__item-title">
                          requests
                        </p>
                        <div class="resources-wrapper__item-content">
                          <el-col :span="12">
                            <p class="resources-item__label">
                              memory
                            </p>
                            <el-input
                              size="small"
                              class="resources-item__input"
                              v-model="itemContainer.resources.requests.memory"
                              placeholder="100Mi"
                            />
                          </el-col>
                          <el-col :span="12">
                            <p class="resources-item__label">
                              cpu
                            </p>
                            <el-input
                              size="small"
                              class="resources-item__input"
                              v-model="itemContainer.resources.requests.cpu"
                              placeholder="1"
                            />
                          </el-col>
                        </div>
                      </div>
                    </el-row>
                  </transition>
                </div>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Add Service -->
    <div class="service-wrapper">
      <div class="add-btn-wrapper outer">
        <el-button
          class="add-btn"
          type="primary"
          @click="addService"
        >
          <i class="el-icon-circle-plus-outline" /><span>Service</span>
        </el-button>
      </div>
      <div
        class="service-content work-div"
        v-for="(itemService,indexService) in serviceData"
        :key="'service-'+ indexService"
      >
        <div class="service-content-basic__header">
          <div class="title">
            {{ $t('workspace.visualConfig.accessMethod') }}
          </div>
          <el-button
            class="delete"
            type="text"
            @click="deleteService(indexService)"
            v-if="serviceData.length>1"
          >
            {{ $t('devTools.delete') }}
          </el-button>
        </div>
        <div class="service-content-basic__body">
          <el-form
            class="work-input"
            label-width="110px"
            size="small"
            :inline="true"
            :model="itemService"
          >
            <el-form-item
              label="service Name"
              class="required"
            >
              <el-input
                v-model="itemService.metadata.name"
                @blur="checkInputName(itemService.metadata)"
              />
              <p
                class="errInfo"
                v-show="itemService.metadata.showName"
              >
                {{ $t('workspace.visualConfig.serviceNameVerify') }}
              </p>
            </el-form-item>
            <el-form-item
              label="apiVersion"
            >
              <el-input
                v-model="itemService.apiVersion"
                placeholder="v1"
                :disabled="true"
              />
            </el-form-item>
            <el-form-item
              label="kind"
            >
              <el-input
                v-model="itemService.kind"
                placeholder="Service"
                :disabled="true"
              />
            </el-form-item>
            <el-form-item
              label="namespace"
            >
              <el-input
                v-model="itemService.metadata.namespace"
                placeholder="default"
                :disabled="true"
              />
            </el-form-item>
            <el-form-item
              :label="$t('system.type')"
            >
              <el-input
                v-model="itemService.spec.type"
                placeholder="NodePort"
                :disabled="true"
              />
            </el-form-item>
          </el-form>
          <div class="add-btn-wrapper">
            <el-button
              class="add-btn"
              type="primary"
              @click="addServicePort(indexService)"
            >
              <i class="el-icon-circle-plus-outline" /><span>{{ $t('workspace.port') }}</span>
            </el-button>
          </div>
          <div
            class="service-content-port__wrapper"
            v-for="(itemPorts,indexPorts) in itemService.spec.ports"
            :key="indexPorts"
          >
            <div class="service-content-port__header">
              <div class="title">
                {{ $t('workspace.port') }}
              </div>
              <el-button
                class="delete"
                type="text"
                @click="deleteServicePort(indexService,indexPorts)"
                v-if="itemService.spec.ports.length>1"
              >
                {{ $t('devTools.delete') }}
              </el-button>
            </div>
            <el-form
              class="service-content-port__item work-input"
              label-width="110px"
              size="small"
              :inline="true"
              :model="itemPorts"
            >
              <el-form-item
                :label="$t('workspace.visualConfig.internalPort')"
                class="required"
              >
                <el-input
                  v-model.number="itemPorts.port"
                  placeholder="9997"
                  @blur="checkInputPort(itemPorts)"
                />
                <p
                  class="errInfo"
                  v-show="itemPorts.showPort"
                >
                  {{ $t('workspace.visualConfig.internalPortVerify') }}
                </p>
              </el-form-item>
              <el-form-item
                :label="$t('workspace.visualConfig.destinationPort')"
                class="required"
              >
                <el-input
                  v-model.number="itemPorts.targetPort"
                  placeholder="9997"
                  @blur="checkInputTargetPort(itemPorts)"
                />
                <p
                  class="errInfo"
                  v-show="itemPorts.showTargetPort"
                >
                  {{ $t('workspace.visualConfig.destinationPortVerify') }}
                </p>
              </el-form-item>
              <el-form-item
                :label="$t('workspace.visualConfig.nodePort')"
                class="required"
              >
                <el-input
                  v-model.number="itemPorts.nodePort"
                  placeholder="9997"
                  @blur="checkInputNodePort(itemPorts)"
                />
                <p
                  class="errInfo"
                  v-show="itemPorts.showNodePort"
                >
                  {{ $t('workspace.visualConfig.nodePortVerify') }}
                </p>
              </el-form-item>
              <el-form-item
                :label="$t('workspace.protocol')"
              >
                <el-select
                  v-model="itemPorts.protocol"
                >
                  <el-option
                    v-for="itemProtocol in optionsProtocol"
                    :key="itemProtocol.value"
                    :label="itemProtocol.label"
                    :value="itemProtocol.value"
                  />
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <div class="submit-btn-wrapper">
      <el-button
        class="button"
        v-if="viewConfigFileBtn"
        @click="viewConfigFile"
      >
        {{ $t('workspace.visualConfig.viewYamlFile') }}
      </el-button>
      <el-button
        class="button"
        @click="saveConfig"
      >
        {{ $t('workspace.saveData') }}
      </el-button>
    </div>
    <el-dialog
      class="visual-config-dialog"
      :title="$t('workspace.visualConfig.visualConfigFile')"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
    >
      <div class="file-content">
        <mavon-editor
          v-model="markdownSource"
          :toolbars-flag="false"
          :subfield="false"
          :default-open="viewOrEdit"
          :box-shadow="false"
          preview-background="#ffffff"
        />
      </div>
      <span
        slot="footer"
      >
        <el-button
          v-show="!isEditFile"
          @click="editConfigFile"
        >
          {{ $t('common.edit') }}
        </el-button>
        <el-button
          v-show="isEditFile"
          @click="saveConfigFile"
        >
          {{ $t('common.save') }}
        </el-button>
        <el-button
          type="primary"
          @click="configEditFile"
        >
          {{ $t('common.confirm') }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Workspace } from '../../tools/api.js'
export default {
  name: '',
  props: {
    allStepData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      language: localStorage.getItem('language'),
      configData: {
        deployYamls: []
      },
      podData: [
        {
          apiVersion: 'v1',
          kind: 'Pod',
          metadata: {
            name: '',
            showName: false,
            namespace: 'default',
            labels: {
              app: ''
            }
          },
          spec: {
            containers: [
              {
                name: '',
                showName: false,
                image: '',
                showImage: false,
                imagePullPolicy: 'Always',
                env: [
                  {
                    name: '',
                    value: ''
                  }
                ],
                ports: [
                  {
                    containerPort: 9997,
                    showInPort: false
                  }
                ],
                command: '',
                resources: {
                  limits: {
                    memory: '',
                    cpu: ''
                  },
                  requests: {
                    memory: '',
                    cpu: ''
                  }
                },
                showResource: true
              }
            ]
          }
        }
      ],
      serviceData: [
        {
          apiVersion: 'v1',
          kind: 'Service',
          metadata: {
            name: '',
            showName: false,
            namespace: 'default',
            labels: {
              svc: ''
            }
          },
          spec: {
            ports: [
              {
                port: 9997,
                showPort: false,
                targetPort: 9997,
                showTargetPort: false,
                protocol: 'TCP',
                nodePort: 32115,
                showNodePort: false
              }
            ],
            selector: {
              app: ''
            },
            type: 'NodePort'
          }
        }
      ],
      optionsPullPolicy: [
        {
          value: 'Always',
          label: 'Always'
        },
        {
          value: 'IfNotPresent',
          label: 'IfNotPresent'
        },
        {
          value: 'Never',
          label: 'Never'
        }
      ],
      optionsProtocol: [
        {
          value: 'TCP',
          label: 'TCP'
        },
        {
          value: 'UDP',
          label: 'UDP'
        }
      ],
      markdownSource: '',
      showConfigFile: false,
      showEnv: false,
      envDataNum: 1,
      userId: sessionStorage.getItem('userId'),
      projectId: sessionStorage.getItem('mecDetailID'),
      dialogVisible: false,
      projectBeforeConfig: {},
      appYamlFileId: '',
      isPostConfigVisual: false,
      viewOrEdit: 'preview',
      viewConfigFileBtn: false,
      isEditFile: false,
      ifSaveConfig: true
    }
  },
  methods: {
    // Add Pod
    addPod () {
      let podDataObj = {
        apiVersion: 'v1',
        kind: 'Pod',
        metadata: {
          name: '',
          showName: false,
          namespace: 'default',
          labels: {
            app: ''
          }
        },
        spec: {
          containers: [
            {
              name: '',
              showName: false,
              image: '',
              showImage: false,
              imagePullPolicy: 'Always',
              env: [
                {
                  name: '',
                  value: ''
                }
              ],
              ports: [
                {
                  containerPort: 9997,
                  showInPort: false
                }
              ],
              command: '',
              resources: {
                limits: {
                  memory: '',
                  cpu: ''
                },
                requests: {
                  memory: '',
                  cpu: ''
                }
              },
              showResource: true
            }
          ]
        }
      }
      this.podData.push(podDataObj)
    },
    deletePod (indexPod) {
      this.podData.splice(indexPod, 1)
    },
    // Add new working container
    addContainer (indexPod) {
      let obj = {
        name: '',
        showName: false,
        image: '',
        showImage: false,
        imagePullPolicy: 'Always',
        env: [
          {
            name: '',
            value: ''
          }
        ],
        ports: [
          {
            containerPort: 9997,
            showInPort: false
          }
        ],
        command: '',
        resources: {
          limits: {
            memory: '',
            cpu: ''
          },
          requests: {
            memory: '',
            cpu: ''
          }
        },
        showResource: true
      }
      this.podData[indexPod].spec.containers.push(obj)
    },
    deleteContainer (indexPod, indexContainer) {
      this.podData[indexPod].spec.containers.splice(indexContainer, 1)
    },
    // Add pod environment parameters
    addPodEnv (indexPod, indexContainer) {
      this.showEnv = true
      this.envDataNum += 1
      if (this.envDataNum > 2) {
        let objEnv = {
          name: '',
          value: ''
        }
        this.podData[indexPod].spec.containers[indexContainer].env.push(objEnv)
      }
    },
    deletePodEnv (indexPod, indexContainer, indexEnv) {
      this.podData[indexPod].spec.containers[indexContainer].env.splice(indexEnv, 1)
    },
    // Add Service
    addService () {
      let serviceDataObj = {
        apiVersion: 'v1',
        kind: 'Service',
        metadata: {
          name: '',
          showName: false,
          namespace: 'default',
          labels: {
            svc: ''
          }
        },
        spec: {
          ports: [
            {
              port: 9997,
              showPort: false,
              targetPort: 9997,
              showTargetPort: false,
              protocol: 'TCP',
              nodePort: 32115,
              showNodePort: false
            }
          ],
          selector: {
            app: ''
          },
          type: 'NodePort'
        }
      }
      this.serviceData.push(serviceDataObj)
    },
    deleteService (indexService) {
      this.serviceData.splice(indexService, 1)
    },
    // Add service port
    addServicePort (indexService) {
      let objPort = {
        port: 9997,
        showPort: false,
        targetPort: 9997,
        showTargetPort: false,
        protocol: 'TCP',
        nodePort: 32115,
        showNodePort: false
      }
      this.serviceData[indexService].spec.ports.push(objPort)
    },
    deleteServicePort (indexService, indexPorts) {
      this.serviceData[indexService].spec.ports.splice(indexPorts, 1)
    },
    checkInputName (value) {
      if (value.name === '') {
        value.showName = true
      } else {
        value.showName = false
      }
    },
    checkInputImage (value) {
      let arrTemp = value.image.split(':')
      if (value.image === '' || arrTemp.length !== 2) {
        value.showImage = true
      } else {
        value.showImage = false
      }
    },
    checkInputInPort (value) {
      if (value.containerPort === '') {
        value.showInPort = true
      } else if (value.containerPort < 1 || value.containerPort > 65535) {
        value.showInPort = true
      } else {
        value.showInPort = false
      }
    },
    checkInputPort (value) {
      if (value.port === '') {
        value.showPort = true
      } else if (value.port < 1 || value.port > 65535) {
        value.showPort = true
      } else {
        value.showPort = false
      }
    },
    checkInputTargetPort (value) {
      if (value.targetPort === '') {
        value.showTargetPort = true
      } else if (value.targetPort < 1 || value.targetPort > 65535) {
        value.showTargetPort = true
      } else {
        value.showTargetPort = false
      }
    },
    checkInputNodePort (value) {
      if (value.nodePort === '') {
        value.showNodePort = true
      } else if (value.nodePort < 1 || value.nodePort > 65535) {
        value.showNodePort = true
      } else {
        value.showNodePort = false
      }
    },
    // Check pod required fields
    checkPodDataRequired () {
      this.ifSaveConfig = true
      let podDatas = JSON.parse(JSON.stringify(this.podData))
      podDatas.forEach(itemPo => {
        itemPo.spec.containers.forEach(itemSub => {
          let arrTemp = itemSub.image.split(':')
          if (itemSub.image === '' || arrTemp.length !== 2) {
            this.$eg_messagebox({
              type: 'warning',
              title: '',
              desc: this.$t('workspace.visualConfig.imageInfoVerify'),
              cancelText: this.$t('common.cancelText')
            }).then(() => {}).catch(() => {})
            this.ifSaveConfig = false
          }
          if (itemSub.name === '') {
            this.$eg_messagebox({
              type: 'warning',
              title: '',
              desc: this.$t('workspace.visualConfig.containerNameVerify'),
              cancelText: this.$t('common.cancelText')
            }).then(() => {}).catch(() => {})
            this.ifSaveConfig = false
          }
          if (itemSub.ports[0].containerPort === undefined) {
            this.$eg_messagebox({
              type: 'warning',
              title: '',
              desc: this.$t('workspace.visualConfig.internalPortVerify'),
              cancelText: this.$t('common.cancelText')
            }).then(() => {}).catch(() => {})
            this.ifSaveConfig = false
          }
        })
        if (itemPo.metadata.name === '' || itemPo.metadata.name.toString().indexOf('_') !== -1) {
          this.$eg_messagebox({
            type: 'warning',
            title: '',
            desc: this.$t('workspace.visualConfig.podNameVerify'),
            cancelText: this.$t('common.cancelText')
          }).then(() => {}).catch(() => {})
          this.ifSaveConfig = false
        }
      })
      return this.ifSaveConfig
    },
    // Check pod service fields
    checkServiceDataRequired () {
      this.ifSaveConfig = true
      let serviceDatas = JSON.parse(JSON.stringify(this.serviceData))
      serviceDatas.forEach(itemSer => {
        itemSer.spec.ports.forEach(itemSub => {
          if (itemSub.nodePort === undefined) {
            this.$eg_messagebox({
              type: 'warning',
              title: '',
              desc: this.$t('workspace.visualConfig.nodePortVerify'),
              cancelText: this.$t('common.cancelText')
            }).then(() => {}).catch(() => {})
            this.ifSaveConfig = false
          }
          if (itemSub.targetPort === undefined) {
            this.$eg_messagebox({
              type: 'warning',
              title: '',
              desc: this.$t('workspace.visualConfig.destinationPortVerify'),
              cancelText: this.$t('common.cancelText')
            }).then(() => {}).catch(() => {})
            this.ifSaveConfig = false
          }
          if (itemSub.port === undefined) {
            this.$eg_messagebox({
              type: 'warning',
              title: '',
              desc: this.$t('workspace.visualConfig.internalPortVerify'),
              cancelText: this.$t('common.cancelText')
            }).then(() => {}).catch(() => {})
            this.ifSaveConfig = false
          }
        })
        if (itemSer.metadata.name === '' || itemSer.metadata.name.toString().indexOf('_') !== -1) {
          this.$eg_messagebox({
            type: 'warning',
            title: '',
            desc: this.$t('workspace.visualConfig.serviceNameVerify'),
            cancelText: this.$t('common.cancelText')
          }).then(() => {}).catch(() => {})
          this.ifSaveConfig = false
        }
      })
      return this.ifSaveConfig
    },
    deleteDataShow (podArr, serviceArr) {
      // process boolean variable called show
      let podDatasTemp = JSON.parse(JSON.stringify(this.podData))
      podDatasTemp.forEach(itemTemp => {
        delete itemTemp.metadata.showName
        itemTemp.spec.containers.forEach(itemCon => {
          delete itemCon.showName
          delete itemCon.showImage
          delete itemCon.showResource
          delete itemCon.ports[0].showInPort
        })
        podArr.push(itemTemp)
      })
      this.podData = podArr
      // delete boolean variable called show in service
      let serviceDatasTemp = JSON.parse(JSON.stringify(this.serviceData))
      serviceDatasTemp.forEach(itemTemp => {
        delete itemTemp.metadata.showName
        itemTemp.spec.ports.forEach(itemport => {
          delete itemport.showPort
          delete itemport.showTargetPort
          delete itemport.showNodePort
        })
        serviceArr.push(itemTemp)
      })
      this.serviceData = serviceArr
    },
    // Save config
    saveConfig () {
      let isSaveConfig = this.checkPodDataRequired() && this.checkServiceDataRequired()
      if (isSaveConfig) {
        let podArr = []
        let serviceArr = []
        if (this.ifSaveConfig) {
          this.deleteDataShow(podArr, serviceArr)
        }
        this.configData.deployYamls = []
        let podDataTemp = JSON.parse(JSON.stringify(this.podData))
        podDataTemp.forEach(podItem => {
          podItem.metadata.labels.app = podItem.metadata.name
          podItem.spec.containers.forEach(containersItem => {
            containersItem.image = '{{.Values.imagelocation.domainname}}/{{.Values.imagelocation.project}}/' + containersItem.image
            if (containersItem.command !== '' || containersItem.command !== null) {
              let str = containersItem.command
              let arr = str.split(' ')
              let str2 = JSON.stringify(arr)
              let str3 = str2.replace(/"/g, '\\"')
              containersItem.command = str3
            }
          })
          this.configData.deployYamls.push(podItem)
        })
        this.serviceData.forEach(serviceItem => {
          serviceItem.metadata.labels.svc = serviceItem.metadata.name
          serviceItem.spec.selector.app = serviceItem.metadata.name
          this.configData.deployYamls.push(serviceItem)
        })
        let params = JSON.stringify(this.configData.deployYamls)
        Workspace.postConfigVisualApi(this.projectId, this.userId, params, 'config').then(res => {
          this.$eg_messagebox({
            type: 'success',
            title: '',
            desc: this.$t('workspace.visualConfig.saveConfigSuccess'),
            cancelText: this.$t('common.cancelText')
          }).then(() => {}).catch(() => {})
          this.dialogVisible = true
          this.appYamlFileId = res.data.fileId
          this.markdownSource = '```yaml\r\n' + res.data.content + '\r\n```'
          this.viewConfigFileBtn = true
          this.$emit('getConfigVisual', this.appYamlFileId)
          this.submitData(this.appYamlFileId)
          this.setApiHeight()
        }).catch(() => {
          this.$eg_messagebox({
            type: 'error',
            title: '',
            desc: this.$t('workspace.visualConfig.saveConfigFail'),
            cancelText: this.$t('common.cancelText')
          }).then(() => {}).catch(() => {})
          this.appYamlFileId = ''
          this.markdownSource = ''
        })
      }
    },
    submitData (appYamlFileId) {
      // Fetch config submiited before
      Workspace.getTestConfigApi(this.projectId).then(res => {
        this.projectBeforeConfig = res.data || {}
        const params = {
          testId: this.projectBeforeConfig.testId,
          privateHost: !!this.allStepData.third.enable,
          deployFileId: appYamlFileId,
          platform: 'KUBERNETES',
          hosts: this.allStepData.third.hostId ? [
            {
              hostId: this.allStepData.third.hostId,
              userId: this.userId
            }
          ] : []
        }
        const func = params.testId ? Workspace.putTestConfigApi : Workspace.postTestConfigApi
        func(this.projectId, this.userId, params)
      })
    },
    // Fetch config file generated
    getConfigFile () {
      Workspace.getTestConfigApi(this.projectId).then(response => {
        this.appYamlFileId = response.data.deployFileId
        if (this.appYamlFileId) {
          Workspace.getConfigVisualApi(this.appYamlFileId).then(res => {
            if (res.data.configType === 'config') {
              this.viewConfigFileBtn = true
              this.markdownSource = '```yaml\r\n' + res.data.content + '\r\n```'
              this.setApiHeight()
              this.getEchoConfigFile()
            } else {
              this.viewConfigFileBtn = false
            }
          })
        }
      })
    },
    // Echo config file
    getEchoConfigFile () {
      Workspace.getEchoConfigFileApi(this.appYamlFileId).then(res => {
        let echoData = []
        res.data.forEach(item => {
          echoData.push(JSON.parse(item))
        })
        this.serviceData = []
        let podDataArr = []
        echoData.forEach(item => {
          if (item.kind === 'Pod') {
            podDataArr.push(item)
          } else if (item.kind === 'Service') {
            this.serviceData.push(item)
          }
        })
        podDataArr.forEach(podItem => {
          podItem.spec.containers.forEach((containersItem, containerIndex) => {
            this.handleEchoFile(containersItem, podItem, containerIndex)
          })
        })
        this.podData = podDataArr
      })
    },
    handleEchoFile (containersItem, podItem, containerIndex) {
      containersItem.image = containersItem.image.replace('{{.Values.imagelocation.domainname}}/{{.Values.imagelocation.project}}/', '')
      let keysArr = []
      for (let keys in containersItem) {
        keysArr.push(keys)
      }
      if (keysArr.indexOf('env') === -1) {
        let envArr = [
          { name: '', value: '' }
        ]
        containersItem['env'] = envArr
      }
      if (keysArr.indexOf('command') === -1) {
        containersItem['command'] = ''
      }
      if (keysArr.indexOf('resources') === -1) {
        let resourcesObj = {
          limits: {
            memory: '',
            cpu: ''
          },
          requests: {
            memory: '',
            cpu: ''
          }
        }
        containersItem['resources'] = resourcesObj
      }
      if (containersItem.commond !== null && containersItem.name !== 'mep-agent') {
        let str = containersItem.command
        str = str.replace(/\[/g, '')
        str = str.replace(/]/g, '')
        str = str.replace(/\\"/g, '')
        let arr = str.split(',')
        containersItem.command = arr.join(' ')
      }
      if (containersItem.name === 'mep-agent') {
        podItem.spec.containers.splice(containerIndex, 1)
      }
    },
    setApiHeight () {
      this.$nextTick(() => {
        const oDiv = document.getElementsByClassName('el-dialog')[0]
        const deviceHeight = document.documentElement.clientHeight
        oDiv.style.height = Number(deviceHeight) * 0.75 + 'px'
        const oDiv2 = document.getElementsByClassName('file-content')[0]
        if (oDiv2) {
          oDiv2.style.height = Number(deviceHeight) * 0.75 - 155 + 'px'
        }
      })
    },
    viewConfigFile () {
      this.dialogVisible = true
      this.getConfigFile()
    },
    editConfigFile () {
      this.viewOrEdit = 'edit'
      this.isEditFile = true
    },
    // Save draft config file
    saveConfigFile () {
      Workspace.getConfigVisualApi(this.appYamlFileId).then(res => {
        let configFileContent = ''
        if (res.data.configType === 'config') {
          configFileContent = '```yaml\r\n' + res.data.content + '\r\n```'
          if (configFileContent !== this.markdownSource) {
            let editMarkDownstr = this.markdownSource.substring(8, (this.markdownSource.length - 4))
            Workspace.editConfigVisualApi(this.appYamlFileId, editMarkDownstr).then(response => {
              this.markdownSource = '```yaml\r\n' + response.data.content + '\r\n```'
              this.getEchoConfigFile()
            })
          } else {
            this.markdownSource = '```yaml\r\n' + res.data.content + '\r\n```'
          }
          this.viewOrEdit = 'preview'
          this.isEditFile = false
        }
      })
    },
    configEditFile () {
      this.dialogVisible = false
      this.isEditFile = false
    },
    // Change resource panel display status in each container.
    changeResourceDisplayStatus (container) {
      container.showResource = !container.showResource
    }
  },
  watch: {
    markdownSource (newVal, oldVal) {
      this.markdownSource = newVal
    },
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  }
}
</script>

<style lang="less">
@keyframes rotation {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(180deg);
  }
}

.configVisual{
  /* style for button that can add pod or service. */
   .add-btn-wrapper{
    width: 100%;
    padding-right: 15px;
  }

  .add-btn{
    float: right;
    background-color: #b9b5d6;
    border: none;
    border-radius: 8px;
    font-family: defaultFontLight;
    margin-top: 10px;
  }

  .add-btn-wrapper::after {
    content: '';
    display: block;
    clear: both;
  }

  .add-btn-wrapper.outer {
    margin-bottom: -30px !important;
  }

  /* style for all the el-input elements. */
  .el-input__inner {
    font-family: defaultFontLight;
  }

  /* style for pod related elements. */
  .pod-wrapper .pod-content {
    border: none;
    padding: 0;
    margin-top: 40px;
    font-family: defaultFontLight;
  }

  .pod-content-basic__header {
    color: #e2e1ed;
    background-color: #7e74b3;
    border-radius: 12px 12px 0 0;
    width: 100%;
    height: 35px;
    line-height: 35px;
  }

  .pod-content-basic__header .title {
    padding-left: 15px;
    float:left;
    font-size: 16px;
    font-family: defaultFontLight;
    font-weight: normal;
  }

  .pod-content-basic__header .delete {
    float: right;
    line-height: 35px;
    padding-right: 15px;
    color: #e2e1ed;
  }

  .pod-content-basic__body {
    margin: 30px 30px 0 30px;
  }

  .pod-content-basic__body .el-form-item {
    width: 48%;
  }

  .pod-content-basic__body .el-form-item .el-form-item__label {
    color: #4a2983;
  }

  .pod-content-basic__body .el-form-item .el-form-item__content {
    width: 240px;
  }

  .pod-content-container-item__header {
    color: #e2e1ed;
    margin-top: 10px;
    background-color: #9f97cb;
    width: 100%;
    height: 35px;
    line-height: 35px;
  }

  .pod-content-container-item__header .title {
    padding-left: 15px;
    float:left;
    font-size: 16px;
    font-family: defaultFontLight;
    font-weight: normal;
  }

  .pod-content-container-item__header .delete {
    float: right;
    line-height: 35px;
    padding-right: 15px;
    color: #e2e1ed;
  }

  .pod-content-container-item__body {
    margin: 30px 30px 0 30px;
    padding-bottom: 30px;
  }

  .pod-content-container-item__body .el-form-item {
    width: 48%;
  }

  .pod-content-container-item__body .el-form-item__label {
    color: #4a2983;
  }

  .pod-content-container-item__body .el-form-item__content {
    width: 240px;
  }

  .pod-content-container__item-envs .el-input {
    width: 105px;
  }

  .pod-content-container__item-envs .variable-name {
    margin-right: 10px;
  }

  .pod-content-container__item-envs .variable-value {
    margin-left: 10px;
  }

  .pod-content-container__item-envs .delete-variable-button {
    color: #7b71b1;
    font-size: 12px;
  }

  .pod-content-container-item__body .add-envs-variable-button {
    margin-top: 5px;
    background-color: #7b71b1;
    border-color: #7b71b1;
    border-radius: 8px;
    font-family: defaultFontLight;
  }

  .resources-wrapper {
      width: 100%;
      margin: 0 20px;
      padding: 10px 20px;
      background-color: #e9ebf1;
      border-radius: 8px;
      width: calc(100% - 40px);
  }

  .resources-wrapper__header::after {
    content: '';
    display: block;
    clear: both;
  }

  .resources-wrapper__header-title {
    float: left;
    color: #380879;
    font: defaultFont;
    font-size: 18px;
  }

  .resources-wrapper__header-arrow {
    float: right;
    position: relative;
    top: 5px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: transparent;
    border: solid 1px #380879;
    color: #380879;
  }

  .resources-wrapper__header-arrow .el-icon-arrow-down.up {
    position:relative;
    top: -4px;
    color: #380879;
    font-size: 8px;
    transform: rotate(0deg);
    transition: 0.5s;
  }

  .resources-wrapper__header-arrow .el-icon-arrow-down.down {
    position:relative;
    top: -5px;
    font-size: 8px;
    transform: rotate(180deg);
    transition: 0.5s;
  }

  .resources-wrapper__header-arrow:hover {
    cursor: pointer;
  }

  .resources-wrapper__body.el-row {
    margin: 5px 0 !important;
  }

  .resources-wrapper__item {
    margin-top: 10px;
  }

  .resources-wrapper__item::after {
    content: '';
    display: block;
    clear: both;
  }

  .resources-wrapper__item-content .resources-item__label {
    line-height: 32px;
    float: left;
    color: #380879;
  }

  .resources-wrapper__item-content .resources-item__input {
    display: inline-block;
    padding-left: 10px;
    width: 250px;
  }

  /* style for service related elements. */
  .service-wrapper {
    margin-top: 30px;
  }

  .service-wrapper .service-content {
    border: none;
    padding: 0;
    margin-top: 40px;
    font-family: defaultFontLight;
  }

  .service-content-basic__header {
    color: #e2e1ed;
    background-color: #7e74b3;
    border-radius: 12px 12px 0 0;
    width: 100%;
    height: 35px;
    line-height: 35px;
  }

  .service-content-basic__header .title {
    padding-left: 15px;
    float:left;
    font-size: 16px;
    font-family: defaultFontLight;
    font-weight: normal;
  }

  .service-content-basic__header .delete {
    float: right;
    line-height: 35px;
    padding-right: 15px;
    color: #e2e1ed;
  }

  .service-content-basic__body .el-form {
    margin: 30px 30px 0 30px;
  }

  .service-content-basic__body .el-form-item {
    width: 48%;
  }

  .service-content-basic__body .el-form-item__label {
    color: #4a2983;
  }

  .service-content-basic__body .el-form-item__content {
    width: 240px;
  }

  .service-content-port__header {
    color: #e2e1ed;
    margin-top: 10px;
    background-color: #9f97cb;
    width: 100%;
    height: 35px;
    line-height: 35px;
  }

  .service-content-port__header .title {
    padding-left: 15px;
    float:left;
    font-size: 16px;
    font-family: defaultFontLight;
    font-weight: normal;
  }

  .service-content-port__header .delete {
    float: right;
    line-height: 35px;
    padding-right: 15px;
    color: #e2e1ed;
  }

  .service-content-port__wrapper:last-child{
    padding-bottom: 20px;
  }

  .submit-btn-wrapper {
    margin-top: 30px;
    text-align: right;
  }

  .submit-btn-wrapper .button {
    border-radius: 8px;
    background-color: #8278b7;
    border-color: #8278b7;
    color: #fff;
    font-family: defaultFontLight;
    font-size: 16px;
    height: 40px;
    padding: 0 40px;
  }
}

.visual-config-dialog {
  height: 100%;

  .el-dialog {
    margin-top: 12% !important;
    padding: 20px;
    border-radius: 12px;
    width: 50%;
    height: 520px;
    background-color: #efefef;
  }

  .el-dialog__header {
    background-color: transparent !important;
  }

  .el-dialog__header::before {
    content: '';
    display: inline-block;
    position: relative;
    top: 2px;
    height: 17px;
    width: 17px;
    border-radius: 3px;
    background-image: linear-gradient(to top right, rgba(85, 216, 191), rgba(85, 216, 191, 0.2));
  }

  .el-dialog__title {
    margin-left: 20px;
    color: #380879 !important;
    font-size: 20px;
    font-family: defaultFontLight;
  }

  .el-dialog__close {
    display: none;
  }

  .file-content {
    margin-left: 35px;
    margin-right: 40px;
    border-radius: 8px;
  }

  .v-note-wrapper .v-note-panel {
    border-radius: 8px;
  }

  .v-note-wrapper .v-note-panel .v-note-show .v-show-content {
    height: 320px;
  }

  .v-note-wrapper .v-note-panel  .content-input-wrapper {
    height: 320px;
  }

  .markdown-body {
    height: 320px;
  }

  .markdown-body .highlight pre, .markdown-body pre {
    background-color: transparent;
  }

  .hljs {
    background-color: transparent;
  }

  .el-dialog__footer {
    position: absolute;
    right: 20px;
    bottom: 20px;
  }

  .el-dialog__footer .el-button {
    border-radius: 10px;
    background-color:#5844be;
    border: none;
    color: #fff;
    font-size: 14px;
    font-family: defaultFontLight;
  }
}

/** style for error message */
.required .el-form-item__label:before{
  content:'*';
  color: #F56C6C;
  font-size: 12px;
  margin-right: 4px;
}

.errInfo{
  font-size: 12px;
  color: #F56C6C;
  position: absolute;
  top: 25px;
}

/* transition animation for resource-wrapper */
.slide-fade-enter-active {
  transition: all 0.4s ease;
}

.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(-15px);
  opacity: 0;
}
</style>
