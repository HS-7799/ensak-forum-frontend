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
              <v-btn  color="#4BBAFC" dark :to="{ name : 'Admin / Company / Create' }">
          New Company
          <v-icon>mdi-account-multiple-plus</v-icon>
      </v-btn>
            </v-col>
        </v-row>
      </v-container>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="Companies"
      :search="search"
      :loading="isGettingCompanies"
      loading-text="Loading... Please wait"
    >
        <template v-slot:top v-if="dialogDelete" >
        <v-toolbar flat >
          <v-dialog v-model="dialogDelete" max-width="550px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this company?</v-card-title>
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
            <v-icon small color="green" class="mr-2" @click="editCompany(item.id)">mdi-pencil</v-icon>
            <v-icon small color="red" @click="deleteCompany(item)">mdi-delete</v-icon>
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
        dialogDelete : false,
        editedItem : null,
        headers: [
          { text: 'Name',align: 'start',filterable: true, value: 'name',},
          { text: 'Username', value: 'username',sortable : false },
          { text: 'Email', value: 'email',sortable : true },
          { text: 'Activityarea', value: 'activityarea',sortable : false },
          { text: 'Descritpion', value: 'description',sortable : false },
          { text: 'logo', value: 'logo',sortable : false },
          { text : 'Actions', value : 'actions',sortable : false}
        ],
        
      }
    },
    created()
    {
        this.$store.dispatch('getCompanies')
    },
    computed : {
      ...mapGetters([
        'getCompanies',
        'isGettingCompanies'
      ]),
      Companies()
      {
        return this.getCompanies.map(company=> {
          return{
              id : company.id,
              name : company.user.name,
              username : company.user.username,
              email : company.user.email,
              activityarea : company.activityarea.label,
              description : company.description,
              logo : company.logo,
          }
        })
        
      }
    },
    methods : {
      editCompany(id)
      {
        this.$router.push({ name : 'Admin / Company / Edit' , params : {id : id } })
      },
      deleteCompany(item)
      {
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      deleteItemConfirm()
      {
        this.$store.dispatch('deleteCompany',this.editedItem)
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