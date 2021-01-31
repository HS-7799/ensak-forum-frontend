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
    snackMessage : '',
    colorSnack : 'success'
  },
  getters : {
    getShowSnackbar(state)
    {
      return state.showSnack
    },
    getSnackMessage(state)
    {
      return state.snackMessage
    },
    getColorSnack(state)
    {
      return state.colorSnack
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
    },
    setSnackColor(state,value)
    {
      state.colorSnack = value
    },
  },
  actions: {
    setShowSnack({commit},value)
    {
      commit('setShowSnack',value)
      setTimeout(function(){
        commit('setShowSnack',!value)
      },2500)
    },
    setSnackMessage({commit},value)
    {
      commit('setSnackMessage',value)
    },
    setSnackColor({commit},value)
    {
      commit('setSnackColor',value)
      setTimeout(function(){
        commit('setSnackColor','success')
      },2500)
    },
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
