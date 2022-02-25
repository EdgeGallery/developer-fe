/*
 *  Copyright 2022 Huawei Technologies Co., Ltd.
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

const devSystemCn = {
  devSystem: {
    systemHost: '沙箱管理',
    system: '系统',
    architecture: '架构',
    status: '状态',
    resourceConfig: '资源配置',
    completeInfo: '请填写完整的信息',
    upload: '上传',
    name: '名称',
    inputName: '输入名称搜索',
    addHost: '新增沙箱环境',
    addHostFail: '新建沙箱失败',
    pleaseInput: '请输入',
    success: '成功',
    correct: '正确',
    address: '部署区域',
    username: '用户名',
    password: '密码',
    char: '字符',
    deleteConfirm: '确定删除吗？',
    deleteTime: '删除时间',
    addMep: '新增服务',
    basicInfo: '基本信息',
    registerInfo: '注册信息',
    capType: '能力分类',
    oneLevelCapability: '一级能力',
    twoLevelCapability: '二级能力',
    isExistCapability: '已存在同名服务',
    capTypeOPENMEP: '生态能力',
    serviceName: '服务名称',
    inPort: '端口号',
    version: '版本',
    provider: '提供商',
    apiFileId: 'API定义文件',
    fileExceed: '最多上传一个文件',
    guideFileId: '说明文档',
    guideFileId_zh: '中文说明文档',
    guideFileId_en: '英文说明文档',
    zh_cn: '中文',
    en: '英文',
    portRange: '端口范围',
    config_id: '配置文件',
    networkConfig: '网络配置',
    configParamas: '配置参数',
    lcmIp: 'lcmIP',
    mecHost: 'mecHost',
    imageMgmt: {
      systemImgMgmt: '系统镜像管理',
      imgName: '镜像名称',
      imgPath: '镜像路径',
      imgType: '镜像类型',
      osName: '操作系统',
      osVersion: '版本',
      osBit: '位数',
      sysDisk: '磁盘大小',
      diskBus: '磁盘格式',
      userName: '所属用户',
      createTime: '创建时间',
      uploadTime: '上传时间',
      imgFormat: '镜像格式',
      beginTime: '上传时间（起始）',
      endTime: '上传时间（结束）',
      slimming: '瘦身',
      imageSize: '镜像大小',
      minDisk: '最小磁盘',
      errorMessage: '错误信息',
      typeValue: {
        public: '公共',
        private: '私有',
        isPublic: '是否公开'
      },
      statusValue: {
        uploadWait: '待上传',
        uploading: '正在上传',
        merging: '正在合并',
        uploadSucceeded: '上传成功',
        uploadFailed: '上传失败',
        uploadCancelled: '上传已取消',
        published: '已发布'
      },
      uploadStatusText: {
        success: '正在合并',
        error: '上传失败',
        uploading: '正在上传',
        paused: '暂停',
        waiting: '等待'
      },
      slimStatusText: {
        slimWait: '等待瘦身',
        slimming: '瘦身中',
        slimSucceed: '瘦身成功',
        slimFailed: '瘦身失败',
        isoSlimFailed: 'iso镜像不支持瘦身'
      },
      operation: {
        newImg: '新建系统镜像',
        upload: '上传',
        selectImgFile: '选择文件',
        publish: '发布'
      },
      containerImage: {
        synchronize: '同步镜像',
        syncing: '同步中...',
        pleaseWait: '同步镜像需要几分钟，请耐心等待···',
        synchronized: '镜像已同步',
        latestImage: '已经是最新镜像',
        noImage: 'Harbor仓库暂无镜像',
        imageFailed: '镜像同步失败'
      },
      errorType: {
        formatMistake: '上传的文件格式错误。',
        zipFileOpenFailed: '文件打开失败，可能文件不是一个有效的zip文件，请检查。',
        fileSystemMergeFailed: '请求文件系统服务合并文件返回失败，可能是处理超时。',
        failedOnUploadToFS: '上传至文件系统服务失败，请检查文件系统服务地址配置，并确认文件系统服务是否正常。',
        unknown: '未知错误'
      },
      tip: {
        newImg: '新建系统镜像',
        editImg: '修改系统镜像',
        viewImg: '查看系统镜像详情',
        nameRules: '4-32位不含中文和空格',
        nameRule: '请输入4-32不含中文和空格的字符，开头结尾不能为_、-、.',
        versionEmpty: '系统版本号不能为空！',
        versionRule: '请输入有效的系统版本号，包含1-20个字符！',
        systemDiskEmpty: '系统磁盘大小不能为空！',
        systemDiskRule: '请输入1-9999的整数！',
        uploadImg: '上传系统镜像',
        uploadImgPromt: '请上传qcow2或iso格式文件。',
        uploadContainerImgPromt: '上传tar格式的镜像包，通过解析tar包，重新命名格式镜像，推送到Harbor仓库，上传前检查tar包中镜像的名称是否包含/，如果包含可能会导致镜像路径混乱，后续的部署失败',
        uploadImgPromtExample: '示意：',
        sysImageFileType: '请上传大小不超过100G的文件！',
        sysContainerImageFileType: '请上传.tar格式的文件，且大小不超过5G！',
        onlyOneImageFile: '只能上传一个文件！',
        noFileSelected: '未选择上传的文件',
        confirmDeleteImage: '确认要删除该系统镜像吗？',
        confirmPublishImage: '确认要发布该系统镜像吗？',
        confirmResetImage: '请谨慎进行状态重置操作！确保该镜像是在上传过程发生了意外中断。您确认要重置该镜像的状态吗？',
        confirmReUploadImage: '已经上传了该系统镜像，再次上传将覆盖原有镜像。是否继续？',
        confirmUploadImageOnUploading: '该镜像处于正在上传状态，请谨慎操作！确保该镜像是在上传过程发生了意外中断而需要重新或继续上传。如果您选择了上一次上传中断的文件，将会从中断点开始继续上传。是否继续？',
        confirmUploadImageOnUploadFailed: '该镜像处于上传失败状态。如果是上传过程发生了意外中断，并且您再次选择上一次上传中断的文件，将会从中断点开始继续上传。是否继续？',
        confirmDownloadImage: '系统镜像文件较大，下载耗时较长。是否继续下载该镜像？',
        systemNameExist: '此用户名下已存在同名同版本的系统镜像！',
        newImgFailed: '新建系统镜像失败！',
        modifyImgFailed: '修改系统镜像失败！',
        deleteImgFailed: '删除系统镜像失败！',
        publishImgFailed: '发布系统镜像失败！',
        resetImgStatusFailed: '重置镜像状态失败！',
        queryImgFailed: '查询系统镜像失败！',
        uploadingHint: '系统镜像正在上传，请等待！',
        uploadImgSucceed: '系统镜像上传处理成功！',
        uploadImgFailed: '镜像文件合并请求返回失败，但是后台可能仍然在合并处理中，请耐心等待，可在镜像列表中观察镜像上传状态！',
        invalidUploadFile: '上传的文件不符合要求！',
        mergingHintForCancel: '系统镜像已经在进行合并处理，无法取消！',
        confirmCancelUpload: '确认要取消上传吗？',
        cancelUploadFailed: '取消上传失败！',
        cancelingHint: '正在取消，请稍候...',
        systemDiskTip: '磁盘大小小于所需的最小磁盘大小，请点击“更多->编辑”修改'
      }
    },
    promptMessage: {
      typeConfig: '请上传config文件',
      hostErrorInfo: '请输入正确的Host地址',
      ipErrorInfo: '请输入正确的IP地址',
      typeError: '格式错误',
      uploadSuccess: '上传成功！',
      guestPrompt: 'Guest用户无权操作，请先登录！',
      uploadFailure: '上传失败！',
      mecHostExist: '已经存在相同的mecHost',
      textWrap: '可以包含中英文、空格、/，首尾不能有空格'
    }
  }
}
export default devSystemCn
