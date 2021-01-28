import axios from 'axios'
import AuthHeader from '../services/auth-header'


const state = {
    students : [],
    id : null,
    isGettingStudents : false,
}

const getters = {

    getStudents(state)
    {
        return state.students;
    },

    isGettingStudents(state)
    {
        return state.isGettingStudents
    },

    getStudentId(state)
    {
        return state.id
    }

}

const mutations = {

    setStudents(state,students)
    {
        state.students = students;
    },

    removeStudent(state,item)
    {
        state.students.splice(state.students.indexOf(item),1)
    },

    switchIsGettingStudents(state,value)
    {
        state.isGettingStudents = value
    },

    setStudentId(state,id)
    {
        state.id = id;
    }

}

const actions = {

    getStudents({commit})
    {
        commit('switchIsGettingStudents',true)
      axios.get('/api/students')
      .then((res) => {
        commit('switchIsGettingStudents',false)
        commit("setStudents",res.data)
      }).catch((err) => {
        commit('switchIsGettingStudents',false)
        console.log(err.response.data);
      });
    },

    setStudentId({commit},id)
    {
        commit("setStudentId",id)
    },

    deleteStudent({commit},item)
    {
        axios.delete(`/api/students/${item.id}`,{headers : AuthHeader()})
        .then(() => {
            commit("removeStudent",item)
        }).catch((err) => {
          console.log(err.data);
        });
    }

}

export default {
    state,
    getters,
    mutations,
    actions
}