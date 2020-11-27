<template>
  <div>

    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="4">
        <h1 class="text-center">Mis Ejercicios</h1>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>

    <v-card class="mx-auto" max-width="70%" style="margin-top: auto">

      <div style="height: auto">

        <v-row >

          <v-spacer></v-spacer>
          <v-col cols="3" >
            <v-list-item-title ><h3 style="padding-left: 5%">Titulo</h3></v-list-item-title>
          </v-col>
          <v-col cols="2">
            <v-list-item-title ><h4 style="white-space: initial">Categoria</h4></v-list-item-title>
          </v-col>
          <v-col cols="5">
            <v-list-item-title ><h4 style="white-space: initial">Descripcion</h4></v-list-item-title>
          </v-col>
          <v-col cols="2">
            <v-list-item-title ><h4 style="white-space: initial">Acciones</h4></v-list-item-title>
          </v-col>
          <v-spacer></v-spacer>

        </v-row>

        <v-container v-if="loading" class="text-center" >
        <v-progress-circular
            :size="50"
            color="#E78200"
            indeterminate
        ></v-progress-circular>
      </v-container>

        <v-list three-line style="padding-top: 0">
          <template v-for="(exercise, index) in exercises" >

            <v-list-item style="border: solid; border-width: thin;"
                :key="index"
            >

              <v-list-item-content >
                <v-row >
                  <v-col cols="3" >
                    <v-list-item-title ><h3 style="white-space: initial">{{exercise.name}}</h3></v-list-item-title>
                  </v-col>
                  <v-col cols="2">
                    <v-list-item-title ><h4 style="white-space: initial">
                        {{exercise.category}} </h4></v-list-item-title>
                  </v-col>
                  <v-col cols="5">
                    <v-list-item-title ><h4 style="white-space: initial">{{exercise.detail}}</h4></v-list-item-title>
                  </v-col>
                  <v-col v-if="!wasDeleted(exercise.id) && !wasUndid(exercise.id)">
                    <v-btn icon @click="$router.push('/Ejercicios/Editar?cid=' + exercise.categoryId + '&eid=' + exercise.id)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col v-if="!wasDeleted(exercise.id) && !wasUndid(exercise.id)">
                    <v-btn v-on:click="removeExercise(exercise.id, exercise.categoryId)" icon>
                      <v-icon>mdi-trash-can</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col v-if="wasDeleted(exercise.id)">
                    <v-btn v-on:click="undoRemoveExercise(exercise.id, exercise.name, exercise.detail, exercise.category)" style="background-color: #FFE0B2;" rounded text>
                      <v-icon>mdi-undo</v-icon>
                      <span>Deshacer</span>
                    </v-btn>
                  </v-col>
                  <v-col v-if="wasUndid(exercise.id)">
                    <v-btn style="background-color: #C8E6C9;" rounded text disabled>
                      <v-icon>mdi-check</v-icon>
                      <span>Recuperado</span>
                    </v-btn>
                  </v-col>
                  <v-spacer></v-spacer>

                </v-row>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </div>
    </v-card>
  </div>
</template>

<script>


import ExcerciseStore from "@/store/ExcerciseStore";

export default {
  name: "MisEjercicios",
  data() {
    return {
      edit_ex_link: "/Ejercicios/Editar",

      exercises: undefined,
      exercisesDeletedIds: [],
      exercisesAlreadyUndid: [],

      loading: false,
    }
  },

  async created(){
    this.loading = true;
    this.exercisesDeletedIds = []
    this.exercisesAlreadyUndid = []
    this.exercises = await ExcerciseStore.getMyExercises();
    this.loading = false;
  },

  methods: {

    wasDeleted(exerciseId){
      return this.exercisesDeletedIds.includes(exerciseId);
    },

    wasUndid(exerciseId){
      return this.exercisesAlreadyUndid.includes(exerciseId);
    },

    async removeExercise(exerciseId, cycleId) {
      await ExcerciseStore.deleteMyExercise(exerciseId, cycleId);
      this.exercisesDeletedIds.push(exerciseId);
      return true;
    },

    async undoRemoveExercise(exerciseId, name, detail, category){
      await ExcerciseStore.addMyExercises(name, detail, category)
      //Lo saco de deleted y lo meto en undid
      const index = this.exercisesDeletedIds.indexOf(exerciseId);
      if (index > -1) {
        this.exercisesDeletedIds.splice(index, 1);
      }
      this.exercisesAlreadyUndid.push(exerciseId)
    },
  }
}
</script>

<style scoped>

</style>