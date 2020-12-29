<template>
    <v-card max-width="70%" class="mx-auto" >
          <v-card-title>
            <v-avatar color="#FFC806" class="mr-2" >
              <span class="headline" >{{ getInitials(company.user.name) }}</span>
            </v-avatar>
            {{ company.user.name }}
          </v-card-title>
          <v-card-actions>
            <v-btn
                color="orange lighten-2"
                text
                :to="{ name : 'Company' , params : { id : company.id }}"
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
                    <span v-if="company.description" >
                        {{ company.description }}
                    </span>
                    <span v-else >
                        Company without description
                    </span>
                </v-card-text>
            </div>
            </v-expand-transition>
    </v-card>
</template>

<script>
export default {

    props : ['company'],
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