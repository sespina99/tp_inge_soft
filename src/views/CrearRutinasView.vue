<template>
  <div>
    <app-header></app-header>
    <app-menu></app-menu>
    <armado-rutinas></armado-rutinas>
    <app-footer></app-footer>
  </div>
</template>

<script>

import Header from '../components/Header'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import ArmadoRutinas from "@/components/ArmadoRutinas";

export default {
  components: {
    'app-header': Header,
    'armado-rutinas': ArmadoRutinas,
    'app-footer': Footer,
    'app-menu': Menu,
  },

  data() {
    return {
    }
  }
}
</script>