<template>
    <div id="main-dashboard" >
    <v-app-bar color="#4BBAFC" dark >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title >
        <router-link to="/" tag="span" style="cursor:pointer" >
              <img src="../../assets/logo2.png" alt="" width="150px" class="pt-2">
          </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn text to="/admin" style="border : none" >
          Dashboard
      </v-btn>
      <v-btn text @click="logout" >
        <v-icon>mdi-logout</v-icon>
          Logout
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      
      color="#FFC806"
      dark
      temporary
    >
      <v-list nav>
        <v-list-item-group
            v-for="route in routes" :key="route.name"
          v-model="group"
          active-class="gray"
        >
          <v-list-item  :to="route.to">
            <v-list-item-title  >
                {{ route.name }}
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-container>
      <v-row dense v-if="$route.name === 'Admin'" >
        <v-col cols="6" >
          <v-card>
            <v-card-title class="headline">
              {{ getLevels.length }}
            </v-card-title>

            <v-card-subtitle>
              Levels
            </v-card-subtitle>

          </v-card>
        </v-col>
        <v-col cols="6" >
          <v-card
            
          >
            <v-card-title class="headline">
              {{ getSpecialities.length }}
            </v-card-title>

            <v-card-subtitle>
              Specialities
            </v-card-subtitle>

          </v-card>
        </v-col>
        <v-col cols="6" >
          <v-card
            
          >
            <v-card-title class="headline">
              {{ getActivityareas.length }}
            </v-card-title>

            <v-card-subtitle>
              Activities
            </v-card-subtitle>

          </v-card>
        </v-col>
        <v-col cols="6" >
          <v-card
            
          >
            <v-card-title class="headline">
              {{ getPosts.length }}
            </v-card-title>

            <v-card-subtitle>
              Posts
            </v-card-subtitle>

          </v-card>
        </v-col>
        <v-col cols="6" >
          <v-card
            
          >
            <v-card-title class="headline">
              {{ getStudents.length }}
            </v-card-title>

            <v-card-subtitle>
              Students
            </v-card-subtitle>

          </v-card>
        </v-col>
        <v-col cols="6" >
          <v-card
          >
            <v-card-title class="headline">
              {{ getCompanies.length }}
            </v-card-title>

            <v-card-subtitle>
              Companies
            </v-card-subtitle>

          </v-card>
        </v-col>
        
      </v-row>
        <v-row class="pt-5" >
            <v-col cols="12" >
                <router-view></router-view>
            </v-col>
        </v-row>
    </v-container>
    </div>
</template>
<script>
import axios from 'axios'
import User from '../../Helpers/User'
import { mapGetters } from 'vuex'
import AuthHeader from '../../services/auth-header'
export default {

    data: () => ({
      drawer: false,
      group: null,
      routes : [
          { to : '/admin/levels', name : 'Levels' },
          { to : '/admin/specialities', name : 'Specialities' },
          { to : '/admin/activities', name : 'Activities' },
          { to : '/admin/students', name : 'Students' },
          { to : '/admin/companies', name : 'Companies' },
          { to : '/admin/posts', name : 'Posts' },
          { to : '/admin/create', name : 'Add Admin' },
      ]
    }),
    computed : {
      ...mapGetters([
        'getLoggedIn',
        'getRoles',
        'getLevels',
        'getActivityareas',
        'getCompanies',
        'getPosts',
        'getSpecialities',
        'getStudents'

      ])
    },
    watch: {
      group () {
        this.drawer = false
      },
    },
    methods : {
        logout()
        {
            const username = this.$store.getters.getUserName
            User.logout(username)
        }
    },
    created()
    {
      
      if(!this.getLoggedIn)
      {
        this.$router.push({name : 'Login'})
      }
      
      else if(!this.getRoles.includes("ROLE_ADMIN"))
      {
        this.$router.push('/forbidden')
      } else {
        axios.get('/api/test/admin',{ headers :  AuthHeader()})
        .then(() => {
          this.$store.commit('setRoles','ROLE_ADMIN')
          if(this.$route.name.startsWith('Admin'))
          {
            this.$store.dispatch('getLevels')
            this.$store.dispatch('getActivityareas')
            this.$store.dispatch('getCompanies')
            this.$store.dispatch('getPosts')
            this.$store.dispatch('getSpecialities')
            this.$store.dispatch('getStudents')
          }
          
        }).catch(() => {
          this.$router.push('/forbidden')
        });
      }

      
    }

}
</script>

<style scoped >
#main-dashboard
{
  background-color : #faf9f8;
  min-height: 100vh;
}

</style>