<template>
<v-card class="mx-auto p-3" max-width="70%" >
        <v-card-title>
            <h3>{{ $route.name }} managment</h3>
        </v-card-title>
        <v-card-text>
          <v-alert type="error" v-if="errors.length > 0" >
            <ul v-for="error in errors" :key="error" >
              <li>{{ error }}</li>
            </ul>
          </v-alert>
          <v-form
            ref="form"
            v-model="valid"
            @submit.prevent="add"
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

            <v-btn block tile
                color="primary"
                :disabled="!valid"
                :loading="isLoading"
                class="my-2" @click="add">
                Add
            </v-btn>
            <v-btn block tile class="my-2" @click="clear">
                clear
            </v-btn>

    </v-form>
        </v-card-text>
      </v-card>
  
</template>

<script>
import axios from 'axios'
import authHeader from '../../services/auth-header';
export default {

    data: () => ({
      isLoading : false,
      valid: true,
      name: '',
      role : '',
      email: '',
      errors : [],
      password : '',
      passwordConfirmation : '',
      username : '',
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
      showPassword : false,
      showPasswordConfirmation : false,
    }), 
    computed : {
        isValid()
        {
            if(this.name && this.email && this.password === this.passwordConfirmation && this.username && this.password && this.passwordConfirmation)
            {

              return true
            }
            return false;
        },
    },
    methods : {
        clear()
        {
            this.$refs.form.reset()
        },
        add()
        {
            if(this.isValid)
            {

            const form = {
                "name" : this.name,
                "password" : this.password,
                "email" : this.email,
                "username" : this.username,
                "Is_Completed" : false,
                "role" : ['admin'],
               
            }
            this.isLoading = true

            axios.post('/api/auth/admin',form, { headers : authHeader() })
            .then(() => {
                this.errors= []
                this.clear()
                this.isLoading = false
                this.$store.dispatch('setShowSnack',true)
                this.$store.dispatch('setSnackMessage','A new admin is addeed successfully')
            }).catch((err) => {
                this.isLoading = false
                this.errors = err.response.data.message.split(',')
                this.password = ''
                this.passwordConfirmation = ''
                this.errors.pop();
            });
          }
        },
    }
    

}
</script>

<style>

</style>