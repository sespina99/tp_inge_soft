<template>
  <div>
    <v-container class="tituloSeccion">
      <v-icon id="icon" left color="black" x-large>mdi-dumbbell</v-icon>
      <h1>Editar rutinas</h1>
    </v-container>
    <form-rutina v-bind:info-rutina="rutina" v-on:ActualizarInfoRutina="llenarDatosRutina($event)"></form-rutina>
    <v-btn class="mr-4 white--text btnCrear orangeElement" @click="crearRutina()" >
      Editar
    </v-btn>
    <listas-seleccion v-bind:info-rutina="rutina"></listas-seleccion>         
  </div>
</template>

<script>

import excerciseStore from '../store/ExcerciseStore'
import routinesStore from '../store/RoutineStore'
import ListasSeleccion from "../components/ListasSeleccion";
import FormRutina from "../components/FormRutina";
import {validationMixin} from "vuelidate";
import {decimal, minValue, required} from "vuelidate/lib/validators";


export default {
  mixins: [validationMixin],
  components: {
    'listas-seleccion': ListasSeleccion,
    'form-rutina' : FormRutina
  },

  validations: {
    nombreRutina: { required },
    objetivo: { required },
    dificultad: { required },
    series: {required,minValue:minValue(1),decimal},
    repeticiones : {required,minValue:minValue(1),decimal},
    duracion : {required,minValue:minValue(1),decimal}
  },

  data: () => ({
    categories : excerciseStore.getCategories(),
    routinesCat:[
      {nombre:'Entrada en calor',ejercicios:[{title:'Ej Igol'}]},
      {nombre:'Ejercitación principal',ejercicios:[]},
      {nombre:'Enfriamiento',ejercicios:[]}
    ],
    rutina:{
      nombre : '',
      duracion : '',
      dificultad : '',
      objetivo :  '',
      autor : '',
      desc : ''
    },
    rutinaExistente:{
      nombre : 'Rutina del Igol',
      duracion : '34',
      dificultad : 'Principiante',
      objetivo :  'Bajar de peso',
      autor : 'Hernan Gonzalez',
      desc : 'La mejor rutina'
    },
    nombreRutina : '',
    duracionRutina : 0,
    objetivo : '',
    dificultad : '',
    autor: '',
    desc : '',
    checkboxes: {
      checkboxEntradaEnCalor: true,
      checkboxEjercitacionPrincipal: true,
      checkboxEnfriamiento: true
    },
    checkboxSelectedIndex : -1,
    series: {
      seriesEntradaEnCalor: '',
      seriesEjercitacionPrincipal: '',
      seriesEnfriamiento: ''
    },
    excerciseLimit : 5,
    repeticiones :{

    },
    duracion: {

    },
    dificultades : [
      'Principiante',
      'Intermedio',
      'Avanzado'
    ],
    objetivos : [
      'Bajar de peso',
      'Ganar músculo',
      'Ponerse en forma',
      'Sin meta definida'
    ]
  }),
  methods :{
    disSelectOtherCheckboxes(index){
      let i = 0;
      for(const check in this.checkboxes){
        console.log(`i = ${i}`);
        console.log(`check = ${check}`);
        if(i!==index){
          this.checkboxes[check]=false;
        }
        i++;
      }
      console.log(`checkboxes[index] = ${this.checkboxes[index]}`);
      console.log(`index = ${index}`);
      console.log(`csi = ${this.checkboxSelectedIndex}`);
      if(this.checkboxes[index]){
        this.checkboxSelectedIndex=index;
      }
      else{
        this.checkboxSelectedIndex=-1;
      }
    },
    agregarEjercicio(ejercicio){
      if(this.checkboxSelectedIndex!==-1 && this.routinesCat[this.checkboxSelectedIndex].ejercicios.length<this.excerciseLimit){
        this.routinesCat[this.checkboxSelectedIndex].ejercicios.push(ejercicio);
      }
    },
    quitarEjercicio(index){
      if(this.checkboxSelectedIndex!==-1 ){
        this.routinesCat[this.checkboxSelectedIndex].ejercicios.splice(index,1);
      }
    },
    crearRutina(){
      let seccs = [];
      for(var i=0 ; i<this.routinesCat.length;i++){
        let ejs = [];
        for(var j=0 ;j<this.routinesCat[i].ejercicios.length;j++){
          ejs.push(this.routinesCat[i].ejercicios[j].title);
        }
        let seccion = {series : this.series[i], ejercicios : ejs }
        seccs.push(seccion);
      }
      const rutina = {nombre: this.nombreRutina, dificultad: this.dificultad, duracion: this.duracionRutina, meta: this.objetivo,
        descripcion: this.desc, secciones : seccs}

      routinesStore.add(rutina);
      this.$router.push('/Rutinas/MisRutinas');
    },
    sumTotalDuracion(index){
      this.duracionRutina+= this.duracion[this.checkboxSelectedIndex*this.excerciseLimit+index];
    },
    llenarDatosRutina(nuevaRutina){
      this.rutina = nuevaRutina;
      console.log(this.rutina);
    }
  },
  computed: {
    ObjetiveErrors () {
      const errors = []
      if (!this.$v.objetivo.$dirty) return errors
      !this.$v.objetivo.required && errors.push('El objetivo es obligatorio')
      return errors
    },
    difficultErrors () {
      const errors = []
      if (!this.$v.dificultad.$dirty) return errors
      !this.$v.dificultad.required && errors.push('La dificultad es obligatoria')
      return errors
    },
    nameErrors () {
      const errors = []
      if (!this.$v.nombreRutina.$dirty) return errors
      !this.$v.nombreRutina.required && errors.push('El nombre es obligatorio')
      return errors
    },
    seriesErrors () {
      const errors = []
      if (!this.$v.series.$dirty) return errors
      !this.$v.series.required && errors.push('Las series son obligatorias')
      !this.$v.series.decimal && errors.push('Las series deben ser números')
      !this.$v.series.minValue && errors.push('Las series deben ser positivos mayores a 0')
      return errors
    },
    repetitionsErrors () {
      const errors = []
      if (!this.$v.repeticiones.$dirty) return errors
      !this.$v.repeticiones.required && errors.push('Las repeticiones son obligatorias')
      !this.$v.repeticiones.decimal && errors.push('Las repeticiones deben ser números')
      !this.$v.repeticiones.minValue && errors.push('Las repeticiones deben ser positivos mayores a 0')
      return errors
    },
    durationErrors () {
      const errors = []
      if (!this.$v.duracion.$dirty) return errors
      !this.$v.duracion.required && errors.push('Las duraciones son obligatorias')
      !this.$v.duracion.decimal && errors.push('Las duraciones deben ser números')
      !this.$v.duracion.minValue && errors.push('Las duraciones deben ser positivos mayores a 0')
      return errors
    },

  }

}
</script>

<style scoped>

.TextAreaDesc{
  width: 100%;
}

#tituloSeccion{

  text-align: center;
}

#tituloSeccion h1{
  display: inline;
}

#icon{
  padding-bottom: 2%;
}

#DatosRutina{
  width: 100%;
}

.datoRutinaSingular {
  display: table;
  width: 20%;
  float: left;
}

.datoRutinaSingular b{
  display: table-cell;
  width: 1px;
  white-space: nowrap;
}

.textFieldRutina{
  width: 100%;
  margin-left: 2%;
}

.seccionRutina{
  display: inline-block;
  width: 100%;
  border: 1px solid red;
}

.btnCrear{
  width: 50%;
  margin-top: 0.6%;
  margin-left: 25%;
  margin-right: 25%;
}

#SeccionDeEleccion{
  display: inline-block;
  width: 100%;
  border: 1px solid red;
  margin-top: 5%;
}

#SeccionesRutina{
  width: 45%;
  float: left;
  margin-right: 5%;
}

#EjsDisponibles{
  width: 45%;
  display: inline-block;
  margin-left: 5%;
}

.tituloCategorias{
  border: 3px solid darkgrey;
}

#botonListItemContent{
  width: 50%;
}

#listContent{
  display: inline-block;
  width: 100%;
}

#textoListItemContent{
  width: 50%;
}

.v-toolbar__title{
  font-weight: bold;
}

.checkboxSeccionRutina{
  float: left;
}

.btnAgregar{
  margin-right: 5%;
}

.routineCategory{
  font-weight: bold;
}

</style>