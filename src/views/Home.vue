<template>
  <div>
    <app-carousel></app-carousel>
    <v-card width="80%" class="mx-auto my-5" >
       <v-container>
         <v-row class="text-center" id="about">
            <v-col cols="12">
              <h3 style="color: #4BBAFC" >About</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, cum sed. In, vitae officia sed nesciunt sint distinctio eligendi error voluptas repellendus nostrum eius deserunt minima officiis recusandae quis tempore.</p>
          
            </v-col>
          </v-row>
       </v-container>
    </v-card>
  </div>

</template>

<script>
import Carousel from '../components/Carousel';
export default {

  components : {
    appCarousel : Carousel
  }
  
}
</script>

<style scoped>

#about
{
  padding: 50px;
}

body
{
  scroll-behavior: smooth;
}

</style>
