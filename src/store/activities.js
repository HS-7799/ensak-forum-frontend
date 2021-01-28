import axios from 'axios'
import AuthHeader from '../services/auth-header'



const state = {
    activityareas : [],
}

const getters = {

    getActivityareas(state)
    {
        return state.activityareas;
    }

}

const mutations = {

    setActivityareas(state,activityareas)
    {
        state.activityareas = activityareas;
    }

}

const actions = {

    getActivityareas({commit})
    {
       
      axios.get('/api/activityareas',{ headers : AuthHeader() })
      .then((res) => {
        commit("setActivityareas",res.data)
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