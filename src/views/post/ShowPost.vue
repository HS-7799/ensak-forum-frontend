<template>
  <div>
    {{ post.title }}
    <p>{{ post.body }}</p>
  </div>
</template>

<script>
import axios from 'axios'
export default {

  data()
  {
    return {
      post : {}
    }
  },
  created()
  {
    axios.get(`http://localhost:8080/api/posts/${this.$route.params.id}`)
    .then((res) => {
      this.post = res.data
    }).catch((err) => {
      if(err.response.status === 404)
      {
        this.$router.push('/notFound')
      }
    });
  }

}
</script>

<style>

</style>