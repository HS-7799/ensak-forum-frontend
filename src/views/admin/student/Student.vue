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
              <v-btn  color="#4BBAFC" dark :to="{ name : 'Admin / Student / Create' }" absolute top right >
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
      :loading="isGettingStudents"
      loading-text="Loading... Please wait"
    >
          <template v-slot:[`item.cv`]="{ item }">
            <v-btn
              v-if="item.cv"
              :href="item.cv"
              color="blue-grey"
              small
              class="ma-2 white--text"
              
              
            >
              <v-icon dark>
                mdi-cloud-download
              </v-icon>
            </v-btn>
            <span v-else >No uploaded yet</span>
          </template>



      <template v-slot:top v-if="dialogDelete" >
        <v-toolbar flat >
          <v-dialog v-model="dialogDelete" max-width="40%">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this student?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
            <v-icon small color="blue" class="mr-2" @click="exploreStudent(item.id)">mdi-arrow-right-thick</v-icon>
            <v-icon small color="green" class="mr-2" @click="editStudent(item.id)">mdi-pencil</v-icon>
            <v-icon small color="red" @click="deleteStudent(item)">mdi-delete</v-icon>
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
        editedItem : null,
        dialogDelete : false,
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
          { text: 'Cv', value: 'cv',sortable : false },
          { text : 'Actions', value : 'actions',sortable : false}
        ],
      }
    },
    created()
    {
        this.$store.dispatch('getStudents')
    },
    computed : {
      ...mapGetters([
        'getStudents',
        'isGettingStudents'
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
                            cv : student.fileDownloadUri,
                    }
            })
      }
    },
    methods : {
      exploreStudent(id)
      {
        this.$router.push({ name : 'Student' , params : {id : id } })
      },
      editStudent(id)
      {
        this.$router.push({ name : 'Admin / Student / Edit' , params : {id : id } })
      },
      deleteStudent(item)
      {
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      deleteItemConfirm()
      {
        this.$store.dispatch('deleteStudent',this.editedItem)
        this.closeDelete()
      },
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
        })
      },
    }
  }
</script>