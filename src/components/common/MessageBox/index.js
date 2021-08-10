import Vue from 'vue'
import MessageBox from '../MessageBox/MessageBox.vue'

const EGMessageBox = Vue.extend(MessageBox)

const messageBoxComp = function (options) {
  if (options === undefined || options === null) {
    options = {
      title: ''
    }
  } else if (typeof options === 'string' || typeof options === 'number') {
    options = {
      title: options
    }
  }

  let instance = new EGMessageBox({
    data: options
  }).$mount()

  document.body.appendChild(instance.$el)

  return instance.init()
}

export default {
  install: (Vue) => {
    Vue.prototype.$eg_messagebox = messageBoxComp
  }
}
