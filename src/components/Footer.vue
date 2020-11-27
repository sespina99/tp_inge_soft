<template>
  <div>
    <v-footer color="black" flat app>
      <v-spacer></v-spacer>
      <span class="font-weight-red" >© Copyright 2020 Jibs</span>
      <v-spacer></v-spacer>
    </v-footer>
  </div>

</template>

<script>
export default {
  data() {
    return {
      loggedIn: true
    }
  }
}
</script>

<style scoped>

span {
  display: block;
  color: white;
}

</style>