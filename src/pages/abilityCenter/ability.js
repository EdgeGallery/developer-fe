/*
 *  Copyright 2020 Huawei Technologies Co., Ltd.
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

import en from '../../locales/en.js'
import cn from '../../locales/cn.js'

let allAbilities = []

let getAbilitysByFirstLevelName = function (firstLevelName) {
  return allAbilities.filter(item => item.labelEn === firstLevelName)
}

let getSecondLevelAbilitys = function (parentIndex) {
  if (parentIndex >= 0 && parentIndex < allAbilities.length) {
    if (allAbilities[parentIndex].children && allAbilities[parentIndex].children.length > 0) {
      return allAbilities[parentIndex].children
    }
  }
  return []
}

let insetNewNode = function (groupData, tempTreeData, lan) {
  let firstLevelName = groupData.oneLevelName
  let secondLevelName = groupData.twoLevelName
  let thirdLevelName = groupData.threeLevelName
  let firstLevelNameEn = groupData.oneLevelNameEn
  let secondLevelNameEn = groupData.twoLevelNameEn
  let thirdLevelNameEn = groupData.threeLevelNameEn
  let obj = {
    key: '',
    label: '',
    labelEn: '',
    children: []
  }
  if (secondLevelName) {
    if (thirdLevelName) {
      let secondeLevelChildren = []
      secondeLevelChildren.push({ key: thirdLevelName, label: thirdLevelName, labelEn: thirdLevelNameEn, groupId: groupData.groupId })
      obj.children.push({
        key: lan === 'en' ? secondLevelNameEn : secondLevelName,
        label: secondLevelName,
        labelEn: secondLevelNameEn,
        children: secondeLevelChildren
      })
    } else {
      obj.children.push({
        key: lan === 'en' ? secondLevelNameEn : secondLevelName,
        label: secondLevelName,
        labelEn: secondLevelNameEn,
        groupId: groupData.groupId,
        description: groupData.description,
        descriptionEn: groupData.descriptionEn
      })
    }
  }
  obj.key = lan === 'en' ? firstLevelNameEn : firstLevelName
  obj.label = firstLevelName
  obj.labelEn = firstLevelNameEn
  tempTreeData.push(obj)
  return tempTreeData
}
let getHostAbility = function (data) {
  let result = []
  data.forEach(ele => {
    if (ele.children && ele.children.length > 0) {
      result = result.concat(ele.children)
    }
  })
  return result.slice(0, 8)
}
let initAbilities = function (groupDataFromServer, lan) {
  let tempTreeData = []
  for (let i = 0; i < groupDataFromServer.length; i++) {
    let firstLevelName = groupDataFromServer[i].oneLevelName
    let firstLevelNameEn = groupDataFromServer[i].oneLevelNameEn
    let secondLevelName = groupDataFromServer[i].twoLevelName
    let thirdLevelName = groupDataFromServer[i].threeLevelName
    let secondLevelNameEn = groupDataFromServer[i].twoLevelNameEn
    let thirdLevelNameEn = groupDataFromServer[i].threeLevelNameEn
    let sameFirstNameItem = tempTreeData.filter(function (item) {
      if (item.key === (lan === 'en' ? firstLevelNameEn : firstLevelName)) {
        return item
      }
    })
    if (sameFirstNameItem.length > 0) {
      let sameSecondNameItem = sameFirstNameItem[0].children.filter(function (item) {
        if (item.key === (lan === 'en' ? secondLevelNameEn : secondLevelName)) {
          return item
        }
      })
      if (sameSecondNameItem.length > 0) {
        if (thirdLevelName) {
          if (sameSecondNameItem[0].children) {
            sameSecondNameItem[0].children.push({
              key: lan === 'en' ? thirdLevelNameEn : thirdLevelName,
              label: thirdLevelName,
              labelEn: thirdLevelNameEn,
              groupId: groupDataFromServer[i].groupId
            })
          } else {
            sameSecondNameItem[0].children = [].concat({
              key: lan === 'en' ? thirdLevelNameEn : thirdLevelName,
              label: thirdLevelName,
              labelEn: thirdLevelNameEn,
              groupId: groupDataFromServer[i].groupId
            })
          }
        }
      } else {
        if (thirdLevelName) {
          sameFirstNameItem[0].children.push({
            key: lan === 'en' ? secondLevelNameEn : secondLevelName,
            label: secondLevelName,
            labelEn: secondLevelNameEn,
            groupId: groupDataFromServer[i].groupId,
            children: { key: thirdLevelName, label: thirdLevelName, labelEn: thirdLevelNameEn, groupId: groupDataFromServer[i].groupId }
          })
        } else {
          sameFirstNameItem[0].children.push({
            key: lan === 'en' ? secondLevelNameEn : secondLevelName,
            label: secondLevelName,
            labelEn: secondLevelNameEn,
            groupId: groupDataFromServer[i].groupId,
            description: groupDataFromServer[i].description,
            descriptionEn: groupDataFromServer[i].descriptionEn
          })
        }
      }
    } else {
      tempTreeData = insetNewNode(groupDataFromServer[i], tempTreeData, lan)
    }
  }
  tempTreeData = [{
    key: 'hotServices',
    label: cn.api['hotServices'],
    labelEn: en.api['hotServices'],
    children: getHostAbility(tempTreeData)
  }].concat(tempTreeData)
  let tmpIndex = 0
  tempTreeData.forEach(ele => {
    ele.index = tmpIndex
    tmpIndex++
  })
  allAbilities = tempTreeData
  return allAbilities
}

export default {
  initAbilities,
  getSecondLevelAbilitys,
  getAbilitysByFirstLevelName
}
