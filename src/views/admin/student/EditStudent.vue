<template>
    <div>{{ $route.name }}</div>
</template>

<script>
import axios from 'axios';
export default {

    created()
    {
        
        const API_URL = "http://localhost:8080/api/"

        axios.get(API_URL + `students/${this.$route.params.id}`)
        .then((res) => {
            console.log(res.data);
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