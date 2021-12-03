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

const cn = {
  sandbox: {
    selectSandbox: '选择沙箱',
    sandboxDetail: '沙箱详情',
    edgeApplication: '边缘应用',
    terminal: '5G终端',
    baseStation: '5G基站',
    upf: '边缘UPF',
    coreNetwork: '5G核心网',
    configureNetwork: '配置网络',
    releaseResources: '释放资源',
    createImage: '生成镜像',
    vm: '虚拟机',
    vmDetail: '虚拟机详情',
    vmName: '虚拟机名称',
    network: '网络',
    image: '镜像',
    flavor: '规格',
    instanceStatus: '实例状态',
    instanceInformation: '实例信息',
    imageName: '镜像名称',
    downloadUrl: '下载地址',
    stageStatus: '阶段状态',
    uploadAppPackage: '上传应用代码包',
    uploadAppPackagePromt: '注：文件默认上传到虚拟机的根目录下',
    selectFile: '选择包文件',
    selectNetworkType: '选择网络类型',
    addCustomNetwork: '添加自定义网络',
    addDescribe: '添加描述',
    vmInformation: '虚拟机信息',
    enterVmName: '请输入虚拟机名称',
    selectVmflavor: '选择虚拟机规格',
    usageScenes: '使用场景',
    memory: '内存',
    systemDisk: '系统盘',
    dataDisk: '数据盘',
    otherCapability: '其他能力',
    configureNetworkPorts: '配置网络端口',
    selectImage: '选择镜像',
    imageType: {
      publicImage: '公有镜像',
      privateImage: '私有镜像'
    },
    flavorExtraSpecs: '主机组配置',
    enterFlavorExtraSpecs: '填写主机组配置',
    script: '脚本',
    useScript: '是否使用注入脚本',
    enterScriptContent: '填写脚本内容'
  },
  rulesConfig: {
    appRuleConfig: '应用规则配置',
    filterRules: '流过滤规则',
    addFlowFilter: '添加流量过滤器',
    srcAddress: '源IP地址',
    srcPort: '源端口号',
    dstAddress: '目的IP地址',
    dstPort: '目的端口号',
    tgtTunnelAddress: '隧道目的地址',
    dstTunnelPort: '隧道目的端口',
    interfaceInfo: '接口信息',
    forwardInterfaceTabTitle: '转发接口信息',
    addInterfaceInfo: '添加接口信息',
    interfaceType: '接口类型',
    tunnelType: '隧道类型',
    srcTunnelAddress: '隧道源地址',
    tunnelParams: '隧道指定参数',
    macAddress: '目的MAC地址',
    sourceMacAddress: '源MAC地址',
    dstIpAddress: '目的地址',
    flowFilter: '流量过滤器',
    multipleIP: '多个IP请用\',\'分隔',
    multiplePort: '多个端口请用\',\'分隔',
    tag: '标签',
    protocol: '协议类型',
    srcTunnelPort: '隧道源端口',
    tunnelInfo: '隧道信息',
    macInfo: 'MAC信息',
    IpInfo: 'IP信息',
    ipAddress: 'IP地址',
    trafficRuleIdisEmpty: '流规则标识不能为空！',
    dnsRuleIdisEmpty: 'DNS规则标识不能为空！',
    trafficRuleIdisExists: '流规则标识已存在！',
    dnsRuleIdisExists: 'DNS规则标识已存在！'
  },
  container: {
    script: '脚本',
    import: '导入',
    container: '容器',
    containerDetail: '容器详情',
    containerScript: '容器脚本',
    uploadFile: '上传文件',
    downloadDemo: '模版下载',
    configFile: '配置文件',
    configFileText: '支持浏览和编辑两个模式切换',
    format: '参数校验',
    imageInfo: '镜像信息',
    serviceInfo: '服务信息',
    mepAgentTip: '如果没有集成mepagent，将无法发布API'
  },
  sandboxPromptInfomation: {
    imageFileType: '请上传.rar，.tar，.zip格式的文件，且大小不超过5G！',
    addVmSuccess: '虚拟机添加成功！',
    completeContent: '请完善内容，再次点击提交！',
    releaseEnvFailed: '释放环境失败！',
    imageInfoErr: '镜像不存在，请前往“系统镜像管理”上传镜像！',
    containerScriptUploadTip: '请上传.yaml或.tgz格式的文件！',
    cleanEnvSuccess: '释放资源成功！',
    cleanEnvFailed: '释放资源失败！'
  }
}
export default cn
