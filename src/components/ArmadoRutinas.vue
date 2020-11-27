<template>
  <div>
   <div>
    <v-container class="tituloSeccion">
      <v-icon id="icon" left color="black" x-large>{{Icono}}</v-icon>
      <h1>{{tituloComponente}}</h1>
    </v-container>
    <div id="DatosRutina">
      <v-container class="datoRutinaSingular">
        <b>Nombre: </b>
        <v-text-field
            v-model="rutina.nombre"
            :error-messages="nameErrors"
            class="textFieldRutina"
            label="Nombre"
            solo
            @blur="$v.rutina.nombre.$touch()"
            @change="$v.rutina.nombre.$touch()"
            required
        ></v-text-field>
      </v-container>
      <v-container class="datoRutinaSingular">
        <b>Duración: </b>
        <v-text-field
            class="textFieldRutina"
            v-model="rutina.duracion"
            label="Duración"
            solo
            disabled
            required
        ></v-text-field>
      </v-container>
      <v-container class="datoRutinaSingular">
        <b>Dificultad: </b>
        <v-select
            v-model="rutina.dificultad"
            class="textFieldRutina"
            :items="dificultades"
            :error-messages="difficultErrors"
            @blur="$v.rutina.dificultad.$touch()"
            @change="$v.rutina.dificultad.$touch()"
        >
        </v-select>
      </v-container>
      <v-container class="datoRutinaSingular">
        <b>Objetivo: </b>
        <v-select
            v-model="rutina.objetivo"
            class="textFieldRutina"
            :items="categoriesName"
            @change="$v.rutina.objetivo.$touch()"
            @blur="$v.rutina.objetivo.$touch()"
            :error-messages="ObjetiveErrors">
        </v-select>
      </v-container>
    </div>

    <br/>

    <v-container class="TextAreaDesc">
      <v-textarea class="TextAreaDesc" label="Descripción" v-model="rutina.desc" solo :error-messages="descriptionErrors"  @blur="$v.rutina.desc.$touch()" @change="$v.rutina.desc.$touch()">
      </v-textarea>
    </v-container>
  </div>


    <v-alert prominent type="error" class="mx-auto" v-if="alertActivated" max-width="50%">
      <v-row align="center">
        <v-col>
          Estas seguro que quieres abandonar? Todos tus cambios se perderan
        </v-col>
        <v-col class="shrink">
          <v-btn @click="alertActivated = !alertActivated">Cancelar</v-btn>
        </v-col>
        <v-col class="shrink">
          <v-btn @click="$router.go(-1)">Abandonar</v-btn>
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

    <v-btn class="mr-4 white--text btnCrear orangeElement" @click="accionRutina()" >
      {{ tituloBoton }}
    </v-btn>

    <v-btn class="mr-4 white--text btnCrear"  v-if="this.$route.fullPath.includes('/Rutinas/Editar')" color="red" @click="alertActivated = !alertActivated">
      Cancelar
    </v-btn>


    <div id="DivLista">
      <v-alert prominent type="error" class="mx-auto" v-if="listaInvalida" id="alertaLista" >
        <v-row align="center">
          <v-col>
            {{ mensajeErrorLista }}
          </v-col>
          <v-col class="shrink">
            <v-btn @click="listaInvalida = !listaInvalida">Aceptar</v-btn>
          </v-col>
        </v-row>
      </v-alert>
    </div>


  <div id="SeccionDeEleccion">
    <div id="SeccionesRutina">
      <v-card>
        <v-toolbar id="ToolbarSeccionesRutina" class="tituloListas">
          <v-toolbar-title id="titleToolbar" >{{rutina.nombre}}</v-toolbar-title>
          <v-btn class="mr-4 white--text btnEjPrincipal"  color="red" @click="borrarEjPrincipal()" >
            Borrar ej principal
          </v-btn>
          <v-btn class="mr-4 white--text orangeElement btnEjPrincipal"   @click="agregarEjPrincipal()" >
            Agregar ej principal
          </v-btn>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-list>
          <v-list-group
              v-for="(routineCat,index) in routinesCat"
              :key="index"
              v-model="routineCat.active"
              class="tituloCategorias"
              v-bind:disabled="!checkboxes[index].checked"
          >
            <template v-slot:activator>
              <v-list-item-content >
                <v-row  align="center">
                  <v-col cols="4">
                    <v-list-item-title class="routineCategory" v-text="routineCat.name"></v-list-item-title>
                  </v-col>
                  <v-col cols="4">
                    <v-checkbox
                        v-model="checkboxes[index].checked"
                        label="Seleccionar"
                        required
                        color="#E78200"
                        v-on:click="disSelectOtherCheckboxes(index)"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="2.5" class="seriesContent">
                    <p>Series: </p>
                  </v-col>
                  <v-col cols="2.5"  class="seriesContent textfieldSeries" >
                    <v-text-field
                        v-model="series[index]"
                        :rules="[rules.required,rules.number, rules.positive, rules.seriesRange]"
                        v-bind:disabled="!checkboxes[index].checked"
                        solo
                        required
                        ref="textFieldListaSeries"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </template>

            <v-list-item
                v-for="(ejercicio,index) in routineCat.ejercicios"
                :key="index"
            >
              <v-list-item-content class="tituloCategorias">
                <v-row align="center" >
                  <v-col cols="2">
                    <v-list-item-title v-text="ejercicio.name"></v-list-item-title>
                  </v-col>
                  <v-col cols="1.5">
                    <b>Repeticiones: </b>
                  </v-col>
                  <v-col cols="1.5">
                    <v-text-field
                        class="textFieldRutinaRepeticiones"
                        v-model="repeticiones[checkboxSelectedIndex*excerciseLimit+index]"
                        solo
                        ref="textFieldListaRepeticiones"
                        :rules="[rules.required,rules.number,rules.positive]"
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="1.5">
                    <b>Duracion(min): </b>
                  </v-col>
                  <v-col cols="1.5">
                    <v-text-field
                        ref="textFieldListaDuracion"
                        class="textFieldRutina"
                        v-model="duracion[checkboxSelectedIndex*excerciseLimit+index]"
                        :rules="[rules.required,rules.number,rules.positive]"
                        @input="ActualizarDuracionRutina"
                        solo
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-list-item-action>
                      <v-btn v-on:click="quitarEjercicio(index)" right class="btnAgregar" fab dark color="red">
                        <v-icon dark>
                          mdi-minus
                        </v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-col>
                </v-row>

              </v-list-item-content>
            </v-list-item>

          </v-list-group>
        </v-list>
      </v-card>
    </div>



    <div id="EjsDisponibles">
      <v-card>
        <v-toolbar class="tituloListas">
          <v-toolbar-title >Ejercicios disponibles</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-list>
          <v-list-group
              v-for="(cycle, i) in cycles"
              :key="i"
              v-model="cycle.active"
              class="tituloCategorias"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="cycle.name"></v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
                v-for="(ejercicio,j) in ejerciciosMaster[i]"
                :key="j"
            >
              <v-list-item-content class="tituloCategorias">
                <div class="DivContenidoEj">
                  <v-list-item-title class="textoListItemContent" v-text="ejercicio.id + ' ' + ejercicio.name"></v-list-item-title>
                </div>
                <div class="DivContenidoEj">
                  <p>Descripción: {{ejercicio.detail}}</p>
                </div>
                <v-list-item-action >
                  <div id="divBtnAgregar">
                    <v-btn v-on:click="agregarEjercicio(ejercicio)" right class="btnAgregar" fab dark color="#E78200">
                      <v-icon dark>
                        mdi-plus
                      </v-icon>
                    </v-btn>
                  </div>
                </v-list-item-action>

              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-card>
    </div>
   </div>
  </div>

</template>

<script>

import {validationMixin} from "vuelidate";
import CategoryStore from "@/store/CategoryStore";
import {maxLength, required} from "vuelidate/lib/validators";
import RoutineStore from "@/store/RoutineStore";
import ExcerciseStore from "@/store/ExcerciseStore";


export default {
  mixins: [validationMixin],

  props:['routineId'],

  validations: {
    rutina:{
      nombre: { required, maxLength : maxLength(100) },
      objetivo: { required },
      dificultad: { required },
      desc : {required, maxLength : maxLength(200)}
    },
  },

  data: () => ({

    dificultades : [
      'Novato',
      'Principiante',
      'Intermedio',
      'Avanzado',
      'Experto'
    ],

    loading : false,

    cycles: [],

    ejerciciosMaster: [],

    routinesCat:[
      {name:'Entrada en calor', detail: 'Entrada en calor', cycleType:'warmup', ejercicios:[]},
      {name:'Ejercitación principal 1', detail:'Ejercitación Principal', cycleType:'exercise', ejercicios:[]},
      {name:'Enfriamiento', detail:'Enfriamento', cycleType:'cooldown' , ejercicios:[]}
    ],

    cyclesId:[],


    currentIndexEjPrincipal : 2,
    rules: {
      required: value => !!value || 'Obligatorio.',
      number : value => Number.isInteger(parseInt(value))  || 'Debe ser un número',
      positive : value => value > 0 || 'Debe ser un número positivo',
      seriesRange : value => (value>=1 && value<=99) || 'Las series deben estar entre 1 y 99'

    },

    rutina: {
      nombre: '',
      duracion: '',
      dificultad: '',
      objetivo: '',
      desc: ''
    },
    alertActivated: false,
    tituloComponente : '',
    tituloBoton : '',
    Icono : '',
    mensajeErrorLista : '',
    duracionRutina : 0,
    checkboxes: [
        {checked: false},
        {checked: false},
        {checked: false}
    ],
    checkboxSelectedIndex : -1,
    listaInvalida : false,

    series: [],
    excerciseLimit : 5,
    repeticiones :[],
    duracion: [],

    categories:[],

    categoriesName: [],
  }),
  methods: {
    disSelectOtherCheckboxes(index){
      for(let i = 0; i<this.checkboxes.length ; i++){
        if(i!==index){
          this.checkboxes[i].checked=false;
        }
      }
      if(this.checkboxes[index].checked){
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
        let j;
        for(j = index ; j<this.routinesCat[this.checkboxSelectedIndex].ejercicios.length -1 ; j++){
          this.duracion[this.checkboxSelectedIndex*this.excerciseLimit+j]=this.duracion[this.checkboxSelectedIndex*this.excerciseLimit+j+1];
          this.repeticiones[this.checkboxSelectedIndex*this.excerciseLimit+j]=this.duracion[this.checkboxSelectedIndex*this.excerciseLimit+j+1];
        }
        this.duracion[this.checkboxSelectedIndex*this.excerciseLimit+j]='';
        this.repeticiones[this.checkboxSelectedIndex*this.excerciseLimit+j]='';
        this.routinesCat[this.checkboxSelectedIndex].ejercicios.splice(index,1);
      }
    },
    ActualizarDuracionRutina(){
      this.rutina.duracion= this.duracion.reduce((a, b) => parseInt(a || 0) + parseInt(b || 0));
    },
    borrarEjPrincipal(){
      if(this.currentIndexEjPrincipal>2){
        const auxSeries = this.series[this.currentIndexEjPrincipal];
        this.routinesCat.splice(this.currentIndexEjPrincipal-1,1);
        this.checkboxes.splice(this.currentIndexEjPrincipal-1,1);
        this.series[this.currentIndexEjPrincipal-1]= auxSeries;
        for(let j = 0; j < this.excerciseLimit ; j++){
          this.duracion[(this.currentIndexEjPrincipal-1)*this.excerciseLimit+j]=this.duracion[this.currentIndexEjPrincipal*this.excerciseLimit+j];
          this.repeticiones[(this.currentIndexEjPrincipal-1)*this.excerciseLimit+j]=this.repeticiones[this.currentIndexEjPrincipal*this.excerciseLimit+j];
        }
        this.currentIndexEjPrincipal--;
      }
    },
    agregarEjPrincipal(){
      const ejPrincipal = {name:`Ejercitación principal ${this.currentIndexEjPrincipal}`, detail:'Ejercitación Principal', cycleType:'exercise', ejercicios:[]}
      const checkboxEjPrincipal = {checked: false};
      this.series[this.currentIndexEjPrincipal+1]=this.series[this.currentIndexEjPrincipal];
      this.series[this.currentIndexEjPrincipal]='';
      this.checkboxes.splice(this.currentIndexEjPrincipal,0,checkboxEjPrincipal);
      this.routinesCat.splice(this.currentIndexEjPrincipal,0,ejPrincipal);
      for(let j = 0; j < this.excerciseLimit ; j++){
        this.duracion[(this.currentIndexEjPrincipal+1)*this.excerciseLimit+j]=this.duracion[this.currentIndexEjPrincipal*this.excerciseLimit+j];
        this.repeticiones[(this.currentIndexEjPrincipal+1)*this.excerciseLimit+j]=this.repeticiones[this.currentIndexEjPrincipal*this.excerciseLimit+j];
        this.duracion[this.currentIndexEjPrincipal*this.excerciseLimit+j]='';
        this.repeticiones[this.currentIndexEjPrincipal*this.excerciseLimit+j]='';
      }
      this.currentIndexEjPrincipal++;
    },

    accionRutina(){
      this.loading = true;
      if(this.routineId=== undefined){
        this.crearRutina();
      }
      else{
        this.modificarRutina();
      }
    },
    async crearRutina() {
      this.$v.$touch()

      if (!this.$v.$invalid ){

        if(this.$refs["textFieldListaDuracion"]===undefined || this.$refs["textFieldListaRepeticiones"]===undefined || this.$refs["textFieldListaSeries"]===undefined ){
          this.mensajeErrorLista = 'Debe completar la seccion de eleccion de la rutina';
          this.listaInvalida = true;
          this.loading = false;
          return;
        }

        for(let i = 0; i < this.routinesCat.length; i++){
          if(this.routinesCat[i].ejercicios.length === 0){
            this.mensajeErrorLista = 'Debe agregar ejercicios a todas las secciones de la rutina';
            this.listaInvalida = true;
            this.loading = false;
            return ;
          }
        }

        for(let i = 0 ; i < this.$refs["textFieldListaSeries"].length; i++){
          if(this.$refs["textFieldListaSeries"][i].hasError){
            this.mensajeErrorLista = 'Datos de series invalidos';
            this.listaInvalida = true;
            this.loading = false;
            return ;
          }
        }

        for(let i = 0 ; i < this.$refs["textFieldListaDuracion"].length; i++){
          if(this.$refs["textFieldListaDuracion"][i].hasError){
            this.mensajeErrorLista = 'Datos de duracion invalidos';
            this.listaInvalida = true;
            this.loading = false;
            return ;
          }
        }

        for(let i = 0 ; i < this.$refs["textFieldListaRepeticiones"].length; i++){
          if(this.$refs["textFieldListaRepeticiones"][i].hasError){
            this.mensajeErrorLista = 'Datos de Repeticiones invalidos';
            this.listaInvalida = true;
            this.loading = false;
            return ;
          }
        }


          let result = await RoutineStore.add(this.rutina.nombre, this.rutina.desc,this.adaptarDificultad(this.rutina.dificultad), this.getCategoryId(this.rutina.objetivo));

          let cyclesId = [] ;
          for(let i = 0; i < this.routinesCat.length; i++) {
            let aux = await RoutineStore.addCycle(result.id, this.routinesCat[i].name, this.routinesCat[i].detail, this.routinesCat[i].cycleType, i + 1, parseInt(this.series[i]))
            cyclesId[i] = aux.id;

          }

          for(let i = 0, k = 0; i < cyclesId.length; i++){

            for(let j = 0; j < this.routinesCat[i].ejercicios.length; j++, k++){
              await ExcerciseStore.add(result.id, cyclesId[i], this.routinesCat[i].ejercicios[j].name, this.routinesCat[i].ejercicios[j].detail, this.routinesCat[i].ejercicios[j].type, this.duracion[k], this.repeticiones[k])
            }

            k = this.excerciseLimit * (i+1);

          }
          this.loading = false;
          await this.$router.push('/Rutinas/MisRutinas');
        }
      this.loading = false;
  },

    async modificarRutina(){
      this.$v.$touch()

      if (!this.$v.$invalid ) {

        if (this.$refs["textFieldListaDuracion"] === undefined || this.$refs["textFieldListaRepeticiones"] === undefined || this.$refs["textFieldListaSeries"] === undefined) {
          this.mensajeErrorLista = 'Debe completar la seccion de eleccion de la rutina';
          this.listaInvalida = true;
          this.loading = false;
          return;
        }

        for (let i = 0; i < this.routinesCat.length; i++) {
          if (this.routinesCat[i].ejercicios.length === 0) {
            this.mensajeErrorLista = 'Debe agregar ejercicios a todas las secciones de la rutina';
            this.listaInvalida = true;
            this.loading = false;
            return;
          }
        }

        for (let i = 0; i < this.$refs["textFieldListaSeries"].length; i++) {
          if (this.$refs["textFieldListaSeries"][i].hasError) {
            this.mensajeErrorLista = 'Datos de series invalidos';
            this.listaInvalida = true;
            this.loading = false;
            return;
          }
        }

        for (let i = 0; i < this.$refs["textFieldListaDuracion"].length; i++) {
          if (this.$refs["textFieldListaDuracion"][i].hasError) {
            this.mensajeErrorLista = 'Datos de duracion invalidos';
            this.listaInvalida = true;
            this.loading = false;
            return;
          }
        }

        for (let i = 0; i < this.$refs["textFieldListaRepeticiones"].length; i++) {
          if (this.$refs["textFieldListaRepeticiones"][i].hasError) {
            this.mensajeErrorLista = 'Datos de Repeticiones invalidos';
            this.listaInvalida = true;
            this.loading = false;
            return;
          }
        }
        
        await RoutineStore.delete(this.routineId);
        await this.crearRutina();
      }
      
      this.loading = false;

    },
    getCategoryId(objetivo) {
      for (var i = 0; i < this.categories.length; i++) {
        if (objetivo === this.categories[i].name) {
          return this.categories[i].id
        }
      }
    },

    adaptarDificultad(dificultad) {
      switch (dificultad) {
        case 'Novato':
          return 'rookie';
        case 'Principiante':
          return 'beginner';
        case 'Intermedio':
          return 'intermediate';
        case 'Avanzado':
          return 'advanced';
        case 'Experto':
          return 'expert';
        default:
          return '';
      }
    },
    desadaptarDificultad(dificultad) {
      switch (dificultad) {
        case 'rookie':
          return 'Novato';
        case 'beginner':
          return 'Principiante';
        case 'intermediate':
          return 'Intermedio';
        case 'advanced':
          return 'Avanzado';
        case 'expert':
          return 'Experto';
        default:
          return '';
      }
    },
    cambiarValidacionLista(ref){
       this.listaValida = this.$refs[ref].hasError
    }
  },
  computed: {
    ObjetiveErrors () {
      const errors = []
      if (!this.$v.rutina.objetivo.$dirty) return errors
      !this.$v.rutina.objetivo.required && errors.push('El objetivo es obligatorio')
      return errors
    },
    difficultErrors () {
      const errors = []
      if (!this.$v.rutina.dificultad.$dirty) return errors
      !this.$v.rutina.dificultad.required && errors.push('La dificultad es obligatoria')
      return errors
    },
    nameErrors () {
      const errors = []
      if (!this.$v.rutina.nombre.$dirty) return errors
      !this.$v.rutina.nombre.required && errors.push('El nombre es obligatorio')
      !this.$v.rutina.nombre.maxLength && errors.push('El nombre debe tener máximo 100 caracteres')
      return errors
    },
    descriptionErrors(){
      const errors = []
      if (!this.$v.rutina.desc.$dirty) return errors
      !this.$v.rutina.desc.required && errors.push('La descripción es obligatoria')
      !this.$v.rutina.desc.maxLength && errors.push('La descripción debe tener máximo 200 caracteres')
      return errors
    },

  },


  async created() {
    this.loading = true;
    this.categories = await CategoryStore.getCategories();

    for (let i = 0; i < this.categories.length; i++) {
      if(this.categories[i].id !== 1) {
        this.categoriesName.push(this.categories[i].name);
      }
    }

    this.cycles = await RoutineStore.getCategoriesFromMaster();

    //Agrego los ejercicios de la categoría master
    for(let i = 0; i < this.cycles.length; i++){
      this.ejerciciosMaster.push(await ExcerciseStore.getExercisesFromMaster(i+1));
    }

    //Ahora agrego los ejercicios personales
    const firstCycleIdPersonal = (await RoutineStore.getCycles((await RoutineStore.getMyMasterRoutine()).id))[0].id
    for(let i = 0; i < this.cycles.length; i++){
      //Agrego los ejercicios a la categoría correspondiente
      this.ejerciciosMaster[i] = this.ejerciciosMaster[i].concat(await ExcerciseStore.getExercisesFromPersonal(i+firstCycleIdPersonal))
    }

    //this.series.fill(0);
    //this.repeticiones.fill(0);
    //this.duracion.fill(0);

    if(this.routineId!== undefined){
      this.tituloComponente = 'Editar Rutinas';
      this.tituloBoton = 'Editar';
      this.Icono ='mdi-pencil';
      const rutinaApi = await RoutineStore.getRoutine(this.routineId);
      this.rutina.nombre = rutinaApi.name;
      this.rutina.desc = rutinaApi.detail;
      this.rutina.dificultad = this.desadaptarDificultad(rutinaApi.difficulty);
      this.rutina.objetivo = rutinaApi.category.categoryname;

      let cycles = await RoutineStore.getCycles(this.routineId);

      let auxEx = []

      for(let i = 0, k = 0; i < cycles.length; i++){
        this.cyclesId[i] = cycles[i].id;
        auxEx = await ExcerciseStore.getExercises(this.routineId, this.cyclesId[i]);
        if(i > 0 && cycles[i].type === 'exercise' && cycles[i-1].type !== 'warmup'){
          const ejPrincipal = {name:`Ejercitacion principal ${this.currentIndexEjPrincipal}`, detail:'Ejercitacion Principal', cycleType:'exercise', ejercicios:[]}
          const checkboxEjPrincipal = {checked: false};
          this.checkboxes.splice(i,0,checkboxEjPrincipal);
          this.routinesCat.splice(this.currentIndexEjPrincipal,0,ejPrincipal);
          this.currentIndexEjPrincipal++;
        }
        this.routinesCat[i].ejercicios = auxEx;
        for(let j = 0; j < auxEx.length; j++, k++){
          this.repeticiones[k] = auxEx[j].repetitions;
          this.duracion[k] = auxEx[j].duration;

        }
        k = this.excerciseLimit * (i+1);
        this.series[i] = cycles[i].repetitions;
      }

      this.ActualizarDuracionRutina();

    }

    else {
      this.tituloComponente = 'Crear Rutinas';
      this.tituloBoton = 'Crear';
      this.Icono ='mdi-dumbbell';
    }
    
    this.loading = false;

  },


}

</script>

<style scoped>

.TextAreaDesc{
  width: 100%;
}

#tituloSeccion h1{
  display: inline;
}


#DatosRutina{
  width: 100%;
}

.datoRutinaSingular {
  display: table;
  width: 25%;
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

#tituloSeccion h1{
  display: inline;
}


.textFieldRutina{
  width: 100%;
  margin-left: 2%;
}

.seriesContent{
  margin-top: 2%;
}

.textfieldSeries{
  margin-right: 7%;
}

.DivContenidoEj{
  margin: 1%;
  padding-right: 5%;
  width: 94%;
}

.DivContenidoEj p{
  padding-top: 2%;
}

#SeccionDeEleccion{
  display: inline-block;
  width: 100%;
}

#alertaLista{
  width: 30%;
  float: left;
}

#DivLista{
  width: 100%;
  margin-top: 5%;
}


#titleToolbar{
  width: 50%;
}

#ToolbarSeccionesRutina{
  width: 100%;
}

.btnEjPrincipal{
  width: 25%;
}

#SeccionesRutina{
  width: 48%;
  float: left;
  margin-right: 2%;
}

#EjsDisponibles{
  width: 48%;
  display: inline-block;
  margin-left: 2%;
}

.tituloCategorias{
  border: 3px solid darkgrey;
  padding: 2%;
}

.tituloListas{
  border: 3px solid darkgrey;
}

.textoListItemContent{
  width: 50%;
  font-size: 150%;
}

#divBtnAgregar{
  margin-left: 85%;
  width: 15%;
}

.routineCategory{
  font-weight: bold;
}

.btnCrear{
  width: 50%;
  margin-top: 0.6%;
  margin-left: 25%;
  margin-right: 25%;
}


</style>
