import en from '../../locales/en.js'
import cn from '../../locales/cn.js'
import { Capability } from '../../tools/project_data.js'
let allAbilities = []

let getSecondLevelAbilitys = function (parentIndex) {
  if (parentIndex >= 0 && parentIndex < allAbilities.length) {
    if (allAbilities[parentIndex].children && allAbilities[parentIndex].children.length > 0) {
      return allAbilities[parentIndex].children
    }
  }
  return []
}

let getCapabilityLabel = function (val, lan) {
  let label = val
  let resData = Capability.filter((res) => {
    return res.value === val
  })
  if (resData.length > 0) {
    if (lan === 'en') {
      label = resData[0].label[1]
    } else {
      label = resData[0].label[0]
    }
  }
  return label
}
let insetNewNode = function (groupData, tempTreeData, lan) {
  let firstLevelName = groupData.oneLevelName
  let secondLevelName = groupData.twoLevelName
  let thirdLevelName = groupData.threeLevelName
  let obj = {
    key: '',
    label: '',
    children: []
  }
  if (secondLevelName) {
    if (thirdLevelName) {
      let secondeLevelChildren = []
      secondeLevelChildren.push({ key: thirdLevelName, label: getCapabilityLabel(thirdLevelName, lan), groupId: groupData.groupId })
      obj.children.push({
        key: secondLevelName,
        label: getCapabilityLabel(secondLevelName, lan),
        children: secondeLevelChildren
      })
    } else {
      obj.children.push({
        key: secondLevelName,
        label: getCapabilityLabel(secondLevelName, lan),
        groupId: groupData.groupId,
        description: groupData.description
      })
    }
  }
  obj.key = firstLevelName
  obj.label = getCapabilityLabel(firstLevelName, lan)
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
  return result
}
let initAbilities = function (groupDataFromServer, lan) {
  let tempTreeData = []
  for (let i = 0; i < groupDataFromServer.length; i++) {
    let firstLevelName = groupDataFromServer[i].oneLevelName
    let secondLevelName = groupDataFromServer[i].twoLevelName
    let thirdLevelName = groupDataFromServer[i].threeLevelName
    let sameFirstNameItem = tempTreeData.filter(function (item) {
      if (item.key === firstLevelName) {
        return item
      }
    })
    if (sameFirstNameItem.length > 0) {
      let sameSecondNameItem = sameFirstNameItem[0].children.filter(function (item) {
        if (item.key === secondLevelName) {
          return item
        }
      })
      if (sameSecondNameItem.length > 0) {
        if (thirdLevelName) {
          if (sameSecondNameItem[0].children) {
            sameSecondNameItem[0].children.push({
              key: thirdLevelName,
              label: getCapabilityLabel(thirdLevelName, lan),
              groupId: groupDataFromServer[i].groupId
            })
          } else {
            sameSecondNameItem[0].children = [].concat({
              key: thirdLevelName,
              label: getCapabilityLabel(thirdLevelName, lan),
              groupId: groupDataFromServer[i].groupId
            })
          }
        }
      } else {
        if (thirdLevelName) {
          sameFirstNameItem[0].children.push({
            key: secondLevelName,
            label: getCapabilityLabel(secondLevelName, lan),
            groupId: groupDataFromServer[i].groupId,
            children: { key: thirdLevelName, label: getCapabilityLabel(thirdLevelName, lan), groupId: groupDataFromServer[i].groupId }
          })
        } else {
          sameFirstNameItem[0].children.push({
            key: secondLevelName,
            label: getCapabilityLabel(secondLevelName, lan),
            groupId: groupDataFromServer[i].groupId,
            description: groupDataFromServer[i].description
          })
        }
      }
    } else {
      tempTreeData = insetNewNode(groupDataFromServer[i], tempTreeData, lan)
    }
  }
  tempTreeData = [{
    key: 'hotServices',
    label: lan === 'en' ? en.api['hotServices'] : cn.api['hotServices'],
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
  getSecondLevelAbilitys
}
