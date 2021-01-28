import axios from 'axios'



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
       
      axios.get('/api/specialities')
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