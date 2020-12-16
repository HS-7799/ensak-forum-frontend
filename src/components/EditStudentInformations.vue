<template>
    <v-card
    max-width="450"
    class="mx-auto my-2"
  >
    
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <h2 style="text-align:center" >Student informations</h2>
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

          <v-select
            v-model="level"
            :items="levels"
            item-value="id"
            item-text="label"
            label="Level"
          ></v-select>
          <v-select
            v-model="speciality"
            :items="specialities"
            item-value="id"
            item-text="label"
            label="Speciality"
          ></v-select>
            
          <v-textarea
              clearable
              clear-icon="mdi-close"
              label="About you"
              v-model="description"
            ></v-textarea>

          <v-file-input
              v-model="files"
              placeholder="Upload your resume"
              label="Resume"
              multiple
              prepend-icon="mdi-paperclip"
          >
              <template v-slot:selection="{ text }">
                <v-chip
                  small
                  label
                  color="primary"
                >
                  {{ text }}
                </v-chip>
              </template>
          </v-file-input>


            

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
import { mapGetters } from 'vuex'
export default {

    props : ['id'],
    data()
    {
        return {
            valid : true,
            isLoading : false,
            errors : [],
            level : null,
            speciality : null,
            description : '',
            address : '',
            phone : '',
            files : [],
        }
    },
    created()
    {

      this.$store.dispatch('getLevels')
      this.$store.dispatch('getSpecialities')
    },
    methods : {
        submit()
        {
          console.log(this.files);   
          console.log(this.description);   
          console.log(this.level);   
          console.log(this.speciality);   
        }
    },
    computed : {
      ...mapGetters({
        levels : 'getLevels',
        specialities : 'getSpecialities'
      })
    }

}
</script>

<style>

</style>