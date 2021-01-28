import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

import auth from './auth'
import level from './level'
import speciality from './speciality'
import activities from './activities'
import student from './student'
import company from './company'
import post from './post'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showSnack : false,
    snackMessage : ''
  },
  getters : {
    getShowSnackbar(state)
    {
      return state.showSnack
    },
    getSnackMessage(state)
    {
      return state.snackMessage
    }
  },
  mutations: {
    setShowSnack(state,value)
    {
      state.showSnack = value
    },
    setSnackMessage(state,value)
    {
      state.snackMessage = value
    }
  },
  actions: {
    setShowSnack({commit},value)
    {
      commit('setShowSnack',value)
      setTimeout(function(){
        commit('setShowSnack',!value)
      },2001)
    },
    setSnackMessage({commit},value)
    {
      commit('setSnackMessage',value)
    }
  },
  modules : {
    auth,
    level,
    speciality,
    student,
    company,
    activities,
    post
  },
  plugins: [createPersistedState()]
})
