<template>
  <div>
    <v-card class="mx-auto mt-2" max-width="1150" tile>
      <v-img height="200" src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"></v-img>
      <v-row style="margin:2.5%;position:absolute; top: 130px">

            <v-list-item>
              <v-list-item-avatar size="100">
                  <img
                    src="@/assets/students.png"
                    alt="John"
                  >
              </v-list-item-avatar>
              <v-list-item-content style="margin-top:40px">
                  <v-list-item-title class="title">
                    {{ user.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                      Student
                  </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
      </v-row>
  </v-card>
  <v-container style="margin-top:60px" >
    <v-row class="mx-auto " max-width="1000"  >
        <v-col cols="12" v-if="cv != null" >
          <v-card tile >
            <v-card-title>
              My resume
            </v-card-title>
            <v-card-text>
              <v-btn
                v-if="cv != ''"
                :href="cv"
                color="blue-grey"
                class="ma-2 white--text"
                
                
              >
              Download
                <v-icon dark class="ml-1">
                  mdi-cloud-download
                </v-icon>
              </v-btn>
              <span v-else>
                Not uploaded yet
              </span>
            </v-card-text>
          </v-card>
        </v-col>
          
      </v-row>
      <v-row class="mx-auto " max-width="1000"  >
        <v-col cols="12" md="4" >
          <v-card tile >
            <v-card-title>
              Email
            </v-card-title>
            <v-card-text>
              {{ user.email }}
            </v-card-text>
          </v-card>
          <v-card tile >
            <v-card-title>
              Level
            </v-card-title>
            <v-card-text>
              {{ level }}
            </v-card-text>
          </v-card>
          <v-card tile >
            <v-card-title>
              Speciality
            </v-card-title>
            <v-card-text>
              {{ speciality }}
            </v-card-text>
          </v-card>
        </v-col>
        <v-col col="12">
          <v-card tile >
            <v-card-title>
              Description
            </v-card-title>
            <v-card-text>
              {{description}}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
  </v-container>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Student',
  data()
  {
    return {
      user : {
        name : null,
        email : null
      },
      level : null,
      speciality : null,
      description : null,
      cv : null,
    }
  },
  created()
  {
    if(!this.$store.getters.getLoggedIn)
    {
      this.$router.push({name : 'Login'})
    }

    axios.get(`/api/students/${this.$route.params.id}`)
    .then((res) => {
      this.user = res.data.user
      this.level = res.data.level.label
      this.speciality = res.data.speciality.label
      this.description = res.data.description
      this.cv = res.data.fileDownloadUri
    }).catch((err) => {
      if(err.response.status === 404)
      {
        this.$router.push('/notFound')
      }
    });
  },
  
  
}
</script>