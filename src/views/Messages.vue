<template>
  <v-row style="width:80%" class="mx-auto mt-2" >
    <v-col cols="12" md="4" >
      <v-card>
        <v-card-title>
          Messages
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height : 500px" >
          
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="8" >
      <v-card>
        <v-card-text style="height : 564px">
          <div style="text-align:center" >
            <img src="@/assets/massage-icon.jpg" alt="" width="50%">
            <p>When a company contacts you, messages are displayed here.</p>
            <v-btn text color="primary" :to="{name : 'Posts'}" >Search job</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {

  created()
  {
    if(!this.$store.getters.getLoggedIn)
    {
      this.$router.push({name : 'Login'})
    }
  }

}
</script>

<style>

</style>