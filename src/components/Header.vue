<template>
  <div>
    <v-app-bar color="black" height="70%">
      <v-col cols = 1>
        <v-btn icon router :to="home_link" >
          <v-img alt="JIBS logo" src="../assets/logo.png" max-width="35%" />
        </v-btn>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols=2>
        <v-btn v-bind:id="onProfileScreen?'inProfile':'notInProfile'" rounded min-width=fit-content width=100% router :to="link_profile" large>
          <v-icon left>mdi-account-circle</v-icon>
          <span class="font-weight-black">{{currentUsername}}</span>
        </v-btn>
      </v-col>
    </v-app-bar>
  </div>
</template>

<script>
import UserStore from "@/store/UserStore";

export default {
  data() {
    return {
      link_profile: '/Perfil',
      link_login: '/',
      home_link: '/Home',
      currentUsername: '',

      onProfileScreen: this.$route.path === '/Perfil',  //No funciona con link_profile aunque son el mismo string, debe tener un caracter raro al final
    }
  },

  created(){
    this.currentUsername = UserStore.getCurrentUser().username;
  },

}
</script>

<style scoped>
#inProfile{
  color: white;
  background: #E78200;
}

.btn{
  margin-right: 75%;
}

</style>