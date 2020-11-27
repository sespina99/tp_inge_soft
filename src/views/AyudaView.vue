<template>
  <div>
    <app-header></app-header>
    <app-menu></app-menu>
    <ayuda></ayuda>
    <app-footer></app-footer>
  </div>
</template>

<script>

import Header from '../components/Header'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import Ayuda from "@/components/Ayuda";

export default {
  components: {
    'app-header': Header,
    'ayuda': Ayuda,
    'app-footer': Footer,
    'app-menu': Menu,
  },

  data() {
    return {
    }
  }
}
</script>