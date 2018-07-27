import Vue from 'vue'
import './alertindex.css'
import './index.css'
import store from '@/store'
import router from '@/router'

const root = window.document.body

export default function Alert (config) {
  const wrap = document.createElement('div')
  const div = document.createElement('div')

  root.appendChild(wrap)
  wrap.appendChild(div)

  config = config || {}

  return new Promise(resolve => new Vue({
    el: div,
    data: {
      title: config.title || '',
      content: config.content || '',
      closebtn: config.close || '取消',
      submitbtn: config.submit || '确定',
      flag: config.flag || false,
      closeflag: !!config.closeflag
    },
    computed: {
      login () {
        return store.state.zj.login
      }
    },
    watch: {
      login: function (newval) {
        newval && this.setlogin(false)
        store.commit('SET_LOGIN', false)
      }
    },
    methods: {
      submit () {
        root.removeChild(wrap)
        this.flag && router.push({name: 'login'})
        store.commit('SET_LOGIN', false)
        resolve(true)
      },
      close () {
        root.removeChild(wrap)
        this.closeflag && this.flag && router.push('/')
        store.commit('SET_LOGIN', false)
        resolve(false)
      }
    },
    template: `
      <div class="wind-alert">
        <div class="wind-alert-bg"></div>
        <div class="wind-alert-dialog animate-scale">
          <div class="wind-alert-title">{{title}}</div>
          <div class="wind-alert-content">{{content}}</div>
          <div class="wind-confirm-btns" >
            <div class="wind-confirm-btn" @click="close">{{closebtn}}</div>
            <div class="wind-confirm-btn" @click="submit">{{submitbtn}}</div>
          </div>
        </div>
      </div>
    `
  }))
}
