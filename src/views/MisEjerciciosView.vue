<template>
  <div>
    <app-header></app-header>
    <app-menu></app-menu>
    <mis-ejercicios></mis-ejercicios>
    <app-footer></app-footer>
  </div>
</template>

<script>

import Header from '../components/Header'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import MisEjercicios from "@/components/MisEjercicios";

export default {
  components: {
    'app-header': Header,
    'mis-ejercicios': MisEjercicios,
    'app-footer': Footer,
    'app-menu': Menu,
  },

  data() {
    return {
      name: 'MisEjerciciosView'
    }
  }
}
</script>