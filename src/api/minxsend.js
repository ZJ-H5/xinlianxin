import { fileurl, wsurl } from 'api/hosturl'
import { updatefile } from 'common/js/updatefile'
import { openDB, addData, getData, deleteDB } from '@/api/sqls'
import { dateFormat } from 'api/time'
import { queryUsercontro } from 'api/fiction'
import { mapMutations } from 'vuex'
import {encodeUnicode} from 'api/num'
let websocket2 = null
// import {socketMixin} from '@/api/minxsocket'
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
export const sendMinx = {
  // mixins: [socketMixin],
  data () {
    return {
      message: '',
      ishowFile: true,
      // 总数据
      list: {},
      // 截取数据
      showList: [],
      // 图片数据
      filelist: [],
      // 一条onmessae数据
      addDataMsg: {},
      oldtime: '', // 时间间隔
      timecha: 0, // 时间差
      timeType: false,

      statusMessage: 0,

      pageSize: 2,
      pageNumber: 10,
      type: false,
      typelist: [],
      loadingmore: false,
      scrollToEndFlag: false,
      // 对方1左
      cid: this.$route.query.cid, // 对方id
      companyName: this.$route.query.companyName, // 对方名字
      companyImg: this.$route.query.companyImg || '', // 对方头像
      tel: this.$route.query.tel, // 对方电话
      companyId: this.$route.query.companyId // 对方公司id
    }
  },
  created () {
    this.oldtime = new Date()
    this._getindexDB(this.cid, this.userId)
    this.websockets()
    this._adddata()
  },
  mounted () {
    this.$bus.on('communicationmessage', value => {
      this._getindexDB(this.cid, this.userId)
    })
  },
  computed: {
    // 我方2右
    userId () {
      return this.$store.state.user.userId || ''
    },
    myName () {
      return (
        this.$store.state.user.loginData.company ||
        this.$store.state.user.loginData.phone ||
        ''
      )
    },
    myinformation () {
      return typeof this.$store.state.user.loginData === 'string'
        ? JSON.parse(this.$store.state.user.loginData)
        : this.$store.state.user.loginData
    }
  },
  methods: {
    websockets () {
      if (!this.userId) {
        this.$router.push('login')
        return
      }
      websocket2 = new WebSocket(wsurl + '?uid=' + this.userId + '&type=app')
      // console.log(websocket2)
    },
    ...mapMutations({
      setstatusmessage: 'SET_STATUSMESSAGE',
      setsendtype: 'SET_SENDTYPE'
    }),
    // 状态为0
    _adddata () {
      if (this.$route.path === '/communication') {
        this.statusMessage = 0
        let countId = this.cid + '&' + this.userId
        this.setstatusmessage(false)
        addData([], this.statusMessage, countId, data => {
          if (data !== config.errorCode.add) {
            console.log('状态重设为0')
          }
        })
      }
    },

    // 第一次查询
    _getindexDB (cid, userId) {
      console.log('第一次查询getindexeDB')
      let countId = cid + '&' + userId
      openDB((type, flag) => {
        if (type !== config.errorCode.open && flag) {
          getData('', countId, data => {
            if (data !== config.errorCode.get) {
              this.list = data || {}
              // alert('获取' + JSON.stringify(this.list))
              this.list.list = this.list.list || []
              this.list.countId = this.list.cid || countId
              // 重新加载
              if (!this.type) {
                this.typelist = this.list.list
                this.showList = this._getNumber(
                  this.typelist,
                  1,
                  this.pageNumber
                )
                this.type = true
              } else {
                this.showList.push(this.list.list[this.list.list.length - 1])
              }
            }
          })
        }
      })
    },
    // 数据库存储(是当前用户)
    _addData (onMsgCid, onMsgUserId, list, statusMessage) {
      let countId = onMsgCid + '&' + onMsgUserId
      list.countId = countId
      openDB((type, flag) => {
        if (type !== config.errorCode.open && flag) {
          // alert('存储之前' + JSON.stringify(list))
          addData(list, statusMessage, countId, data => {
            if (data !== config.errorCode.add) {
              console.log('数据添加成功_addData')
              this._getindexDB(this.cid, this.userId)
            }
          })
        }
      })
    },
    _sends (value) {
      if (!value) return
      if (!websocket2.readyState || websocket2.readyState > 1) {
        this.$vux.toast.text('网络异常...', 'middle')
        this.websockets()
        return
      }
      websocket2.send(value)
      console.log('发送成功')
      // 发送消息
    },
    sends () {
      if (this.message) {
        // 发送
        let content = this._sendData(this.message, 'txt')
        // this.$bus.emit('sendcontent', content)
        // this.setsendtype(content)
        this._sends(content)
        /** 这里可以做封装 */
        this.addDataMsg = {
          flag: 2,
          msg: this.message,
          contentType: 'txt',
          time: dateFormat(this.oldtime, 'yyyy-MM-dd HH:mm:ss'),
          timeType: this.timeType,
          oncId: this.cid,
          onuserId: this.userId
        }
        // 存到292的数据库
        this.statusMessage = 0

        this._addData(
          this.addDataMsg.oncId,
          this.addDataMsg.onuserId,
          this.addDataMsg,
          this.statusMessage
        )
        // setTimeout(() => {
        //   this._getindexDB(this.cid, this.userId)
        // }, 30)

        /** 这里可以做封装 */
      }
      this.message = ''
    },
    // 发送图片
    getFile (e) {
      this.filelist = []
      let formData = updatefile(e)
      this.ishowFile = false
      this.$http
        .post(fileurl, formData)
        .then(res => {
          let array = res.data.data.split(',')
          if (array.length > 0) {
            for (var i = 0; i < array.length; i++) {
              this.filelist.push(array[i])
              if (this.filelist && this.filelist.length > 0) {
                console.log(array[i])
                let content = this._sendData(array[i], 'img')
                // this.$bus.emit('sendcontent', content)
                this._sends(content)
                /** 这里可以做封装 */
                this.addDataMsg = {
                  flag: 2,
                  msg: array[i],
                  contentType: 'img',
                  time: dateFormat(this.oldtime, 'yyyy-MM-dd HH:mm:ss'),
                  timeType: this.timeType,
                  oncId: this.cid,
                  onuserId: this.userId
                }

                // 先存
                this.statusMessage = 0
                // setTimeout(() => {
                //   this._getindexDB(this.cid, this.userId)
                // }, 100)
                this._addData(
                  this.addDataMsg.oncId,
                  this.addDataMsg.onuserId,
                  this.addDataMsg,
                  this.statusMessage
                )
                this.ishowFile = true
                /** 这里可以做封装 */
              }
            }
          }
        })
        .catch(err => {
          this.$vux.toast.text(err, 'middle')
        })
    },

    _onopensend () {
      // 判断是谁
      if (!this.type) {
        queryUsercontro({ typein: this.cid })
          .then(res => {
            if (res && res.length > 0) {
              // 如果他是个卖家
              if (res[0].open_seller !== '0') {
                let message = '请问你需要什么帮助吗？'
                let content = this._sendData(message, 'txt')
                this._sends(content)
                // this.$bus.emit('sendcontent', content)
                /** 这里可以做封装 */
                this.addDataMsg = {
                  flag: 1,
                  msg: message,
                  contentType: 'txt',
                  time: dateFormat(this.oldtime, 'yyyy-MM-dd HH:mm:ss'),
                  timeType: this.timeType,
                  oncId: this.cid,
                  onuserId: this.userId
                }
                setTimeout(() => {
                  this._getindexDB(this.cid, this.userId)
                }, 100)
                // 存到292的数据库
                this._addData(
                  this.addDataMsg.oncId,
                  this.addDataMsg.onuserId,
                  this.addDataMsg,
                  this.statusMessage
                )
              }
            }
          })
          .catch(error => {
            this.$vux.toast.text(error.msg, 'middle')
          })
      }
    },
    deleDB (name) {
      let countId = this.cid + '&' + this.userId
      deleteDB(countId, (data) => {
        if (data === config.errorCode.ok) {
          this.statusMessage = 0
          this.$vux.toast.text('删除' + name + '成功！', 'middle')
          this.$router.back()
        }
      })
    },

    // 消息装载
    _sendData (message, type) {
      this.oldtime = new Date()
      this.timeType = this.timecha > 30

      let json = {
        from: this.userId, // 我的id
        userName: this.myName, // 我的名字
        to: this.cid, // 卖家id
        sellUserId: this.cid, // 谁是卖家的id
        bodies: [
          {
            type: 'txt',
            msg:
              type === 'txt'
                ? message
                : JSON.stringify({ url: encodeUnicode(message), fileType: type, fileName: '' })
          }
        ],
        ext: {
          time: dateFormat(this.oldtime, 'yyyy-MM-dd HH:mm:ss'),
          timeType: this.timeType
        }
      }
      let datas = {
        auId: this.cid, // 对方id
        message: JSON.stringify(json)
      }
      return JSON.stringify(datas)
    },

    // 分页
    _getNumber (list, page, number) {
      let length = list.length
      let maxlength = length - (page - 1) * number
      let minlength = maxlength - number
      maxlength = maxlength <= 0 ? 0 : maxlength
      minlength = minlength <= 0 ? 0 : minlength
      let Newlist = list.slice(minlength, maxlength)
      return Newlist
    }
  },
  beforeDestroy () {
    // this.$bus.off('send', this.statusMessage = 0)
    this.$bus.off('communicationmessage', (this.statusMessage = 0))
  }
}
