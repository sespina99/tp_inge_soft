<template>
  <div id="Fondo">
    <v-btn icon id='back' @click="$router.go(-1)" >
      <v-icon color="black" x-large> mdi-arrow-left </v-icon>
    </v-btn>
    <v-container>
      <v-img id="imgLogo" class="mx-auto" src="../assets/favicon.png"  max-width="11%" height="20%"></v-img>
    </v-container>
    <v-card class="mx-auto transparent" max-width="40%" flat>
      <form v-if="!submitted" style="margin: 2%;" id="registerform">
        <v-alert
            prominent
            max-width="50%"
            class="mx-auto"
            v-if="submitError"
            color="red"
            icon="mdi-account"
            type="error" >
          <v-row align="center">
            <v-col>
              {{ mensajeAlertForm}}
            </v-col>
            <v-col class="shrink">
              <v-btn @click="submitError = !submitError">Aceptar</v-btn>
            </v-col>
          </v-row>
        </v-alert>
        <v-text-field
            v-model="username"
            :error-messages="usernameErrors"
            label="Nombre de usuario"
            solo
            required
            @input="$v.username.$touch()"
            @blur="$v.username.$touch()"
        ></v-text-field>
        <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            label="E-mail"
            solo
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
        ></v-text-field>
        <v-text-field
            v-model="password"
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
        <v-text-field
            v-model="confirmationPassword"
            :error-messages="confirmationPasswordErrors"
            :append-icon="showConfPass ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showConfPass ? 'text' : 'password'"
            @click:append="showConfPass = !showConfPass"
            label="Confirmación contraseña"
            solo
            required
            @input="$v.confirmationPassword.$touch()"
            @blur="$v.confirmationPassword.$touch()"
        ></v-text-field>
        <v-checkbox
            v-model="checkbox"
            :error-messages="checkboxErrors"
            class="black--text orangeElement"
            label="Confirmo que estos son mis datos"
            required
            color="#4AD5E1"
            @change="$v.checkbox.$touch()"
            @blur="$v.checkbox.$touch()"
        ></v-checkbox>
      </form>
    </v-card>

    <v-alert
        prominent
        v-if="submitted"
        max-width="30%"
        class="mx-auto"
        v-bind:color="sendVerificationError? 'red' : 'green' "
        icon="mdi-information"
        type="success" >
      <v-row align="center">
        <v-col>
          {{ mensajeAlertSubmitted}}
        </v-col>
      </v-row>
    </v-alert>

    <v-container v-if="loading" class="text-center" >
      <v-progress-circular
          :size="50"
          color="#E78200"
          indeterminate
      ></v-progress-circular>
    </v-container>

    <v-container v-if="submitted" class="text-center btnSubmitted">
      <v-btn class="white--text orangeElement btnSubmitted" router to="/" large width="40%" >
        Login
      </v-btn>
    </v-container>
    <v-container v-if="submitted" class="text-center">
      <v-btn class="white--text orangeElement" @click="resendVerification" large width="40%">
        Reenviar verificacion
      </v-btn>
    </v-container>

    <v-container v-if="!submitted" class="text-center">
      <v-btn style="background-color:  #4AD5E1;color: white" @click="submit" large width="40%" >
        Registrarse
      </v-btn>
    </v-container>
    <v-container v-if="!submitted" class="text-center">
      <v-btn style="background-color: #36D876;color: white" @click="clear" large width="40%">
        Borrar
      </v-btn>
    </v-container>
  </div>
</template>


<script>
import { validationMixin } from 'vuelidate'
import { required, email, sameAs, maxLength} from 'vuelidate/lib/validators'
import { auth } from '@/db'

export default {
  mixins: [validationMixin],

  validations: {
    username : {required, maxLength : maxLength(100)},
    password:{required, maxLength : maxLength(50)},
    confirmationPassword:{required,sameAsPassword: sameAs('password'), maxLength : maxLength(50)},
    email: { required, email, maxLength : maxLength(100) },
    checkbox: {
      checked (val) {
        return val
      },
    },
  },

  data: () => ({
    username: '',
    password:'',
    mensajeAlertForm: '',
    mensajeAlertSubmitted: 'Se ha enviado el mail de verificacion a su casilla',
    sendVerificationError : false,
    submitError : false,
    submitted : false,
    confirmationPassword:'',
    email: '',
    checkbox: false,
    menu: false,
    showPass : false,
    showConfPass : false,
    loading : false,

  }),
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
  },

  computed: {
    checkboxErrors () {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.checked && errors.push('Debe confirmar para continuar!')
      return errors
    },
    usernameErrors () {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.required && errors.push('El nombre y apellido es obligatorio')
      !this.$v.username.maxLength && errors.push('El nombre y apellido debe tener maximo 100 caracteres')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('La contraseña es obligatoria')
      !this.$v.password.maxLength && errors.push('La contraseña debe tener maximo 50 caracteres')
      return errors
    },
    confirmationPasswordErrors () {
      const errors = []
      if (!this.$v.confirmationPassword.$dirty) return errors
      !this.$v.confirmationPassword.required && errors.push('La confirmación de la contraseña es obligatoria')
      !this.$v.confirmationPassword.sameAsPassword && errors.push('La confirmación no es igual a la contraseña')
      !this.$v.confirmationPassword.maxLength && errors.push('La confinrmacion de la contraseña debe tener maximo 50 caracteres')
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
      this.$v.$touch();
      if ( !this.$v.$invalid) {
        auth.createUserWithEmailAndPassword(this.email, this.password).then(cred => {
          cred.user.updateProfile({
            displayName: this.username
          }).then(async () => {
            await this.$router.push('/Home');
          })
        }).catch(err => {
          this.mensajeError = err.message;
          this.loading = false;
          this.submitError = true;
          this.clear();
        })
      }
    },
    async resendVerification(){
    },
    clear () {
      this.$v.reset();
      this.username = '';
      this.email = '';
      this.password = '';
      this.confirmationPassword = '';
      this.checkbox = '';
    }
  },
}
</script>

<style scoped>

#imgLogo{
  margin: 0 auto;
}

.btnSubmitted{
  width: 100%;
}

#submittedElems{
  width: 50%;
  margin-left: 25%;
  margin-right: 25%;
}


#Fondo{
  background-image: url('https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/NL0L5N5Rgimkt8edi/videoblocks-a-repetition-a-young-group-of-people-playing-rock-music-and-talking-while-it_bjmcpoc92v_thumbnail-1080_01.png');
  background-size: 100% 100%;
  width: 100%;
  min-height: 100vh;
}


.black--text /deep/ label {
  color: black;
}

#back{
  margin: 1% 0 0 1%;
}


</style>