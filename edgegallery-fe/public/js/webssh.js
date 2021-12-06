function WSSHClient () {
};

WSSHClient.prototype._generateEndpoint = function () {
  let _currUrl = window.location.host
  let _protocol = ''
  let _VncUrl = ''
  if (window.location.protocol === 'https:') {
    _protocol = 'wss://'
  } else {
    _protocol = 'ws://'
  }
  if (_currUrl.indexOf('30095') !== -1) {
    _VncUrl = _currUrl.replace('30095', '30098')
  } else if (_currUrl.indexOf('8080') !== -1) {
    _VncUrl = _currUrl.replace('8080', '9082')
  } else {
    _VncUrl = _currUrl + ':30098'
  }
  var endpoint = _protocol + _VncUrl + '/webssh'
  return endpoint
}

WSSHClient.prototype.connect = function (options) {
  var endpoint = this._generateEndpoint()

  if (window.WebSocket) {
    // If it supportswebsocket
    this._connection = new WebSocket(endpoint)
  } else {
    // Otherwise report an error
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
  // Connection parameters
  this._connection.send(JSON.stringify(options))
}

WSSHClient.prototype.sendClientData = function (data) {
  // Send instructions
  this._connection.send(JSON.stringify({ 'operate': 'command', 'command': data }))
}

var client = new WSSHClient()
