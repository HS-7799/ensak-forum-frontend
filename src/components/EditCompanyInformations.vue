<template>
    <v-card
    max-width="450"
    class="mx-auto my-2"
  >
    
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <h2 style="text-align:center" >Company informations</h2>
          <v-alert type="error" v-if="errors.length > 0" >
            <ul v-for="error in errors" :key="error" >
              <li>{{ error }}</li>
            </ul>
          </v-alert>
        <v-form
            @submit.prevent="submit"
            ref="form"
            v-model="valid"
        >

            <v-textarea
              clearable
              auto-grow
              clear-icon="mdi-close"
              label="Activity area"
              v-model="activiy"
            ></v-textarea>
          <v-textarea
              clearable
              clear-icon="mdi-close"
              label="About you"
              v-model="description"
            ></v-textarea>

          

            

        <v-btn
            :disabled="!valid"
            :loading="isLoading"
            color="primary"
            class="mr-4"
            @click="submit"
        >
            Update
        </v-btn>

            </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {

    props : ['id'],
    data()
    {
        return {
            valid : true,
            isLoading : false,
            errors : [],
            description : '',
            activiy : ''
        }
    },
    methods : {
        submit()
        {
          alert('submiited')
        }
    },
    

}
</script>

<style>

</style>