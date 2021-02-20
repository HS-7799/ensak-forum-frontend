<template>
    <v-card
    max-width="700"
  >
    
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <h2 >Company informations</h2>
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
            v-model="activityarea"
            :items="activityareas"
            item-value="id"
            item-text="label"
            label="ACtivity area"
          ></v-select>
          <v-textarea
              clearable
              clear-icon="mdi-close"
              label="About"
              v-model="description"
            ></v-textarea>
            <v-text-field
                v-model="address"
                :counter="20"
                label="address"
                required
                ></v-text-field>      
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
            isLoading : false,
            errors : [],
            activityarea : null,
            description : '',
            address : '',
        }
    },
    created()
    {
      if(this.id !== null)
      {
        axios.get(`/api/companies/${this.id}` ,{headers : AuthHeader()})
        .then((res) => {
          this.description = res.data.description
          this.activityarea = res.data.activityarea.id
          this.address=res.data.address
        }).catch((err) => {
          if(err.response.status === 404)
          {
            this.$router.push('/notFound')
          }
        });
      }
      this.$store.dispatch('getActivityareas')
    },
    methods : {
        submit()
        {
          const form = {
            user : {
              id : this.userId
            },
            activityarea : {
              id : this.activityarea
            },
            address : this.address,
            description : this.description,
            logo : ""
          }
          
          this.isLoading = true
          if(this.id !== null)
          {
            
            axios.put(`/api/companies/${this.id}` ,form,{headers : AuthHeader()})
            .then(() => {
              this.$store.dispatch('setShowSnack',true)
              this.$store.dispatch('setSnackMessage','Company informations are updated successfully')
              this.isLoading = false
            })
            .catch((err) => {
              this.setErrors(err)
              this.isLoading = false
            });
          } else {
            axios.post(`/api/companies`,form,{headers : AuthHeader()})
            .then((res) => {
              console.log(res);
              this.$store.dispatch("setCompanyId",res.data.id)
              this.$store.dispatch('setShowSnack',true)
              this.$store.dispatch('setSnackMessage','Company informations are updated successfully')
              this.isLoading = false
              this.errors = []
            })
            .catch((err) => {
              this.setErrors(err)
              this.isLoading = false
            });
          }
                 
        },
        setErrors(err)
        {
          this.errors = err.response.data.details.split(',')
            this.errors.pop()
        }
    },
    computed : {
      ...mapGetters({
        activityareas : 'getActivityareas'
      }),
      isValid()
        {
            const activitiesIds = this.activityareas.map(activity => {
                return activity.id
            })

            return activitiesIds.includes(this.activityarea)
        }
    }

}
</script>

<style>

</style>