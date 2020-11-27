<template>
  <div>
    <v-row>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-col cols="2">
        <v-text-field filled rounded label="Buscador" type="text" v-model="search" placeholder="buscar rutinas"/>
      </v-col>
      <v-col cols="2" class="pa-2">
        <h1 class="text-center">Explorar Rutinas</h1>
      </v-col>
      <v-col cols="1">
        <v-spacer></v-spacer>
        <h2 style=" font-style: normal">Ordenar por:</h2>
      </v-col>
      <v-col cols="1">
        <v-select :items="items" v-model="order" dense outlined @change="updateRoutines()"></v-select>
      </v-col>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>

    </v-row>
    <v-row>
      <v-spacer></v-spacer>

      <v-col cols="8" class="pa-2">
        <carrousel v-bind:routines="filteredRoutines"></carrousel>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </div>
</template>

<script>
import RoutineStore from "@/store/RoutineStore";
import Carrousel from "@/components/Carrousel";
export default {
  components:{
    carrousel: Carrousel
  },
  data() {
    return {
      items: ['Dificultad','Fecha','Metas'],
      toggled: false,
      store: RoutineStore,
      routines: [],
      search: '',
      order: 'Fecha'
    }
  },
  methods: {
    getOrder() {
      switch (this.order) {
        case 'Fecha': return 'dateCreated';
        case 'Dificultad': return 'difficulty';
        case 'Metas': return 'categoryId';
      }
    },
    obtenerDificultad(dificultad) {
      switch (dificultad) {
        case 'rookie':
          return 0;
        case 'beginner':
          return 1;
        case 'intermediate':
          return 2;
        case 'advanced':
          return 3;
        case 'expert':
          return 4;
        default:
          return '';
      }
    },
    async updateRoutines() {
      let aux = this.getOrder();
      if (aux === 'difficulty') {
        this.routines.sort((a,b) => this.obtenerDificultad(a.difficulty) < this.obtenerDificultad(b.difficulty) ? -1 : 1)
      }
      else
        this.routines = await this.store.getRoutines(aux);
    },

  },

  computed:{
    filteredRoutines(){
      return this.routines.filter((routine) => {
        return routine.name.toLowerCase().match(this.search.toLowerCase())
      })
    },
  },

  async created() {
    this.routines = await this.store.getRoutines('dateCreated');
  }


}
</script>

<style scoped>
h2 {
  text-align: center;
}
</style>
