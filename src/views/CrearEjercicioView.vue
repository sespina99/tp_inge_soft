<template>
  <div>
    <app-header></app-header>
    <app-menu></app-menu>
    <crear-ejercicio></crear-ejercicio>
    <app-footer></app-footer>
  </div>
</template>

<script>

import Header from '../components/Header'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import CrearEjercicio from "@/components/CrearEjercicio";

export default {
  components: {
    'app-header': Header,
    'crear-ejercicio': CrearEjercicio,
    'app-footer': Footer,
    'app-menu': Menu,
  },

  data() {
    return {
      name: 'CrearEjercicioView'
    }
  }
}
</script>