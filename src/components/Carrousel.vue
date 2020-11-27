<template>
  <div>
    <v-card class="mx-auto" flat>
      <v-carousel height="40%" hide-delimiters>
        <v-carousel-item v-for="index in getItemsCarr()" :key="index">
          <v-card color="white" class="mx-auto" max-width="80%" flat>
            <v-row v-for="m in 2" :key="m">
              <v-col v-for="n in 4" :key="n" md="3">
                <app-exercise v-if="checkArray(index,m,n)" style="min-width: 20%;margin-bottom: 10%;margin-left: 19%" v-bind:routine="routines[(8 * (index-1)) + (4 * (m-1)) + (n-1)]" v-on:borradoDeRutina="borradoDeRutina()" v-on:remuevoFavorito="remuevoFav()" ></app-exercise>
              </v-col>
            </v-row>
          </v-card>
        </v-carousel-item>
      </v-carousel>
    </v-card>
  </div>
</template>

<script>
import Exercise from "@/components/Exercise";
export default {
  props:['routines'],
  components:{
    'app-exercise': Exercise,
  },
  data(){
    return {
      name: "Carrousel",

    }
  },
  methods:{
    getItemsCarr(){
      return Math.ceil(this.routines.length / 8)
    },
    checkArray(index,row,col){
      return (((8 * (index-1)) + (4 * (row-1)) + (col-1)) < this.routines.length)
    },
    borradoDeRutina(){
      this.$emit('borradoDeRutina');
    },
    remuevoFav(){
      this.$emit('remuevoFav');
    }
  },
}
</script>

<style scoped>

</style>