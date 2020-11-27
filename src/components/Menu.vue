<template>
  <div>
    <v-row>
    <v-toolbar width="100%">
      <v-row>
          <v-spacer></v-spacer>
            <v-col cols="2">
            <v-btn text x-large router :to="home_link" v-bind:id="onHomeScreen? 'pressedButton' : 'default' " >Home</v-btn>
            </v-col>
          <v-col cols="2">
            <v-menu offset-y rounded>
              <template v-slot:activator="{on,attrs}">
                <v-btn text x-large v-bind="attrs" v-on="on" v-bind:id="onRoutinesScreen? 'pressedButton' : 'default' ">
                  <span>Rutinas</span>
                  <v-icon right color="black">mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item route :to="misRutinas_link">Mis Rutinas</v-list-item>
                <v-list-item route :to="crearRutina_link">Crear</v-list-item>
                <v-list-item router :to="explorar_link">Explorar</v-list-item>
                <v-list-item router :to="favoritos_link">Favoritos</v-list-item>
              </v-list>
            </v-menu>
          </v-col>
          <v-col cols="2">
              <v-menu offset-y rounded>
              <template v-slot:activator="{on,attrs}">
                <v-btn text x-large v-bind="attrs" v-on="on" v-bind:id="onExerciseScreen? 'pressedButton' : 'default' ">
                  <span>Ejercicios</span>
                  <v-icon right color="black">mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item router :to="misEjercicios_link" >Mis Ejercicios</v-list-item>
                <v-list-item router :to="crearEjercicio_link">Crear</v-list-item>
              </v-list>
            </v-menu>
          </v-col>
          <v-col cols="2">
            <v-menu offset-y rounded>
              <template v-slot:activator="{on,attrs}">
                <v-btn text x-large v-bind="attrs" v-on="on" v-bind:id="onHelpScreen? 'pressedButton' : 'default' ">
                  <span>Más Opciones</span>
                  <v-icon right color="black">mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item router :to="acercaDeNosotros_link">Acerca de nosotros</v-list-item>
                <v-list-item router :to="ayuda_link">Ayuda</v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-toolbar>
    </v-row>

  </div>
</template>

<script>
export default {
  data(){
    return {
      name: 'Menu',
      home_link: '/Home',
      explorar_link: '/Rutinas/Explorar',
      misRutinas_link: '/Rutinas/MisRutinas',
      crearRutina_link: '/Rutinas/Crear',
      favoritos_link: '/Rutinas/Favoritos',
      misEjercicios_link: '/Ejercicios/MisEjercicios',
      crearEjercicio_link: '/Ejercicios/Crear',
      acercaDeNosotros_link: '/MasOpciones/AcercaDeNosotros',
      ayuda_link: '/MasOpciones/Ayuda',
      onHomeScreen: this.$route.path === '/Home',
      onRoutinesScreen: this.$route.path.includes('/Rutinas'),
      onExerciseScreen: this.$route.path.includes('/Ejercicios'),
      onHelpScreen: this.$route.path.includes('/MasOpciones'),
    }
  }

}
</script>

<style scoped>
#pressedButton{
  color: #E78200;
}

</style>