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

import Vue from 'vue'
import MessageBox from './MessageBox.vue'

const EGMessageBox = Vue.extend(MessageBox)

const messageBoxComp = function (desc, type, cancelText, confirmText, descSub) {
  let options = {}
  if (typeof desc === 'object') {
    options = desc
  } else {
    options.type = type || 'info'
    options.desc = desc || ''
    options.descSub = descSub || ''
    options.cancelText = cancelText || ''
    options.confirmText = confirmText || this.$t('common.confirm')
  }

  let instance = new EGMessageBox({
    data: options
  }).$mount()

  document.body.appendChild(instance.$el)

  return instance.init()
}

export default {
  install: (Vues) => {
    Vues.prototype.$eg_messagebox = messageBoxComp
  }
}
