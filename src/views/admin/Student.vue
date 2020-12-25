<template>
  <v-card>
    <v-card-title>
      <v-container>
        <v-row>
            <v-col cols="12" lg="10" md="8" sm="6" >
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="2" md="4" sm="6" >
              <v-btn  color="#4BBAFC" dark :to="{ name : 'Admin / Student / Create' }">
          New Student
          <v-icon>mdi-account-multiple-plus</v-icon>
      </v-btn>
            </v-col>
        </v-row>
      </v-container>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="students"
      :search="search"
      :loading="students.length === 0"
      loading-text="Loading... Please wait"
    >
      <template v-slot:[`item.actions`]="{ item }">
            <v-icon small color="green" class="mr-2" @click="editStudent(item.id)">mdi-pencil</v-icon>
            <v-icon small color="red" @click="deleteStudent(item.id)">mdi-delete</v-icon>
          </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Name',
            align: 'start',
            filterable: true,
            value: 'name',

          },
          { text: 'Username', value: 'username',sortable : false },
          { text: 'Email', value: 'email',sortable : true },
          { text: 'Level', value: 'level',sortable : false },
          { text: 'Speciality', value: 'speciality',sortable : false },
          { text: 'Descritpion', value: 'description',sortable : false },
          { text: 'Cv', value: 'cv',sortable : false },
          { text : 'Actions', value : 'actions',sortable : false}
        ],
        // students :[]
      }
    },
    created()
    {
            this.$store.dispatch('getStudents')
            
    },
    computed : {
      ...mapGetters([
        'getStudents'
      ]),
      students()
      {
        return this.getStudents.map(student => {
                    return {
                            id : student.id,
                            name : student.user.name,
                            username : student.user.username,
                            email : student.user.email,
                            level : student.level.label,
                            speciality : student.speciality.label,
                            description : student.description,
                            cv : student.cv,
                    }
            })
      }
    },
    methods : {
      editStudent(id)
      {
        this.$router.push({ name : 'Admin / Student / Edit' , params : {id : id } })
      },
      deleteStudent(id)
      {
        console.log("delete" + id);
      }
    }
  }
</script>