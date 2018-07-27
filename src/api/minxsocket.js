import { wsurl } from 'api/hosturl'
import {openDB, addData} from '@/api/sqls'
import {mapGetters, mapMutations} from 'vuex'
// import {fictionMixin} from 'api/minx'
import {decodeUnicode} from 'api/num'
let websocket = null
let config = {
  dbName: 'toking',
  tableName: 'tablestu',
  keyPath: 'countId',
  version: 1,
  db: null,
  errorCode: {
    // 错误码
    open: 91001, // 打开数据库失败的错误
    save: 91002, // 保存数据失败的错误
    get: 91003, // 获取数据失败的错误
    delete: 91004, // 删除数据失败的错误
    deleteAll: 91005, // 清空数据库失败的错误
    add: 91006, // 插入
    ok: 90000
  }
}
export const socketMixin = {
  // mixins: [fictionMixin],
  data () {
    return {
      addDataMsg: {},
      message: 0,
      interval: null
    }
  },
  created () {
    this.$bus.on('sendcontent', val => {
      console.log('sendcontent', val)
      this._sends(val)
    })
    this._interval()
  },
  computed: {
    ...mapGetters(['statusMessage', 'sendtype', 'wstype']),
    userId () {
      return this.$store.state.user.userId || ''
    }
    // statusMessage () {
    //   return this.$store.state.zj.statusMessage || 0
    // }

  },
  methods: {
    ...mapMutations({setstatusmessage: 'SET_STATUSMESSAGE', setwstype: 'SET_WSTYPE'}),
    websockets () {
      if (!this.userId) {
        this.$router.push('login')
        return
      }

      websocket = new WebSocket(wsurl + '?uid=' + this.userId + '&type=app')

      websocket.onopen = () => {
        this._status(websocket.readyState, 'open')
        this.$bus.emit('open', true)
      }
      websocket.onmessage = (e) => {
        this._status(websocket.readyState, 'onmessage', e.data)
        if (e.data) {
          console.log('2++', e.data)
          this.onmessage(e.data)
        }
      }
    },
    _interval () {
      setInterval(() => {
        if (!websocket || !websocket.readyState || websocket.readyState > 1) {
          // this.$vux.toast.text('网络异常...', 'middle')
          console.log('断网了，正在重连。。。')
          this.websockets()
        } else {
          console.log('我已经连上了，没有请求websockty,但停不下来。。。')
        }
      }, 30000)
    },
    onmessage (msg) {
      if (msg) {
        // 组成消息存到数据库里面
        let data = JSON.parse(msg)
        if (typeof (data.bodies[0].msg) === 'string') {
          let json = JSON.parse(data.bodies[0].msg)
          if (json.fileType && json.fileType === 'img') {
            data.bodies[0].msg = JSON.parse(data.bodies[0].msg)
          }
        }
        // 接收做修理
        this.addDataMsg = {
          flag: 1,
          msg: (data.bodies[0].msg.fileType === 'img') ? decodeUnicode(data.bodies[0].msg.url) : data.bodies[0].msg,
          contentType: (data.bodies[0].msg.fileType === 'img') ? data.bodies[0].msg.fileType : data.bodies[0].type,
          time: data.ext.time,
          timeType: data.ext.timeType,
          oncId: data.to, // cid 发过来的时候对方
          onuserId: data.from // userId 发过来的时候我方
        }
        this.$route.path === '/communication' ? this.setstatusmessage(false) : this.setstatusmessage(true)
        this._addData(
          this.addDataMsg.onuserId,
          this.addDataMsg.oncId,
          this.addDataMsg,
          this.statusMessage,
          msg
        )
      }
    },
    // 数据库存储(是当前用户)
    _addData (onMsgCid, onMsgUserId, list, status, msg) {
      let countId = onMsgCid + '&' + onMsgUserId
      list.countId = countId
      openDB((type, flag) => {
        console.log(type, flag, 'wocao')
        if (type !== config.errorCode.open && flag) {
          addData(list, status, countId, data => {
            if (data !== config.errorCode.add) {
              console.log('数据添加成功_addData')
              // 判断是不是当前的登录用户
              this.$route.path === '/communication' && this.$bus.emit('communicationmessage', true)
              this.$bus.emit('immediatemessage', msg)
              // this._getindexDBs('minxsocket')
            }
          })
        }
      })
    },
    _sends (value) {
      if (!value) return
      if (!websocket || !websocket.readyState || websocket.readyState > 1) {
        this.$vux.toast.text('网络异常...', 'middle')
        this.websockets()
        return
      }
      websocket.send(value)
      console.log('发送成功')
    },
    closews () {
      if (!websocket.readyState || websocket.readyState > 1) {
        this._status(websocket.readyState, 'close', '连接关闭')
        return
      }
      websocket.close()
      this._status(websocket.readyState, 'close', '连接关闭2')
    },
    // 状态检测
    _status (types, data, flag) {
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
  },
  mounted () {
    this.$bus.on('sendcontent', val => {
      console.log('sendcontent', val)
      this._sends(val)
    })
    this.$bus.on('close', val => {
      console.log('close', val)
      this.closews()
    })
  },
  beforeDestroy () {
    this.$bus.off('sendcontent')
    this.$bus.off('close', this.statusMessage = 0)
    // window.clearInterval(this.interval)
    // this._interval(true)
    // this.$bus.off('communicationmessage', this.statusMessage = 0)
    this.$bus.off('immediatemessage', this.statusMessage = 0)
  },

  watch: {
    // statusMessage (newval) {
    //   this.statusMessage = newval || 0
    // }
  }
}
