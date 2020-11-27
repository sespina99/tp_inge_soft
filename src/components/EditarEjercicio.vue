<template>
  <div>
    <v-container class="tituloSeccion">
      <v-icon id="icon" left color="black" x-large>mdi-pencil</v-icon>
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
        <v-btn class="white--text" color="#E78200" large width="40%" v-on:click="submit()">Editar Ejercicio</v-btn>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import ExerciseStore from "@/store/ExcerciseStore";
import RoutineStore from "@/store/RoutineStore";

export default {
  mixins: [validationMixin],

  validations: {
    ejercicio: { 
      title: { required },
      descripcion:{required},
    },
  
    category:{required},
  },
  
  data(){
    return{
      store: ExerciseStore,
      RoutineStore: RoutineStore,

      submitError: false,
      mensajeAlertForm: 'Error al editar ejercicio, inténtelo más tarde',

      fullExercise: undefined,
      myMasterId: undefined,
      cycleId: undefined,
      exerciseId: undefined,

      ejercicio:{
        title: '',
        descripcion: '',
      },
      initialCategory: '',
      category:'',
      categories: null,
    }
  },

  async created(){
      //Levanto los parámetros de la url
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      this.cycleId = urlParams.get('cid');
      this.exerciseId = urlParams.get('eid');

      this.categories = await this.store.getCategoriesName();
      this.myMasterId = (await this.RoutineStore.getMyMasterRoutine()).id;

      const res = await this.store.getExercise(this.myMasterId, this.cycleId, this.exerciseId);
      this.ejercicio.title = res.name
      this.ejercicio.descripcion = res.detail
      this.category = (await this.RoutineStore.getCycle(this.myMasterId, this.cycleId)).name;
      this.initialCategory = this.category;
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
      return errors
    },
    descripcionErrors () {
      const errors = []
      if (!this.$v.ejercicio.descripcion.$dirty) return errors
      !this.$v.ejercicio.descripcion.required && errors.push('La descripción es obligatoria')
      return errors
    },
  },

  methods:{

    async submit () {
      this.$v.$touch()
      if (!this.$v.$invalid){
        //Si sigue siendo de la misma categoría es fácil, lo piso
        if(this.initialCategory === this.category){
          const result = await this.store.modifyMyExercise(this.myMasterId, this.cycleId, this.exerciseId, this.ejercicio.title, this.ejercicio.descripcion);
          if(result){
            this.$router.push('/Ejercicios/MisEjercicios')
          }
          else{
            this.submitError = true;
          }
        }
        //Si me cambia la categoria, tengo que crearlo en otro ciclo y borrarlo de este
        else{
          //Busco el id del nuevo ciclo, lo meto en ese y lo borro del actual
          const oldCycleId = this.cycleId
          const categories = await this.RoutineStore.getCycles(this.myMasterId)
          for (let i = 0, found = false; !found && i < categories.length; i++) {
            if (categories[i].name === this.category){
              this.cycleId = categories[i].id
              found = true
            } 
          }
          
          //Hago add y no addMyExercise porque ya tengo masterId y cycleId
          const result = await this.store.add(this.myMasterId, this.cycleId, this.ejercicio.title, this.ejercicio.descripcion, "exercise", 1 /*duration*/, 1/*repetitions*/);
          //Hago delete y no deleteMyExercise porque ya tengo masterId
          await this.store.delete(this.myMasterId, oldCycleId, this.exerciseId);
          if(result){
            this.$router.push('/Ejercicios/MisEjercicios')
          }
          else{
            this.submitError = true;
          }
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