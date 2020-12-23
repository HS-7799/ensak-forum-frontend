import axios from 'axios'


const API_URL = 'http://localhost:8080/api'

const state = {
    students : [],
}

const getters = {

    getStudents(state)
    {
        return state.students;
    }

}

const mutations = {

    setStudents(state,students)
    {
        state.students = students;
    }

}

const actions = {

    getStudents({commit})
    {
       
      axios.get(API_URL + '/students')
      .then((res) => {
        commit("setStudents",res.data)
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