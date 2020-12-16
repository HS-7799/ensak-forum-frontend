<template>
  <v-card
    max-width="450"
    class="mx-auto mt-9"
  >
    
    
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <h2 style="text-align:center" >REGISTER</h2>
          <v-alert type="error" v-if="errors.length > 0" >
            <ul v-for="error in errors" :key="error" >
              <li>{{ error }}</li>
            </ul>
          </v-alert>
          <v-alert type="success" v-if="success.message" >
            <span>
              {{ success.message }}
            </span>
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
                v-model="username"
                :counter="20"
                :rules="userNameRules"
                label="Userame"
                required
                ></v-text-field>

                <v-text-field
                v-model="email"
                type="email"
                :rules="emailRules"
                label="E-mail"
                required
                ></v-text-field>

                <v-text-field
                v-model="password"
                :counter="40"
                :rules="passwordRules"
                label="Password"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye':'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                required
            >
            </v-text-field>
            <v-text-field
                v-model="passwordConfirmation"
                :counter="40"
                :rules="[(password === passwordConfirmation) || 'password must match',
                        (!!passwordConfirmation || 'Password confirmation is required')]"
                label="Confirm Password"
                :type="showPasswordConfirmation ? 'text' : 'password'"
                :append-icon="showPasswordConfirmation ? 'mdi-eye':'mdi-eye-off'"
                @click:append="showPasswordConfirmation = !showPasswordConfirmation"
                required
            >
            </v-text-field>

                <v-select
                v-model="role"
                :items="types"
                item-value="value"
                item-text="name"
                :rules="[v => !!v || 'Type is required']"
                label="Type"
                required
                ></v-select>
    

                <v-btn
                block
                tile
                :disabled="!valid"
                color="primary"
                class="mr-4"
                @click="submit"
                >
                Register
                </v-btn>
                <v-btn block tile class="my-2" @click="clear">
                    clear
                </v-btn>

            </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import axios from 'axios'
  export default {
    data: () => ({
      valid: true,
      name: '',
      email: '',
      role : 'etudiant',
      errors : [],
      success : {
        message : null
      },
      password : '',
      passwordConfirmation : '',
      username : '',
      types: [
        {
          name : 'Student',
          value : 'etudiant'
        },
        {
          name : 'Entreprise',
          value : 'entreprise'
        }
      ],
    //   rules
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 30 characters',
        v => (v && v.length >= 6) || 'Name must be more than 6 characters',
      ],
      userNameRules : [
        v => !!v || 'Username is required',
        v => /^[a-z][a-z]+\d*$/i.test(v) || 'Username is not valid',
        v => (v && v.length >=3) || 'Username must be more than 3 characters',
        v => (v  && v.length <= 20) || 'Username must be less than 20 characters',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >=6) || 'Password must be more than 6 characters',
        v => (v  && v.length <= 40) || 'Password must be less than 40 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      select: null,
      showPassword : false,
      showPasswordConfirmation : false
    }),
    mounted()
    {
      if(this.$store.getters.getLoggedIn)
      {
        this.$router.push({name : 'Profile'})
      }
    },
    computed :
    {
      isValid()
      {
        if(this.name && this.email && this.password === this.passwordConfirmation && this.username && this.password && this.passwordConfirmation && (this.role === 'etudiant' || this.role === 'entreprise') )
        {
          return true
        }
        return false;
      }
    },
    methods: {
      submit () {
        if(this.isValid)
        {
          const API_URL = "http://localhost:8080/api/auth/"
          
          const form = {
            "name" : this.name,
            "password" : this.password,
            "email" : this.email,
            "username" : this.username,
            "role" : [this.role],
            "Is_Completed" : false
          }
          this.$Progress.start();
          axios.post(API_URL + 'signup',form)
          .then((res) => {
            this.$Progress.finish();
            this.errors = []
            this.success.message = res.data.message;
            this.clear();
          }).catch((err) => {
            
            this.$Progress.fail();
            this.success.message = null
            if(err.response.data && err.response.data.message)
            {
              this.password = ''
              this.passwordConfirmation = ''
              this.errors = err.response.data.message.split(",");
              this.errors.pop();
            }
          });
        }
      },
      clear() {
        
        this.$refs.form.reset()
        this.role = "etudiant"
      },
    },
  }
</script>

<style scoped>
span
{
  display: block;
}
</style>