<template>
  <v-container
    fluid
    style="height: 300px"
  >
    <v-row justify="center">
      <v-menu
        min-width="150px"
        rounded
        
      >
        <template v-slot:activator="{ on }">
          <v-btn
            style="padding-bottom : 10px"
            icon
            x-large
            v-on="on"
          >
            <v-avatar
              color="#FFC806"
              size="38"
            >
              <span class="black--text headline">
                  {{ initials }}
              </span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <h3>{{ fullName }}</h3>
              <p class="caption mt-1">
                {{ email }}
              </p>
              
              <template v-if="getRoles.includes('ROLE_ADMIN')" >
                  <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                text
                :to="{ name : 'Admin' }"
              >
                Dashboard
              </v-btn>
              </template>
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                text
                :to="{ name : 'Edit Profile'}"
              >
                Edit Account
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                text
                :to="{ name : 'Profile' }"
              >
                Account
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                text
                @click="logout"
              >
                Disconnect
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-row>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex'
import User from '../Helpers/User'
export default {
    computed : {
        
        ...mapGetters({
            getLoggedIn : 'getLoggedIn',
            getRoles : 'getRoles',
            initials : 'getInitials',
            fullName : 'getName',
            email : 'getEmail',
            id : 'getId',
        })
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