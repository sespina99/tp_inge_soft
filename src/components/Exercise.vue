<template>
  <div>
    <v-card max-width="300">
      <v-img src="../assets/RutinaLogo.png" contain style="padding-bottom: 0">
        <v-card-actions style="padding-top: 0;padding-right: 0;padding-left: 0">
          <v-btn v-if="!toogled" v-on:click="addFavourite()" icon>
            <v-icon >mdi-heart</v-icon>
          </v-btn>
          <v-btn v-else-if="toogled"  v-on:click="deleteFavourite()" icon>
            <v-icon color="orange">mdi-heart</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="$router.push('/Rutinas/Editar/' + routine.id)" v-if="this.$route.path === '/Rutinas/MisRutinas'">
            <v-icon color="black">mdi-pencil</v-icon>
          </v-btn>
        </v-card-actions>
        <v-spacer></v-spacer>
          <v-btn icon class="bottom-right" v-if="this.$route.path === '/Rutinas/MisRutinas'" @click="deleteRoutine()" >
            <v-icon color="black">mdi-trash-can</v-icon>
          </v-btn>

      </v-img>

      <div style="height: auto">
        <v-card-title style="padding: 0; text-align:left" class="pl-2" contain>
          <h4 id="titulo">{{routine.name}}</h4>
        </v-card-title>
        <v-card-text style="font-size:0.8em; padding:0" class="pl-2" contain>
          <p style="text-align:left">{{desadaptarDificultad(routine.difficulty)}}</p>
          <p style="text-align:left">{{routine.category.categoryname}}</p>
        </v-card-text>
        <v-spacer></v-spacer>
        <v-layout align-right justify-end>
          <v-btn text color="orange" squared @click="$router.push('/Detallada?id=' + routine.id)">Ver</v-btn>
        </v-layout>
      </div>
    </v-card>
  </div>
</template>

<script>
import RoutineStore from "@/store/RoutineStore";

export default {
  props:['routine'],
  data() {
    return {
      store: RoutineStore,
      toogled: false
    }
  },

  methods:{
    async addFavourite(){
      this.routine.isFavourite= true;
      this.toogled = true;
      await this.store.addFavourites(this.routine.id);

    },
    async deleteFavourite(){
      this.routine.isFavourite = false;
      this.toogled = false;
      await this.store.deleteFavourites(this.routine.id);
      this.$emit('remuevoFavorito');
    },

    async deleteRoutine(){
      await this.store.delete(this.routine.id);
      this.$emit('borradoDeRutina');
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
  },



  async created() {
    let fl = false;
    let aux = await RoutineStore.getFavourites();
    for (let i=0; i < aux.length;i++) {
      if (aux[i].id === this.routine.id) {
        this.toogled = true;
        fl = true;
      }
    }
    if (!fl) {
      this.toogled = false;
    }
  }
}
</script>

<style scoped>
.bottom-right {
  position: absolute;
  bottom: 4px;
  right: 0px;
}
p {
  font-size: small;
  margin: 0;
}
span {
  display: block;
  color: white;
}
img.center {
  display: block;
  margin: 0 auto;
  height: 25%;
}
#titulo{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>