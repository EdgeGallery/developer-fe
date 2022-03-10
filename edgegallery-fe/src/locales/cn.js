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

import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import cnHome from './home_cn.js'
import cnApp from './app_cn.js'
import cnAppStore from './appstore_cn.js'
import cnCapability from './capability_cn.js'
import cnSandbox from './sandbox_cn.js'
import cnThirdsystem from './thirdsystem_cn.js'
import cnImages from './images_cn.js'
import cnAtp from './atp_cn.js'
import cnMecm from './mecm_cn.js'
import cnDevSystem from './devSystem_cn.js'
const cn = {
  common: {
    classic: '经典版',
    operation: '操作',
    edit: '编辑',
    delete: '删除',
    cancel: '取消',
    confirm: '确认',
    finish: '完成',
    save: '保存',
    close: '关闭',
    detail: '详情',
    select: '选择',
    add: '添加',
    login: '请登录后查看',
    upload: '上传',
    start: '启动',
    name: '名称',
    describe: '描述',
    userName: '用户名',
    enterUserName: '请输入用户名',
    password: '密码',
    enterPassword: '请输入密码',
    pleaseSelect: '请选择',
    back: '返回',
    noData: '暂无数据',
    exceptionServer: '服务异常，请检查',
    check: '查看',
    download: '下载',
    more: '更多',
    unknown: '未知',
    all: '全部',
    reset: '重置'
  },
  promptInformation: {
    confirmDelete: '确认删除该数据？',
    deleteFailed: '删除数据失败！',
    editDataSuccess: '编辑数据成功！',
    editDataFailed: '编辑数据失败！',
    noPermission: 'Guest没有权限操作，请登录后重试',
    fileIsEmpty: '文件内容为空！',
    addFailed: '添加数据失败！',
    connectFailed: '连接失败！'
  },
  normal: {
    newVersion: '新版',
    cancel: '取消',
    confirm: '确认'
  },
  nav: {
    logIn: '登录',
    userAccountCenter: '我的帐号',
    logOut: '注销',
    refresh: '刷新',
    reLogin: '重新登录',
    hsInvalidHintForTimeout: '您长时间未操作，',
    hsInvalidHintForLogout: '您通过其它页面执行了登录或注销操作，',
    hsInvalidHintForServerStopped: '后台服务升级，',
    hsInvalidHint: '当前会话已失效。请选择刷新页面或重新登录。',
    accountInconsistent: '非常抱歉！可能是由于浏览器安全策略的原因，这里遇到了Cookie被拦截从而导致帐号不同步的问题。请清除浏览器Cookie缓存后重新登录。'
  },
  homePromptMessage: {
    prompt: '提示',
    logoutPage: '确认要注销当前用户？',
    merging: '文件正在合并',
    mergeSuccess: '文件合并成功',
    mergeFailed: '文件合并失败'

  },
  ...zhLocale,
  ...cnHome,
  ...cnApp,
  ...cnAppStore,
  ...cnCapability,
  ...cnSandbox,
  ...cnImages,
  ...cnAtp,
  ...cnMecm,
  ...cnThirdsystem,
  ...cnDevSystem
}
export default cn
