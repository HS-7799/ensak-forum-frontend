<template>
  <v-container>
    <v-row>
      <v-col cols="12" v-for="student in students" :key="student.id"  >
          <app-single-student :student="student" ></app-single-student>
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