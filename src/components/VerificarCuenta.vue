<template>
<div id="verify-border" class="tituloSeccion">
    <h1 >Verificación de cuenta</h1>
    <v-img alt="JIBS logo" style="margin: 5% 35% 5% 35%; width: 30%;" src="../assets/logo.png"/>
    <v-alert
        max-width="50%"
        class="mx-auto"
        v-if="submitError"
        color="red"
        icon="mdi-account"
        type="error"
    >
      {{mensajeError}}
    </v-alert>
    <v-container v-if="loading" class="text-center" >
      <v-progress-circular
          :size="50"
          color="#E78200"
          indeterminate
      ></v-progress-circular>
    </v-container>
    <v-container>
      <h3 v-if=verified style="margin: 5% 5%;">
        La cuenta fue verificada con éxito ¡Estás listo para empezar!
      </h3>
      <v-btn v-if=verified class="white--text text-center orangeElement" router :to=login_link large width="60%">
          Empezar la experiencia
      </v-btn>
    </v-container>
</div>
</template>

<script>
import UserStore from '@/store/UserStore'

export default {

    data() {
        return {
            login_link: "/",
            verified: false,
            loading : false,
            mensajeError: 'No se pudo verificar la cuenta correctamente, inténtelo más tarde',
            submitError: false,

            email: '',
            codigo: '',
        }
    },

    created(){
        this.loading = true;
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        this.email = urlParams.get('email')
        this.codigo = urlParams.get('code')
        this.verify()
    },

    methods: {
        async verify () {
          try{
            await UserStore.verifyUser(this.email, this.codigo)
            this.verified = true;
          }
          catch (error){
            console.log(error);
            this.submitError = true;
          }
          this.loading = false;
        },
    },
}

</script>

<style scoped>
#verify-border{
    margin: 2% 20%;
    border: thick solid #E78200;
    border-radius: 25px;
    padding: 1% 10%;
}


</style>
