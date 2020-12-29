<template>
  <v-container>
    <v-row v-if="students.length > 0" >
      <v-col cols="12" v-for="student in students" :key="student.id"  >
          <app-single-student :student="student" ></app-single-student>
      </v-col>
    </v-row>
    <v-row v-else >
      <v-col cols="12" >
          <v-card>
            <v-card-title>
              No students available
            </v-card-title>
          </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import SingleStudent from '../components/SingleStudent'
export default {
    
    created()
    {
      if(!this.$store.getters.getLoggedIn)
      {
        this.$router.push({name : 'Login'})
      } else {
        this.$store.dispatch('getStudents')
      }
    },
    computed : {
      ...mapGetters({
        students : 'getStudents',
        id : 'getId'
      })
    },
    components : {
      appSingleStudent : SingleStudent
    }
}
</script>

<style>

</style>