import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './en.js'
import cn from './cn.js'
import locale from 'element-ui/lib/locale'
Vue.use(VueI18n)
const message = {
  en, cn
}
let language = localStorage.getItem('language')
const i18n = new VueI18n({
  locale: language || 'cn',
  messages: message
})
locale.i18n((key, value) => i18n.t(key, value))
export default i18n
