<template>
    <v-card class="mb-3" >
          <v-card-title>
            <v-avatar color="#FFC806" class="mr-2" >
              <span class="headline" >{{ getInitials(student.user.name) }}</span>
            </v-avatar>
            {{ student.user.name }}
          </v-card-title>
          <v-card-actions>
            <v-btn
                color="orange lighten-2"
                text
                :to="{ name : 'Student' , params : { id : student.id } }"
            >
                Explore
            </v-btn>
            <v-spacer></v-spacer>

            <v-btn icon @click="show = !show" >
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>

          </v-card-actions>
          <v-expand-transition>
            <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                    <span v-if="student.description" >
                        {{ student.description }}
                    </span>
                    <span v-else >
                        Student without description
                    </span>
                </v-card-text>
            </div>
            </v-expand-transition>
    </v-card>
</template>

<script>
export default {

    props : ['student'],
    data()
    {
        return {
            show : false
        }
    },
    methods : {
      getInitials(name)
      {
          let initials = "";
          let i;
          let names = name.split(' ');
          for(i = 0;i<names.length;i++)
          {
              initials += names[i].charAt(i).toUpperCase()
          }
          return initials;
      }
    },

}
</script>

<style>

</style>