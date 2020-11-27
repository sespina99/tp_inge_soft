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
import ExplorarArtistas from "@/components/ExplorarArtistas";

export default {
  components: {
    'app-header': Header,
    'explorar': ExplorarArtistas,
    'app-footer': Footer,
  },

  data() {
    return {
    }
  }
}
</script>