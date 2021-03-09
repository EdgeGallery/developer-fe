function WSSHClient () {
};

WSSHClient.prototype._generateEndpoint = function () {
  let currUrl = window.location.host
  if (window.location.protocol == 'https:') {
    var protocol = 'wss://'
  } else {
    var protocol = 'ws://'
  }
  if (currUrl.indexOf('30092') !== -1) {
    var VncUrl = currUrl.replace('30092', '30098')
  } else if (currUrl.indexOf('8080') !== -1) {
    var VncUrl = currUrl.replace('8080', '9082')
  } else {
    var VncUrl = currUrl + ':30098'
  }
  var endpoint = protocol + VncUrl + '/webssh'
  return endpoint
}

WSSHClient.prototype.connect = function (options) {
  var endpoint = this._generateEndpoint()

  if (window.WebSocket) {
    // 如果支持websocket
    this._connection = new WebSocket(endpoint)
  } else {
    // 否则报错
    options.onError('WebSocket Not Supported')
    return
  }

  this._connection.onopen = function () {
    options.onConnect()
  }

  this._connection.onmessage = function (evt) {
    var data = evt.data.toString()
    // data = base64.decode(data);
    options.onData(data)
  }

  this._connection.onclose = function (evt) {
    options.onClose()
  }
}

WSSHClient.prototype.send = function (data) {
  this._connection.send(JSON.stringify(data))
}

WSSHClient.prototype.sendInitData = function (options) {
  // 连接参数
  this._connection.send(JSON.stringify(options))
}

WSSHClient.prototype.sendClientData = function (data) {
  // 发送指令
  this._connection.send(JSON.stringify({ 'operate': 'command', 'command': data }))
}

var client = new WSSHClient()
