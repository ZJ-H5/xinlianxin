import Vue from 'vue'
import 'babel-polyfill'
import Vuex from 'vuex'
import tagsView from './modules/tagsView'
import getters from './getters'
import jm from './modules/jm'
import zj from './modules/zj'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    tagsView,
    jm,
    zj,
    user
  },
  getters
})

export default store
