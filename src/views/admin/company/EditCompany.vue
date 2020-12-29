<template>
    <div>{{ $route.name }}</div>
</template>

<script>
import axios from 'axios'
import AuthHeader from '../../../services/auth-header'
export default {

    created()
    {
        
        const API_URL = "http://localhost:8080/api/"

        axios.get(API_URL + `companies/${this.$route.params.id}`,{headers : AuthHeader()})
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