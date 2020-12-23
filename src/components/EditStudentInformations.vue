<template>
    <v-card
    max-width="450"
    class="mx-auto my-2"
  >
    
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <h2 style="text-align:center" >Student informations</h2>
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

          <v-file-input
              v-model="files"
              placeholder="Upload your resume"
              label="Resume"
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
            level : null,
            speciality : null,
            description : '',
            address : '',
            phone : '',
            files : [],
        }
    },
    created()
    {
      if(this.id !== null)
      {
        axios.get(`http://localhost:8080/api/students/${this.id}`)
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
            cv : ""
          }
          
          this.isLoading = true
          if(this.id !== null)
          {
            console.log('put');
            
            axios.put(`http://localhost:8080/api/students/${this.id}`,form,{headers : AuthHeader()})
            .then(() => {
              this.isLoading = false
            })
            .catch(() => {
              this.isLoading = false
            });
          } else {
            console.log(form);
            axios.post(`http://localhost:8080/api/students`,form)
            .then(() => {
              this.isLoading = false
              this.errors = []
            })
            .catch((err) => {
              this.errors = ['level and speciality are required']
              console.log(err.response.data);
              this.isLoading = false
            });
          }       
        }
    },
    computed : {
      ...mapGetters({
        levels : 'getLevels',
        specialities : 'getSpecialities'
      })
    }

}
</script>

<style>

</style>