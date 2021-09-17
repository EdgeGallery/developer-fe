const NAV_PRE = {
  DEVELOPER: '/developer',
  APPSTORE: '/appStore',
  MECM: '/mecm',
  ATP: '/atp'
}

const FIRST_LEVEL_MENU_PATH = {
  HOME: '/home',
  DEVELOPER: '/mecDeveloper',
  APPSTORE: '/appStore',
  MECM: '/mecm',
  ATP: '/atp',
  SYSTEM: '/system'
}

const MODULES = {
  DEVELOPER: {
    name: 'developer',
    port: '30092'
  },
  APPSTORE: {
    name: 'appStore',
    port: '30091'
  },
  MECM: {
    name: 'mecm',
    port: '30093'
  },
  ATP: {
    name: 'atp',
    port: '30094'
  }
}

const HEALTH_URL = '/health'

export {
  NAV_PRE,
  FIRST_LEVEL_MENU_PATH,
  MODULES,
  HEALTH_URL
}
