<template>
  <v-stepper v-model="e" vertical>
    <h2 style="padding:10px" >
              {{ this.$route.name }}
    </h2>
    <v-stepper-step :complete="e > 1" color="#4BBAFC" step="1" :rules="[() => errors1.length > 0 ? false : true]" >
      User informations
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-card class="mb-12" >
          <v-card-text>
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
          </v-card-text>
      </v-card>
      <v-btn color="#4BBAFC" @click="toStepTwo" :disabled="!valid" >Continue</v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e > 2" color="#4BBAFC" step="2" :rules="[() => errors2.length > 0 ? false : true]">
        Add level and speciality
    </v-stepper-step>

    <v-stepper-content step="2">
      <v-card class="mb-12">
          <v-card-text>
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
          </v-card-text>
      </v-card>
      <v-btn color="#4BBAFC" :disabled="!isValid2" @click="submit">Add student</v-btn>
      <v-btn text @click="e = 1" >Cancel</v-btn>
    </v-stepper-content>

  </v-stepper>
</template>

<script>
import axios from "axios"
import {mapGetters} from 'vuex';
  export default {
    data: () => ({
      isLoading : false,
      successMessage : false,
      valid: true,
      name: '',
      email: '',
      errors1 : [],
      errors2 : [],
      e : 1,
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
    }),
    computed:
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
    methods : {
        submit()
        {
          if(this.isValid && this.isValid2)
          {

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
                this.isLoading = false
                const form = {
                    "user" : { id : res.data },
                    "level" : { id : this.level },
                    "speciality" : { id : this.speciality },
                    "description" : "",
                    "cv" : ""
                }

                axios.post("/api/students",form)
                .then(() => {
                  this.$router.push({name : 'Admin / Student'})
                }).catch(() => {
                  if(!this.isValid2)
                  {
                    this.errors2 = ["all fields are required"]
                  }
                  this.isLoading = false;
                });

            }).catch((err) => {
                this.errors1 = err.response.data.message.split(',')
                this.errors1.pop();
            });
          }
        },
        toStepTwo()
        {
            this.e = 2
            this.$store.dispatch('getLevels')
            this.$store.dispatch('getSpecialities') 
        },
        clear() {
        
        this.$refs.form.reset()
        this.level = null
        this.description = null
        this.cv = null
        this.speciality = null
      },
    }
  }
</script>
