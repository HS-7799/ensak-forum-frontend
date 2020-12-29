<template>
  <v-container>
    <v-row>
      <v-col cols="12" v-for="company in companies" :key="company.id"  >
          <app-single-company :company="company" ></app-single-company>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import SingleCompany from '../components/SingleCompany'
export default {
    
    created()
    {
      if(!this.$store.getters.getLoggedIn)
      {
        this.$router.push({name : 'Login'})
      } else {
        this.$store.dispatch('getCompanies')
      }
    },
    computed : {
      ...mapGetters({
        companies : 'getCompanies',
        id : 'getId'
      })
    },
    components : {
      appSingleCompany : SingleCompany
    }
}
</script>

<style>

</style>