<template>
      <v-card id="card" @click="showPost">
        <v-list-item id="companyLogo" >
              <v-list-item-avatar size="50">
                  <img
                    src="https://www.w3schools.com/howto/img_avatar.png"
                  >
              </v-list-item-avatar>
              <v-list-item-title style="margin-top:20%" >
                <h5>{{ post.company.user.name }} - {{ post.location }}</h5>
              </v-list-item-title>
              
        </v-list-item>
        <v-card-title class="primary--text">
          <h3>{{ post.title }}</h3>
        </v-card-title>
        <v-card-text  >
          <p class="black--text" id="card-text" >
            {{ post.body }}
          </p>
          <span style="display:block">
            Published At {{ formatDate(post.createdAt) }}
          </span>
        </v-card-text>
        <v-card-actions>
          <template v-if="isEdited" >
            <v-btn icon @click="editPost" >
              <v-icon icon>
                mdi-wrench
              </v-icon>
            </v-btn>
            <v-btn icon @click.stop="$store.dispatch('deletePost',post)" >
              <v-icon icon color="red" >
                mdi-delete
              </v-icon>
            </v-btn>
          </template>
          <v-spacer></v-spacer>
          <v-btn icon color="deep-orange" title="Apply" v-if="getRoles.includes('ROLE_ETUDIANT')" >
            <v-icon>mdi-send</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props : ['post'],
  methods : {
    showPost()
    {
      this.$router.push({name : 'Post',params : { id : this.post.id }})
    },
    editPost()
    {
      this.$router.push({name : 'Edit Post',params : { id : this.post.id }})
    },
    formatDate (input) {
      var datePart = input.match(/\d+/g),
      year = datePart[0].substring(2), //get only two digits
      month = datePart[1], day = datePart[2];

      return day+'/'+month+'/'+year;
    }
  },
  computed : {
    ...mapGetters([
      'getCompanyId',
      'getRoles'
    ]),
    isEdited()
    {
      return (this.post.company.id === this.getCompanyId) || this.getRoles.includes("ROLE_ADMIN")
    }
  }


}
</script>

<style >
#card
{
  cursor: pointer;
  position:relative;
  padding: 10px;
  margin : 30px 0;
}
#card:hover
{
  box-shadow: 0px 2px 10px gray;
}
#card-text
{
  display: inline-block;
  max-height: 70px;
  overflow: hidden;
  text-overflow: ellipsis;


}
#companyLogo
{
  z-index: 10;
  position: absolute;
  left: 0;
  top: -13%;

}
</style>