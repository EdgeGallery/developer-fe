import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeTab: sessionStorage.getItem('activeTab'),
    keyValue: sessionStorage.getItem('keyValue'),
    language: localStorage.getItem('language') ? localStorage.getItem('language') : 'en'
  },
  mutations: {
    changeTab (state, data) {
      state.activeTab = data
      sessionStorage.setItem('activeTab', data)
    },
    getKeyValue (state, data) {
      state.keyValue = data
      sessionStorage.setItem('keyValue', data)
    },
    changelanguage (state, data) {
      state.language = data
    }
  },
  actions: {

  }
})
