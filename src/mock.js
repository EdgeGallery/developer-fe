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
const Mock = require('mockjs')

const getProjectList = function () {
  return [{
    'id': 'ba32617a-99e0-4974-881f-68425f29f206',
    'projectType': 'CREATE_NEW',
    'name': 'New_VM_App',
    'version': '1.0',
    'provider': 'Huawei',
    'platform': ['X86'],
    'deployPlatform': 'VIRTUALMACHINE',
    'type': 'Video Application',
    'industry': ['Smart Park'],
    'description': 'New VM App',
    'iconFileId': '5260cc60-42a3-4db8-8570-532d17d1f26a',
    'status': 'ONLINE',
    'capabilityList': [{
      'groupId': 'c0db376b-ae50-48fc-b9f7-58a609e3ee12',
      'oneLevelName': '平台基础服务',
      'oneLevelNameEn': 'Platform services',
      'twoLevelName': '服务治理',
      'twoLevelNameEn': 'Service governance',
      'type': 'OPENMEP',
      'description': 'EdgeGallery平台为APP提供服务注册、发现、订阅等相关功能。',
      'descriptionEn': 'The EdgeGallery platform provides APP with related functions such as service registration, discovery, and subscription.',
      'capabilityDetailList': [{
        'detailId': '143e8608-7304-4932-9d99-4bd6b115dac8',
        'groupId': 'c0db376b-ae50-48fc-b9f7-58a609e3ee12',
        'service': '服务发现',
        'serviceEn': 'service discovery',
        'version': 'v1',
        'description': 'EdgeGallery平台为APP提供服务注册、发现、订阅等相关功能。',
        'descriptionEn': 'The EdgeGallery platform provides APP with related functions such as service registration, discovery, and subscription.',
        'provider': 'Huawei',
        'apiFileId': '540e0817-f6ea-42e5-8c5b-cb2daf9925a3',
        'guideFileId': '9bb4a85f-e985-47e1-99a4-20c03a486864',
        'guideFileIdEn': '9ace2dfc-6548-4511-96f3-2f622736e18a',
        'uploadTime': '2020-11-20 00:00:00.000000',
        'port': 8684.0,
        'host': 'service-discovery',
        'protocol': 'http',
        'userId': 'admin'
      }]
    }],
    'lastTestId': null,
    'userId': '803c33e0-21ab-4cc3-827f-847790d0d7b4',
    'createDate': '2021-02-26 14:26',
    'openCapabilityId': null
  }, {
    'id': '97793a29-73f2-4918-b08f-8ff85a27e24d',
    'projectType': 'INTEGRATED',
    'name': 'Integrated_K8S_App',
    'version': '1.0',
    'provider': 'Huawei',
    'platform': ['X86'],
    'deployPlatform': 'KUBERNETES',
    'type': 'Video Application',
    'industry': ['Smart Park'],
    'description': 'Integrated K8S App',
    'iconFileId': '5bfcda96-5e0e-492c-a19a-45f13e436bb1',
    'status': 'ONLINE',
    'capabilityList': [],
    'lastTestId': null,
    'userId': '803c33e0-21ab-4cc3-827f-847790d0d7b4',
    'createDate': '2021-02-26 11:25',
    'openCapabilityId': null
  }, {
    'id': '7dd9cc61-8225-4c0f-84c5-2ed0c65c2e32',
    'projectType': 'CREATE_NEW',
    'name': 'New_K8S_App',
    'version': '1.0',
    'provider': 'Huawei',
    'platform': ['X86'],
    'deployPlatform': 'KUBERNETES',
    'type': 'Video Application',
    'industry': ['Smart Park'],
    'description': 'New K8S App',
    'iconFileId': '99c16cbc-f332-4c9f-94ce-309c8862be37',
    'status': 'ONLINE',
    'capabilityList': [{
      'groupId': 'c0db376b-ae50-48fc-b9f7-58a609e3ee12',
      'oneLevelName': '平台基础服务',
      'oneLevelNameEn': 'Platform services',
      'twoLevelName': '服务治理',
      'twoLevelNameEn': 'Service governance',
      'type': 'OPENMEP',
      'description': 'EdgeGallery平台为APP提供服务注册、发现、订阅等相关功能。',
      'descriptionEn': 'The EdgeGallery platform provides APP with related functions such as service registration, discovery, and subscription.',
      'capabilityDetailList': [{
        'detailId': '143e8608-7304-4932-9d99-4bd6b115dac8',
        'groupId': 'c0db376b-ae50-48fc-b9f7-58a609e3ee12',
        'service': '服务发现',
        'serviceEn': 'service discovery',
        'version': 'v1',
        'description': 'EdgeGallery平台为APP提供服务注册、发现、订阅等相关功能。',
        'descriptionEn': 'The EdgeGallery platform provides APP with related functions such as service registration, discovery, and subscription.',
        'provider': 'Huawei',
        'apiFileId': '540e0817-f6ea-42e5-8c5b-cb2daf9925a3',
        'guideFileId': '9bb4a85f-e985-47e1-99a4-20c03a486864',
        'guideFileIdEn': '9ace2dfc-6548-4511-96f3-2f622736e18a',
        'uploadTime': '2020-11-20 00:00:00.000000',
        'port': 8684.0,
        'host': 'service-discovery',
        'protocol': 'http',
        'userId': 'admin'
      }]
    }],
    'lastTestId': null,
    'userId': '803c33e0-21ab-4cc3-827f-847790d0d7b4',
    'createDate': '2021-02-25 16:52',
    'openCapabilityId': null
  }]
}

const getProjectInfo = function () {
  return {
    'id': 'ba32617a-99e0-4974-881f-68425f29f206',
    'projectType': 'CREATE_NEW',
    'name': 'New_VM_app',
    'version': '1.0',
    'provider': 'Huawei',
    'platform': ['X86'],
    'deployPlatform': 'VIRTUALMACHINE',
    'type': 'Video Application',
    'industry': ['Smart Park'],
    'description': 'Test APP',
    'iconFileId': '5260cc60-42a3-4db8-8570-532d17d1f26a',
    'status': 'ONLINE',
    'capabilityList': [{
      'groupId': 'c0db376b-ae50-48fc-b9f7-58a609e3ee12',
      'oneLevelName': '平台基础服务',
      'oneLevelNameEn': 'Platform services',
      'twoLevelName': '服务治理',
      'twoLevelNameEn': 'Service governance',
      'type': 'OPENMEP',
      'description': 'EdgeGallery平台为APP提供服务注册、发现、订阅等相关功能。',
      'descriptionEn': 'The EdgeGallery platform provides APP with related functions such as service registration, discovery, and subscription.',
      'capabilityDetailList': [{
        'detailId': '143e8608-7304-4932-9d99-4bd6b115dac8',
        'groupId': 'c0db376b-ae50-48fc-b9f7-58a609e3ee12',
        'service': '服务发现',
        'serviceEn': 'service discovery',
        'version': 'v1',
        'description': 'EdgeGallery平台为APP提供服务注册、发现、订阅等相关功能。',
        'descriptionEn': 'The EdgeGallery platform provides APP with related functions such as service registration, discovery, and subscription.',
        'provider': 'Huawei',
        'apiFileId': '540e0817-f6ea-42e5-8c5b-cb2daf9925a3',
        'guideFileId': '9bb4a85f-e985-47e1-99a4-20c03a486864',
        'guideFileIdEn': '9ace2dfc-6548-4511-96f3-2f622736e18a',
        'uploadTime': '2020-11-20 00:00:00.000000',
        'port': 8684.0,
        'host': 'service-discovery',
        'protocol': 'http',
        'userId': 'admin'
      }]
    }],
    'lastTestId': null,
    'userId': '803c33e0-21ab-4cc3-827f-847790d0d7b4',
    'createDate': '2021-02-26 14:26',
    'openCapabilityId': null
  }
}

const getProjectVmList = function () {
  return [
    {
      'vmId': 'ba32617a-99e0-4974-881f-68425f29f206-vm-1111',
      'projectId': 'ba32617a-99e0-4974-881f-68425f29f206',
      'vmRegulation': {
        'regulationId': 0,
        'architecture': 'X86',
        'nameZh': '通用计算型',
        'nameEn': 'General Computing',
        'sceneZh': '普通APP',
        'sceneEn': 'Ordinary APP',
        'memory': 8,
        'cpu': 4,
        'systemDisk': 50,
        'dataDisk': 100,
        'gpu': '',
        'otherAbility': ''
      },
      'vmSystem': {
        'systemId': 0,
        'type': 'public',
        'operateSystem': 'ubuntu',
        'version': '16.04',
        'systemBit': '64bit',
        'systemDisk': 50
      },
      'vmNetwork': ['Network_MEP', 'Network_N6'],
      'vmName': 'TestVM',
      'status': 'Running',
      'stageStatus': {
        'csar': 'Failed',
        'hostInfo': null,
        'instantiateInfo': null,
        'workStatus': null
      },
      'lcmToken': null,
      'vmInfo': [
        {
          'serverId': 'server--1',
          'vncUrl': '',
          'networks': [
            {
              'name': '',
              'ip': '0.0.0.0'
            }
          ]
        }
      ],
      'appInstanceId': 'e52fc7e6-2ef1-43be-83d9-0fd4924bb159',
      'createTime': '2021-2-27 10:27',
      'log': 'generate  vm csar failed:null',
      'nextStage': 'hostInfo'
    }
  ]
}

const getVmConfig = function () {
  return {
    'vmRegulationList': [
      {
        'regulationId': 1,
        'architecture': 'X86',
        'nameZh': '通用计算型.2',
        'nameEn': 'Universal Computer 2',
        'sceneZh': '普通APP',
        'sceneEn': 'Common App',
        'cpu': 4,
        'memory': 8,
        'systemDisk': 50,
        'dataDisk': 100,
        'gpu': '',
        'otherAbility': '1*Atlas300C(16G)'
      },
      {
        'regulationId': 2,
        'architecture': 'X86',
        'nameZh': '通用计算型.4',
        'nameEn': 'Universal Computer 4',
        'sceneZh': '普通APP',
        'sceneEn': 'Common App',
        'cpu': 4,
        'memory': 8,
        'systemDisk': 50,
        'dataDisk': 100,
        'gpu': '',
        'otherAbility': '1*Atlas300C(16G)'
      },
      {
        'regulationId': 3,
        'architecture': 'ARM',
        'nameZh': '高I/O型.2',
        'nameEn': 'High I/O 2',
        'sceneZh': '高I/O型APP',
        'sceneEn': 'High I/O APP',
        'cpu': 8,
        'memory': 16,
        'systemDisk': 50,
        'dataDisk': 200,
        'gpu': '',
        'otherAbility': '2*Atlas300C(16G)'
      }
    ],
    'vmSystemList': [
      {
        'systemId': 1,
        'systemName': 'testSysImg-1',
        'type': 'public',
        'operateSystem': 'Ubuntu',
        'version': '18.04',
        'systemBit': '64bit',
        'systemDisk': 40
      },
      {
        'systemId': 2,
        'systemName': 'testSysImg-2',
        'type': 'public',
        'operateSystem': 'Ubuntu',
        'version': '18.05',
        'systemBit': '32bit',
        'systemDisk': 100
      },
      {
        'systemId': 3,
        'systemName': 'testSysImg-3',
        'type': 'public',
        'operateSystem': 'Suse',
        'version': '12.1',
        'systemBit': '64bit',
        'systemDisk': 80
      },
      {
        'systemId': 4,
        'systemName': 'testSysImg-4',
        'type': 'public',
        'operateSystem': 'Suse',
        'version': '12.3',
        'systemBit': '32bit',
        'systemDisk': 100
      },
      {
        'systemId': 5,
        'systemName': 'testSysImg-5',
        'type': 'private',
        'operateSystem': 'Ubuntu',
        'version': '18.04',
        'systemBit': '64bit',
        'systemDisk': 40
      },
      {
        'systemId': 6,
        'systemName': 'testSysImg-6',
        'type': 'private',
        'operateSystem': 'Ubuntu',
        'version': '18.05',
        'systemBit': '32bit',
        'systemDisk': 100
      }
    ],
    'vmNetworkList': [
      {
        'networkType': 'Network_N6',
        'descriptionZh': 'N6网络，端侧设备在访问边缘应用时，需要通过该网络进行访问',
        'descriptionEn': 'N6 network, when end-side devices access edge applications, they need to access through this network'
      },
      {
        'networkType': 'Network_MEP',
        'descriptionZh': '与边缘计算平台之间的网络，当应用存在服务依赖或需要发布服务时，需要该网络',
        'descriptionEn': 'The network with the edge computing platform, when the application has service dependency or needs to publish the service, the network is needed'
      },
      {
        'networkType': 'Network_Internet',
        'descriptionZh': 'Internet网络',
        'descriptionEn': 'Internet Network'
      }
    ]
  }
}

const doNothing = function () {
  return {}
}

const getCreateImageList = function () {
  return [
    {
      'vmName': 'sdfsgrehgetr',
      'imageName': 'fdghshstrjtrjj',
      'progress': 30,
      'status': 'create'
    },
    {
      'vmName': 'jkyujtfgftg',
      'imageName': 'sdgfrehgtjuyjtygjhnfg',
      'progress': 50,
      'status': 'progress'
    },
    {
      'vmName': 'asdqwrghfgjtyiu',
      'imageName': 'asefwegrehtrjhtrjtr',
      'progress': 75,
      'status': 'progress'
    },
    {
      'vmName': 'sdfretytryutryutr',
      'imageName': 'asefwegrehjghjyuio8uotrjhtrjtr',
      'progress': 100,
      'status': 'success'
    }
  ]
}

const getImageDataList = function () {
  return {
    'totalCount': 20,
    'imageList': [
      {
        'systemId': 1,
        'systemName': 'TestImage-1',
        'type': 'public',
        'operateSystem': 'ubuntu',
        'version': '16.05',
        'systemBit': '64',
        'systemDisk': 40,
        'userId': 'TestUser-1',
        'userName': 'TestUser',
        'createTime': '2021-5-7 17:38:12',
        'systemFormat': 'iso',
        'uploadTime:': '',
        'status': 'UPLOAD_WAIT'
      },
      {
        'systemId': 2,
        'systemName': 'TestImage-2',
        'type': 'private',
        'operateSystem': 'ubuntu',
        'version': '16.04',
        'systemBit': '64',
        'systemDisk': 80,
        'userId': 'TestUser-2',
        'userName': 'TestUser2',
        'createTime': '2021-5-6 15:03:21',
        'systemFormat': 'iso',
        'uploadTime:': '',
        'status': 'UPLOADING'
      },
      {
        'systemId': 3,
        'systemName': 'TestImage-3',
        'type': 'public',
        'operateSystem': 'ubuntu',
        'version': '16.05',
        'systemBit': '64',
        'systemDisk': 40,
        'userId': 'TestUser-2',
        'userName': 'TestUser2',
        'createTime': '2021-5-5 17:38:12',
        'systemFormat': 'qcow2',
        'uploadTime:': '2021-5-5 17:45:23',
        'status': 'UPLOAD_SUCCEED'
      },
      {
        'systemId': 4,
        'systemName': 'TestImage-4',
        'type': 'private',
        'operateSystem': 'ubuntu',
        'version': '16.05',
        'systemBit': '64',
        'systemDisk': 40,
        'userId': 'TestUser-2',
        'userName': 'TestUser2',
        'createTime': '2021-5-4 09:38:12',
        'systemFormat': 'qcow2',
        'uploadTime:': '',
        'status': 'UPLOAD_FAILED'
      },
      {
        'systemId': 5,
        'systemName': 'TestImage-5',
        'type': 'public',
        'operateSystem': 'ubuntu',
        'version': '16.05',
        'systemBit': '64',
        'systemDisk': 40,
        'userId': 'TestUser-1',
        'userName': 'TestUser',
        'createTime': '2021-5-3 17:38:12',
        'systemFormat': 'iso',
        'uploadTime:': '2021-5-3 17:45:23',
        'status': 'PUBLISHED'
      }
    ]
  }
}

Mock.mock('/mock/developer/projectlist', getProjectList)
Mock.mock('/mock/developer/projectinfo', getProjectInfo)
Mock.mock('/mock/developer/project/vmlist', getProjectVmList)
Mock.mock('/mock/developer/vmconfig', getVmConfig)

Mock.mock('/mock/donothing', doNothing)

Mock.mock('/mock/developer/imageList', getCreateImageList)

Mock.mock('/mock/developer/system/systemimage/list', getImageDataList)
