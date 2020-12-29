<template>
    <v-card
    max-width="450"
    class="mx-auto my-2"
  >
    
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <h2 style="text-align:center" >Company informations</h2>
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

            
            <v-select
            v-model="activityarea"
            :items="activityareas"
            item-value="id"
            item-text="label"
            label="ACtivityarea"
          ></v-select>
          <v-textarea
              clearable
              clear-icon="mdi-close"
              label="About you"
              v-model="description"
            ></v-textarea>
            <v-text-field
                v-model="address"
                :counter="20"
                label="address"
                required
                ></v-text-field>
            <v-file-input
              v-model="files"
              placeholder="Upload your logo"
              label="Logo"
              multiple
              prepend-icon="mdi-paperclip"
          >
              <template v-slot:selection="{ text }">
                <v-chip
                  small
                  label
                  color="primary"
                >
                  {{ text }}
                </v-chip>
              </template>
          </v-file-input>
                
            
        <v-btn
            :disabled="!valid"
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
            files : [],
            activityarea : null,
            description : '',
            address : '',
        }
    },
    created()
    {
      if(this.id !== null)
      {
        axios.get(`http://localhost:8080/api/companies/${this.id}` ,{headers : AuthHeader()})
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
            
            axios.put(`http://localhost:8080/api/companies/${this.id}` ,form,{headers : AuthHeader()})
            .then(() => {
              this.isLoading = false
            })
            .catch(() => {
              this.isLoading = false
            });
          } else {
            axios.post(`http://localhost:8080/api/companies`,form,{headers : AuthHeader()})
            .then(() => {
              this.isLoading = false
              this.errors = []
            })
            .catch(() => {
              this.errors = ['activity area is required']
              this.isLoading = false
            });
          }       
        }
    },
    computed : {
      ...mapGetters({
        activityareas : 'getActivityareas'
      })
    }

}
</script>

<style>

</style>