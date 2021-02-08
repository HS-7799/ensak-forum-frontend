<template>
    <div id="login-bg" >
      <v-container>
        <v-row dense>
          <v-col cols="12" sm="4">
              <v-img src="@/assets/login/register.svg" />
          </v-col>
          <v-col cols="12" sm="8" >
            <v-card width="100%" style="box-shadow:none"  class="mx-auto mt-7"  >
              <h2 style="text-align:center" >
              <span id="login" >REGISTER</span>
              </h2>
              <v-stepper v-model="e1">
                <v-stepper-header >
                  <v-stepper-step
                    :complete="e1 > 1"
                    step="1"
                    :rules="[() => errors1.length > 0 ? false : true]"
                  >
                    User informations
                  </v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step
                    :complete="e1 > 2"
                    step="2"
                    :rules="[() => errors2.length > 0 ? false : true]"
                  >
                    Level and speciality
                  </v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step step="3" >
                    Description
                  </v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                  <v-stepper-content step="1">
                    
                    <v-alert type="error" v-if="errors1.length > 0" >
                      <ul v-for="error in errors1" :key="error" >
                        <li>{{ error }}</li>
                      </ul>
                    </v-alert>
                    <v-form
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

                          <v-btn block tile class="my-2" @click="clear">
                              clear
                          </v-btn>

                    </v-form>
                      
                    <v-btn
                      color="#6c63ff"
                      :disabled="!valid"
                      @click="toStepTwo"
                    >
                      Continue
                    </v-btn>
                  </v-stepper-content>

                  <v-stepper-content step="2">
                    
                    <v-alert type="error" v-if="errors2.length > 0" >
                      <ul v-for="error in errors2" :key="error" >
                        <li>{{ error }}</li>
                      </ul>
                    </v-alert>
                    <v-form>
                              <v-select
                              v-model="level"
                              :items="levels"
                              item-value="id"
                              item-text="label"
                              label="Level"
                          ></v-select>
                          <v-select
                              v-model="speciality"
                              :items="specialities"
                              item-value="id"
                              item-text="label"
                              label="Speciality"
                          ></v-select>

                    </v-form>
                        
                    <v-btn
                      color="#6c63ff"
                      @click="e1 = 3"
                      :disabled="!isValid2"
                    >
                      Continue
                    </v-btn>

                    <v-btn text @click="e1 = 1" >
                      Cancel
                    </v-btn>
                  </v-stepper-content>

                  <v-stepper-content step="3">
                    <v-form>
                        <v-textarea
                        clearable
                        clear-icon="mdi-close"
                        label="About you"
                        v-model="description"
                        ></v-textarea>
                    <v-btn
                    :loading="isLoading"
                    color="#6c63ff"
                    tile
                    block
                    @click="register"
                    >   
                      Register
                    </v-btn>
                    </v-form>
                            
                    <v-btn text @click="e1 = 2">
                      Cancel
                    </v-btn>
                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'
import axios from 'axios'
  export default {
    data: () => ({
      isLoading : false,
      successMessage : false,
      valid: true,
      name: '',
      email: '',
      errors1 : [],
      errors2 : [],
      e1 : 1,
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
      level : null,
      speciality : null,
      description : null,
      file_download_uri : null
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
        ...mapGetters({
            levels : 'getLevels',
            specialities : 'getSpecialities'
        }),
        isValid()
        {
            if(this.name && this.email && this.password === this.passwordConfirmation && this.username && this.password && this.passwordConfirmation)
            {
            return true
            }
            return false;
        },
        isValid2()
        {
            const levelIds = this.levels.map(level => {
                return level.id
            })

            const specialityIds = this.specialities.map(speciality => {
                return speciality.id
            })

            return specialityIds.includes(this.speciality) && levelIds.includes(this.level)
        }
    },
    methods: {
      toStepTwo()
      {
        this.e1 = 2;
        this.$store.dispatch('getLevels')
        this.$store.dispatch('getSpecialities') 
      },
      register()
      { 
          if(this.isValid && this.isValid2)
          {
            this.isLoading = true
            const form = {
                "name" : this.name,
                "password" : this.password,
                "email" : this.email,
                "username" : this.username,
                "Is_Completed" : false
            }

            axios.post('/api/auth/signup',form)
            .then((res) => {
                this.errors1 = []
                const form = {
                      "user" : { id : res.data },
                      "level" : { id : this.level },
                      "speciality" : { id : this.speciality },
                      "description" : this.description,
                      "fileDownloadUri" : this.file_download_uri,
                    }
                axios.post("/api/students",form)
                .then(() => {
                  this.clear()
                  this.$store.dispatch('setShowSnack',true)
                  this.$store.dispatch('setSnackMessage','You are registred successfully')
                  this.isLoading = false;
                })
                .catch(() => {
                  if(!this.isValid2)
                  {
                    this.errors2 = ["all fields are required"]
                  }
                  this.isLoading = false;
                });
                
            })
            .catch((err) => {
                  this.isLoading = false
                  this.errors1 = err.response.data.message.split(',')
                  this.errors1.pop();
            });
            }
        },
      clear() {
        this.e1 = 1;
        this.$refs.form.reset()
        this.level = null
        this.description = null
        this.file = null
        this.speciality = null
      },
    },
  }
</script>

<style scoped>
span
{
  display: block;
}

.v-stepper__header,.v-stepper.theme--light
{
  box-shadow: none;
}
</style>