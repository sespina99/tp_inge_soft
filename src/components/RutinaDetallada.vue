<template>
<div>
    <v-row>
        <v-icon id='back' @click="$router.go(-1)" color="black" x-large> mdi-arrow-left </v-icon>
        <h1 id='titulo'>
            {{this.rutina.name}}
           <!--<v-icon v-if="!favorite" color="black" large>
                mdi-heart-outline
            </v-icon>
            <v-icon v-else color="#E78200" large>
                mdi-heart
            </v-icon>-->
        </h1>
    </v-row>
    <v-row>
        <h1 id='props'>
            {{this.rutina.creatorName}} - {{desadaptarDificultad(this.rutina.difficulty)}} - {{this.metaRutina}}
        </h1>
    </v-row>
    <v-row>
        <p id='desc'>
            <b>Descripción: </b>{{this.rutina.detail}}
        </p>
    </v-row>

    <div v-for="(seccion, index) in cycles" v-bind:key="index">
        <v-row>
            <span id="seccion"><b>{{seccion.name}}</b> - Series: {{seccion.repetitions}}</span>
        </v-row>
        <div v-for="ejercicio in ejercicios[index]" v-bind:key="ejercicio.id">
            <v-row id='ejercicio'>
              <v-col cols="3">
                <p>Nombre: {{ejercicio.name}}</p>
              </v-col>
              <v-col cols="3">
                <p>Descripción: {{ejercicio.detail}}</p>
              </v-col>
              <v-col cols="3">
                <p>Duración: {{ejercicio.duration}}</p>
              </v-col>
              <v-col cols="3">
                <p>Repeticiones: {{ejercicio.repetitions}}</p>
              </v-col>
            </v-row>
        </div>
    </div>
</div>

</template>

<script>

import RoutineStore from '../store/RoutineStore';
import ExcerciseStore from "@/store/ExcerciseStore";

export default {
  props:['routineId'],

    data() {
        return {
            favorite: false,
            rutina: '',
            metaRutina: '',
            cycles: [],
            ejercicios: [],
        }
    },

    async created(){
      this.rutina = await RoutineStore.getRoutine(this.routineId);
      this.metaRutina = this.rutina.category.categoryname;
      this.cycles =  await RoutineStore.getCycles(this.routineId);
      for(let i = 0; i < this.cycles.length; i++){
        this.ejercicios.push(await ExcerciseStore.getExercises(this.routineId, parseInt(this.cycles[i].id)));
      }
    },

    methods: {
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
    },
}
</script>

<style scoped>

#titulo{
    margin: 1% auto 0 auto;
}

#back{
    margin: 1% 0 0% 3%;
}

#props{
    margin: auto;
    font-weight: normal;
}

#desc{
    width: 100%;
    margin: 2% 5% 2% 5%;
    border: thick solid;
    border-radius: 10px;
    padding: 1% 5%;
    font-size: 1.3em;
}

#seccion{
    width: 100%;
    margin: 2% 5% 0.1% 5%;
    border: solid;
    border-radius: 10px;
    padding: 0.5% 5%;
    font-size: 1.5em;
}

#ejercicio{
    width: 89.8%;
    margin: 0.1% 5% 0.1% 5%;
    border: thin solid;
    border-radius: 10px;
    padding: 0.5% 5%;
    font-size: 1.5em;
}

</style>
