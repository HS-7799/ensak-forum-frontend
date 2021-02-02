import axios from 'axios'
import authHeader from '../services/auth-header'



const state = {
    messages : [],
    selectedMessage : null
}

const getters = {

    getMessages(state)
    {
        return state.messages;
    },
    getSelectedMessage(state)
    {
        return state.selectedMessage
    }

}

const mutations = {

    setMessages(state,messages)
    {
        state.messages = messages;
    },

    setSelectedMessage(state,message)
    {
        state.selectedMessage = message;
    },
    
    removeMessage(state,message)
    {
        state.messages.splice(state.messages.indexOf(message),1)
    },

    editMessages(state,payload)
    {
        state.messages[state.messages.indexOf(payload.message)] = payload.newMessage
    }

}

const actions = {


    setSelectedMessage({commit},message)
    {
        commit('setSelectedMessage',message)
    },

    getMessages({commit},url)
    {
        axios.get(url,{headers : authHeader()})
        .then((res) => {
            commit('setMessages',res.data)
            commit('setSelectedMessage',res.data[0])
        })
    },

    EditMessage({commit},payload)
    {
        
        return axios.put(`/api/messages/${payload.message.id}`,payload.form,{headers : authHeader()})
        .then((res) => {
            commit("editMessages",{
                message : payload.message,
                newMessage : res.data
            })
            commit('setSelectedMessage',res.data)
        })
        
    },
    
    deleteMessage({commit},message)
    {
        return axios.delete(`/api/messages/${message.id}`,{headers : authHeader()})
        .then(() => {
            commit("removeMessage",message)
            commit("setSelectedMessage", null)
        })
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}