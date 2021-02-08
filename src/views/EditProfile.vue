<template>
    <div>
      <div id="edit-account-bg" >
        <div id="edit-bannder" >
          <img  src="@/assets/profile_details.svg" width="330px" />
        </div>
        <v-row id="tabs" >
          <v-col cols="12" class="p-0" >
            <v-tabs
              background-color="orange"
              center-active
              dark
            >
            <v-tab @click="selectedCmp = 'appEditUserInformations'" >
              Personnal informations
            </v-tab>
            <v-tab @click="selectedCmp = 'appEditPassword'" >
              Password
            </v-tab>
            <template v-if="roles.includes('ROLE_ETUDIANT')" >
            <v-tab @click="selectedCmp = 'appEditStudentInformations'" >
              Student informations
            </v-tab>
            <v-tab @click="selectedCmp = 'appEditStudentResume'" >
              Upload Resumue
            </v-tab>
            </template>
            <v-tab v-if="roles.includes('ROLE_ENTREPRISE')" @click="selectedCmp = 'appEditCompanyInformations'" >
              Company informations
            </v-tab>
            </v-tabs>
          </v-col>
        </v-row>
        </div>
        <v-row id="forms" >
          <v-col cols="12" >
            <transition name="fade" mode="out-in" >
              <component :is="selectedCmp"
                        v-if="userInfo.name !== '' " 
                        :userInfo="userInfo" :id="id" 
                        :userId="userId" >
              </component>
            </transition>
          </v-col>
        </v-row>
    </div>
</template>

<script>
import axios from 'axios'
import AuthHeader from '../services/auth-header.js'
import User from '../Helpers/User'
import EditUserInformations from '../components/EditUserInformations'
import EditPassword from '../components/EditPassword'
import EditStudentInformations from '../components/EditStudentInformations'
import EditStudentResume from '../components/EditStudentResume'
import EditCompanyInformations from '../components/EditCompanyInformations'
export default {

  data()
  {
    return {
      roles : [],
      selectedCmp : 'appEditUserInformations',
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
    if(!this.$store.getters.getLoggedIn)
    {
      this.$router.push({name : 'Login'})
    }

    axios.get('/api/auth/profile',{ headers : AuthHeader() })
    .then((res) => {
        this.userId = res.data.id
        this.roles = res.data.roles.map(role => {
          return role.name
        })
        if(res.data.student !== null && this.roles.includes('ROLE_ETUDIANT'))
        {
          this.id = res.data.student
        }
        if(res.data.company !== null && this.roles.includes('ROLE_ENTREPRISE'))
        {
          this.id = res.data.company
        }
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
    appEditStudentResume : EditStudentResume,
    appEditCompanyInformations : EditCompanyInformations,
  }
  

}
</script>

<style scoped >

.fade-enter
{
  opacity: 0;
}

.fade-enter-active
{
  transition: opacity .5s;
}

.fade-leave-active
{
  transition: opacity .5s;
  opacity: 0;
}

.fade-leave
{
  opacity: 1;

}

#edit-account-bg
{
  background: linear-gradient(to top,#ff8c00,#ffffff);
  height: 300px;
  position: relative;
}

#tabs
{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

#edit-bannder img
{
  position:absolute;
  right:0;
  bottom:60px
}

#forms
{
  padding: 10px 50px;
  min-height: 450px;
}

</style>