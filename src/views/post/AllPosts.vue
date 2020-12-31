<template>
  <v-container>
      <app-add-post v-if="canAddPosts" ></app-add-post>
      <template v-if="posts.length > 0" >
        <app-single-post v-for="post in posts" :key="post.id" :post="post" ></app-single-post>
      </template>
      <template v-else>
        <div>
          No posts available
        </div>
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