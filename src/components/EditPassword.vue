<template>
  <v-card
    max-width="700"
  >
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <h2>Change password</h2>
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
                v-model="oldPassword"
                :counter="40"
                :rules="passwordRules"
                label="Old password"
                :type="showOldPassword ? 'text' : 'password'"
                :append-icon="showOldPassword ? 'mdi-eye':'mdi-eye-off'"
                @click:append="showOldPassword = !showOldPassword"
                required
            >
            </v-text-field>
                <v-text-field
                v-model="newPassword"
                :counter="40"
                :rules="passwordRules"
                label="New password"
                :type="showNewPassword ? 'text' : 'password'"
                :append-icon="showNewPassword ? 'mdi-eye':'mdi-eye-off'"
                @click:append="showNewPassword = !showNewPassword"
                required
            >
            </v-text-field>
            <v-text-field
                v-model="newPasswordConfirmation"
                :counter="40"
                :rules="[(newPassword === newPasswordConfirmation) || 'password must match',
                        (!!newPasswordConfirmation || 'Password confirmation is required')]"
                label="Confirm new password"
                :type="showNewPasswordConfirmation ? 'text' : 'password'"
                :append-icon="showNewPasswordConfirmation ? 'mdi-eye':'mdi-eye-off'"
                @click:append="showNewPasswordConfirmation = !showNewPasswordConfirmation"
                required
            >
            </v-text-field>

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
import axios from "axios";
import AuthHeader from '../services/auth-header.js';
  export default {
    props : ['userId'],
    data: () => ({
      isLoading : false,
      valid: true,
      errors : [],
      oldPassword : '',
      newPassword : '',
      newPasswordConfirmation : '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >=6) || 'Password must be more than 6 characters',
        v => (v  && v.length <= 40) || 'Password must be less than 40 characters',
      ],
    
      showOldPassword : false,
      showNewPassword : false,
      showNewPasswordConfirmation : false
    }),
    methods: {

      submit()
      {
        const form = {
          oldpassword : this.oldPassword,
          newpassword : this.newPassword,
          passwordconfirmation : this.newPasswordConfirmation

        }

        this.isLoading = true
        axios.put(`/api/auth/profile/updatepassword/${this.userId}`,form,{headers : AuthHeader()})
        .then((res) => {
          this.$store.dispatch('setShowSnack',true)
          this.$store.dispatch('setSnackMessage',res.data.message)
          this.errors = []
          this.isLoading = false
          this.clear()
        }).catch((err) => {
          if(err.response.data.details)
          {
            this.errors = err.response.data.details.split(',')
          }
          else if(err.response.data.message) {
            this.errors = err.response.data.message.split(',')
          }
          this.errors.pop()
          this.isLoading = false
        });
      },
      
      clear() {
        this.$refs.form.reset()
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