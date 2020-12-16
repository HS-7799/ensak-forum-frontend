import axios from 'axios'
import authHeader from '../services/auth-header';


const API_URL = 'http://localhost:8080/api'

const state = {
    specialities : [],
}

const getters = {

    getSpecialities(state)
    {
        return state.specialities;
    }

}

const mutations = {

    setSpecialities(state,specialities)
    {
        state.specialities = specialities;
    }

}

const actions = {

    getSpecialities({commit})
    {
       
      axios.get(API_URL + '/specialities',{ headers : authHeader() })
      .then((res) => {
        commit("setSpecialities",res.data)
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