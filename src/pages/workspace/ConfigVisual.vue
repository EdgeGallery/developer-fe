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
  <div class="configVisual clear">
    <h3 class="tit_gray_bg">
      Pod基本信息
    </h3>
    <!-- 添加Pod -->
    <p class="addBtn_div">
      <el-button
        type="primary"
        @click="addPod"
      >
        添加Pod
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
          删除
        </el-button>
      </p>
      <el-form
        ref="rulesPodTop"
        label-width="110px"
        class="form_pod_top clear"
        :class="{'full':podData.length===1}"
        size="mini"
        :rules="rulesPodTop"
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
          prop="name"
        >
          <el-input
            v-model="itemPod.metadata.name"
            placeholder=""
          />
        </el-form-item>
      </el-form>
      <div class="addContainer clear">
        <p>
          <el-button
            type="primary"
            @click="addContainer(indexPod)"
          >
            添加工作容器
          </el-button>
        </p>
        <div
          class="container_div"
          :class="{'full':podData.length>1}"
          v-for="(itemContainer,indexContainer) in itemPod.spec.containers"
          :key="indexContainer"
        >
          <h3>
            工作容器
            <el-button
              type="text"
              @click="deleteContainer(indexPod,indexContainer)"
              v-if="itemPod.spec.containers.length>1"
              class="deleteText"
            >
              删除
            </el-button>
          </h3>
          <el-form
            label-width="80px"
            class="form_container"
            size="mini"
            :model="itemContainer"
            :rules="rulesPodContainer"
          >
            <el-form-item
              label="容器名称"
              prop="name"
            >
              <el-input
                v-model="itemContainer.name"
                placeholder="请输入容器名称"
              />
            </el-form-item>
            <el-form-item
              label="镜像信息"
              prop="image"
            >
              <el-input
                v-model="itemContainer.image"
                placeholder="请输入镜像信息"
              />
            </el-form-item>
            <el-form-item
              label="拉取策略"
              prop="imagePullPolicy"
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
              label="内部端口"
              prop="ports[0].containerPort"
            >
              <el-input-number
                v-model="itemContainer.ports[0].containerPort"
                :min="1"
                :max="9999"
                label="1-9999"
              />
            </el-form-item>
            <el-form-item
              id="envDiv"
              label="环境变量"
              class="env_item"
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
                      placeholder="变量名"
                    />
                    <p
                      class="errInfo"
                      v-if="itemEnv.name===''"
                    >
                      变量名不能为空
                    </p>
                  </div>
                  <span class="equal">=</span>
                  <div class="env_input">
                    <el-input
                      v-model="itemEnv.value"
                      placeholder="值"
                    />
                    <p
                      class="errInfo"
                      v-if="itemEnv.value===''"
                    >
                      变量值不能为空
                    </p>
                  </div>
                  <p
                    class="deleteLine"
                  >
                    <el-button
                      type="text"
                      class="deleteText"
                      @click="deletePodEnv(indexPod,indexContainer,indexEnv)"
                    >
                      删除
                    </el-button>
                  </p>
                </div>
              </div>
              <p
                v-if="isEnvDataEmpty"
                class="errInfo"
              >
                请填写完整的环境变量，或删除多余的环境变量
              </p>
              <el-button
                type="primary"
                @click="addPodEnv(indexPod,indexContainer)"
              >
                添加
              </el-button>
            </el-form-item>
            <el-form-item
              label="命令行"
            >
              <el-input
                v-model="itemContainer.command"
                placeholder="eg(normal linux cmd line)：tail -f xxxx/xxxx.log"
              />
            </el-form-item>
            <el-form-item
              label="资源"
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
      访问方式Service
    </h3>
    <!-- 添加Service -->
    <p class="addBtn_div">
      <el-button
        type="primary"
        @click="addService"
      >
        添加Service
      </el-button>
    </p>
    <div
      class="pod_div clear"
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
          删除
        </el-button>
      </p>
      <el-form
        label-width="110px"
        class="form_pod_top clear"
        :class="{'full':serviceData.length===1}"
        size="mini"
        :model="itemService"
        :rules="rulesService"
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
          prop="metadata.name"
        >
          <el-input
            v-model="itemService.metadata.name"
          />
        </el-form-item>
        <el-form-item
          label="类型"
        >
          <el-input
            v-model="itemService.spec.type"
            placeholder="NodePort"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item
          id="portDiv"
          label="端口"
          class="service_item"
          prop="spec.ports"
        >
          <p class="port_title">
            <span>内部端口</span>
            <span>目标端口</span>
            <span>节点端口</span>
            <span>协议</span>
          </p>
          <div
            v-for="(itemPorts,indexPorts) in itemService.spec.ports"
            :key="indexPorts"
            class="service_port_div clear"
          >
            <div class="port_div">
              <el-input
                v-model.number="itemPorts.port"
                placeholder="port"
              />
              <p
                class="errInfo"
                v-if="itemPorts.port===''"
              >
                内部端口号不能为空
              </p>
            </div>
            <div class="port_div">
              <el-input
                v-model="itemPorts.targetPort"
                placeholder="targetPort"
              />
              <p
                class="errInfo"
                v-if="itemPorts.targetPort===''"
              >
                目标端口号不能为空
              </p>
            </div>
            <div class="port_div">
              <el-input
                v-model="itemPorts.nodePort"
                placeholder="nodePort"
              />
              <p
                class="errInfo"
                v-if="itemPorts.nodePort===''"
              >
                节点端口号不能为空
              </p>
            </div>
            <div class="port_div">
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
                删除
              </el-button>
            </p>
          </div>
          <el-button
            type="primary"
            @click="addServicePort(indexService)"
          >
            添加
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <p class="saveBtn addBtn_div">
      <el-button
        class="featuresBtn"
        @click="saveConfig"
      >
        保存配置
      </el-button>
    </p>
    <el-dialog
      title="可视化配置文件"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
    >
      <div class="file_content">
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
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
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
      default: () => { }
    }
  },
  data () {
    let podName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('pod Name不能为空'))
      } else {
        return callback()
      }
    }
    return {
      configData: {
        deployYamls: []
      },
      podData: [
        {
          apiVersion: 'v1',
          kind: 'Pod',
          metadata: {
            name: '',
            namespace: 'default',
            labels: {
              app: ''
            }
          },
          spec: {
            containers: [
              {
                name: '',
                image: '',
                imagePullPolicy: 'Always',
                env: [
                  {
                    name: '',
                    value: ''
                  }
                ],
                ports: [
                  {
                    containerPort: 9997
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
            namespace: 'default',
            labels: {
              svc: ''
            }
          },
          spec: {
            ports: [
              {
                port: 9997,
                targetPort: 9997,
                protocol: 'TCP',
                nodePort: 32115
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
      isEnvDataEmpty: false,
      isPortDataEmpty: false,
      userId: sessionStorage.getItem('userId'),
      projectId: sessionStorage.getItem('mecDetailID'),
      rulesPodTop: {
        name: [
          { required: true, validator: podName, trigger: 'blur' }
        ]
      },
      rulesPodContainer: {
        name: [
          { required: true, message: '容器名称不能为空', trigger: 'blur' }
        ],
        image: [
          { required: true, message: '镜像信息不能为空', trigger: 'blur' }
        ],
        imagePullPolicy: [
          { required: true, message: '拉取策略不能为空', trigger: 'blur' }
        ],
        'ports[0].containerPort': [
          { required: true, message: '内部端口不能为空', trigger: 'blur' }
        ]
      },
      rulesService: {
        'metadata.name': [
          { required: true, message: 'service name不能为空', trigger: 'blur' }
        ],
        'spec.ports': [
          { required: true }
        ]
      },
      dialogVisible: false,
      projectBeforeConfig: {},
      appYamlFileId: ''
    }
  },
  methods: {
    // 添加Pod
    addPod () {
      let podDataObj = {
        apiVersion: 'v1',
        kind: 'Pod',
        metadata: {
          name: '',
          namespace: 'default',
          labels: {
            app: ''
          }
        },
        spec: {
          containers: [
            {
              name: '',
              image: '',
              imagePullPolicy: 'Always',
              env: [
                {
                  name: '',
                  value: ''
                }
              ],
              ports: [
                {
                  containerPort: 9997
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
    // 添加工作容器
    addContainer (indexPod) {
      let obj = {
        name: '',
        image: '',
        imagePullPolicy: 'Always',
        env: [
          {
            name: '',
            value: ''
          }
        ],
        ports: [
          {
            containerPort: 9997
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
    // 添加环境变量
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
      this.checkEnvData()
    },
    // 整体检查环境变量的值是否有空值
    checkEnvData () {
      this.podData.forEach(podItem => {
        podItem.spec.containers.forEach(containersItem => {
          containersItem.env.forEach(envItem => {
            if ((envItem.name === '' || envItem.value === '') && this.showEnv) {
              this.isEnvDataEmpty = true
            } else {
              this.isEnvDataEmpty = false
            }
          })
          if (containersItem.env.length === 0) {
            this.isEnvDataEmpty = false
          }
        })
      })
    },
    // 添加Service
    addService () {
      let serviceDataObj = {
        apiVersion: 'v1',
        kind: 'Service',
        metadata: {
          name: '',
          namespace: 'default',
          labels: {
            svc: ''
          }
        },
        spec: {
          ports: [
            {
              port: 9997,
              targetPort: 9997,
              protocol: 'TCP',
              nodePort: 32115
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
    // 添加service端口
    addServicePort (indexService) {
      let objPort = {
        port: 9997,
        targetPort: 9997,
        protocol: 'TCP',
        nodePort: 32115
      }
      this.serviceData[indexService].spec.ports.push(objPort)
    },
    deleteServicePort (indexService, indexPorts) {
      this.serviceData[indexService].spec.ports.splice(indexPorts, 1)
    },
    // 验证端口号是否为空
    checkServicePort () {
      this.serviceData.forEach(serviceItem => {
        serviceItem.spec.ports.forEach(portItem => {
          if (portItem.port === '' || portItem.targetPort === '' || portItem.nodePort === '') {
            this.isPortDataEmpty = true
          } else {
            this.isPortDataEmpty = false
          }
        })
      })
    },
    // 保存配置
    saveConfig () {
      this.configData.deployYamls = []
      this.checkEnvData()
      if (this.isEnvDataEmpty) {
        document.getElementById('envDiv').scrollIntoView()
      } else if (this.isPortDataEmpty) {
        document.getElementById('portDiv').scrollIntoView()
      } else {
        let podDataTemp = JSON.parse(JSON.stringify(this.podData))
        podDataTemp.forEach(podItem => {
          podItem.metadata.labels.app = podItem.metadata.name
          podItem.spec.containers.forEach(containersItem => {
            if (containersItem.command !== '') {
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
        console.log(this.configData)
        Workspace.postConfigVisualApi(this.projectId, this.userId, this.configData).then(res => {
          this.$message.success('保存配置成功')
          this.dialogVisible = true
          this.appYamlFileId = res.data.fileId
          this.$emit('getConfigVisual', this.appYamlFileId)
          this.submitData(this.appYamlFileId)
          this.setApiHeight()
        }).catch(() => {
          this.$message.error('保存配置失败')
          this.appYamlFileId = ''
          this.setApiHeight()
        })
      }
    },
    submitData (appYamlFileId) {
      // 获取以前提交过的配置
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
        func(this.projectId, this.userId, params).then(() => {
          this.getConfigFile(appYamlFileId)
        }).catch(err => {
          console.log(err)
        })
      })
    },
    // 获取生成的配置文件
    getConfigFile (appYamlFileId) {
      Workspace.getConfigVisualApi(appYamlFileId).then(res => {
        this.markdownSource = '```yaml\r\n' + res.data + '\r\n```'
      }).catch(() => {
        this.markdownSource = ''
      })
    },
    setApiHeight () {
      this.$nextTick(() => {
        const oDiv = document.getElementsByClassName('el-dialog')[0]
        const deviceHeight = document.documentElement.clientHeight
        oDiv.style.height = Number(deviceHeight) * 0.75 + 'px'
        const oDiv2 = document.getElementsByClassName('file_content')[0]
        oDiv2.style.height = Number(deviceHeight) * 0.75 - 155 + 'px'
      })
    }
  },
  created () {
  },
  mounted () {
    console.log(this.allStepData)
  }
}
</script>

<style lang="less">
.configVisual{
  .errInfo{
    font-size: 12px;
    color: #F56C6C;
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
    .service_port_div{
      margin-bottom: 10px;
    }
  }
  .pod_div.full{
    width: 100%;
  }
  .port_div{
    float: left;
    width: 23%;
    margin: 0 2% 0 0;
  }
  .port_div:last-child{
    width: 25%;
    margin: 0;
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
  .service_item{
    .port_title{
        span{
          float: left;
          width: 25%;
          font-size: 12px;
          color: #aaa;
        }
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
    width: 48%;
    margin: 2% 1% 0;
    background: #e8f9ff;
    border: 1px dashed #ddd;
    padding: 15px;
    .el-form{
      margin-top: 15px;
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
  .container_div.full{
    width: 100%;
    margin: 2% 0 0;
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
