<template>
  <div>
    <app-header></app-header>
    <app-menu></app-menu>
    <favoritos></favoritos>
    <app-footer></app-footer>
  </div>
</template>

<script>

import Header from '../components/Header'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import Favoritos from "@/components/Favoritos";

export default {
  components: {
    'app-header': Header,
    'favoritos': Favoritos,
    'app-footer': Footer,
    'app-menu': Menu,
  },

  data() {
    return {
    }
  }
}
</script>