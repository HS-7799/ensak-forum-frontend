<template>
    <v-card
   max-width="700"
  >
    
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <h2 >Student informations</h2>
          <v-alert type="error" v-if="errors.length > 0" >
            <ul v-for="error in errors" :key="error" >
              <li>{{ error }}</li>
            </ul>
          </v-alert>
        <v-form
            @submit.prevent="submit"
            ref="form"
        >

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
            
          <v-textarea
              clearable
              clear-icon="mdi-close"
              label="About you"
              v-model="description"
            ></v-textarea>
        <v-btn
            :disabled="!isValid"
            :loading="isLoading"
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
import { mapGetters } from 'vuex'
import AuthHeader from '../services/auth-header';
export default {

    props : ['id','userId'],
    data()
    {
        return {
            valid : true,
            isLoading : false,
            errors : [],
            level : null,
            speciality : null,
            description : '',
            address : '',
        }
    },
    created()
    {
      if(this.id !== null)
      {
        axios.get(`/api/students/${this.id}`)
        .then((res) => {
          this.description = res.data.description
          this.level = res.data.level.id
          this.speciality = res.data.speciality.id
        }).catch((err) => {
          if(err.response.status === 404)
          {
            this.$router.push('/notFound')
          }
        });
      }
      this.$store.dispatch('getLevels')
      this.$store.dispatch('getSpecialities')
    },
    methods : {
        submit()
        {
          
          const form = {
            user : {
              id : this.userId
            },
            level : {
              id : this.level
            },
            speciality : {
              id : this.speciality
            },
            description : this.description,
            fileDownloadUri : ""
          }
          
          this.isLoading = true
          if(this.id !== null)
          {
            
            axios.put(`/api/students/${this.id}`,form,{headers : AuthHeader()})
            .then(() => {
              this.isLoading = false
              this.$store.dispatch('setShowSnack',true)
              this.$store.dispatch('setSnackMessage','Student informations are updated successfully')
            })
            .catch((err) => {
              this.errors = err.response.data.details.split(',')
              this.errors.pop()
              this.isLoading = false
            });
          } else {
            axios.post(`/api/students`,form)
            .then((res) => {
              this.$store.dispatch('setShowSnack',true)
              this.$store.dispatch('setSnackMessage','Student informations are updated successfully')
              this.$store.dispatch("setStudentId",res.data)
              this.isLoading = false
              this.errors = []
            })
            .catch((err) => {
              this.errors = err.response.data.details.split(',')
              this.errors.pop()
              this.isLoading = false
            });
          }       
        }
    },
    computed : {
      ...mapGetters({
        levels : 'getLevels',
        specialities : 'getSpecialities'
      }),
      isValid()
        {
            const levelIds = this.levels.map(level => {
                return level.id
            })

            const specialityIds = this.specialities.map(speciality => {
                return speciality.id
            })

            return specialityIds.includes(this.speciality) && levelIds.includes(this.level)
        }
    }

}
</script>

<style>

</style>