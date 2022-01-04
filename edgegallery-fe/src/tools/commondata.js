const Industry = [
  {
    value: 'Smart City',
    label: ['智慧城市', 'Smart City']
  }, {
    value: 'Smart Park',
    label: ['智慧园区', 'Smart Park']
  }, {
    value: 'Smart Agriculture',
    label: ['智慧农业', 'Smart Agriculture']
  }, {
    value: 'Industrial Internet',
    label: ['工业互联网', 'Industrial Internet']
  }, {
    value: 'Transportation Logistics',
    label: ['交通物流', 'Transportation Logistics']
  }, {
    value: 'Energy',
    label: ['能源', 'Energy']
  }, {
    value: 'Finance',
    label: ['金融', 'Finance']
  }, {
    value: 'Education',
    label: ['教育', 'Education']
  }, {
    value: 'Cultural Tourism',
    label: ['文化旅游', 'Cultural Tourism']
  }, {
    value: 'Medical Health',
    label: ['医疗健康', 'Medical Health']
  }, {
    value: 'Digital Government',
    label: ['数字政府', 'Digital Government']
  }, {
    value: 'Ecosystem',
    label: ['生态环境', 'Ecosystem']
  }, {
    value: 'Game Competition',
    label: ['游戏竞技', 'Game Competition']
  }, {
    value: 'Open Source',
    label: ['开源', 'Open Source']
  }, {
    value: 'Others',
    label: ['其他', 'Others']
  }
]

const Type = [
  {
    value: 'Video Application',
    label: ['视频应用', 'Video Application']
  }, {
    value: 'Safety',
    label: ['安全', 'Safety']
  }, {
    value: 'Blockchain',
    label: ['区块链', 'Blockchain']
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
    value: 'Game',
    label: ['游戏', 'Game']
  }, {
    value: 'Others',
    label: ['其他', 'Others']
  }
]

const Architecture = [
  {
    value: 'X86',
    label: 'X86'
  }, {
    value: 'ARM64',
    label: 'ARM64'
  }, {
    value: 'ARM32',
    label: 'ARM32'
  }
]

const Status = {
  CREATED: ['创建完成', 'Created', 'app-created'],
  CONFIGURED: ['配置完成', 'Configuared', 'app-success'],
  PACKAGED: ['打包完成', 'Packaged', 'app-success'],
  TESTED: ['测试完成', 'Tested', 'app-success'],
  RELEASED: ['已发布', 'Released', 'app-published']
}

export {
  Industry,
  Type,
  Architecture,
  Status
}
