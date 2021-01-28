<template>
  <div>
      <v-navigation-drawer
      style="z-index:15"
        v-model="drawer"
        absolute
        temporary
      >
        <v-list>
          <v-list-item-group>
            <v-list-item :to="{ name : 'Posts' }" >
                <v-list-item-title>
                  <v-icon></v-icon>
                  Posts
                </v-list-item-title>
              
              </v-list-item>
              <v-divider></v-divider>
            <template v-if="!getLoggedIn">
              <v-list-item :to="{ name : 'Login' }"  >
              <v-list-item-title>
                <!-- <v-icon>mdi-login</v-icon> -->
                Login
              </v-list-item-title>
            </v-list-item>
            <v-list-item :to="{ name : 'Register' }">
              <v-list-item-title>
                <v-icon></v-icon>
                Register
              </v-list-item-title>
            </v-list-item>
            </template>
            <template v-else >
              <v-list-item to="/admin" v-if="getRoles.includes('ROLE_ADMIN')" >
                <v-list-item-title>
                  <v-icon>mdi-view-dashboard</v-icon>
                  Dashboard
                </v-list-item-title>
              
              </v-list-item>
              <v-list-item :to="{name : 'Company posts', params : {id : getCompanyId }}" v-if="getRoles.includes('ROLE_ENTREPRISE')" >
                <v-list-item-title>
                  My posts
                </v-list-item-title>
              
              </v-list-item>
              <v-list-item :to="{ name : 'Profile'}" >
                <v-list-item-title>
                  <v-icon>mdi-account-edit</v-icon>
                  Account
                </v-list-item-title>
              
              </v-list-item>
              <v-list-item :to="{ name : 'Edit Profile'}" >
                <v-list-item-title>
                  <v-icon>mdi-account</v-icon>
                  Edit Account
                </v-list-item-title>
              
              </v-list-item>

              <v-divider></v-divider>
              
              <v-list-item :to="{ name : 'Companies' }" >
                <v-list-item-title>
                  <v-icon></v-icon>
                  Companies
                </v-list-item-title>
              
              </v-list-item>
              <v-list-item :to="{ name : 'Students' }" >
                <v-list-item-title>
                  <v-icon></v-icon>
                  Students
                </v-list-item-title>
              
              </v-list-item>

            <v-divider></v-divider>
            <v-list-item @click="logout" >
              <v-list-item-title>
                <v-icon>mdi-logout</v-icon>
                Logout
              </v-list-item-title>
            </v-list-item>
            </template>
            
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar color="white" >
          <v-app-bar-nav-icon class="d-flex d-sm-none" @click.stop="drawer = !drawer" ></v-app-bar-nav-icon>
          <v-toolbar-title>
            <router-link to="/" tag="span" style="cursor:pointer" >
              <img src="../../assets/logo.png" alt="" width="150px" class="pt-2">
            </router-link>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items class="d-none d-sm-flex" >
              <v-btn text  :to="{ name : 'Posts' }">
                  <v-icon></v-icon>
                  Posts
                </v-btn>
              <template v-if="!getLoggedIn">
                <v-btn text  :to="{ name : 'Login' }"  >
                  <!-- <v-icon>mdi-login</v-icon> -->
                  Login
                </v-btn>
              <v-btn text  :to="{ name : 'Register' }">
                <v-icon></v-icon>
                Register
              </v-btn>
              </template>
              <template v-else >
                
                <v-btn text  :to="{ name : 'Companies' }">
                  <v-icon></v-icon>
                  Companies
                </v-btn>
                <v-btn text  :to="{ name : 'Students' }">
                  <v-icon></v-icon>
                  Students
                </v-btn>
                <app-avatar></app-avatar>
              </template>

          </v-toolbar-items>
      </v-toolbar>
    </div>
</template>

<script>
import User from '../../Helpers/User'
import {mapGetters} from 'vuex'
import Avatar from '../Avatar'
export default {
  name: 'App',
  data: () => ({
    drawer : false,
  }),
  computed : {
    ...mapGetters([
      'getLoggedIn',
      'getRoles',
      'getId',
      'getCompanyId'
    ])
  },
  components : {
    appAvatar : Avatar
  },
  methods : {
    logout()
    {
      const username = this.$store.getters.getUserName
      User.logout(username)
    }
  },
  
}
</script>

<style>

.v-btn--active
{
    border-bottom : 3px solid orange;
    
}

.v-btn--active::before {
    opacity: 0 !important;
}


</style>