<template>
  <v-container>
      <app-add-post v-if="canAddPosts" ></app-add-post>
      
      <h1>Posts</h1>
      <template v-if="posts.length > 0" >
          
          <v-row>
            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-date-picker
                v-model="dates"
                range
              ></v-date-picker>
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <v-text-field
                v-model="dateRangeText"
                label="Date range"
                prepend-icon="mdi-calendar"
                readonly
                outlined
              ></v-text-field>
              <app-single-post v-for="post in filteredPosts" :key="post.id" :post="post" ></app-single-post>
              <p v-if="this.filteredPosts.length == 0" >
                No posts published in this date range
              </p>
            </v-col>
          </v-row>
      </template>
      <template v-else>
        <v-card>
            <v-card-text>
              <div style="text-align:center" >
                <img src="@/assets/posts.png" alt="" width="200px">
                <p>No posts available yet !</p>
              </div>
            </v-card-text>
          </v-card>
      </template>
  </v-container>
</template>

<script>
import AddPost from '../../components/post/AddPost'
import SinglePost from '../../components/post/SinglePost.vue'
import { mapGetters } from 'vuex'
export default {
  
  data()
  {
    return {
      dates : []
    }
  },
  created()
  {
    this.$store.dispatch("getPosts")
  },
  computed : {
    ...mapGetters({
      isLoggedIn : 'getLoggedIn',
      roles : 'getRoles',
      posts : 'getPosts'
    }),
    canAddPosts()
    {
      return this.isLoggedIn && this.roles.includes('ROLE_ENTREPRISE')
    },
    filteredPosts()
    {
      return this.posts.filter(post => {
        if(this.dates.length == 2)
        {
          return (this.formatDate(this.dates[0]) <= this.formatDate(post.createdAt) &&
                 this.formatDate(this.dates[1]) >= this.formatDate(post.createdAt)) || 
                 (this.formatDate(this.dates[0]) >= this.formatDate(post.createdAt) &&
                 this.formatDate(this.dates[1]) <= this.formatDate(post.createdAt))
        }
          return true
      })
    },
    dateRangeText () {
        return this.dates.join(' ~ ')
    },
  },
  methods : {
    formatDate (input) {
      return new Date(input)
    }
  },
  components : {
    appSinglePost : SinglePost,
    appAddPost : AddPost,
  },
  



}
</script>

<style>

</style>