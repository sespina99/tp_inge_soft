<template>
  <div>
    <v-footer color="black" flat absolute>
      <v-spacer></v-spacer>
      <span class="font-weight-red" >© Copyright 2020 TuneIn</span>
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