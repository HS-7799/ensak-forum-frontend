<template>
  <v-card>
    <v-card-title>
      <v-container>
        <v-row>
            <v-col cols="12" lg="12" md="12" sm="12" >
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-col>
        </v-row>
      </v-container>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="posts"
      :search="search"
      loading-text="Loading... Please wait"
    >
      <template v-slot:top v-if="dialogDelete" >
        <v-toolbar flat >
          <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this post?</v-card-title>
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
            <v-icon small color="green" class="mr-2" @click="editPost(item.id)">mdi-pencil</v-icon>
            <v-icon small color="red" @click="deletePost(item)">mdi-delete</v-icon>
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
          {text: 'title',align: 'start',filterable: true,value: 'title',},
          { text: 'body', value: 'body',sortable : false },
          { text: 'company', value: 'company',sortable : false },
          { text: 'published', value: 'created_at',sortable : true },
          { text: 'location', value: 'location',sortable : false },
          { text : 'Actions', value : 'actions',sortable : false}
          ],
      }
    },
    created()
    {
        this.$store.dispatch('getPosts')
    },
    computed : {
      ...mapGetters([
        'getPosts',
      ]),
      posts()
      {
        return this.getPosts.map(post => {
                    return {
                            id : post.id,
                            body : post.body,
                            created_at:post.createdAt,
                            update_at:post.updatedAt,
                            title:post.title,
                            location:post.location,
                            company:post.company.user.name,
                    }
            })
      }
    },
    methods : {
      editPost(id)
      {
        this.$router.push({ name : 'Admin / Post / Edit' , params : {id : id } })
      },
      deletePost(item)
      {
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      deleteItemConfirm()
      {
        this.$store.dispatch('deletePost',this.editedItem)
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