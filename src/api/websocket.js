import {wsurl} from './hosturl'
import store from '@/store'

export let id = {
  cid: store.state.user.userId
}

export const ws = {
  mycid: store.state.user.userId || id.cid,
  websocket: new WebSocket(wsurl + '?uid=' + this.mycid + '&type=app'),
  // _status(ws.websocket.readyState, ':用户cid:' + mycid, 'vuex中')
  onpen: function () {
    ws.websocket.onopen = () => {
      _status(ws.websocket.readyState, ':用户cid:' + this.mycid, 'vuex中OPEN1')
    }
  },
  onmessage: function (func) {
    ws.websocket.onmessage = (e) => {
      _status(ws.websocket.readyState, e.data, 'vuex中onmessage1')
      func && func(e)
    }
  },
  send: function (message) {
    ws.websocket.send(message)
    _status(ws.websocket.readyState, message, 'vuex中send1')
  },
  close: function () {
    ws.websocket.close()
    console.log(ws.websocket.readyState + 'vuex关闭1')
  }
}

export function wss (cid) {
  let cids = store.state.user.userId
  let mycid = cid || cids
  let websocket = new WebSocket(wsurl + '?uid=' + mycid + '&type=app')
  _status(websocket.readyState, ':用户cid:' + mycid, 'vuex中')
  websocket.onopen = () => {
    _status(websocket.readyState, ':用户cid:' + mycid, 'vuex中OPEN1')
  }
}

export function onmessage (cid, func) {
  let websocket = ws(cid)
  websocket.onmessage = (e) => {
    _status(websocket.readyState, e.data, 'vuex中onmessage1')
    func && func(e)
  }
}
export function send (message) {
  let websocket = ws('')
  websocket.send(message)
  _status(websocket.readyState, message, 'vuex中send1')
}

export function close (cid) {
  let websocket = ws(cid)
  websocket.close()
  console.log(websocket.readyState + '关闭1')
}

export function _status (types, data, flag) {
  switch (types) {
    case 0:
      console.log('0表示正在连接:', data, flag)
      break
    case 1:
      console.log('1表示连接成功，可以通信了:', data, flag)
      break
    case 2:
      console.log('2表示连接正在关闭:', data, flag)
      break
    case 3:
      console.log('3表示连接已经关闭，或者打开连接失败:', data, flag)
      break
  }
}
