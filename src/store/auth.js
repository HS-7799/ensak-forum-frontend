import User from '../Helpers/User'

const state = {
    id : null,
    username : null,
    name: null,
    roles : [],
    email : null,
    isLoggedIn : false

}

const getters = {

    getId(state)
    {
        return state.id;
    },
    getUserName(state)
    {
        return state.username
    },
    getName(state)
    {
        return state.name
    },
    getEmail(state)
    {
        return state.email
    },
    getRoles(state)
    {
        return state.roles
    },
    getLoggedIn(state)
    {
        return state.username ?  state.isLoggedIn && User.loggedIn(state.username) : state.isLoggedIn
    },
    getInitials(state)
    {
        let initials = "";
        let i;
        let names = state.name.split(' ');
        for(i = 0;i<names.length;i++)
        {
            initials += names[i].charAt(i)
        }
        return initials;
    }

}

const mutations = {

    setId(state,id)
    {
        state.id = id
    },
    setName(state,name)
    {
        state.name = name
    },
    setUserName(state,username)
    {
        state.username = username
    },
    setEmail(state,email)
    {
        state.email = email
    },
    setRoles(state,roles)
    {
        state.roles = roles
    },
    setLoggedIn(state,loggedIn)
    {
        state.isLoggedIn = loggedIn
    }

}

const actions = {

    setUser({commit},user)
    {
        commit('setId',user.id)
        commit('setName',user.name)
        commit('setUserName',user.username)
        commit('setEmail',user.email)
        commit('setRoles',user.roles)
        const a = User.loggedIn(user.username)
        commit('setLoggedIn',a)
    }

}

export default {
    state,
    getters,
    mutations,
    actions
}