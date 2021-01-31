<template>
    <div>
        <v-snackbar
          v-model="snackbar"
          :timeout="timeout"
           :color="$store.getters.getColorSnack"
          absolute
          right 
          top
          style="top:7%"
        >
          {{ $store.getters.getSnackMessage }}
        </v-snackbar>
    </div>
</template>


<script>
export default {
    data: () => ({
      snackbar: true,
      timeout: 2000
    }),
    
    
}
</script>