<template>
    <v-carousel>
    
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    >

    <!-- <v-container>
      <v-row>
        <v-col cols="12" style="position:absolute;left:10%;top:200px;" >
          <h1 style="color : #4BBAFC" >Forum ensak entreprise</h1>
          <p style="text-align:justify" >
            {{ item.body }}
          </p>
          <v-btn tile color="#4BBAFC" href="#about">About</v-btn>
        </v-col>
      </v-row>
    </v-container> -->
    
    </v-carousel-item>
  </v-carousel>
</template>


<script>
  export default {
    data () {
      return {
        items: [
          
          { id: 1, src: require('@/assets/ensak1.jpg'), title: 'Title 1',body : 'body 1'},
          { id: 2, src: require('@/assets/ensak2.jpg'), title: 'Title 2',body : 'body 2'},
          
        ],
      }
    },
  }
</script>