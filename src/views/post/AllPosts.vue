<template>
  <v-container>
      <app-add-post v-if="canAddPosts" ></app-add-post>
      <h1>Posts</h1>
      <template v-if="posts.length > 0" >
          <v-row>
            <v-col cols="12" md="8">
              <app-single-post v-for="post in posts" :key="post.id" :post="post" ></app-single-post>
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