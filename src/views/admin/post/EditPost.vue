<template>
  <v-card max-width="700" min-height="250px" class="mx-auto mt-16" >
    
    <v-container>
      <v-row dense>
        <v-col cols="12">
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
                v-model="location"
                :rules="fieldRules"
                label="Location*"
                required
                ></v-text-field>

                <v-text-field
                v-model="title"
                :rules="fieldRules"
                label="Title"
                required
                ></v-text-field>

                <v-textarea
                    clearable
                    v-model="body"
                    clear-icon="mdi-close-circle"
                    label="Body*"
                    :rules="fieldRules"
                ></v-textarea>
                <v-btn
                tile
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
import authHeader from '@/services/auth-header';
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {

  data()
  {
    return {
      valid : true,
      errors : [],
      fieldRules : [
        v => !!v || 'field is required'
      ],
      isLoading : false,
      location : '',
      title : '',
      body : ''
    }
  },
  computed : {
    ...mapGetters([
      'getCompanyId',
      'getRoles'
    ])
  },
  created()
  {
    if(!this.$store.getters.getLoggedIn)
    {
      this.$router.push({name : 'Login'})
    }

    axios.get(`http://localhost:8080/api/posts/${this.$route.params.id}`)
    .then((res) => {
      if(!this.getRoles.includes('ROLE_ADMIN') )
      {
          this.$router.push('/forbidden')
      }
      this.location = res.data.location
      this.title = res.data.title
      this.body = res.data.body
    }).catch((err) => {
      if(err.response.status === 404)
      {
        this.$router.push('/notFound')
      }
    });
  
  },
  methods : {
    submit()
    {
      const form = {
        location : this.location,
        title : this.title,
        body : this.body,
      }
      axios.put(`http://localhost:8080/api/posts/${this.$route.params.id}`,form,{headers : authHeader()})
            .then((res) => {
                      this.$router.push({name : 'Admin / Post',params : { id : res.data.id }})
            }).catch((err) => {
                if(err.response.status === 500)
                {
                    this.$router.push('/forbidden')
                }
                this.errors = err.response.data.details.split(',')
                this.errors.pop()                
            });

    }
  }

}
</script>

<style>

</style>