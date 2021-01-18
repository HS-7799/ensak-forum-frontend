import axios from 'axios'
import AuthHeader from '../services/auth-header'


const API_URL = 'http://localhost:8080/api'

const state = {
    companies : [],
    id : null,
    isGettingCompanies : false,
}

const getters = {

    getCompanies(state)
    {
        return state.companies;
    },

    getCompanyId(state)
    {
        return state.id;
    },

    isGettingCompanies(state)
    {
        return state.isGettingCompanies
    }

}

const mutations = {

    setCompanies(state,companies)
    {
        state.companies = companies;
    },

    setCompanyId(state,id)
    {
        state.id = id
    },

    removeCompany(state,item)
    {
        state.companies.splice(state.companies.indexOf(item),1)
    },

    switchIsGettingCompanies(state,value)
    {
        state.isGettingCompanies = value
    }

}

const actions = {

    getCompanies({commit})
    {
        commit('switchIsGettingCompanies',true)
        axios.get(API_URL + '/companies',{headers : AuthHeader()})
        .then((res) => {
            commit('switchIsGettingCompanies',false)
            commit("setCompanies",res.data)
        }).catch((err) => {
            commit('switchIsGettingCompanies',false)
            console.log(err.response.data);
        });
    },

    setCompanyId({commit},id)
    {
        commit("setCompanyId",id)
    },

    deleteCompany({commit},item)
    {
        axios.delete(API_URL + `/companies/${item.id}`,{headers : AuthHeader()})
        .then(() => {
            commit("removeCompany",item)
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