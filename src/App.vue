<template>
  <v-app>
      <template v-if="!pageForAdmin" >
        <app-header></app-header>
        <v-main class="main" >
          <router-view></router-view>
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
import Header from './components/Header'
import Footer from './components/Footer'
import User from './Helpers/User'
export default {
  name: 'App',
  mounted () {
    this.$Progress.finish()
  },
  created () {
    const username = this.$store.getters.getUserName
    this.$Progress.start()
    this.$router.beforeEach((to, from, next) => {

      const publicRoutes = ['/login','/register','/']
      
      if(!User.loggedIn(username) && !publicRoutes.includes(to.path))
      {
        console.log('');
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
  },
  computed:{
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