<template>
  <div id="LoginView">
    <login></login>
  </div>
</template>

<script>

import Login from '../components/Login'

export default {
    components: {
        'login': Login,
    },

    data() {
        return {  
        }
    }
}
</script>

<style scoped>
  #LoginView{
     width: 100%;
     height: 100%;
  }
</style>