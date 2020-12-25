<template>
    <v-container>
      <v-row>
        <v-col cols="12" md="6"  >
            <app-edit-user-informations v-if="userInfo.name !== '' " :userInfo="userInfo" ></app-edit-user-informations>
            <app-edit-password :userId="userId" ></app-edit-password>
        </v-col>
        <v-col cols="12" md="6" v-if="roles.includes('ROLE_ETUDIANT')" >
          <app-edit-student-informations :id="id" :userId="userId" ></app-edit-student-informations>
        </v-col>
        <v-col cols="12" md="6" v-if="roles.includes('ROLE_ENTREPRISE')" >
          <app-edit-company-informations :id="id" ></app-edit-company-informations>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import axios from 'axios'
import AuthHeader from '../services/auth-header.js'
import User from '../Helpers/User'
import EditUserInformations from '../components/EditUserInformations'
import EditPassword from '../components/EditPassword'
import EditStudentInformations from '../components/EditStudentInformations'
import EditCompanyInformations from '../components/EditCompanyInformations'
export default {

  data()
  {
    return {
      roles : [],
      id : null,
      userId : null,
      userInfo : {
        name : '',
        email : '',
        username : ''
      }
    }
  },
  created()
  {
    const API_URL = "http://localhost:8080/api/auth/"
    if(!this.$store.getters.getLoggedIn)
    {
      this.$router.push({name : 'Login'})
    }

    axios.get(API_URL + 'profile',{ headers : AuthHeader() })
    .then((res) => {
      this.userId = res.data.id
        this.id = res.data.student
        this.roles = res.data.roles.map(role => {
          return role.name
        })
        this.userInfo = {
          name : res.data.name,
          username : res.data.username ,
          email : res.data.email
        }
    }).catch((err) => {
      if(err.response.status === 500)
      {
        User.clear()
      }
    });

  },
  components : {
    appEditUserInformations : EditUserInformations,
    appEditPassword : EditPassword,
    appEditStudentInformations : EditStudentInformations,
    appEditCompanyInformations : EditCompanyInformations,
  }
  

}
</script>

<style>

</style>