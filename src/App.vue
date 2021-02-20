<template>
  <v-app>
      <app-snackbar v-if="showSnackbar" ></app-snackbar>
      <template v-if="!pageForAdmin" >
        <app-header></app-header>
        <v-main class="main" >
            <router-view ></router-view>
          <vue-progress-bar></vue-progress-bar>
        </v-main>
        <app-footer></app-footer>
      </template>
      <template v-else >
        <router-view></router-view>
        <vue-progress-bar></vue-progress-bar>
      </template>
  </v-app>
</template>

<script>
import Header from './components/shared/Header'
import Footer from './components/shared/Footer'
import User from './Helpers/User'
import Snackbar from './components/shared/Snackbar.vue'
export default {
  name: 'App',
  
  mounted () {
    this.$Progress.finish()
  },
  created () {
    const username = this.$store.getters.getUserName
    this.$Progress.start()
    this.$router.beforeEach((to, from, next) => {

      const publicRoutes = ['/login','/register','/','/posts']
      
      if(!User.loggedIn(username) && !publicRoutes.includes(to.path))
      {
        //
      }

      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress
        this.$Progress.parseMeta(meta)
      }
      this.$Progress.start()
      next()
    })
    this.$router.afterEach(() => {
      this.$Progress.finish()
    })
  },
  components : {
    appHeader : Header,
    appFooter : Footer,
    appSnackbar : Snackbar
  },
  computed:{

    showSnackbar()
    {
      return this.$store.getters.getShowSnackbar
    },
    pageForAdmin()
    {
      return this.$route.name.startsWith("Admin") || this.$route.name.startsWith("Error")
    }
  }
}
</script>

<style>

.main
{
  min-height: 100vh;
  background: url("https://res.cloudinary.com/finnhvman/image/upload/v1541930411/pattern.png");

}
</style>
