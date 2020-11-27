<template>
  <div>
    <app-header></app-header>
    <app-menu></app-menu>
    <editar-ejercicio></editar-ejercicio>
    <app-footer></app-footer>
  </div>
</template>

<script>

import EditarEjercicio from '../components/EditarEjercicio'
import Header from '../components/Header'
import Menu from '../components/Menu'
import Footer from '../components/Footer'

export default {
  components: {
    'app-header': Header,
    'editar-ejercicio': EditarEjercicio,
    'app-footer': Footer,
    'app-menu': Menu,
  },

  data() {
    return {
    }
  }
}
</script>