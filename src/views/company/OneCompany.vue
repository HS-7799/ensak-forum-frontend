<template>
  <div>
    <v-card class="mx-auto mt-2" max-width="1150" tile>
      <v-img height="200" src="@/assets/company_bg.jpg"></v-img>
      <v-row style="margin:2.5%;position:absolute; top: 130px">

            <v-list-item>
              <v-list-item-avatar size="100">
                  <img
                    src="@/assets/student_avatar.png"
                    alt="John"
                  >
              </v-list-item-avatar>
              <v-list-item-content style="margin-top:40px">
                  <v-list-item-title class="title">
                    {{ user.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                      Company
                  </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
      </v-row>
  </v-card>
  <v-container style="margin-top:60px" >
    <v-row class="mx-auto " max-width="1000"  >
        <v-col cols="12" >
          <v-card tile >
            <v-card-title>
              Description
            </v-card-title>
            <v-card-text>
              {{description}}
            </v-card-text>
          </v-card>
        </v-col>
          
      </v-row>
      <v-row class="mx-auto " max-width="1000"  >
        <v-col cols="12" md="4" >
          <v-card tile >
            <v-card-title>
              Email
            </v-card-title>
            <v-card-text>
              {{ user.email }}
            </v-card-text>
          </v-card>
          
          <v-card tile >
            <v-card-title>
              Activity area
            </v-card-title>
            <v-card-text>
              {{ activityarea }}
            </v-card-text>
          </v-card>
          <v-card tile >
            <v-card-title>
              Address
            </v-card-title>
            <v-card-text>
              {{ address }}
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="8" >
          <h3>My posts</h3>
          <app-carousel-posts :posts="posts" v-if="posts.length > 0" ></app-carousel-posts>
          <h4 v-else >No posts available</h4>
        </v-col>
      </v-row>
  </v-container>
  </div>
</template>
<script>
import AuthHeader from '../../services/auth-header';
import axios from 'axios'
import CarouselPosts from '../../components/CarouselPosts.vue'
export default {
  name: 'Company',
  data()
  {
    return {
      posts : [],
      user : {
        name : null,
        email : null
      },
      activityarea : null,
      description : null,
      address:null,
      logo : null,
    }
  },
  created()
  {
    if(!this.$store.getters.getLoggedIn)
    {
      this.$router.push({name : 'Login'})
    }

    

    axios.get(`/api/companies/${this.$route.params.id}` , { headers : AuthHeader() })
    .then((res) => {
      this.user = res.data.user
      this.activityarea = res.data.activityarea.label
      this.description = res.data.description
      this.address = res.data.address
    }).catch((err) => {
      if(err.response.status === 404)
      {
        this.$router.push('/notFound')
      }
    });

    axios.get(`/api/companies/${this.$route.params.id}/posts`,{headers : AuthHeader()})
    .then((res) => {
      this.posts = res.data
    })
  },
  components : {
    appCarouselPosts : CarouselPosts
  }
  
}
</script>