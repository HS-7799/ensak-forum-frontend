<template>
  <v-card max-width="450" min-height="250px" class="mx-auto mt-16" >
    
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <h2 style="text-align:center" >LOGIN</h2>
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
                v-model="username"
                :counter="20"
                :rules="userNameRules"
                label="Username"
                prepend-icon="mdi-account"
                required
                ></v-text-field>

                <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="Password"
                :type="showPassword ? 'text' : 'password'"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                required>
                </v-text-field>

                <v-btn
                tile
                block
                :loading="isLoading"
                :disabled="!valid"
                color="primary"
                class="mr-4"
                @click="submit"
                >
                Login
                </v-btn>

            </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import {mapGetters} from 'vuex'
import axios from 'axios'
 import User from '../Helpers/User'
  export default {
    data: () => ({
      isLoading : false,
      errors : {
        message : null
      },
      valid: true,
      username: '',
      password : '',
      userNameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length <= 20) || 'Username must be less than 20 characters',
      ],
      showPassword : false,
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >=6) || 'Password must be more than 6 characters',
      ],    
    }),

    created()
    {
      if(this.getLoggedIn)
      {
        this.$router.push({name : 'Profile'})
      }
    },
    computed :{
      ...mapGetters([
        'getLoggedIn'
      ])

    },
    methods: {
      submit() {

        if(this.username && this.password)
        {
          this.isLoading = true
          this.errors = []
          this.$Progress.start();
          const API_URL = "http://localhost:8080/api/auth/"
        
          const form = {
            username : this.username,
            password : this.password
          }

          axios.post(API_URL + 'signin',form)
          .then((res) => {
                this.$Progress.finish();
                this.errors = null
                const user = {
                  id : res.data.id,
                  name : res.data.name,
                  username : res.data.username,
                  roles : res.data.roles,
                  email : res.data.email
                }
                this.isLoading = !this.isLoading
                User.responseAfterLogin(res,this.username);
                this.$store.dispatch('setUser',user)
                this.$router.push({name : 'Profile'})
          }).catch((err) => {
              if(err.response.data.details === "")
              {
                this.errors.push("Bad credentials")
              }
              else
              {
                this.errors = err.response.data.details.split(',')
                this.errors.pop();
              }
              this.isLoading = !this.isLoading
              this.$Progress.fail();
              this.password = ''
          });
          
        }
        
      },
    },
  }
</script>
