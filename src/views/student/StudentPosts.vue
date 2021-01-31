<template>
  <div class="row">
    <div class="text-center spinner" v-if="waitingRes" >
      <v-progress-circular color="primary" class="loader" :size="70" indeterminate ></v-progress-circular>
    </div>
    <v-col cols="8" class="mx-auto" >
      <template v-if="posts.length > 0" >
              <app-single-post v-for="post in posts" :key="post.id" :post="post" ></app-single-post>
      </template>
      <template v-else>
        <v-card width="50%" class="mx-auto mt-6" >
          <v-card-title>
              <span>You did not apply for any job!</span>
              <v-btn color="primary" text to="/posts"  >
                  Search job
              </v-btn>
          </v-card-title>
         
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
        posts : [],
        waitingRes : true
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
                this.waitingRes = false
            }
            catch(err)
            {
                this.waitingRes = false
                if(err.response.status == 400 && this.$store.getters.getStudentId == null )
                {
                    this.$store.dispatch('setShowSnack',true)
                    this.$store.dispatch('setSnackColor','error')
                    this.$store.dispatch('setSnackMessage','Please complete you registration')
                }
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