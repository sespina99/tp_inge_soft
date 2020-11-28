<template>
  <div>
    <v-row>
      <v-app-bar width="100%" height="80%" color="black" app>
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
            <v-btn icon large style="alignment: center">
              <v-icon color="white">mdi-bell</v-icon>
            </v-btn>
            <v-menu
                bottom
                min-width="200px"
                rounded
                offset-y>
              <template v-slot:activator="{ on }">
                <v-btn
                    icon
                    x-large
                    v-on="on"
                >
                  <v-avatar
                      color="brown"
                      size="48"
                  >
                    <span class="white--text headline">{{ user.initials }}</span>
                  </v-avatar>
                </v-btn>
              </template>
              <v-card>
                <v-list-item-content class="justify-center">
                  <div class="mx-auto text-center">
                    <v-avatar
                        color="brown"
                    >
                      <span class="white--text headline">{{ user.initials }}</span>
                    </v-avatar>
                    <h3>{{ user.fullName }}</h3>
                    <p class="caption mt-1">
                      {{ user.email }}
                    </p>
                    <v-divider class="my-3"></v-divider>
                    <v-btn router on to="/Perfil"
                        depressed
                        rounded
                        text
                    >
                      Ver Perfil
                    </v-btn>
                    <v-divider class="my-3"></v-divider>
                    <v-btn
                        depressed
                        rounded
                        text
                    >
                      Cerrar Sesion
                    </v-btn>
                    <v-divider class="my-3"></v-divider>
                    <v-btn
                        depressed
                        rounded
                        text
                    >
                      Eliminar Cuenta
                    </v-btn>
                  </div>
                </v-list-item-content>
              </v-card>
            </v-menu>
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
      user: {
        initials: 'GD',
        fullName: 'Gaston Donikian',
        email: 'gdonikian@itba.edu.ar'
      },
      onProfileScreen: false,
    }
  }
}
</script>

<style scoped>
#inProfile {
  color: white;
  background: orange;
}

{
  color: white
;
}

</style>
