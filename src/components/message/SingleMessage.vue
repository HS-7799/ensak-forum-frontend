<template>
  <v-container>
    <div id="message-header" >
        <div  class="mb-5">
            <v-avatar color="#FFC806" class="mr-2">
            <span class="headline" >{{ getInitials(message.company.user.name) }}</span>
        </v-avatar>
        <span id="company" >{{ message.company.user.name }}</span>
        </div>
        <div>
            <span>{{ message.company.address }}</span>
            At 
            <span>{{ formatDate(message.createdAt) }}</span>
        </div> 
    </div>
        
    <div class="my-2"  id="message-details" >
        <h3>Post</h3>
        <router-link tag="p" style="cursor : pointer"  :to="{ name : 'Post', params : {id : message.post.id} }" >
        {{ message.post.title }}
        </router-link>
        <h3>Student</h3>
        <router-link tag="p" style="cursor : pointer"  :to="{ name : 'Student', params : {id : message.student.id} }" >
        {{ message.student.user.name }}
        </router-link>
    </div>
        <h4>Message</h4>
    <div id="message-body" class="my-2" v-if="!isEditing" >
        <p>{{ message.body }}</p>
    </div>
    <div v-else>
        <div v-if="errors.length > 0" >

        <ul v-for="error in errors" :key="error">
            <li>
                {{ error }}
            </li>
        </ul>
        </div>
        <v-textarea
            clearable
            clear-icon="mdi-close"
            label="Body*"
            v-model="body"
        ></v-textarea>
    </div>
    <div>
    <div v-if="getRoles.includes('ROLE_ENTREPRISE')" >
        <v-btn color="green" class="mr-1" dark @click="startEditing" v-if="!isEditing" >
            Edit
            <v-icon icon  >
                mdi-wrench
            </v-icon>
        </v-btn>
        <div v-else class="m-2" >
            <v-btn color="green" class="mr-1" dark @click="editMessage" >
                Save
            </v-btn>
            <v-btn  class="m-1" dark @click="cancel" >
                Cancel
            </v-btn>
        </div>
        <v-btn color="red" class="my-2" dark @click="deleteMessage" >
            Delete
            <v-icon icon  >
                mdi-delete
              </v-icon>
        </v-btn>
    </div>
    </div>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex'
export default {

    props : ['message'],
    data()
    {
        return {
            isEditing : false,
            body : '',
            errors : []
        }
    },
    computed : {
        ...mapGetters([
            'getRoles'
        ])
    },
    methods : {
        deleteMessage()
        {
            if(confirm('Are you sure you want to delete this message ?'))
            {
                this.$store.dispatch('deleteMessage',this.message)
            }
        },
        startEditing()
        {
            this.isEditing = true
            this.body = this.message.body
        },
        editMessage()
        {
            const form = {
                student : {
                    id : this.message.student.id
                },
                company : {
                    id : this.message.company.id
                },
                post : {
                    id : this.message.post.id
                },
                    body : this.body
            }
            
            this.$store.dispatch('EditMessage',{
                message : this.message,
                form  : form
            })
            .then(() => {
                this.cancel()
            }).catch((err) => {
                this.errors = err.response.data.details.split(',')
                this.errors.pop()
            });
        },
        getInitials(name)
        {
            let initials = "";
            let i;
            let names = name.split(' ');
            for(i = 0;i<names.length;i++)
            {
                initials += names[i].charAt(i).toUpperCase()
            }
            return initials;
        },
        formatDate (input) {
        var datePart = input.match(/\d+/g),
        year = datePart[0].substring(2), //get only two digits
        month = datePart[1], day = datePart[2];

        return day+'/'+month+'/'+year;
        },
        cancel()
        {
            this.isEditing = false
            this.errors = []
            this.body = ''
        }
    }

}
</script>

<style scoped >

ul
{
    color : red;
}
#message-body
{
    text-align: justify;
    overflow: auto;
    max-height: 200px;
    color: black;
}

#message-body
{
    padding: 30px 20px;
}

#message-header
{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

#message-header #company
{
    color: orange;
    font-size: 30px;
}

#message-details
{
    padding: 10px;
    background-color: lightgrey;
    color: white;
}

#message-details h3
{
    color: orange;
}

</style>