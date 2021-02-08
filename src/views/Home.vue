<template>
  <div>
    <app-carousel></app-carousel>
      <v-row class="my-16 py-16 px-10 ">
        <v-col cols="12" md="6" >
          <v-img src="@/assets/landing/online_cv.svg" />
        </v-col>
        <v-col cols="12" md="6" >
          <div class="img-details mx-sm-auto" min-width="250px" >
              <h1 class="my-2 display-3 font-weight-bold" >Online cv</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti quae corporis distinctio, qui repudiandae, perspiciatis tempore atque eum aliquam non molestiae dolor similique quia quam recusandae dolores nostrum voluptatum officiis.</p>
          </div>
        </v-col>
      </v-row>
      <div id="middle">
        <svg class="wave-1hkxOo" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none"><path class="wavePath-haxJK1" d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z" fill="currentColor"></path></svg>
        <v-row class="row py-16 px-10">
        <v-col cols="12" md="6" >
          <v-img src="@/assets/landing/job_offers.svg" />
        </v-col>
        <v-col cols="12" md="6" >
          <div class="img-details mx-sm-auto" min-width="250px" >
              <h1 class="my-2 display-3 font-weight-bold" >
                Job offers
              </h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti quae corporis distinctio, qui repudiandae, perspiciatis tempore atque eum aliquam non molestiae dolor similique quia quam recusandae dolores nostrum voluptatum officiis.</p>
          </div>
        </v-col>
      </v-row>
      </div>
      <v-row class="my-16 py-16 px-5">
        <v-col cols="12" md="6" >
          <v-img src="@/assets/landing/get_hire.svg" />
        </v-col>
        <v-col cols="12" md="6" >
          <div class="img-details mx-sm-auto" min-width="250px" >
              <h1 class="my-2 display-3 font-weight-bold" >
                Get hired
              </h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti quae corporis distinctio, qui repudiandae, perspiciatis tempore atque eum aliquam non molestiae dolor similique quia quam recusandae dolores nostrum voluptatum officiis.</p>
          </div>
        </v-col>
      </v-row>
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

.img-details
{
  /* width: 350px; */
  padding: 5px 10px;
  line-height: 1.8;
  font-size: 18px;
}

#middle svg
{
  color: orange;
  top: 7px;
  position: relative;
}
#middle .row
{
  color: white;
  display: flex;
  flex-direction: row-reverse;
  background-color: orange;

}
</style>
