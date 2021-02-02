<template>
  <v-row style="width:80%" class="mx-auto mt-2" >
    <v-col cols="12" md="4"  >
      <v-card>
        <v-card-title>
          Messages
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text id="message-container" >
          <div v-for="message in getMessages" :key="message.id">
            <div
            v-bind:class="{ active: getSelectedMessage == message }"
              
               class="message" @click="setSelectedMessage(message)" >
              <h4 v-if="getRoles.includes('ROLE_ETUDIANT')" >
                {{ message.company.user.name }}
              </h4>
              <h4 v-else-if="getRoles.includes('ROLE_ENTREPRISE')" >
                {{ message.student.user.name }}
              </h4>
              <span>{{ message.createdAt }}</span>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="8" >
      <v-card>
        <v-card-text style="height : 564px">
          <div style="text-align:center" v-if="getMessages.length == 0" >
            <img src="@/assets/massage-icon.jpg" alt="" width="50%">
            <div v-if="getRoles.includes('ROLE_ETUDIANT')" >
              <p>When a company contacts you, messages are displayed here.</p>
              <v-btn text color="primary" :to="{name : 'Posts'}" >Search job</v-btn>
            </div>
            <div v-else-if="getRoles.includes('ROLE_ENTREPRISE')" >
              <p>You didn't contact any student</p>
              <v-btn text color="primary" :to="{name : 'Company posts' , params : { id : getCompanyId}}" >Contact students</v-btn>
            </div>
          </div>
          <div v-else >
            <app-single-message :message="getSelectedMessage" v-if="getSelectedMessage" ></app-single-message>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>


<script>
import { mapGetters,mapActions } from 'vuex'
import SingleMessage from '../components/message/SingleMessage.vue'
export default {

  data : () => ({
    photo : ''
  }),
  computed : 
  {
    ...mapGetters([
      'getLoggedIn',
      'getRoles',
      'getStudentId',
      'getSelectedMessage',
      'getCompanyId',
      'getMessages'
    ])
  },
  created()
  {
    if(!this.getLoggedIn)
    {
       this.$router.push({name : 'Login'})
    }
    else if(!(this.getRoles.includes('ROLE_ENTREPRISE') || this.getRoles.includes('ROLE_ETUDIANT')))
    {
       this.$router.push({name : 'Error unauthorized'})
    } else {
      this.messages()
    }
  },
  methods : 
  {
    ...mapActions([
      'setSelectedMessage',
    ]),
    messages()
    {
      
        let url = '/api'
        if(this.getRoles.includes('ROLE_ETUDIANT') && this.getStudentId)
        {
          url += `/students/${this.getStudentId}/messages`
        }
        else if(this.getRoles.includes('ROLE_ENTREPRISE') && this.getCompanyId)
          url += `/companies/${this.getCompanyId}/messages`

        this.$store.dispatch('getMessages',url)
    }
  },
  components : {
    appSingleMessage : SingleMessage
  }

}
</script>

<style scoped >
#message-container
{
  max-height: 500px;
  padding :0;
  overflow: auto; 
}
.message
{
  border-bottom : 1px solid lightgray;
  padding: 20px 10px;
  cursor: pointer;
}
.message.active
{
  background-color: orange;
  color: white;
}
.message:hover
{
  background-color: orange;
}
</style>