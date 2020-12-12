/*
 *  Copyright 2020 Huawei Technologies Co., Ltd.
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
    download: '下载',
    list: '列表',
    input: '请输入',
    select: '请选择',
    developing: '页面正在开发中。'
  },
  home: {
    mecDeveloper: '开发者平台',
    step: '步骤',
    bannerTitle: '一站式开发者平台',
    bannerText1: '为开发者提供便捷的开发插件',
    bannerText2: '帮助开发者快速完成应用开发和测试',
    bannerText3: '提供开发者入口，包括开发流程、开发工具、开放的API能力、集成测试验证等',
    bannerText4: '使开发者更加方便快捷的开发应用并集成到EdgeGallery平台',
    createProjectTitle: '创建项目',
    createProjectText: '创建一个新项目或查看新建项目的状态。',
    toolsDownloadTitle: '下载开发工具',
    toolsDownloadText: '下载常用工具。',
    commonApiTitle: '常用API',
    commonApiText: '学习和回顾常用API文档。',
    testCaseTitle: '测试',
    testCaseText: '在我们提供的环境中测试您开发的应用。测试完成后，查看测试状态、测试报告等。',
    pluginText: '集成开发环境提供应用开发环境，通常包括代码编辑器、编译器、调试器、图形用户界面等工具。集成开发软件服务套件提供代码编写、分析、编译、调试等功能。',
    seeDetail: '查看详情',
    sdkText: '软件开发工具包是软件工程师用来为特定的软件包、软件框架、硬件平台、操作系统等创建应用软件的开发工具的集合。SDK通常指用于在Windows平台下开发应用程序的SDK。',
    apitext: '应用程序接口的功能已预先定义，它也指连接软件系统不同组件间的协议。基于特定软件或硬件，应用程序和开发人员无需访问原始代码或了解内部工作机制的细节，便可通过应用程序接口提供访问一组例行程序。',
    testText: '该过程运行软件以验证它是否符合指定要求并检测错误。该过程检测现有条件的差异并评估软件项的特征。软件工程中的一项活动，该活动在预定条件下运行软件，以确定软件是否符合预期结果。',
    ecologyText: '开发者可在华为MEC平台上贡献开源资源，积极贡献的开发者可优先在华为MEC平台下载、测试，并可获得开源生态贡献专区颁发的奖牌。欢迎各位开发者积极贡献，帮忙我们提升用户体验，详情请见：http://git@139.9.0.160:MEP/mec-web.git。'
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
    deleteList: '确定要删除列表吗？',
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
    apiText: '请上传.json或者.yaml文件',
    version: '版本',
    uploadNow: '立即上传',
    pluginList: '插件',
    sdkList: 'SDK',
    toolChainText: '请上传.tar.gz文件，且大小不超过10M'
  },
  api: {
    docs: '文档',
    updated: '更新时间',
    modify: '修改',
    downLoad: '下载',
    share: '分享',
    mepapi: 'MEP API',
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
    noDataNotice: '暂无数据。'
  },
  nav: {
    home: '主页',
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
    logOut: '注销',
    help: '帮助',
    contact: '联系我们'
  },
  workspace: {
    configYaml: {
      yamlFileType: '请选择后缀名为".yaml"的文件',
      uploadYamlFirst: '请先上传Yaml',
      importFile: '文件导入',
      config: '可视化配置',
      uploadFile: '上传文件',
      downloadDemo: '模版下载',
      uploadYaml: '上传Yaml',
      uploadYamlTip: '请上传.yaml文件',
      pass: '文件检测通过',
      fail: '文件检测未通过',
      format: '格式校验',
      imageInfo: '镜像信息',
      serviceInfo: '服务信息',
      mepAgent: 'MEP Agent'
    },
    uploadImage: {
      nodeInfoValidation: '请输入正确的IP、端口号，端口号范围30000-30400',
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
      mode1Desc: '镜像包已上传至公共镜像仓库（支持dockerhub、SWR镜像仓库）',
      mode1Tip: '注：已上传到公共仓库的镜像，请在配置文件中直接引用',
      mode2: '方式2:',
      mode2Desc: '上传APP镜像包到EdgeGallery镜像仓库',
      mode2Tip: '注：EdgeGallery会确保用户上传的镜像不被其他用户可见',
      mode3: '方式3:',
      mode3Desc: '不上传镜像（针对私有镜像、无法公开使用）',
      mode3Tip: '注：如果应用开发者不上传镜像，无法为开发者提供沙箱环境，需要用户使用公网连接边缘节点，安装以下软件，并将依赖的镜像提前安装到服务器上'
    },
    supportPlatform: {
      title: '选择要支持的部署平台'
    },
    prepare: {
      toolTip: '根据应用的开发语言，本地安装配置编程IDE',
      pluginTip1: 'Edgegallery提供本地开发的',
      pluginTip2: 'IDE插件',
      pluginTip3: '，可用来生成的样例代码（目前支持python和java语言）',
      codeTip1: 'Edgegallery提供APP本地开发的',
      codeTip2: '示例代码',
      codeTip3: '供开发者参考'
    },
    appRelease: {
      appConfig: '应用配置',
      appTest: '应用测试',
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
      capabilityType: '能力类型'
    },
    workSpace: '工作空间',
    myProjectList: '我的项目',
    addNewProject: '添加新项目',
    projectStatus: '项目状态',
    serial: '序号',
    icon: '图标',
    projectName: '项目名称',
    version: '版本',
    provider: '提供者',
    platform: '平台',
    industry: '行业',
    status: '状态',
    operation: '操作',
    remove: '移除',
    detail: '详情',
    clickHereToAddNewProject: '点击添加新项目',
    createProject: '新建项目',
    migrationProject: '迁移项目',
    basicInformation: '基本信息',
    appName: '应用名称',
    uploadIcon: '上传图标',
    limitition: '请上传.jpg或.png格式文件，或选择默认应用图标，且大小不超过2M',
    iconRequired: '请上传图标',
    chooseAbilities: '选择能力',
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
    applicationDev: '应用开发',
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
    buildTip: '你的应用已经可以被EdgeGallery平台集成，请测试自身APP业务',
    finishTest: '完成测试',
    saveData: '保存',
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
    apiTopText: 'API模拟器提供公共环境用于本地接口调试和线上模拟测试。开发者可以使用模拟器主机地址和应用外部端口号的方式在本地访问，实际部署测试时使用以下服务名+内部端口号进行访问',
    projectDetails: '项目详情',
    releaseDetails: '能力发布详情',
    releaseTest: '应用发布测试',
    developer: '开发者',
    dependentApp: '依赖应用',
    deploymentPlatform: '部署平台',
    uploadFile: '上传文件',
    appStoreMd: '请上传.md文件，用来描述应用介绍、场景等',
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
    appPublishConfig: '应用服务发布配置',
    appPublishSuccess: '应用已发布到AppStore，点击链接查看详情',
    appDetail: '应用详情',
    deploymentStatus: '部署状态',
    startDeployment: '开始部署',
    completeTest: '完成测试',
    recycle: '资源回收',
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
    PODStatus: 'POD状态:',
    PODName: 'Pod名称:',
    downloadLog: '下载日志',
    operatingStatus: '运行状态:',
    container: '容器',
    containerName: '名称',
    containerResource: '资源',
    hostInfo: '节点信息',
    deployConfig: '部署配置'
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
    nameRule: '请输入2-30个字符的名称，开头结尾不能为空',
    versionRule: '请输入2-10个字符的版本，开头结尾不能为空',
    proiderRule: '请输入2-30个字符的提供者名称，开头结尾不能为空',
    introductionRule: '请输入2-260个字符的描述，开头结尾不能为空',
    checkFileType: '请上传符合格式的文件',
    downloading: '正在下载，请稍后...',
    guestPrompt: 'Guest用户无权操作，请先登录！',
    saveSuccess: '保存成功！',
    saveFail: '保存失败！',
    sampleCodeInfo: '没有选择能力服务，不能下载样例代码',
    fileNotReadable: '文件不可读',
    fileIsEmpty: '文件内容为空',
    addSuccess: '添加数据成功',
    editSuccess: '编辑数据成功',
    saveRuleSuccess: '保存规则成功',
    editRuleSuccess: '编辑规则成功',
    saveRuleFail: '保存规则失败',
    editRuleFail: '编辑规则失败',
    appReleaseSuccess: '应用发布成功',
    appReleaseFail: '应用发布失败'
  },
  breadCrumb: {
    mecDeveloper: 'MEC开发者',
    api: 'API',
    applicationApi: '开发者平台API',
    mepapi: 'MEP API',
    mepecoapi: 'MEP-ECO API',
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
    workspace: '工作空间'
  },
  ...zhLocale
}
export default cn
