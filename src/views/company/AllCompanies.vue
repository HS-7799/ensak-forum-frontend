<template>
  <v-container>
    <h1>Companies</h1>
    <v-row v-if="companies.length > 0" >
      <v-col cols="12" md="4">
          <v-card>
            <v-card-title>Filter by</v-card-title>
            <v-card-text>
              <v-select
                  attach
                  chips
                  multiple
                  v-model="activity"
                  :items="activities"
                  item-value="id"
                  item-text="label"
                  label="Activity area"
              ></v-select>
                  
            </v-card-text>
          </v-card>
      </v-col>
      <v-col cols="12" md="8">
          <template v-if="filteredCompanies.length > 0" >
            <app-single-company v-for="company in filteredCompanies" :key="company.id" :company="company" ></app-single-company>
          </template>
          <template v-else >
            <v-card>
              <v-card-title>No companies in this activity area </v-card-title>
            </v-card>
          </template>
      </v-col>
    </v-row>
    <v-row v-else >
      <v-col cols="12">
        <v-card>
              <v-card-text>
                <div style="text-align:center" >
                  <img src="@/assets/companies.png" alt="" width="200px">
                  <p>No Companies available yet !</p>
                </div>
              </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import SingleCompany from '../../components/SingleCompany'
export default {
    data()
    {
      return {
        activity : []
      };
    },
    created()
    {
      if(!this.$store.getters.getLoggedIn)
      {
        this.$router.push({name : 'Login'})
      } else {
        this.$store.dispatch('getCompanies')
        this.$store.dispatch('getActivityareas')
      }
    },
    computed : {
      ...mapGetters({
        companies : 'getCompanies',
        id : 'getId',
        activities : 'getActivityareas'
      }),
      filteredCompanies()
      {
        return this.companies.filter(company => {
          if(this.activity.length > 0)
            return this.activity.includes(company.activityarea.id)
          else return company
        })
      }
    },
    components : {
      appSingleCompany : SingleCompany
    }
}
</script>

<style>

</style>