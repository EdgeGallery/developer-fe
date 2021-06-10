/*
 *  Copyright 2020-2021 Huawei Technologies Co., Ltd.
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

import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
const cn = {
  common: {
    cancel: '取消',
    confirm: '确认',
    close: '关闭',
    download: '下载',
    list: '列表',
    input: '请输入',
    select: '请选择',
    developing: '页面正在开发中。',
    edit: '编辑',
    save: '保存',
    search: '搜索',
    reset: '重置',
    delete: '删除',
    status: '状态',
    operation: '操作',
    all: '全部',
    unknown: '未知'
  },
  home: {
    enterDev: '进入开发',
    select: '选择',
    start: '开始'
  },
  footer: {
    about: '关于',
    website: '官网',
    videoResource: '视频资源',
    trainingMaterials: '培训材料',
    communication: '沟通交流',
    softwareDownload: '软件下载',
    community: '社区介绍',
    project: '项目',
    membership: '会员',
    contactUs: '联系我们',
    followUs: '关注我们',
    WeChatPublic: '微信公众号',
    codeWarehouse: '代码仓库',
    followWeibo: '关注微博',
    mailingList: '邮件列表',
    copyright: '版权所有 © EdgeGallery 2019 - 2021 保留一切权利 请参见法律声明',
    legalNotice: '法律声明',
    privacyPolicy: '政策隐私'
  },
  devTools: {
    mecDeveloper: 'MEC开发者',
    pluginName: '插件名称',
    description: '描述',
    author: '作者',
    score: '评分',
    chooseFunction: '请选择功能',
    enterSearch: '请输入关键词',
    detail: '详情',
    delete: '删除',
    deletePlugin: '确定要删除插件吗？',
    deleteProject: '确定要删除项目吗？',
    deleteReport: '确定要删除报告吗？',
    deleteSucc: '删除数据成功',
    deleteFail: '删除数据失败',
    applicationName: '应用名称',
    applicationVersion: '应用版本',
    downloads: '下载次数',
    satisfaction: '满意度',
    pluginDescription: '插件描述',
    submitRate: '请评分',
    upload: '上传',
    pluginFunction: '插件语言',
    pluginType: '插件类型',
    uploadPlugin: '上传插件',
    fileText: '请上传.zip,.rar格式文件，且大小不超过20MB',
    uploadLogo: '上传图标',
    logoText: '请上传.jpg或.png格式文件，或选择默认应用图标，且大小不超过2M',
    uploadApi: '上传API',
    uploadApiFile: 'API定义文件',
    apiText: '请上传.json或者.yaml文件',
    version: '版本',
    uploadNow: '立即上传',
    pluginList: '插件',
    sdkList: 'SDK',
    toolChainText: '请上传.tar.gz文件，且大小不超过10M',
    toolChainInfo1: '工具链是MEC Developer开发者平台中的一个重要特性，当x86平台的App想要上车ARM平台时，底层的代码不可避免的需要进行修改或重写。 App提供者可以通过MEC Developer开发者平台中集成的工具链进行源代码分析，定位需要修改的源代码并根据指导意见进行修改，方便App 部署在ARM平台。',
    toolChainInfo2: '目前，可以对以下文件进行分析',
    toolChainInfo3: 'C/C++软件源码',
    toolChainInfo4: 'C/C++软件构建工程文件',
    toolChainInfo5: 'X86汇编代码'
  },
  api: {
    docs: '文档',
    updated: '更新时间',
    modify: '修改',
    downLoad: '下载',
    share: '分享',
    applicationAPI: '应用API',
    faceRecognition: '人脸识别',
    vr: 'VR',
    ar: 'AR',
    name: '名称',
    description: '描述',
    apiDetail: 'API详情',
    network: '网络',
    computing: '计算',
    ai: 'AI',
    video: '视频',
    serviceIntroduction: '服务介绍',
    serviceList: '服务列表',
    deleteApi: '点击删除已公开的API',
    usageInstruction: '使用说明',
    serviceSelection: '服务选择：',
    noDataNotice: '暂无数据',
    installGuide: '安装指导',
    hotServices: '热门服务',
    capabilitieTitle: '边缘能力随心选择',
    capabilitieTitle2: '极致体验触手可及',
    capabilitieOneTip: 'EdgeGallery服务全景图',
    capabilitieTwoTip: '开发者实践专区',
    serviceDoc: '服务文档',
    onlineEmulator: '在线模拟器',
    videoTutorial: '视频教程课堂专区',
    developerCommunity: '问答社区',
    Detail: '查看详情',
    videoTutorialDetail: '指导开发者基于EdgeGallery平台进行app应用开发、部署调测、测试认证以及应用发布的全流程。',
    developerCommunityDetail: '用于开发者的交流和学习。',
    telecomStandardCapabilitieTitle: '电信标准支持全景图',
    swithToAPI: '点击跳转到接口在线模拟器界面',
    onlineExperience: '在线体验',
    onlineService: '在线体验服务暂未开通',
    mostPopular: '最受欢迎',
    latestUpdate: '最新更新',
    hot: '热度',
    showMore: '显示更多',
    partition: '所属分区'
  },
  nav: {
    home: '首页',
    devtools: '开发工具',
    plugin: '插件',
    sdk: 'SDk',
    upload: '上传',
    api: 'API',
    introduction: '简介',
    mepApi: '能力中心',
    applicationApi: '应用API',
    test: '测试',
    howTest: '如何测试',
    testApplication: '测试应用',
    testTask: '测试任务管理',
    mecOpenSource: 'MEC开源生态',
    workSpace: '工作空间',
    search: '搜索',
    logIn: '登录',
    userAccountCenter: '我的帐号',
    logOut: '注销',
    help: '帮助',
    contact: '联系我们',
    serviceDoc: '服务文档',
    apiMulator: '在线模拟器'
  },
  workspace: {
    projectStatusEnum: {
      createNew: '新建',
      testing: '测试中',
      tested: '测试完成',
      released: '已发布'
    },
    configYaml: {
      yamlFileType: '请选择后缀名为".yaml"的文件',
      uploadYamlFirst: '请先上传Yaml或者进行可视化配置',
      importFile: '文件导入',
      config: '可视化配置',
      uploadFile: '上传文件',
      downloadDemo: '模版下载',
      uploadYaml: '上传',
      uploadYamlTip: '请上传.yaml文件',
      pass: '文件检测通过',
      fail: '文件检测未通过',
      format: '格式校验',
      imageInfo: '镜像信息',
      serviceInfo: '服务信息',
      mepAgent: 'MEP Agent（如果没有集成mepagent，将无法发布API）'
    },
    uploadImage: {
      successfulTest: '测试成功',
      failTest: '测试失败',
      testfirst: '请先测试',
      useEnvTip: '注：启动后，系统不会再分配公共测试环境，所有测试任务在用户自己的服务器上完成',
      useEnv: '启用环境:',
      test: '测试',
      importNode: '导入节点信息IP:',
      installation: '安装向导',
      software: '软件',
      version: '版本',
      uploadAppImage: '上传APP镜像包',
      mode1: '方式1:',
      mode1Desc: '镜像包上传至公共镜像仓库（支持dockerhub、SWR镜像仓库）',
      mode1Tip: '注：已上传到公共仓库的镜像，请在配置文件中直接引用',
      mode2: '方式2:',
      mode2Desc: '镜像包上传至EdgeGallery镜像仓库',
      mode2Tip: '注：EdgeGallery会确保用户上传的镜像不被其他用户可见',
      mode3: '方式3:',
      mode3Desc: '镜像包上传至私有边缘节点',
      mode3Tip: '如何搭建私有边缘节点，请参考'
    },
    supportPlatform: {
      title: '选择要支持的部署平台'
    },
    deployFailLog: {
      CSAR: '应用包生成失败，请检查是否上传部署文件',
      hostInfo: '没有可用的沙箱环境，请配置沙箱环境',
      instantiateInfo: '应用实例化失败，可能原因有： 1.沙箱环境配置有误 2.应用名或者端口已被占用 3.其他问题请联系管理员处理',
      workStatus: '获取应用状态失败,可能原因：镜像拉取失败，其他问题联系管理员处理'
    },
    prepare: {
      toolTip: '根据开发语言，选择合适的编程IDE，进行本地安装并完成相关的配置。',
      pluginTip1: 'EdgeGallery平台提供了本地开发使用的',
      pluginTip2: 'IDE插件',
      pluginTip3: '，可用来生成的样例代码（目前支持Python和Java语言）',
      codeTip1: 'EdgeGallery提供以下APP本地开发的示例代码供开发者参考，',
      codeTip2: '或者',
      codeTip3: '点击下载到本地'
    },
    appRelease: {
      appConfig: '应用配置',
      appCertify: '应用认证',
      startTest: '启动测试',
      appRelease: '应用发布',
      addFilter: '添加流量过滤器',
      srcAddress: '源IP地址',
      srcPort: '源端口号',
      dstAddress: '目的IP地址',
      dstPort: '目的端口号',
      trafficRuleId: '流规则标识',
      filterType: '过滤类型',
      priority: '优先级',
      protocol: '协议类型',
      action: '规则动作',
      dnsRuleId: 'DNS规则标识',
      ipAddress: 'IP地址',
      ipAddressType: 'IP地址类型',
      domainName: 'FQDN域名',
      ttl: '有效时长',
      checkRules: '查看详情',
      dnsRule: 'DNS规则',
      trafficRule: '分流规则',
      trafficFilter: '流过滤规则',
      tag: '标签',
      tgtTunnelAddress: '隧道目的地址',
      dstTunnelPort: '隧道目的端口',
      srcTunnelAddress: '隧道源地址',
      srcTunnelPort: '隧道源端口',
      multipleIP: '多个IP请用\',\'分隔',
      multiplePort: '多个端口请用\',\'分隔',
      forwardInterface: '转发接口信息',
      newInterface: '新增接口信息',
      interfaceType: '接口类型',
      tunnelType: '隧道类型',
      tunnelParams: '隧道指定参数',
      macAddress: '目的MAC地址',
      sourceMacAddress: '源MAC地址',
      interfaceInfo: '接口信息',
      tunnelInfo: '隧道信息',
      macInfo: 'MAC信息',
      IpInfo: 'IP信息',
      capabilityType: '能力类型',
      noService: '您的应用没有依赖平台的生态服务',
      blackWhiteList: '黑白名单',
      UEIdentity: 'UE标识'
    },
    deployDebugVm: {
      vmNameLbl: '名称',
      vmSpecLbl: '规格',
      vmImageLbl: '镜像',
      vmNetworkLbl: '网络',
      vmIpLbl: 'IP地址',
      vmStatusLbl: '状态',
      vmApplyTimeLbl: '申请时间',
      vncBtnLbl: '远程登录',
      uploadBtnLbl: '上传代码',
      deleteBtnLbl: '删除',
      createImage: '生成镜像',
      applyResource: '申请资源',
      configSpec: '规格设置',
      configNetwork: '网络设置',
      otherSetting: '其他设置',
      vmName: '虚拟机名称',
      selectVmSpecTip: '选择虚拟机规格',
      vmSpecMustSelectTip: '请选择虚拟机规格！',
      scene: '适用场景',
      memory: '内存',
      systemDisk: '系统盘',
      dataDisk: '数据盘',
      otherAbility: '其它能力',
      selectVmImageTip: '选择镜像',
      publicImage: '公有镜像',
      privateImage: '私有镜像',
      selectVmSystemTypeTip: '系统类型',
      selectVmSystemImageTip: '系统镜像',
      vmSystemImageMustSelectTip: '请选择系统镜像！',
      selectNetworkTypeTip: '选择网络类型',
      networkType: '网络类型',
      vmNetworkTypeMustSelectTip: '请选择网络类型！',
      uploadApp: '上传应用代码包',
      selectFile: '选择包文件',
      upload: '开始上传',
      uploadAppFileTip: '请上传.zip,.rar,.tar格式文件，且大小不超过500MB',
      appPackageFileEmpty: '请选择应用代码包文件！',
      deleteVmResPrompt: '确定要删除该虚拟机资源吗？',
      loadVmConfigFailed: '加载虚拟机资源配置失败！',
      applyVmResStart: '开始保存资源配置',
      applyVmResFailed: '保存资源配置失败！',
      deleteVmResSuccess: '删除虚拟机资源成功！',
      deleteVmResFailed: '删除虚拟机资源失败！',
      createImageText: '应用调测完成，生成镜像',
      generate: '生成',
      stageStatus: '阶段状态',
      uploadPromt: '注：文件默认上传到虚拟机的根目录下',
      vmList: '虚拟机资源详情',
      deployResultList: '部署调测结果',
      deleteVmDeployList: '确定要删除该部署调测结果吗？',
      resourceConfigPromt: '请先进行资源配置',
      releasePromt: '应用没有资源配置，不能进行发布操作',
      flavorExtraSpecs: '主机主配置',
      useScript: '是否使用注入脚本',
      resourceConfig: '资源配置'
    },
    visualConfig: {
      podBasicInfo: 'Pod基本信息',
      podNameVerify: 'pod Name不能为空，不能包含下划线',
      workContainer: '工作容器',
      containerNameVerify: '容器名称不能为空',
      imageInfoVerify: '镜像信息格式：imageName:version',
      pullStrategy: '拉取策略',
      internalPort: '内部端口',
      internalPortVerify: '内部端口不能为空',
      envVariable: '环境变量',
      variableName: '变量名',
      variableValue: '值',
      commandLine: '命令行',
      accessMethod: '访问方式Service',
      serviceNameVerify: 'service Name不能为空，不能包含下划线',
      destinationPort: '目标端口',
      destinationPortVerify: '目标端口不能为空',
      nodePort: '节点端口',
      nodePortVerify: '节点端口不能为空',
      viewYamlFile: '查看Yaml文件',
      saveConfigSuccess: '保存配置成功',
      saveConfigFail: '保存配置失败',
      visualConfigFile: '可视化配置文件'
    },
    workSpace: '工作空间',
    myProjectList: '我的项目',
    addNewProject: '添加新项目',
    projectStatus: '项目状态',
    serial: '序号',
    icon: '图标',
    projectName: '项目名称',
    projectType: '项目类型',
    version: '版本',
    provider: '提供者',
    platform: '平台',
    industry: '行业',
    createDate: '创建时间',
    status: '状态',
    operation: '操作',
    remove: '移除',
    detail: '详情',
    statusNew: '新建',
    statusDeploying: '部署中',
    statusSuccess: '部署成功',
    statusFail: '部署失败',
    statusTesting: '测试中',
    statusTested: '测试完成',
    statusReleased: '已发布',
    createProject: '新建应用开发项目',
    migrationProject: '新建应用集成项目',
    basicInformation: '基本信息',
    registInformation: '注册信息',
    appName: '应用名称',
    uploadIcon: '上传图标',
    limitition: '请上传.jpg或.png格式文件，或选择默认应用图标，且大小不超过2M',
    iconRequired: '请上传图标',
    chooseAbilities: '能力选择',
    openMEPCapabilities: 'EdgeGallery能力',
    chooseMepC: '选择需要的EdgeGallery能力',
    seviceDiscovery: '业务发现',
    dns: '域名解析',
    location: '位置',
    traffic: '流量',
    bandwith: '宽带',
    rnis: '无线网络信息服务',
    fiveGcapabilities: '5GC能力',
    openMEPECOCapabilities: 'EdgeGallery-eco能力',
    chooseMEPeco: '选择需要的EdgeGallery-eco能力',
    previous: '上一步',
    next: '下一步',
    selectionAbilitiesDetail: '选择能力详情',
    platformCapabilities: '平台能力',
    service: '服务',
    serviceVersion: '服务版本',
    serviceDescription: '服务描述',
    selectLeastOne: '至少选择一个',
    projectLink: '项目链接',
    toolChain: '工具链',
    programTools: '编程工具',
    programPlugin: '编程插件',
    sampleCode: '示例代码',
    confirm: '确认',
    capabilityDetails: '能力详情',
    deploymentTest: '部署调测',
    applicationRelease: '应用发布',
    environmentPreparation: '开发环境准备',
    environmentPreparationTip: '根据应用开发需求，准备一下开发环境',
    choosePlatform: '选择部署平台',
    selectImage: '上传App镜像',
    configureYaml: '配置部署文件',
    server: '选择服务器',
    test: '部署测试',
    abilitiesDetail: '能力详情',
    appDevelopment: '应用开发',
    appIntegration: '应用集成',
    buildTip: '你的应用已经可以被EdgeGallery平台集成，请测试自身APP业务',
    finishTest: '完成测试',
    saveData: '保存配置',
    statistics: '数据统计',
    realTimeStatistics: '实时统计',
    performaceStatistics: '性能统计',
    first: '第一步',
    buildDocker: '构建Docker镜像',
    second: '第二步',
    chooseFile: '拖动镜像文件到这里，或者点击上传',
    remoteaddress: '或者给一个远端支持标准仓库命令的地址',
    name: '名称',
    architecture: '架构',
    address: '地址',
    deploy: '部署',
    description: '描述',
    selectRepository: '选择存储库',
    select: '请选择',
    nextStep: '下一步',
    publish: '发布',
    publishtext: '是否发布您的APP到EdgeGallery 应用商店',
    publictext: '是否公开您的APP的API能力到EdgeGallery生态系统',
    method1: '方式1：选择镜像（选择平台提供的App镜像，用于快速部署上线）',
    method2: '方式2：指定镜像包（需要用户先自己上传到镜像仓库）',
    imagename: '镜像名称',
    imageversion: '版本',
    port: '端口号',
    add: '添加',
    method3: '方式3：上传App镜像包（上传镜像包后，系统会自动将镜像推送至系统仓库）',
    method4: '方式4：上传App源码（上传源码后，系统会自动进行编译生成镜像，并推送至xxx仓库）',
    uploadYaml: '上传Yaml',
    uploadApppackage: '上传APP镜像包',
    appimage: 'App镜像',
    addimage: '添加镜像',
    servicename: '服务名称',
    href: '链接',
    internalPort: '内部端口号',
    outPort: '外部端口号',
    confirmUpload: '确定上传',
    uploadSourceCode: '上传源代码',
    storagePath: '源代码存放路径',
    checkItem: '检查项目：编译器选项、编译器宏、汇编程序、内置函数、属性',
    targetOS: '目标操作系统',
    buildTools: '构建工具',
    compileCommand: '编译命令',
    compilerVersion: '编译器版本',
    targetVersion: '目标系统内核版本',
    analysis: '分析',
    historicalReport: '历史报告',
    sourceCodePath: '源代码存放路径',
    analysisResults: '分析结果',
    needtranscount: '需要移植的源文件',
    codeCount: '需要移植的代码行数',
    makefileSourceCode: 'C/C++和Makefile源代码',
    lines: '行',
    assemblyCode: '汇编代码',
    downloadReport: '下载报告',
    startDeploySucc: '已经开始部署',
    startDeployFail: '部署失败',
    deploying: '正在部署，请稍后...',
    uploadCodeFail: '上传源码失败！',
    reportPromt: '您的报告已过期，无法在线查看，请下载后查看',
    serviceDetails: '服务详情',
    releaseTime: '发布时间',
    sdkDownload: 'SDK 下载',
    apiTopText: 'API模拟器提供公共环境用于本地接口调试和线上模拟测试。开发者可以使用模拟器主机地址和应用外部端口号的方式在本地访问，实际部署测试时通过调用mep服务发现接口查看具体服务的url',
    projectDetails: '项目详情',
    releaseDetails: '能力发布详情',
    releaseTest: '应用发布测试',
    developer: '开发者',
    dependentApp: '依赖应用',
    noDependent: '无依赖',
    deploymentPlatform: '部署平台',
    uploadFile: '说明文档',
    appStoreMd: '请上传.md文件，用来介绍APP的基本功能、使用场景等',
    apiFunctionMd: '请上传.md文件，用来描述API功能、使用等',
    routeConfig: '路由配置',
    protocol: '协议',
    appDetails: '应用包详情',
    appTest: '应用测试',
    releaseText: '应用发布之前需要进行测试',
    instantiateId: '实例化ID',
    applicationDesc: '应用描述',
    ruleConfig: '应用规则配置',
    trafficRules: '流量规则',
    dnsRules: 'DNS规则',
    appPublishConfig: '服务发布配置',
    appPublishSuccess: '应用已发布到AppStore，点击链接查看详情',
    appDetail: '应用详情',
    deploymentStatus: '部署状态',
    startDeployment: '开始部署',
    completeTest: '完成测试',
    recycle: '释放资源',
    completeMsg: '点击完成测试后，会释放环境资源，否则平台会在24小时后自动释放环境资源',
    deploymentSuccess: '部署成功',
    createDeploymentFile: '生成部署文件',
    assignTestNodes: '分配测试节点',
    applicationRelease2: '应用下发',
    instantiateApplication: '实例化应用',
    getDeploymentStatus: '获取部署状态',
    deploymentComplete: '部署完成',
    deploymentResult: '部署结果',
    testMsg: '你的应用已经可以被EdgeGallery平台集成，请测试APP业务',
    PODStatus: 'POD状态',
    PODName: 'Pod名称',
    downloadLog: '下载日志',
    operatingStatus: '运行状态',
    container: '容器',
    containerName: '容器名称',
    containerResource: '资源',
    hostInfo: '节点信息',
    selectEnv: '选择测试环境',
    uploadConfigMessage: '请上传部署文件',
    deployConfig: '部署配置',
    clearEnv: '已清空环境',
    clearEnvFail: '清空环境失败',
    unUploaded: '未上传',
    uploaded: '已上传',
    privateHost: '私有节点',
    publicHost: '公有节点',
    capabilityInfo1: '请选择您的应用需要依赖的生态服务，有关生态能力详情请查看',
    capabilityInfo2: '。如果是集成项目，或者您的服务不需要依赖其他服务，可以跳过该步骤继续创建。',
    availableService: '可选服务',
    selectedService: '已选服务',
    recycleTip: '注：测试完成请及时释放资源，避免资源占用，否则系统24小时后自动释放',
    noService: '您暂未选择任何服务',
    testNode: '测试节点IP',
    podBelongsTo: '所属Pod',
    cpuUsage: 'CPU使用率',
    memUsage: '内存使用率',
    diskUsage: '硬盘使用率',
    deployType: '负载类型',
    containerImage: '容器',
    vmImage: '虚拟机',
    podEventsInfo: 'Pod日志详情',
    projectExist: '已存在同名、同版本、同提供商的应用',
    refresh: '刷新'
  },
  test: {
    howToTest: {
      howToTest: '如何测试',
      updated: '更新时间',
      modify: '修改',
      share: '分享',
      apply: '立即测试'
    },
    testApp: {
      uploadApp: '上传应用',
      appFormat: '请上传.csar文件，且大小不超过20MB。',
      uploadLogo: '上传图标',
      logoFormat: '请上传.jpg或.png格式文件，或选择默认应用图标，且大小不超过2M',
      affinity: '亲和性',
      type: '类型',
      choosetype: '请选择类型',
      description: '描述',
      upload: '立即上传',
      cancel: '取消'
    },
    testTask: {
      appName: '应用名称',
      testStatus: '测试状态',
      startTime: '提交时间',
      endTime: '测试结束时间',
      reset: '重置',
      inquire: '查询',
      taskNumber: '任务编号',
      applicationName: '应用名称',
      version: '版本',
      applicationTime: '提交时间',
      operation: '操作',
      checkReport: '检查报告',
      upload: '上传',
      report: {
        ticket: '任务单号',
        basicInfo: '基本信息',
        packageName: '包名称',
        status: '状态',
        details: '详情'
      }
    }
  },
  mecOpen: {
    mecOpen: 'MEC开源生态',
    info: '开发者可在华为MEC平台上贡献文档、组件及开发插件等开源贡献。积极贡献的开发者可优先在华为MEC平台下载、测试，并可获得开源生态贡献专区颁发的奖牌，欢迎各位开发者积极贡献，帮助我们提升用户体验，改善我们的生态环境。',
    contribution: '贡献排行榜',
    code: '贡献代码',
    lines: '行'
  },
  promptMessage: {
    prompt: '提示',
    noPermission: '您没有权限进入用户管理页面！',
    uploadSuccess: '上传成功！',
    uploadFailure: '上传失败！',
    uploadYamlFailure: '文件内容有误，请参考样例文件！',
    nameEmpty: '名称不能为空！',
    pluginNameEmpty: '插件名称不能为空！',
    pluginFunEmpty: '插件语言不能为空！',
    plugTypeEmpty: '插件类型不能为空！',
    pluginFileEmpty: '插件文件不能为空！',
    logoEmpty: '图标不能为空！',
    apiEmpty: 'API文件不能为空！',
    versionEmpty: '版本不能为空！',
    descriptionEmpty: '描述不能为空！',
    moreThan500: '只能上传不超过500KB的文件！',
    moreThan2: '只能上传不超过2MB的文件！',
    moreThan10M: '只能上传不超过10MB的文件！',
    moreThan20M: '只能上传不超过20MB的文件！',
    moreThan500M: '只能上传不超过500MB的文件！',
    onlyOneFile: '仅支持一个文件，请先移除已有文件！',
    fileNameType: '文件名称不能包含空格！',
    notPicture: '请上传图片',
    appEmpty: 'app不能为空！',
    affinityEmpty: '架构不能为空！',
    typeEmpty: '类型不能为空！',
    testSuccess: '启动测试成功！',
    testFail: '启动测试失败！',
    testComplete: '测试完成，请单击查看报告',
    addProjectSuccess: '新增项目成功！',
    addProjectFail: '新增项目失败！',
    checkNamePass: '认证失败，请检查用户名或密码。',
    checkCaptcha: '验证码无效，请检查验证码。',
    registerSuccess: '用户注册成功！',
    resisterFail: '用户注册失败。 ',
    logoutPage: '您确定要退出吗？',
    yesBtn: '是',
    noBtn: '否',
    loginexpired: '登录已过期，请重新登录！',
    imageNameErr: '镜像名称不能为空',
    uploadApiFile: '请上传Api文件',
    uploadYamlFile: '请上传Yaml文件',
    uploadFileMsg: '请上传一个APP镜像或Yaml文件',
    service: '请输入完整的服务内容',
    addImage: '请添加镜像',
    selectService: '请选择一个服务器！',
    selectCommand: '编译命令不能为空！',
    codeEmpty: '源码不能为空！',
    analysisCodeFail: '分析任务失败！',
    uploadCodeText: '正在上传源代码，请稍候...',
    analyzingText: '正在分析，请稍候...',
    loadingText: '正在加载，请稍候...',
    logoutFail: '注销失败，请重试！',
    contrastTime: '提交时间不能早于测试结束时间！',
    imageVersionErr: '版本不能为空',
    yamlFileType: '请选择后缀名为".yaml、.json"的文件',
    projectNameEmpty: '应用名称不能为空',
    providerEmpty: '提供者不能为空',
    architectureEmpty: '架构不能为空',
    industryEmpty: '行业不能为空',
    getDataFail: '获取数据失败！',
    isPublishFailed: '发布到EdgeGallery 应用商店失败！',
    isPublicFailed: '公开API能力到EdgeGallery生态系统失败！',
    canOnlyUpload: '只能上传.csar文件类型',
    pluginNameRule: '请输入1-30个字符的插件名称，开头不能为空',
    nameRule: '请输入不含空格的4-32个字符名称，可以包含数字、字母、_、-，开头结尾不能为_、-',
    versionRule: '请输入1-10个字符的版本号，只能包含数字、字母、_、-和空格，开头不能为空',
    providerRule: '请输入1-30个字符的提供者名称，开头不能为空',
    introductionRule: '请输入1-128个字符的描述，开头不能为空',
    checkFileType: '请上传符合格式的文件',
    downloading: '正在下载，请稍后...',
    guestPrompt: 'Guest用户无权操作，请先登录！',
    saveSuccess: '保存成功！',
    saveFail: '保存失败！',
    sampleCodeInfo: '没有选择能力服务，不能下载样例代码',
    fileNotSupport: '压缩文件，不支持在线浏览',
    fileIsEmpty: '文件内容为空',
    addSuccess: '添加数据成功',
    editSuccess: '编辑数据成功',
    saveRuleSuccess: '保存规则成功',
    editRuleSuccess: '编辑规则成功',
    saveRuleFail: '保存规则失败',
    editRuleFail: '编辑规则失败',
    appReleaseSuccess: '应用发布成功',
    appReleaseFail: '应用发布失败',
    deployTypeEmpty: '负载类型不能为空',
    isPublished: '应用已经发布到应用仓库',
    notDeploy: '应用没有部署调测，不能进行发布操作',
    ipErrorInfo: '请输入正确的IP地址',
    hostErrorInfo: '请输入正确的Host地址',
    portErrorInfo: '端口号范围30000-30400',
    systemCapaNameCn: '请输入长度1-20的中文名称',
    systemCapaNameEn: '请输入长度1-40的英文名称',
    systemCapaDescCn: '请输入长度1-100的中文描述',
    systemCapaDescEn: '请输入长度1-200的英文描述',
    systemServiceName: '请输入长度1-20的服务名称',
    systemProviderName: '请输入长度1-20的供应商名称',
    systemDocument: '请上传中文和英文说明文档',
    imageFileType: '请上传.rar，.tar，.zip格式的文件，且大小不超过5G',
    imageInfoErr: '请确保镜像信息正确'
  },
  breadCrumb: {
    mecDeveloper: '首页',
    api: 'API',
    applicationApi: '开发者平台API',
    apiDetail: 'API详情',
    docs: '文档',
    mecOpenSourceEcology: '社区',
    devTools: '开发工具',
    detail: '详情',
    upload: '上传',
    test: '测试',
    testApplication: '测试应用',
    howToTest: '如何测试',
    testReport: '测试报告',
    testTask: '测试任务',
    workspace: '工作空间',
    system: '系统',
    systemProject: '项目管理',
    systemMep: '能力中心管理',
    systemHost: '沙箱管理',
    systemImgMgmt: '系统镜像管理'
  },
  system: {
    upload: '上传',
    name: '名称',
    addHost: '新增沙箱环境',
    pleaseInput: '请输入',
    pleaseUpload: '请上传',
    error: '失败',
    success: '成功',
    correct: '正确',
    address: '部署区域',
    username: '用户名',
    password: '密码',
    char: '字符',
    useDetail: '使用详情',
    deleteConfirm: '确定删除吗？',
    userId: '用户ID',
    projectId: '项目ID',
    deployTime: '部署时间',
    deleteTime: '删除时间',
    addMep: '新增服务',
    basicInfo: '基本信息',
    registerInfo: '注册信息',
    capType: '能力分类',
    capTypeOPENMEP: '生态能力',
    serviceName: '服务名称',
    inPort: '端口号',
    version: '版本',
    provider: '提供商',
    apiFileId: 'API定义文件',
    fileExceed: '最多上传一个文件',
    guideFileId: '说明文档',
    guideFileId_zh: '中文说明文档',
    guideFileId_en: '英文说明文档',
    zh_cn: '中文',
    en: '英文',
    portRange: '端口范围',
    config_id: '配置文件',
    other: '其他',
    log: {
      userName: '使用者',
      projectName: '项目名',
      appInstancesId: '实例化ID',
      deployTime: '使用时间',
      status: '状态',
      operation: '操作'
    },
    type: '类型',
    lcmIp: 'lcmIP',
    mecHost: 'mecHost',

    imageMgmt: {
      imgName: '镜像名称',
      imgType: '镜像类型',
      osName: '操作系统',
      osVersion: '版本',
      osBit: '位数',
      sysDisk: '磁盘大小',
      userName: '所属用户',
      createTime: '创建时间',
      uploadTime: '上传时间',
      imgFormat: '镜像格式',
      beginTime: '起始时间',
      endTime: '结束时间',
      typeValue: {
        public: '公共',
        private: '私有'
      },
      statusValue: {
        uploadWait: '待上传',
        uploading: '正在上传',
        uploadSucceeded: '上传成功',
        uploadFailed: '上传失败',
        published: '已发布'
      },
      uploadStatusText: {
        success: '上传成功',
        error: '上传失败',
        uploading: '正在上传',
        paused: '暂停',
        waiting: '等待'
      },
      operation: {
        newImg: '新建系统镜像',
        upload: '上传',
        selectImgFile: '选择文件',
        publish: '发布'
      },
      tip: {
        newImg: '新建系统镜像',
        editImg: '修改系统镜像',
        viewImg: '查看系统镜像详情',
        nameRule: '请输入有效的系统镜像名称，不能包含空格，4-32个字符！',
        versionEmpty: '系统版本号不能为空！',
        versionRule: '请输入有效的系统版本号，包含1-10个字符！',
        systemDiskEmpty: '系统磁盘大小不能为空！',
        systemDiskRule: '请输入两到四位的整数！',
        uploadImg: '上传系统镜像',
        uploadIsoImgPromt: '请把iso格式的镜像文件压缩为zip后上传。',
        uploadQcow2ImgPromt: '请把qcow2格式的镜像文件压缩为zip后上传。',
        sysImageFileType: '请上传.zip格式的文件，且大小不超过5G！',
        onlyOneImageFile: '只能上传一个文件！',
        noFileSelected: '未选择上传的文件',
        confirmDeleteImage: '确认要删除该系统镜像吗？',
        confirmPublishImage: '确认要发布该系统镜像吗？',
        confirmReUploadImage: '已经上传了该系统镜像，再次上传将覆盖原有镜像。是否继续？',
        confirmDownloadImage: '系统镜像文件较大，下载耗时较长。是否继续下载该镜像？',
        systemNameExist: '已存在同名的系统镜像！',
        newImgFailed: '新建系统镜像失败！',
        modifyImgFailed: '修改系统镜像失败！',
        deleteImgFailed: '删除系统镜像失败！',
        publishImgFailed: '发布系统镜像失败！',
        queryImgFailed: '查询系统镜像失败！',
        uploadingHint: '系统镜像正在上传，请等待！'
      }
    }
  },
  ...zhLocale
}
export default cn
