import axios from 'axios'
import authHeader from '../services/auth-header';


const API_URL = 'http://localhost:8080/api'

const state = {
    levels : [],
}

const getters = {

    getLevels(state)
    {
        return state.levels;
    }

}

const mutations = {

    setLevels(state,levels)
    {
        state.levels = levels;
    }

}

const actions = {

    getLevels({commit})
    {
       
      axios.get(API_URL + '/levels',{ headers : authHeader() })
      .then((res) => {
        commit("setLevels",res.data)
      }).catch((err) => {
        console.log(err.response.data);
      });
    }

}

export default {
    state,
    getters,
    mutations,
    actions
}