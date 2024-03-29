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

const sandboxEn = {
  sandbox: {
    selectSandbox: 'Select Sandbox',
    sandboxDetail: 'Sandbox Detail',
    edgeApplication: 'Edge Application',
    terminal: '5G Terminal',
    baseStation: '5G Base Station',
    upf: 'Edge UPF',
    coreNetwork: '5G Core Network',
    configureNetwork: 'Network Configuration',
    releaseResources: 'Release Resources',
    createImage: 'Create Image',
    vm: 'VM',
    vmDetail: 'VM Detail',
    vmName: 'VM Name',
    network: 'Network',
    image: 'Image',
    flavor: 'Flavor',
    instanceStatus: 'Instance Status',
    instanceInformation: 'Instance Information',
    errMsg: 'Error Message',
    imageName: 'Image Name',
    downloadUrl: 'Download Url',
    stageStatus: 'Stage Status',
    uploadAppPackage: 'Upload Application Code Package',
    uploadAppPackagePromt: 'Note: The file is uploaded to the root directory of the virtual machine by default',
    selectFile: 'Select Package File',
    selectNetworkType: 'Configure Network Type',
    addCustomNetwork: 'Add Custom Network',
    addDescribe: 'Add Describe',
    vmInformation: 'VM Information',
    enterVmName: 'Please enter the name of the VM',
    selectVmflavor: 'Select Vm Flavor',
    useCase: 'Use Case',
    memory: 'Memory',
    systemDisk: 'System Disk',
    dataDisk: 'Data Disk',
    otherCapability: 'Other Capability',
    configureNetworkPorts: 'Configure Network Ports',
    selectImage: 'Select Image',
    imageType: {
      publicImage: 'Public',
      privateImage: 'Private'
    },
    flavorExtraSpecs: 'Flavor Extra Specs',
    enterFlavorExtraSpecs: 'Enter Flavor Extra Specs',
    script: 'Script',
    useScript: 'Whether to use injection script',
    enterScriptContent: 'Enter Script Content',
    type: 'type',
    customSpec: 'Custom Specs',
    typeTip: 'Please select a type',
    hugePage: 'HugePage',
    gpuType: 'GPU Type',
    gpuNum: 'Num',
    hostGroup: 'HostGroup Label',
    cpuPolicy: 'Binding Strategy',
    cpuThread: 'CPU Thread Policy',
    numaNode: 'NUMA Region',
    hugePageTip: 'Please select large page memory',
    gpuTypeTip: 'Please select GPU type',
    gpuNumTip: 'Please select GPU type first',
    hostGroupTip: 'Please enter the host group label',
    isImageEmpty: 'Please select image',
    isNetworkEmpty: 'Please configure the network port',
    addCustomSpec: 'There is no matching data, click to add ',
    vmNametip: 'Please fill in the vm specification name',
    vmSenceTip: 'Please fill in the vm specification scenario'
  },
  rulesConfig: {
    appRuleConfig: 'Application Rule Configuration',
    filterRules: 'Filter Rules',
    addFlowFilter: 'Add Flow Filter',
    srcAddress: 'Src IP Address',
    srcPort: 'Src Port',
    dstAddress: 'Dst IP Address',
    dstPort: 'Dst Port',
    tgtTunnelAddress: 'Tunnel Dst Address',
    dstTunnelPort: 'Tunnel Dst Port',
    interfaceInfo: 'Interface Information',
    forwardInterfaceTabTitle: 'Forward Interface Information',
    addInterfaceInfo: 'Add Interface Information',
    interfaceType: 'Interface Type',
    tunnelType: 'Tunnel Type',
    srcTunnelAddress: 'Tunnel source address',
    tunnelParams: 'Tunnel Specified Parameters',
    macAddress: 'Destination MAC Address',
    sourceMacAddress: 'Source MAC Address',
    dstIpAddress: 'Dst IP Address',
    flowFilter: 'Flow Filter',
    multipleIP: 'Please separate multiple IPs with\',\'',
    multiplePort: 'Please separate multiple Ports with\',\'',
    tag: 'Tag',
    protocol: 'Protocol',
    srcTunnelPort: 'Tunnel source port',
    tunnelInfo: 'Tunnel Information',
    macInfo: 'MAC Information',
    IpInfo: 'IP Information',
    ipAddress: 'IP Address',
    trafficRuleIdisEmpty: 'Traffic Rule Id cannot be empty!',
    dnsRuleIdisEmpty: 'DNS Rule Id cannot be empty!',
    trafficRuleIdisExists: 'Traffic Rule Id already exists!',
    dnsRuleIdisExists: 'DNS Rule Id already exists!'
  },
  container: {
    script: 'Script',
    import: 'Import',
    container: 'Container',
    containerDetail: 'Container Detail',
    containerScript: 'Container Script',
    uploadFile: 'Upload File',
    downloadDemo: 'Download Template',
    configFile: 'Config File',
    configFileText: 'Support two mode switching of browsing and editing',
    format: 'Params Check',
    imageInfo: 'Image Information',
    serviceInfo: 'Service Information',
    mepAgentTip: 'No platform-dependent capabilities, api cannot be released',
    cpuUsage: 'CPU Usage',
    memUsage: 'Memory Usage',
    diskUsage: 'Disk Usage',
    appName: 'Application Name',
    appClass: 'Load Type',
    createTime: 'Creation Time',
    dependent: 'Dependent',
    deploymentStatus: 'Deployment Status',
    podInformation: 'pod Information',
    podName: 'pod Name',
    podStatus: 'pod Status',
    containerName: 'Container Name',
    deployLog: 'Deployment Log',
    eventsInfo: 'Events Info',
    deployAddress: 'Deployment Address',
    serviceInformation: 'Service Information',
    serviceName: 'Service Name',
    serviceType: 'Service Type',
    externalAccessPort: 'External Access Port',
    serviceInternalPort: 'Service Internal Port',
    PodMappingPort: 'Pod Mapping Port',
    servicePortName: 'Service Port Name',
    servicePortProtocol: 'Service Port Protocol'
  },
  sandboxPromptInfomation: {
    imageFileType: 'Please upload files in .rar, .tar, .zip format, and the size does not exceed 5G!',
    addVmSuccess: 'The VM is added successfully!',
    completeContent: 'Please complete the content and click submit again!',
    releaseEnvFailed: 'Failed to release environment!',
    imageInfoErr: 'The image does not exist, please go to "System Image Management" to upload the image!',
    containerScriptUploadTip: 'Please upload files in .yaml or .tgz format!',
    cleanEnvSuccess: 'Release resources successfully!',
    cleanEnvFailed: 'Failed to release resources!',
    noServiceInfo: 'The service information is wrong, please check the file!',
    noImageInfo: 'There is no image information, please check the file!',
    noFormat: 'The parameter verification is wrong, please check the file!',
    imageInfoError: 'information is wrong, please check the file!',
    notInHarbor: 'does not exist in the harbor warehouse, please upload it first!',
    otherError: 'Unknown error',
    addCustomSuccess: 'Custom specification added successfully!',
    deleteInternetSuccess: 'Network configuration deleted successfully!',
    addInternetFaild: 'The maximum number of network configuration data is 4!',
    internetNameRepeat: 'Duplicate network configuration name!',
    startFailed: 'Failed',
    exportFailed: 'Failed',
    addInternetTip: 'Network name cannot be empty!',
    nameRule: 'Please enter 4-32 characters without spaces, not all numbers, which can contain numbers, letters, _, -, and cannot start and end with _,-',
    nameInfoError: 'Please fill in the vm name according to the rules',
    selectSandboxFirst: 'Please select a sandbox first!'
  }
}
export default sandboxEn
