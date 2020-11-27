<template>
  <div>
    <v-row>
      <v-app-bar width="100%" height="70%" color="black" app>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="1">
            <v-btn icon router :to="home_link">
              <v-img max-width="35%" contain src="../../assets/favicon.png"/>
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>

          <v-spacer></v-spacer>
          <v-col cols="1">
            <v-btn text style="alignment: center;color: white" router :to="home_link">Home</v-btn>
          </v-col>
          <v-col cols="1">
            <v-btn left text style="alignment: center;color: white" router :to="explorar_link">Explorar</v-btn>
          </v-col>
          <v-col cols="1">
            <v-btn text style="alignment: center;color: white" router :to="network_link">Network</v-btn>
          </v-col>
          <v-col cols="1">
            <v-btn text style="alignment: bottom;color: white" router :to="mensajes_link">Mensajes</v-btn>
          </v-col>
          <v-col cols="1">
            <v-btn icon large style="alignment: center"><v-icon color="white">mdi-bell</v-icon></v-btn>

            <v-btn icon router :to="perfil_link">
            <v-img max-width="50%" src="../../assets/profilePic.png" contain/>
            </v-btn>
          </v-col>
        </v-row>
      </v-app-bar>
    </v-row>

  </div>
</template>

<script>
export default {
    data() {
        return {
          home_link: '/Home',
          explorar_link: '/Explorar',
          network_link: '/Network',
          mensajes_link: '/Mensajes',
          perfil_link: '/Perfil',
          loggedIn: true,
          onProfileScreen: false,
        }
    }
}
</script>

<style scoped>
#inProfile{
  color: white;
  background: orange;
}
 {
  color: white;
}

</style>
