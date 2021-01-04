<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
          <v-card>
            <v-card-title>Filter by</v-card-title>
            <v-card-text>
              <v-select
                  attach
                  chips
                  multiple
                  v-model="level"
                  :items="levels"
                  item-value="id"
                  item-text="label"
                  label="Level"
              ></v-select>
              <v-select
                  attach
                  chips
                  multiple
                  v-model="speciality"
                  :items="specialities"
                  item-value="id"
                  item-text="label"
                  label="Speciality"
              ></v-select>
            </v-card-text>
          </v-card>
      </v-col>
      <v-col cols="12" md="8">
        <template v-if="filteredStudents.length > 0">
          <app-single-student v-for="student in filteredStudents" :key="student.id" :student="student" ></app-single-student>
        </template>
        <template v-else >
          <v-card>
            <v-card-title>
              No students available
            </v-card-title>
          </v-card>
        </template>
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import SingleStudent from '../../components/SingleStudent'
export default {
  
    data()
    {
      return {
        level : [],
        speciality : []
      }
    },
    created()
    {
      if(!this.$store.getters.getLoggedIn)
      {
        this.$router.push({name : 'Login'})
      } else {
        this.$store.dispatch('getStudents')
        this.$store.dispatch('getSpecialities')
        this.$store.dispatch('getLevels')
      }


    },
    computed : {
      ...mapGetters({
        students : 'getStudents',
        id : 'getId',
        levels : 'getLevels',
        specialities : 'getSpecialities'
      }),
      filteredStudents()
      {
        return this.students.filter(student => {
          if(this.level.length > 0 && this.speciality.length > 0)
            return this.level.includes(student.level.id) && this.speciality.includes(student.speciality.id)
          else if(this.level.length > 0)
            return this.level.includes(student.level.id)
          else if(this.speciality.length > 0)
            return this.speciality.includes(student.speciality.id)
          else
            return student
            
            
        })
      }
    },
    components : {
      appSingleStudent : SingleStudent
    }
}
</script>

<style>

</style>