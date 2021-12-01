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
import cnClassic from './classic_cn.js'
import cnHome from './home_cn.js'
import cnApp from './app_cn.js'
import cnAppStore from './appstore_cn.js'
import cnCapability from './capability_cn.js'
import cnSandbox from './sandbox_cn.js'
import cnImages from './images_cn.js'
import cnAtp from './atp_cn.js'
import cnMecm from './mecm_cn.js'
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
    login: '登录',
    upload: '上传',
    start: '启动',
    name: '名称',
    describe: '描述',
    userName: '用户名',
    enterUserName: '请输入用户名',
    password: '密码',
    enterPassword: '请输入密码',
    pleaseSelect: '请选择',
    back: '返回'
  },
  promptInformation: {
    confirmDelete: '确认删除该数据？',
    deleteFailed: '删除数据失败！',
    editDataFailed: '编辑数据失败！',
    noPermission: 'Guest没有权限操作，请登录后重试'
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
    hsInvalidHint: '当前会话已失效。请选择刷新页面或重新登录。'
  },
  promptMessage: {
    prompt: '提示',
    logoutPage: '确认要注销当前用户？'
  },
  system: {
    threeSystem: '三方系统管理',
    search: '请输入名称进行搜索',
    allNum: '总数',
    active: '激活',
    invalid: '失效',
    systemName: '系统名称',
    url: 'URL',
    region: '部署区域',
    product: '产品',
    vendor: '厂商',
    version: '版本',
    status: '状态',
    username: '用户名',
    password: '密码',
    operation: '操作',
    delete: '删除',
    edit: '编辑',
    systemDetail: '系统详情',
    add: '新建',
    sure: '确认',
    cancel: '取消',
    icon: '图标',
    deleteSucess: '删除成功',
    tootipSystemName: '请输入系统名称',
    tootipProduct: '请输入产品名称',
    tootipUrl: '请输入URL',
    tootipVersion: '请输入版本信息',
    tooltipRegion: '请输入部署区域',
    tooltipVendor: '请输入厂商名称',
    tooltipUsername: '请输入用户名',
    tooltipPassword: '请输入密码',
    addStstemSucess: '新建系统成功!',
    updateStstemSucess: '更新成功'
  },
  ...zhLocale,
  ...cnClassic,
  ...cnHome,
  ...cnApp,
  ...cnAppStore,
  ...cnCapability,
  ...cnSandbox,
  ...cnImages,
  ...cnAtp,
  ...cnMecm
}
export default cn
