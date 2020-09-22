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

const Industry = [
  {
    value: 'Smart Park',
    label: ['智慧园区', 'Smart Park']
  }, {
    value: 'Smart Supermarket',
    label: ['智慧商超', 'Smart Supermarket']
  }, {
    value: 'Industrial Manufacturing',
    label: ['工业制造', 'Industrial Manufacturing']
  }, {
    value: 'Transportation Logistics',
    label: ['交通物流', 'Transportation Logistics']
  }, {
    value: 'Water Conservancy',
    label: ['水利', 'Water Conservancy']
  }, {
    value: 'Game Competition',
    label: ['游戏竞技', 'Game Competition']
  }, {
    value: 'Open Source',
    label: ['开源', 'Open Source']
  }, {
    value: 'Other',
    label: ['其他', 'Other']
  }
]

const Type = [
  {
    value: 'Video Application',
    label: ['视频应用', 'Video Application']
  }, {
    value: 'Game',
    label: ['游戏', 'Game']
  }, {
    value: 'Video Surveillance',
    label: ['视频监控', 'Video Surveillance']
  }, {
    value: 'Safety',
    label: ['安全', 'Safety']
  }, {
    value: 'Blockchain',
    label: ['区块链', 'Blockchain']
  }, {
    value: 'Smart Device',
    label: ['智能设备', 'Smart Device']
  }, {
    value: 'Internet of Things',
    label: ['物联网', 'Internet of Things']
  }, {
    value: 'Big Data',
    label: ['大数据', 'Big Data']
  }, {
    value: 'AR/VR',
    label: ['AR/VR', 'AR/VR']
  }, {
    value: 'API',
    label: ['API', 'API']
  }, {
    value: 'SDK',
    label: ['SDK', 'SDK']
  }, {
    value: 'MEP',
    label: ['MEP', 'MEP']
  }
]

const Architecture = [
  {
    value: 'x86',
    label: 'x86'
  }, {
    value: 'ARM64',
    label: 'ARM64'
  }, {
    value: 'ARM32',
    label: 'ARM32'
  }, {
    value: 'GPU',
    label: 'GPU'
  }, {
    value: 'NPU',
    label: 'NPU'
  }
]

const Capability = [
  {
    value: 'Traffic',
    label: ['交通', 'Traffic']
  }, {
    value: 'Service Discovery',
    label: ['服务发现', 'Service Discovery']
  }, {
    value: 'Location',
    label: ['位置', 'Location']
  }, {
    value: 'Bandwidth',
    label: ['带宽', 'Bandwidth']
  }, {
    value: 'Face Recognition',
    label: ['人脸识别', 'Face Recognition']
  }
]

const ApiInfo = [
  {
    value: 'Service',
    label: ['服务介绍', 'Service Introduction']
  },
  {
    value: 'List',
    label: ['服务列表', 'Service List']
  }
]

export {
  Industry,
  Type,
  Architecture,
  Capability,
  ApiInfo
}
