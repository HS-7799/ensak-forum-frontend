<template>
  <v-card :loading="isLoading" max-width="80%" class="mx-auto mt-5" >
    <v-card-title>
      <router-link tag="h2"
              class="primary--text"
              style="cursor:pointer" 
              :to="{ name : 'Company' , params : { id : post.company.id } }" v-if="post.company.user">
        {{ post.company.user.name }}
      </router-link> 
    </v-card-title>
    <v-card-title>
      <h3>{{ post.title }}</h3>
    </v-card-title>
    <v-card-subtitle>
      {{ post.location }}
    </v-card-subtitle>
    <v-card-text>
      <p>{{ post.body }}</p>
      <span v-if="post.createdAt" >
            Published At {{ formatDate(post.createdAt) }}
      </span>
    </v-card-text>
    <v-card-actions v-if="!isLoading" >
          <template v-if="isEdited" >
            <v-btn icon @click="editPost" >
              <v-icon icon>
                mdi-wrench
              </v-icon>
            </v-btn>
            <v-btn icon @click="deletePost" >
              <v-icon icon color="red" >
                mdi-delete
              </v-icon>
            </v-btn>
          </template>
          <v-spacer></v-spacer>
          <v-btn text color="deep-orange" :loading="isApplying" @click="submit" title="Apply" v-if="getRoles.includes('ROLE_ETUDIANT')" >
            {{  isAlreadyApplied ? 'Quit' : 'Apply now'  }}
            <v-icon v-if="!isAlreadyApplied" >mdi-send</v-icon>
          </v-btn>
        </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import AuthHeader from '../../services/auth-header'
export default {

  data()
  {
    return {
      isLoading : false,
      isApplying : false,
      isAlreadyApplied : false,
      post : {
        id : null,
        location : null,
        title : null,
        body : null,
        createdAt : null,
        company : {
          id : null,
          user : {

          }
        }
      }
      
    }
  },
  created()
  {
    this.isLoading =true
    axios.get(`http://localhost:8080/api/posts/${this.$route.params.id}`)
    .then((res) => {
      this.isLoading = false
      this.post = res.data
      const studentsIds = this.post.students.map((student) => {
        return student.id
      })
      this.isAlreadyApplied = studentsIds.includes(this.getStudentId)
    }).catch((err) => {
      if(err.response.status === 404)
      {
        this.$router.push('/notFound')
      }
    });
  },
  computed : {
    ...mapGetters([
      'getCompanyId',
      'getRoles',
      'getStudentId'
    ]),
    isEdited()
    {
        return (this.post.company.id === this.getCompanyId) || this.getRoles.includes("ROLE_ADMIN")
    }
  },
  
  methods : {
    
    editPost()
    {
      this.$router.push({name : 'Edit Post',params : { id : this.post.id }})
    },
    deletePost()
    {
      const promise = this.$store.dispatch("deletePost",this.post)

      promise.then(() => {
              this.$router.push({name : 'Posts'})
      })
    },
    submit()
    {
      this.isApplying = true
      if(this.isAlreadyApplied)
      {
        this.quit()
      } else {
        this.apply()
      }
    },
    quit()
    {
      axios.delete(`http://localhost:8080/api/posts/${this.post.id}/${this.getStudentId}`,{headers : AuthHeader()})
      .then(() => {
        this.isAlreadyApplied = false
        this.isApplying = false
      })
    },
    apply()
    {
      axios.post(`http://localhost:8080/api/posts/${this.post.id}/${this.getStudentId}`,{},{headers : AuthHeader()})
      .then(() => {
        this.isAlreadyApplied = true
        this.isApplying = false
      })
    },
    formatDate (input) {
      var datePart = input.match(/\d+/g),
      year = datePart[0].substring(
        2), //get only two digits
      month = datePart[1], day = datePart[2];

      return day+'/'+month+'/'+year;
    }
  },

}
</script>
