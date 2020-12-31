<template>
    <v-carousel cycle height="310" hide-delimiter-background show-arrows-on-hover>
          <v-carousel-item v-for="post in posts" :key="post.id">
            <v-sheet color="white" style="padding:5px 20px;" height="100%">
              <v-row class="fill-height" align="center" justify="center">
                <div class="display-3">
                    <v-card class="white black--text"
                      @click="goToPost(post.id)"
                      style="cursor:pointer" >
                        <v-card-title>{{post.title}}</v-card-title>
                        <v-card-text style="color : inherit;">
                            <p id="card-text" >
                            {{ post.body }}
                            </p>
                        </v-card-text>
                    </v-card>
                </div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
    </v-carousel>
</template>

<script>
export default {
    
    props : ['posts'],
    methods : {
        goToPost(id)
        {console.log(id);
                  this.$router.push({name : 'Post',params : { id, }})

        }
    }
    
}
</script>

