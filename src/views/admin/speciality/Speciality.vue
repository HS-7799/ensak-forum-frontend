<template>
  <div>
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
            @submit.prevent="submit"
            ref="form"
            v-model="valid">
                <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Speciality name"
                required
                ></v-text-field>
              <v-btn
              :loading="isLoading"
                :disabled="!valid"
                color="primary"
                class="mr-4"
                @click="submit"
                >
                {{ isEditing ? 'Update' : 'Add' }}
                </v-btn>

                <v-btn
                v-if="isEditing"
                color="danger"
                class="mr-4"
                @click="cancel"
                >
                Cancel
                </v-btn>
        </v-form>
        </v-card-text>
      </v-card>
      <v-card class="mx-auto mt-2" max-width="70%" v-if="specialities.length > 0" >
        <v-card-text>
          <div class="row"  v-for="(speciality,index) in specialities" :key="speciality.id" >
            <h3 class="col-9">{{ speciality.label }}</h3>
                    
            <div class="col-3">
              <v-btn icon color="green" @click="startEditing(speciality,index)" >
                <v-icon>mdi-wrench</v-icon>
              </v-btn>
              <v-btn icon color="red" @click="deleteSpeciality(speciality.id,index)"  >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>
  </div>
</template>

<script>
import axios from 'axios';
import authHeader from '../../../services/auth-header';
export default {

  data()
  {
    return {
      isLoading : false,
      name : '',
      isEditing : false,
      valid : true,
      nameRules : [
        v => !!v || 'Name is required',
        v => (v && v.length >= 5) || 'Speciality name should have at least 5 characters',
      ],
      errors : [],
      specialities : []
    }
  },
  created()
  {
      axios.get('/api/specialities',{ headers : authHeader() })
      .then((res) => {
        this.specialities = res.data;
      }).catch((err) => {
        this.handleError(err)
      });
  },
  methods : {
    handleError(err)
    { 
      this.errors = []
      if(err.response.data)
      {
        this.error = err.response.data.message
      }
      if(err.response.status === 403)
      {
        this.$router.push('/forbidden')
      }
      if(err.response.status === 401)
      {
        this.$router.push('/forbidden')
      }
      if(err.response.data.details)
      {
        this.errors = err.response.data.details.split(',')
        this.errors.pop()
      }
      if(err.response.data.message !== "")
      {
        this.errors.push(err.response.data.message)
      }
      this.isLoading = false
    },
    submit()
    {
      const form = {
        name : this.name,
        label : this.name.charAt(0).toUpperCase() + this.name.slice(1)
      }
      
      if(this.isEditing)
      {
        this.updateSpeciality(form)
      } else {
        this.addSpeciality(form)
      }
      

    },
    addSpeciality(form)
    {
      this.isLoading = true
      axios.post('/api/specialities',form, { headers : authHeader() })
      .then((res) => {
        this.specialities.unshift(res.data)
        this.errors = []
        this.reset()
        this.isLoading = false
      }).catch((err) => {
        this.handleError(err)
      });
    },
    updateSpeciality(form)
    {
      axios.put(`/api/specialities/${this.idEdit}`,form, { headers : authHeader() })
      .then((res) => {
        this.specialities[this.indexEdit] = res.data
        this.cancel()
        this.reset()
      }).catch((err) => {
                this.handleError(err)

      });
    },
    startEditing(speciality,index)
    {
      this.isEditing = true
      this.name = speciality.label
      this.idEdit = speciality.id;
      this.indexEdit = index
      this.errors = []
    },
    deleteSpeciality(id,index)
    {
      axios.delete(`/api/specialities/${id}`, { headers : authHeader() })
      .then(() => {
        this.specialities.splice(index,1)
        this.errors = []
        this.reset()
      }).catch((err) => {
          this.handleError(err)

      });
    },
    cancel()
    {
      this.errors = []
      this.isEditing = false;
      this.isLoading = false
      this.idEdit = null
      this.indexEdit = null
      this.reset()
    },
    reset()
    {
      this.$refs.form.reset()
    }
  }

}
</script>

<style>

</style>