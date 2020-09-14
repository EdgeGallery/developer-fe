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

const commonApp = [
  {
    id: 1,
    title: 'home.createProjectTitle',
    src: require('../../assets/images/home_step1.svg'),
    desc: 'home.createProjectText',
    link: { name: 'workspace', params: { from: 'index' } },
    elementId: 'createProject'
  },
  {
    id: 2,
    title: 'home.toolsDownloadTitle',
    src: require('../../assets/images/home_step2.svg'),
    desc: 'home.toolsDownloadText',
    link: '/mecDeveloper/plugin/list',
    elementId: 'tooldDown'
  },
  {
    id: 3,
    title: 'home.commonApiTitle',
    src: require('../../assets/images/home_step3.svg'),
    desc: 'home.commonApiText',
    link: '/mecDeveloper/api/mep-eco',
    elementId: 'commomApi'
  },
  {
    id: 4,
    title: 'home.testCaseTitle',
    src: require('../../assets/images/home_step4.svg'),
    desc: 'home.testCaseText',
    link: '/mecDeveloper/test/apply',
    elementId: 'testCase'
  }
]

const aLinkList = [
  {
    id: 1,
    src: require('../../assets/images/homeAlink01.png'),
    url: 'https://jenkins.io/zh/',
    title: 'Jenkins'
  },
  {
    id: 2,
    src: require('../../assets/images/homeAlink02.png'),
    url: 'https://www.ansible.com/',
    title: 'ANSIBLE'
  },
  {
    id: 3,
    src: require('../../assets/images/homeAlink03.png'),
    url: 'https://www.spinnaker.io/',
    title: 'Spinnaker'
  },
  {
    id: 4,
    src: require('../../assets/images/homeAlink04.png'),
    url: 'https://about.gitlab.com/',
    title: 'GitLab'
  },
  {
    id: 5,
    src: require('../../assets/images/homeAlink05.png'),
    url: 'https://www.jaegertracing.io/',
    title: 'JAEGER'
  },
  {
    id: 6,
    src: require('../../assets/images/homeAlink06.png'),
    url: 'https://grafana.com/',
    title: 'Grafana'
  },
  {
    id: 7,
    src: require('../../assets/images/homeAlink07.png'),
    url: 'https://prometheus.io/',
    title: 'Prometheus'
  },
  {
    id: 8,
    src: require('../../assets/images/homeAlink08.png'),
    url: 'https://rook.io/',
    title: 'ROOK'
  },
  {
    id: 9,
    src: require('../../assets/images/homeAlink09.png'),
    url: 'https://cri-o.io/',
    title: 'cri-o'
  },
  {
    id: 10,
    src: require('../../assets/images/homeAlink10.png'),
    url: 'https://github.com/containernetworking',
    title: 'CNI'
  },
  {
    id: 11,
    src: require('../../assets/images/homeAlink11.png'),
    url: 'https://kubevirt.io/',
    title: 'KubeVirt'
  },
  {
    id: 12,
    src: require('../../assets/images/homeAlink12.png'),
    url: 'https://helm.sh/',
    title: 'HELM'
  },
  {
    id: 13,
    src: require('../../assets/images/homeAlink13.png'),
    url: 'https://kubernetes.io/',
    title: 'Kubernetes'
  },
  {
    id: 14,
    src: require('../../assets/images/homeAlink14.png'),
    url: 'https://goharbor.io/',
    title: 'HARBOR'
  },
  {
    id: 15,
    src: require('../../assets/images/homeAlink15.png'),
    url: 'https://kubeedge.io/en/',
    title: 'KubeEdge'
  },
  {
    id: 16,
    src: require('../../assets/images/homeAlink16.png'),
    url: 'https://github.com/knative/docs/',
    title: 'Knative'
  },
  {
    id: 17,
    src: require('../../assets/images/homeAlink17.png'),
    url: 'https://www.onap.org/',
    title: 'ONAP'
  }
]

export {
  commonApp, aLinkList
}
