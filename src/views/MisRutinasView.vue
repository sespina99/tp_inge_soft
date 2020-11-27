<template>
  <div>
    <app-header></app-header>
    <app-menu></app-menu>
    <mis-rutinas></mis-rutinas>
    <app-footer></app-footer>
  </div>
</template>

<script>

import MisRutinas from "@/components/MisRutinas";
import Header from '../components/Header'
import Menu from '../components/Menu'
import Footer from '../components/Footer'

export default {
  components: {
    'app-header': Header,
    'mis-rutinas': MisRutinas,
    'app-footer': Footer,
    'app-menu': Menu,
  },

  data() {
    return {
    }
  }
}
</script>