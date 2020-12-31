<template>
  <v-footer
    class="mt-3"
    dark
    padless
  >
    <v-card
    width="100%"
      flat
      tile
      class="blue-grey darken-4 text-center"
    >
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class=" pt-0">
        
          ENSAK Entreprise forum - All right are reserverd
        
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text>
        {{ new Date().getFullYear() }} — <strong>FORUM ensak entreprise</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
  }
</script>