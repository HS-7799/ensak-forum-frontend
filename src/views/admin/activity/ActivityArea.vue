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
                label="Activity name"
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
      <v-card class="mx-auto mt-2" max-width="70%" v-if="activities.length > 0" >
        <v-card-text>
          <div class="row"  v-for="(activity,index) in activities" :key="activity.id" >
            <h3 class="col-9">{{ activity.label }}</h3>
                    
            <div class="col-3">
              <v-btn icon color="green" @click="startEditing(activity,index)" >
                <v-icon>mdi-wrench</v-icon>
              </v-btn>
              <v-btn icon color="red" @click="deleteActivity(activity.id,index)"  >
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
        v => (v && v.length >= 5) || 'Activity area name should have at least 5 characters',

      ],
      errors : [],
      activities : []
    }
  },
  created()
  {
    const API_URL = 'http://localhost:8080/api'
      axios.get(API_URL + '/activityareas',{ headers : authHeader() })
      .then((res) => {
        this.activities = res.data;
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
        this.updateActivity(form)
      } else {
        this.addActivity(form)
      }
      

    },
    addActivity(form)
    {
      this.isLoading = true
      const API_URL = 'http://localhost:8080/api'
      axios.post(API_URL + '/activityareas',form, { headers : authHeader() })
      .then((res) => {
        this.isLoading = false
        this.activities.unshift(res.data)
        this.errors = []
        this.reset()
      }).catch((err) => {
        this.handleError(err)
      });
    },
    updateActivity(form)
    {
      const API_URL = 'http://localhost:8080/api'
      axios.put(API_URL + `/activityareas/${this.idEdit}`,form, { headers : authHeader() })
      .then((res) => {
        this.activities[this.indexEdit] = res.data
        this.cancel()
        this.reset()
      }).catch((err) => {
        this.handleError(err)
      });
    },
    startEditing(activity,index)
    {
      this.isEditing = true
      this.name = activity.label
      this.idEdit = activity.id;
      this.indexEdit = index
      this.errors = []
    },
    deleteActivity(id,index)
    {
      const API_URL = 'http://localhost:8080/api'
      axios.delete(API_URL + `/activityareas/${id}`, { headers : authHeader() })
      .then(() => {
        this.activities.splice(index,1)
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