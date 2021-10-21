# website
This is the unified portal of the Edgegallery platform.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## menu config
1. the menu need consistent with the menu in developer-fe repository, appStore repository, atp repository, mecm repository. 
the difference is that, the menu is  rearranged and add a prefix to each menu path. the prefix is defined in file "./src/classic/navdata/constants.js"
2. add permission control to menus through add 'authority' property. details see the menu config, such as the file "./src/classic/navdata/devNav.js"

## messages defination
developer interfaces, addStore interfaces, mecm interfaces and atp interfaces are nested to this platform by iframe. the nested interface need get language change event, and this platform need get the route change in the nested interfaces. Here we use postMessage implement it.
1. language change message defination as:
  ```javascript
  {
    cmd: 'iframeLanguageChange',
    params: { lang: 'en' } // lang value: 'en' or 'cn'
  }
  ```
2. route change message defination as:
  ```javascript
  {
    cmd: 'routeTo',
    params: {
      module: 'developer', // module value: 'developer' or 'appStore' or 'mecm' or 'atp'
      path: to.path, // the route to path
      activeMenuPath: this.indexName // the path of active menu
    }
  }
  ```