<template>
  <v-card
    max-width="700"
    class="mb-1"
  >
    
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <h2 >Personnal informations</h2>
          <v-alert type="error" v-if="errors.length > 0" >
            <ul v-for="error in errors" :key="error" >
              <li>{{ error }}</li>
            </ul>
          </v-alert>
          <v-form
            @submit.prevent="submit"
            ref="form"
            v-model="valid"
            >
                <v-text-field
                v-model="name"
                :counter="20"
                :rules="nameRules"
                label="Name"
                required
                ></v-text-field>

                <v-text-field
                v-model="email"
                type="email"
                :rules="emailRules"
                label="E-mail"
                required
                ></v-text-field>

            

                <v-btn
                :loading="isLoading"
                :disabled="!valid"
                color="primary"
                class="mr-4"
                @click="submit"
                >
                Update
                </v-btn>

            </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import axios from 'axios'
import AuthHeader from '../services/auth-header';
export default {

    props : ['userId','userInfo'],
    data: () => ({
      isLoading : false,
      valid: true,
      name: '',
      email: '',
      errors : [],
    //   rules
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 30 characters',
        v => (v && v.length >= 6) || 'Name must be more than 6 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      
    }),
    created()
    {
        this.name = this.userInfo.name
        this.email = this.userInfo.email
    },
    methods : {
        submit()
        {
          const form = {
            name : this.name,
            email : this.email

          }
          this.isLoading=true
          axios.put(`/api/auth/profile/update/${this.userId}` ,form,{headers : AuthHeader()})
            .then(() => {
              this.$store.dispatch('setName',this.name)
              this.$store.dispatch('setEmail',this.email)
              this.isLoading = false
              this.$store.dispatch('setShowSnack',true)
              this.$store.dispatch('setSnackMessage','Informations are updated successfully')
            })
            .catch(() => {
              this.isLoading = false
            });
        }
    }



}
</script>

<style>

</style>