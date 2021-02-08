<template>
  <div id="login-bg" >
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" >
          <v-img src="@/assets/login/sign_in.svg" />
        </v-col>
        <v-col cols="12" sm="6" >
          <v-card max-width="450" min-height="400px" style="box-shadow:none" class="ml-auto mt-3 mr-6" >
            <v-container>
              <v-row dense>
                <v-col cols="12">
                  <h2 style="text-align:center" >
                    <span id="login" >LOGIN</span>
                  </h2>
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
                        class="my-3"
                        v-model="username"
                        :counter="20"
                        :rules="userNameRules"
                        label="Username"
                        prepend-icon="mdi-account"
                        required
                        ></v-text-field>

                        <v-text-field
                        class="my-3"
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
                        color="#6c63ff"
                        class="my-3 mr-4"
                        @click="submit"
                        >
                        Login
                        </v-btn>
                        Need an account ? <router-link style="text-decoration:none" color="primary" to="/register" >register</router-link>

                    </v-form>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
  </v-container>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import axios from 'axios'
 import User from '../../Helpers/User'
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
        
          const form = {
            username : this.username,
            password : this.password
          }

          axios.post("/api/auth/signin",form)
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
                this.$store.dispatch('setShowSnack',true)
                this.$store.dispatch('setSnackMessage','You are logged in!')
                this.$router.push({name : 'Profile'})
          }).catch((err) => {
              if(err.response.data.details === "")
              {
                this.$store.dispatch('setShowSnack',true)
                this.$store.dispatch('setSnackMessage','Bad credentials')
                this.$store.dispatch('setSnackColor','error')
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

<style>

#login
{
  display: inline;
  border-bottom: 4px solid orange ;
}

#login-bg
{
  background: linear-gradient(to top,#ff8c00,#ffffff);
  height: 100%;
}

</style>
