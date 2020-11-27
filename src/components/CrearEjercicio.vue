<template>
  <div>
    <v-container class="tituloSeccion">
      <v-icon id="icon" left color="black" x-large>mdi-dumbbell</v-icon>
      <h1 class="text-center">Crear Ejercicio</h1>
    </v-container>
    <v-card class="mx-auto mt-10" max-width="50%" rounded>

      <form style="margin: 2%">
        <h2 class="text-center">Ejercicio: {{ejercicio.title}}</h2>
        <v-alert
            max-width="30%"
            class="mx-auto"
            v-if="submitError"
            color="red"
            type="error"
        >
          {{mensajeAlertForm}}
        </v-alert>
        <v-text-field
          v-model="ejercicio.title"
          :error-messages="titleErrors"
          label="Nombre"
          required
          @input="$v.ejercicio.title.$touch()"
          @blur="$v.ejercicio.title.$touch()"
        ></v-text-field>
        <v-select
          v-model="category"
          :items="categories"
          :error-messages="categoryErrors"
          label="Categoría"
          required
          @change="$v.category.$touch()"
          @blur="$v.category.$touch()"
        ></v-select>
        <v-text-field
          v-model="ejercicio.descripcion"
          :error-messages="descripcionErrors"
          label="Descripción"
          required
          @input="$v.ejercicio.descripcion.$touch()"
          @blur="$v.ejercicio.descripcion.$touch()"
        ></v-text-field>
      </form>
      <v-container class="text-center">
        <v-btn class="white--text" color="#E78200" large width="40%" v-on:click="submit()">Crear Ejercicio</v-btn>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {maxLength, required} from 'vuelidate/lib/validators'
import ExerciseStore from "@/store/ExcerciseStore";

export default {
  mixins: [validationMixin],

  validations: {
    ejercicio: { 
      title: { required, maxLength : maxLength(100) },
      descripcion:{required, maxLength : maxLength(200) },
    },
  
    category:{required},
  },
  
  data(){
    return{
      store: ExerciseStore,

      submitError: false,
      mensajeAlertForm: 'Error al crear ejercicio, inténtelo más tarde',


      ejercicio:{
        id: '',
        title: '',
        descripcion: '',
      },
      category:'',
      categories: null,
    }
  },

  async created(){
       this.categories = await this.store.getCategoriesName()
  },

  computed:{

    categoryErrors () {
      const errors = []
      if (!this.$v.category.$dirty) return errors
      !this.$v.category.required && errors.push('La categoría es obligatoria')
      return errors
    },
    titleErrors () {
      const errors = []
      if (!this.$v.ejercicio.title.$dirty) return errors
      !this.$v.ejercicio.title.required && errors.push('El nombre es obligatorio')
      !this.$v.ejercicio.title.maxLength && errors.push('El nombre debe tener máximo 100 caracteres')
      return errors
    },
    descripcionErrors () {
      const errors = []
      if (!this.$v.ejercicio.descripcion.$dirty) return errors
      !this.$v.ejercicio.descripcion.required && errors.push('La descripción es obligatoria')
      !this.$v.ejercicio.descripcion.maxLength && errors.push('La descripción debe tener máximo 200 caracteres')
      return errors
    },
  },

  methods:{

    async submit () {
      this.$v.$touch()
      if (!this.$v.$invalid){
        const result = await this.store.addMyExercises(this.ejercicio.title, this.ejercicio.descripcion, this.category)
        if (result === "No existe"){
          this.mensajeAlertForm = 'Esta categoría de ejercicio no fue encontrada';
          this.submitError = true;
        }

        if(result){
          this.$router.push('/Ejercicios/MisEjercicios')
        }
        else{
          this.mensajeAlertForm = 'Error al crear ejercicio, inténtelo más tarde';
          this.submitError = true;
        }
      }
    },

    clear () {
      this.$v.$reset()
      this.ejercicio.title = ''
      this.ejercicio.descripcion = ''
      this.category = ''
    },
  }
}
</script>

<style scoped>

</style>