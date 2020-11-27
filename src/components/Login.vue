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
      <v-form id="login" >
        <v-text-field
            v-model="email"
            class="mt-5"
            :error-messages="emailErrors"
            label="Email"
            solo
            required
            @blur="$v.email.$touch()"
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
      </v-form>

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
import {email, maxLength, required} from 'vuelidate/lib/validators'
import { auth } from "@/db";

export default {

  mixins: [validationMixin],

  validations: {
    email: { required, email, maxLength : maxLength(100) },
    password:{required , maxLength : maxLength(50)},
  },

  data() {
    return {
      password:'',
      mensajeError : 'Error inesperado, inténtelo más tarde',
      submitError : false,
      email: '',
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
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('El e-mail debe ser válido')
      !this.$v.email.required && errors.push('El e-mail es obligatorio')
      !this.$v.email.maxLength && errors.push('El e-mail debe tener maximo 100 caracteres')
      return errors
    },
  },

  methods: {
    async submit () {
      auth.signInWithEmailAndPassword(this.email, this.password).then( async () => {
        this.loading = false;
        await this.$router.push('/Home');
      }).catch( err => {
        this.mensajeError = err.message;
        this.loading = false;
        this.submitError = true;
        this.clear();
      })

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
