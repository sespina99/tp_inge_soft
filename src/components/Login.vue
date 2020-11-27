<template>
  <div id="Fondo">
    <v-img id="imgLogo" class="mx-auto" src="../assets/favicon.png"  max-width="11%" height="20%"></v-img>
    <v-alert
        prominent
        max-width="30%"
        class="mx-auto"
        v-if="submitError"
        color="red"
        icon="mdi-account"
        type="error" >
      <v-row align="center">
        <v-col>
          {{ mensajeError}}
        </v-col>
        <v-col class="shrink">
          <v-btn @click="submitError = !submitError">Aceptar</v-btn>
        </v-col>
      </v-row>
    </v-alert>
    <v-card class="mx-auto loginEntry transparent" max-width="45%" flat>
        <v-text-field
         v-model="username"
         class="mt-5"
         :error-messages="userNameErrors"
         label="Usuario"
         solo
         required
         @blur="$v.username.$touch()"
    ></v-text-field>
    <v-text-field
         v-model="password"
         class="mt-5"
         :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
         :type="showPass ? 'text' : 'password'"
         @click:append="showPass = !showPass"
         :error-messages="passwordErrors"
         label="Contraseña"
         solo
         required
         @input="$v.password.$touch()"
         @blur="$v.password.$touch()"
    ></v-text-field>
    <v-container class="text-right">
          <a id="OlvCont" href="/OlvideContraseña" >¿Olvidaste tu contraseña?</a>
    </v-container>
      <v-container v-if="loading" class="text-center" >
        <v-progress-circular
            :size="50"
            color="#4AD5E1"
            indeterminate
        ></v-progress-circular>
      </v-container>
      <v-container class="text-center">
    <v-btn style="background-color:  #4AD5E1;color: white" @click="submit" x-large width="60%">
        Ingresar
    </v-btn>
    </v-container>
    <v-container class="text-center">
    <v-btn style="background-color:  #36D876;color: white" class="btn" text router :to="register_link" >
<!--        <u>Registrarse</u>-->
      Registrarse
    </v-btn>
    </v-container>
    </v-card>
  </div>

</template>

<script>
import { validationMixin } from 'vuelidate'
import {maxLength, required} from 'vuelidate/lib/validators'
import UserStore from "@/store/UserStore"

export default {

  mixins: [validationMixin],

  validations: {
    username: {required, maxLength : maxLength(50)},
    password:{required , maxLength : maxLength(50)},
  },

  data() {
    return {
      password:'',
      mensajeError : 'Error inesperado, inténtelo más tarde',
      submitError : false,
      username: '',
      showPass : false,
      rules: {
        required: value => !!value || 'Obligatorio.',
      },

      register_link: '/Registro',
      loading: false,
    }
  },

  computed: {
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('La contraseña es obligatoria')
      !this.$v.password.maxLength && errors.push('La contraseña debe tener maximo 50 caracteres')
      return errors
    },
    userNameErrors () {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.required && errors.push('El usuario es obligatorio')
      !this.$v.username.maxLength && errors.push('El usuario debe tener maximo 50 caracteres')

      return errors
    },
  },

  methods: {
    async submit () {
      this.$v.$touch()
      if (!this.$v.$invalid){
        this.loading = true;
        const result = await UserStore.validateUser(this.username, this.password);
        if (result == -1){      //-1 es éxito pues no es un código de error válido
          this.loading = false;
          await UserStore.updateCurrentUser();
          await this.$router.push('/Home');
        }
        else{
          switch (result) {
                case 4:
                    this.mensajeError = 'La combinación usuario-contraseña es inválida' 
                    break;
                case 8:
                    this.mensajeError = 'Primero debe verificar su cuenta, revise su correo electrónico'
                    break;
                default:
                    this.mensajeError = 'Error inesperado, inténtelo más tarde'
                    break;
            }
          this.loading = false;
          this.submitError=true;
          this.clear();
        }
      }
    },
    clear () {
      this.$v.$reset()
      this.username = ''
      this.password=''
    },
  },
}
</script>

<style scoped>

#imgLogo{
  margin: 0 auto;
}


#OlvCont{
  background-color: white;
}

#Fondo{
  background-image: url('https://vistapointe.net/images/talking-heads-3.jpg');
  width: 100%;
  height: 100%;
  background-position: center top;
}


.btnRegistrarse {
    text-transform: none;
}
.loginEntry{
  margin-top: 5%;
}
</style>
