<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }" >
        <v-btn
          class="ml-auto mr-3"
          color="primary"
          dark
          tile
          v-bind="attrs"
          v-on="on"
        >
          New Post
        </v-btn>
      </template>
      <v-card>
        <v-alert type="error" class="p-2" v-if="errors.length > 0">
            <ul>
                <li v-for="error in errors" :key="error" >
                    {{ error }}
                </li>
            </ul>
        </v-alert>
        <v-card-title>
          <span class="headline">New Post</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
               <v-col cols="12">
                <v-text-field
                  label="Location*"
                  :rules="fieldRules"
                  v-model="location"
                  required

                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Title*"
                  :rules="fieldRules"
                  v-model="title"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                    clearable
                    v-model="body"
                    clear-icon="mdi-close-circle"
                    label="Body*"
                    :rules="fieldRules"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="clear"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="addNewPost"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from 'axios';
import authHeader from '../../services/auth-header';
import { mapGetters } from 'vuex';
  export default {
    data: () => ({
      dialog: false,
      errors : [],
      fieldRules: [
        v => !!v || 'This field is required',
      ],
      location : '',
      title : '',
      body : ''
    }),
    computed : {
        ...mapGetters({
            companyId : 'getCompanyId'
        })
    },
    methods:
    {
        addNewPost()
        {
            const form = {
                location : this.location,
                title : this.title,
                body : this.body,
                company : {
                    id : this.companyId
                }

            }
            axios.post('http://localhost:8080/api/posts',form,{headers : authHeader()})
            .then((res) => {
                this.clear()
                this.$store.dispatch("addPost",res.data)
            }).catch((err) => {
                if(err.response.status === 500)
                {
                    this.$router.push('/forbidden')
                }
                this.errors = err.response.data.details.split(',')
                this.errors.pop()
                
            });
        },
        clear()
        {
            this.dialog = false
            this.errors = []
        }
    }
  }
</script>