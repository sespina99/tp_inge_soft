<template>
<div>
<div v-if="loggedIn" id="profile-border">
    <v-row style="margin:0 0 20px 0;">
        <v-icon left color="black" x-large>mdi-account-circle</v-icon>
        <h1>Mi Perfil</h1>
    </v-row>
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
    <form style="margin: 2%;">
      <v-text-field
            v-model="username"
            :error-messages="userNameErrors"
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
         v-model="fullname"
         :error-messages="fullnameErrors"
         label="Nombre y Apellido"
         solo
         required
         @input="$v.fullname.$touch()"
         @blur="$v.fullname.$touch()"
     ></v-text-field>
     <v-select
         v-model="genero"
         :items="generos"
         :error-messages="generoErrors"
         label="Género"
         solo
         required
         @change="$v.genero.$touch()"
         @blur="$v.genero.$touch()"
     ></v-select>
     <v-select
         v-model="meta"
         :items="metas"
         :error-messages="metaErrors"
         label="Meta"
         solo
         required
         @change="$v.meta.$touch()"
         @blur="$v.meta.$touch()"
     ></v-select>
     <v-menu
         ref="menu"
         v-model="menu"
         :close-on-content-click="false"
         transition="scale-transition"
         offset-y
         min-width="290px"
     >
       <template v-slot:activator="{ on, attrs }">
         <v-text-field
             v-model="date"
             :error-messages="dateErrors"
             label="Fecha de nacimiento"
             solo
             append-icon="mdi-calendar"
             readonly
             @input="$v.date.$touch()"
             @blur="$v.date.$touch()"
             v-bind="attrs"
             v-on="on"
         ></v-text-field>
       </template>
       <v-date-picker
           color="orange"
           ref="picker"
           v-model="date"
           :max="new Date().toISOString().substr(0, 10)"
           min="1950-01-01"
           @change="save"
       ></v-date-picker>
     </v-menu>
     <v-text-field
         v-model="weight"
         :error-messages="weightErrors"
         label="Peso(kg)"
         solo
         required
         @input="$v.weight.$touch()"
         @blur="$v.weight.$touch()"
     ></v-text-field>
     <v-text-field
         v-model="height"
         :error-messages="heightErrors"
         label="Altura(m)"
         solo
         required
         @input="$v.height.$touch()"
         @blur="$v.height.$touch()"
     ></v-text-field>
      <v-row>
        <v-col>
          <v-btn class="mr-4 white--text btnRegist orangeElement" @click="submit">
            Confirmar
          </v-btn>
        </v-col>
        <v-col>
          <v-btn class="mr-4 white--text btnRegist" color="red" router :to="profile_link">
            Cancelar
          </v-btn>
        </v-col>
      </v-row>
     <v-container>
       <v-btn  class="white--text btnRegist orangeElement" @click="clear">
         Borrar
       </v-btn>
     </v-container>
   </form>
</div>
<div v-else>
  <h3 style="margin: 10% 20% 10% 20%; text-align: center;">Primero debe ingresar con su cuenta para editar su perfil</h3>
</div>
</div>
</template>

<script>

import { validationMixin } from 'vuelidate'
import { required, email, minValue, maxValue, decimal} from 'vuelidate/lib/validators'
import UserStore from "@/store/UserStore";
import CategoryStore from "@/store/CategoryStore";

export default {
  mixins: [validationMixin],

  validations: {
    username: { required },
    fullname: { required },
    email: { required, email },
    genero: {required},
    meta: { required },
    date: {required},
    height:{minValue:minValue(0.7), maxValue:maxValue(3), decimal},
    weight:{minValue:minValue(20), maxValue:maxValue(500), decimal}
  },

  data: () => ({
    loggedIn: true,
    profile_link: '/Perfil',

    submitError: false,
    mensajeError: 'No se pueden actualizar tus datos en el servidor ahora mismo',

    currentUser: undefined,
    weighting: undefined,

    username: '',
    fullname: '',
    showPass : false,
    email: '',
    genero: '',
    generos: [
      'Hombre',
      'Mujer',
    ],
    meta: null,
    metas: [],
    date: "",
    menu: false,
    weight: '',
    height: '',


  }),

  async created(){
      let aux = await CategoryStore.getCategories();
      for(let i = 0; i < aux.length; i++){
        if(aux[i].name !== 'Master') {
          this.metas.push(aux[i].name);
        }
      }
      this.currentUser = UserStore.getCurrentUser();
      this.username = this.currentUser.username;
      this.email = this.currentUser.email;
      this.fullname = this.currentUser.fullName;
      this.meta = this.currentUser.phone; //La guardamos en phone
      var dateObj = new Date(this.currentUser.birthdate);
      this.date = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth()+1) + '-' + dateObj.getUTCDate();
      switch (this.currentUser.gender) {
                case 'male':
                    this.genero = 'Hombre' 
                    break;
                case 'female':
                    this.genero = 'Mujer'
                    break;
                default:
                    this.genero = ''
                    break;
            }

      this.weighting = await UserStore.getWeighting();
      if (this.weighting.height != 0.1)
        this.height = this.weighting.height;
      if (this.weighting.weight != 0.1)
        this.weight = this.weighting.weight;
  },

  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
  },

  computed: {
    userNameErrors () {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.required && errors.push('El nombre de usuario es obligatorio')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('El e-mail debe ser válido')
      !this.$v.email.required && errors.push('El e-mail es obligatorio')
      return errors
    },
    metaErrors () {
      const errors = []
      if (!this.$v.meta.$dirty) return errors
      !this.$v.meta.required && errors.push('La meta es obligatoria')
      return errors
    },
    fullnameErrors () {
      const errors = []
      if (!this.$v.fullname.$dirty) return errors
      !this.$v.fullname.required && errors.push('El nombre es obligatorio')
      return errors
    },
    generoErrors () {
      const errors = []
      if (!this.$v.genero.$dirty) return errors
      !this.$v.genero.required && errors.push('El género es obligatorio')
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
      !this.$v.weight.decimal && errors.push('El peso debe ser un número, con el punto como separador decimal')
      !this.$v.weight.minValue && errors.push('El peso mínimo soportado es de 20 kilogramos')
      !this.$v.weight.maxValue && errors.push('El peso máximo soportado es de 500 kilogramos')
      return errors
    },
    heightErrors () {
      const errors = []
      if (!this.$v.height.$dirty) return errors
      !this.$v.height.decimal && errors.push('La altura debe ser un número, con el punto como separador decimal')
      !this.$v.height.minValue && errors.push('La altura mínima soportada es de 0.7 metros')
      !this.$v.height.maxValue && errors.push('La altura máxima soportada es de 3 metros')
      return errors
    }
  },

  methods: {
    async submit () {
      this.$v.$touch()
      if (!this.$v.$invalid){
        //La api no actualiza correctamente el usuario, la contraseña ni la fecha de nacimiento
        var result = await UserStore.editCurrentUser(this.username, this.fullname, this.adaptarGenero(this.genero), Date.parse(this.date), this.email, this.meta );

        if (result){
          //Ahora actualizo peso y altura
          if (this.weight === '')
            this.weight = 0.1
          if (this.height === '')
            this.height = 0.1
          
          result = await UserStore.editWeighting(this.weight, this.height)
          if (result){
            await UserStore.updateCurrentUser()
            this.$router.push('/Perfil')
          }
          else{
            this.mensajeError = 'Error al actualizar el peso y la altura'
            this.submitError = true;
          }
        }
        else{
          this.mensajeError = 'No se pueden actualizar tus datos en el servidor ahora mismo'
          this.submitError = true;
        }
      }
    },  

    clear () {
      this.$v.$reset()
      this.username = ''
      this.email = ''
      this.date = null
      this.meta = null
      this.genero = null
      this.height=''
      this.weight=''
      this.fullname= ''
    },

    save (date) {
      this.$refs.menu.save(date)
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

</style>
