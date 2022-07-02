import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: {},
    SearchHistery: []
  },
  getters: {
  },
  mutations: {
    setuser (state, payload) {
      state.users = payload
    },
    setSearchHistery (state, payload) {
      let arr = state.SearchHistery
      arr.unshift(payload)
      arr = [...new Set(arr)]
      state.SearchHistery = arr
    },
    delHistery (state, payload) {
      state.SearchHistery.splice(payload, 1)
    },
    delAllHistery (state) {
      state.SearchHistery = []
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
