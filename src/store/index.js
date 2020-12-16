import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

import auth from './auth'
import level from './level'
import speciality from './speciality'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters : {

  },
  mutations: {
  },
  actions: {
  },
  modules : {
    auth,
    level,
    speciality
  },
  plugins: [createPersistedState()]
})
