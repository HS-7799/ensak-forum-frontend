<template>
    <div>
    <v-app-bar color="#4BBAFC" dark >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title >
        <router-link to="/" tag="span" style="cursor:pointer" >
              <img src="../../assets/logo2.png" alt="" width="150px" class="pt-2">
          </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
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
        <v-col cols="6" v-for="item in items" :key="item.name" >
          <v-card
            :color="item.color"
          >
            <v-card-title class="headline">
              {{ item.number }}
            </v-card-title>

            <v-card-subtitle>
              {{ item.name }}
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
      items : [
        {
          number : 12,
          name : 'Levels',
          color : 'teal lighten-3'
        },
        {
          number : 10,
          name : 'Specialities',
          color : 'blue lighten-3'
        },
        {
          number : 40,
          name : 'Students',
          color : 'orange lighten-4'
        },
        {
          number : 15,
          name : 'Companies',
          color : 'brown lighten-1'
        },
         {
          number : 5,
          name : 'Activities',
          color : 'yellow lighten-1'
        }
      ],
      drawer: false,
      group: null,
      routes : [
          { to : '/admin/levels', name : 'Levels' },
          { to : '/admin/specialities', name : 'Specialities' },
          { to : '/admin/activities', name : 'Activities' },
          { to : '/admin/students', name : 'Students' },
          { to : '/admin/Companies', name : 'Companies' },
      ]
    }),
    computed : {
      ...mapGetters([
        'getLoggedIn',
        'getRoles'
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
        const API_URL = 'http://localhost:8080/api'
        axios.get(API_URL + '/test/admin',{ headers :  AuthHeader()})
        .then(() => {
          this.$store.commit('setRoles','ROLE_ADMIN')
        }).catch(() => {
          this.$router.push('/forbidden')
        });
      }

      
    }

}
</script>

<style></style>