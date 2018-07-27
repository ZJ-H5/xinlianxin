
import {config, openDB, getAll} from 'api/sqls'
import {queryUsercontro} from 'api/fiction'

export const fictionMixin = {
  data () {
    return {
      typein: [],
      immeList: [],
      list: [],
      statusCount: 0
    }
  },
  created () {
    // let option = this.$options.doNotInit
    // if (option) {
    //   this._getindexDBs()
    // }
  },
  computed: {
    myinformation () {
      return (typeof (this.$store.state.user.loginData) === 'string') ? JSON.parse(this.$store.state.user.loginData) : this.$store.state.user.loginData
    }
  },
  methods: {
    imgError (item) {
      item.information.pic = require('@/common/image/defaultkf.jpg')
    },
    _getindexDBs (name) {
      console.log('我是被渲染的')
      // 取数据cid(单条)
      setTimeout(() => {
        openDB((type, flag) => {
          if (type !== config.errorCode.open && flag) {
            getAll(config.tableName, (data) => {
              this.list = []
              this.typein = []
              this.statusCount = 0
              if (data && data.length > 0) {
                let res = new Map()
                data = data.filter((a) => !res.has(a.countId) && res.set(a.countId, 1))
                data.forEach((item, index) => {
                  if (item.list && item.list.length > 0) {
                    let countId = item.countId.substr(item.countId.indexOf('&') + 1)
                    let cid = item.countId.substr(0, item.countId.indexOf('&'))
                    item.cid = cid
                    item.countId = countId
                    item.information = ''
                    this.statusCount += parseInt(item.statusMessage)
                    // 我方跟人聊天 我在右
                    if (countId === this.myinformation.userId) {
                      this.typein.push(JSON.parse(cid))
                      this.list.push(item)
                    }
                  }
                })
                this.typein.length > 0 && this._queryUsercontro()
              }
              this.$bus.emit('tabmessage', this.statusCount)
              this.$bus.emit('other', this.statusCount)
            })
          }
        })
      }, 200)
    },
    _queryUsercontro () {
      // 去重

      this.typein = Array.from(new Set(this.typein))
      queryUsercontro({typein: this.typein.join(',')})
        .then((res) => {
          if (res && res.length > 0) {
            res.forEach((item, index) => {
              let id = item.id.toString()
              this.list.forEach((list, ind) => {
                id === list.cid && this.$set(list, 'information', item)
              })
            })
            this.immeList = this.list
          }
        }).catch((error) => {
          this.$vux.toast.text(error.msg, 'middle')
        })
    }
  }

}
