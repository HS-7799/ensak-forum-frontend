<template>
<div>
    <v-card max-width="700" class="mx-auto mt-3" >
        <v-card-title>
            My posts
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
                <!-- <v-col cols="12" lg="2" md="4" sm="6" >
                <v-btn  color="#4BBAFC" dark :to="{ name : 'Admin / Student / Create' }">
                    New Student
                    <v-icon>mdi-account-multiple-plus</v-icon>
                </v-btn>
                </v-col> -->
            </v-row>
        </v-container>
        </v-card-title>
        <v-data-table
        :headers="headers"
        :items="posts"
        :search="search"
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
                <v-btn  small text color="primary" @click="visitPost(item.id)" >Explore</v-btn>
                <v-icon small color="green" class="mr-2" @click="editPost(item.id)">mdi-pencil</v-icon>
                <v-icon small color="red" @click="deletePost(item)">mdi-delete</v-icon>
                <v-btn  small text color="primary" @click="selectStudents(item)" v-if="item.students.length > 0" >who applied?</v-btn> 
                <span class="ml-3" v-else>Nobody applied</span>
            </template>
        </v-data-table>
    </v-card>
    <v-card max-width="700" class="mx-auto mt-3" v-if="students.length > 0" >
        <v-card-title>
            All students who applied for this post
        <v-container>
            <v-row>
                <v-col cols="12" lg="10" md="8" sm="6" >
                <v-text-field
                    v-model="search2"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
                </v-col>
                <v-col cols="12" >
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
                </v-col>
            </v-row>
        </v-container>
        </v-card-title>
        <v-data-table
        :headers="headers2"
        :items="filteredStudents"
        :search="search2"
        >
        <template v-slot:[`item.actions`]="{ item }">
                <v-btn  small text color="primary" @click="$router.push({name : 'Student',params : {id : item.id}})" >Explore</v-btn> 
        </template>
        </v-data-table>
    </v-card>
</div>
</template>

<script>
import axios from 'axios'
import AuthHeader from '../../services/auth-header'
import {mapGetters} from 'vuex'
export default {
    data()
    {
        return {
            search: '',
            level : [],
            speciality : [],
            search2 : '',
            posts : [],
            students : [],
            editedItem : null,
            dialogDelete : false,
            headers: [
                { text: 'Title', value: 'title',sortable : true, filterable : true },
                { text: 'Published', value: 'createdAt',sortable : true, filterable : true },
                { text : 'Actions', value : 'actions',sortable : false}
            ],
            headers2 : [
                {
                    text: 'Name',
                    align: 'start',
                    filterable: true,
                    value: 'user.name',

                },
                { text: 'Email', value: 'user.email',sortable : true },
                { text: 'Level', value: 'level.label',sortable : false },
                { text: 'Speciality', value: 'speciality.label',sortable : false },
                { text: 'Cv', value: 'cv',sortable : false },
                { text : 'Actions', value : 'actions',sortable : false}
            ]
        }
    },
    computed : {
        ...mapGetters({
            roles : 'getRoles',
            companyId : 'getCompanyId',
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
    created()
    {
        if(!this.$store.getters.getLoggedIn)
        {
            this.$router.push({name : 'Login'})
        } else if(!this.roles.includes("ROLE_ENTREPRISE") || this.$route.params.id != this.companyId)
        {
            this.$router.push({name : 'Profile'})
        }
        else {
            const API_URL = 'http://localhost:8080/api/'
            axios.get(API_URL + `companies/${this.$route.params.id}/posts`,{headers : AuthHeader()})
            .then((res) => {
                this.posts = res.data
                this.$store.dispatch('getLevels')
                this.$store.dispatch('getSpecialities')
            })
        }
    },
    methods : {
        visitPost(id)
        {
            this.$router.push({name  : 'Post',params : {id : id}})
        },
        editPost(id)
        {
            this.$router.push({name : 'Edit Post',params : { id : id }})
        },
        deletePost(item)
        {
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },
        deleteItemConfirm()
        {
            return axios.delete(`http://localhost:8080/api/posts/${this.editedItem.id}`,{headers : AuthHeader()})
            .then(() => {
                this.posts.splice(this.posts.indexOf(this.editedItem),1)
                this.dialogDelete = false
            })
            .catch(err => {
                if(err.response.status === 500)
                {
                    this.$router.push('/forbidden')
                }
            })
        },
        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)})
        },
        selectStudents(post)
        {
            this.students = post.students
        }
      
    }
}
</script>

<style>

</style>