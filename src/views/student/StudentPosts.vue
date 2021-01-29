<template>
  <div class="row">
    <v-col cols="8" class="mx-auto">
      <template v-if="posts.length > 0" >
              <app-single-post v-for="post in posts" :key="post.id" :post="post" ></app-single-post>
      </template>
      <template v-else>
        <v-card width="50%" class="mx-auto mt-6" >
          <v-card-title>
              You did not apply for ny job
          </v-card-title>
          <v-card-actions>
              <v-btn color="primary" to="/posts"  >
                  Search job
              </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-col>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from "vuex";
import authHeader from '../../services/auth-header';
import SinglePost from '../../components/post/SinglePost.vue';
export default {

    data : () => ({
        posts : []
    }),
    created()
    {
        if(!this.$store.getters.getLoggedIn)
            this.$router.push({name : 'Login'})
        else if(!this.roles.includes("ROLE_ETUDIANT") || this.$route.params.id != this.studentId)
            this.$router.push({name : 'Error unauthorized'})
        else 
            this.getJobs()
    },
    computed : 
    {
        ...mapGetters({
            roles : 'getRoles',
            studentId : 'getStudentId',
        }),
    },
    methods : 
    {
        async getJobs()
        {
            try
            {
                const response = await axios.get(`/api/students/${this.$route.params.id}/posts`,{headers : authHeader()})
                this.posts = response.data
            }
            catch(err)
            {
                console.log(err.response);
            }
        }
    },
    components : {
        appSinglePost : SinglePost,
    },

}
</script>

<style>

</style>