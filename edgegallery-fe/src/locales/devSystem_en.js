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

const devSystemEn = {
  devSystem: {
    systemHost: 'Host Management',
    system: 'System',
    architecture: 'Architecture',
    status: 'Status',
    resourceConfig: 'Resource Allocation',
    completeInfo: 'Please fill in the complete information',
    upload: 'Upload',
    success: 'Success',
    name: 'Name',
    inputName: 'Enter the name',
    addHost: 'Add Host',
    addHostFail: 'Failed to create new sandbox',
    pleaseInput: 'Please input ',
    address: 'Address',
    username: 'Username',
    password: 'Password',
    char: 'characters',
    correct: 'correct',
    deleteConfirm: 'Are you sure to delete?',
    deleteTime: 'Delete Time',
    addMep: 'Add Service',
    basicInfo: 'Basic Info',
    registerInfo: 'Register Info',
    capType: 'Type',
    oneLevelCapability: 'oneLevelCapability',
    twoLevelCapability: 'twoLevelCapability',
    isExistCapability: 'A service with the same name already exists',
    capTypeOPENMEP: 'OPENMEP',
    serviceName: 'Service Name',
    inPort: 'Port',
    version: 'Version',
    provider: 'Provider',
    apiFileId: 'API Document',
    fileExceed: 'Upload a maximum of one file',
    guideFileId: 'Guide',
    guideFileId_zh: 'Guide(chinese)',
    guideFileId_en: 'Guide(english)',
    zh_cn: 'please input chinese',
    en: 'please input english',
    portRange: 'Port Range',
    config_id: 'Config File',
    networkConfig: 'Network Config',
    configParamas: 'Configuration parameters',
    lcmIp: 'lcmIP',
    mecHost: 'mecHost',
    imageMgmt: {
      systemImgMgmt: 'System Image Management',
      imgName: 'Image Name',
      imgPath: 'Image Path',
      imgType: 'Image Type',
      osName: 'Operate System',
      osVersion: 'Version',
      osBit: 'System Bit',
      sysDisk: 'Disk Size',
      diskBus: 'Disk Format',
      userName: 'User',
      createTime: 'Create Time',
      uploadTime: 'Upload Time',
      imgFormat: 'Image Format',
      beginTime: 'Upload Time(Begin)',
      endTime: 'Upload Time(End)',
      slimming: 'Slimming',
      imageSize: 'Image Size',
      minDisk: 'Minimum Disk',
      errorMessage: 'Error Message',
      typeValue: {
        public: 'Public',
        private: 'Private',
        isPublic: 'Is it Public'
      },
      statusValue: {
        uploadWait: 'To be uploaded',
        uploading: 'Uploading',
        merging: 'Merging',
        uploadSucceeded: 'Upload succeeded',
        uploadFailed: 'Upload failed',
        uploadCancelled: 'Upload cancelled',
        published: 'Published'
      },
      uploadStatusText: {
        success: 'Merging file',
        error: 'Upload failed',
        uploading: 'Uploading',
        paused: 'Paused',
        waiting: 'Waiting'
      },
      slimStatusText: {
        slimWait: 'To be slim',
        slimming: 'Slimming',
        slimSucceed: 'Slim Succeed',
        slimFailed: 'Slim Failed',
        isoSlimFailed: 'ISO image does not support slimming'
      },
      operation: {
        newImg: 'New System Image',
        upload: 'Upload',
        selectImgFile: 'Select File',
        publish: 'Publish'
      },
      containerImage: {
        synchronize: 'Synchronize Image',
        syncing: 'Syncing...',
        pleaseWait: 'It takes a few minutes to synchronize the image, please wait patiently···',
        synchronized: 'Image synchronized',
        latestImage: 'Already the latest image',
        noImage: 'Harbor warehouse has no image',
        imageFailed: 'Image synchronization failed'
      },
      errorType: {
        formatMistake: 'The uploaded file format is incorrect.',
        zipFileOpenFailed: 'Failed to open the file. The file may not be a valid zip file. Please check.',
        fileSystemMergeFailed: 'The request for the file system to merge files returned a failure, possibly due to a processing timeout.',
        failedOnUploadToFS: 'Failed to upload to the file system service. Please check the file system service address configuration and confirm whether the file system service is normal.',
        unknown: 'Unknown error.'
      },
      tip: {
        newImg: 'New System Image',
        editImg: 'Edit System Image',
        viewImg: 'View System Image Detail',
        nameRules: '4-32 without Chinese and spaces',
        nameRule: 'Please enter 4-32 characters without Chinese characters and spaces. The beginning and the end cannot be _, -,.',
        versionEmpty: 'System version cannot be empty!',
        versionRule: 'Please enter a valid version of 1-20 characters!',
        systemDiskEmpty: 'System disk size cannot be empty!',
        systemDiskRule: 'Please enter an integer from 1-9999!',
        uploadImg: 'Upload System Image',
        uploadImgPromt: 'Please upload a file in qcow2 or iso format.',
        uploadContainerImgPromt: 'Upload the image package in tar format, rename the format image by parsing the tar package, and push it to the Harbor warehouse, Before uploading, check whether the name of the image in the tar package contains /. If it does, it may cause confusion in the image path and subsequent deployment failures',
        uploadImgPromtExample: 'Example:',
        sysImageFileType: 'Please upload a file that does not exceed 100G in size!',
        sysContainerImageFileType: 'Please upload files in .tar format, and the size does not exceed 5G!',
        onlyOneImageFile: 'You can only upload one file!',
        noFileSelected: 'No file selected',
        confirmDeleteImage: 'Are you sure to delete this system image?',
        confirmPublishImage: 'Are you sure to publish this system image?',
        confirmResetImage: 'Please reset the status carefully! Ensure that the image is accidentally interrupted during upload. Are you sure you want to reset the status of the image?',
        confirmReUploadImage: 'The system image has been uploaded, and the original image will be overwritten if it is uploaded again. Continue?',
        confirmUploadImageOnUploading: 'The system image is uploading. Please be careful! Ensure that the image needs to be uploaded again or continue because of an unexpected interruption in the upload process. If you select the file that was interrupted in the last upload, the upload will continue from the interruption point. Continue?',
        confirmUploadImageOnUploadFailed: 'The system image is in upload failed status. If the upload process is interrupted unexpectedly, and you select the file interrupted last time again, the upload will continue from the interruption point. Continue?',
        confirmDownloadImage: 'The system image is large, it will takes a long time to download. Do you want to continue downloading the image?',
        systemNameExist: 'A system image with the same name and version already exists under this user name!',
        newImgFailed: 'New system image failed!',
        modifyImgFailed: 'Modify system image failed!',
        deleteImgFailed: 'Delete system image failed!',
        publishImgFailed: 'Publish system image failed!',
        resetImgStatusFailed: 'Reset system image status failed!',
        queryImgFailed: 'Query system image failed!',
        uploadingHint: 'The system image is uploading, please wait!',
        uploadImgSucceed: 'The system image upload succeed!',
        uploadImgFailed: 'Upload system image failed!',
        invalidUploadFile: 'The uploaded file does not meet the requirements!',
        mergingHintForCancel: 'The system image is merging, the upload operation cannot be cancelled!',
        confirmCancelUpload: 'Are you sure to cancel the upload operation?',
        cancelUploadFailed: 'Cancel upload operation failed!',
        cancelingHint: 'Canceling, please wait...',
        systemDiskTip: 'The disk size is smaller than the required minimum disk size, please click "More->Edit" to modify'
      }
    },
    promptMessage: {
      typeConfig: 'Please upload config file',
      hostErrorInfo: 'Please enter the correct Host address',
      ipErrorInfo: 'Please enter the correct IP address',
      typeError: 'Format error',
      uploadSuccess: 'Upload success!',
      guestPrompt: 'The guest user has no right to operate, please log in first!',
      uploadFailure: 'Upload failure!',
      mecHostExist: 'The same mecHost already exists',
      textWrap: ' Can contain Chinese and English, spaces, /, no spaces at the beginning and end'
    }
  }
}
export default devSystemEn
