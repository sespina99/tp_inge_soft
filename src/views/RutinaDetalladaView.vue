<template>
  <div>
    <app-header></app-header>
    <detallada v-bind:routine-id="routineId"></detallada>
    <app-footer></app-footer>
  </div>
</template>

<script>

import RutDetallada from '../components/RutinaDetallada'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default {
    components: {
        'app-header': Header,
        'detallada': RutDetallada,
        'app-footer': Footer,
    },

    data() {
        return {
          routineId : ''
        }
    },

    created(){
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      this.routineId = urlParams.get('id');
    }
}
</script>