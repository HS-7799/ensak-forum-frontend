<template>
    <v-card
    max-width="700"
  >
    
    <v-container>
      <v-row dense>
        <v-col cols="12">
            
          <h2>Upload resume</h2>
          <v-alert type="error" v-if="errors1.length > 0" >
            <ul v-for="error in errors1" :key="error" >
              <li>{{ error }}</li>
            </ul>
          </v-alert>
        <v-form 
            @submit.prevent="submit"
            ref="form"
        > 
         <v-file-input
            v-model="file"
            placeholder="Upload your resume"
            label="Resume"
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
import axios from 'axios'
import AuthHeader from '../services/auth-header';

export default {

    props : ['id','userId'],
    data()
    {
        return {
           
            isLoading : false,
            errors1: [],
            file_download_uri : '',
            file : null,
            cv_name : '',
        }
    },
    created()
    {
      if(this.id !== null)
      {
          axios.get(`/file/${this.id}`,{headers : AuthHeader()}) 
          .then((res1) => {
            this.file = new File(["foo"], res1.data.fileName, {
                        type: res1.data.fileType,
                        });
            })
      }
    },
    computed :{
        valid(){
            return this.file ? true : false
        },
    },
    methods : {
        
        submit()
        {
            if(this.valid)
            {
                this.isLoading=true
                let file = this.file;
                let form = new FormData(); 
                form.append('file', file);
                axios.post('/uploadFile',form,{headers : AuthHeader()})
                .then((res)=> { 
                    this.errors1 = []
                        this.file_download_uri=res.data
                        const form1 = {
                        fileDownloadUri : res.data
                        } 
                        axios.post(`/api/students/resume/${this.id}`,form1,{headers : AuthHeader()})
                        .then(() => {
                        this.isLoading = false
                        this.$store.dispatch('setShowSnack',true)
                        this.$store.dispatch('setSnackMessage','Resume is updated successfully')
                        })
                        .catch(() => {
                            this.isLoading = false
                        });
                })
                .catch((err) => {
                        this.isLoading = false
                        this.errors1 = err.response.data.message.split(',')
                });
            } 
        }  
    },
}
</script>

<style>

</style>