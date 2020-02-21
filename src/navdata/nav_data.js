
const mecDeveloper = [
  {
    id: '3.1',
    name: 'Home',
    path: '/mecDeveloper',
    pageId: '2.2.0',
    display: false
  },
  {
    id: '3.2',
    name: 'DevTools',
    path: '/mecDeveloper/plugin/list#1',
    pageId: '2.2.1',
    display: false,
    children: [
      {
        id: '3.3',
        name: 'Plugin',
        path: '/mecDeveloper/plugin/list#1',
        pageId: '2.2.1.1',
        display: false
      },
      // {
      //   id: '3.4',
      //   name: 'SDK',
      //   path: '/mecDeveloper/sdk/list#2',
      //   pageId: '2.2.1.2',
      //   display: false
      // },
      {
        id: '3.5',
        name: 'Upload',
        path: '/mecDeveloper/plugin/upload#1',
        pageId: '2.2.1.3',
        display: false
      }
    ]
  },
  {
    id: '3.6',
    name: 'API',
    path: '/mecDeveloper/api/mep',
    pageId: '2.2.2',
    display: false,
    children: [
      // {
      //   id: '3.7',
      //   name: 'Introduction',
      //   path: '/mecDeveloper/api/docs',
      //   pageId: '2.2.2.1',
      //   display: false
      // },
      {
        id: '3.16',
        name: 'MEP API',
        path: '/mecDeveloper/api/mep',
        pageId: '2.2.2.2',
        display: false
      },
      {
        id: '3.8',
        name: 'MEP-ECO API',
        path: '/mecDeveloper/api/mep-eco',
        pageId: '2.2.2.2',
        display: false
      },
      {
        id: '3.9',
        name: 'MECDeveloper Platform API',
        path: '/mecDeveloper/api/swagger',
        pageId: '2.2.2.3',
        display: false
      }
    ]
  },
  {
    id: '3.10',
    name: 'Test',
    path: '/mecDeveloper/test/how',
    pageId: '2.2.3',
    display: false,
    children: [
      {
        id: '3.11',
        name: 'How To Test',
        path: '/mecDeveloper/test/how',
        pageId: '2.2.3.1',
        display: false
      },
      {
        id: '3.16',
        name: 'Test Specification',
        path: '/mecDeveloper/test/specification',
        pageId: '2.2.3.1',
        display: false
      },
      {
        id: '3.12',
        name: 'Test Application',
        path: '/mecDeveloper/test/apply',
        pageId: '2.2.3.2',
        display: false
      },
      {
        id: '3.13',
        name: 'Test Task Management',
        path: '/mecDeveloper/test/task',
        pageId: '2.2.3.3',
        display: false
      }
    ]
  },
  {
    id: '3.14',
    name: 'Community',
    path: '/mecDeveloper/community/Community',
    pageId: '2.2.4',
    display: false
  },
  {
    id: '3.15',
    name: 'Workspace',
    path: '/mecDeveloper/work',
    pageId: '2.2.4',
    display: false
  }
]

export default {
  mecDeveloper
}
