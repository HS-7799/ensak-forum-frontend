<template>
  <div>
    <div class="text-center spinner" v-if="!profileIsHere" >
      <v-progress-circular color="primary" class="loader" :size="70" indeterminate ></v-progress-circular>
    </div>
    <v-card class="mx-auto mt-2" max-width="1150" tile>
      <v-img height="200" src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"></v-img>
      <v-row style="margin:2.5%;position:absolute; top: 130px">

            <v-list-item>
              <v-list-item-avatar size="100">
                  <img
                    src="https://www.w3schools.com/howto/img_avatar.png"
                    :alt="name"
                  >
              </v-list-item-avatar>
              <v-list-item-content style="margin-top:40px">
                  <v-list-item-title class="title">
                    {{ name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <span v-if="roles.includes('ROLE_ETUDIANT')" >
                      Student
                    </span>
                    <span v-else-if="roles.includes('ROLE_ENTREPRISE')" >
                      Company
                    </span>
                    <span v-else >
                      Admin
                    </span>
                  </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
      </v-row>
  </v-card>
  <v-container style="margin-top:60px" >
      <v-row  >
        <v-col cols="12">
          <v-card tile >
            <v-card-title>
              Email
            </v-card-title>
            <v-card-text>
              {{ email }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
  </v-container>
  </div>
</template>
<script>
import axios from 'axios'
import AuthHeader from '../services/auth-header.js'
import User from '../Helpers/User'
export default {
  name: 'Profile',
  data()
  {
    return {
      profileIsHere : false,
      id : null,
      name : null,
      email : null,
      roles : []
    }
  },
  created()
  {
    if(!this.$store.getters.getLoggedIn)
    {
      this.$router.push({name : 'Login'})
    }

    axios.get('/api/auth/profile',{ headers : AuthHeader() })
    .then((res) => {
      const user = {
          id : res.data.id,
          name : res.data.name,
          username : res.data.username,
          roles : null,
          email : res.data.email
      }

      this.name = res.data.name
      this.email = res.data.email

      user.roles = res.data.roles.map(role => {
        return role.name
      })
      this.$store.dispatch('setUser',user)
      this.id = res.data.id
      this.roles = user.roles
      if(res.data.student !== null && user.roles.includes('ROLE_ETUDIANT'))
      {
        this.$store.dispatch("setStudentId",res.data.student)
        this.$router.push({name : 'Student' , params : { id : res.data.student }})
      }
      if(res.data.company !== null && user.roles.includes('ROLE_ENTREPRISE'))
      {
        this.$store.dispatch("setCompanyId",res.data.company)
        this.$router.push({name : 'Company' , params : { id : res.data.company }})
      }
      this.profileIsHere = true
    }).catch((err) => {
      if(err.response.status === 500)
      {
        User.clear()
      }
      
    });

  }
  
};
</script>


<style>
.spinner
{
 position: absolute;
 top : 0;
 bottom: 0;
 left: 0;
 right: 0;
 z-index: 10;
 background-color: white;
}
.spinner .loader
{
  margin: auto;
  top: 30%;
}
</style>