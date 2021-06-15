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
  <div class="configVisual clear">
    <h3 class="tit_gray_bg">
      {{ $t('workspace.visualConfig.podBasicInfo') }}
    </h3>
    <!-- Add Pod -->
    <p class="addBtn_div">
      <el-button
        type="primary"
        @click="addPod"
      >
        {{ $t('workspace.add') }}Pod
      </el-button>
    </p>
    <div
      class="pod_div clear"
      :class="{'full':podData.length===1}"
      v-for="(itemPod,indexPod) in podData"
      :key="'pod-'+ indexPod"
    >
      <p class="delete_div">
        <el-button
          type="text"
          @click="deletePod(indexPod)"
          v-if="podData.length>1"
          class="deleteText"
        >
          {{ $t('devTools.delete') }}
        </el-button>
      </p>
      <el-form
        label-width="110px"
        class="form_pod_top clear"
        :class="{'full':podData.length===1}"
        size="mini"
        :model="itemPod.metadata"
      >
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
          label="kind"
        >
          <el-input
            v-model="itemPod.kind"
            placeholder="Pod"
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
      </el-form>
      <div class="addContainer clear">
        <p>
          <el-button
            type="primary"
            @click="addContainer(indexPod)"
          >
            {{ $t('workspace.add')+$t('workspace.visualConfig.workContainer') }}
          </el-button>
        </p>
        <div
          class="container_div"
          :class="{'half':(podData.length===1 && itemPod.spec.containers.length>1)}"
          v-for="(itemContainer,indexContainer) in itemPod.spec.containers"
          :key="indexContainer"
        >
          <h3>
            {{ $t('workspace.visualConfig.workContainer') }}
            <el-button
              type="text"
              @click="deleteContainer(indexPod,indexContainer)"
              v-if="itemPod.spec.containers.length>1"
              class="deleteText"
            >
              {{ $t('devTools.delete') }}
            </el-button>
          </h3>
          <el-form
            class="form_container clear"
            :class="{'half':(podData.length===1 || itemPod.spec.containers.length===1),'full':podData.length>1}"
            size="mini"
            :model="itemContainer"
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
              <el-input-number
                v-model="itemContainer.ports[0].containerPort"
                :min="1"
                :max="9999"
                label="1-9999"
                @change="checkInputInPort(itemContainer.ports[0])"
              />
              <p
                class="errInfo"
                v-show="itemContainer.ports[0].showPort"
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
                  class="pod_env_div clear"
                >
                  <div class="env_input">
                    <el-input
                      v-model="itemEnv.name"
                      :placeholder="$t('workspace.visualConfig.variableName')"
                    />
                  </div>
                  <span class="equal">=</span>
                  <div class="env_input">
                    <el-input
                      v-model="itemEnv.value"
                      :placeholder="$t('workspace.visualConfig.variableValue')"
                    />
                  </div>
                  <p
                    class="deleteLine"
                  >
                    <el-button
                      type="text"
                      class="deleteText"
                      @click="deletePodEnv(indexPod,indexContainer,indexEnv)"
                    >
                      {{ $t('devTools.delete') }}
                    </el-button>
                  </p>
                </div>
              </div>
              <el-button
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
            <el-form-item
              :label="$t('workspace.containerResource')"
              class="resouces"
            >
              <p class="resouces_tit">
                limits
              </p>
              <div class="resouces_div">
                <span>memory</span>
                <el-input
                  v-model="itemContainer.resources.limits.memory"
                  placeholder="100Mi"
                />
                <span>cpu</span>
                <el-input
                  v-model="itemContainer.resources.limits.cpu"
                  placeholder="1"
                />
              </div>
              <p class="resouces_tit">
                requests
              </p>
              <div class="resouces_div">
                <span>memory</span>
                <el-input
                  v-model="itemContainer.resources.requests.memory"
                  placeholder="100Mi"
                />
                <span>cpu</span>
                <el-input
                  v-model="itemContainer.resources.requests.cpu"
                  placeholder="1"
                />
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <h3 class="tit_gray_bg">
      {{ $t('workspace.visualConfig.accessMethod') }}
    </h3>
    <!-- Add Service -->
    <p class="addBtn_div">
      <el-button
        type="primary"
        @click="addService"
      >
        {{ $t('workspace.add') }}Service
      </el-button>
    </p>
    <div
      class="pod_div service_div clear"
      :class="{'full':serviceData.length===1}"
      v-for="(itemService,indexService) in serviceData"
      :key="'service-'+ indexService"
    >
      <p class="delete_div">
        <el-button
          type="text"
          @click="deleteService(indexService)"
          v-if="serviceData.length>1"
          class="deleteText"
        >
          {{ $t('devTools.delete') }}
        </el-button>
      </p>
      <el-form
        label-width="110px"
        class="form_pod_top clear"
        :class="{'full':serviceData.length===1}"
        size="mini"
        :model="itemService"
      >
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
          :label="$t('system.type')"
        >
          <el-input
            v-model="itemService.spec.type"
            placeholder="NodePort"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item
          :label="$t('workspace.port')"
          class="service_item required"
        >
          <div
            v-for="(itemPorts,indexPorts) in itemService.spec.ports"
            :key="indexPorts"
            class="service_port_div clear"
            :class="{'half':serviceData.length>1}"
          >
            <div class="port_div">
              <span class="title">{{ $t('workspace.visualConfig.internalPort') }}</span>
              <el-input-number
                v-model.number="itemPorts.port"
                placeholder="port"
                @change="checkInputPort(itemPorts)"
              />
              <p
                class="errInfo"
                v-show="itemPorts.showPort"
              >
                {{ $t('workspace.visualConfig.internalPortVerify') }}
              </p>
            </div>
            <div class="port_div">
              <span class="title">{{ $t('workspace.visualConfig.destinationPort') }}</span>
              <el-input-number
                v-model="itemPorts.targetPort"
                placeholder="targetPort"
                @change="checkInputTargetPort(itemPorts)"
              />
              <p
                class="errInfo"
                v-show="itemPorts.showTargetPort"
              >
                {{ $t('workspace.visualConfig.destinationPortVerify') }}
              </p>
            </div>
            <div class="port_div">
              <span class="title">{{ $t('workspace.visualConfig.nodePort') }}</span>
              <el-input-number
                v-model="itemPorts.nodePort"
                placeholder="nodePort"
                @change="checkInputNodePort(itemPorts)"
              />
              <p
                class="errInfo"
                v-show="itemPorts.showNodePort"
              >
                {{ $t('workspace.visualConfig.nodePortVerify') }}
              </p>
            </div>
            <div class="port_div">
              <span class="title">{{ $t('workspace.protocol') }}</span>
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
            </div>
            <p
              class="deleteLine"
              v-if="itemService.spec.ports.length>1"
            >
              <el-button
                type="text"
                class="deleteText"
                @click="deleteServicePort(indexService,indexPorts)"
              >
                {{ $t('devTools.delete') }}
              </el-button>
            </p>
          </div>
          <el-button
            type="primary"
            @click="addServicePort(indexService)"
          >
            {{ $t('workspace.add') }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <p class="saveBtn addBtn_div">
      <el-button
        v-if="viewConfigFileBtn"
        @click="viewConfigFile"
      >
        {{ $t('workspace.visualConfig.viewYamlFile') }}
      </el-button>
      <el-button
        class="featuresBtn"
        @click="saveConfig"
      >
        {{ $t('workspace.saveData') }}
      </el-button>
    </p>
    <el-dialog
      :title="$t('workspace.visualConfig.visualConfigFile')"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
    >
      <div class="file_content">
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
        class="dialog-footer"
      >
        <el-button @click="editConfigFile">{{ $t('common.edit') }}</el-button>
        <el-button
          @click="saveConfigFile"
          v-show="isEditFile"
        >{{ $t('common.save') }}</el-button>
        <el-button
          type="primary"
          @click="configEditFile"
        >{{ $t('common.confirm') }}</el-button>
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
                }
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
              }
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
        }
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
      if (value.containerPort === undefined) {
        value.showInPort = true
      } else {
        value.showInPort = false
      }
    },
    checkInputPort (value) {
      if (value.port === undefined) {
        value.showPort = true
      } else {
        value.showPort = false
      }
    },
    checkInputTargetPort (value) {
      if (value.targetPort === undefined) {
        value.showTargetPort = true
      } else {
        value.showTargetPort = false
      }
    },
    checkInputNodePort (value) {
      if (value.nodePort === undefined) {
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
            this.$message.warning(this.$t('workspace.visualConfig.imageInfoVerify'))
            this.ifSaveConfig = false
          }
          if (itemSub.name === '') {
            this.$message.warning(this.$t('workspace.visualConfig.containerNameVerify'))
            this.ifSaveConfig = false
          }
          if (itemSub.ports[0].containerPort === undefined) {
            this.$message.warning(this.$t('workspace.visualConfig.internalPortVerify'))
            this.ifSaveConfig = false
          }
        })
        if (itemPo.metadata.name === '' || itemPo.metadata.name.toString().indexOf('_') !== -1) {
          this.$message.warning(this.$t('workspace.visualConfig.podNameVerify'))
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
            this.$message.warning(this.$t('workspace.visualConfig.nodePortVerify'))
            this.ifSaveConfig = false
          }
          if (itemSub.targetPort === undefined) {
            this.$message.warning(this.$t('workspace.visualConfig.destinationPortVerify'))
            this.ifSaveConfig = false
          }
          if (itemSub.port === undefined) {
            this.$message.warning(this.$t('workspace.visualConfig.internalPortVerify'))
            this.ifSaveConfig = false
          }
        })
        if (itemSer.metadata.name === '' || itemSer.metadata.name.toString().indexOf('_') !== -1) {
          this.$message.warning(this.$t('workspace.visualConfig.serviceNameVerify'))
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
          this.$message.success(this.$t('workspace.visualConfig.saveConfigSuccess'))
          this.dialogVisible = true
          this.appYamlFileId = res.data.fileId
          this.markdownSource = '```yaml\r\n' + res.data.content + '\r\n```'
          this.viewConfigFileBtn = true
          this.$emit('getConfigVisual', this.appYamlFileId)
          this.submitData(this.appYamlFileId)
          this.setApiHeight()
        }).catch(() => {
          this.$message.error(this.$t('workspace.visualConfig.saveConfigFail'))
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
        const oDiv2 = document.getElementsByClassName('file_content')[0]
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
.configVisual{
  .el-input-number--mini{
    width: 100%;
  }
  .el-form-item__label{
    width: 100px;
  }
  .el-form-item__content{
    position: relative;
    margin-left: 100px;
  }
  .span_left_en .el-form-item__label{
    width: 165px;
  }
  .span_left_en .el-form-item__content{
    margin-left: 165px;
  }
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
  .el-select{
    width: 100%;
  }
  .tit_gray_bg{
    float: left;
    width: 100%;
  }
  .pod_div{
    float: left;
    width: 50%;
    border: 1px solid #ddd;
    padding: 20px;
    margin: 20px 0;
    height: 670px;
    overflow-y: auto;
    .service_port_div{
      margin-bottom: 18px;
      .errInfo{
        top: 55px;
      }
    }
    .service_port_div.half{
      .port_div{
        width: 48%;
        margin: 20px 2% 0 0;
      }
      .port_div:nth-child(even){
        margin: 20px 0 0 0;
      }
    }
  }
  .pod_div.full{
    width: 100%;
    height: 570px;
  }
  .pod_div.full.service_div{
    height: 340px;
  }
  .pod_div.service_div{
    height: 440px;
    overflow-y: auto;
  }
  .port_div{
    float: left;
    width: 23%;
    margin: 0 2% 0 0;
    position: relative;
    .title{
      font-size: 12px;
      color: #aaa;
      font-weight: normal;
    }
  }
  .port_div:last-child{
    width: 25%;
    margin: 0;
  }
  .el-form{
    .el-form-item{
      float: left;
      width: 100%;
    }
  }
  .el-form.half{
    .el-form-item{
      width: 50%;
    }
  }
  .el-form.half.full{
    .el-form-item{
      width: 100%;
    }
  }
  .addBtn_div{
    float: left;
    width: 100%;
  }
  .form_pod_top{
    .el-form-item{
      float: left;
      width: 100%;
    }
  }
  .form_pod_top.full{
    .el-form-item{
      float: left;
      width: 50%;
    }
    .el-form-item.service_item{
      width: 100%;
    }
  }
  .delete_div{
    height: 25px;
  }
  .deleteText{
    float: right;
    padding: 8px 0;
  }
  .container_div{
    float: left;
    width: 100%;
    margin: 2% 0 0;
    background: #e8f9ff;
    border: 1px dashed #ddd;
    padding: 15px;
    .el-form{
      margin-top: 15px;
      .el-form-item.resouces{
        width: 100%;
      }
      .pod_env_div{
        margin-bottom: 10px;
      }
      .env_item{
        .env_input{
          float: left;
          width: 48%;
        }
        .equal{
          float: left;
          width: 4%;
          text-align: center;
        }
      }
    }
    .resouces_tit{
      color: #aaa;
    }
    .resouces_div{
      span{
        float: left;
        width: 70px;
        text-align: right;
        padding-right: 10px;
      }
      .el-input{
        float: left;
        width: calc(50% - 80px);
      }
    }
  }
  .deleteLine{
    float: left;
    width: 100%;
    border-bottom:1px solid #ddd;
    height: 30px;
  }
  .container_div.half{
    width: 48%;
    margin: 2% 1% 0;
    .el-form-item{
      width: 100%;
    }
  }
  .saveBtn{
    margin-top: 20px;
  }
  .el-dialog{
    width: 45%;
  }
  .file_content{
    overflow: auto;
    .v-note-wrapper{
      border: none;
    }
    .v-note-wrapper .v-note-panel .v-note-show{
      overflow: hidden;
      .hljs, pre{
        background: #1e1e1e;
        color: #fff;
      }
    }
  }
  @media screen and (max-width:1290px){
    .el-dialog{
      width: 65%;
    }
  }
}
</style>
