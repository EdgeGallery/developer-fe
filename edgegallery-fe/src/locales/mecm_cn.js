/*
 *  Copyright 2021 Huawei Technologies Co., Ltd.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

const cnMecm = {
  deployCommon: {
    name: '名称',
    version: '版本',
    provider: '厂商',
    affinity: '架构',
    operation: '操作',
    tip: '输入名称搜索',
    cancel: '取消',
    confirm: '确认'
  },
  deployList: {
    deployListTitle: '应用部署',
    tip: '输入内容进行搜索',
    type: '类型',
    industry: '行业',
    appstoreName: '应用仓库',
    createTime: '同步时间',
    operationBtn: '分发'
  },
  distributeDeploy: {
    title: '部署',
    hostIp: '主机IP地址',
    status: '状态',
    delete: '删除',
    distribute: '分发',
    deploy: '部署',
    distributeDeploySuccess: '分发部署成功',
    beforeDeleteFromMechost: '确认要从该节点删除应用应用包？',
    deletePacFrmoHost: '你已经成功从节点删除应用',
    tip: '输入主机IP或状态搜索',
    multipleDeploy: '批量部署',
    onePackageAtLeast: '请至少选择一条数据进行操作',
    deleteError: '请先删除分发状态为“Error”的应用'
  },
  distribute: {
    title: '分发',
    ip: 'IP地址',
    city: '城市',
    MEPM: 'MEPM地址',
    hwCapability: '硬件能力',
    selectMecHost: '请选择要下发的host节点。',
    selectVersion: '请选择要下发的应用包版本。',
    failedToDistribute: '分发失败。'
  },
  deployConfig: {
    title: '部署配置',
    IPAddress: 'IP地址：',
    status: '状态：',
    appName: '应用名称',
    appDesc: '应用描述',
    placeholderName: '名称',
    placeholderDesc: '描述',
    hardwareAbilities: '硬件能力',
    appNameVerifyRequired: '请输入应用名称',
    appNameVerifyValid: '4到16位（字母，数字）',
    appDescVerifyRequired: '请输入描述',
    deployFailed: '部署失败，请检查！',
    getTemplateListFail: '获取参数失败'
  }
}
export default cnMecm
