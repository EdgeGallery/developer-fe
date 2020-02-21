function setCookie (name, value) {
  let exp = new Date()
  exp.setTime(exp.getTime() + 30 * 60 * 1000)
  document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
}

function getCookie (name) {
  let arr
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  arr = document.cookie.match(reg)
  if (arr) {
    return unescape(arr[2])
  } else {
    return null
  }
}

function deleteCookie (name) {
  let exp = new Date()
  exp.setTime(exp.getTime() * 0)
  document.cookie = name + ';expires=' + exp.toGMTString()
};

export {
  setCookie, getCookie, deleteCookie
}
