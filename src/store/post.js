import axios from 'axios'
import authHeader from '../services/auth-header'

const API_URL = 'http://localhost:8080/api'


const state = {
    posts : [],
}

const getters = {

    getPosts(state)
    {
        return state.posts;
    }

}

const mutations = {

    setPosts(state,posts)
    {
        state.posts = posts;
    },
    addPost(state,post)
    {
        state.posts.unshift(post)
    },
    removePost(state,post)
    {
        state.posts.splice(state.posts.indexOf(post),1)
    },

}

const actions = {

    getPosts({commit})
    {
       
      axios.get(API_URL + '/posts')
      .then((res) => {
        commit("setPosts",res.data)
      })
    },
    deletePost({commit},post)
    {
        return axios.delete(`http://localhost:8080/api/posts/${post.id}`,{headers : authHeader()})
      .then(() => {
        commit("removePost",post)
      })
      .catch(err => {
          if(err.response.status === 500)
          {
            this.$router.push('/forbidden')

          }
      })
    },

    addPost({commit},post)
    {
        commit("addPost",post)
    },
    removePost({commit},post)
    {
        commit("removePost",post)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}