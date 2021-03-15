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

import enLocale from 'element-ui/lib/locale/lang/en'
const en = {
  common: {
    cancel: 'Cancel',
    confirm: 'Confirm',
    close: 'Close',
    download: 'Download',
    list: 'List',
    input: 'Please enter the',
    select: 'Please select',
    developing: 'The page is under development.'
  },
  home: {
    mecDeveloper: 'Developer',
    step: 'STEPS',
    bannerTitle: 'One-stop application integration development platform',
    bannerText1: 'Abundant 5G APPs | Real 5G Lab Environment | Wizard-based DevelopmentWizard-based development process',
    bannerText2: 'Codeless or low-bit-rate integration',
    bannerText3: 'Abundant 5G network, industry, and IT capabilities',
    bannerText4: 'Real E2E 5G verification environment',
    bannerText5: 'Standard application certification and release specifications',
    pluginText: 'The integrated development environment is an application program used to provide the development environment of the program, which generally includes code editor, compiler, debugger, GUI and other tools. Integrated development software service suite with code writing function, analysis function, compilation function, debugging function, etc.',
    seeDetail: 'See Details',
    sdkText: 'Software development kit is a collection of development tools used by software engineers to create application software for specific software packages, software frameworks, hardware platforms, operating systems, etc. Generally speaking, SDK is the SDK used to develop applications under Windows platform.',
    apitext: 'Application program interface is defined function in advance, or it refers to the agreement of connecting different components of software system. The purpose is to provide the ability for applications and developers to access a set of routines based on a certain software or hardware without accessing the original code or understanding the details of internal working mechanism.',
    testText: 'The process of executing software to verify that it meets specified requirements and detects errors. Detect the differences between existing conditions, and evaluate the characteristics of software items. An activity in the software engineering process that runs software under predetermined conditions to determine whether the software meets expected results.',
    ecologyText: 'We provide open source contributions to developers on the Huawei MEC platform, and developers who actively contribute will enjoy the priority download and test rights of Huawei MEC Developer Platform, and will reward medals in the open source eco-contribution section. Developers are welcome. Contribute your ability to help us improve the user experience at: http://git@139.9.0.160:MEP/mec-web.git.',
    travelStart: 'Start your application integration development journey'
  },
  devTools: {
    mecDeveloper: 'MEC Developer',
    pluginName: 'Plugin Name',
    description: 'Description',
    author: 'Author',
    score: 'Score',
    chooseFunction: 'Please Choose Function',
    enterSearch: 'Enter To Search',
    detail: 'Detail',
    delete: 'Delete',
    deletePlugin: 'Are you sure you want to delete the plugin?',
    deleteProject: 'Are you sure you want to delete the project?',
    deleteReport: 'Are you sure you want to delete the report?',
    deleteSucc: 'Data deleted successfully',
    deleteFail: 'Failed to delete data',
    applicationName: 'Application Name',
    applicationVersion: 'Application Version',
    downloads: 'Downloads',
    satisfaction: 'Satisfaction',
    pluginDescription: 'Plugin Description',
    submitRate: 'Please submit your rating',
    upload: 'Upload',
    pluginFunction: 'Plugin Language',
    pluginType: 'Plugin Type',
    uploadPlugin: 'Upload Plugin',
    fileText: 'Please upload files in .zip, .rar format, and the size does not exceed 20MB',
    uploadLogo: 'Upload Logo',
    logoText: 'Can only upload .jpg/.png files or select the default APP icon and no more than 2M',
    uploadApi: 'Upload API',
    uploadApiFile: 'API definition file',
    apiText: 'Can only upload .json,.yaml files',
    version: 'Version',
    uploadNow: 'Upload Now',
    pluginList: 'Plugin',
    sdkList: 'SDK',
    toolChainText: 'Can only upload .tar.gz files and no more than 10M',
    toolChainInfo1: 'The toolChain is an important feature of the MEC Developer developer platform. When an App on the x86 platform wants to get on the ARM platform, the underlying code inevitably needs to be modified or rewritten. App providers can analyze the source code through the toolChain integrated in the MEC Developer developer platform, locate the source code that needs to be modified and modify it according to the guidance, so that the App can be deployed on the ARM platform.',
    toolChainInfo2: 'Currently, the following files can be analyzed',
    toolChainInfo3: 'C/C++ software source code',
    toolChainInfo4: 'C/C++ software construction project file',
    toolChainInfo5: 'X86 assembly code'
  },
  api: {
    docs: 'Docs',
    updated: 'Updated',
    modify: 'Modify',
    downLoad: 'Download',
    share: 'Share',
    applicationAPI: 'Application API',
    faceRecognition: 'Face Recognition',
    vr: 'VR',
    ar: 'AR',
    name: 'Name',
    description: 'Description',
    apiDetail: 'API Detail',
    network: 'Network',
    computing: 'Computing',
    ai: 'AI',
    video: 'Video',
    srviceIntroduction: 'Service Introduction',
    serviceList: 'Service List',
    deleteApi: 'Click to delete public API',
    usageInstruction: 'Usage Instruction',
    serviceSelection: 'Service Selection:',
    noDataNotice: 'No data available.',
    installGuide: 'Installation Guide',
    hotServices: 'Popular Service',
    capabilitieTitle: 'Abundant edge capabilities | Ultimate 5G experience ',
    capabilitieOneTip: 'EdgeGallery Service Showcase',
    capabilitieTwoTip: 'Developer Practice Area',
    serviceDoc: 'service docs',
    onlineEmulator: 'online emulator',
    videoTutorial: 'Video Tutorial Area',
    developerCommunity: 'Developer Q&A Community',
    Detail: 'Detail',
    videoTutorialDetail: 'Guide developers in the whole process of app application developer, deploy, test, and release based on the EdgeGallery platform.',
    developerCommunityDetail: 'Used for developer communication and learning.',
    telecomStandardCapabilitieTitle: 'Telecom Standard Capability Landscape',
    swithToAPI: 'Click this button to go to the API simulator page'
  },
  nav: {
    home: 'Home',
    devtools: 'DevTools',
    plugin: 'Plugin',
    sdk: 'SDk',
    upload: 'Upload',
    api: 'API',
    introduction: 'Introduction',
    mepApi: 'Ability Center',
    applicationApi: 'Application API',
    test: 'Test',
    howTest: 'How To Test',
    testApplication: 'Test Application',
    testTask: 'Test Task Management',
    mecOpenSource: 'MEC Open Source Ecology',
    workSpace: 'WorkSpace',
    search: 'Search',
    logIn: 'Log In',
    userAccountCenter: 'My Account',
    logOut: 'Logout',
    help: 'Help',
    contact: 'Contact',
    serviceDoc: 'Service Document',
    apiMulator: 'Online Simulator'
  },
  workspace: {
    projectStatusEnum: {
      createNew: 'New',
      testing: 'Testing',
      tested: 'Tested',
      released: 'Released'
    },
    configYaml: {
      yamlFileType: 'Please select files with the suffix ".yaml"',
      uploadYamlFirst: 'Please upload file first',
      importFile: 'Import File',
      config: 'Visual Configuration',
      uploadFile: 'Upload File',
      downloadDemo: 'download template',
      uploadYaml: 'Upload file',
      uploadYamlTip: 'upload .yaml file',
      pass: 'file detection passed',
      fail: 'file detection failed',
      format: 'format check',
      imageInfo: 'image info check',
      serviceInfo: 'service info check',
      mepAgent: 'MEP Agent（If mepagent is not integrated, api cannot be released）'
    },
    uploadImage: {
      successfulTest: 'Test successfully',
      failTest: 'Test failed',
      testfirst: 'Please test first',
      useEnvTip: 'Note: All of the test tasks will be completed on the private edge node when enable it',
      useEnv: 'Enable:',
      test: 'Test',
      importNode: 'Import Host IP:',
      installation: 'Installation Doc',
      software: 'Software',
      version: 'Version',
      uploadAppImage: 'Upload APP Image',
      mode1: 'Mode 1:',
      mode1Desc: 'Upload app image to the public repository (supports dockerhub and SWR)',
      mode1Tip: 'Note: Please refer to the image uploaded to the public repository directly in the deployment file',
      mode2: 'Mode 2:',
      mode2Desc: 'Upload app image to the EdgeGallery repository',
      mode2Tip: 'Note: EdgeGallery ensures that images uploaded by users are not visible to other users',
      mode3: 'Mode 3:',
      mode3Desc: 'Upload app image to the private Edge Node',
      mode3Tip: 'How to build a private Edge Node, please refer to'
    },
    supportPlatform: {
      title: 'Select the deployment platform to support'
    },
    deployFailLog: {
      CSAR: 'CSAR package generation failed, please check whether the deployment file is uploaded',
      hostInfo: 'No test environment available, please configure the test environment',
      instantiateInfo: 'APP instantiation failed. The possible reasons are: 1. The test environment is configured incorrectly. 2. APP name or port is already occupied 3. For other problems, please contact the administrator.',
      workStatus: 'Failed to obtain APP status, possible reason: image pull fail, contact the administrator for other problems'
    },
    prepare: {
      toolTip: 'According to the development language of the application, the IDE is locally installed and configured',
      pluginTip1: 'EdgeGallery provides locally developed',
      pluginTip2: 'IDE plugin',
      pluginTip3: ',Sample code that can be used to generate (currently supports python and java languages)',
      codeTip1: 'EdgeGallery provides the sample code of the following APP local development for developers\' reference,',
      codeTip2: 'or',
      codeTip3: 'Click to download to local'
    },
    appRelease: {
      appConfig: 'Application Configuration',
      appCertify: 'Application Certification',
      startTest: 'Start Test',
      appRelease: 'Application Release',
      addFilter: 'Add flow filter',
      srcAddress: 'Src IP Address',
      srcPort: 'Src Port',
      dstAddress: 'Dst IP Address',
      dstPort: 'Dst Port',
      trafficRuleId: 'Traffic Rule Id',
      filterType: 'Filter Type',
      priority: 'Priority',
      protocol: 'Protocol',
      action: 'Action',
      dnsRuleId: 'DNS Rule Id',
      ipAddress: 'IP Address',
      ipAddressType: 'IP Address Type',
      domainName: 'DomainName',
      ttl: 'TTL',
      checkRules: 'Check Rules',
      dnsRule: 'DNS Rules',
      trafficRule: 'Traffic Rules',
      trafficFilter: 'Traffic Filter',
      tag: 'Tag',
      tgtTunnelAddress: 'Tunnel destination address',
      dstTunnelPort: 'Tunnel destination port',
      srcTunnelAddress: 'Tunnel source address',
      srcTunnelPort: 'Tunnel source port',
      multipleIP: 'Please separate multiple IPs with\',\'',
      multiplePort: 'Please separate multiple Ports with\',\'',
      forwardInterface: 'Forward Interface Information',
      newInterface: 'New Interface Information',
      interfaceType: 'Interface Type',
      tunnelType: 'Tunnel Type',
      tunnelParams: 'Tunnel Specified Parameters',
      macAddress: 'Destination MAC Address',
      sourceMacAddress: 'Source MAC Address',
      interfaceInfo: 'Interface Information',
      tunnelInfo: 'Tunnel Information',
      macInfo: 'MAC Information',
      IpInfo: 'IP Information',
      capabilityType: 'Capability Type',
      noService: 'Your application does not rely on the ecosystem services of the platform',
      blackWhiteList: 'Black and White list',
      UEIdentity: 'UE Identity'
    },
    deployDebugVm: {
      vmNameLbl: 'Name:',
      vmSpecLbl: 'Specification:',
      vmImageLbl: 'System Image:',
      vmNetworkLbl: 'Network:',
      vmIpLbl: 'IP Address:',
      vmStatusLbl: 'Status:',
      vmApplyTimeLbl: 'Apply Time:',
      vncBtnLbl: 'Remote Login',
      uploadBtnLbl: 'Upload Code',
      deleteBtnLbl: 'Delete',
      createImage: 'Create Image',
      applyResource: 'Apply Resource',
      configSpec: 'Specification Setting',
      configNetwork: 'Network Setting',
      vmName: 'Virtual Machine Name',
      selectVmSpecTip: 'Select Virtual Machine Specification',
      vmSpecMustSelectTip: 'Please select virtual machine specification!',
      scene: 'Scene',
      memory: 'Memory',
      systemDisk: 'System Disk',
      dataDisk: 'Data Disk',
      otherAbility: 'Other Ability',
      selectVmImageTip: 'Select System Image',
      publicImage: 'Public',
      privateImage: 'Private',
      selectVmSystemTypeTip: 'System Type',
      selectVmSystemImageTip: 'System Image',
      vmSystemImageMustSelectTip: 'Please select system image!',
      selectNetworkTypeTip: 'Select Network Type',
      networkType: 'Network Type',
      vmNetworkTypeMustSelectTip: 'Please select network type!',
      uploadApp: 'Upload Application Code Package',
      selectFile: 'Select Package File',
      upload: 'Start Upload',
      uploadAppFileTip: 'Please upload files in .zip, .rar, .tar format, and the size does not exceed 500MB',
      appPackageFileEmpty: 'Please select application code package file!',
      deleteVmResPrompt: 'Are you sure you want to delete the virtual machine resource?',
      loadVmConfigFailed: 'Load Virtual Machine Resource Configuration Failed!',
      applyVmResSuccess: 'Apply Virtual Machine Resource Succeed!',
      applyVmResFailed: 'Apply Virtual Machine Resource Failed!',
      deleteVmResSuccess: 'Delete Virtual Machine Resource Succeed!',
      deleteVmResFailed: 'Delete Virtual Machine Resource Failed!'
    },
    workSpace: 'WorkSpace',
    myProjectList: 'My Project List',
    addNewProject: 'Add New Project',
    projectStatus: 'Project Status',
    serial: 'Serials',
    icon: 'Icon',
    projectName: 'Project Name',
    projectType: 'Project Type',
    version: 'Version',
    provider: 'Provider',
    platform: 'Platform',
    industry: 'Industry',
    createDate: 'CreateDate',
    status: 'Status',
    operation: 'Operation',
    remove: 'Remove',
    detail: 'Detail',
    statusNew: 'New Project',
    statusDeploying: 'Deploying',
    statusSuccess: 'Deploy Success',
    statusFail: 'Deploy Failed',
    statusTesting: 'Testing',
    statusTested: 'Tested',
    statusReleased: 'Released',
    createProject: 'Add application development project',
    migrationProject: 'Add application integration project',
    basicInformation: 'Basic Information',
    registInformation: 'Registration message',
    appName: 'App Name',
    uploadIcon: 'Upload Icon',
    limitition: 'Can only upload .jpg/.png files or select the default APP icon and no more than 2M',
    iconRequired: 'Icon is required',
    chooseAbilities: 'Ability Selection',
    openMEPCapabilities: 'EdgeGallery Capabilities',
    chooseMepC: 'Choose the EdgeGallery capabilities what you want',
    seviceDiscovery: 'Service Discovery',
    dns: 'DNS',
    location: 'Location',
    traffic: 'Traffic',
    bandwith: 'Bandwith',
    rnis: 'RNIS',
    fiveGcapabilities: '5GC capabilities',
    openMEPECOCapabilities: 'EdgeGallery-eco Capabilities',
    chooseMEPeco: 'Choose the EdgeGallery-eco capabilities what you want',
    previous: 'Previous',
    next: 'Next',
    selectionAbilitiesDetail: 'Selection Abilities Detail',
    platformCapabilities: 'Platform capabilities',
    service: 'Service',
    serviceVersion: 'Service Version',
    serviceDescription: 'Service Description',
    selectLeastOne: 'Please select at least one',
    projectLink: 'Project Link',
    toolChain: 'ToolChain',
    programTools: 'Programming Tools',
    programPlugin: 'Programming Plugin',
    sampleCode: 'Sample Code',
    confirm: 'Confirm',
    capabilityDetails: 'Capability Details',
    deploymentTest: 'Deployment Test',
    applicationDev: 'Application Development',
    applicationRelease: 'Application Release',
    environmentPreparation: 'Environment Preparation',
    environmentPreparationTip: 'According to the application development requirements, prepare the development environment',
    choosePlatform: 'Choose Deployment Platform',
    selectImage: 'Upload App Image',
    configureYaml: 'Configure Deployment Files',
    server: 'Select Server',
    test: 'Deployment Test',
    abilitiesDetail: 'Abilities Detail',
    appDevelopment: 'Application Development',
    appIntegration: 'Application Integration',
    buildTip: 'Your application has been integrated with EdgeGallery platform, please test your own APP business',
    finishTest: 'Finish Test',
    saveData: 'Save config',
    statistics: 'Statistics',
    realTimeStatistics: 'Real-time Statistics',
    performaceStatistics: 'Performance Statistics',
    first: 'First',
    buildDocker: 'Build your docker image',
    second: 'Second',
    chooseFile: 'Drag the image file here, or click to upload',
    remoteaddress: 'Or give a remote address that supports standard warehouse commands',
    name: 'Name',
    architecture: 'Architecture',
    address: 'Address',
    deploy: 'Deploy',
    description: 'Description',
    selectRepository: 'Select Repository',
    select: 'Please Select',
    nextStep: 'Next Step',
    publish: 'Publish',
    publishtext: 'Whether to publish your APP to the EdgeGallery APP store',
    publictext: 'Whether or not to expose your APP\'s API capabilities to the EdgeGallery ecosystem',
    method1: 'Method 1: Select the image (select the App image provided by the platform for rapid deployment and launch)',
    method2: 'Method 2: Specify the image package (requires the user to upload to the image repository first)',
    imagename: 'imageName',
    imageversion: 'Version',
    port: 'Port',
    add: 'Add',
    method3: 'Method 3: Upload the App image package (after uploading the image package, the system will automatically push the image to the system warehouse)',
    method4: 'Method 4: Upload the app source code (after uploading the source code, the system will automatically compile and generate an image and push it to the xxx warehouse)',
    uploadYaml: 'Upload Yaml',
    uploadApppackage: 'Upload APP image package',
    appimage: 'App Image',
    addimage: 'Add Image',
    servicename: 'Service Name',
    href: 'Href',
    internalPort: 'Internal Port',
    outPort: 'External Port',
    confirmUpload: 'Confirm upload',
    uploadSourceCode: 'Upload source code',
    storagePath: 'Source code storage path',
    checkItem: 'Check items: compiler options, compiler macros, assembler, built-in functions, properties',
    targetOS: 'Target operating system',
    buildTools: 'Build Tools',
    compileCommand: 'Compile Command',
    compilerVersion: 'Compiler Version',
    targetVersion: 'Target system kernel version',
    analysis: 'Analysis',
    historicalReport: 'Historical Report',
    sourceCodePath: 'Source code storage path',
    analysisResults: 'Analysis results',
    needtranscount: 'Source files to be migrated',
    codeCount: 'Number of lines of code to port',
    makefileSourceCode: 'C/C++ and Makefile source code',
    lines: 'lines',
    assemblyCode: 'Assembly code',
    downloadReport: 'Download Report',
    startDeploySucc: 'Start Deployment',
    startDeployFail: 'Deployment failed',
    deploying: 'Deploying, please wait...',
    uploadCodeFail: 'Failed to upload source code！',
    reportPromt: 'Your report has expired and cannot be viewed online, please download and view',
    serviceDetails: 'Service Details',
    releaseTime: 'Release Time',
    sdkDownload: 'SDK Download',
    apiTopText: 'The API simulator provides a public environment for local interface debugging and online simulation testing. Developers can use the simulator host address and application external port number to access locally, In the actual deploy test, use the mep service discovery interface to find the URL of the service ',
    projectDetails: 'Project Details',
    releaseDetails: 'Capability Release Details',
    releaseTest: 'Application Release Test',
    developer: 'Developer',
    dependentApp: 'Dependent Application',
    noDependent: 'No dependence',
    deploymentPlatform: 'Deployment Platform',
    uploadFile: 'Documentation',
    appStoreMd: 'Please upload the .md file to describe the application introduction, scene, etc.',
    apiFunctionMd: 'Please upload the .md file to describe the API function, usage, etc.',
    routeConfig: 'Route Configuration',
    protocol: 'Protocol',
    appDetails: 'Application Package Details',
    appTest: 'Application Test',
    releaseText: 'The application needs to be tested before it is released',
    instantiateId: 'Instantiate ID',
    applicationDesc: 'Application Description',
    ruleConfig: 'Application Rule Configuration',
    trafficRules: 'Traffic Rules',
    dnsRules: 'DNS Rules',
    appPublishConfig: 'Service Publishing Configuration',
    appPublishSuccess: 'The application has been published to AppStore, click the link to view details',
    appDetail: 'Application Details',
    deploymentStatus: 'Deployment Status',
    startDeployment: 'Start Deployment',
    completeTest: 'Complete Test',
    recycle: 'Release Resouces',
    completeMsg: 'After clicking to complete test button, the environmental resources will be released, otherwise the platform will automatically release the environmental resources after 24 hours',
    deploymentSuccess: 'Deployment Success',
    createDeploymentFile: 'Create Deployment File',
    assignTestNodes: 'Assign Test Nodes',
    applicationRelease2: 'Application Release',
    instantiateApplication: 'Instantiate Application',
    getDeploymentStatus: 'Get Deployment Status',
    deploymentComplete: 'Deployment Complete',
    deploymentResult: 'Deployment Result',
    testMsg: 'Your application has already been integrated by EdgeGallery platform, you can test it now',
    PODStatus: 'Pod Status',
    PODName: 'Pod name',
    downloadLog: 'Download Log',
    operatingStatus: 'Operating Status',
    container: 'Container',
    containerName: 'Container Name',
    containerResource: 'Resource',
    hostInfo: 'Host Info',
    selectEnv: 'Select Testing Environment',
    uploadConfigMessage: 'Please Upload Your Configure File',
    deployConfig: 'Deploy Field',
    clearEnv: 'Testing Environment Cleared',
    unUploaded: 'Empty',
    uploaded: 'Uploaded',
    privateHost: 'Private Host',
    publicHost: 'Public Host',
    capabilityInfo1: 'Please select the ecological services that your application needs to rely on. For details on ecological capabilities, please refer to',
    capabilityInfo2: '. If it is an integrated project, or your service does not need to depend on other services, you can skip this step and continue creating.',
    availableService: 'Available Services',
    selectedService: 'Selected Services',
    recycleTip: 'Note: Please release the resources in time after the test is completed to avoid resource occupation, otherwise the system will automatically release after 24 hours',
    noService: "You haven't selected any services",
    testNode: 'Test Node',
    podBelongsTo: 'Pod Name',
    cpuUsage: 'CPU Usage',
    memUsage: 'Memory Usage',
    diskUsage: 'Disk Usage',
    deployType: 'Deployment Type',
    containerImage: 'Container Image',
    vmImage: 'VM Image',
    podEventsInfo: 'Pod Events Info'
  },
  test: {
    howToTest: {
      howToTest: 'How To Test',
      updated: 'Updated',
      modify: 'Modify',
      share: 'Share',
      apply: 'Test Now'
    },
    testApp: {
      uploadApp: 'Upload App',
      appFormat: 'Can only upload .csar files and no more than 10Mb.',
      uploadLogo: 'Upload Logo',
      logoFormat: 'Can only upload .jpg/.png files or select the default APP icon and no more than 2M',
      affinity: 'Affininty',
      type: 'Type',
      choosetype: 'Please Choose Type',
      description: 'Description',
      upload: 'Upload Now',
      cancel: 'Cancel'
    },
    testTask: {
      appName: 'Application Name',
      testStatus: 'Test Status',
      startTime: 'Submit Time',
      endTime: 'Test End Time',
      reset: 'Reset',
      inquire: 'Inquire',
      taskNumber: 'Task Number',
      applicationName: 'Application Name',
      version: 'Version',
      applicationTime: 'Application Time',
      operation: 'Operation',
      checkReport: 'Check Report',
      upload: 'Upload',
      report: {
        ticket: 'Mission Ticket Number',
        basicInfo: 'Basic Information',
        packageName: 'Package Name',
        status: 'Status',
        details: 'Details'
      }
    }
  },
  mecOpen: {
    mecOpen: 'MEC Open Source Ecology',
    info: 'We provide the open source contribution of documents and components and development plug-ins for developers on the Huawei MEC platform. Developers who are actively contributing will be able to enjoy the priority download and test rights of Huawei MEC Developer Platform. And will be awarded medals in the open source eco-contribution section, and developers are welcome to actively contribute your abilities. To help us improve the user experience and enhance our ecological environment.',
    contribution: 'Contribution List',
    code: 'Code contribution',
    lines: 'lines'
  },
  promptMessage: {
    prompt: 'Prompt',
    noPermission: 'You have no permission to enter the user management page!',
    uploadSuccess: 'Upload success!',
    uploadFailure: 'Upload failure!',
    nameEmpty: 'Name cannot be empty!',
    pluginNameEmpty: 'Plugin Name cannot be empty!',
    pluginFunEmpty: 'Plugin Language cannot be empty!',
    plugTypeEmpty: 'Plugin Type cannot be empty!',
    pluginFileEmpty: 'Plugin file cannot be empty!',
    logoEmpty: 'Logo cannot be empty!',
    apiEmpty: 'Api file cannot be empty!',
    versionEmpty: 'Version cannot be empty!',
    descriptionEmpty: 'Description cannot be empty!',
    moreThan500: 'Can only upload no more than 500KB!',
    moreThan2: 'Can only upload no more than 2MB!',
    moreThan10M: 'Can only upload no more than 10MB!',
    moreThan20M: 'Can only upload no more than 20MB!',
    moreThan500M: 'Can only upload no more than 500MB!',
    onlyOneFile: 'Only one file is allowed, please remove the file first!',
    fileNameType: 'The file name cannot contain spaces!',
    notPicture: 'Please upload pictures.',
    appEmpty: 'Application file cannot be empty!',
    affinityEmpty: 'Architecture cannot be empty!',
    typeEmpty: 'Type cannot be empty!',
    testSuccess: 'Start Test Success!',
    testFail: 'Start Test failed!',
    testComplete: 'You have completed the test, please click to view the report',
    addProjectSuccess: 'New project added successfully!',
    addProjectFail: 'Failed to add New project!',
    checkNamePass: 'Authentication Failure, please recheck the User Name or Password.',
    checkCaptcha: 'Invalid captcha, please recheck the Captcha.',
    registerSuccess: 'User is registered successfully!',
    resisterFail: 'Failed to register user, ',
    logoutPage: 'Are you sure to log out?',
    yesBtn: 'Yes',
    noBtn: 'No',
    loginexpired: 'Login expired, please login again！',
    imageNameErr: 'Image name cannot be empty',
    uploadApiFile: 'Please upload the Api file!',
    uploadYamlFile: 'Please upload the Yaml file!',
    uploadFileMsg: 'Please upload an APP image or Yaml file!',
    service: 'Please enter the full service content!',
    addImage: 'Please add the Image',
    selectService: 'Please select a server!',
    selectCommand: 'Compile command cannot be empty!',
    codeEmpty: 'Source code cannot be empty!',
    analysisCodeFail: 'Analysis task failed!',
    uploadCodeText: 'Please wait, uploading source code ...',
    analyzingText: 'Please wait, analyzing ...',
    loadingText: 'Loading, please wait ...',
    logoutFail: 'Logout failed, please try again!',
    contrastTime: 'The submission time cannot be earlier than the test end time!',
    imageVersionErr: 'Version cannot be empty',
    yamlFileType: 'Please select files with the suffix ".yaml, .json"',
    projectNameEmpty: 'Application Name cannot be empty',
    providerEmpty: 'Provider cannot be empty',
    architectureEmpty: 'Architecture cannot be empty',
    industryEmpty: 'Industry cannot be empty',
    getDataFail: 'Failed to get data!',
    isPublishFailed: 'Publish to EdgeGallery App Store failed!',
    isPublicFailed: 'Exposing API capabilities to EdgeGallery ecosystem failed!',
    canOnlyUpload: 'Can only upload .csar files',
    pluginNameRule: 'Please enter a plugin name of 1-30 characters, the beginning cannot be empty',
    nameRule: 'Please enter a name of 4-32 characters, which can contain numbers, letters, _,-and spaces, and cannot start and end with _,-and spaces',
    versionRule: 'Please enter the version number of 1-10 characters, can only contain numbers, letters, _,-and spaces, and cannot be empty at the beginning',
    providerRule: 'Please enter a provider name of 1-30 characters, the beginning cannot be empty',
    introductionRule: 'Please enter a description of 1-128 characters, the beginning cannot be empty',
    checkFileType: 'Please upload a file that matches the format',
    downloading: 'Downloading, please wait...',
    guestPrompt: 'The guest user has no right to operate, please log in first!',
    saveSuccess: 'Saved successfully!',
    saveFail: 'Save failed!',
    sampleCodeInfo: 'Cannot download sample code without selecting capability service',
    fileNotSupport: 'Compressed file, do not support online browsing',
    fileIsEmpty: 'File content is empty',
    addSuccess: 'Data added successfully',
    editSuccess: 'Edit data successfully',
    saveRuleSuccess: 'Save the rule successfully',
    editRuleSuccess: 'Edit rule successfully',
    saveRuleFail: 'Failed to save rule',
    editRuleFail: 'Edit rule failed',
    appReleaseSuccess: 'Application published successfully',
    appReleaseFail: 'Application publishing failed',
    deployTypeEmpty: 'Deployment type can not be empty.',
    isPublished: 'The application has been published to the application warehouse',
    notDeploy: 'The application is not deployed, and the release operation cannot be performed',
    ipErrorInfo: 'Please enter the correct IP address',
    portErrorInfo: 'Port number range 30000-30400'
  },
  breadCrumb: {
    mecDeveloper: 'Home',
    api: 'API',
    applicationApi: 'MECDeveloper Platform API',
    apiDetail: 'API Detail',
    docs: 'Docs',
    mecOpenSourceEcology: 'MEC Open Source Ecology',
    devTools: 'DevTools',
    detail: 'Detail',
    upload: 'Upload',
    test: 'Test',
    testApplication: 'Test Application',
    howToTest: 'How To Test',
    testReport: 'Test Report',
    testTask: 'Test Task',
    workspace: 'Workspace',
    system: 'System',
    systemProject: 'Project Management',
    systemMep: 'Ability Center Management',
    systemHost: 'Host Management'
  },
  system: {
    upload: 'Upload',
    error: 'Error',
    success: 'Success',
    name: 'Name',
    addHost: 'Add Host',
    pleaseInput: 'Please input',
    pleaseUpload: 'Please upload',
    address: 'Address',
    username: 'Username',
    password: 'Password',
    char: 'characters',
    correct: 'correct',
    useDetail: 'Log',
    deleteConfirm: 'Are you sure to delete?',
    userId: 'User ID',
    projectId: 'Project ID',
    deployTime: 'Deploy Time',
    deleteTime: 'Delete Time',
    addMep: 'Add Service',
    basicInfo: 'Basic Info',
    registerInfo: 'Register Info',
    capType: 'Type',
    capTypeOPENMEP: 'OPENMEP',
    serviceName: 'Service Name',
    inPort: 'Port',
    version: 'Version',
    provider: 'Provider',
    apiFileId: 'API Document',
    fileExceed: 'Upload a maximum of one file',
    guideFileId: 'Guide',
    guideFileId_zh: 'Guide(chinese)',
    guideFileId_en: 'Guide(english)',
    zh_cn: 'please input chinese',
    en: 'please input english',
    portRange: 'Port Range',
    config_id: 'Config File',
    log: {
      userName: 'Username',
      projectName: 'Project Name',
      appInstancesId: 'App Instances Id',
      deployTime: 'Deploy Time',
      status: 'Status',
      operation: 'Operation'
    },
    type: 'Type'
  },
  ...enLocale
}
export default en
