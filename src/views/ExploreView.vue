<template>
  <div>
    <app-header></app-header>
    <explorar></explorar>
    <app-footer></app-footer>
  </div>
</template>

<script>

import Header from '../components/inge/HeaderTune'

import Footer from '../components/inge/FooterTune'
import ExplorarTune from "@/components/inge/ExplorarTune";

export default {
  components: {
    'app-header': Header,
    'explorar': ExplorarTune,
    'app-footer': Footer,
  },

  data() {
    return {
    }
  }
}
</script>