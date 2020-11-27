<template>
  <div id="Fondo">
    <v-btn icon id='back' @click="$router.go(-1)" >
      <v-icon color="black" x-large> mdi-arrow-left </v-icon>
    </v-btn>
    <v-container>
      <v-img id="imgLogo" class="mx-auto" src="../assets/favicon.png"  max-width="11%" height="20%"></v-img>
    </v-container>
    <v-card class="mx-auto transparent" max-width="40%" flat>
      <form v-if="!submitted" style="margin: 2%;">
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
        <!--<v-alert
            max-width="30%"
            class="mx-auto"
            v-if="submitError"
            color="red"
            icon="mdi-account"
            type="error"
        >
          {{mensajeAlertForm}}
        </v-alert>-->
        <v-text-field
            v-model="username"
            :error-messages="userNameErrors"
            label="Usuario"
            solo
            required
            @input="$v.username.$touch()"
            @blur="$v.username.$touch()"
        ></v-text-field>
        <v-text-field
            v-model="fullname"
            :error-messages="fullNameErrors"
            label="Nombre y apellido"
            solo
            required
            @input="$v.fullname.$touch()"
            @blur="$v.fullname.$touch()"
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
        <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            label="E-mail"
            solo
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
        ></v-text-field>
<!--        <v-select-->
<!--            v-model="genero"-->
<!--            :items="generos"-->
<!--            :error-messages="generoErrors"-->
<!--            label="Género"-->
<!--            solo-->
<!--            required-->
<!--            @change="$v.genero.$touch()"-->
<!--            @blur="$v.genero.$touch()"-->
<!--        ></v-select>-->
<!--        <v-select-->
<!--            v-model="meta"-->
<!--            :items="metas"-->
<!--            :error-messages="metaErrors"-->
<!--            label="Meta"-->
<!--            solo-->
<!--            required-->
<!--            @change="$v.meta.$touch()"-->
<!--            @blur="$v.meta.$touch()"-->
<!--        ></v-select>-->
<!--        <v-menu-->
<!--            ref="menu"-->
<!--            v-model="menu"-->
<!--            :close-on-content-click="false"-->
<!--            transition="scale-transition"-->
<!--            offset-y-->
<!--            min-width="290px"-->
<!--        >-->
<!--          <template v-slot:activator="{ on, attrs }">-->
<!--            <v-text-field-->
<!--                v-model="date"-->
<!--                :error-messages="dateErrors"-->
<!--                label="Fecha de nacimiento"-->
<!--                solo-->
<!--                append-icon="mdi-calendar"-->
<!--                readonly-->
<!--                @input="$v.date.$touch()"-->
<!--                @blur="$v.date.$touch()"-->
<!--                v-bind="attrs"-->
<!--                v-on="on"-->
<!--            ></v-text-field>-->
<!--          </template>-->
<!--          <v-date-picker-->
<!--              color="#E78200"-->
<!--              ref="picker"-->
<!--              v-model="date"-->
<!--              :max="new Date().toISOString().substr(0, 10)"-->
<!--              min="1970-01-01"-->
<!--              @change="save"-->
<!--          ></v-date-picker>-->
<!--        </v-menu>-->
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

    <!--<v-alert
        v-if="submitted"
        max-width="30%"
        class="mx-auto"
        v-bind:color="sendVerificationError? 'red' : 'green' "
        icon="mdi-information"
        type="success"
    >
      {{ mensajeAlertSubmitted }}
    </v-alert>-->

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
import UserStore from "@/store/UserStore";

export default {
  mixins: [validationMixin],

  validations: {
    username: { required, maxLength : maxLength(50) },
    fullname : {required, maxLength : maxLength(100)},
    password:{required, maxLength : maxLength(50)},
    confirmationPassword:{required,sameAsPassword: sameAs('password'), maxLength : maxLength(50)},
    email: { required, email, maxLength : maxLength(100) },
    meta: {required},
    genero: {required},
    checkbox: {
      checked (val) {
        return val
      },
    },
    date: {required},
  },

  data: () => ({
    username: '',
    fullname: '',
    password:'',
    mensajeAlertForm: '',
    mensajeAlertSubmitted: 'Se ha enviado el mail de verificacion a su casilla',
    sendVerificationError : false,
    submitError : false,
    submitted : false,
    confirmationPassword:'',
    email: '',
    genero: null,
    generos: [
      'Hombre',
      'Mujer',
      'Otro'
    ],
    meta: null,
    metas: [
      'Bajar de peso',
      'Ganar músculo',
      'Ponerse en forma',
      'No tengo una meta definida',
    ],
    checkbox: false,
    date: null,
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
    metaErrors () {
      const errors = []
      if (!this.$v.meta.$dirty) return errors
      !this.$v.meta.required && errors.push('La meta es obligatoria')
      return errors
    },
    generoErrors () {
      const errors = []
      if (!this.$v.genero.$dirty) return errors
      !this.$v.genero.required && errors.push('El género es obligatorio')
      return errors
    },
    userNameErrors () {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.required && errors.push('El usuario es obligatorio')
      !this.$v.username.maxLength && errors.push('El usuario debe tener maximo 50 caracteres')
      return errors
    },
    fullNameErrors () {
      const errors = []
      if (!this.$v.fullname.$dirty) return errors
      !this.$v.fullname.required && errors.push('El nombre y apellido es obligatorio')
      !this.$v.fullname.maxLength && errors.push('El nombre y apellido debe tener maximo 100 caracteres')
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
    dateErrors () {
      const errors = []
      if (!this.$v.date.$dirty) return errors
      !this.$v.date.required && errors.push('La fecha de nacimiento es obligatoria')
      return errors
    },
    weightErrors () {
      const errors = []
      if (!this.$v.weight.$dirty) return errors
      !this.$v.weight.required && errors.push('El peso es obligatorio')
      !this.$v.weight.decimal && errors.push('El peso debe ser un número')
      !this.$v.weight.minValue && errors.push('El peso debe ser positivo')
      return errors
    },
    heightErrors () {
      const errors = []
      if (!this.$v.height.$dirty) return errors
      !this.$v.height.required && errors.push('La altura es obligatoria')
      !this.$v.height.decimal && errors.push('La altura debe ser un número')
      !this.$v.height.minValue && errors.push('La altura debe ser positiva')
      return errors
    }
  },

  methods: {
    async submit () {
      this.$v.$touch()
      if (!this.$v.$invalid){
        this.loading = true;
        const result = await UserStore.addUser(this.username, this.fullname, this.password, this.adaptarGenero(this.genero), Date.parse(this.date), this.email, this.meta );
        if(result){
          this.submitted = true;
          this.loading = false;
        }
        else{
          this.submitError = true;
          this.mensajeAlertForm = `Mail o usuario repetido`;
          this.loading = false;
        }

      }
    },
    async resendVerification(){
      this.loading = true;
      const result = await UserStore.resendVerification(this.email);
      if(result){
        this.mensajeAlertSubmitted = 'Se ha reenviado el mail de verificacion a su casilla';
        this.loading = false;
      }
      else{
        this.sendVerificationError= true;
        this.mensajeAlertSubmitted = `Error en reenviar verificacion`;
        this.loading = false;
      }
    },
    adaptarGenero(genero){
      switch (genero){
        case 'Hombre':
          return 'male';
        case 'Mujer':
          return 'female';
        case 'Otro':
          return 'other';
        default:
          return '';
      }
    },
    clear () {
      this.$v.$reset()
      this.username = ''
      this.email = ''
      this.date = null
      this.checkbox = false
      this.meta = null
      this.genero = null
      this.password=''
      this.confirmationPassword=''
      this.fullname= ''
    },
    save (date) {
      this.$refs.menu.save(date)
    },
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