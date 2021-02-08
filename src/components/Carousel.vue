<template>
    <v-carousel  id="carousel">
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
      <!-- <div id="carousel-content" >
        <h1 class="font-weight-bold" >lieu pour discuter</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam tenetur aliquam sit omnis incidunt! Iure quos placeat nisi sint cum, ipsam minus tempore quasi et laborum quod ut, excepturi eligendi.
        </p>
      </div> -->
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

<style scoped>
#carousel
{
  position: relative;
}
#carousel-content
{
  position: absolute;
  color: orange;
  line-height: 1.8;
  /* min-width: 200px; */
  left: 50%;
  top: 50%;
  font-size: 18px;
  transform: translate(-50%,-50%);
}

#carousel-content h1
{
  text-align: center;
  color: #6c63ff;

}

</style>