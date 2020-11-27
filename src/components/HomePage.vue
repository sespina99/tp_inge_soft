<template>
    <div id="home page" class="tituloSeccion">
      <v-container id="TitulosHomePage" class="text-center">
        <h1 class="font-weight-bold">Bienvenido a la página de JIBS Training, {{name}}</h1>
        <h2 class="font-weight-medium">Acá podés crear tus propias rutinas y ver las creaciones de otros</h2>
        <h3 class="font-weight-medium">Podés entrenar descargándote nuestra app y ejecutando las rutinas que elijas</h3>
      </v-container>

      <v-card id ="cardsContainer" max-width="80%" class="mx-auto" flat>
        <h2 class="font-weight-medium">Recomendados para vos:</h2>

        <v-container v-if="loading" class="text-center" >
          <v-progress-circular
          :size="50"
          color="#E78200"
          indeterminate
          ></v-progress-circular>
        </v-container>

        <v-carousel height="40%" hide-delimiters>
          <v-carousel-item v-for="indexR in getCantRec()" :key="indexR">
           <v-card color="white" class="mx-auto" max-width="80%" flat>
             <v-row>
               <v-col v-for="n in 4" :key="n" class="mx-auto" md="3">
                 <app-exercise id="ejercicio" v-if="checkArray(indexR,n)" v-bind:routine="routines[3 * (indexR-1) + (n-1)]"/>
               </v-col>
             </v-row>
           </v-card>
          </v-carousel-item>
        </v-carousel>

      </v-card>
  </div>


</template>

<script>

import RoutineStore from "@/store/RoutineStore";
import Exercise from "@/components/Exercise";
import UserStore from "@/store/UserStore";

export default {
components: {
  'app-exercise': Exercise,
},
  data(){
    return{
      name: UserStore.getCurrentUser().username,
      store: RoutineStore,
      routines: [],

      loading: false,
    }
  },


  methods:{
    getCantRec(){
      return Math.ceil(this.routines.length / 3) <= 3?  Math.ceil(this.routines.length / 3) : 3
    },
    checkArray(index,n){
      return (3 * (index-1) + (n-1) ) < this.routines.length
    },

  },
  async created() {
    this.loading = true;
    this.routines = await this.store.getByObjetive();
    this.loading = false;
  }
}
</script>

<style scoped>
#TitulosHomePage{
  margin-top: 2%;
  height: 40%;
  font-size: 150%;
}
#cardsContainer{
  padding: 2%;
  height: 40%;
}

#home page{
  height: 100%;
}

#ejercicio{
  min-width: 20%;
  margin-bottom: 10%;
  margin-left:19%;
}

</style>