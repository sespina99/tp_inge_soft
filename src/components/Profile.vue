<template>
<div>
<div id="profile-border" >
    <v-row style="margin:0 0 20px 0;">
        <v-icon left color="black" x-large>mdi-account-circle</v-icon>
        <h1 class="tituloSeccion">Mi Perfil</h1>
    </v-row>
    <p><b>Usuario:</b> {{currentUser.usuario}}</p>
    <p><b>Nombre:</b> {{currentUser.nombre}}</p>
    <p><b>Email:</b> {{currentUser.email}}</p>
    <p><b>Género:</b> {{currentUser.genero}}</p>
    <p><b>Fecha de nacimiento:</b> {{currentUser.nacimiento}}</p>
    <p><b>Meta:</b> {{currentUser.meta}}</p>
    <p><b>Peso:</b> {{currentUser.peso}}</p>
    <p><b>Altura:</b> {{currentUser.altura}}</p>
</div>
<v-btn id="boton-editar" router :to="edit_link" x-large rounded>
    <v-icon left>mdi-pencil</v-icon>
    <span>Editar Perfil</span>
</v-btn>
  <v-container>
  <v-btn id="boton-borrar" @click="closeSession()" x-large rounded color="red">
    <span>Cerrar Sesion</span>
  </v-btn>
  </v-container>
</div>
</template>

<script>
import UserStore from "@/store/UserStore";


export default {
    data() {
        return {
           edit_link: '/EditarPerfil',

           currentUser: {
               usuario: '',
               nombre: '',
               genero: '',
               nacimiento: '',
               peso: '-',
               altura: '-',
               email: '',
               meta: '',
           },

           weighting: undefined,
        }
    },

    async created(){
            var user = UserStore.getCurrentUser();
            this.currentUser.usuario = user.username;
            this.currentUser.email = user.email;
            this.currentUser.nombre = user.fullName;
            this.currentUser.meta = user.phone; //La guardamos en phone
            var dateObj = new Date(user.birthdate);
            this.currentUser.nacimiento = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth()+1) + '-' + dateObj.getUTCDate();
            switch (user.gender) {
                case 'male':
                    this.currentUser.genero = 'Hombre' 
                    break;
                case 'female':
                    this.currentUser.genero = 'Mujer'
                    break;
                default:
                    this.currentUser.genero = 'Otro'
                    break;
            }

            this.weighting = await UserStore.getWeighting();    //Vale 0.1 si nunca lo cargó
            if (this.weighting.height != 0.1)
                this.currentUser.altura = this.weighting.height;
            if (this.weighting.weight != 0.1)
                this.currentUser.peso = this.weighting.weight;
    },

    methods: {
      async closeSession() {
        await UserStore.logoutUser();
        await this.$router.push('/');
      }
    },
}
</script>

<style scoped>
#profile-border{
    margin: 2% 20%;
    border: thick solid #E78200;
    border-radius: 25px;
    padding: 1% 10%;
}

#boton-editar{
    margin: 0 35% 0 35%;
    width: 30%;
    min-width: fit-content;
    color: white;
    background: #E78200;
}

#boton-borrar{
  margin: 0 35% 0 35%;
  width: 30%;
  min-width: fit-content;
  color: white;
  background: red;
}

</style>
