<template>
    
    <v-container>
      <v-row>
        <v-col cols="12" md="6" >
            <app-edit-user-informations v-if="userInfo.name !== '' " :userId="userId" :userInfo="userInfo" ></app-edit-user-informations>
            <app-edit-password :userId="userId" ></app-edit-password>
        </v-col>
        <v-col cols="12" md="6" v-if="roles.includes('ROLE_ENTREPRISE')">
          <app-edit-company-informations :id="id" :userId="userId" ></app-edit-company-informations>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import axios from 'axios'
import AuthHeader from '../../../services/auth-header.js'
import EditUserInformations from '../../../components/EditUserInformations'
import EditPassword from '../../../components/EditPassword'
import EditCompanyInformations from '../../../components/EditCompanyInformations'
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
        axios.get(`/api/companies/${this.$route.params.id}`,{headers : AuthHeader()})
        .then((res) => {
            this.id = res.data.id
            this.userId = res.data.user.id
            this.roles = res.data.user.roles.map(role => {
                return role.name
            })
            this.userInfo = 
            {
                name : res.data.user.name,
                username : res.data.user.username,
                email : res.data.user.email
            }
            
        }).catch((err) => {
        if(err.response.status === 404)
        {
            this.$router.push('/notFound')
        }
        });
    },
    components : {
    appEditUserInformations : EditUserInformations,
    appEditPassword : EditPassword,
    appEditCompanyInformations : EditCompanyInformations,
  }
}
</script>

<style>

</style>